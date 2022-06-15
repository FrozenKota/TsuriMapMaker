import React, { useState, memo, useCallback} from 'react';
import { Text, TouchableOpacity, StyleSheet} from 'react-native';

const SelectButton = memo((props:any) => {
console.log("SelectButton");
    return (
        <TouchableOpacity style={styles.okButtonForInitLocation} onPress={props.assetSelectHandler}>
            <Text style={{color: "darkblue", fontSize: 20}}> O K </Text>
        </TouchableOpacity>
    )
})

export default SelectButton;

const styles = StyleSheet.create({
    okButtonForInitLocation: {
      width: '100%',
      height: '5%',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightblue',
    }
  });