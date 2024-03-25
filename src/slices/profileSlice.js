import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setUserReal(state, value){
            state.userReal = value.payload;
          },
        setLoading(state, value) {
          state.loading = value.payload
        },
    },
});

export const {setUser,setLoading,setUserReal} = profileSlice.actions;
export default profileSlice.reducer;