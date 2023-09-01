import { configureStore } from '@reduxjs/toolkit';
import ContactReducer from './ContactReducer';

export default configureStore({
    reducer: {
        users: ContactReducer,
    },
});