import { Fragment, useContext, useEffect } from 'react';
import { ExportContext } from '../../contexts/ExportContext';
import { AuthContext } from '../../contexts/AuthContext';
import {Spinner, Card} from 'react-bootstrap';
import UpdateExport from './UpdateExport';
import ShowExport from './ShowExport';
import moment from 'moment';

const ListExport = () => {

    // Context
    const {authState: {user: {username} }} = useContext(AuthContext)
    const { 
        exportState: { dataExport, dataExports, dataExportsLoading },
        getExports,
        findExport,
        setShowUpdateExport,
        setShowViewExport
    } = useContext(ExportContext)

    const chooseExport = constructionId => {
        findExport(constructionId)
        setShowUpdateExport(true)
    }

    const chooseShowExport = constructionId => {
        findExport(constructionId)
        setShowViewExport(true)
    }

    // Start: Get all data , []
    useEffect( () => getExports(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    let body = null
    //console.log('dataExports', dataExports)
    if(dataExportsLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }else if(dataExports.length === 0){
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
                                                <th>Người Xuất</th>
                                                <th>Người Nhận</th>
                                                <th>Ngày Xuất</th>
                                                <th>Tên Kho</th>
                                                <th>Công Trình</th>
                                                <th className="w-220"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataExports.map((dataExport, index) => (
                                            <tr key={index}>
                                                <td style={ {lineHeight: "38px"} }>{index + 1}</td>
                                                <td style={ {lineHeight: "38px"} }>{dataExport.title}</td>
                                                <td style={ {lineHeight: "38px"} }>{dataExport.exporter}</td>
                                                <td style={ {lineHeight: "38px"} }>{dataExport.receiver}</td>
                                                <td style={ {lineHeight: "38px"} }>{moment(dataExport.dateExport).format('DD/MM/YYYY')}</td>
                                                <td style={ {lineHeight: "38px"} }>{dataExport.warehouse.name}</td>
                                                <td style={ {lineHeight: "38px"} }>{dataExport.construction.name}</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <button className="btn btn-primary btn-with-icon btn-block" onClick={chooseShowExport.bind(this, dataExport._id)}><i className="fe fe-file-text"></i> Xem</button>
                                                        </div>
                                                        <div className="col-sm">
                                                            <button className="btn btn-success btn-with-icon btn-block" onClick={chooseExport.bind(this, dataExport._id)}><i className="fe fe-edit"></i> Sửa</button>
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
            {dataExport !== null && <UpdateExport />}
            {dataExport !== null && <ShowExport />}
        </Fragment>
    )
}

export default ListExport
