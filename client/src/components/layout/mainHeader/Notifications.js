import { Fragment } from 'react'
import { Dropdown } from 'react-bootstrap';

const Notifications = () => {
    return (
        <Fragment>
            <Dropdown className="dropdown nav-item main-header-notification">
                <Dropdown.Toggle className="new nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" className="header-icon-svgs feather feather-bell" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg><span className=" pulse"></span>
                </Dropdown.Toggle>
                <div className="dropdown-menu">
                    <div className="menu-header-content bg-primary text-left">
                        <div className="d-flex">
                            <h6 className="dropdown-title mb-1 tx-15 text-white font-weight-semibold">Notifications</h6>
                            <span className="badge badge-pill badge-warning ml-auto my-auto float-right">Mark All Read</span>
                        </div>
                        <p className="dropdown-title-text subtext mb-0 text-white op-6 pb-0 tx-12 ">You have 4 unread Notifications</p>
                    </div>
                    <div className="main-notification-list Notification-scroll">
                        <Dropdown.Item className="d-flex p-3 border-bottom" href="#">
                            <div className="notifyimg bg-pink">
                                <i className="la la-file-alt text-white"></i>
                            </div>
                            <div className="ml-3">
                                <h5 className="notification-label mb-1">New files available</h5>
                                <div className="notification-subtext">10 hour ago</div>
                            </div>
                            <div className="ml-auto" >
                                <i className="las la-angle-right text-right text-muted"></i>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex p-3 border-bottom" href="#">
                            <div className="notifyimg bg-purple">
                                <i className="la la-gem text-white"></i>
                            </div>
                            <div className="ml-3">
                                <h5 className="notification-label mb-1">Updates Available</h5>
                                <div className="notification-subtext">2 days ago</div>
                            </div>
                            <div className="ml-auto" >
                                <i className="las la-angle-right text-right text-muted"></i>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex p-3 border-bottom" href="#">
                            <div className="notifyimg bg-success">
                                <i className="la la-shopping-basket text-white"></i>
                            </div>
                            <div className="ml-3">
                                <h5 className="notification-label mb-1">New Order Received</h5>
                                <div className="notification-subtext">1 hour ago</div>
                            </div>
                            <div className="ml-auto" >
                                <i className="las la-angle-right text-right text-muted"></i>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex p-3 border-bottom" href="#">
                            <div className="notifyimg bg-warning">
                                <i className="la la-envelope-open text-white"></i>
                            </div>
                            <div className="ml-3">
                                <h5 className="notification-label mb-1">New review received</h5>
                                <div className="notification-subtext">1 day ago</div>
                            </div>
                            <div className="ml-auto" >
                                <i className="las la-angle-right text-right text-muted"></i>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex p-3 border-bottom" href="#">
                            <div className="notifyimg bg-danger">
                                <i className="la la-user-check text-white"></i>
                            </div>
                            <div className="ml-3">
                                <h5 className="notification-label mb-1">22 verified registrations</h5>
                                <div className="notification-subtext">2 hour ago</div>
                            </div>
                            <div className="ml-auto" >
                                <i className="las la-angle-right text-right text-muted"></i>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="d-flex p-3 border-bottom" href="#">
                            <div className="notifyimg bg-primary">
                                <i className="la la-check-circle text-white"></i>
                            </div>
                            <div className="ml-3">
                                <h5 className="notification-label mb-1">Project has been approved</h5>
                                <div className="notification-subtext">4 hour ago</div>
                            </div>
                            <div className="ml-auto" >
                                <i className="las la-angle-right text-right text-muted"></i>
                            </div>
                        </Dropdown.Item>
                    </div>
                    <div className="dropdown-footer">
                        <a href="">VIEW ALL</a>
                    </div>
                </div>
            </Dropdown>
            <div className="nav-item full-screen fullscreen-button">
                <a className="new nav-link full-screen-link" href="#"><svg xmlns="http://www.w3.org/2000/svg" className="header-icon-svgs feather feather-maximize" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg></a>
            </div>
        </Fragment>
    )
}

export default Notifications
