import { Fragment, useContext } from 'react';
import { MaterialContext } from '../../contexts/MaterialContext';
import { Toast } from 'react-bootstrap';
import ListMaterial from '../../components/layout/materials/ListMaterial';
import AddMaterial from '../../components/layout/materials/AddMaterial';

const Material = () => {

    const { 
        setAddMaterial,
        showToast: {show, message, type},
        setShowToast
    } = useContext(MaterialContext)

    return (
        <Fragment>
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">
                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-7">
                                <h3 className="pull-left">Danh Sách Vật Liệu Xây Dựng</h3>
                            </div>
                            <div className="col-md-3 ml-auto">
                                <button className="right-content btn btn-success btn-block" onClick={setAddMaterial.bind(this, true)}><i className="fe fe-plus-circle"></i> Thêm Vật Liệu Xây Dựng</button>
                            </div>
                        </div>
                    </div>
                    
                    <ListMaterial />
                    <AddMaterial />
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

export default Material
