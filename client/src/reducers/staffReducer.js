import { STAFF_LOADED_SUCCESS, STAFF_LOADED_FAIL, ADD_STAFF, DELETE_STAFF, FIND_STAFF, UPDATE_STAFF } from '../contexts/constants';

export const staffReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case STAFF_LOADED_SUCCESS:
            return {
                ...state,
                staffs: payload,
                staffsLoading: false
            }
        case STAFF_LOADED_FAIL:
            return {
                ...state,
                staffs: [],
                staffsLoading: false
            }
        case ADD_STAFF:
            {
                return {
                    ...state,
                    staffs: [...state.staffs, payload],
                }
            }
        case FIND_STAFF:
            return {
                ...state,
                staff: payload
            }
        case UPDATE_STAFF:
            const newStaff = state.staffs.map(staff => {
                if (staff._id === payload._id) {
                    return payload
                } else {
                    return staff
                }
            })
            return {
                ...state,
                staffs: newStaff
            }
        case DELETE_STAFF:
            return {
                ...state,
                staffs: state.staffs.filter(staff => staff._id !== payload)
            }
        default:
            return state
    }
}