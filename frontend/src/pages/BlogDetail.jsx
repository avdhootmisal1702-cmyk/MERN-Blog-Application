import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiClient from '../services/api';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchBlogAndComments();
  }, [id]);

  const fetchBlogAndComments = async () => {
    try {
      const blogRes = await apiClient.get(`/blogs/${id}`);
      setBlog(blogRes.data);

      const commentsRes = await apiClient.get(`/blogs/${id}/comments`);
      setComments(commentsRes.data);
    } catch (error) {
      console.error('Error fetching blog or comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('Please login to comment');
      return;
    }

    try {
      await apiClient.post(`/blogs/${id}/comments`, { content: commentText });
      setCommentText('');
      fetchBlogAndComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Blog Content */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Blog Header */}
          <div className="mb-8">
            {blog?.featuredImage && (
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
              />
            )}
            <h1 className="text-5xl font-bold text-gray-800 mb-4">{blog?.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt={blog?.author?.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {blog?.author?.username}
                  </p>
                  <p className="text-sm">
                    {blog?.createdAt &&
                      new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <span>📖 {blog?.views || 0} views</span>
                <span>❤️ {blog?.likes?.length || 0} likes</span>
              </div>
            </div>
          </div>

          {/* Blog Body */}
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />

          {/* Tags */}
          {blog?.tags && blog.tags.length > 0 && (
            <div className="flex gap-2 mb-8 flex-wrap">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Comments Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Comments</h2>

          {/* Comment Form */}
          <form onSubmit={handleComment} className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              rows="4"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex gap-4">
                    <img
                      src="https://via.placeholder.com/40"
                      alt={comment.author?.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {comment.author?.username}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 mt-2">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
