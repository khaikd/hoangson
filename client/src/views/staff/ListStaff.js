import { Fragment, useContext, useEffect } from 'react';
import { StaffContext } from '../../contexts/StaffContext';
import { AuthContext } from '../../contexts/AuthContext';
import { Spinner, Card } from 'react-bootstrap';
import UpdateStaff from './UpdateStaff';
import DeleteModal from '../../components/layout/DeleteModal';

const ListStaff = () => {

    // Context
    const {authState: {user: {name} }} = useContext(AuthContext)
    const { 
        staffState: { staff, staffs, staffsLoading },
        getStaffs,
        findStaff,
        deleteStaff,
        setShowUpdateStaff
    } = useContext(StaffContext)

    const chooseStaff = staffId => {
        findStaff(staffId)
        setShowUpdateStaff(true)
    }

    // Start: Get all staffs , []
    useEffect( () => getStaffs(), [] ) // eslint-disable-line react-hooks/exhaustive-deps
    let body = null

    if(staffsLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }else if(staffs.length === 0){
        body = (
            <Fragment>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Xin chào {name}</Card.Header>
                    <Card.Body>
                        <Card.Title>Chào mừng bạn đến với phần mềm quản lý của công ty xây dựng Hoàng Sơn</Card.Title>
                        <Card.Text>
                            Nhấp vào nút bên dưới để tạo nhóm vật liệu xây dựng
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Fragment>
        )
    }else{
        body = (
            <Fragment>
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
                                                    <th>Tên</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Tình trạng</th>
                                                    <th className="w-220"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {staffs.map((staff, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{staff.name}</td>
                                                    <td>{staff.phone}</td>
                                                    <td>{staff.status === "active" ? "Đang Làm" : "Đã Nghỉ"}</td>
                                                    <td>
                                                        <div className="row">
                                                            <div className="col-sm">
                                                                <button className="btn btn-success btn-with-icon btn-block" onClick={chooseStaff.bind(this, staff._id)}><i className="fe fe-edit"></i> Sửa</button>
                                                            </div>
                                                            <div className="col-sm">
                                                                <DeleteModal idProps={staff._id} deleteFunc={deleteStaff} />
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
            </Fragment>
        )  
    }

    return (
        <Fragment>
            {body}
            {staff !== null && <UpdateStaff />}
        </Fragment>
    )
}

export default ListStaff
