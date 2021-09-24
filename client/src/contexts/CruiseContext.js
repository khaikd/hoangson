import { createContext, useState, useReducer } from 'react';
import { cruiseReducer } from '../reducers/cruiseReducer';
import { apiUrl, CRUISES_LOADED_SUCCESS, CRUISES_LOADED_FAIL, ADD_CRUISE, FIND_CRUISE, UPDATE_CRUISE, DELETE_CRUISE } from './constants';
import axios from 'axios';

export const CruiseContext = createContext()

const CruiseContextProvider = ({ children }) => {

    // State
    const [cruiseState, dispatch] = useReducer(cruiseReducer, {
        cruise: null,
        cruises: [],
        cruisesLoading: true
    })

    const [showAddCruiseModal, setShowAddCruiseModal] = useState(false)
    const [showUpdateCruiseModal, setShowUpdateCruiseModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get all Cruises
    const getCruises = async() => {
        try {
            const response = await axios.get(`${apiUrl}/cruises`)
            if(response.data.success){
                dispatch({type: CRUISES_LOADED_SUCCESS, payload: response.data.cruises})
            }
        } catch (error) {
            dispatch({ type: CRUISES_LOADED_FAIL })
            return error.response.data ? error.response.data : {success: false, message: 'Server error!'}
        }
    }

    // Add Cruise
    const addCruise = async newCruise => {
        try {
            const response = await axios.post(`${apiUrl}/cruises`, newCruise)
            if(response.data.success){
                dispatch( {
                    type: ADD_CRUISE,
                    payload: response.data.cruise
                } )
                return response.data
            }
        } catch (error) {
            //dispatch({ type: POSTS_LOADED_FAIL })
            return error.response.data ? error.response.data : {success: false, message: 'Server error!'}             
        }
    }

    // Find Cruise when user is updating post
    const findCruise = cruiseId => {
        const cruise = cruiseState.cruises.find(cruise => cruise._id === cruiseId)
        dispatch({
            type: FIND_CRUISE,
            payload: cruise
        })
    }

    // updateCruise
    const updateCruise = async updateCruise => {
        try {
            const response = await axios.put(`${apiUrl}/cruises/${updateCruise._id}`, updateCruise)
            if(response.data.success){
                dispatch( {
                    type: UPDATE_CRUISE,
                    payload: response.data.cruise
                } )
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server error!'}
        }
    }

    // Find a cruise
    /*const FindACruise = async cruiseId => {
        try {
            const response = await axios.get(`${apiUrl}/cruises/${cruiseId}`)
            if(response.data.success){
                dispatch({
                    type: FIND_A_CRUISE,
                    payload: {cruisesLoading: true, cruise: response.data.cruise}
                })
            }
        } catch (error) {
            dispatch({ type: CRUISES_LOADED_FAIL })
            return error.response.data ? error.response.data : {success: false, message: 'Server error!'}
        }
    }*/

    // Delete Cruise
    const deleteCruise = async cruiseId => {
        try {
            const response = await axios.delete(`${apiUrl}/cruises/${cruiseId}`)
            if(response.data.success){
                dispatch( {
                    type: DELETE_CRUISE,
                    payload: cruiseId
                } )
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Post Context Data
    const cruiseContextData = {
        cruiseState,
        getCruises,
        addCruise,
        findCruise,
        //FindACruise,
        updateCruise,
        deleteCruise,
        showToast, 
        setShowToast,
        showAddCruiseModal,
        setShowAddCruiseModal,
        showUpdateCruiseModal,
        setShowUpdateCruiseModal
    }

    return (
        <CruiseContext.Provider value={cruiseContextData}>
            {children}
        </CruiseContext.Provider>
    )

}

export default CruiseContextProvider