import { Fragment, useContext, useEffect } from 'react';
import { ConstructionContext } from '../../contexts/ConstructionContext';
import { AuthContext } from '../../contexts/AuthContext';
import {Spinner, Card} from 'react-bootstrap';
import moment from 'moment';
import UpdateConstruction from './UpdateConstruction';
import DeleteModal from '../../components/layout/DeleteModal';

const ListConstruction = () => {

    // Context
    const {authState: {user: {username} }} = useContext(AuthContext)
    const { 
        constructionState: { construction, constructions, constructionsLoading },
        getConstructions,
        findConstruction,
        deleteConstruction,
        setShowUpdateConstruction
    } = useContext(ConstructionContext)

    const chooseConstruction = constructionId => {
        findConstruction(constructionId)
        setShowUpdateConstruction(true)
    }

    // Start: Get all Công Trình , []
    useEffect( () => getConstructions(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    let body = null

    if(constructionsLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }else if(constructions.length === 0){
        body = (
            <Fragment>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Xin chào {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Chào mừng bạn đến với phần mềm quản lý của công ty xây dựng Hoàng Sơn</Card.Title>
                        <Card.Text>
                            Nhấp vào nút thêm công trình để tạo mới
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
                                                <th>Địa Chỉ</th>
                                                <th>Ngày Khởi Công</th>
                                                <th className="w-220"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {constructions.map((construction, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{construction.name}</td>
                                                <td>{construction.address}</td>
                                                <td>{moment(construction.publicDate).format('DD/MM/YYYY')}</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <button className="btn btn-success btn-with-icon btn-block" onClick={chooseConstruction.bind(this, construction._id)}><i className="fe fe-edit"></i> Sửa</button>
                                                        </div>
                                                        <div className="col-sm">
                                                            <DeleteModal idProps={construction._id} deleteFunc={deleteConstruction} />
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
            {construction !== null && <UpdateConstruction />}
        </Fragment>
    )
}

export default ListConstruction
