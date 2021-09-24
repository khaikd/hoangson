import { Fragment, useState } from "react";
import { Table } from "react-bootstrap";
import ItemSupplier from "./ItemSupplier";
import NumberFormat from 'react-number-format';


const ListSupplier = ({ arrSuppliers, setArrSuppliers, setTotal, numberKey }) => {

    

    const [allTotal, setAllTotal] = useState(0)
    const [arrTotal, setArrTotal] = useState([])

    Array(numberKey).fill(1).map((option, index) => {
        if (!arrTotal[index]) {
            arrTotal[index] = [];
        }
    })

    const itemTotal = (total, item) => {
        arrTotal[item].push(total)
        totalFnc(arrTotal)
    }

    const totalFnc = (arrTotal) => {
        var totalAll = 0
        // eslint-disable-next-line array-callback-return
        arrTotal.map((item) => {
            if(item[item.length -1] !== undefined){
                totalAll += Number(item[item.length -1])
            }
        })
        setAllTotal(totalAll)
        setTotal(totalAll)
    }

    return (
        <Fragment>
            <div className="p-0">
                <Table bordered>
                <thead>
                    <tr>
                        <th>Thêm vật tư</th>
                        <th>Tên vật liệu</th>
                        <th>Đơn vị</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành Tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array(numberKey).fill(1).map((option, index) => (
                            <ItemSupplier key={index} arrSuppliers={arrSuppliers} setArrSuppliers={setArrSuppliers} keyItem={index} itemTotal={itemTotal} />
                            )
                        )
                    }
                    <tr>
                        <td colSpan="5"><strong>Tổng tiền</strong></td>
                        <td>
                            <strong><NumberFormat value={allTotal} displayType={'text'} thousandSeparator={true} prefix={'VNĐ '} /></strong>
                            <input type="hidden" className="form-control" id="total" name="total" value={allTotal} />
                        </td>
                    </tr>
                </tbody>
                </Table>
            </div>
            
        </Fragment>
    )
}

export default ListSupplier
