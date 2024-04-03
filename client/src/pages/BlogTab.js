import React, { useState } from "react";
import Blogs from "../Component/Blogs";
import MyBlogs from "../Component/MyBlogs";
import CreateBlog from "../Component/CreateBlog";

  

const Blog = () => {
  const [activeTab, setActiveTab] = useState("blog");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full mt-4">
      <div className="mx-auto w-1/3 h-14 px-8 py-3 text-gray-300 bg-gray-600 font-bold rounded-3xl flex items-center justify-center gap-6">
        <button onClick={()=> handleTabClick('blog')} className={` transition-all duration-150 cursor-pointer ${activeTab === 'blog' ? 'bg-gray-700 px-6 py-2 rounded-3xl shadow-sm shadow-gray-50' : 'hover:text-gray-200' }`}>
            Blog
        </button>
        <button onClick={() => handleTabClick('myblog')} className={` transition-all duration-150 cursor-pointer ${activeTab === 'myblog' ? 'bg-gray-700 px-6 py-2 rounded-3xl shadow-sm shadow-gray-50' : 'hover:text-gray-200' }`}>
            My blogs
        </button>
        <button onClick={() => handleTabClick('createblog')} className={` transition-all duration-150 cursor-pointer ${activeTab === 'createblog' ? 'bg-gray-700 px-6 py-2 rounded-3xl shadow-sm shadow-gray-50' : 'hover:text-gray-200' }`}>
            Create blog
        </button>
      </div>
      { activeTab === 'blog' && ( <div>
          <Blogs/>
      </div> )}
      { activeTab === 'myblog' && ( <div>
          <MyBlogs/>
      </div> )}
      {activeTab === 'createblog' && ( <div>
        <CreateBlog/>
        </div>)}
    </div>
  );
};

export default Blog;
