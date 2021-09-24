import { createContext, useReducer, useState, useEffect } from 'react';
import { postReducer } from '../reducers/postReducer';
import { apiUrl, POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from './constants';
import axios from 'axios';

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {

    // State
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get all Posts
    const getPosts = async() => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if(response.data.success){
                dispatch({type: POSTS_LOADED_SUCCESS, payload: response.data.posts})
            }
        } catch (error) {
            dispatch({ type: POSTS_LOADED_FAIL })
            return error.response.data ? error.response.data : {success: false, message: 'Server error!'}
        }
    }

    // Add Post
    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if(response.data.success){
                dispatch( {
                    type: ADD_POST,
                    payload: response.data.post
                } )
                return response.data
            }
        } catch (error) {
            //dispatch({ type: POSTS_LOADED_FAIL })
            return error.response.data ? error.response.data : {success: false, message: 'Server error!'}             
        }
    }

    // Delete Post
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if(response.data.success){
                dispatch( {
                    type: DELETE_POST,
                    payload: postId
                } )
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Find Post when user is updating post
    const findPost = postId => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({
            type: FIND_POST,
            payload: post
        })
    }

    // Update Post
    const updatePost = async updatePost => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatePost._id}`, updatePost)
            if(response.data.success){
                dispatch( {
                    type: UPDATE_POST,
                    payload: response.data.post
                } )
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server error!'}
        }
    }

    // Post Context Data
    const postContextData = {
        postState, 
        getPosts, 
        showAddPostModal, 
        setShowAddPostModal, 
        addPost, 
        showToast, 
        setShowToast, 
        deletePost, 
        updatePost, 
        findPost,
        showUpdatePostModal,
        setShowUpdatePostModal
    }

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider