import { Fragment, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { ConstructionContext } from '../../../contexts/ConstructionContext';

const ListStaff = () => {

    const {
        authState: { users },
        getUsers
    } = useContext(AuthContext)

    const { 
        constructionState: { constructions },
        getConstructions
    } = useContext(ConstructionContext)

    // Start: Get all data , []
    useEffect( () => getUsers(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    // Start: Get all Công Trình , []
    useEffect( () => getConstructions(), [] ) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Fragment>
            <div className="col-md-12 col-lg-4 col-xl-4">
                <div className="card card-dashboard-eight pb-2">
                    <h6 className="card-title">Danh sách nhân viên</h6><span className="d-block mg-b-10 text-muted tx-12">Nhân viên của công ty TNHH Hoàng Sơn</span>
                    <div className="list-group">
                        {users.map((user, index) => (
                            user.level !== 'manager' ? (
                            <div key={index} className="list-group-item border-top-0">
                                <i className="flag-icon flag-icon-us flag-icon-squared"></i>
                                <p>{user.name}</p><span>{user.level === 'staff' ? "Nhân Viên" : user.level === 'stocker' ? "Thủ Kho" : user.level === 'accountant' ? "Kế Toán" : user.level === 'manager' ? "Giám Đốc" : ''}</span>
                            </div>
                            ) : '' 
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-8">
                <div className="card card-table-two">
                    <div className="d-flex justify-content-between">
                        <h4 className="card-title mb-1">Danh sách công trình</h4>
                        <i className="mdi mdi-dots-horizontal text-gray"></i>
                    </div>
                    <span className="tx-12 tx-muted mb-3 ">Những công trình công ty Hoàng Sơn đang và đã thi công.</span>
                    <div className="table-responsive country-table">
                        <table className="table table-striped table-bordered mb-0 text-sm-nowrap text-lg-nowrap text-xl-nowrap">
                            <thead>
                                <tr>
                                    <th className="wd-lg-25p">STT</th>
                                    <th className="wd-lg-25p tx-right">Tên</th>
                                    <th className="wd-lg-25p tx-right">Địa chỉ</th>
                                    <th className="wd-lg-25p tx-right">Tình trạng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {constructions.map((construction, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="tx-right tx-medium tx-inverse">{construction.name}</td>
                                        <td className="tx-right tx-medium tx-inverse">{construction.address}</td>
                                        <td className="tx-right tx-medium tx-inverse">{ construction.status === 'under' ? "Đang Thi Công" : construction.status === 'pause' ? "Đang Tạm Dừng" : construction.status === 'pause' ? "Hoàn Thành Thi Công" : '' }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ListStaff
