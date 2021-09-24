import { Fragment, useContext, useState, useEffect } from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import { DepotContext } from '../../contexts/DepotContext';
import { WarehouseContext } from '../../contexts/WarehouseContext';
import Select from 'react-select';
import moment from 'moment';
import { apiUrl } from '../../contexts/constants';
import axios from 'axios';
import ListUpdateSupplier from './ListUpdateSupplier';

const UpdateDepot = () => {

    // Context
    const {
        depotState: { depot },
        showUpdateDepot, 
        setShowUpdateDepot, 
        updateDepot, 
        setShowToast
    } = useContext(DepotContext)

    const { 
        warehouseState: { warehouses },
        getWarehouses
    } = useContext(WarehouseContext)

    const [numberKey, setNumberKey] = useState(0);
    const [arrSuppliers, setArrSuppliers] = useState([])

    let optionWarehouses = []

    const [updatedDepot, setUpdatedDepot] = useState(depot)

    useEffect( () => setUpdatedDepot(depot), [depot] )

    const { title, receiver, dateAdded, warehouse } = updatedDepot

    // Get suppliers depot
    useEffect(() => {
        async function supplierData(){
            try {
                const response = await axios.get(`${apiUrl}/suppliers/${depot._id}`)
                setArrSuppliers(response.data.suppliers)
                setNumberKey(response.data.suppliers.length)
            } catch (error) {
                return error.response ? error.response : {success: false, message: 'Server error!'}
            }
        }
        supplierData()
    }, [depot._id]) // eslint-disable-line react-hooks/exhaustive-deps

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

    const onChangeValue = event => setUpdatedDepot( {...updatedDepot, [event.target.name]: event.target.value } )

    const handleChangeSelect = (newValue, actionMeta) => {
        const data = newValue;
        if(data){
            const dataValue = data.value
            setUpdatedDepot( {...updatedDepot, warehouse: dataValue } )
        }
    }

    const setTotal = (valueTotal) => {
        setUpdatedDepot( {...updatedDepot, total: valueTotal } )
    }

    const onSubmit = async event => {
        event.preventDefault()
        updatedDepot['suppliers'] = arrSuppliers
        //console.log('newDepot', newDepot)
        const {success, message} = await updateDepot(updatedDepot)
        closeDialog()
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
        
    }

    const closeDialog = () => {
        setUpdatedDepot(depot)
        setShowUpdateDepot(false)
    }

    const addButtonSupplier = (index) => {
        //console.log('numberKey', index)
        setNumberKey(index + 1)
    }

    //console.log(depot)

    return (
        <Fragment>
            <Modal show={showUpdateDepot} onHide={closeDialog}
                size="full"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sửa phiếu nhập kho: {title}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <label><strong>Tên nhập kho</strong></label>
                                    <input type="text" className="form-control" id="title" name="title" placeholder="Tên nhập kho ( ví dụ: nhập kho cát ngày 01/01/2021 )" value={title} onChange={onChangeValue} required aria-describedby='name-help' />
                                    <Form.Text id='name-help' muted>Bắt buộc</Form.Text>
                                </Col>
                                <Col>
                                    <label><strong>Kho Nhập</strong></label>
                                    <Select isClearable
                                        onChange={handleChangeSelect.bind(this)}
                                        defaultValue={
                                            optionWarehouses.filter(option => 
                                                option.value === warehouse._id ? {label: option.label, value: option.value} : ''
                                            )
                                        }
                                        options={optionWarehouses} 
                                        menuPosition={'fixed'}
                                        placeholder="Chọn Kho Nhập"
                                        name={warehouse}
                                    />
                                </Col>
                            </Row>
                            
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <label><strong>Người nhận</strong></label>
                                    <input type="text" className="form-control" id="receiver" name="receiver" placeholder="Nguyễn Văn A" value={receiver} onChange={onChangeValue} />
                                </Col>
                                <Col>
                                    <label><strong>Ngày nhập kho</strong></label>
                                    <input type="date" className="form-control" id="dateAdded" name="dateAdded" placeholder="mm/dd/yyy" value={moment(dateAdded).format('YYYY-MM-DD')} onChange={onChangeValue} />
                                </Col>
                            </Row>
                        </div>

                        <div className="form-group d-inline-block w-100">
                            <Button className="float-right btn btn-primary btn-with-icon" variant='primary' onClick={addButtonSupplier.bind(this, numberKey)}><i className="fe fe-plus-circle"></i> Thêm vật tư</Button>
                        </div>
                        {numberKey > 0 ? (
                            <ListUpdateSupplier totalDepot={depot.total} arrSuppliers={arrSuppliers} setArrSuppliers={setArrSuppliers} setTotal={setTotal} numberKey={numberKey} />
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

export default UpdateDepot
