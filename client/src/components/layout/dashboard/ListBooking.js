import { Fragment } from 'react';

const ListBooking = () => {

    var dt = new Date();
    var month = dt.getMonth() + 1;
    var year = dt.getFullYear();
    var daysInMonths = new Date(year, month, 0).getDate();

    return (
        <Fragment>
            <div className="ajax-booking-cruise">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="table-info-cruise mg-b-20">
                            <div className="table-info-cruise-header pb-0">
                                <div className="d-flex justify-content-between">
                                    <h3 className="table-info-cruise-title mg-b-15">Title Cruise</h3>
								</div>
                            </div>
                            <div className="table-info-cruise-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered mg-b-0 text-md-nowrap">
                                        <thead>
                                            <tr>
                                                <th>Cabin</th>
                                                <th>Type</th>
                                                {Array.from(Array(daysInMonths), (e, i) => {
                                                    return <th key={i}>{i+1}</th>
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{month}</td>
                                                <td>{year}</td>
                                                {Array.from(Array(daysInMonths), (e, i) => {
                                                    return <td key={i}>{e}</td>
                                                })}
                                            </tr>
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

export default ListBooking
