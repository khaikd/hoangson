import { Fragment, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Toast } from 'react-bootstrap';
import ListUser from './ListUser';
import AddUser from './AddUser';

const User = () => {

    const { 
        authState: {user: { level } },
        setAddUser,
        showToast: {show, message, type},
        setShowToast
    } = useContext(AuthContext)

    const [defaultLevel, setDefaultLevel] = useState(level)

    let body = null

    if(defaultLevel === 'manager'){
        body = (
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">
                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-7">
                                <h3 className="pull-left">Danh Sách Tài Khoản Của Công Ty TNHH Hoàng Sơn</h3>
                            </div>
                            <div className="col-md-3 ml-auto">
                                <button className="right-content btn btn-success btn-block" onClick={setAddUser.bind(this, true)}><i className="fe fe-plus-circle"></i> Thêm Tài Khoản</button>
                            </div>
                        </div>
                    </div>
                    
                    <ListUser />
                    <AddUser />
                    <Toast 
                        show={show} 
                        style={ {position: 'fixed', top: '20%', right: '10px'} } 
                        className={`bg-${type} text-white`} 
                        onClose={setShowToast.bind(this, {show: false, message: '', type: null})}
                        delay={3000}
                        autohide
                    >
                        <Toast.Body>
                            <strong style={ {color: '#ffffff'} }>{message}</strong>
                        </Toast.Body>
                    </Toast>
                </div>
            </div>
        )
    }else{
        body = (
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">
                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="pull-left">Xin lỗi bạn không có quyền truy cập vào mục này!!!</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        )
    }

    return (
        <Fragment>
            {body}
        </Fragment>
    )
}

export default User
