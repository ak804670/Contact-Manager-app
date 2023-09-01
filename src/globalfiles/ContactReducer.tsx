import { createSlice } from '@reduxjs/toolkit';
import { userContactInitialData } from './GlobalInterface';

const userContactSlice = createSlice({
  name: "UserContact",
  initialState: userContactInitialData,
  reducers: {
    addUser: (state, action) => {
      state.push({
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        status: action.payload.active === true ? "Active" : "Inactive",
        id: action.payload.id,
      });
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName, active, inactive } = action.payload;
      const updateUser = state.find((user) => user.id == id);
      if (updateUser) {
        updateUser.firstName = firstName;
        updateUser.lastName = lastName;
        updateUser.status = active ? 'Active' : 'Inactive';
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const deleteUser = state.find((user) => user.id == id);
      if (deleteUser) {
        return state.filter(obj => obj.id !== id);
      }
    }
  },
});

export const { addUser, updateUser, deleteUser } = userContactSlice.actions;
export default userContactSlice.reducer;