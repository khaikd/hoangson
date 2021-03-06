import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { ExportContext } from '../../contexts/ExportContext';
import { WarehouseContext } from '../../contexts/WarehouseContext';
import { ConstructionContext } from '../../contexts/ConstructionContext';
import Select from 'react-select';
import ListExportSupplier from './ListExportSupplier';

const AddExport = () => {

    // Context
    const {showAddExport, setAddExport, addExport, setShowToast} = useContext(ExportContext)

    const { 
        warehouseState: { warehouses },
        getWarehouses
    } = useContext(WarehouseContext)

    const { 
        constructionState: { constructions },
        getConstructions
    } = useContext(ConstructionContext)

    const [numberKey, setNumberKey] = useState(0);
    const [arrSuppliers, setArrSuppliers] = useState([])

    let optionWarehouses = []
    let optionConstructions = []

    // Start: Get all data , []
    useEffect( () => getWarehouses(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    // Start: Get all data , []
    useEffect( () => getConstructions(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

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

    if(constructions.length > 0){
        constructions.map((construction) => 
            optionConstructions = [ ...optionConstructions, 
                {
                    value: construction._id,
                    label: construction.name,
                }
            ]
        )
    }

    //console.log('optionWarehouses', optionWarehouses)

    // State
    const [newExport, setNewExport] = useState({
        title: '',
        exporter: '',
        receiver: '',
        dateExport: '',
        warehouse: '',
        construction: ''
    })

    const { title, exporter, receiver, dateExport } = newExport

    const onChangeValue = event => setNewExport( {...newExport, [event.target.name]: event.target.value } )

    const handleChangeSelect = (newValue, actionMeta) => {
        const data = newValue;
        if(data){
            const dataValue = data.value
            if(actionMeta.name === "warehouse"){
                setNewExport( {...newExport, warehouse: dataValue } )
            }
            if(actionMeta.name === "construction"){
                setNewExport( {...newExport, construction: dataValue } )
            }
        }
    }

    const onSubmit = async event => {
        event.preventDefault()
        newExport['suppliers'] = arrSuppliers

        //console.log('arrSuppliers', newExport)
        const {success, message} = await addExport(newExport)
        setShowToast( {show: true, message, type: success ? 'success' : 'danger'} )
        closeDialog()
    }

    const closeDialog = () => {
        setNewExport({
            title: '',
            exporter: '',
            receiver: '',
            dateExport: '',
            warehouse: '',
            construction: ''
        })
        setAddExport(false)
    }

    const addButtonSupplier = (index) => {
        //console.log('numberKey', index)
        setNumberKey(index + 1)
    }

    return (
        <Modal show={showAddExport} onHide={closeDialog}
            size="full"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    T???o m???i phi???u xu???t kho
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <div className="form-group">
                        <Row>
                            <Col>
                                <label><strong>T??n phi???u xu???t kho</strong></label>
                                <input type="text" className="form-control" id="title" name="title" placeholder="T??n phi???u xu???t kho ( v?? d???: xu???t kho c??t ng??y 01/01/2021 )" value={title} onChange={onChangeValue} required aria-describedby='name-help' />
                                <Form.Text id='name-help' muted>B???t bu???c</Form.Text>
                            </Col>
                            <Col>
                                <label><strong>Kho Xu???t</strong></label>
                                <Select isClearable
                                    onChange={handleChangeSelect.bind(this)}
                                    options={optionWarehouses} 
                                    menuPosition={'fixed'}
                                    placeholder="Ch???n Kho Xu???t"
                                    name="warehouse"
                                />
                            </Col>
                            <Col>
                                <label><strong>C??ng Tr??nh</strong></label>
                                <Select isClearable
                                    onChange={handleChangeSelect.bind(this)}
                                    options={optionConstructions} 
                                    menuPosition={'fixed'}
                                    placeholder="Ch???n C??ng Tr??nh"
                                    name="construction"
                                />
                            </Col>
                        </Row>
                        
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col>
                                <label><strong>Ng?????i xu???t kho</strong></label>
                                <input type="text" className="form-control" id="exporter" name="exporter" placeholder="Nguy???n V??n A" value={exporter} onChange={onChangeValue} />
                            </Col>
                            <Col>
                                <label><strong>Ng?????i nh???n</strong></label>
                                <input type="text" className="form-control" id="receiver" name="receiver" placeholder="Nguy???n V??n A" value={receiver} onChange={onChangeValue} />
                            </Col>
                            <Col>
                                <label><strong>Ng??y xu???t kho</strong></label>
                                <input type="date" className="form-control" id="dateExport" name="dateExport" placeholder="mm/dd/yyy" value={dateExport} onChange={onChangeValue} />
                            </Col>
                        </Row>
                    </div>

                    <div className="form-group d-inline-block w-100">
                        <Button className="float-right btn btn-primary btn-with-icon" variant='primary' onClick={addButtonSupplier.bind(this, numberKey)}><i className="fe fe-plus-circle"></i> Th??m v???t t??</Button>
                    </div>
                    {numberKey > 0 ? (
                        <ListExportSupplier arrSuppliers={arrSuppliers} setArrSuppliers={setArrSuppliers} numberKey={numberKey} />
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

export default AddExport
