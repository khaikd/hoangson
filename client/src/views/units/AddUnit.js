import { Modal, Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { UnitContext } from '../../contexts/UnitContext';

const AddUnit = () => {

    // Context
    const {showAddUnit, setAddUnit, addUnit, setShowToast} = useContext(UnitContext)

    // State
    const [newUnit, setNewUnit] = useState({
        name: ''
    })

    const { name } = newUnit

    const onChangeValue = event => setNewUnit( {...newUnit, [event.target.name]: event.target.value } )

    const closeDialog = () => {
        resetAddData()
    }

    const onSubmit = async event => {
        event.preventDefault()
        const { success, message } = await addUnit(newUnit)
        resetAddData()
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const resetAddData = () => {
        setNewUnit({
            name: ''
        })
        setAddUnit(false)
    }

    return (
        <Modal show={showAddUnit} onHide={closeDialog}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Tạo mới đơn vị
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="form-group">
                        <label><strong>Tên đơn vị</strong></label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Nhập tên đơn vị" value={name} onChange={onChangeValue} required aria-describedby='name-help' />
                        <Form.Text id='name-help' muted>Bắt buộc</Form.Text>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger btn-with-icon" variant='secondary' onClick={closeDialog}><i className="fe fe-x-circle"></i> Hủy</Button>
                    <Button className="btn btn-primary btn-with-icon" variant='primary' type='submit'><i className="fe fe-save"></i> Lưu!!!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddUnit
