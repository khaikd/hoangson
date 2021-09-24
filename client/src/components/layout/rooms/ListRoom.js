import { Fragment, useContext, useEffect } from 'react';
import { RoomContext } from '../../../contexts/RoomContext';
import { AuthContext } from '../../../contexts/AuthContext';
//import { CruiseContext } from '../../../contexts/CruiseContext';
import {Spinner, Card} from 'react-bootstrap';

const ListRoom = () => {

    // Context
    const {authState: {user: {username} }} = useContext(AuthContext)
    const { 
        roomState: {room, rooms, roomsLoading},
        getRooms
    } = useContext(RoomContext)

    /*const { 
        cruiseState: {cruise},
        FindACruise 
    } = useContext(CruiseContext)*/

    // Start: Get all rooms , []
    useEffect( () => getRooms() )

    /*const showCruise = cruiseId => {
        cruise = FindACruise(cruiseId)
        console.log(cruise)
    }*/

    let body = null


    if(roomsLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }else if(rooms.length === 0){
        body = (
            <Fragment>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to Room Manage</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to learn
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
                                                    <th>Name</th>
                                                    <th>Type</th>
                                                    <th>Max Room</th>
                                                    <th>Cruise</th>
                                                    <th>Location</th>
                                                    <th className="w-220"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rooms.map((room, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{room.name}</td>
                                                    <td>{room.typeBed}</td>
                                                    <td>{room.maxRoom}</td>
                                                    <td>{room.cruiseId}</td>
                                                    <td>{room.locationRoom}</td>
                                                    <td>
                                                        <div className="row">
                                                            <div className="col-sm">
                                                                <button className="btn btn-success btn-with-icon btn-block"><i className="fe fe-edit"></i> Edit</button>
                                                            </div>
                                                            <div className="col-sm">
                                                                <button className="btn btn-danger btn-with-icon btn-block"><i className="fe fe-trash-2"></i> Delete</button>
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
        </Fragment>
    )
}

export default ListRoom
