import { MATERIALS_LOADED_SUCCESS, MATERIALS_LOADED_FAIL, ADD_MATERIAL, DELETE_MATERIAL, FIND_MATERIAL, UPDATE_MATERIAL } from '../contexts/constants';

export const materialReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case MATERIALS_LOADED_SUCCESS:
            return {
                ...state,
                materials: payload,
                materialsLoading: false
            }
        case MATERIALS_LOADED_FAIL:
            return {
                ...state,
                materials: [],
                materialsLoading: false
            }
        case ADD_MATERIAL:
            {
                return {
                    ...state,
                    materials: [...state.materials, payload],
                }
            }
        case DELETE_MATERIAL:
            return {
                ...state,
                materials: state.materials.filter(material => material._id !== payload)
            }
        case FIND_MATERIAL:
            return {
                ...state,
                material: payload
            }
        case UPDATE_MATERIAL:
            const newMaterial = state.materials.map(material => {
                if (material._id === payload._id) {
                    return payload
                } else {
                    return material
                }
            })
            return {
                ...state,
                materials: newMaterial
            }
        default:
            return state
    }
}