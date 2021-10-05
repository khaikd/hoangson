import { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

const MainMenu = () => {

    // Context
    const {authState: {user: { level } }} = useContext(AuthContext)

    return (
        <Fragment>
            <div className="sticky">
                <div className="horizontal-main hor-menu clearfix side-header">
                    <div className="horizontal-mainwrapper container clearfix">
                        <nav className="horizontalMenu clearfix">
                            <ul className="horizontalMenu-list">
                                <li><Link to="/" title="Bảng điều khiển"><svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 5h4v6H5zm10 8h4v6h-4zM5 17h4v2H5zM15 5h4v2h-4z" opacity=".3"/><path d="M3 13h8V3H3v10zm2-8h4v6H5V5zm8 16h8V11h-8v10zm2-8h4v6h-4v-6zM13 3v6h8V3h-8zm6 4h-4V5h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2z"/></svg>Bảng Điều Khiển</Link></li>
                                
                                <li><span className="horizontalMenu-click"><i className="horizontalMenu-arrow fa fa-angle-down"></i></span><a href="#" className="sub-icon" title="Vật Liệu Xây Dựng"><svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M10.9 19.91c.36.05.72.09 1.1.09 2.18 0 4.16-.88 5.61-2.3L14.89 13l-3.99 6.91zm-1.04-.21l2.71-4.7H4.59c.93 2.28 2.87 4.03 5.27 4.7zM8.54 12L5.7 7.09C4.64 8.45 4 10.15 4 12c0 .69.1 1.36.26 2h5.43l-1.15-2zm9.76 4.91C19.36 15.55 20 13.85 20 12c0-.69-.1-1.36-.26-2h-5.43l3.99 6.91zM13.73 9h5.68c-.93-2.28-2.88-4.04-5.28-4.7L11.42 9h2.31zm-3.46 0l2.83-4.92C12.74 4.03 12.37 4 12 4c-2.18 0-4.16.88-5.6 2.3L9.12 11l1.15-2z" opacity=".3"></path><path d="M12 22c5.52 0 10-4.48 10-10 0-4.75-3.31-8.72-7.75-9.74l-.08-.04-.01.02C13.46 2.09 12.74 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10zm0-2c-.38 0-.74-.04-1.1-.09L14.89 13l2.72 4.7C16.16 19.12 14.18 20 12 20zm8-8c0 1.85-.64 3.55-1.7 4.91l-4-6.91h5.43c.17.64.27 1.31.27 2zm-.59-3h-7.99l2.71-4.7c2.4.66 4.35 2.42 5.28 4.7zM12 4c.37 0 .74.03 1.1.08L10.27 9l-1.15 2L6.4 6.3C7.84 4.88 9.82 4 12 4zm-8 8c0-1.85.64-3.55 1.7-4.91L8.54 12l1.15 2H4.26C4.1 13.36 4 12.69 4 12zm6.27 3h2.3l-2.71 4.7c-2.4-.67-4.35-2.42-5.28-4.7h5.69z"></path></svg> Vật Liệu Xây Dựng <i className="fe fe-chevron-down horizontal-icon"></i></a>
                                    <ul className="sub-menu">
                                        <li><Link to="/categories" className="slide-item" title="Nhóm Vật Liệu Xây Dượng">Nhóm</Link></li>
                                        <li><Link to="/materials" className="slide-item" title="Danh Sách Vật Liệu Xây Dượng">Danh Sách</Link></li>
                                        <li><Link to="/units" className="slide-item" title="Danh Sách Đơn Vị">Đơn Vị</Link></li>
                                    </ul>
                                </li>

                                <li><Link to="/constructions" title="Danh sách công trình"><svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.26 9L12 13.47 17.74 9 12 4.53z" opacity=".3"/><path d="M19.37 12.8l-7.38 5.74-7.37-5.73L3 14.07l9 7 9-7zM12 2L3 9l1.63 1.27L12 16l7.36-5.73L21 9l-9-7zm0 11.47L6.26 9 12 4.53 17.74 9 12 13.47z"/></svg> Công Trình</Link></li>

                                
                                <li><a href="#" className="sub-icon" title="Quản Lý Kho"><svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" viewBox="0 0 24 24" ><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5 0-.16-.08-.28-.14-.35-.41-.46-.63-1.05-.63-1.65 0-1.38 1.12-2.5 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 10 6.5 10s1.5.67 1.5 1.5S7.33 13 6.5 13zm3-4C8.67 9 8 8.33 8 7.5S8.67 6 9.5 6s1.5.67 1.5 1.5S10.33 9 9.5 9zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9zm4.5 2.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z" opacity=".3"/><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.21-.64-1.67-.08-.09-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm4 13h-1.77c-1.38 0-2.5 1.12-2.5 2.5 0 .61.22 1.19.63 1.65.06.07.14.19.14.35 0 .28-.22.5-.5.5-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.14 8 7c0 2.21-1.79 4-4 4z"/><circle cx="6.5" cy="11.5" r="1.5"/><circle cx="9.5" cy="7.5" r="1.5"/><circle cx="14.5" cy="7.5" r="1.5"/><circle cx="17.5" cy="11.5" r="1.5"/></svg> Quản Lý Kho <i className="fe fe-chevron-down horizontal-icon"></i></a>
                                    <ul className="sub-menu">
                                        <li><Link to="/warehouses" className="slide-item" title="Danh Sách Kho Xây Dựng">Danh Sách Kho</Link></li>
                                        <li><Link to="/depots" className="slide-item" title="Danh Sách Phiếu Nhập Kho">Nhập Kho</Link></li>
                                        <li><Link to="/exports" className="slide-item" title="Danh Sách Phiếu Xuất Kho">Xuất Kho</Link></li>
                                    </ul>
                                </li>
                                {/*
                                <li ><a href="#" className="sub-icon"><svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" className="side-menu__icon" viewBox="0 0 24 24" ><g><rect fill="none"/></g><g><g/><g><path d="M21,5c-1.11-0.35-2.33-0.5-3.5-0.5c-1.95,0-4.05,0.4-5.5,1.5c-1.45-1.1-3.55-1.5-5.5-1.5S2.45,4.9,1,6v14.65 c0,0.25,0.25,0.5,0.5,0.5c0.1,0,0.15-0.05,0.25-0.05C3.1,20.45,5.05,20,6.5,20c1.95,0,4.05,0.4,5.5,1.5c1.35-0.85,3.8-1.5,5.5-1.5 c1.65,0,3.35,0.3,4.75,1.05c0.1,0.05,0.15,0.05,0.25,0.05c0.25,0,0.5-0.25,0.5-0.5V6C22.4,5.55,21.75,5.25,21,5z M3,18.5V7 c1.1-0.35,2.3-0.5,3.5-0.5c1.34,0,3.13,0.41,4.5,0.99v11.5C9.63,18.41,7.84,18,6.5,18C5.3,18,4.1,18.15,3,18.5z M21,18.5 c-1.1-0.35-2.3-0.5-3.5-0.5c-1.34,0-3.13,0.41-4.5,0.99V7.49c1.37-0.59,3.16-0.99,4.5-0.99c1.2,0,2.4,0.15,3.5,0.5V18.5z"/><path d="M11,7.49C9.63,6.91,7.84,6.5,6.5,6.5C5.3,6.5,4.1,6.65,3,7v11.5C4.1,18.15,5.3,18,6.5,18 c1.34,0,3.13,0.41,4.5,0.99V7.49z" opacity=".3"/></g><g><path d="M17.5,10.5c0.88,0,1.73,0.09,2.5,0.26V9.24C19.21,9.09,18.36,9,17.5,9c-1.28,0-2.46,0.16-3.5,0.47v1.57 C14.99,10.69,16.18,10.5,17.5,10.5z"/><path d="M17.5,13.16c0.88,0,1.73,0.09,2.5,0.26V11.9c-0.79-0.15-1.64-0.24-2.5-0.24c-1.28,0-2.46,0.16-3.5,0.47v1.57 C14.99,13.36,16.18,13.16,17.5,13.16z"/><path d="M17.5,15.83c0.88,0,1.73,0.09,2.5,0.26v-1.52c-0.79-0.15-1.64-0.24-2.5-0.24c-1.28,0-2.46,0.16-3.5,0.47v1.57 C14.99,16.02,16.18,15.83,17.5,15.83z"/></g></g></svg>Admin Reports <i className="fe fe-chevron-down horizontal-icon"></i></a>
                                    <ul className="sub-menu">
                                        <li ><a href="./pages/profile" className="slide-item">Profile</a></li>
                                        <li ><a href="./pages/editprofile" className="slide-item">Edit-profile</a></li>
                                        <li  className="sub-menu-sub"><a href="#">Mail</a>
                                            <ul className="sub-menu">
                                                <li ><a href="./pages/mail" className="slide-item">Mail-inbox</a></li>
                                                <li ><a href="./pages/mail-compose" className="slide-item">Mail-compose</a></li>
                                                <li ><a href="./pages/mail-read" className="slide-item">Mail-read</a></li>
                                                <li ><a href="./pages/mail-settings" className="slide-item">Mail-settings</a></li>
                                                <li ><a href="./pages/chat" className="slide-item">Chat</a></li>

                                            </ul>
                                        </li>
                                        <li  className="sub-menu-sub"><a href="#">Forms</a>
                                            <ul className="sub-menu">
                                                <li ><a href="./pages/form-elements" className="slide-item">Form Elements</a></li>
                                                <li ><a href="./pages/form-advanced" className="slide-item">Advanced Forms</a></li>
                                                <li ><a href="./pages/form-layouts" className="slide-item">Form Layouts</a></li>
                                                <li ><a href="./pages/form-validation" className="slide-item">Form Validation</a></li>
                                                <li ><a href="./pages/form-wizards" className="slide-item">Form Wizards</a></li>
                                                <li ><a href="./pages/form-editor" className="slide-item">WYSIWYG Editor</a></li>
                                            </ul>
                                        </li>
                                        <li ><a href="./pages/invoice" className="slide-item">Invoice</a></li>
                                        <li ><a href="./pages/todotask" className="slide-item">Todotask</a></li>
                                        <li ><a href="./pages/pricing" className="slide-item">Pricing</a></li>
                                        <li ><a href="./pages/gallery" className="slide-item">Gallery</a></li>
                                        <li ><a href="./pages/faq" className="slide-item">Faqs</a></li>
                                        <li ><a href="./pages/empty" className="slide-item">Empty Page</a></li>
                                    </ul>
                                </li>
                                <li ><a href="#" className="sub-icon"><svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" opacity=".3"/><path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/></svg> Charts<i className="fe fe-chevron-down horizontal-icon"></i></a>
                                    <ul className="sub-menu">
                                        <li ><a href="./pages/chart-morris" className="slide-item">Morris Charts</a></li>
                                        <li ><a href="./pages/chart-flot" className="slide-item">Flot Charts</a></li>
                                        <li ><a href="./pages/chart-chartjs" className="slide-item">ChartJS</a></li>
                                        <li ><a href="./pages/chart-echart" className="slide-item">Echart</a></li>
                                        <li ><a href="./pages/chart-sparkline" className="slide-item">Sparkline</a></li>
                                        <li ><a href="./pages/chart-peity" className="slide-item"> Chart-peity</a></li>
                                    </ul>
                                </li>
                                */}
                                {level === 'manager' ? (
                                    <li><Link to="/users" className="sub-icon" title="Quản Lý Tài Khoản"><svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 20h12V10H6v10zm6-7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" opacity=".3"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg> Quản Lý Tài Khoản</Link></li>
                                ) : ''}
                                <li ><a href="#" className="sub-icon"><svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5H5v14h14V5zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" opacity=".3"/><path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm2 0h14v14H5V5zm2 5h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/></svg> Quản Lý Xe <i className="fe fe-chevron-down horizontal-icon"></i></a>
                                    <ul className="sub-menu">
                                        <li ><Link to="/staff" className="slide-item" title="Danh Nhân Viên">Danh Nhân Viên</Link></li>
                                        <li ><Link to="/cars" className="slide-item" title="Danh Sách Xe">Danh Sách Xe</Link></li>
                                        {/*<li ><a href="./pages/chart-flot" className="slide-item">Flot Charts</a></li>
                                        <li ><a href="./pages/chart-chartjs" className="slide-item">ChartJS</a></li>
                                        <li ><a href="./pages/chart-echart" className="slide-item">Echart</a></li>
                                        <li ><a href="./pages/chart-sparkline" className="slide-item">Sparkline</a></li>
                                        <li ><a href="./pages/chart-peity" className="slide-item"> Chart-peity</a></li>*/}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default MainMenu
