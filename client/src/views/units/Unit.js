import { Fragment, useContext } from 'react';
import { UnitContext } from '../../contexts/UnitContext';
import { Toast } from 'react-bootstrap';
import ListUnit from './ListUnit';
import AddUnit from './AddUnit';

const Unit = () => {

    const { 
        setAddUnit,
        showToast: {show, message, type},
        setShowToast
    } = useContext(UnitContext)

    return (
        <Fragment>
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">

                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-7">
                                <h3 className="pull-left">Danh Sách Đơn Vị</h3>
                            </div>
                            <div className="col-md-3 ml-auto">
                                <button className="right-content btn btn-success btn-block" onClick={setAddUnit.bind(this, true)} ><i className="fe fe-plus-circle"></i> Thêm Đơn Vị</button>
                            </div>
                        </div>
                    </div>

                    <ListUnit />
                    <AddUnit />
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

export default Unit
