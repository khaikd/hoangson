import { Fragment, useContext } from 'react';
import { CategoryContext } from '../../contexts/CategoryContext';
import { Toast } from 'react-bootstrap';
import ListCategory from '../../components/layout/categories/ListCategory';
import AddCategory from '../../components/layout/categories/AddCategory';


const Category = () => {

    const { 
        setAddCategory,
        showToast: {show, message, type},
        setShowToast
    } = useContext(CategoryContext)

    return (
        <Fragment>
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">
                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-7">
                                <h3 className="pull-left">Danh Sách Nhóm Vật Liệu Xây Dựng</h3>
                            </div>
                            <div className="col-md-3 ml-auto">
                                <button className="right-content btn btn-success btn-block" onClick={setAddCategory.bind(this, true)}><i className="fe fe-plus-circle"></i> Thêm Nhóm Vật Liệu Xây Dựng</button>
                            </div>
                        </div>
                    </div>
                    
                    <ListCategory />
                    <AddCategory />
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

export default Category
