import { createContext, useState, useReducer } from 'react';
import { unitReducer } from '../reducers/unitReducer';
import { apiUrl, ADD_UNIT, UNITS_LOADED_FAIL, UNITS_LOADED_SUCCESS, DELETE_UNIT, FIND_UNIT, UPDATE_UNIT } from './constants';
import axios from 'axios';


export const UnitContext = createContext()

const UnitContextProvider = ({ children }) => {

    // State
    const [unitState, dispatch] = useReducer(unitReducer, {
        unit: null,
        units: [],
        unitsLoading: true
    })

    const [showAddUnit, setAddUnit] = useState(false)
    const [showUpdateUnit, setShowUpdateUnit] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get all Units
    const getUnits = async() => {
        try {
            const response = await axios.get(`${apiUrl}/units`)
            if (response.data.success) {
                dispatch({ type: UNITS_LOADED_SUCCESS, payload: response.data.units })
            }
        } catch (error) {
            dispatch({ type: UNITS_LOADED_FAIL })
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Add Unit
    const addUnit = async newUnit => {
        try {
            const response = await axios.post(`${apiUrl}/units`, newUnit)
            if (response.data.success) {
                dispatch({
                    type: ADD_UNIT,
                    payload: response.data.unit
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Find Unit when user is updating post
    const findUnit = unitId => {
        const unit = unitState.units.find(unit => unit._id === unitId)
        dispatch({
            type: FIND_UNIT,
            payload: unit
        })
    }

    // update Unit
    const updateUnit = async updateUnit => {
        try {
            const response = await axios.put(`${apiUrl}/units/${updateUnit._id}`, updateUnit)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_UNIT,
                    payload: response.data.unit
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Delete Unit
    const deleteUnit = async unitId => {
        try {
            const response = await axios.delete(`${apiUrl}/units/${unitId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_UNIT,
                    payload: unitId
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Unit Context Data
    const unitContextData = {
        unitState,
        getUnits,
        addUnit,
        findUnit,
        updateUnit,
        deleteUnit,
        showToast,
        setShowToast,
        showAddUnit,
        setAddUnit,
        showUpdateUnit,
        setShowUpdateUnit
    }

    return ( 
        <UnitContext.Provider value = { unitContextData } > 
            { children } 
        </UnitContext.Provider>
    )

}

export default UnitContextProvider