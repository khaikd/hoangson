
import { Fragment, useContext } from 'react';
import ListStaff from '../components/layout/dashboard/ListStaff';
import { AuthContext } from '../contexts/AuthContext';



const Dashboard = () => {
    // Context
    const {authState: {user: { name } }} = useContext(AuthContext)

    return (
        <Fragment>
            
            <div className="main-content horizontal-content">
                <div className="container">
                    <div className="breadcrumb-header justify-content-between">
                        <div className="left-content">
                            <div>
                            <h2 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">Chào, {name}!</h2>
                            <p className="mg-b-0">Bảng điều khiển phần mềm công ty xây dựng Hoàng Sơn.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row row-sm">
                        <ListStaff />
                    </div>

                </div>
                
            </div>
            
        </Fragment>
    )
}

export default Dashboard
