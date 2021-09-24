import { Fragment, useContext, useEffect } from 'react';
import { MaterialContext } from '../../../contexts/MaterialContext';
import { AuthContext } from '../../../contexts/AuthContext';
import {Spinner, Card} from 'react-bootstrap';
import UpdateMaterial from './UpdateMaterial';

const ListMaterial = () => {

    // Context
    const {authState: {user: {username} }} = useContext(AuthContext)
    const { 
        materialState: { material, materials, materialsLoading },
        getMaterials,
        findMaterial,
        deleteMaterial,
        setShowUpdateMaterial
    } = useContext(MaterialContext)

    const chooseMaterial = materialId => {
        findMaterial(materialId)
        setShowUpdateMaterial(true)
    }

    // Start: Get all Vật Liệu Xây Dựng , []
    useEffect( () => getMaterials(), [] ) // eslint-disable-line react-hooks/exhaustive-deps
    let body = null

    //console.log(material)

    if(materialsLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }else if(materials.length === 0){
        body = (
            <Fragment>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Xin chào {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Chào mừng bạn đến với phần mềm quản lý của công ty xây dựng Hoàng Sơn</Card.Title>
                        <Card.Text>
                            Nhấp vào nút bên dưới để tạo vật liệu xây dựng
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
                                                    <th className="w-220"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {materials.map((material, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{material.name}</td>
                                                    <td>
                                                        <div className="row">
                                                            <div className="col-sm">
                                                                <button className="btn btn-success btn-with-icon btn-block" onClick={chooseMaterial.bind(this, material._id)}><i className="fe fe-edit"></i> Sửa</button>
                                                            </div>
                                                            <div className="col-sm">
                                                                <button className="btn btn-danger btn-with-icon btn-block" onClick={deleteMaterial.bind(this, material._id)}><i className="fe fe-trash-2"></i> Xóa</button>
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
            {material !== null && <UpdateMaterial />}
        </Fragment>
    )
}

export default ListMaterial
