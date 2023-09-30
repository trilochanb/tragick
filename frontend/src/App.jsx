import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MainWrapper from './layouts/MainWrapper';
import Login from './views/login';
import PrivateRoute from './layouts/PrivateRoute';
import Logout from './views/logout';
import Private from './views/private';
import Register from './views/register';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Product from './component/Product';
import Notfound from './component/Notfound';
import ShowProduct from "./component/Showproduct.jsx";
import ShowInstances from "./component/ShowInstances.jsx";
import { CreateAcknowledgement } from './component/CreateAcknowledgement';

function App() {
    return (
        <BrowserRouter>
            <MainWrapper>
                <Routes>
                    <Route
                        path="/"
                        element={<CreateAcknowledgement />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/all-products" element={<ShowProduct />} />
                    <Route path="/all-instances" element={<ShowInstances />} />
                    <Route path="*" element={<Notfound />} />
                </Routes>
            </MainWrapper>
        </BrowserRouter>
    );
}

export default App;
