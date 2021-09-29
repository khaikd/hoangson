import { Fragment, useContext, useEffect } from 'react';
import { CategoryContext } from '../../../contexts/CategoryContext';
import { AuthContext } from '../../../contexts/AuthContext';
import {Spinner, Card} from 'react-bootstrap';
import UpdateCategory from './UpdateCategory';
import DeleteModal from '../DeleteModal';

const ListCategory = () => {

    // Context
    const {authState: {user: {username} }} = useContext(AuthContext)
    const { 
        categoryState: { category, categories, categoriesLoading },
        getCategories,
        findCategory,
        deleteCategory,
        setShowUpdateCategory
    } = useContext(CategoryContext)

    const chooseCategory = categoryId => {
        findCategory(categoryId)
        setShowUpdateCategory(true)
    }

    // Start: Get all cruise , []
    useEffect( () => getCategories(), [] ) // eslint-disable-line react-hooks/exhaustive-deps
    let body = null

    if(categoriesLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        )
    }else if(categories.length === 0){
        body = (
            <Fragment>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Xin chào {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Chào mừng bạn đến với phần mềm quản lý của công ty xây dựng Hoàng Sơn</Card.Title>
                        <Card.Text>
                            Nhấp vào nút bên dưới để tạo nhóm vật liệu xây dựng
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Fragment>
        )
    }else{
        body = (
            <Fragment>
                <div className="ajax-booking-cruise">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="table-info-cruise mg-b-20">
                                <div className="table-info-cruise-body">
                                    <div className="table-responsive">
                                        <table className="table mg-b-0 text-md-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Tên</th>
                                                    <th className="w-220"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categories.map((category, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{category.name}</td>
                                                    <td>
                                                        <div className="row">
                                                            <div className="col-sm">
                                                                <button className="btn btn-success btn-with-icon btn-block" onClick={chooseCategory.bind(this, category._id)}><i className="fe fe-edit"></i> Sửa</button>
                                                            </div>
                                                            <div className="col-sm">
                                                                <DeleteModal idProps={category._id} deleteFunc={deleteCategory} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )    
    }


    return (
        <Fragment>
            {body}
            {category !== null && <UpdateCategory />}
        </Fragment>
    )
}

export default ListCategory
