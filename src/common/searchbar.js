import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBarComponent= ({onPress,...props}) => {

  return (
    <Searchbar
      placeholder="Search"
      onPress={onPress}
      style={{
        height: 40,
        borderColor: 'lightblue',
        borderWidth: 1,
        backgroundColor: 'white',
        // margin: 6,
      }}
      inputStyle={{
            minHeight: 0,
            fontSize:16 // Add this
          }}
      {...props}
    //   value={searchQuery}
    />
  );
};

export default SearchBarComponent;