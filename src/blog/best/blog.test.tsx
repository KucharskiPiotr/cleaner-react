import {render, waitFor} from "@testing-library/react";
import {expect} from "vitest";
import Blog from "./blog.tsx";
import {InMemoryPostRepository} from "./repositories.tsx";

describe('Blog', () => {
  it('should render', async () => {
    const repository = new InMemoryPostRepository()
    const { getByText } = render(<Blog repository={repository} />)

    await waitFor(() => {
      expect(getByText('My super blog')).toBeTruthy()
      expect(getByText('First post')).toBeTruthy()
      expect(getByText('Second post')).toBeTruthy()
      expect(getByText('Third post')).toBeTruthy()
    })
  })
})