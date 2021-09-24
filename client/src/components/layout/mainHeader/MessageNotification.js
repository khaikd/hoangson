import { Fragment } from 'react'
import { Dropdown } from 'react-bootstrap';

const MessageNotification = () => {
    return (
        <Fragment>
            <Dropdown className="dropdown nav-item main-header-message ">
                <Dropdown.Toggle className="new nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" className="header-icon-svgs feather feather-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg><span className=" pulse-danger"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                    <div className="menu-header-content bg-primary text-left">
                        <div className="d-flex">
                            <h6 className="dropdown-title mb-1 tx-15 text-white font-weight-semibold">Messages</h6>
                            <span className="badge badge-pill badge-warning ml-auto my-auto float-right">Mark All Read</span>
                        </div>
                        <p className="dropdown-title-text subtext mb-0 text-white op-6 pb-0 tx-12 ">You have 4 unread messages</p>
                    </div>
                    <div className="main-message-list chat-scroll">
                        <Dropdown.Item href="#" className="p-3 d-flex border-bottom">
                            <div className="drop-img  cover-image" data-image-src="./assets/img/faces/3.jpg">
                                <span className="avatar-status bg-teal"></span>
                            </div>
                            <div className="wd-90p">
                                <div className="d-flex">
                                    <h5 className="mb-1 name">Petey Cruiser</h5>
                                </div>
                                <p className="mb-0 desc">I'm sorry but i'm not sure how to help you with that......</p>
                                <p className="time mb-0 text-left float-left ml-2 mt-2">Mar 15 3:55 PM</p>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="./pages/chat" className="p-3 d-flex border-bottom">
                            <div className="drop-img cover-image" data-image-src="./assets/img/faces/2.jpg">
                                <span className="avatar-status bg-teal"></span>
                            </div>
                            <div className="wd-90p">
                                <div className="d-flex">
                                    <h5 className="mb-1 name">Jimmy Changa</h5>
                                </div>
                                <p className="mb-0 desc">All set ! Now, time to get to you now......</p>
                                <p className="time mb-0 text-left float-left ml-2 mt-2">Mar 06 01:12 AM</p>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="./pages/chat" className="p-3 d-flex border-bottom">
                            <div className="drop-img cover-image" data-image-src="./assets/img/faces/9.jpg">
                                <span className="avatar-status bg-teal"></span>
                            </div>
                            <div className="wd-90p">
                                <div className="d-flex">
                                    <h5 className="mb-1 name">Graham Cracker</h5>
                                </div>
                                <p className="mb-0 desc">Are you ready to pickup your Delivery...</p>
                                <p className="time mb-0 text-left float-left ml-2 mt-2">Feb 25 10:35 AM</p>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="./pages/chat" className="p-3 d-flex border-bottom">
                            <div className="drop-img cover-image" data-image-src="./assets/img/faces/12.jpg">
                                <span className="avatar-status bg-teal"></span>
                            </div>
                            <div className="wd-90p">
                                <div className="d-flex">
                                    <h5 className="mb-1 name">Donatella Nobatti</h5>
                                </div>
                                <p className="mb-0 desc">Here are some products ...</p>
                                <p className="time mb-0 text-left float-left ml-2 mt-2">Feb 12 05:12 PM</p>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="./pages/chat" className="p-3 d-flex border-bottom">
                            <div className="drop-img cover-image" data-image-src="./assets/img/faces/5.jpg">
                                <span className="avatar-status bg-teal"></span>
                            </div>
                            <div className="wd-90p">
                                <div className="d-flex">
                                    <h5 className="mb-1 name">Anne Fibbiyon</h5>
                                </div>
                                <p className="mb-0 desc">I'm sorry but i'm not sure how...</p>
                                <p className="time mb-0 text-left float-left ml-2 mt-2">Jan 29 03:16 PM</p>
                            </div>
                        </Dropdown.Item>
                    </div>
                    <div className="text-center dropdown-footer">
                        <a href="text-center">VIEW ALL</a>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    )
}

export default MessageNotification
