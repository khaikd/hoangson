import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { DepotContext } from '../../contexts/DepotContext';
import { WarehouseContext } from '../../contexts/WarehouseContext';
import Select from 'react-select';
import ListSupplier from './ListSupplier';

const AddDepot = () => {

    // Context
    const {showAddDepot, setAddDepot, addDepot, setShowToast} = useContext(DepotContext)

    const { 
        warehouseState: { warehouses },
        getWarehouses
    } = useContext(WarehouseContext)
    
    const [numberKey, setNumberKey] = useState(0);
    const [arrSuppliers, setArrSuppliers] = useState([])

    let optionWarehouses = []

    // Start: Get all data , []
    useEffect( () => getWarehouses(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    if(warehouses.length > 0){
        warehouses.map((warehouse) => 
            optionWarehouses = [ ...optionWarehouses, 
                {
                    value: warehouse._id,
                    label: warehouse.name,
                }
            ]
        )
    }

    //console.log('optionWarehouses', optionWarehouses)

    // State
    const [newDepot, setNewDepot] = useState({
        title: '',
        receiver: '',
        dateAdded: '',
        warehouse: ''
    })

    const { title, receiver, dateAdded, warehouse } = newDepot

    const onChangeValue = event => setNewDepot( {...newDepot, [event.target.name]: event.target.value } )

    const handleChangeSelect = (newValue, actionMeta) => {
        const data = newValue;
        if(data){
            const dataValue = data.value
            setNewDepot( {...newDepot, warehouse: dataValue } )
        }
    }

    const setTotal = (valueTotal) => {
        setNewDepot( {...newDepot, total: valueTotal } )
    }

    

    const onSubmit = async event => {
        event.preventDefault()
        newDepot['suppliers'] = arrSuppliers
        //console.log('newDepot', newDepot)
        const {success, message} = await addDepot(newDepot)
        closeDialog()
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const closeDialog = () => {
        setNewDepot({
            title: '',
            receiver: '',
            dateAdded: '',
            warehouse: ''
        })
        setAddDepot(false)
    }

    const addButtonSupplier = (index) => {
        //console.log('numberKey', index)
        setNumberKey(index + 1)
    }


    return (
        <Modal show={showAddDepot} onHide={closeDialog}
            size="full"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    T???o m???i phi???u nh???p kho
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="form-group">
                        <Row>
                            <Col>
                                <label><strong>T??n nh???p kho</strong></label>
                                <input type="text" className="form-control" id="title" name="title" placeholder="T??n nh???p kho ( v?? d???: nh???p kho c??t ng??y 01/01/2021 )" value={title} onChange={onChangeValue} required aria-describedby='name-help' />
                                <Form.Text id='name-help' muted>B???t bu???c</Form.Text>
                            </Col>
                            <Col>
                                <label><strong>Kho Nh???p</strong></label>
                                <Select isClearable
                                    onChange={handleChangeSelect.bind(this)}
                                    options={optionWarehouses} 
                                    menuPosition={'fixed'}
                                    placeholder="Ch???n Kho Nh???p"
                                    name={warehouse}
                                />
                            </Col>
                        </Row>
                        
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col>
                                <label><strong>Ng?????i nh???n</strong></label>
                                <input type="text" className="form-control" id="receiver" name="receiver" placeholder="Nguy???n V??n A" value={receiver} onChange={onChangeValue} />
                            </Col>
                            <Col>
                                <label><strong>Ng??y nh???p kho</strong></label>
                                <input type="date" className="form-control" id="dateAdded" name="dateAdded" placeholder="mm/dd/yyy" value={dateAdded} onChange={onChangeValue} />
                            </Col>
                        </Row>
                    </div>

                    <div className="form-group d-inline-block w-100">
                        <Button className="float-right btn btn-primary btn-with-icon" variant='primary' onClick={addButtonSupplier.bind(this, numberKey)}><i className="fe fe-plus-circle"></i> Th??m v???t t??</Button>
                    </div>
                    {numberKey > 0 ? (
                        <ListSupplier arrSuppliers={arrSuppliers} setArrSuppliers={setArrSuppliers} setTotal={setTotal} numberKey={numberKey} />
                    ) : ''}

                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger btn-with-icon" variant='secondary' onClick={closeDialog}><i className="fe fe-x-circle"></i> H???y</Button>
                    <Button className="btn btn-primary btn-with-icon" variant='primary' type='submit'><i className="fe fe-save"></i> L??u!!!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddDepot
