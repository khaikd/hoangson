// quan ly trang thai
import { createContext, useReducer, useEffect, useState } from 'react';
import { authReducer } from '../reducers/authReducer';
import { ADD_USER, apiUrl, LOCAL_STORAGE_TOKEN_NAME, USERS_LOADED_FAIL, USERS_LOADED_SUCCESS, FIND_USER, UPDATE_USER, DELETE_USER } from './constants';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
        users: []
    })

    const [showAddUser, setAddUser] = useState(false)
    const [showUpdateUser, setShowUpdateUser] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Authenticate User
    const loadUser = async() => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`)
                //console.log(response)
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: response.data.user }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            })
        }
    }

    useEffect(() => loadUser(), [])

    // Login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }

            await loadUser()

            return response.data;
        } catch (error) {
            if (error.response.data) {
                return error.response.data
            } else {
                return { success: false, message: error.message }
            }
        }
    }

    // Register

    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }

            await loadUser()
            return response.data;
        } catch (error) {
            if (error.response.data) {
                return error.response.data
            } else {
                return { success: false, message: error.message }
            }
        }
    }

    // Update User
    const updateUser = async updateUser => {
        try {
            const response = await axios.put(`${apiUrl}/auth/${updateUser._id}`, updateUser)
            return response.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Logout

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null }
        })
    }

    // Get all Categories
    const getUsers = async() => {
        try {
            const response = await axios.get(`${apiUrl}/auth/users`)
            if (response.data.success) {
                dispatch({ 
                    type: USERS_LOADED_SUCCESS, 
                    payload: { isAuthenticated: false, users: response.data.users } 
                })
            }
        } catch (error) {
            dispatch({ type: USERS_LOADED_FAIL })
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Add User
    const addUser = async newUser => {
        try {
            const response = await axios.post(`${apiUrl}/auth`, newUser)
            if (response.data.success) {
                dispatch({
                    type: ADD_USER,
                    payload: { isAuthenticated: false, user: response.data.user }
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Find User when user is updating user
    const findUser = userId => {
        const user = authState.users.find(user => user._id === userId)
        dispatch({
            type: FIND_USER,
            payload: { isAuthenticated: false, user }
        })
    }

    // update List User
    const updateListUser = async updateUser => {
        try {
            const response = await axios.put(`${apiUrl}/auth/${updateUser._id}`, updateUser)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_USER,
                    payload: { isAuthenticated: false, user: response.data.user }
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Delete User
    const deleteUser = async userId => {
        try {
            const response = await axios.delete(`${apiUrl}/auth/${userId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_USER,
                    payload: { isAuthenticated: false, user: userId }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Context data
    const authContextData = { 
        loginUser, 
        registerUser, 
        logoutUser, 
        authState,
        getUsers,
        findUser,
        updateUser,
        updateListUser,
        deleteUser,
        addUser,
        showAddUser,
        setAddUser,
        showUpdateUser, 
        setShowUpdateUser,
        showToast, 
        setShowToast 
    }

    // Return provider
    return ( 
        <AuthContext.Provider value = { authContextData } >
            { children } 
        </AuthContext.Provider>
    )
}

export default AuthContextProvider