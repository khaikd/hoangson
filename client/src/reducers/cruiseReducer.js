import { CRUISES_LOADED_SUCCESS, CRUISES_LOADED_FAIL, ADD_CRUISE, FIND_CRUISE, UPDATE_CRUISE, DELETE_CRUISE, FIND_A_CRUISE } from '../contexts/constants';

export const cruiseReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CRUISES_LOADED_SUCCESS:
            return {
                ...state,
                cruises: payload,
                cruisesLoading: false
            }
        case CRUISES_LOADED_FAIL:
            return {
                ...state,
                cruises: [],
                cruisesLoading: false
            }
        case ADD_CRUISE:
            {
                return {
                    ...state,
                    cruises: [...state.cruises, payload],
                }
            }
        case FIND_CRUISE:
            return {
                ...state,
                cruise: payload
            }
        case FIND_A_CRUISE:
            {
                return {
                    ...state,
                    cruise: [...state.cruise, payload]
                }
            }
        case UPDATE_CRUISE:
            //console.log(payload)
            const newCruise = state.cruises.map(cruise => {
                if (cruise._id === payload._id) {
                    return payload
                } else {
                    return cruise
                }
            })
            return {
                ...state,
                cruises: newCruise
            }
        case DELETE_CRUISE:
            return {
                ...state,
                cruises: state.cruises.filter(cruise => cruise._id !== payload)
            }
        default:
            return state
    }
}