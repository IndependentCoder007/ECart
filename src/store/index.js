import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import cartSlice from './cartSlice'

export default configureStore({
  reducer: {
    productsSlice:productSlice,
    cartSlice:cartSlice
},
devTools: process.env.NODE_ENV !== 'production',
}
)