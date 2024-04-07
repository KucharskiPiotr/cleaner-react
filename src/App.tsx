import './App.css'
import Blog from "./blog/blog.tsx";
import {RestPostRepository} from "./blog/repositories.tsx";

const postRepository = new RestPostRepository()

function App() {
  return (
    <>
      <Blog repository={postRepository}/>
    </>
  )
}

export default App
