import { createSlice } from "@reduxjs/toolkit"

export const homeSlice = createSlice({
    name: 'counter',
    initialState: {
      banners:[],
      categories:[]
    },
    reducers: {
      setBanners: state => {
        state.value += 1
      },
      setCategories: state => {
        state.value -= 1
      },
    }
  })
  
  export const { setBanners,setCategories } = homeSlice.actions
  
  export default homeSlice.reducer;