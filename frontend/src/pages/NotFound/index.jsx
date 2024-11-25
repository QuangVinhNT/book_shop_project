import { Link } from "react-router-dom";

// src/pages/NotFound.jsx
const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for exist.</p>
      <Link href="/" style={{ textDecoration: 'none', color: 'blue' }}>Go to Home</Link>
    </div>
  );
};

export default NotFound;
