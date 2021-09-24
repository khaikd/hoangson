import { Fragment, useState } from "react";
import { Table } from "react-bootstrap";
import ItemUpdateExportSupplier from "./ItemUpdateExportSupplier";

const ListUpdateExportSupplier = ({ arrSuppliers, setArrSuppliers, numberKey }) => {
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
                            <ItemUpdateExportSupplier key={index} itemSupplier={arrSuppliers[index]} arrSuppliers={arrSuppliers} setArrSuppliers={setArrSuppliers} keyItem={index} />
                            )
                        )
                    }
                </tbody>
                </Table>
            </div>
        </Fragment>
    )
}

export default ListUpdateExportSupplier
