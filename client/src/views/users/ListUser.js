import { Fragment, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import {Spinner, Card} from 'react-bootstrap';
import UpdateUser from './UpdateUser';
import DeleteModal from '../../components/layout/DeleteModal';

const ListUser = () => {

    const {
        authState: { users, user, authLoading },
        getUsers,
        findUser,
        deleteUser,
        setShowUpdateUser
    } = useContext(AuthContext)

    // Start: Get all data , []
    useEffect( () => getUsers(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    const chooseUser = userId => {
        findUser(userId)
        setShowUpdateUser(true)
    }

    let body = null

    if(authLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }else if(users.length === 0){
        body = (
            <Fragment>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Xin chào</Card.Header>
                    <Card.Body>
                        <Card.Title>Chào mừng bạn đến với phần mềm quản lý của công ty xây dựng Hoàng Sơn</Card.Title>
                        <Card.Text>
                            Nhấp vào nút nhập kho để tạo mới
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Fragment>
        )
    }else{
        body = (
            <div className="ajax-booking-cruise">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="table-info-cruise mg-b-20">
                            <div className="table-info-cruise-body">
                                <div className="table-responsive">
                                    <table className="table mg-b-0 text-md-nowrap">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Họ và tên</th>
                                                <th>Username</th>
                                                <th>Số điện thoại</th>
                                                <th>Chức vụ</th>
                                                <th>Tình trạng</th>
                                                <th className="w-220"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                            <tr key={index}>
                                                <td style={ {lineHeight: "38px"} }>{index + 1}</td>
                                                <td style={ {lineHeight: "38px"} }>{user.name}</td>
                                                <td style={ {lineHeight: "38px"} }>{user.username}</td>
                                                <td style={ {lineHeight: "38px"} }>{user.phone}</td>
                                                <td style={ {lineHeight: "38px"} }>{user.level === 'staff' ? "Nhân Viên" : user.level === 'stocker' ? "Thủ Kho" : user.level === 'accountant' ? "Kế Toán" : user.level === 'manager' ? "Giám Đốc" : ''}</td>
                                                <td style={ {lineHeight: "38px"} }>{user.status === 'active' ? "Hoạt Động" : "Chưa Hoạt Động"}</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <button className="btn btn-success btn-with-icon btn-block" onClick={chooseUser.bind(this, user._id)}><i className="fe fe-edit"></i> Sửa</button>
                                                        </div>
                                                        <div className="col-sm">
                                                            <DeleteModal idProps={user._id} deleteFunc={deleteUser} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            {body}
            {user !== null && <UpdateUser />}
        </Fragment>
    )
}

export default ListUser
