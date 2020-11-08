import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import { KEYS_TOKEN_CREDENTIEL, KEYS_USER_CREDENTIEL } from "constants/keys";

export const getMe = createAsyncThunk('user/getMe', async (params, thunkAPI) => {
    const currentUser = await userApi.getMe();
    return currentUser;
});

const userSlice = createSlice({
    name: 'user',
    initialState : {
        current: JSON.parse(localStorage.getItem(KEYS_USER_CREDENTIEL)) || {},
        loading: false,
        error : '',
        isLogin : !!localStorage.getItem(KEYS_TOKEN_CREDENTIEL)
    },
    reducers : {
        saveUser : (state, action) => {
            state.current = action.payload.current;
            state.isLogin = action.payload.isLogin;
        }
    },
    extraReducers : {
        [getMe.pending]: (state) => {
            state.loading = true;
        },
        [getMe.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getMe.fulfilled]: (state, action) => {
            state.loading = false;
            state.current = action.payLoad;
        },
    }
});

const { reducer : userReducer, actions } = userSlice;

export const {saveUser} = actions;
export default userReducer;