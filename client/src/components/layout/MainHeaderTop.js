import { Fragment } from 'react'
import { Link } from 'react-router-dom';
//import { AuthContext } from '../../contexts/AuthContext';
import MessageNotification from './mainHeader/MessageNotification';
import Notifications from './mainHeader/Notifications';
import ProfileMenu from './mainHeader/ProfileMenu';
// image
import desktopImg from '../../assets/img/brand/logo-white.png';
import logoImg from '../../assets/img/brand/logo.png';
import iconImg from '../../assets/img/brand/favicon.png';
import iconImgWhite from '../../assets/img/brand/favicon-white.png';



const MainHeaderTop = () => {

    //const {authState: {user: {username}}, logoutUser} = useContext(AuthContext)

    //const logout = () => logoutUser()

    return (
        <Fragment>
            <div className="main-header nav nav-item hor-header">
                <div className="container">
                    <div className="main-header-left ">
                        <Link className="animated-arrow hor-toggle horizontal-navtoggle" to="#"><span></span></Link>
                        <Link className="header-brand" to="/" title="K2 Software">
                            <img src={iconImg} className="desktop-dark" alt="K2 Software" />
                            <strong className="float-left" style={ {lineHeight: "32px"} }><img src={iconImg} className="desktop-logo float-left" alt="K2 Software" /> <span className="ml-2 float-left" style={ {} }>K2 Software</span></strong>
                            <img src={iconImg} className="desktop-logo-1" alt="K2 Software" />
                            <img src={iconImgWhite} className="desktop-logo-dark" alt="K2 Software" />
                        </Link>
                        <div className="main-header-center ml-4">
                            <input className="form-control" placeholder="Search..." type="search" /><button className="btn"><i className="bx bx-search"></i></button>
                        </div>
                    </div>
                    <div className="main-header-right">
                        <div className="nav nav-item  navbar-nav-right ml-auto">
                            <MessageNotification />
                            <Notifications />
                            <ProfileMenu />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MainHeaderTop
