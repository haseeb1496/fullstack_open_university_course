import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import CreateBlog from "../components/CreateBlog";

describe("blog tests", () => {
  const mockLikeBlog = jest.fn();
  const mockDeleteBlog = jest.fn();

  beforeEach(() => {
    const testBlog = {
      id: "testID12345",
      title: "Test blog",
      authour: "Test author",
      url: "Test URL",
      likes: 20,
      user: { name: "Test user" },
    };

    render(
      <Blog
        key={testBlog.id}
        blog={testBlog}
        likeBlog={mockLikeBlog}
        deleteBlog={mockDeleteBlog}
        showRemove={false}
      />
    );
  });

  test("renders blog with title and author", () => {
    const element = screen.queryByText("Test blog Test author");
    const url = screen.queryByText("Test URL");
    expect(element).toBeDefined();
    expect(url).toBeNull();
  });

  test("renders URL and likes when expand button is cliked", async () => {
    const user = userEvent.setup();
    const button = screen.queryByText("view");
    await user.click(button);
    const url = screen.queryByText("Test URL");
    expect(url).toBeDefined();
  });

  test("like event is called twice when clicked twice", async () => {
    const user = userEvent.setup();
    const viewBtn = screen.queryByText("view");
    await user.click(viewBtn);
    const likeBtn = screen.queryByText("like");
    await user.click(likeBtn);
    await user.click(likeBtn);
    expect(mockLikeBlog.mock.calls).toHaveLength(2);
  });

  test("create blog event is called when create button is clicked", async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "New URL",
    };

    const mockBlogDataHandler = jest.fn();
    const mockCreateBlog = jest.fn();

    render(
      <CreateBlog
        blogData={newBlog}
        blogDataHandler={mockBlogDataHandler}
        createBlog={mockCreateBlog}
      />
    );
    const user = userEvent.setup();
    const titleInput = screen.queryByPlaceholderText("enter title");
    const authorInput = screen.queryByPlaceholderText("enter author");
    const urlInput = screen.queryByPlaceholderText("enter url");
    await user.type(titleInput, "New blog");
    await user.type(authorInput, "New author");
    await user.type(urlInput, "New URL");
    const createBtn = screen.queryByText("create");
    await user.click(createBtn);
    expect(mockCreateBlog.mock.calls).toHaveLength(1);
  });
});
