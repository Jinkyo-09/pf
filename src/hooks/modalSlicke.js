import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
	name: 'modal',
	initialSate: { open: false },
	reducers: {
		open: (state) => (state.open = true),
		close: (state) => (state.open = false),
	},
});

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
