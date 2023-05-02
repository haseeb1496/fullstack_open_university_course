describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.createUser({
      name: "Test User",
      username: "testuser",
      password: "secret",
    });
  });

  it("shows login form by default", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("successfully logs in with correct credentials", async function () {
      await cy.login({ username: "testuser", password: "secret" });
      cy.get("#loginBtn").click();
      cy.contains("logout");
    });

    it("fails user login with wrong credentials", function () {
      cy.get("#username").type("superuser");
      cy.get("#password").type("secret");
      cy.get("#loginBtn").click();
      cy.get(".error").contains("Invalid username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "secret" });
      cy.createBlog({
        title: "Test Blog",
        author: "Test Author",
        url: "www.testurl.com",
      });
    });

    it("contains a blog", function () {
      cy.contains("Test Blog Test Author");
    });

    it("can create a new blog", function () {
      cy.get("#show-blog-form-btn").click();
      cy.get("#title-input").type("New Blog");
      cy.get("#author-input").type("New Author");
      cy.get("#url-input").type("www.newBlog.com");
      cy.get("#create-blog-btn").click();
      cy.contains("New Blog New Author");
    });

    it("can expand a blog", function () {
      cy.contains("view").click();
      cy.contains("Test User");
    });

    it("can like a blog", function () {
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("likes 1");
    });

    it("can delete blog created by the same user", function () {
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.should("not.contain", "Test Blog Test Author");
    });

    it("can't delete blog created by other user", function () {
      cy.contains("logout").click();
      cy.createUser({
        name: "Another User",
        username: "anotherUser",
        password: "sekret",
      });
      cy.login({ username: "anotherUser", password: "sekret" });
      cy.contains("view").click();
      cy.contains("Test Blog Test Author").and("not.contain", "remove");
    });
  });
});
