import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import Navbar from '../component/Navbar';

const Home = () => {
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);
    return (
        <div>
            {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
        </div>
    );
};

const LoggedInView = ({ user }) => {
    return (
        <>
            <div className="container-fluid">
                <Navbar/>
                <div className="body">this is body</div>

            </div>
        </>
    );
};

export const LoggedOutView = ({ title = 'Home' }) => {
    return (
        <div>
            <h1>{title}</h1>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/register">
                <button>Register</button>
            </Link>
        </div>
    );
};

export default Home;
