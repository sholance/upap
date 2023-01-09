import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useUnstoppableDomains } from '../hook';
import Landing from './landing';
import Profile from './profile';
import Dashboard from './dashboard';


export default function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false)
    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    const user = useSelector((state: RootState) => state.user.user);

    const unstoppableDomains = useUnstoppableDomains();
    const loginWithUd = () => {
        unstoppableDomains.login();
    };
    const logOutFromUd = () => {
        unstoppableDomains.logout();
    }

    return (
        <>
            <Router>
                <div>
                    <nav>
                        <div className='nav-logo'>
                            <Link to="/" className='link'>UPAP
                            </Link>
                        </div>
                        {(toggleMenu && (
                            <div className='mobile-nav'>
                                <ul className='list'>
                                    <div className='nav-items'>
                                        <Link to="/profile" className='link'>Profile</Link>
                                    </div>
                                    <div className='nav-items'>
                                        <Link to="/Dashboard" className='link'>Dashboard</Link>
                                    </div>
                                    <div className='nav-items'>
                                        {user ? (
                                            <div className=' mobile-connect-nav'>Connected to {user.walletId} </div>
                                        ) : (
                                            <div className=''>
                                                <button className='mobile-button' onClick={loginWithUd}>Connect with Unstoppable</button>
                                            </div>
                                        )
                                        }
                                    </div>

                                </ul>
                            </div>
                        ))}
                        <div className='nav-link'>
                            <div className='nav-item'>
                                <Link to="/profile" className='link'>Profile</Link>
                            </div>
                            <div className='nav-item'>
                                <Link to="/dashboard" className='link'>Dashboard</Link>
                            </div>

                            {user ? (
                                <div className='nav-item connect-nav'>Connected to {user.walletId} </div>
                            ) : (
                                <button className='nav-item connect-nav' onClick={loginWithUd}>Connect with Unstoppable</button>
                            )
                            }
                        </div>
                        <a id="menu-icon" className="menu-icon responsive" onClick={toggleNav}>
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#3d2b7c" stroke-width="2" stroke-linecap="butt" stroke-linejoin="arcs"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </a>
                    </nav>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>

                </div>
            </Router>
        </>
    );
}
