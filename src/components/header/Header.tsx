import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="shadow-md p-5 sticky top-0 bg-white z-50">
            <Link to="/" className="font-bold text-2xl font-mono">Photo Gallery</Link>
        </header>
    );
};

export default Header;