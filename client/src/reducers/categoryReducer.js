import { ADD_CATEGORY, CATEGORIES_LOADED_FAIL, CATEGORIES_LOADED_SUCCESS, DELETE_CATEGORY, FIND_CATEGORY, UPDATE_CATEGORY } from '../contexts/constants';

export const categoryReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CATEGORIES_LOADED_SUCCESS:
            return {
                ...state,
                categories: payload,
                categoriesLoading: false
            }
        case CATEGORIES_LOADED_FAIL:
            return {
                ...state,
                categories: [],
                categoriesLoading: false
            }
        case ADD_CATEGORY:
            {
                return {
                    ...state,
                    categories: [...state.categories, payload],
                }
            }
        case FIND_CATEGORY:
            return {
                ...state,
                category: payload
            }
        case UPDATE_CATEGORY:
            const newCategory = state.categories.map(category => {
                if (category._id === payload._id) {
                    return payload
                } else {
                    return category
                }
            })
            return {
                ...state,
                categories: newCategory
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(category => category._id !== payload)
            }
        default:
            return state
    }
}