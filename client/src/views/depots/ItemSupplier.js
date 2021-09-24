import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import { UnitContext } from '../../contexts/UnitContext';
import { MaterialContext } from '../../contexts/MaterialContext';
import NumberFormat from 'react-number-format';

const ItemSupplier = ( { arrSuppliers, setArrSuppliers, keyItem, itemTotal } ) => {

    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)

    const { 
        unitState: { units },
        getUnits
    } = useContext(UnitContext)

    const { 
        materialState: { materials },
        getMaterials
    } = useContext(MaterialContext)

    let optionUnits = []
    let optionMaterials = []

    // Start: Get all data , []
    useEffect( () => getUnits(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    // Start: Get all data , []
    useEffect( () => getMaterials(), [] ) // eslint-disable-line react-hooks/exhaustive-deps

    if(units.length > 0){
        units.map((unit) => 
            optionUnits = [ ...optionUnits, 
                {
                    value: unit._id,
                    label: unit.name,
                }
            ]
        )
    }

    if(units.length > 0){
        materials.map((material) => 
            optionMaterials = [ ...optionMaterials, 
                {
                    value: material._id,
                    label: material.name,
                }
            ]
        )
    }

    const handleChangeSelectUnit = (newValue, actionMeta) => {
        const fieldNames = actionMeta.name.split('-');
        const fieldName = fieldNames[0];
        if (!arrSuppliers[fieldNames[1]]) {
            arrSuppliers[fieldNames[1]] = {};
        }
        
        const data = newValue;
        if(data){
            const dataValue = data.value
            arrSuppliers[fieldNames[1]][fieldName] =  dataValue;
        }
    }

    const handleChangeSelectMaterial = (newValue, actionMeta) => {
        const fieldNames = actionMeta.name.split('-');
        const fieldName = fieldNames[0];
        if (!arrSuppliers[fieldNames[1]]) {
            arrSuppliers[fieldNames[1]] = {};
        }
        
        const data = newValue;
        if(data){
            const dataValue = data.value
            arrSuppliers[fieldNames[1]][fieldName] =  dataValue;
        }
    }

    const onChangeTextQuantity = (index, event) => {
        if (!arrSuppliers[index]) {
            arrSuppliers[index] = {};
        }
        
        const fieldNames = event.target.name.split('-');
        const fieldName = fieldNames[0];
        arrSuppliers[index][fieldName] =  event.target.value;
        arrSuppliers[index]['totalPrice'] =  price*event.target.value;
        setQuantity( event.target.value )
        dataItemTotal(event.target.value, price, arrSuppliers)
    }

    const onChangeTextPrice = (index, event) => {
        if (!arrSuppliers[index]) {
            arrSuppliers[index] = {};
        }
        
        const fieldNames = event.target.name.split('-');
        const fieldName = fieldNames[0];
        arrSuppliers[index][fieldName] =  event.target.value;
        arrSuppliers[index]['totalPrice'] =  quantity*event.target.value;

        setPrice( event.target.value )
        dataItemTotal(quantity, event.target.value, arrSuppliers)
        
    }

    const dataItemTotal = (quantity, price, arrSuppliers) => {
        itemTotal(quantity*price, keyItem)
        setArrSuppliers(arrSuppliers)
    }
    
    //console.log('arrSuppliers', arrSuppliers)

    return (
        <tr>
            <td style={ {lineHeight: "40px"} }><strong>{keyItem + 1}</strong></td>
            <td>
                <Select isClearable
                    onChange={handleChangeSelectMaterial.bind(this)}
                    options={optionMaterials} 
                    menuPosition={'fixed'}
                    placeholder="Tên vật liệu"
                    name={`material-${keyItem}`}
                />
            </td>
            <td>
                <Select isClearable
                    onChange={handleChangeSelectUnit.bind(this)}
                    options={optionUnits} 
                    menuPosition={'fixed'}
                    placeholder="Đơn vị"
                    name={`unit-${keyItem}`}
                />
            </td>
            
            <td><input type="text" className="form-control" id="quantity" name={`quantity-${keyItem}`} value={quantity} placeholder="Số lượng (ví dụ: 100)" onChange={onChangeTextQuantity.bind(this, keyItem)} /></td>
            <td>
                <input type="text" className="form-control" id="price" name={`price-${keyItem}`} value={price} placeholder="Đơn giá (ví dụ: 1000000)" onChange={onChangeTextPrice.bind(this, keyItem)} />
            </td>
            <td style={ {lineHeight: "40px"} }>
                <strong><NumberFormat value={quantity*price} displayType={'text'} thousandSeparator={true} prefix={'VNĐ '} /></strong>
                <input type="hidden" className="form-control" id="totalPrice" name={`totalPrice-${keyItem}`} value={quantity*price} />
            </td>
            
        </tr>
    )
}

export default ItemSupplier
