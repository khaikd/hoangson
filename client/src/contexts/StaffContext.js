import { createContext, useState, useReducer } from 'react';
import { staffReducer } from '../reducers/staffReducer';
import { apiUrl, STAFF_LOADED_SUCCESS, STAFF_LOADED_FAIL, ADD_STAFF, DELETE_STAFF, FIND_STAFF, UPDATE_STAFF } from './constants';
import axios from 'axios';


export const StaffContext = createContext()

const StaffContextProvider = ({ children }) => {

    // State
    const [staffState, dispatch] = useReducer(staffReducer, {
        staff: null,
        staffs: [],
        staffsLoading: true
    })

    const [showAddStaff, setAddStaff] = useState(false)
    const [showUpdateStaff, setShowUpdateStaff] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get all Staffs
    const getStaffs = async() => {
        try {
            const response = await axios.get(`${apiUrl}/staff`)
            if (response.data.success) {
                dispatch({ type: STAFF_LOADED_SUCCESS, payload: response.data.staffs })
            }
        } catch (error) {
            dispatch({ type: STAFF_LOADED_FAIL })
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Add Staff
    const addStaff = async newStaff => {
        try {
            const response = await axios.post(`${apiUrl}/staff`, newStaff)
            if (response.data.success) {
                dispatch({
                    type: ADD_STAFF,
                    payload: response.data.staff
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Find Staff when user is updating post
    const findStaff = staffId => {
        const staff = staffState.staffs.find(staff => staff._id === staffId)
        dispatch({
            type: FIND_STAFF,
            payload: staff
        })
    }

    // update Staff
    const updateStaff = async updateStaff => {
        try {
            const response = await axios.put(`${apiUrl}/staff/${updateStaff._id}`, updateStaff)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_STAFF,
                    payload: response.data.staff
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Delete Staff
    const deleteStaff = async staffId => {
        try {
            const response = await axios.delete(`${apiUrl}/staff/${staffId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_STAFF,
                    payload: staffId
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Staff Context Data
    const staffContextData = {
        staffState,
        getStaffs,
        addStaff,
        findStaff,
        updateStaff,
        deleteStaff,
        showToast,
        setShowToast,
        showAddStaff,
        setAddStaff,
        showUpdateStaff,
        setShowUpdateStaff
    }

    return ( 
        <StaffContext.Provider value = { staffContextData } > 
            { children } 
        </StaffContext.Provider>
    )

}

export default StaffContextProvider