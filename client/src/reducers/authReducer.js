// luu giu trang thai xac thuc nguoi dung
import { USERS_LOADED_FAIL, USERS_LOADED_SUCCESS, ADD_USER, FIND_USER, UPDATE_USER, DELETE_USER } from '../contexts/constants';
export const authReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user, users } } = action

    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }
        case USERS_LOADED_SUCCESS:
            return {
                ...state,
                users: users,
                authLoading: false
            }
        case USERS_LOADED_FAIL:
            return {
                ...state,
                users: [],
                authLoading: false
            }
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, user],
            }
        case FIND_USER:
            return {
                ...state,
                user
            }
        case UPDATE_USER:
            const newUser = state.users.map(item => {
                if (item._id === user._id) {
                    return user
                } else {
                    return item
                }
            })
            return {
                ...state,
                users: newUser
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(item => item._id !== user)
            }
        default:
            return state
    }
}