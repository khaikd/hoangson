import { Fragment, useContext, useEffect } from 'react';
import { CruiseContext } from '../../../contexts/CruiseContext';
import { AuthContext } from '../../../contexts/AuthContext';
import {Spinner, Card} from 'react-bootstrap';
import UpdateCruiseModal from './UpdateCruiseModal';

const ListCruise = () => {

    // Context
    const {authState: {user: {username} }} = useContext(AuthContext)
    const { 
        cruiseState: {cruise, cruises, cruisesLoading},
        getCruises,
        findCruise,
        deleteCruise,
        setShowUpdateCruiseModal
    } = useContext(CruiseContext)

    const chooseCruise = cruiseId => {
        findCruise(cruiseId)
        setShowUpdateCruiseModal(true)
    }

    // Start: Get all cruise , []
    useEffect( () => getCruises(), [] ) // eslint-disable-line react-hooks/exhaustive-deps
    let body = null

    if(cruisesLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }else if(cruises.length === 0){
        body = (
            <Fragment>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to Cruise Manage</Card.Title>
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
                                                    <th className="w-220"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cruises.map((cruise, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{cruise.name}</td>
                                                    <td>
                                                        <div className="row">
                                                            <div className="col-sm">
                                                                <button className="btn btn-success btn-with-icon btn-block" onClick={chooseCruise.bind(this, cruise._id)}><i className="fe fe-edit"></i> Edit</button>
                                                            </div>
                                                            <div className="col-sm">
                                                                <button className="btn btn-danger btn-with-icon btn-block" onClick={deleteCruise.bind(this, cruise._id)}><i className="fe fe-trash-2"></i> Delete</button>
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
            {cruise !== null && <UpdateCruiseModal />}
        </Fragment>
    )
}

export default ListCruise
