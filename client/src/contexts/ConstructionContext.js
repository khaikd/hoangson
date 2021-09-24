import { createContext, useState, useReducer } from 'react';
import { constructionReducer } from '../reducers/constructionReducer';
import { apiUrl, ADD_CONSTRUCTION, CONSTRUCTIONS_LOADED_FAIL, CONSTRUCTIONS_LOADED_SUCCESS, DELETE_CONSTRUCTION, FIND_CONSTRUCTION, UPDATE_CONSTRUCTION } from './constants';
import axios from 'axios';


export const ConstructionContext = createContext()

const ConstructionContextProvider = ({ children }) => {

    // State
    const [constructionState, dispatch] = useReducer(constructionReducer, {
        construction: null,
        constructions: [],
        constructionsLoading: true
    })

    const [showAddConstruction, setAddConstruction] = useState(false)
    const [showUpdateConstruction, setShowUpdateConstruction] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get all Constructions
    const getConstructions = async() => {
        try {
            const response = await axios.get(`${apiUrl}/constructions`)
            if (response.data.success) {
                dispatch({ type: CONSTRUCTIONS_LOADED_SUCCESS, payload: response.data.constructions })
            }
        } catch (error) {
            dispatch({ type: CONSTRUCTIONS_LOADED_FAIL })
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Add Construction
    const addConstruction = async newConstruction => {
        try {
            const response = await axios.post(`${apiUrl}/constructions`, newConstruction)
            if (response.data.success) {
                dispatch({
                    type: ADD_CONSTRUCTION,
                    payload: response.data.construction
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Find Construction when user is updating post
    const findConstruction = constructionId => {
        const construction = constructionState.constructions.find(construction => construction._id === constructionId)
        dispatch({
            type: FIND_CONSTRUCTION,
            payload: construction
        })
    }

    // update Construction
    const updateConstruction = async updateConstruction => {
        try {
            const response = await axios.put(`${apiUrl}/constructions/${updateConstruction._id}`, updateConstruction)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_CONSTRUCTION,
                    payload: response.data.construction
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Delete Construction
    const deleteConstruction = async constructionId => {
        try {
            const response = await axios.delete(`${apiUrl}/constructions/${constructionId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_CONSTRUCTION,
                    payload: constructionId
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Construction Context Data
    const constructionContextData = {
        constructionState,
        getConstructions,
        addConstruction,
        findConstruction,
        updateConstruction,
        deleteConstruction,
        showToast,
        setShowToast,
        showAddConstruction,
        setAddConstruction,
        showUpdateConstruction,
        setShowUpdateConstruction
    }

    return ( 
        <ConstructionContext.Provider value = { constructionContextData } > 
            { children } 
        </ConstructionContext.Provider>
    )

}

export default ConstructionContextProvider