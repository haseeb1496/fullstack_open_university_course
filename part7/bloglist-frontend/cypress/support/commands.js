Cypress.Commands.add("createBlog", (blog) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: blog,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  cy.visit("");
});

Cypress.Commands.add("login", (loginData) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, loginData).then(
    ({ body }) => {
      localStorage.setItem("token", body.token);
      cy.visit("");
    }
  );
});

Cypress.Commands.add("createUser", (userData) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/users`, userData);
  cy.visit("");
});
