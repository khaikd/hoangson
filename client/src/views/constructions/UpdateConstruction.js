import { Fragment, useContext, useState, useEffect } from "react";
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import { ConstructionContext } from '../../contexts/ConstructionContext';
import Select from 'react-select';
import moment from 'moment';

const UpdateConstruction = () => {

    // Context
    const {
        constructionState: { construction },
        showUpdateConstruction, 
        setShowUpdateConstruction, 
        updateConstruction, 
        setShowToast
    } = useContext(ConstructionContext)

    const [updatedConstruction, setUpdatedConstruction] = useState(construction)

    useEffect( () => setUpdatedConstruction(construction), [construction] )

    const {name, address, description, publicDate, finishDate, status} = updatedConstruction

    const onChangeValue = event => setUpdatedConstruction( {...updatedConstruction, [event.target.name]: event.target.value } )

    const optionStatus = [
        {
            value: 'under',
            label: 'Đang Thi Công',
        },
        {
            value: 'pause',
            label: 'Đang Tạm Dừng',
        },
        {
            value: 'complete',
            label: 'Hoàn Thành Thi Công',
        }
    ]

    //console.log('construction', construction)

    const handleChangeStatus = (newValue, actionMeta) => {
        const data = newValue;
        if(data){
            const dataValue = data.value
            setUpdatedConstruction( {...updatedConstruction, status: dataValue } )
        }
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await updateConstruction(updatedConstruction)
        setShowUpdateConstruction(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const closeDialog = () => {
        setUpdatedConstruction(construction)
        setShowUpdateConstruction(false)
    }

    return (
        <Fragment>
            <Modal show={showUpdateConstruction} onHide={closeDialog}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Cập nhật công trình: {name}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div className="form-group">
                            <label><strong>Tên Công Trình</strong></label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Nhập tên công trình" value={name} onChange={onChangeValue} required aria-describedby='name-help' />
                            <Form.Text id='name-help' muted>Bắt buộc</Form.Text>
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <label><strong>Ngày Khởi Công</strong></label>
                                    <input type="date" className="form-control" id="publicDate" name="publicDate" placeholder="mm/dd/yyy" value={moment(publicDate).format('YYYY-MM-DD')} onChange={onChangeValue} />
                                </Col>
                                <Col>
                                    <label><strong>Ngày Hoàn Thành</strong></label>
                                    <input type="date" className="form-control" id="finishDate" name="finishDate" placeholder="mm/dd/yyy" value={moment(finishDate).format('YYYY-MM-DD')} onChange={onChangeValue} />
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <label><strong>Địa Chỉ</strong></label>
                            <input type="text" className="form-control" id="address" name="address" placeholder="Nhập địa chỉ công trình" value={address} onChange={onChangeValue} required aria-describedby='name-help' />
                            <Form.Text id='name-help' muted>Bắt buộc</Form.Text>
                        </div>
                        <div className="form-group">
                            <label><strong>Mô tả</strong></label>
                            <textarea className="form-control" placeholder="Mô tả công trình" rows="3" name='description' value={description} onChange={onChangeValue} spellCheck="false"></textarea>
                        </div>
                        <div className="form-group">
                            <label><strong>Tình Trạng Công Trình</strong></label>
                            <Select isClearable
                                onChange={handleChangeStatus.bind(this)}
                                defaultValue={
                                    optionStatus.filter(option => 
                                        option.value === status ? {label: option.label, value: option.value} : ''
                                    )
                                }
                                options={optionStatus} 
                                menuPosition={'fixed'}
                                placeholder="Tình Trạng Công Trình"
                                name={status}
                            />
                        </div>
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

export default UpdateConstruction
