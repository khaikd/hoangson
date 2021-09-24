import { Fragment, useContext, useState, useEffect } from 'react';
import { CruiseContext } from '../../../contexts/CruiseContext';
import {Modal, Button, Form} from 'react-bootstrap';

const UpdateCruiseModal = () => {

    // Context
    const {
        cruiseState: {cruise},
        showUpdateCruiseModal, 
        setShowUpdateCruiseModal, 
        updateCruise, 
        setShowToast
    } = useContext(CruiseContext)

    // State
    const [updatedCruise, setUpdatedCruise] = useState(cruise)

    useEffect( () => setUpdatedCruise(cruise), [cruise] )

    const {name, rating, typeclassName, cabins, sortOrder, description, notes} = updatedCruise

    const onChangeUpdatedCruiseForm = event => setUpdatedCruise( {...updatedCruise, [event.target.name]: event.target.value } )

    const closeDialog = () => {
        setUpdatedCruise(cruise)
        setShowUpdateCruiseModal(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await updateCruise(updatedCruise)
        setShowUpdateCruiseModal(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    return (
        <Fragment>
            <Modal show={showUpdateCruiseModal} onHide={closeDialog}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Create New A Cruise
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div classNameName="form-group">
                            <label>Name Cruise</label>
                            <input type="text" classNameName="form-control" id="nameCruise" name="name" placeholder="Enter You Name Cruise" value={name} onChange={onChangeUpdatedCruiseForm} required aria-describedby='name-help' />
                            <Form.Text id='name-help' muted>Required</Form.Text>
                        </div>
                        <div classNameName="row">
                            <div classNameName="col-sm">
                                <div classNameName="form-group">
                                    <label>Rating</label>
                                    <input type="text" classNameName="form-control" id="rating" name="rating" placeholder="0.0" value={rating} onChange={onChangeUpdatedCruiseForm} />
                                </div>
                            </div>
                            <div classNameName="col-sm">
                                <div classNameName="form-group">
                                    <label>className</label>
                                    <input type="text" classNameName="form-control" id="typeclassName" name="typeclassName" placeholder="Deluxe" value={typeclassName} onChange={onChangeUpdatedCruiseForm} />
                                </div>
                            </div>
                            <div classNameName="col-sm">
                                <div classNameName="form-group">
                                    <label>No. Cabin</label>
                                    <input type="text" classNameName="form-control" id="cabins" name="cabins" placeholder="No. Cabin" value={cabins} onChange={onChangeUpdatedCruiseForm} />
                                </div>
                            </div>
                            <div classNameName="col-sm">
                                <div classNameName="form-group">
                                    <label>Sort Order</label>
                                    <input type="text" classNameName="form-control" id="sortOrder" name="sortOrder" placeholder="No." value={sortOrder} onChange={onChangeUpdatedCruiseForm} />
                                </div>
                            </div>
                        </div>
                        <div classNameName="form-group">
                            <label>Description</label>
                            <textarea classNameName="form-control" placeholder="Description" rows="3" name='description' value={description} onChange={onChangeUpdatedCruiseForm} spellCheck="false"></textarea>
                        </div>
                        <div classNameName="form-group">
                            <label>Sale Note</label>
                            <textarea classNameName="form-control" placeholder="Sale Note" rows="3" name='notes' value={notes} onChange={onChangeUpdatedCruiseForm} spellCheck="false"></textarea>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button classNameName="btn btn-danger btn-with-icon" variant='secondary' onClick={closeDialog}><i classNameName="fe fe-x-circle"></i> Cancel</Button>
                        <Button classNameName="btn btn-primary btn-with-icon" variant='primary' type='submit'><i classNameName="fe fe-save"></i> Save!!!</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Fragment>
    )
}

export default UpdateCruiseModal
