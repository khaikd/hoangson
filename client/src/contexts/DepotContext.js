import { createContext, useState, useReducer } from 'react';
import { depotReducer } from '../reducers/depotReducer';
import { apiUrl, ADD_DEPOT, DEPOTS_LOADED_FAIL, DEPOTS_LOADED_SUCCESS, DELETE_DEPOT, FIND_DEPOT, UPDATE_DEPOT } from './constants';
import axios from 'axios';


export const DepotContext = createContext()

const DepotContextProvider = ({ children }) => {

    // State
    const [depotState, dispatch] = useReducer(depotReducer, {
        depot: null,
        depots: [],
        depotsLoading: true
    })

    const [showAddDepot, setAddDepot] = useState(false)
    const [showUpdateDepot, setShowUpdateDepot] = useState(false)
    const [showViewDepot, setShowViewDepot] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get all depots
    const getDepots = async() => {
        try {
            const response = await axios.get(`${apiUrl}/depots`)
            if (response.data.success) {
                dispatch({ type: DEPOTS_LOADED_SUCCESS, payload: response.data.depots })
            }
        } catch (error) {
            dispatch({ type: DEPOTS_LOADED_FAIL })
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }
    
    // Add Depot
    const addDepot = async newDepot => {
        try {
            const response = await axios.post(`${apiUrl}/depots`, newDepot)
            if (response.data.success) {
                dispatch({
                    type: ADD_DEPOT,
                    payload: response.data.depot
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Find Depot when user is updating post
    const findDepot = depotId => {
        const depot = depotState.depots.find(depot => depot._id === depotId)
        dispatch({
            type: FIND_DEPOT,
            payload: depot
        })
    }

    // update Depot
    const updateDepot = async updateDepot => {
        try {
            const response = await axios.put(`${apiUrl}/depots/${updateDepot._id}`, updateDepot)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_DEPOT,
                    payload: response.data.depot
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Delete Depot
    const deleteDepot = async depotId => {
        try {
            const response = await axios.delete(`${apiUrl}/depots/${depotId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_DEPOT,
                    payload: depotId
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // depot Context Data
    const depotContextData = {
        depotState,
        getDepots,
        addDepot,
        findDepot,
        updateDepot,
        deleteDepot,
        showToast,
        setShowToast,
        showAddDepot,
        setAddDepot,
        showUpdateDepot,
        setShowUpdateDepot,
        showViewDepot, 
        setShowViewDepot
    }

    return ( 
        <DepotContext.Provider value = { depotContextData } > 
            { children } 
        </DepotContext.Provider>
    )

}

export default DepotContextProvider