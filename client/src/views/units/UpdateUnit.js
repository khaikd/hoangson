import { Fragment, useContext, useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UnitContext } from '../../contexts/UnitContext';

const UpdateUnit = () => {

    // Context
    const {
        unitState: { unit },
        showUpdateUnit, 
        setShowUpdateUnit, 
        updateUnit, 
        setShowToast
    } = useContext(UnitContext)

    const [updatedUnit, setUpdatedUnit] = useState(unit)

    useEffect( () => setUpdatedUnit(unit), [unit] )

    const { name } = updatedUnit

    const onChangeValue = event => setUpdatedUnit( {...updatedUnit, [event.target.name]: event.target.value } )

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await updateUnit(updatedUnit)
        setShowUpdateUnit(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const closeDialog = () => {
        setUpdatedUnit(unit)
        setShowUpdateUnit(false)
    }

    return (
        <Fragment>
            <Modal show={showUpdateUnit} onHide={closeDialog}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sửa đơn vị
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
        </Fragment>
    )
}

export default UpdateUnit
