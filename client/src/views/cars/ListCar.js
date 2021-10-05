import { Fragment, useContext, useEffect } from 'react';
import { CarContext } from '../../contexts/CarContext';
import { AuthContext } from '../../contexts/AuthContext';
import {Spinner, Card} from 'react-bootstrap';
import UpdateCar from './UpdateCar';
import DeleteModal from '../../components/layout/DeleteModal';

const ListCar = () => {

    // Context
    const {authState: {user: { name } }} = useContext(AuthContext)
    const { 
        carState: { car, cars, carsLoading },
        getCars,
        findCar,
        deleteCar,
        setShowUpdateCar
    } = useContext(CarContext)

    const chooseCar = carId => {
        findCar(carId)
        setShowUpdateCar(true)
    }

    // Start: Get all xe , []
    useEffect( () => getCars(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    let body = null

    if(carsLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }else if(cars.length === 0){
        body = (
            <Fragment>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Xin chào {name}</Card.Header>
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
                                                <th className="w-220"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cars.map((car, index) => (
                                            <tr key={index}>
                                                <td style={ {lineHeight: "38px"} }>{index + 1}</td>
                                                <td style={ {lineHeight: "38px"} }>{car.name}</td>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <button className="btn btn-success btn-with-icon btn-block" onClick={chooseCar.bind(this, car._id)}><i className="fe fe-edit"></i> Sửa</button>
                                                        </div>
                                                        <div className="col-sm">
                                                            <DeleteModal idProps={car._id} deleteFunc={deleteCar} />
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
            {car !== null && <UpdateCar />}
        </Fragment>
    )
}

export default ListCar
