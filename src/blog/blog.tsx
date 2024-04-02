import {useEffect, useState} from "react";
import {Post} from "./types.tsx";

export default function Blog() {
  const [posts, setPosts] = useState<Array<Post> | null>(null)
  const [filteredPosts, setFilteredPosts] = useState<Array<Post>>([])
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setPosts(json))
  }, [])

  useEffect(() => {
    if (posts) {
      setFilteredPosts(posts.filter(post => searchQuery === '' || post.title.includes(searchQuery)))
    }
  }, [searchQuery, posts])

  if (posts === null) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>My super blog</h1>
        <input
          type="text"
          style={{ marginBottom: 20 }}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      {filteredPosts.map(post => (
        <div style={{ border: 'solid 2px', marginBottom: 50 }} key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button>
            Visit it
          </button>
        </div>
      ))}
      {filteredPosts.length === 0 && <p>No posts found</p>}
    </div>
  )
}