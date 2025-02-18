import { createSlice } from "@reduxjs/toolkit";
import { UserList } from "../Data";
import fetchUser from "./userActions";


const UserSlice = createSlice({
    name: 'users',
    initialState:{
        users: UserList,
        status: 'idle',

    },
    // reducer  logic
    reducers: {
        // add
        addUser: (state, action) => {
            state.users.push(action.payload);
            console.log(action);
        },


        // delete
        deleteUser: (state, action) => {
            console.log('state', state);
            const { id } = action.payload;            
            // return state.users.filter((users) => {
            //     users.id !== id});
        state.users =  state.users.filter((users) => users.id !== id);
        },

        // update
        updateUser: (state, action) => {
            const { id, name, email, TaskStatus ,  date, description} = action.payload;
            const newUser = state.users.find((users) => users.id === id);
            if (newUser) {
                newUser.name = name;
                newUser.email = email;
                newUser.TaskStatus= TaskStatus;
                newUser.date = date,
                newUser.description = description;
            }
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = 'succeed';
            state.users.users = action.payload;

          })
          .addCase(fetchUser.rejected, (state, action) => {
            state.status = 'failed';
            console.log(action.payload);
          });
    }

})

export const { deleteUser, addUser, updateUser } = UserSlice.actions;

export default UserSlice.reducer;