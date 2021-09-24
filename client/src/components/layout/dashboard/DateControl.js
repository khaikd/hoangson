import { Fragment } from 'react';
//import { Link } from 'react-router-dom';

const DateControl = () => {
    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    var monthName=months[d.getMonth()];
    var year = new Date().getFullYear();
    var oldYear = 2017;
    return (
        <Fragment>
            <div className="date-control">
                <div className="date-control-button-item mr-2">
                    <button type="button" className="btn btn-danger btn-icon"><i className="fe fe-minus"></i></button>
                </div>
                <div className="date-control-select mr-2">
                    <div className="date-control-month">
                        <label><strong>Month</strong></label>
                        <select defaultValue={monthName} className="SlectBox form-control">
                            {months.map((month, key) => (
                                <option key={key} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="date-control-select mr-2">
                    <div className="date-control-year">
                        <label><strong>Year</strong></label>
                        <select defaultValue={year} className="SlectBox form-control">
                            {Array(50).fill(1).map((value, index) => (
                                <option key={index} value={oldYear + index}>
                                    {oldYear + index}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="date-control-button-item">
                    <button type="button" className="btn btn-danger btn-icon"><i className="fe fe-plus"></i></button>
                </div>
            </div>
        </Fragment>
    )
}

export default DateControl
