import {PostRepository} from "./blog.tsx";
import {Post} from "../types.tsx";

export class RestPostRepository implements PostRepository {
  async fetchPosts(): Promise<Array<Post>> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
  }
}

export class InMemoryPostRepository implements PostRepository {
  async fetchPosts(): Promise<Array<Post>> {
    return [
      { userId: 1, id: 1, title: 'First post', body: 'This is the first post' },
      { userId: 1, id: 2, title: 'Second post', body: 'This is the second post' },
      { userId: 1, id: 3, title: 'Third post', body: 'This is the third post' },
    ]
  }
}
