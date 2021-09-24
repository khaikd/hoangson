import { Fragment, useContext, useEffect } from 'react';
import { DepotContext } from '../../contexts/DepotContext';
import { AuthContext } from '../../contexts/AuthContext';
import {Spinner, Card} from 'react-bootstrap';
import UpdateDepot from './UpdateDepot';
import ShowDepot from './ShowDepot';
import moment from 'moment';

const ListDepot = () => {

    // Context
    const {authState: {user: {username} }} = useContext(AuthContext)
    const { 
        depotState: { depot, depots, depotsLoading },
        getDepots,
        findDepot,
        setShowViewDepot,
        setShowUpdateDepot
    } = useContext(DepotContext)

    const chooseDepot = constructionId => {
        findDepot(constructionId)
        setShowUpdateDepot(true)
    }

    const chooseShowDepot = constructionId => {
        findDepot(constructionId)
        setShowViewDepot(true)
    }

    // Start: Get all data , []
    useEffect( () => getDepots(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    let body = null

    if(depotsLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }else if(depots.length === 0){
        body = (
            <Fragment>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Xin chào {username}</Card.Header>
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
                                                <th>Tên</th>
                                                <th>Người Nhận</th>
                                                <th>Ngày Nhập</th>
                                                <th>Tên Kho</th>
                                                <th className="w-220"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {depots.map((depot, index) => (
                                            <tr key={index}>
                                                <td style={ {lineHeight: "38px"} }>{index + 1}</td>
                                                <td style={ {lineHeight: "38px"} }>{depot.title}</td>
                                                <td style={ {lineHeight: "38px"} }>{depot.receiver}</td>
                                                <td style={ {lineHeight: "38px"} }>{moment(depot.dateAdded).format('DD/MM/YYYY')}</td>
                                                <td style={ {lineHeight: "38px"} }>{depot.warehouse.name}</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <button className="btn btn-primary btn-with-icon btn-block" onClick={chooseShowDepot.bind(this, depot._id)}><i className="fe fe-file-text"></i> Xem</button>
                                                        </div>
                                                        <div className="col-sm">
                                                            <button className="btn btn-success btn-with-icon btn-block" onClick={chooseDepot.bind(this, depot._id)}><i className="fe fe-edit"></i> Sửa</button>
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
            {depot !== null && <UpdateDepot />}
            {depot !== null && <ShowDepot />}
        </Fragment>
    )
}

export default ListDepot
