import { Fragment, useContext } from "react";
import { ExportContext } from '../../contexts/ExportContext';
import { Toast } from 'react-bootstrap';
import ListExport from './ListExport';
import AddExport from './AddExport';

const Export = () => {

    const { 
        setAddExport,
        showToast: {show, message, type},
        setShowToast
    } = useContext(ExportContext)

    return (
        <Fragment>
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">
                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-7">
                                <h3 className="pull-left">Danh Sách Phiếu Xuất Kho</h3>
                            </div>
                            <div className="col-md-3 ml-auto">
                                <button className="right-content btn btn-success btn-block" onClick={setAddExport.bind(this, true)} ><i className="fe fe-plus-circle"></i> Tạo phiếu xuất kho</button>
                            </div>
                        </div>
                    </div>

                    <ListExport />
                    <AddExport />
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

export default Export
