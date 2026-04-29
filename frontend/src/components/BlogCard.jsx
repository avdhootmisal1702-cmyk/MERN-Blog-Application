import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex gap-2 mb-2">
          {blog.tags?.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {truncateText(blog.excerpt || blog.content, 100)}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{blog.author?.username || 'Unknown'}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        <Link
          to={`/blog/${blog._id}`}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
