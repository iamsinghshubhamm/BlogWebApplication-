import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../assets/Loader";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";


const MyBlogs = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem("userInfo"));
        const userId = userData?.user?.id;
        const { data } = await axios.get(`/api/v1/blogs/getuserblog/${userId}`);
        if (data.success) {
          setBlogs(data.data); 
          console.log(blogs)
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const toggleOptions = () => {
    setOpen(!open);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/v1/blogs/deleteblog/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
    setLoading(false);
  };

 
  const handleUpdate = (id) => {
     navigate(`/update-blog/${id}`)
  };
  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        {loading ? (
          <Loader />
        ) : (
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="w-full flex justify-end">
              {blogs.length !== 0 ? (
                <button
                  onClick={toggleOptions}
                  className={`text-white px-5 py-2 rounded-xl w-max whitespace-nowrap cursor-pointer ${
                    open ? "bg-red-600" : "bg-green-500"
                  }`}
                >
                  Delete and Update
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                My Blog
              </h2>
            </div>
            {blogs.length !== 0 ? (
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {blogs.map((blog) => (
                  <article
                    key={blog._id}
                    className="flex shadow-gray-200 shadow-xl p-6 rounded-lg flex-col items-start justify-between"
                  >
                    <div className="relative w-full">
                      <img
                        src={blog.imageUrl}
                        alt=""
                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="max-w-xl">
                      <div className="mt-8 flex items-center gap-x-4 text-xs">
                        <time
                          dateTime={blog.datetime}
                          className="text-gray-500"
                        >
                          {blog.date}
                        </time>
                        <a
                          href={blog.category.href}
                          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        >
                          {blog.category.title}
                        </a>
                      </div>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <a href={blog.href}>
                            <span className="absolute inset-0" />
                            {blog.title}
                          </a>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {blog.description}
                        </p>
                      </div>
                      {open && (
                        <div className="relative mt-8 flex items-center gap-x-4">
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="bg-red-500 text-sm text-white px-4 py-2 rounded-xl hover:bg-red-600"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleUpdate(blog._id)}
                            className="bg-blue-500 text-sm text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-gray-900 text-2xl text-center w-full">
                You have not created any blogs yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
