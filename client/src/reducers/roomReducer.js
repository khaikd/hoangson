import { ROOMS_LOADED_SUCCESS, ROOMS_LOADED_FAIL } from '../contexts/constants';

export const roomReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case ROOMS_LOADED_SUCCESS:
            return {
                ...state,
                rooms: payload,
                roomsLoading: false
            }
        case ROOMS_LOADED_FAIL:
            return {
                ...state,
                rooms: [],
                roomsLoading: false
            }
        default:
            return state
    }
}