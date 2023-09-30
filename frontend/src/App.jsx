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
import Navbar from './component/Balance.jsx';
import Dashboard from './component/Sidebar.jsx';
import Product from './component/Product';
import Ackno from './component/Ackno';
import CreateInstance from './component/CreateInstance';
import Notfound from './component/Notfound';
import Sidebar from "./component/Sidebar.jsx";
import ShowProduct from "./component/Showproduct.jsx";
import ShowInstances from "./component/ShowInstances.jsx";


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
                    <Route path="/sidebar" element={<Sidebar />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/ackno" element={<Ackno />} />
                    <Route path="/instance" element={<CreateInstance />} />
                    <Route path="*" element={<Notfound/>} />
                    <Route path="/all-products" element={<ShowProduct/>}/>
                    <Route path="/all-instances" element={<ShowInstances/>}/>
                    <Route path="*" element={<Notfound />} />
                </Routes>
            </MainWrapper>
        </BrowserRouter>
    );
}

export default App;
