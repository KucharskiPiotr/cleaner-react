import {useEffect, useState} from "react";
import {Post} from "./types.tsx";

function usePosts(query: string): Array<Post> | null {
  const [posts, setPosts] = useState<Array<Post> | null>(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setPosts(json))
  }, [])

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
    <button>
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
      {posts.map(post => <PostView post={post} />)}
      {posts.length === 0 && <p>No posts found</p>}
    </div>
  )
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const posts = usePosts(searchQuery)

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
