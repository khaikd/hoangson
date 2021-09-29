import { Fragment, useContext, useEffect } from 'react';
import { UnitContext } from '../../contexts/UnitContext';
import { AuthContext } from '../../contexts/AuthContext';
import {Spinner, Card} from 'react-bootstrap';
import UpdateUnit from './UpdateUnit';
import DeleteModal from '../../components/layout/DeleteModal';

const ListUnit = () => {

    // Context
    const {authState: {user: {username} }} = useContext(AuthContext)
    const { 
        unitState: { unit, units, unitsLoading },
        getUnits,
        findUnit,
        deleteUnit,
        setShowUpdateUnit
    } = useContext(UnitContext)

    const chooseUnit = constructionId => {
        findUnit(constructionId)
        setShowUpdateUnit(true)
    }

    // Start: Get all data , []
    useEffect( () => getUnits(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    let body = null

    if(unitsLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }else if(units.length === 0){
        body = (
            <Fragment>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Xin chào {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Chào mừng bạn đến với phần mềm quản lý của công ty xây dựng Hoàng Sơn</Card.Title>
                        <Card.Text>
                            Nhấp vào nút thêm đơn vị để tạo mới
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
                                                <th className="w-220"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {units.map((unit, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{unit.name}</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <button className="btn btn-success btn-with-icon btn-block" onClick={chooseUnit.bind(this, unit._id)}><i className="fe fe-edit"></i> Sửa</button>
                                                        </div>
                                                        <div className="col-sm">
                                                            <DeleteModal idProps={unit._id} deleteFunc={deleteUnit} />
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
            {unit !== null && <UpdateUnit />}
        </Fragment>
    )
}

export default ListUnit
