import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IUsers {
    id: number,
    name: string,
    email: string,
    phone: string,
    position: string,
    position_id: number,
    registration_timestamp: number,
    photo: string
}
interface IPositions{
    id: number,
    name: string
}
interface IinitialState{
    usersCount:number,
    users: IUsers[],
    positions: IPositions[],
    totalPages: number,
    loading: boolean,
    error: null | string,
}

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async function (count:number | null, {rejectWithValue}){
        try {
            const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${count}`)

            if(response.status !== 200){
                throw new Error(response.statusText)
            }
            return response.data
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)
export const getPosition = createAsyncThunk(
    "users/getPosition",
    async function (_, {rejectWithValue}){
        try {
            const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)

            if(response.status !== 200){
                throw new Error(response.statusText)
            }
            return response.data.positions
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)

export const postUser = createAsyncThunk(
    "users/postUser",
    async function (keys:object, {rejectWithValue}){  
        try {        
            const token = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/token`).then(res => res.data.token)
            const config = {
                headers: {'Token':token}
            }
            const response = await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', keys, config)
            
            if(response.status !== 200){
                throw new Error(response.statusText)
            }        
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)

let initialState = {
    usersCount: 6,
    users:[],
    positions:[],
    totalPages: 0,
    loading: false,
    error: null,

} as IinitialState

const setPending = (state:any) =>{
    state.loading = true
    state.error = null
}
const setError = (state:any, action:any) =>{
    state.error = action.payload
}

const UserSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        showMore(state){
            state.usersCount += 6
        },
        closeUsers(state){
            state.usersCount = 6
        },
    },
    extraReducers:{
        [getUsers.pending.type]: setPending,
        [getUsers.fulfilled.type]: (state, action) =>{
            state.users = action.payload.users
            state.totalPages = action.payload.total_pages
            state.loading = false
        },
        [getUsers.rejected.type]: setError,
        [getPosition.pending.type]: setPending,
        [getPosition.fulfilled.type]: (state, action) =>{
            state.positions = action.payload
            state.loading = false
        },
        [getPosition.rejected.type]: setError,
        [postUser.pending.type]: setPending,
        [postUser.fulfilled.type]: (state) =>{
            state.loading = false
        },
        [postUser.rejected.type]: setError,

       
    }
})
export const { closeUsers, showMore } = UserSlice.actions

export default UserSlice.reducer