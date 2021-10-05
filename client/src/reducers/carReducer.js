import { CARS_LOADED_FAIL, CARS_LOADED_SUCCESS, FIND_CAR, UPDATE_CAR, DELETE_CAR, ADD_CAR } from '../contexts/constants';

export const carReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CARS_LOADED_SUCCESS:
            return {
                ...state,
                cars: payload,
                carsLoading: false
            }
        case CARS_LOADED_FAIL:
            return {
                ...state,
                cars: [],
                carsLoading: false
            }
        case ADD_CAR:
            {
                return {
                    ...state,
                    cars: [...state.cars, payload],
                }
            }
        case FIND_CAR:
            return {
                ...state,
                car: payload
            }
        case UPDATE_CAR:
            const newCar = state.cars.map(car => {
                if (car._id === payload._id) {
                    return payload
                } else {
                    return car
                }
            })
            return {
                ...state,
                cars: newCar
            }
        case DELETE_CAR:
            return {
                ...state,
                cars: state.cars.filter(car => car._id !== payload)
            }
        default:
            return state
    }
}