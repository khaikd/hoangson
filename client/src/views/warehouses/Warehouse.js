import { Fragment, useContext } from 'react';
import { WarehouseContext } from '../../contexts/WarehouseContext';
import { Toast } from 'react-bootstrap';
import ListWarehouse from './ListWarehouse';
import AddWarehouse from './AddWarehouse';

const Warehouse = () => {

    const { 
        setAddWarehouse,
        showToast: {show, message, type},
        setShowToast
    } = useContext(WarehouseContext)

    return (
        <Fragment>
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">
                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-7">
                                <h3 className="pull-left">Danh Sách Kho</h3>
                            </div>
                            <div className="col-md-3 ml-auto">
                                <button className="right-content btn btn-success btn-block" onClick={setAddWarehouse.bind(this, true)} ><i className="fe fe-plus-circle"></i> Thêm Kho</button>
                            </div>
                        </div>
                    </div>

                    <ListWarehouse />
                    <AddWarehouse />
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

export default Warehouse
