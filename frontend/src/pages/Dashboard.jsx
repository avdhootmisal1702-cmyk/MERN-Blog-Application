import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

export default function Dashboard() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('posts');
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [token]);

  const fetchUserData = async () => {
    try {
      const userRes = await apiClient.get('/auth/profile');
      setUser(userRes.data);

      const postsRes = await apiClient.get('/blogs/user/my-blogs');
      setUserPosts(postsRes.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await apiClient.delete(`/blogs/${id}`);
        setUserPosts(userPosts.filter((post) => post._id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/100"
              alt={user.username}
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div>
              <h1 className="text-4xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-blue-100">@{user.username}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {userPosts.length}
              </div>
              <p className="text-gray-600">Total Posts</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-2xl font-bold text-indigo-600 mb-2">0</div>
              <p className="text-gray-600">Total Views</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-2xl font-bold text-purple-600 mb-2">0</div>
              <p className="text-gray-600">Total Likes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-gray-200 sticky top-20 z-40 bg-white">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setTab('posts')}
            className={`py-4 px-6 font-semibold transition ${
              tab === 'posts'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            My Posts
          </button>
          <button
            onClick={() => setTab('settings')}
            className={`py-4 px-6 font-semibold transition ${
              tab === 'settings'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Settings
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {tab === 'posts' ? (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">My Blog Posts</h2>
                <Link
                  to="/write"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  Write New Post
                </Link>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : userPosts.length > 0 ? (
                <div className="space-y-4">
                  {userPosts.map((post) => (
                    <div
                      key={post._id}
                      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {post.excerpt}
                          </p>
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>
                              Published:{' '}
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            <span>📖 {post.views} views</span>
                            <span>❤️ {post.likes?.length || 0} likes</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Link
                            to={`/blog/${post._id}`}
                            className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-4 py-2 rounded font-semibold transition"
                          >
                            View
                          </Link>
                          <Link
                            to={`/edit/${post._id}`}
                            className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded font-semibold transition"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded font-semibold transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    You haven't written any posts yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start sharing your thoughts with the community
                  </p>
                  <Link
                    to="/write"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                  >
                    Write Your First Post
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Bio
                  </label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                    rows="4"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
