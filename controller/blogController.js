const Blog = require('../model/blogModel')
const User = require('../model/userModel')

exports.createBlog = async (req, res) => {
  try {
    const { title, description, imageUrl, user, categoryTitle, categoryHref, authorName, authorRole, authorHref, authorImageUrl } = req.body;
    if (!title || !description || !imageUrl || !user || !categoryTitle) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const createBlog = await Blog.create({
      title,
      description,
      imageUrl,
      user,
      category: {
        title: categoryTitle,
        href: categoryHref
      },
      author: {
        name: authorName,
        role: authorRole || '', 
        href: authorHref || '', 
        imageUrl: authorImageUrl
      },
      date: new Date(),
      datetime: new Date().toISOString()
    });
    await User.findByIdAndUpdate(user, { $push: { blogs: createBlog._id } });
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: { id: createBlog._id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating blog",
      error: error.message,
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const findblog = await Blog.findById(id).populate('user').populate('category').populate('author');

    if (!findblog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: findblog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blog",
      error: error.message,
    });
  }
};


exports.getAllBlog = async (req, res) => {
  try {
    const findblog = await Blog.find();
    if (!findblog || findblog.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetched all blogs successfully",
      data: findblog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    await User.findByIdAndUpdate(deletedBlog.user, { $pull: { blogs: deletedBlog._id } });

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting blog",
      error: error.message,
    });
  }
};


exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, user, categoryTitle, categoryHref, authorName, authorRole, authorHref, authorImageUrl } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating blog",
      error: error.message,
    });
  }
};

exports.getUserBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userWithBlogs = await User.findById(id).populate('blogs');

    if (!userWithBlogs) {
      return res.status(404).json({
        success: false,
        message: 'User not found or no blogs available',
      });
    }
      res.status(200).json({
      success: true,
      message: 'User blogs fetched successfully',
      data: userWithBlogs.blogs, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user blogs',
      error: error.message,
    });
  }
};
