import {Modal, Button, Form} from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { MaterialContext } from '../../../contexts/MaterialContext';
import { CategoryContext } from '../../../contexts/CategoryContext';
import Select from 'react-select';

const AddMaterial = () => {

    // Context
    const {showAddMaterial, setAddMaterial, addMaterial, setShowToast} = useContext(MaterialContext)

    const { 
        categoryState: { categories },
        getCategories
    } = useContext(CategoryContext)

    // Start: Get all cruise , []
    useEffect( () => getCategories(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    let optionCategories = []

    if(categories){
        categories.map((category) => 
            optionCategories = [ ...optionCategories, 
                {
                    value: category._id,
                    label: category.name,
                    //typeDay: cruise.typeDay
                    //dataKey: cruise.assign_to
                }
            ]
        )
    }

    //console.log(optionCategories)

    // State
    const [newMaterial, setNewMaterial] = useState({
        name: '',
        description: '',
        category: ''
    })

    const {name, description, category} = newMaterial

    const onChangeValue = event => setNewMaterial( {...newMaterial, [event.target.name]: event.target.value } )

    const closeDialog = () => {
        resetAddCruiseData()
    }

    const handleChangeCategory = (newValue, actionMeta) => {
        const dataCategory = newValue;
        if(dataCategory){
            const dataValue = dataCategory.value
            setNewMaterial( {...newMaterial, category: dataValue } )
        }
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await addMaterial(newMaterial)
        resetAddCruiseData()
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const resetAddCruiseData = () => {
        setNewMaterial({
            name: '',
            description: '',
            category: ''
        })
        setAddMaterial(false)
    }


    return (
        <Modal show={showAddMaterial} onHide={closeDialog}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    T???o m???i v???t li???u x??y d???ng
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-8">
                                <label><strong>T??n</strong></label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Nh???p t??n" value={name} onChange={onChangeValue} required aria-describedby='name-help' />
                                <Form.Text id='name-help' muted>B???t bu???c</Form.Text>
                            </div>
                            <div className="col-md-4">
                                <label><strong>Nh??m</strong></label>
                                <Select isClearable
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
                        <label><strong>M?? t???</strong></label>
                        <textarea className="form-control" placeholder="M?? t??? nh??m v???t li???u x??y d???ng" rows="3" name='description' value={description} onChange={onChangeValue} spellCheck="false"></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger btn-with-icon" variant='secondary' onClick={closeDialog}><i className="fe fe-x-circle"></i> H???y</Button>
                    <Button className="btn btn-primary btn-with-icon" variant='primary' type='submit'><i className="fe fe-save"></i> L??u Nh??m!!!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddMaterial
