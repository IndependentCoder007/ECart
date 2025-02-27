import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { calculateTotalPrice } from '../utility/common';
import api from '../api';

const initialState = {
  cartItems: [],
  totalPrice:0,
  totalWithoutTax:0,
  selectedPaymentMethod:"Cash",
  orderItemsConfirmed:false,
  payment:{
    paymentInProcess:false,
    status: "pending",
    isError: false
    }
  };

  export const makePayment=createAsyncThunk("makePayment",async()=>{
    const res = await api.paymentApi()
    console.log(res)
    return res
  })

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    //   if(state.cartItems.length>0){
    //       const price=calculateTotalPrice(state.cartItems)
    //       state.totalPrice=price
    //   }
    },
    removeFromCart: (state, action) => {
      let itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if(itemIndex!=-1){
        const quantity=state.cartItems[itemIndex].quantity
        if(quantity>1){
            state.cartItems[itemIndex].quantity=quantity - 1
        }else{
            state.cartItems.splice(itemIndex,1)
        }
      }
    },
    updateQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }

    },
    updatePaymentMethod:(state,action)=>{
        state.selectedPaymentMethod=action.payload
    },
    updateOrderItemsConfirmed:(state,action)=>{
        if(action.payload){
            const {totalAmount,totalAmountWithoutTax}=calculateTotalPrice(state.cartItems)
            state.totalPrice=totalAmount
            state.totalWithoutTax=totalAmountWithoutTax
        }else{
            state.totalPrice=0
            state.totalWithoutTax=0
        }
        state.orderItemsConfirmed=action.payload
    },
    resetCart:(state)=>{
        state.cartItems=[]
        state.orderItemsConfirmed=false
        state.payment={
            paymentInProcess:false,
            status: "pending",
            isError: false
            }
        state.totalPrice=0
        state.totalWithoutTax=0
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(makePayment.pending, (state, action) => {
        state.payment.paymentInProcess = true;
        state.payment.status="pending"
       })
       builder.addCase(makePayment.fulfilled, (state, action) => {
        // state.payment.paymentInProcess = false;
        state.payment.status = "success"
       })
       builder.addCase(makePayment.rejected, (state, action) => {
        // state.payment.paymentInProcess = false;
        state.payment.isError= true
        state.payment.status= "failed"
       })
  }

});

export const {addToCart,removeFromCart,updateQuantity,updatePaymentMethod,updateOrderItemsConfirmed,resetCart} = cartSlice.actions
export default cartSlice.reducer