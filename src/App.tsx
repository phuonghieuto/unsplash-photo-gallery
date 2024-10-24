import './App.css';
import Content from "./components/content/Content.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header/Header.tsx";
import PhotoDetail from './components/images/PhotoDetail.tsx';
import NotFound from './components/404/NotFound.tsx';

const App = () => {
    return (
        <Router basename="/unsplash-photo-gallery">
            <Header />
            <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/photos/:id" element={<PhotoDetail />} />
                <Route path="*" element={<NotFound />} /> {/* Add this line */}
            </Routes>
            <ToastContainer />
        </Router>
    );
};

export default App;