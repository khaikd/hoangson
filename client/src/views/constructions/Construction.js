import { Fragment, useContext } from 'react';
import { ConstructionContext } from '../../contexts/ConstructionContext';
import { Toast } from 'react-bootstrap';
import ListConstruction from './ListConstruction';
import AddConstruction from './AddConstruction';

const Construction = () => {

    const { 
        setAddConstruction,
        showToast: {show, message, type},
        setShowToast
    } = useContext(ConstructionContext)


    return (
        <Fragment>
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">
                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-7">
                                <h3 className="pull-left">Danh Sách Công Trình</h3>
                            </div>
                            <div className="col-md-3 ml-auto">
                                <button className="right-content btn btn-success btn-block" onClick={setAddConstruction.bind(this, true)} ><i className="fe fe-plus-circle"></i> Thêm Công Trình</button>
                            </div>
                        </div>
                    </div>

                    <ListConstruction />
                    <AddConstruction />
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

export default Construction
