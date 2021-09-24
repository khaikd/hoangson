import { createContext, useState, useReducer } from 'react';
import { exportReducer } from '../reducers/exportReducer';
import { apiUrl, ADD_EXPORT, EXPORTS_LOADED_FAIL, EXPORTS_LOADED_SUCCESS, DELETE_EXPORT, FIND_EXPORT, UPDATE_EXPORT } from './constants';
import axios from 'axios';


export const ExportContext = createContext()

const ExportContextProvider = ({ children }) => {

    // State
    const [exportState, dispatch] = useReducer(exportReducer, {
        dataExport: null,
        dataExports: [],
        dataExportsLoading: true
    })

    const [showAddExport, setAddExport] = useState(false)
    const [showUpdateExport, setShowUpdateExport] = useState(false)
    const [showViewExport, setShowViewExport] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get all Exports
    const getExports = async() => {
        try {
            const response = await axios.get(`${apiUrl}/exports`)
            if (response.data.success) {
                dispatch({ type: EXPORTS_LOADED_SUCCESS, payload: response.data.exports })
            }
        } catch (error) {
            dispatch({ type: EXPORTS_LOADED_FAIL })
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }
    
    // Add Export
    const addExport = async newExport => {
        try {
            const response = await axios.post(`${apiUrl}/exports`, newExport)
            if (response.data.success) {
                dispatch({
                    type: ADD_EXPORT,
                    payload: response.data.export
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Find Export when user is updating export
    const findExport = exportId => {
        const dataExport = exportState.dataExports.find(dataExport => dataExport._id === exportId)
        dispatch({
            type: FIND_EXPORT,
            payload: dataExport
        })
    }

    // update Export
    const updateExport = async updateExport => {
        try {
            const response = await axios.put(`${apiUrl}/exports/${updateExport._id}`, updateExport)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_EXPORT,
                    payload: response.data.export
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Delete Export
    const deleteExport = async exportId => {
        try {
            const response = await axios.delete(`${apiUrl}/exports/${exportId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_EXPORT,
                    payload: exportId
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // export Context Data
    const exportContextData = {
        exportState,
        getExports,
        addExport,
        findExport,
        updateExport,
        deleteExport,
        showToast,
        setShowToast,
        showAddExport,
        setAddExport,
        showUpdateExport,
        setShowUpdateExport,
        showViewExport, 
        setShowViewExport
    }

    return ( 
        <ExportContext.Provider value = { exportContextData } > 
            { children } 
        </ExportContext.Provider>
    )

}

export default ExportContextProvider