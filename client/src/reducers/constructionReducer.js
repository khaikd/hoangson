import { ADD_CONSTRUCTION, CONSTRUCTIONS_LOADED_FAIL, CONSTRUCTIONS_LOADED_SUCCESS, DELETE_CONSTRUCTION, FIND_CONSTRUCTION, UPDATE_CONSTRUCTION } from '../contexts/constants';

export const constructionReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CONSTRUCTIONS_LOADED_SUCCESS:
            return {
                ...state,
                constructions: payload,
                constructionsLoading: false
            }
        case CONSTRUCTIONS_LOADED_FAIL:
            return {
                ...state,
                constructions: [],
                constructionsLoading: false
            }
        case ADD_CONSTRUCTION:
            {
                return {
                    ...state,
                    constructions: [...state.constructions, payload],
                }
            }
        case FIND_CONSTRUCTION:
            return {
                ...state,
                construction: payload
            }
        case UPDATE_CONSTRUCTION:
            const newConstruction = state.constructions.map(construction => {
                if (construction._id === payload._id) {
                    return payload
                } else {
                    return construction
                }
            })
            return {
                ...state,
                constructions: newConstruction
            }
        case DELETE_CONSTRUCTION:
            return {
                ...state,
                constructions: state.constructions.filter(construction => construction._id !== payload)
            }
        default:
            return state
    }
}