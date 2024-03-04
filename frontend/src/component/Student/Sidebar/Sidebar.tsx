import './Sidebar.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../../../state/counterSlice';
import { logoutAPI } from '../../../services/teacher';

export default function Sidebar() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleLogout = async() => {
    dispatch(setLogout());
    const res= await logoutAPI();
    navigate('/login');
  }
  return (
    <div
      className="position-sticky d-flex flex-column  p-1 text-white"
      style={{ backgroundColor: '#153462', width: '280px', minHeight: '100vh' }}
    >
      <div className="mb-4 mt-3">
        <Link
          to="/"
          className="d-flex justify-content-center align-items-center mb-4 mb-md-4 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-3">Test Online</span>
        </Link>
      </div>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/student/dashboard"
            className={({ isActive }) => ` text-white nav-link ${isActive ? 'active' : ''}`}
          >
            <i className="fas fa-home mr-3"></i> Home
          </NavLink>
        </li>
        <li className="nav-item" style={{ marginBottom: '225px' }}>
          <NavLink to="/student/test" className={({ isActive }) => ` text-white nav-link ${isActive ? 'active' : ''}`}>
            <i className="fas fa-question-circle mr-3"></i> Upcoming Test
          </NavLink>
        </li>

        <li>
          <div className="nav-link text-white mt-32" style={{ cursor: 'pointer' }} onClick={handleLogout}>
            <i className="fas fa-sign-out mr-2"></i> Logout
          </div>
        </li>
      </ul>
    </div>
  );
}
