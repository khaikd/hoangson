import { Fragment } from 'react';
import ListRoom from '../../components/layout/rooms/ListRoom';
//import {Toast} from 'react-bootstrap';

const Room = () => {
    return (
        <Fragment>
            <div className="horizontal-mainwrapper container clearfix">
                <div className="explain-dashboard mt-5">
                    <div className="explain-header mb-3">
                        <div className="row">
                            <div className="col-md-4">
                                <h3 className="pull-left">Room List</h3>
                            </div>
                            <div className="col-md-2 ml-auto">
                                <button className="right-content btn btn-success btn-block"><i className="fe fe-plus-circle"></i> Add Room</button>
                            </div>
                        </div>
                    </div>
                    <ListRoom />
                </div>
            </div>
        </Fragment>
    )
}

export default Room
