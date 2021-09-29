import { Fragment, useContext } from 'react';
import { StaffContext } from '../../contexts/StaffContext';
import { Toast } from 'react-bootstrap';
import ListStaff from './ListStaff';
import AddStaff from './AddStaff';

const Staff = () => {

    const { 
        setAddStaff,
        showToast: {show, message, type},
        setShowToast
    } = useContext(StaffContext)

    return (
        <Fragment>
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">
                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-7">
                                <h3 className="pull-left">Danh Sách Nhân Viên</h3>
                            </div>
                            <div className="col-md-3 ml-auto">
                                <button className="right-content btn btn-success btn-block" onClick={setAddStaff.bind(this, true)}><i className="fe fe-plus-circle"></i> Thêm nhân viên</button>
                            </div>
                        </div>
                    </div>

                    <ListStaff />
                    <AddStaff />
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
        </Fragment>
    )
}

export default Staff
