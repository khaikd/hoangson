import {Modal, Button, Form} from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { CarContext } from '../../contexts/CarContext';
import { StaffContext } from '../../contexts/StaffContext';
import Select from 'react-select';


const AddCar = () => {

    // Context
    const {showAddCar, setAddCar, addCar, setShowToast} = useContext(CarContext)

    const { 
        staffState: { staffs },
        getStaffs
    } = useContext(StaffContext)

    let optionStaffs = []

    // Start: Get all data , []
    useEffect( () => getStaffs(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    // State
    const [newCar, setNewCar] = useState({
        name: '',
        description: '',
    })

    const { name, description } = newCar

    const onChangeValue = event => setNewCar( {...newCar, [event.target.name]: event.target.value } )

    if(staffs.length > 0){
        staffs.map((staff) => 
            optionStaffs = [ ...optionStaffs, 
                {
                    value: staff._id,
                    label: staff.name,
                }
            ]
        )
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await addCar(newCar)
        closeDialog()
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const handleChange = (newValue, actionMeta) => {
        const data = newValue;
        if(data){
            const dataValue = data.value
            setNewCar( {...newCar, staff: dataValue } )
        }else{
            setNewCar( {...newCar, staff: "" } )
        }
    }

    const closeDialog = () => {
        setNewCar({
            name: '',
            description: ''
        })
        setAddCar(false)
    }



    return (
        <Modal show={showAddCar} onHide={closeDialog}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    T???o m???i xe
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="form-group">
                        <label><strong>T??n Xe</strong></label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Nh???p t??n xe" value={name} onChange={onChangeValue} required aria-describedby='name-help' />
                        <Form.Text id='name-help' muted>B???t bu???c</Form.Text>
                    </div>
                    <div className="form-group">
                        <label><strong>M?? t???</strong></label>
                        <textarea className="form-control" placeholder="M?? t??? xe" rows="3" name='description' value={description} onChange={onChangeValue} spellCheck="false"></textarea>
                    </div>
                    <div className="form-group">
                        <label><strong>Ng?????i Qu???n L?? Xe</strong></label>
                        <Select isClearable
                            onChange={handleChange.bind(this)}
                            options={optionStaffs} 
                            menuPosition={'fixed'}
                            placeholder="Ch???n Qu???n L?? Xe"
                            name="staff"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger btn-with-icon" variant='secondary' onClick={closeDialog}><i className="fe fe-x-circle"></i> H???y</Button>
                    <Button className="btn btn-primary btn-with-icon" variant='primary' type='submit'><i className="fe fe-save"></i> L??u!!!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddCar
