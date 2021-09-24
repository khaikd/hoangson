import { createContext, useState, useReducer } from 'react';
import { roomReducer } from '../reducers/roomReducer';
import { apiUrl, ROOMS_LOADED_SUCCESS, ROOMS_LOADED_FAIL } from './constants';
import axios from 'axios';


export const RoomContext = createContext()

const RoomContextProvider = ({ children }) => {

    // State
    const [roomState, dispatch] = useReducer(roomReducer, {
        room: null,
        rooms: [],
        roomsLoading: true
    })
    
    // Get all Cruises
    const getRooms = async() => {
        try {
            const response = await axios.get(`${apiUrl}/rooms`)
            if(response.data.success){
                dispatch({type: ROOMS_LOADED_SUCCESS, payload: response.data.rooms})
            }
        } catch (error) {
            dispatch({ type: ROOMS_LOADED_FAIL })
            return error.response.data ? error.response.data : {success: false, message: 'Server error!'}
        }
    }

    const roomContextData = {
        roomState,
        getRooms
    }

    return (
        <RoomContext.Provider value={roomContextData}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomContextProvider