import React, { Fragment, useState } from "react"
import {Modal, Button} from 'react-bootstrap';

const DeleteModal = props => {

    const id = props.idProps
    const deleteModal = props.deleteFunc
    //console.log(id)


    const [showDelete, setShowDelete] = useState(false)
    const handleClose = () => setShowDelete(false)
    const handleShow = () => setShowDelete(true)
    const deleteConfirm = id => {
        deleteModal(id)
        handleClose()
    }

    return (
        <Fragment>
            <Button className="btn btn-danger btn-with-icon" variant="primary" onClick={handleShow}>
                <i className="fe fe-trash-2"></i> Xóa
            </Button>
            <Modal show={showDelete} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác Nhận Xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa cái này không?</Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary btn-with-icon" variant="secondary" onClick={handleClose}>
                        <i className="fe fe-x-circle"></i> Hủy
                    </Button>
                    <Button className="btn btn-danger btn-with-icon" variant="primary" onClick={deleteConfirm.bind(this, id)} >
                        <i className="fe fe-trash-2"></i> Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default DeleteModal
