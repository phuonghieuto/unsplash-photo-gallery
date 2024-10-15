import './App.css';
import Content from "./components/content/Content.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header/Header.tsx";
import PhotoDetail from './components/images/PhotoDetail.tsx';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/unsplash-photo-gallery" element={<Content />} />
                <Route path="/unsplash-photo-gallery/photos/:id" element={<PhotoDetail />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
};

export default App;