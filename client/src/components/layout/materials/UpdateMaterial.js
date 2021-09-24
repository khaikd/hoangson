import {Modal, Button, Form} from 'react-bootstrap';
import { Fragment, useContext, useState, useEffect } from 'react';
import { MaterialContext } from '../../../contexts/MaterialContext';
import { CategoryContext } from '../../../contexts/CategoryContext';
import Select from 'react-select';

const UpdateMaterial = () => {

    // Context
    const {
        materialState: { material },
        showUpdateMaterial, 
        setShowUpdateMaterial, 
        updateMaterial, 
        setShowToast
    } = useContext(MaterialContext)

    const { 
        categoryState: { categories },
        getCategories
    } = useContext(CategoryContext)

    // Start: Get all cruise , []
    useEffect( () => getCategories(), [] ) // eslint-disable-line react-hooks/exhaustive-deps


    const [updatedMaterial, setUpdatedMaterial] = useState(material)

    useEffect( () => setUpdatedMaterial(material), [material] )

    const {name, description, category} = updatedMaterial

    let optionCategories = []
    let textSelect = ''

    if(categories){
        categories.map((cate) => {
            if(cate._id == category){
                textSelect = cate.name
            }
            optionCategories = [ ...optionCategories, 
                {
                    value: cate._id,
                    label: cate.name,
                    //typeDay: cruise.typeDay
                    //dataKey: cruise.assign_to
                }
            ]
        })
    }

    

    const onChangeValue = event => setUpdatedMaterial( {...updatedMaterial, [event.target.name]: event.target.value } )

    const closeDialog = () => {
        setShowUpdateMaterial(material)
        setShowUpdateMaterial(false)
    }

    const handleChangeCategory = (newValue, actionMeta) => {
        const dataCategory = newValue;
        if(dataCategory){
            const dataValue = dataCategory.value
            setUpdatedMaterial( {...updatedMaterial, category: dataValue } )
        }
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await updateMaterial(updatedMaterial)
        setShowUpdateMaterial(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }



    return (
        <Fragment>
            <Modal show={showUpdateMaterial} onHide={closeDialog}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sửa vật liệu xây dựng
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-8">
                                    <label><strong>Tên</strong></label>
                                    <input type="text" className="form-control" id="name" name="name" placeholder="Nhập tên" value={name} onChange={onChangeValue} required aria-describedby='name-help' />
                                    <Form.Text id='name-help' muted>Bắt buộc</Form.Text>
                                </div>
                                <div className="col-md-4">
                                    <label><strong>Nhóm</strong></label>
                                    <Select isClearable
                                        defaultValue={{ label: textSelect, value: category }}
                                        onChange={handleChangeCategory.bind(this)}
                                        options={optionCategories} 
                                        menuPosition={'fixed'}
                                        placeholder="Category"
                                        name={category}
                                    />
                                </div>
                            </div>
                            
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
        </Fragment>
    )
}

export default UpdateMaterial
