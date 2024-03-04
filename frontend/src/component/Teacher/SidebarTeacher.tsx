import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Sidebar.css';
import { SiShopware } from 'react-icons/si';
import { Link, NavLink } from 'react-router-dom';

const links = [
    {
        name: 'Dashboard',
        to: '/teacher/dashboard',
        main: true,
    },
    {
        name: 'Score',
        to: '/teacher/score',
    }
];
const SidebarTeacher = () => {
    const activeLink = 'activeLink';
    const normalLink = 'normalLink';

    return (
        <div className='side-bar'>
            <div className='sideTitle'>
                <Link to="/" className="logo">
                    <SiShopware />
                    <span>Test Online</span>
                </Link>
            </div>
            <div className='sideContent'>
                {
                    links.map((item) => {
                        return (
                            <NavLink
                                key={item.name}
                                className={({isActive})=>(isActive ?activeLink:normalLink)}
                                to={item.to}
                                style={({ isActive }) => ({
                                    backgroundColor: isActive ? '#03C9D7' : '',
                                })}
                            >
                                <span className="capitalize">{item.name}</span> 
                            </NavLink>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default SidebarTeacher;
