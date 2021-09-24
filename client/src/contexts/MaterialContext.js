import { createContext, useState, useReducer } from 'react';
import { materialReducer } from '../reducers/materialReducer';
import { apiUrl, MATERIALS_LOADED_SUCCESS, MATERIALS_LOADED_FAIL, ADD_MATERIAL, DELETE_MATERIAL, FIND_MATERIAL, UPDATE_MATERIAL } from './constants';
import axios from 'axios';

export const MaterialContext = createContext()

const MaterialContextProvider = ({ children }) => {

    // State
    const [materialState, dispatch] = useReducer(materialReducer, {
        material: null,
        materials: [],
        materialsLoading: true
    })

    const [showAddMaterial, setAddMaterial] = useState(false)
    const [showUpdateMaterial, setShowUpdateMaterial] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get all Materials
    const getMaterials = async() => {
        try {
            const response = await axios.get(`${apiUrl}/materials`)
            if (response.data.success) {
                dispatch({ type: MATERIALS_LOADED_SUCCESS, payload: response.data.materials })
            }
        } catch (error) {
            dispatch({ type: MATERIALS_LOADED_FAIL })
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Add Material
    const addMaterial = async newMaterial => {
        try {
            const response = await axios.post(`${apiUrl}/materials`, newMaterial)
            if (response.data.success) {
                dispatch({
                    type: ADD_MATERIAL,
                    payload: response.data.material
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Find Material when user is updating post
    const findMaterial = materialId => {
        const material = materialState.materials.find(material => material._id === materialId)
        dispatch({
            type: FIND_MATERIAL,
            payload: material
        })
    }

    // update Material
    const updateMaterial = async updateMaterial => {
        try {
            const response = await axios.put(`${apiUrl}/materials/${updateMaterial._id}`, updateMaterial)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_MATERIAL,
                    payload: response.data.material
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Delete Material
    const deleteMaterial = async materialId => {
        try {
            const response = await axios.delete(`${apiUrl}/materials/${materialId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_MATERIAL,
                    payload: materialId
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Category Context Data
    const categoryContextData = {
        materialState,
        getMaterials,
        addMaterial,
        findMaterial,
        updateMaterial,
        deleteMaterial,
        showToast,
        setShowToast,
        showAddMaterial,
        setAddMaterial,
        showUpdateMaterial,
        setShowUpdateMaterial
    }

    return ( 
        <MaterialContext.Provider value = { categoryContextData } > 
            { children } 
        </MaterialContext.Provider>
    )

}

export default MaterialContextProvider