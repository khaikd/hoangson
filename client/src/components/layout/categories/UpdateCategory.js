import { Fragment, useContext, useState, useEffect } from 'react';
import { CategoryContext } from '../../../contexts/CategoryContext';
import {Modal, Button, Form} from 'react-bootstrap';

const UpdateCategory = () => {

    // Context
    const {
        categoryState: {category},
        showUpdateCategory, 
        setShowUpdateCategory, 
        updateCategory, 
        setShowToast
    } = useContext(CategoryContext)

    // State
    const [updatedCategory, setUpdatedCategory] = useState(category)

    useEffect( () => setUpdatedCategory(category), [category] )

    const {name, description} = updatedCategory

    const onChangeValue = event => setUpdatedCategory( {...updatedCategory, [event.target.name]: event.target.value } )

    const closeDialog = () => {
        setUpdatedCategory(category)
        setShowUpdateCategory(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await updateCategory(updatedCategory)
        setShowUpdateCategory(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    return (
        <Fragment>
            <Modal show={showUpdateCategory} onHide={closeDialog}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Cập nhật nhóm vật liệu xây dựng
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div className="form-group">
                            <label><strong>Tên Nhóm</strong></label>
                            <input type="text" className="form-control" id="nameCruise" name="name" placeholder="Nhập tên nhóm" value={name} onChange={onChangeValue} required aria-describedby='name-help' />
                            <Form.Text id='name-help' muted>Bắt buộc</Form.Text>
                        </div>
                        <div className="form-group">
                            <label><strong>Mô tả</strong></label>
                            <textarea className="form-control" placeholder="Mô tả nhóm vật liệu xây dựng" rows="3" name='description' value={description} onChange={onChangeValue} spellCheck="false"></textarea>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-danger btn-with-icon" variant='secondary' onClick={closeDialog}><i className="fe fe-x-circle"></i> Hủy</Button>
                        <Button className="btn btn-primary btn-with-icon" variant='primary' type='submit'><i className="fe fe-save"></i> Cập Nhật Nhóm!!!</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Fragment>
    )
}

export default UpdateCategory
