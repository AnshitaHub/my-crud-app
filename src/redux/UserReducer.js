import { createSlice } from "@reduxjs/toolkit";
import { UserList } from "../Data";


const UserSlice = createSlice({
    name: 'user',
    initialState: UserList,
    // reducer  logic
    reducers: {
        // add
        addUser: (state, action) => {
            state.push(action.payload);
            console.log(action);
        },


        // delete
        deleteUser: (state, action) => {
            const { id } = action.payload;
            return state.filter((user) => user.id !== id);
        },
        // update
        updateUser: (state, action) => {
            const { id, name, email } = action.payload;
            const newUser = state.find((user) => user.id === id);
            if (newUser) {
                newUser.name = name;
                newUser.email = email;
            }
        }
    }
})

export const { deleteUser, addUser, updateUser } = UserSlice.actions;

export default UserSlice.reducer;