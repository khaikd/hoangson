import { Fragment, useContext, useState, useEffect } from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import { ExportContext } from '../../contexts/ExportContext';
import { WarehouseContext } from '../../contexts/WarehouseContext';
import { ConstructionContext } from '../../contexts/ConstructionContext';
import Select from 'react-select';
import moment from 'moment';
import { apiUrl } from '../../contexts/constants';
import axios from 'axios';
import ListUpdateExportSupplier from './ListUpdateExportSupplier';

const UpdateExport = () => {

    // Context
    const {
        exportState: { dataExport },
        showUpdateExport, 
        setShowUpdateExport, 
        updateExport, 
        setShowToast
    } = useContext(ExportContext)

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

    const [updatedExport, setUpdatedExport] = useState(dataExport)

    useEffect( () => setUpdatedExport(dataExport), [dataExport] )

    const { title, exporter, receiver, dateExport, warehouse, construction } = updatedExport

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

    // Get suppliers depot
    useEffect(() => {
        async function supplierData(){
            try {
                const response = await axios.get(`${apiUrl}/suppliers/${dataExport._id}`)
                setArrSuppliers(response.data.suppliers)
                setNumberKey(response.data.suppliers.length)
            } catch (error) {
                return error.response ? error.response : {success: false, message: 'Server error!'}
            }
        }
        supplierData()
    }, [dataExport._id]) // eslint-disable-line react-hooks/exhaustive-deps

    const onChangeValue = event => setUpdatedExport( {...updatedExport, [event.target.name]: event.target.value } )

    const handleChangeSelect = (newValue, actionMeta) => {
        const data = newValue;
        if(data){
            const dataValue = data.value
            if(actionMeta.name === "warehouse"){
                setUpdatedExport( {...updatedExport, warehouse: dataValue } )
            }
            if(actionMeta.name === "construction"){
                setUpdatedExport( {...updatedExport, construction: dataValue } )
            }
        }
    }

    const onSubmit = async event => {
        event.preventDefault()
        updatedExport['suppliers'] = arrSuppliers
        const {success, message} = await updateExport(updatedExport)
        setShowToast( {show: true, message, type: success ? 'success' : 'danger'} )
        closeDialog()
    }

    const closeDialog = () => {
        setUpdatedExport(dataExport)
        setShowUpdateExport(false)
    }

    const addButtonSupplier = (index) => {
        //console.log('numberKey', index)
        setNumberKey(index + 1)
    }

    return (
        <Fragment>
            <Modal show={showUpdateExport} onHide={closeDialog}
                size="full"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sửa phiếu xuất kho: {title}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <label><strong>Tên phiếu xuất kho</strong></label>
                                    <input type="text" className="form-control" id="title" name="title" placeholder="Tên phiếu xuất kho ( ví dụ: xuất kho cát ngày 01/01/2021 )" value={title} onChange={onChangeValue} required aria-describedby='name-help' />
                                    <Form.Text id='name-help' muted>Bắt buộc</Form.Text>
                                </Col>
                                <Col>
                                    <label><strong>Kho Xuất</strong></label>
                                    <Select isClearable
                                        defaultValue={
                                            optionWarehouses.filter(option => 
                                                option.value === warehouse._id ? {label: option.label, value: option.value} : ''
                                            )
                                        }
                                        onChange={handleChangeSelect.bind(this)}
                                        options={optionWarehouses} 
                                        menuPosition={'fixed'}
                                        placeholder="Chọn Kho Xuất"
                                        name="warehouse"
                                    />
                                </Col>
                                <Col>
                                    <label><strong>Công Trình</strong></label>
                                    <Select isClearable
                                        defaultValue={
                                            optionConstructions.filter(option => 
                                                option.value === construction._id ? {label: option.label, value: option.value} : ''
                                            )
                                        }
                                        onChange={handleChangeSelect.bind(this)}
                                        options={optionConstructions} 
                                        menuPosition={'fixed'}
                                        placeholder="Chọn Công Trình"
                                        name="construction"
                                    />
                                </Col>
                            </Row>
                            
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <label><strong>Người xuất kho</strong></label>
                                    <input type="text" className="form-control" id="exporter" name="exporter" placeholder="Nguyễn Văn A" value={exporter} onChange={onChangeValue} />
                                </Col>
                                <Col>
                                    <label><strong>Người nhận</strong></label>
                                    <input type="text" className="form-control" id="receiver" name="receiver" placeholder="Nguyễn Văn A" value={receiver} onChange={onChangeValue} />
                                </Col>
                                <Col>
                                    <label><strong>Ngày xuất kho</strong></label>
                                    <input type="date" className="form-control" id="dateExport" name="dateExport" placeholder="mm/dd/yyy" value={moment(dateExport).format('YYYY-MM-DD')} onChange={onChangeValue} />
                                </Col>
                            </Row>
                        </div>

                        <div className="form-group d-inline-block w-100">
                            <Button className="float-right btn btn-primary btn-with-icon" variant='primary' onClick={addButtonSupplier.bind(this, numberKey)}><i className="fe fe-plus-circle"></i> Thêm vật tư</Button>
                        </div>
                        {numberKey > 0 ? (
                            <ListUpdateExportSupplier arrSuppliers={arrSuppliers} setArrSuppliers={setArrSuppliers} numberKey={numberKey} />
                        ) : ''}

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

export default UpdateExport
