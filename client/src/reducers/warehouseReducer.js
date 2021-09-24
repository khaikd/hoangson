import { ADD_WAREHOUSE, WAREHOUSES_LOADED_FAIL, WAREHOUSES_LOADED_SUCCESS, DELETE_WAREHOUSE, FIND_WAREHOUSE, UPDATE_WAREHOUSE } from '../contexts/constants';

export const warehouseReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case WAREHOUSES_LOADED_SUCCESS:
            return {
                ...state,
                warehouses: payload,
                warehousesLoading: false
            }
        case WAREHOUSES_LOADED_FAIL:
            return {
                ...state,
                warehouses: [],
                warehousesLoading: false
            }
        case ADD_WAREHOUSE:
            {
                return {
                    ...state,
                    warehouses: [...state.warehouses, payload],
                }
            }
        case FIND_WAREHOUSE:
            return {
                ...state,
                warehouse: payload
            }
        case UPDATE_WAREHOUSE:
            const newWarehouse = state.warehouses.map(warehouse => {
                if (warehouse._id === payload._id) {
                    return payload
                } else {
                    return warehouse
                }
            })
            return {
                ...state,
                warehouses: newWarehouse
            }
        case DELETE_WAREHOUSE:
            return {
                ...state,
                warehouses: state.warehouses.filter(warehouse => warehouse._id !== payload)
            }
        default:
            return state
    }
}