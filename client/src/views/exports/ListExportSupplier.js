import { Fragment, useState } from "react";
import { Table } from "react-bootstrap";
import ItemExportSupplier from "./ItemExportSupplier";

const ListExportSupplier = ({ arrSuppliers, setArrSuppliers, numberKey }) => {

    //console.log('arrSuppliers', arrSuppliers)


    return (
        <Fragment>
            <div className="p-0">
                <Table bordered>
                <thead>
                    <tr>
                        <th>Xuất vật tư</th>
                        <th>Tên vật liệu</th>
                        <th>Đơn vị</th>
                        <th>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array(numberKey).fill(1).map((option, index) => (
                            <ItemExportSupplier key={index} arrSuppliers={arrSuppliers} setArrSuppliers={setArrSuppliers} keyItem={index} />
                            )
                        )
                    }
                </tbody>
                </Table>
            </div>
        </Fragment>
    )
}

export default ListExportSupplier
