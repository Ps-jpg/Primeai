import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <span className="navbar-brand-icon">📋</span>
                <span>TaskHub</span>
            </Link>

            <div className="navbar-nav">
                {isAuthenticated ? (
                    <>
                        <div className="navbar-user">
                            <div className="navbar-user-info">
                                <span className="navbar-user-name">{user?.name}</span>
                                <span className="navbar-user-role">{user?.role}</span>
                            </div>
                        </div>
                        <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-link">Login</Link>
                        <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
