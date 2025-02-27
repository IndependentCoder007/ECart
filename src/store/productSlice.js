import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api";

export const fetchProducts =createAsyncThunk("fetchProducts",async () => {
    const res = await api.mockFetchProducts()
    console.log(res)
    return res.data
 })

export const searchProducts = createAsyncThunk("searchProducts",async (query="") => {
  const res = await api.mockFetchProducts(query)
  return res.data
})

export const productsSlice = createSlice({
    name: 'counter',
    initialState: {
      selectedProduct:null,
      products:{
        isLoading: false,
        data: [],
        isError: false
      },
      searchProducts:{
        isLoading: false,
        data: [],
        isError: false
      },
    },
    reducers: {
      setSelectedProduct: (state,action) => {
       state.selectedProduct=action.payload
      },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.products.isLoading = true;
           }),
           builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products.isLoading = false;
            state.products.data = action.payload;
           }),
           builder.addCase(fetchProducts.rejected, (state, action) => {
            state.products.isLoading = false;
            state.products.isError = true;
           }),
           builder.addCase(searchProducts.pending, (state, action) => {
            state.searchProducts.isLoading = true;
           }),
           builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.searchProducts.isLoading = false;
            state.searchProducts.data = action.payload;
           }),
           builder.addCase(searchProducts.rejected, (state, action) => {
            state.searchProducts.isLoading = false;
            state.searchProducts.isError = true;
           })
    }
  })

  export const { setSelectedProduct } = productsSlice.actions
  
  export default productsSlice.reducer;
  