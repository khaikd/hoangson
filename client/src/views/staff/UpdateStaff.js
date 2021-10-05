import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import { Fragment, useContext, useState, useEffect } from 'react';
import { StaffContext } from '../../contexts/StaffContext';
import Select from 'react-select';

const UpdateStaff = () => {

    // Context
    const { 
        staffState: { staff },
        showUpdateStaff, 
        setShowUpdateStaff, 
        updateStaff, 
        setShowToast 
    } = useContext(StaffContext)

    const [updatedStaff, setUpdatedStaff] = useState(staff)

    useEffect( () => setUpdatedStaff(staff), [staff] )

    const { name, phone, address, description } = updatedStaff

    const optionLevels = [
        {
            value: 'fullTime',
            label: 'Toàn thời gian',
        },
        {
            value: 'partTime',
            label: 'Bán thời gian',
        },
        {
            value: 'byDate',
            label: 'Công nhật',
        },
        {
            value: 'byHour',
            label: 'Theo giờ',
        }
    ]

    const optionStatus = [
        {
            value: 'active',
            label: 'Đang Làm',
        },
        {
            value: 'unActive',
            label: 'Đã Nghỉ',
        }
    ]

    const onChangeValue = event => setUpdatedStaff( {...updatedStaff, [event.target.name]: event.target.value } )

    const onSubmit = async event => {
        event.preventDefault()
        const {success, message} = await updateStaff(updatedStaff)
        closeDialog()
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const handleChangeSelect = (newValue, actionMeta) => {
        const data = newValue;
        if(data){
            const dataValue = data.value
            if(actionMeta.name === "level"){
                setUpdatedStaff( {...updatedStaff, level: dataValue } )
            }
            if(actionMeta.name === "status"){
                setUpdatedStaff( {...updatedStaff, status: dataValue } )
            }
        }
    }

    const closeDialog = () => {
        setUpdatedStaff(staff)
        setShowUpdateStaff(false)
    }

    return (
        <Fragment>
            <Modal show={showUpdateStaff} onHide={closeDialog}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Cập nhật nhân viên
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div className="form-group">
                            <label><strong>Họ và tên</strong></label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Trần Thị Phương Chinh" value={name} onChange={onChangeValue} required aria-describedby='name-help' />
                            <Form.Text id='name-help' muted>Bắt buộc</Form.Text>
                        </div>
                        <div className="form-group">
                            <label><strong>Số điện thoại</strong></label>
                            <input type="text" className="form-control" id="phone" name="phone" placeholder="0908 888 678" value={phone} onChange={onChangeValue} required aria-describedby='phone-help' />
                            <Form.Text id='phone-help' muted>Bắt buộc</Form.Text>
                        </div>
                        <div className="form-group">
                            <label><strong>Địa chỉ</strong></label>
                            <input type="text" className="form-control" id="address" name="address" placeholder="Thành Phố Lào Cai" value={address} onChange={onChangeValue} />
                        </div>
                        <div className="form-group">
                            <label><strong>Mô tả</strong></label>
                            <textarea className="form-control" placeholder="Mô tả nhân viên" rows="3" name='description' value={description} onChange={onChangeValue} spellCheck="false"></textarea>
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <label><strong>Công việc</strong></label>
                                    <Select isClearable
                                        defaultValue={
                                            optionLevels.filter(option => 
                                                option.value === staff.level ? {label: option.label, value: option.value} : ''
                                            )
                                        }
                                        onChange={handleChangeSelect.bind(this)}
                                        options={optionLevels} 
                                        menuPosition={'fixed'}
                                        placeholder="Chọn Công Việc"
                                        name="level"
                                    />
                                </Col>
                                <Col>
                                    <label><strong>Tình trạng</strong></label>
                                    <Select isClearable
                                        defaultValue={
                                            optionStatus.filter(option => 
                                                option.value === staff.status ? {label: option.label, value: option.value} : ''
                                            )
                                        }
                                        onChange={handleChangeSelect.bind(this)}
                                        options={optionStatus} 
                                        menuPosition={'fixed'}
                                        placeholder="Chọn tình trạng"
                                        name="status"
                                    />
                                </Col>
                            </Row>
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

export default UpdateStaff
