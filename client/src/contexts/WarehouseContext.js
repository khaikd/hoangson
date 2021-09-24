import { createContext, useState, useReducer } from 'react';
import { warehouseReducer } from '../reducers/warehouseReducer';
import { apiUrl, ADD_WAREHOUSE, WAREHOUSES_LOADED_FAIL, WAREHOUSES_LOADED_SUCCESS, DELETE_WAREHOUSE, FIND_WAREHOUSE, UPDATE_WAREHOUSE } from './constants';
import axios from 'axios';


export const WarehouseContext = createContext()

const WarehouseContextProvider = ({ children }) => {

    // State
    const [warehouseState, dispatch] = useReducer(warehouseReducer, {
        warehouse: null,
        warehouses: [],
        warehousesLoading: true
    })

    const [showAddWarehouse, setAddWarehouse] = useState(false)
    const [showUpdateWarehouse, setShowUpdateWarehouse] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get all Warehouses
    const getWarehouses = async() => {
        try {
            const response = await axios.get(`${apiUrl}/warehouses`)
            if (response.data.success) {
                dispatch({ type: WAREHOUSES_LOADED_SUCCESS, payload: response.data.warehouses })
            }
        } catch (error) {
            dispatch({ type: WAREHOUSES_LOADED_FAIL })
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Add Warehouse
    const addWarehouse = async newWarehouse => {
        try {
            const response = await axios.post(`${apiUrl}/warehouses`, newWarehouse)
            if (response.data.success) {
                dispatch({
                    type: ADD_WAREHOUSE,
                    payload: response.data.warehouse
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Find Warehouse when user is updating post
    const findWarehouse = warehouseId => {
        const warehouse = warehouseState.warehouses.find(warehouse => warehouse._id === warehouseId)
        dispatch({
            type: FIND_WAREHOUSE,
            payload: warehouse
        })
    }

    // update Warehouse
    const updateWarehouse = async updateWarehouse => {
        try {
            const response = await axios.put(`${apiUrl}/warehouses/${updateWarehouse._id}`, updateWarehouse)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_WAREHOUSE,
                    payload: response.data.warehouse
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Delete Warehouse
    const deleteWarehouse = async warehouseId => {
        try {
            const response = await axios.delete(`${apiUrl}/warehouses/${warehouseId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_WAREHOUSE,
                    payload: warehouseId
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Category Context Data
    const warehouseContextData = {
        warehouseState,
        getWarehouses,
        addWarehouse,
        findWarehouse,
        updateWarehouse,
        deleteWarehouse,
        showToast,
        setShowToast,
        showAddWarehouse,
        setAddWarehouse,
        showUpdateWarehouse,
        setShowUpdateWarehouse
    }

    return ( 
        <WarehouseContext.Provider value = { warehouseContextData } > 
            { children } 
        </WarehouseContext.Provider>
    )

}

export default WarehouseContextProvider