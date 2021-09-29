import { Fragment, useContext, useEffect } from 'react';
import { WarehouseContext } from '../../contexts/WarehouseContext';
import { AuthContext } from '../../contexts/AuthContext';
import {Spinner, Card} from 'react-bootstrap';
import UpdateWarehouse from './UpdateWarehouse';
import DeleteModal from '../../components/layout/DeleteModal';

const ListWarehouse = () => {

    // Context
    const {authState: {user: {username} }} = useContext(AuthContext)
    const { 
        warehouseState: { warehouse, warehouses, warehousesLoading },
        getWarehouses,
        findWarehouse,
        deleteWarehouse,
        setShowUpdateWarehouse
    } = useContext(WarehouseContext)

    const chooseWarehouse = warehouseId => {
        findWarehouse(warehouseId)
        setShowUpdateWarehouse(true)
    }

    // Start: Get all Công Trình , []
    useEffect( () => getWarehouses(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    let body = null

    if(warehousesLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }else if(warehouses.length === 0){
        body = (
            <Fragment>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Xin chào {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Chào mừng bạn đến với phần mềm quản lý của công ty xây dựng Hoàng Sơn</Card.Title>
                        <Card.Text>
                            Nhấp vào nút thêm kho để tạo mới
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
                                                <th>Tên</th>
                                                <th>Số điện thoại</th>
                                                <th>Địa Chỉ</th>
                                                <th className="w-220"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {warehouses.map((warehouse, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{warehouse.name}</td>
                                                <td>{warehouse.phone}</td>
                                                <td>{warehouse.address}</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <button className="btn btn-success btn-with-icon btn-block" onClick={chooseWarehouse.bind(this, warehouse._id)}><i className="fe fe-edit"></i> Sửa</button>
                                                        </div>
                                                        <div className="col-sm">
                                                            <DeleteModal idProps={warehouse._id} deleteFunc={deleteWarehouse} />
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
            {warehouse !== null && <UpdateWarehouse />}
        </Fragment>
    )
}

export default ListWarehouse
