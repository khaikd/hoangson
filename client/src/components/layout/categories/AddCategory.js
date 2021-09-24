import {Modal, Button, Form} from 'react-bootstrap';
import { useContext, useState } from 'react';
import { CategoryContext } from '../../../contexts/CategoryContext';

const AddCategory = () => {

    // Context
    const {showAddCategory, setAddCategory, addCategory, setShowToast} = useContext(CategoryContext)

    // State
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: ''
    })

    const {name, description} = newCategory

    const onChangeValue = event => setNewCategory( {...newCategory, [event.target.name]: event.target.value } )

    const closeDialog = () => {
        resetAddCruiseData()
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await addCategory(newCategory)
        resetAddCruiseData()
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const resetAddCruiseData = () => {
        setNewCategory({
            name: '',
            description: ''
        })
        setAddCategory(false)
    }

    return (
        <Modal show={showAddCategory} onHide={closeDialog}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Tạo mới nhóm vật liệu xây dựng
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
                    <Button className="btn btn-primary btn-with-icon" variant='primary' type='submit'><i className="fe fe-save"></i> Lưu Nhóm!!!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddCategory
