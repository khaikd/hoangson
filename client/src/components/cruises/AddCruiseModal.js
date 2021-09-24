import {Modal, Button, Form} from 'react-bootstrap';
import { useContext, useState } from 'react';
import { CruiseContext } from '../../contexts/CruiseContext';

const AddCruiseModal = () => {
    // Context
    const {showAddCruiseModal, setShowAddCruiseModal, addCruise, setShowToast} = useContext(CruiseContext)

    // State
    const [newCruise, setNewCruise] = useState({
        name: '',
        rating: '',
        typeClass: '',
        cabins: '',
        sortOrder: '',
        description: '',
        saleNote: ''
    })

    const {name, rating, typeClass, cabins, sortOrder, description, saleNote} = newCruise

    const onChangeNewCruiseForm = event => setNewCruise( {...newCruise, [event.target.name]: event.target.value } )

    const closeDialog = () => {
        resetAddCruiseData()
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await addCruise(newCruise)
        resetAddCruiseData()
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const resetAddCruiseData = () => {
        setNewCruise({
            name: '',
            rating: '',
            typeClass: '',
            cabins: '',
            sortOrder,
            description: '',
            saleNote: ''
        })
        setShowAddCruiseModal(false)
    }

    return (
        <Modal show={showAddCruiseModal} onHide={closeDialog}
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
                    <div className="form-group">
                        <label>Name Cruise</label>
                        <input type="text" className="form-control" id="nameCruise" name="name" placeholder="Enter You Name Cruise" value={name} onChange={onChangeNewCruiseForm} required aria-describedby='name-help' />
                        <Form.Text id='name-help' muted>Required</Form.Text>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="form-group">
                                <label>Rating</label>
                                <input type="text" className="form-control" id="rating" name="rating" placeholder="0.0" value={rating} onChange={onChangeNewCruiseForm} />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="form-group">
                                <label>Class</label>
                                <input type="text" className="form-control" id="typeClass" name="typeClass" placeholder="Deluxe" value={typeClass} onChange={onChangeNewCruiseForm} />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="form-group">
                                <label>No. Cabin</label>
                                <input type="text" className="form-control" id="cabins" name="cabins" placeholder="No. Cabin" value={cabins} onChange={onChangeNewCruiseForm} />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="form-group">
                                <label>Sort Order</label>
                                <input type="text" className="form-control" id="sortOrder" name="sortOrder" placeholder="No." value={sortOrder} onChange={onChangeNewCruiseForm} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" placeholder="Description" rows="3" name='description' value={description} onChange={onChangeNewCruiseForm} spellCheck="false"></textarea>
                    </div>
                    <div className="form-group">
                        <label>Sale Note</label>
                        <textarea className="form-control" placeholder="Sale Note" rows="3" name='saleNote' value={saleNote} onChange={onChangeNewCruiseForm} spellCheck="false"></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger btn-with-icon" variant='secondary' onClick={closeDialog}><i className="fe fe-x-circle"></i> Cancel</Button>
                    <Button className="btn btn-primary btn-with-icon" variant='primary' type='submit'><i className="fe fe-save"></i> Save!!!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddCruiseModal
