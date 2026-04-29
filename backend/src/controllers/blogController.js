import BlogPost from '../models/BlogPost.js';
import User from '../models/User.js';

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find({ published: true })
      .populate('author', 'username profileImage')
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id).populate('author', 'username profileImage');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    // Increment views
    blog.views += 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, published } = req.body;
    const normalizedTags = Array.isArray(tags)
      ? tags.map(tag => tag.trim()).filter(Boolean)
      : tags
      ? tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : [];
    const blog = new BlogPost({
      title,
      content,
      excerpt: excerpt || content.substring(0, 100),
      author: req.userId,
      category,
      tags: normalizedTags,
      published,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }
    const { title, content, excerpt, category, tags, published } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.excerpt = excerpt || blog.excerpt;
    blog.category = category || blog.category;
    if (tags !== undefined) {
      blog.tags = Array.isArray(tags)
        ? tags.map(tag => tag.trim()).filter(Boolean)
        : tags
        ? tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : blog.tags;
    }
    blog.published = published !== undefined ? published : blog.published;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }
    await BlogPost.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find({ author: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user blogs', error: error.message });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const likeIndex = blog.likes.indexOf(req.userId);
    if (likeIndex === -1) {
      blog.likes.push(req.userId);
    } else {
      blog.likes.splice(likeIndex, 1);
    }
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error liking blog', error: error.message });
  }
};
