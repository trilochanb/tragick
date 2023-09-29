import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './views/home';
import MainWrapper from './layouts/MainWrapper';
import Login from './views/login';
import PrivateRoute from './layouts/PrivateRoute';
import Logout from './views/logout';
import Private from './views/private';
import Register from './views/register';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Navbar from './component/Navbar';
import Dashboard from './component/Dashboard';
import Product from './component/Product';
import Notfound from './component/Notfound';


function App() {
    return (
        <BrowserRouter>
            <MainWrapper>
                <Routes>

                    <Route
                        path="/private"
                        element={
                            <PrivateRoute>
                                <Private />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/navbar" element={<Navbar />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="*" element={<Notfound   />} />
                    
                </Routes>
            </MainWrapper>
        </BrowserRouter>
    );
}

export default App;
