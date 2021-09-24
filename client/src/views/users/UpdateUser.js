import { Fragment } from "react"
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Select from 'react-select';

const UpdateUser = () => {

    // Context
    const {
        authState: { user },
        showUpdateUser, 
        setShowUpdateUser, 
        updateListUser,
        setShowToast
    } = useContext(AuthContext)

    const [updatedUser, setUpdatedUser] = useState(user)

    useEffect( () => setUpdatedUser(user), [user] )

    const { name, username, phone, address, description } = updatedUser


    const onChangeValue = event => setUpdatedUser( {...updatedUser, [event.target.name]: event.target.value } )

    const optionLevels = [
        {
            value: 'staff',
            label: 'Nhân Viên',
        },
        {
            value: 'stocker',
            label: 'Thủ Kho',
        },
        {
            value: 'accountant',
            label: 'Kế Toán',
        },
        {
            value: 'manager',
            label: 'Giám Đốc',
        }
    ]

    const optionStatus = [
        {
            value: 'active',
            label: 'Hoạt Động',
        },
        {
            value: 'unActive',
            label: 'Chưa Hoạt Động',
        }
    ]

    const handleChangeStatus = (newValue, actionMeta) => {
        const data = newValue;
        
        if(data){
            const dataValue = data.value
            if(actionMeta.name === "level"){
                setUpdatedUser( {...updatedUser, level: dataValue } )
            }
            if(actionMeta.name === "status"){
                setUpdatedUser( {...updatedUser, status: dataValue } )
            }
        }
    }

    const onSubmit = async event => {
        event.preventDefault()
        
        const {success, message} = await updateListUser(updatedUser)
        closeDialog()
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const closeDialog = () => {
        setUpdatedUser(user)
        setShowUpdateUser(false)
    }

    return (
        <Fragment>
            <Modal show={showUpdateUser} onHide={closeDialog}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sửa tài khoản
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div className="form-group">
                            <label><strong>Họ và tên</strong></label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Họ và tên" value={name} onChange={onChangeValue} required aria-describedby='name-help' />
                            <Form.Text id='name-help' muted>Bắt buộc</Form.Text>
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <label><strong>Tên tài khoản</strong></label>
                                    <input type="text" className="form-control" id="username" name="username" placeholder="Tên tài khoản" value={username} readOnly />
                                </Col>
                                <Col>
                                    <label><strong>Mật khẩu</strong></label>
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Mật khẩu" autoComplete="on" onChange={onChangeValue} />
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <label><strong>Số điện thoại</strong></label>
                                    <input type="text" className="form-control" id="phone" name="phone" placeholder="Số điện thoại" value={phone ? phone : ''} onChange={onChangeValue} />
                                </Col>
                                <Col>
                                    <label><strong>Địa chỉ</strong></label>
                                    <input type="text" className="form-control" id="address" name="address" placeholder="Địa chỉ" value={address ? address : ''} onChange={onChangeValue} />
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <label><strong>Giới thiệu</strong></label>
                            <textarea className="form-control" id="description" name="description" rows="5" placeholder="Giới thiệu về nhân viên" value={description ? description : ''} onChange={onChangeValue}></textarea>
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col>
                                    <label><strong>Chức vụ</strong></label>
                                    <Select isClearable
                                        defaultValue={
                                            optionLevels.filter(option => 
                                                option.value === user.level ? {label: option.label, value: option.value} : ''
                                            )
                                        }
                                        onChange={handleChangeStatus.bind(this)}
                                        options={optionLevels} 
                                        menuPosition={'fixed'}
                                        placeholder="Chọn chức vụ"
                                        name="level"
                                    />
                                </Col>
                                <Col>
                                    <label><strong>Tình trạng</strong></label>
                                    <Select isClearable
                                        defaultValue={
                                            optionStatus.filter(option => 
                                                option.value === user.status ? {label: option.label, value: option.value} : ''
                                            )
                                        }
                                        onChange={handleChangeStatus.bind(this)}
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

export default UpdateUser
