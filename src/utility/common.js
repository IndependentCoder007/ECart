import { Dimensions } from "react-native"
import config from "../config"

export const calculateTotalPrice=(productsArray)=>{
    const totalAmountWithoutTax=productsArray.reduce((intitalValue,item)=>{
       return intitalValue+=(item.price*item.quantity)
    },0)
    const totalAmount=totalAmountWithoutTax+((config.country.taxRate/100)*totalAmountWithoutTax)
    return {totalAmount,totalAmountWithoutTax}
}

export function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
export const { width,height } = Dimensions.get('window');