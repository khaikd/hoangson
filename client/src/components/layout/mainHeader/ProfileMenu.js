import { Fragment, useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext';
import { Dropdown, Button } from 'react-bootstrap';
import avatar from '../../../assets/img/faces/6.jpg';

const ProfileMenu = () => {

    const {authState: {user: {_id, name, level}}, logoutUser} = useContext(AuthContext)
    const logout = () => logoutUser()

    return (
        <Fragment>
            <Dropdown className="dropdown main-profile-menu nav nav-item nav-link">
                <Dropdown.Toggle className="profile-user d-flex">
                    <img alt={name} src={avatar} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                    <div className="main-header-profile bg-primary p-3">
                        <div className="d-flex wd-100p">
                            <div className="main-img-user"><img alt={name} src={avatar} /></div>
                            <div className="ml-3 my-auto">
                                <h6>{name}</h6><span>{level === 'staff' ? "Nhân Viên" : level === 'stocker' ? "Thủ Kho" : level === 'accountant' ? "Kế Toán" : level === 'manager' ? "Giám Đốc" : ''}</span>
                            </div>
                        </div>
                    </div>
                    <Dropdown.Item className="dropdown-item" href={`/profile/${_id}`}><i className="bx bx-user-circle"></i>Thông Tin Người Dùng</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" href="#"><i className="bx bxs-inbox"></i>Hộp Thư</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" href="#"><i className="bx bx-envelope"></i>Tin Nhắn</Dropdown.Item>
                    <Button variant='secondary' className="dropdown-item" onClick={logout}><i className="bx bx-log-out"></i> Đăng Xuất</Button>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="dropdown main-header-message right-toggle">
                <a className="nav-link pr-0" href="#" data-toggle="sidebar-right" data-target=".sidebar-right">
                    <svg xmlns="http://www.w3.org/2000/svg" className="header-icon-svgs feather feather-maximize" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </a>
            </Dropdown>
        </Fragment>
    )
}

export default ProfileMenu
