import { useState, useContext, useEffect } from 'react';
import {Tabs, Tab, Form} from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import avatar from '../assets/img/faces/6.jpg';
import { AuthContext } from '../contexts/AuthContext';
import AlertMessage from '../components/layout/AlertMessage';

const Profile = () => {

    const {
        authState: { user },
        updateUser
    } = useContext(AuthContext)
    const [show, setShow] = useState(false);
    const [rePassword, setRePassword] = useState('');
    const [alert, setAlert] = useState(null)
    let textLevel = user.level
    const [updatedUser, setUpdatedUser] = useState(user)

    useEffect( () => setUpdatedUser(user), [user] )

    const { name, phone, address, description, password } = updatedUser

    const onChangeValue = event => setUpdatedUser( {...updatedUser, [event.target.name]: event.target.value } )
    const onChangeRePass = event => setRePassword( event.target.value )

    //console.log('updatedUser', updatedUser)

    const handleChangeChk = (event) => {
        if(event.target.checked){
            setShow(true)
        }else{
            setShow(false)
        }
    }

    const onSubmit = async event => {
        event.preventDefault()
        
        if(show === true){
            if(password !== rePassword) {
                setAlert({ type: 'danger', message: 'Mật khẩu không khớp nhau!' })
                setTimeout(() => setAlert(null), 5000)
                return
            }
        }
        
        try {
            const updateData = await updateUser(updatedUser)
            if(!updateData.success) {
                setAlert({ type: 'danger', message: updateData.message })
                setTimeout(() => setAlert(null), 5000)
            }else{
                setAlert({ type: 'success', message: updateData.message })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    

    return (
        <div className="page is-expanded">
            <div className="main-content app-content mg-t-30">
                <div className="container">
                    <div className="row row-sm">
                        <div className="col-lg-4">
                            <div className="card mg-b-20">
                                <div className="card-body">
                                    <div className="pl-0">
                                        <div className="main-profile-overview">
                                            <div className="main-img-user profile-user">
                                                <img alt={name} src={avatar} /><button className="fas fa-camera profile-edit"></button>
                                            </div>
                                            <div className="d-flex justify-content-between mg-b-20">
												<div>
													<h5 className="main-profile-name">{name}</h5>
													<p className="main-profile-name-text">{textLevel === 'staff' ? "Nhân Viên" : textLevel === 'stocker' ? "Thủ Kho" : textLevel === 'accountant' ? "Kế Toán" : textLevel === 'manager' ? "Giám Đốc" : ''}</p>
												</div>
											</div>
                                            <hr className="mg-y-30" />
                                            <label className="main-content-label tx-13 mg-b-20">Thông Tin Liên Hệ</label>
                                            <div className="main-profile-social-list">
                                                <div className="media">
                                                    <div className="media-icon bg-primary-transparent text-primary">
                                                        <i className="si si-screen-smartphone"></i>
                                                    </div>
                                                    <div className="media-body">
                                                        <span>Số Điện Thoại</span> <a href="#">{phone}</a>
                                                    </div>
                                                </div>
                                                <div className="media">
                                                    <div className="media-icon bg-primary-transparent text-primary">
                                                        <i className="si si-location-pin"></i>
                                                    </div>
                                                    <div className="media-body">
                                                        <span>Địa Chỉ</span> <a href="#">{address}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
						</div>
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <Tabs className="nav nav-tabs profile navtab-custom panel-tabs" defaultActiveKey="home" transition={false} id="noanim-tab-example">
                                        <Tab className="border-left border-bottom border-right border-top-0 p-4" eventKey="home" title="Giới Thiệu">
                                            <h4 className="tx-15 text-uppercase mb-3">Giới Thiệu</h4>
		                                    <div className="m-b-5" dangerouslySetInnerHTML={{__html: description}} />
                                        </Tab>
                                        <Tab className="border-left border-bottom border-right border-top-0 p-4" eventKey="contact" title="Sửa Thông Tin" >
                                            <Form onSubmit={onSubmit}>
                                                <AlertMessage info={alert} />
                                                <div className="form-group">
                                                    <label><strong>Họ và Tên</strong></label>
                                                    <input type="text" id="name" name="name" value={name} placeholder="Họ và Tên" className="form-control" onChange={onChangeValue} />
                                                </div>
                                                <div className="form-group">
                                                    <label><strong>Ảnh đại diện</strong></label>
                                                    <input type="file" id="imageAvatar" placeholder="Tải ảnh đại diện lên" className="form-control" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="checkbox">
                                                        <div className="custom-checkbox custom-control">
                                                            <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-2" onChange={handleChangeChk.bind(this)} />
                                                            <label htmlFor="checkbox-2" className="custom-control-label mt-1"><strong>Đổi mật khẩu</strong></label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={show ? "changePassword" : "changePassword hideClass"}>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <div className="form-group">
                                                                <label><strong>Mật khẩu mới</strong></label>
                                                                <input type="password" placeholder="Nhập mật khẩu mới của bạn" autoComplete="on" id="password" name="password" className="form-control" onChange={onChangeValue} />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm">
                                                            <div className="form-group">
                                                                <label><strong>Nhập lại mật khẩu</strong></label>
                                                                <input type="password" placeholder="Nhập lại mật khẩu mới của bạn" autoComplete="on" id="rePassword" name="rePassword" value={rePassword} className="form-control" onChange={onChangeRePass} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <div className="form-group">
                                                            <label><strong>Số điện thoại</strong></label>
                                                            <input type="text" placeholder="Nhập số điện thoại của bạn" id="phone" name="phone" value={phone ? phone : ''} className="form-control" onChange={onChangeValue} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm">
                                                        <div className="form-group">
                                                            <label><strong>Địa chỉ</strong></label>
                                                            <input type="text" placeholder="Nhập địa chỉ của bạn" id="address" name="address" value={address ? address : ''} className="form-control" onChange={onChangeValue} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label><strong>Giới thiệu về mình</strong></label>
                                                    <CKEditor
                                                        editor={ ClassicEditor }
                                                        data={description ? description : ''}
                                                        //onReady={ editor => {
                                                            // You can store the "editor" and use when it is needed.
                                                            //console.log( 'Editor is ready to use!', editor );
                                                        //} }
                                                        onChange={ ( event, editor ) => {
                                                            const data = editor.getData();
                                                            setUpdatedUser( {...updatedUser, description: data } )
                                                        } }
                                                        //onBlur={ ( event, editor ) => {
                                                            //console.log( 'Blur.', editor );
                                                        //} }
                                                        //onFocus={ ( event, editor ) => {
                                                            //console.log( 'Focus.', editor );
                                                        //} }
                                                    />
                                                </div>
                                                
                                                <div className="form-group">
                                                    <button type='submit' className="btn btn-primary-gradient btn-block"><i className="las la-save"></i> Save</button>
                                                </div>
                                            </Form>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
