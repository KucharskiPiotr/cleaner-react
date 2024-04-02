import {useEffect, useState} from "react";
import {Post} from "../types.tsx";
import {RestPostRepository} from "./repositories.tsx";

export interface PostRepository {
  fetchPosts(): Promise<Array<Post>>
}

function usePosts(query: string, repository: PostRepository): Array<Post> | null {
  const [posts, setPosts] = useState<Array<Post> | null>(null)

  useEffect(() => {
    repository.fetchPosts().then(posts => setPosts(posts))
  }, [repository])

  return posts ? posts.filter(post => query === '' || post.title.includes(query)) : []
}

interface SearchProps {
  setSearchQuery: (query: string) => void
}

function Search({setSearchQuery}: SearchProps) {
  return (
    <input
      type="text"
      style={{ marginBottom: 20 }}
      onChange={e => setSearchQuery(e.target.value)}
      placeholder="Search..."
    />
  )
}

interface ButtonProps {
  noun: string
}

function Button({noun}: ButtonProps) {
  return (
    <button style={{ marginBottom: 20 }}>
      Visit {noun}
    </button>
  )
}

interface PostProps {
  post: Post
}

function PostView({post}: PostProps) {
  return (
    <div style={{ border: 'solid 2px', marginBottom: 50 }}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Button noun={'it'} />
    </div>
  )
}

function PostList({posts}: {posts: Array<Post>}) {
  return (
    <div>
      {posts.map(post => <PostView key={post.id} post={post} />)}
      {posts.length === 0 && <p>No posts found</p>}
    </div>
  )
}

interface BlogProps {
  repository?: PostRepository
}

export default function Blog({repository = new RestPostRepository()}: BlogProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const posts = usePosts(searchQuery, repository)

  if (posts === null) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>My super blog</h1>
      <Search setSearchQuery={setSearchQuery} />
      <PostList posts={posts} />
    </div>
  )
}