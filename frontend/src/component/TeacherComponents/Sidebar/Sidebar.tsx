import React from 'react';
import './sidebar.css';
import { Link, NavLink } from 'react-router-dom';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { TeacherLink } from '../../../data/data';
import { TeacherLogout } from '../../../data/data';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../../../state/counterSlice';
import { logoutAPI } from '../../../services/teacher';

export const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async() => {
        dispatch(setLogout());
        const res= await logoutAPI();
        console.log(res);
        navigate('/login');
    }
    return (
        <div className='sideBar'>
            <div className='sideHeader'>
                <Link to='/' className='logo'>
                    <span>Test Online</span>
                </Link>
            </div>
            <div className='sideContent'>
                {TeacherLink.map((item) =>
                (
                    <NavLink
                        key={item.key}
                        to={item.to}
                        className={({isActive})=>(isActive ?"activeLink":"normalLink")}
                        style={({ isActive }) => ({
                            backgroundColor: 'red' ? '' : '',
                        })}
                    >
                        <SidebarItem icon={item.icon} name={item.name} />
                    </NavLink>
                )
                )}
            </div>
            <div className='sideFooter'>
                <SidebarItem icon={TeacherLogout.icon} name={TeacherLogout.name} handleLogout={handleLogout} />
            </div>
        </div>
    )
}
