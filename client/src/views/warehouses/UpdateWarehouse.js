import { Modal, Button, Form } from 'react-bootstrap';
import { Fragment, useContext, useState, useEffect } from 'react';
import { WarehouseContext } from '../../contexts/WarehouseContext';

const UpdateWarehouse = () => {

    // Context
    const {
        warehouseState: { warehouse },
        showUpdateWarehouse, 
        setShowUpdateWarehouse, 
        updateWarehouse, 
        setShowToast
    } = useContext(WarehouseContext)

    const [updatedWarehouse, setUpdatedWarehouse] = useState(warehouse)

    useEffect( () => setUpdatedWarehouse(warehouse), [warehouse] )

    const {name, phone, address, description} = updatedWarehouse

    const onChangeValue = event => setUpdatedWarehouse( {...updatedWarehouse, [event.target.name]: event.target.value } )

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await updateWarehouse(updatedWarehouse)
        setShowUpdateWarehouse(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const closeDialog = () => {
        setUpdatedWarehouse(warehouse)
        setShowUpdateWarehouse(false)
    }

    return (
        <Fragment>
            <Modal show={showUpdateWarehouse} onHide={closeDialog}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Cập nhật kho : {name}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div className="form-group">
                            <label><strong>Tên Kho</strong></label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Nhập tên kho" value={name} onChange={onChangeValue} required aria-describedby='name-help' />
                            <Form.Text id='name-help' muted>Bắt buộc</Form.Text>
                        </div>
                        <div className="form-group">
                            <label><strong>Số điện thoại</strong></label>
                            <input type="text" className="form-control" id="phone" name="phone" placeholder="Nhập số điện thoại" value={phone} onChange={onChangeValue} />
                        </div>
                        <div className="form-group">
                            <label><strong>Địa Chỉ</strong></label>
                            <input type="text" className="form-control" id="address" name="address" placeholder="Nhập địa chỉ kho" value={address} onChange={onChangeValue} />
                        </div>
                        <div className="form-group">
                            <label><strong>Mô tả</strong></label>
                            <textarea className="form-control" placeholder="Mô tả kho" rows="3" name='description' value={description} onChange={onChangeValue} spellCheck="false"></textarea>
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

export default UpdateWarehouse
