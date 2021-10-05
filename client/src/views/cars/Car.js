import { Fragment, useContext } from 'react';
import { CarContext } from '../../contexts/CarContext';
import { Toast } from 'react-bootstrap';
import ListCar from './ListCar';
import AddCar from './AddCar';

const Car = () => {

    const { 
        setAddCar,
        showToast: {show, message, type},
        setShowToast
    } = useContext(CarContext)

    return (
        <Fragment>
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">
                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-7">
                                <h3 className="pull-left">Danh Sách Xe</h3>
                            </div>
                            <div className="col-md-3 ml-auto">
                                <button className="right-content btn btn-success btn-block" onClick={setAddCar.bind(this, true)}><i className="fe fe-plus-circle"></i> Thêm Xe</button>
                            </div>
                        </div>
                    </div>
                    
                    <ListCar />
                    <AddCar />
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

export default Car
