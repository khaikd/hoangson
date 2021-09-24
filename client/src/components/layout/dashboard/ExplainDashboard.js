import { Fragment } from 'react';
import DateControl from './DateControl';
import ListBooking from './ListBooking';

const ExplainDashboard = () => {
    return (
        <Fragment>
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">
                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-4">
                                <h3 className="pull-left">Manage Bookings</h3>
                            </div>
                            <div className="col-md-2 ml-auto">
                                <button className="right-content btn btn-success btn-block"><i className="fe fe-plus-circle"></i> Add Booking</button>
                            </div>
                        </div>
                    </div>
                    <div className="explain-body">
                        <div className="row">
                            <div className="col-sm">
                                <p className="text-center bg-blue bg-font">2N1D</p>
                            </div>
                            <div className="col-sm">
                                <p className="text-center bg-green bg-font">3N2D</p>
                            </div>
                            <div className="col-sm">
                                <p className="text-center bg-red bg-font">Charter</p>
                            </div>
                            <div className="col-sm">
                                <p className="text-center bg-pending bg-font">Pending</p>
                            </div>
                            <div className="col-sm">
                                <p className="text-center bg-canceled bg-font">Canceled</p>
                            </div>
                            <div className="col-sm">
                                <p className="text-center bg-transferred bg-font">Transferred</p>
                            </div>
                            <div className="col-sm">
                                <p className="text-center bg-inspection bg-font">Inspection</p>
                            </div>
                            <div className="col-sm">
                                <p className="text-center bg-upTo bg-font">Up To</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <DateControl />
                    <hr />
                    <ListBooking />
                </div>
            </div>
        </Fragment>
    )
}

export default ExplainDashboard
