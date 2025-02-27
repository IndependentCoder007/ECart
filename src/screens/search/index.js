import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchComponent from './searchComponent'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from '../../utility/common'
import { searchProducts } from '../../store/productSlice'

export default function Search() {
  const dipatch=useDispatch()
  const [searchTerm, setSearchTerm] = useState('');
  const products = useSelector((store)=>store.productsSlice.searchProducts)
  const fetchSearchResults = async (term) => {
        dipatch(searchProducts(term))
  };
  const debouncedSearch = debounce(fetchSearchResults, 1500);
  const handleSearch = (text) => {
    setSearchTerm(text);
    debouncedSearch(text);
  };
  useEffect(()=>{
    fetchSearchResults("")
  },[])
  return (
    <View style={{flex:1}}>
        <SearchComponent onChangeText={handleSearch} 
        productsLoading={products.isLoading}
        products={products.data}
        productsError={products.isError} />
    </View>
  )
}