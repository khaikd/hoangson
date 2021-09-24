import { ADD_EXPORT, EXPORTS_LOADED_FAIL, EXPORTS_LOADED_SUCCESS, DELETE_EXPORT, FIND_EXPORT, UPDATE_EXPORT } from '../contexts/constants';

export const exportReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case EXPORTS_LOADED_SUCCESS:
            return {
                ...state,
                dataExports: payload,
                dataExportsLoading: false
            }
        case EXPORTS_LOADED_FAIL:
            return {
                ...state,
                dataExports: [],
                dataExportsLoading: false
            }
        case ADD_EXPORT:
            {
                return {
                    ...state,
                    dataExports: [...state.dataExports, payload],
                }
            }
        case FIND_EXPORT:
            return {
                ...state,
                dataExport: payload
            }
        case UPDATE_EXPORT:
            const newExport = state.dataExports.map(dataExport => {
                if (dataExport._id === payload._id) {
                    return payload
                } else {
                    return dataExport
                }
            })
            return {
                ...state,
                dataExports: newExport
            }
        case DELETE_EXPORT:
            return {
                ...state,
                dataExports: state.dataExports.filter(dataExport => dataExport._id !== payload)
            }
        default:
            return state
    }
}