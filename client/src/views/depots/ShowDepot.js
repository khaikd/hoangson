import { Fragment, useContext, useState, useEffect } from 'react';
import {Modal, Button, Row, Col, Table} from 'react-bootstrap';
import { DepotContext } from '../../contexts/DepotContext';
import moment from 'moment';
import { apiUrl } from '../../contexts/constants';
import axios from 'axios';
import NumberFormat from 'react-number-format';

const ShowDepot = () => {

    // Context
    const {
        depotState: { depot },
        showViewDepot, 
        setShowViewDepot
    } = useContext(DepotContext)

    const [numberKey, setNumberKey] = useState(0);
    const [arrSuppliers, setArrSuppliers] = useState([])
    const [viewdDepot, setViewDepot] = useState(depot)

    useEffect( () => setViewDepot(depot), [depot] )

    const { title, receiver, dateAdded, warehouse } = viewdDepot

    const closeDialog = () => {
        setShowViewDepot(false)
    }

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

    return (
        <Fragment>
            <Modal show={showViewDepot} onHide={closeDialog}
                size="full"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Xem phiếu nhập kho: {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <Row>
                            <Col>
                                <label><strong>Tên phiếu nhập kho:</strong> {title}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label><strong>Tên kho nhập:</strong> {warehouse.name}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label><strong>Người nhận:</strong> {receiver}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label><strong>Ngày nhập kho:</strong> {moment(dateAdded).format('DD/MM/YYYY')}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3 className="mt-2 mb-3"><strong>Danh sách vật tư nhập kho</strong></h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {numberKey > 0 ? (
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên vật liệu</th>
                                                <th>Đơn vị</th>
                                                <th>Số lượng</th>
                                                <th>Đơn giá</th>
                                                <th>Thành Tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                arrSuppliers.map((supplier, index) => (
                                                    <tr key={index}>
                                                        <td style={ {lineHeight: "40px"} }><strong>{index + 1}</strong></td>
                                                        <td>
                                                            {supplier.material.name}
                                                        </td>
                                                        <td>
                                                            {supplier.unit.name}
                                                        </td>
                                                        <td>
                                                            {supplier.quantity}
                                                        </td>
                                                        <td>
                                                            {supplier.price}
                                                        </td>
                                                        <td style={ {lineHeight: "40px"} }>
                                                            <strong><NumberFormat value={supplier.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'VNĐ '} /></strong>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td colSpan="5"><strong>Tổng tiền</strong></td>
                                                <td>
                                                    <strong><NumberFormat value={depot.total} displayType={'text'} thousandSeparator={true} prefix={'VNĐ '} /></strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                ) : ''}
                            </Col>
                        </Row>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger btn-with-icon" variant='secondary' onClick={closeDialog}><i className="fe fe-x-circle"></i> Hủy</Button>
                    <Button className="btn btn-primary btn-with-icon" variant='primary' type='submit'><i className="fas fa-print"></i> In Phiếu Nhập Kho!!!</Button>
                </Modal.Footer>
                
            </Modal>
        </Fragment>
    )
}

export default ShowDepot
