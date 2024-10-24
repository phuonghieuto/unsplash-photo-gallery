import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
            <h1 className="text-4xl font-bold mb-5">404 - Page Not Found</h1>
            <p className="text-lg mb-5">The page you are looking for does not exist.</p>
            <Link to="/" className="text-blue-500 hover:underline">Return to Homepage</Link>
        </div>
    );
};

export default NotFound;