import React, { useEffect, useId, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const CreateBlog = () => {
  const { id } = useParams();
  const isUpdateBlog = id !== undefined;
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userData?.user?.id;
  const [formData, setFormData] = useState({
    // title: "Mastering Content Creation",
    // description:
    //   "Unlock the secrets to creating compelling content that resonates with your audience and drives results.",
    // imageUrl:
    //   "https://images.unsplash.com/photo-1711998059965-65be05f23e59?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: `${userId}`,
    // categoryTitle: "Content Creation",
    // categoryHref: "#",
    // authorName: "Daniel Wilson",
    // authorRole: "Content Creator",
    // authorHref: "#",
    // authorImageUrl:
    //   "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww",
    title: "",
  description: "",
  imageUrl: "",
  categoryTitle: "",
  categoryHref: "",
  authorName: "",
  authorRole: "",
  authorHref: "",
  authorImageUrl: "",
  });

  useEffect(() => {
    if (isUpdateBlog) {
      fetchBlogData(id);
    }
  }, [isUpdateBlog, id]);
  const fetchBlogData = async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/blogs/getblog/${id}`);
      console.log(data.data.user.blogs)
      if (data.success) {
        setFormData(data.data);
        console.log(data.data)
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isUpdateBlog
        ? `/api/v1/blogs/updateblog/${id}`
        : "/api/v1/blogs/createblog";
      const method = isUpdateBlog ? "put" : "post";
      const { data } = await axios[method](url, formData);
      if (data.success) {
        toast.success(
          isUpdateBlog
            ? "Blog updated successfully"
            : "Blog created successfully"
        );
        setFormData({
          title: "",
          description: "",
          imageUrl: "",
          user: `${userId}`,
          categoryTitle: "",
          categoryHref: "",
          authorName: "",
          authorRole: "",
          authorHref: "",
          authorImageUrl: "",
        });

        window.location.href = "/";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="min-h-screenflex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full">
        <h2 className="text-2xl font-semibold mb-4">
          {isUpdateBlog ? "Updated your blog" : "Create your blog"}
        </h2>
        <form className="w-full flex gap-6" onSubmit={handleSubmit}>
          <div className="w-full">
            <div className="mb-4">
              <label className="text-blue-600 font-semibold mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="text-blue-600 font-semibold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="text-blue-600 font-semibold mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="text-blue-600 font-semibold mb-2">
                Category Title
              </label>
              <input
                type="text"
                name="categoryTitle"
                value={formData.categoryTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="mb-4">
              <label className="text-blue-600 font-semibold mb-2">
                Author Name
              </label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="text-blue-600 font-semibold mb-2">
                Author Role
              </label>
              <input
                type="text"
                name="authorRole"
                value={formData.authorRole}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="text-blue-600 font-semibold mb-2">
                Author Image URL
              </label>
              <input
                type="text"
                name="authorImageUrl"
                value={formData.authorImageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className={`justify-self-end ${
                isUpdateBlog ? "bg-green-600" : "bg-blue-500"
              } text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
            >
              {isUpdateBlog ? "Update blog" : "Create blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
