import "./App.css";
import Navbar from "./Component/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Blog from "./pages/BlogTab";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./Component/ProtectedRoute.js";
import MyBlogs from "./Component/MyBlogs.js";
import CreateBlog from "./Component/CreateBlog.js";

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myblog" element={<MyBlogs/>}/>
          <Route path="/create" element={<CreateBlog/>}/>
          <Route path="/update-blog/:id" element={<CreateBlog/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
