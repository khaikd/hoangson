import { createContext, useState, useReducer } from 'react';
import { categoryReducer } from '../reducers/categoryReducer';
import { apiUrl, ADD_CATEGORY, CATEGORIES_LOADED_FAIL, CATEGORIES_LOADED_SUCCESS, DELETE_CATEGORY, FIND_CATEGORY, UPDATE_CATEGORY } from './constants';
import axios from 'axios';


export const CategoryContext = createContext()

const CategoryContextProvider = ({ children }) => {

    // State
    const [categoryState, dispatch] = useReducer(categoryReducer, {
        category: null,
        categories: [],
        categoriesLoading: true
    })

    const [showAddCategory, setAddCategory] = useState(false)
    const [showUpdateCategory, setShowUpdateCategory] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get all Categories
    const getCategories = async() => {
        try {
            const response = await axios.get(`${apiUrl}/categories`)
            if (response.data.success) {
                dispatch({ type: CATEGORIES_LOADED_SUCCESS, payload: response.data.categories })
            }
        } catch (error) {
            dispatch({ type: CATEGORIES_LOADED_FAIL })
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Add Category
    const addCategory = async newCategory => {
        try {
            const response = await axios.post(`${apiUrl}/categories`, newCategory)
            if (response.data.success) {
                dispatch({
                    type: ADD_CATEGORY,
                    payload: response.data.category
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Find Category when user is updating post
    const findCategory = categoryId => {
        const category = categoryState.categories.find(category => category._id === categoryId)
        dispatch({
            type: FIND_CATEGORY,
            payload: category
        })
    }

    // update Category
    const updateCategory = async updateCategory => {
        try {
            const response = await axios.put(`${apiUrl}/categories/${updateCategory._id}`, updateCategory)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_CATEGORY,
                    payload: response.data.category
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Delete Category
    const deleteCategory = async categoryId => {
        try {
            const response = await axios.delete(`${apiUrl}/categories/${categoryId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_CATEGORY,
                    payload: categoryId
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Category Context Data
    const categoryContextData = {
        categoryState,
        getCategories,
        addCategory,
        findCategory,
        updateCategory,
        deleteCategory,
        showToast,
        setShowToast,
        showAddCategory,
        setAddCategory,
        showUpdateCategory,
        setShowUpdateCategory
    }

    return ( 
        <CategoryContext.Provider value = { categoryContextData } > 
            { children } 
        </CategoryContext.Provider>
    )

}

export default CategoryContextProvider