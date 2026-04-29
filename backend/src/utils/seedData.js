import User from '../models/User.js';
import BlogPost from '../models/BlogPost.js';

const seedData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    // Create sample users
    const users = await User.insertMany([
      {
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        bio: 'Tech enthusiast and passionate blogger',
      },
      {
        username: 'janedoe',
        email: 'jane@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        bio: 'Travel lover and lifestyle blogger',
      },
      {
        username: 'alexwilson',
        email: 'alex@example.com',
        password: 'password123',
        firstName: 'Alex',
        lastName: 'Wilson',
        bio: 'Business consultant and writer',
      },
    ]);

    console.log('Sample users created:', users.length);

    // Create sample blogs
    const blogs = await BlogPost.insertMany([
      {
        title: 'Getting Started with React Hooks',
        content: `<h2>Introduction to React Hooks</h2>
        <p>React Hooks revolutionized the way we write functional components. Before Hooks, you had to use class components to access state and lifecycle methods. Now, with Hooks, you can use these features in functional components.</p>
        <h3>What are Hooks?</h3>
        <p>Hooks are functions that let you "hook into" React state and lifecycle features from function components. They don't work inside classes — they let you use React without classes.</p>
        <h3>Common Hooks</h3>
        <ul>
          <li><strong>useState:</strong> Adds state to functional components</li>
          <li><strong>useEffect:</strong> Performs side effects in functional components</li>
          <li><strong>useContext:</strong> Consumes context values</li>
          <li><strong>useReducer:</strong> Manages complex state logic</li>
        </ul>
        <p>Learning hooks is essential for modern React development!</p>`,
        excerpt: 'Learn how to use React Hooks to manage state and lifecycle in functional components.',
        author: users[0]._id,
        category: 'Technology',
        tags: ['React', 'JavaScript', 'Hooks'],
        published: true,
        views: 1250,
      },
      {
        title: 'Top 5 Travel Destinations for 2024',
        content: `<h2>Discover Amazing Travel Destinations</h2>
        <p>Travel is one of the best ways to expand your horizons and create unforgettable memories. Here are my top 5 travel destinations for 2024.</p>
        <h3>1. Japan</h3>
        <p>From the bustling streets of Tokyo to the peaceful temples of Kyoto, Japan offers an incredible blend of ancient tradition and modern innovation.</p>
        <h3>2. Switzerland</h3>
        <p>With stunning Alpine scenery, charming villages, and world-class chocolate, Switzerland is a must-visit destination.</p>
        <h3>3. Thailand</h3>
        <p>Experience vibrant culture, delicious food, and beautiful beaches in Thailand. The people are incredibly welcoming!</p>
        <h3>4. Iceland</h3>
        <p>Waterfalls, glaciers, geysers, and hot springs make Iceland a nature lover's paradise.</p>
        <h3>5. Italy</h3>
        <p>Art, history, and amazing food await you in Italy. Don't miss Rome, Florence, and Venice!</p>`,
        excerpt: 'Explore the most amazing travel destinations you should visit in 2024.',
        author: users[1]._id,
        category: 'Travel',
        tags: ['Travel', 'Adventure', 'Destinations'],
        published: true,
        views: 2100,
      },
      {
        title: 'The Future of AI in Business',
        content: `<h2>How AI is Transforming Business</h2>
        <p>Artificial Intelligence is no longer just a buzzword—it's reshaping how businesses operate. Here's what the future holds.</p>
        <h3>Automation</h3>
        <p>AI is automating repetitive tasks, allowing employees to focus on more strategic work. This leads to increased productivity and reduced costs.</p>
        <h3>Customer Experience</h3>
        <p>AI-powered chatbots and personalized recommendations are enhancing customer experiences like never before.</p>
        <h3>Data Analysis</h3>
        <p>AI can process massive amounts of data and identify patterns that humans might miss, leading to better decision-making.</p>
        <h3>Predictive Analytics</h3>
        <p>Businesses are using AI to predict trends, anticipate customer needs, and optimize operations.</p>
        <p>The companies that embrace AI today will be the leaders of tomorrow!</p>`,
        excerpt: 'Discover how artificial intelligence is revolutionizing the business world.',
        author: users[2]._id,
        category: 'Business',
        tags: ['AI', 'Business', 'Technology', 'Future'],
        published: true,
        views: 3400,
      },
      {
        title: 'Mastering CSS Grid Layout',
        content: `<h2>CSS Grid: A Game-Changer for Web Design</h2>
        <p>CSS Grid has revolutionized layout design on the web. Let's explore how to master this powerful tool.</p>
        <h3>Grid Basics</h3>
        <p>CSS Grid is a two-dimensional layout system that lets you create complex layouts with rows and columns.</p>
        <h3>Grid Container vs Grid Item</h3>
        <p>The parent element becomes a grid container, and its children become grid items. You control the layout by defining rows and columns.</p>
        <h3>Grid Template</h3>
        <p>Use grid-template-columns and grid-template-rows to define the size of your grid tracks.</p>
        <h3>Grid Gap</h3>
        <p>The gap property lets you add space between grid items, making your layouts cleaner and more visually appealing.</p>
        <p>Once you master CSS Grid, you'll never go back to other layout methods!</p>`,
        excerpt: 'Master CSS Grid and create beautiful, responsive layouts with ease.',
        author: users[0]._id,
        category: 'Technology',
        tags: ['CSS', 'Web Design', 'Frontend'],
        published: true,
        views: 890,
      },
      {
        title: 'Healthy Eating on a Budget',
        content: `<h2>Eat Healthy Without Breaking the Bank</h2>
        <p>You don't need to spend a fortune to eat healthy. Here are my best tips for eating nutritious food on a budget.</p>
        <h3>Buy in Bulk</h3>
        <p>Buying whole grains, legumes, and nuts in bulk can save you a lot of money while providing excellent nutrition.</p>
        <h3>Seasonal Produce</h3>
        <p>Buy fruits and vegetables that are in season. They're cheaper and taste better!</p>
        <h3>Meal Planning</h3>
        <p>Plan your meals ahead of time to avoid impulse purchases and food waste.</p>
        <h3>Cook at Home</h3>
        <p>Cooking at home is much cheaper than eating out, and you have full control over the ingredients.</p>
        <h3>Don't Skip Breakfast</h3>
        <p>A healthy breakfast sets the tone for the day and helps you avoid unhealthy snacking.</p>
        <p>With these tips, healthy eating is affordable for everyone!</p>`,
        excerpt: 'Learn how to eat healthy and nutritious food without spending a lot of money.',
        author: users[1]._id,
        category: 'Lifestyle',
        tags: ['Health', 'Budget', 'Food', 'Tips'],
        published: true,
        views: 1560,
      },
      {
        title: 'NodeJS Best Practices',
        content: `<h2>Writing Better NodeJS Code</h2>
        <p>NodeJS is a powerful platform for building scalable applications. Here are some best practices to follow.</p>
        <h3>Use Environment Variables</h3>
        <p>Never hardcode sensitive information. Use environment variables to keep your application secure.</p>
        <h3>Error Handling</h3>
        <p>Always handle errors gracefully. Use try-catch blocks and proper error middleware.</p>
        <h3>Code Organization</h3>
        <p>Organize your code into logical modules. Separate concerns and keep your codebase clean.</p>
        <h3>Database Optimization</h3>
        <p>Use indexes, optimize queries, and consider implementing caching to improve performance.</p>
        <h3>Security</h3>
        <p>Always validate input, use HTTPS, and keep your dependencies up to date.</p>
        <p>Following these practices will help you build robust and maintainable NodeJS applications!</p>`,
        excerpt: 'Follow these best practices to write better, more secure NodeJS applications.',
        author: users[2]._id,
        category: 'Technology',
        tags: ['NodeJS', 'Backend', 'JavaScript', 'Best Practices'],
        published: true,
        views: 2200,
      },
    ]);

    console.log('Sample blogs created:', blogs.length);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export default seedData;
