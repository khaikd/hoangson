import { ADD_DEPOT, DEPOTS_LOADED_FAIL, DEPOTS_LOADED_SUCCESS, DELETE_DEPOT, FIND_DEPOT, UPDATE_DEPOT } from '../contexts/constants';

export const depotReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case DEPOTS_LOADED_SUCCESS:
            return {
                ...state,
                depots: payload,
                depotsLoading: false
            }
        case DEPOTS_LOADED_FAIL:
            return {
                ...state,
                depots: [],
                depotsLoading: false
            }
        case ADD_DEPOT:
            {
                return {
                    ...state,
                    depots: [...state.depots, payload],
                }
            }
        case FIND_DEPOT:
            return {
                ...state,
                depot: payload
            }
        case UPDATE_DEPOT:
            const newDepot = state.depots.map(depot => {
                if (depot._id === payload._id) {
                    return payload
                } else {
                    return depot
                }
            })
            return {
                ...state,
                depots: newDepot
            }
        case DELETE_DEPOT:
            return {
                ...state,
                depots: state.depots.filter(depot => depot._id !== payload)
            }
        default:
            return state
    }
}