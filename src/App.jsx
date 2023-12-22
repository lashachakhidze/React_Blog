import { Route, Routes } from "react-router-dom";
import './App.css'
import BlogPage from './pages/BlogPage'
import DetailPage from './pages/DetailPage'
import AddBlog from './pages/AddBlog'



function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<BlogPage />} />
      <Route path="/blog/:id" element={<DetailPage />} />
      <Route path="/addblog" element={<AddBlog />} />
    </Routes>
    </>
  )
}

export default App
