import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch categories from API using fetch
export const fetchCategories = createAsyncThunk(
    "product/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/categories"); // Adjust URL as needed
            const data = await response.json();
            if (data.success) {
                return data.categories.map((item) => ({
                    id: item.id,
                    name: item.name,
                    value: item.name,
                    isChecked: false,
                }));
            }
            return rejectWithValue("Failed to fetch categories");
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    categoryList: [],
    loading: false,
    error: null,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        categoryCheck: (state, { payload }) => {
            state.categoryList.forEach((item) => {
                if (item.id === payload) {
                    item.isChecked = !item.isChecked;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.categoryList = payload;
            })
            .addCase(fetchCategories.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export const { categoryCheck } = productSlice.actions;
export default productSlice.reducer;
