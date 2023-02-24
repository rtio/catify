import { render, screen, fireEvent } from "@testing-library/react";
import CatVote from "../pages/index";

jest.mock("./api/cats", () => {
  return {
    fetchNextCat: jest.fn(() =>
      Promise.resolve({
        id: "123",
        url: "https://www.example.com/cat.jpg",
      })
    ),
    createUpVote: jest.fn(() =>
      Promise.resolve({
        image_id: "123",
      })
    ),
    createDownVote: jest.fn(() =>
      Promise.resolve({
        image_id: "123",
      })
    ),
  };
});

describe("CatVote", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without errors", () => {
    render(<CatVote />);
    const titleElement = screen.getByText(/catify/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders a cat image", async () => {
    render(<CatVote />);
    const imageElement = await screen.findByRole("img");
    expect(imageElement).toHaveAttribute("src", "https://www.example.com/cat.jpg");
  });

  test("clicking the like button upvotes the cat", async () => {
    render(<CatVote />);
    const likeButton = await screen.findByText(/like/i);
    fireEvent.click(likeButton);
    expect(likeButton).toBeDisabled();
    expect(createUpVote).toHaveBeenCalledTimes(1);
    expect(fetchNextCat).toHaveBeenCalledTimes(2);
    expect(likeButton).toBeEnabled();
  });

  test("clicking the dislike button downvotes the cat", async () => {
    render(<CatVote />);
    const dislikeButton = await screen.findByText(/dislike/i);
    fireEvent.click(dislikeButton);
    expect(dislikeButton).toBeDisabled();
    expect(createDownVote).toHaveBeenCalledTimes(1);
    expect(fetchNextCat).toHaveBeenCalledTimes(2);
    expect(dislikeButton).toBeEnabled();
  });
});
