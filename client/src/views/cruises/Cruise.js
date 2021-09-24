import { Fragment, useContext } from 'react';
import { CruiseContext } from '../../contexts/CruiseContext';
import {Toast} from 'react-bootstrap';
import ListCruise from '../../components/layout/cruises/ListCruise';
import AddCruiseModal from '../../components/cruises/AddCruiseModal';

const Cruise = () => {

    const { 
        setShowAddCruiseModal,
        showToast: {show, message, type},
        setShowToast
    } = useContext(CruiseContext)

    return (
        <Fragment>
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">
                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-4">
                                <h3 className="pull-left">List Cruise</h3>
                            </div>
                            <div className="col-md-2 ml-auto">
                                <button className="right-content btn btn-success btn-block" onClick={setShowAddCruiseModal.bind(this, true)}><i className="fe fe-plus-circle"></i> Add Cruise</button>
                            </div>
                        </div>
                    </div>
                    
                    <ListCruise />
                    <AddCruiseModal />
                    <Toast 
                        show={show} 
                        style={ {position: 'fixed', top: '20%', right: '10px'} } 
                        className={`bg-${type} text-white`} 
                        onClose={setShowToast.bind(this, {show: false, message: '', type: null})}
                        delay={3000}
                        autohide
                    >
                        <Toast.Body>
                            <strong>{message}</strong>
                        </Toast.Body>
                    </Toast>
                </div>
            </div>
        </Fragment>
    )
}

export default Cruise
