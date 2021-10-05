import { createContext, useState, useReducer } from 'react';
import { carReducer } from '../reducers/carReducer';
import { apiUrl, CARS_LOADED_FAIL, CARS_LOADED_SUCCESS, FIND_CAR, UPDATE_CAR, DELETE_CAR, ADD_CAR } from './constants';
import axios from 'axios';


export const CarContext = createContext()

const CarContextProvider = ({ children }) => {

    // State
    const [carState, dispatch] = useReducer(carReducer, {
        car: null,
        cars: [],
        carsLoading: true
    })

    const [showAddCar, setAddCar] = useState(false)
    const [showUpdateCar, setShowUpdateCar] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get all Cars
    const getCars = async() => {
        try {
            const response = await axios.get(`${apiUrl}/cars`)
            if (response.data.success) {
                dispatch({ type: CARS_LOADED_SUCCESS, payload: response.data.cars })
            }
        } catch (error) {
            dispatch({ type: CARS_LOADED_FAIL })
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Add Car
    const addCar = async newCar => {
        try {
            const response = await axios.post(`${apiUrl}/cars`, newCar)
            if (response.data.success) {
                dispatch({
                    type: ADD_CAR,
                    payload: response.data.car
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Find Car when user is updating car
    const findCar = carId => {
        const car = carState.cars.find(car => car._id === carId)
        dispatch({
            type: FIND_CAR,
            payload: car
        })
    }

    // update Car
    const updateCar = async updateCar => {
        try {
            const response = await axios.put(`${apiUrl}/cars/${updateCar._id}`, updateCar)
            if (response.data.success) {
                dispatch({
                    type: UPDATE_CAR,
                    payload: response.data.car
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error!' }
        }
    }

    // Delete Car
    const deleteCar = async carId => {
        try {
            const response = await axios.delete(`${apiUrl}/cars/${carId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_CAR,
                    payload: carId
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Car Context Data
    const carContextData = {
        carState,
        getCars,
        addCar,
        findCar,
        updateCar,
        deleteCar,
        showToast,
        setShowToast,
        showAddCar,
        setAddCar,
        showUpdateCar,
        setShowUpdateCar
    }

    return ( 
        <CarContext.Provider value = { carContextData } > 
            { children } 
        </CarContext.Provider>
    )

}

export default CarContextProvider