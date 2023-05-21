import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { services } from '../services/services';
import { useNavigate } from 'react-router-dom';
import Logo from '../media/logo2.png';

const Navbar = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await services.handleSignout();
    navigate('/')
    window.location.reload()
  };

  return (
    <div className="fixed top-0 left-0 right-0 rounded-xl bg-gray-800 bg-opacity-50 px-16 py-3 shadow-lg backdrop-blur-md max-sm:px-8 z-10">
      <div className="flex justify-between items-center">
        <Link
          to={user ? '/app' : '/'}
          className="text-white text-opacity-50 hover:text-opacity-100"
        >
          <img src={Logo} alt="Logo" className="h-12" />
        </Link>
        <div className="flex items-center space-x-4">
          {!user && (
            <>
              <Link
                to="/signin"
                className="text-white text-opacity-50 hover:text-opacity-100"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-white text-opacity-50 hover:text-opacity-100"
              >
                Sign Up
              </Link>
            </>
          )}
          {user && (
            <button
              className="text-white text-opacity-50 hover:text-opacity-100"
              onClick={handleLogoutClick}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
