import { ADD_UNIT, UNITS_LOADED_FAIL, UNITS_LOADED_SUCCESS, DELETE_UNIT, FIND_UNIT, UPDATE_UNIT } from '../contexts/constants';

export const unitReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case UNITS_LOADED_SUCCESS:
            return {
                ...state,
                units: payload,
                unitsLoading: false
            }
        case UNITS_LOADED_FAIL:
            return {
                ...state,
                units: [],
                unitsLoading: false
            }
        case ADD_UNIT:
            {
                return {
                    ...state,
                    units: [...state.units, payload],
                }
            }
        case FIND_UNIT:
            return {
                ...state,
                unit: payload
            }
        case UPDATE_UNIT:
            const newUnit = state.units.map(unit => {
                if (unit._id === payload._id) {
                    return payload
                } else {
                    return unit
                }
            })
            return {
                ...state,
                units: newUnit
            }
        case DELETE_UNIT:
            return {
                ...state,
                units: state.units.filter(unit => unit._id !== payload)
            }
        default:
            return state
    }
}