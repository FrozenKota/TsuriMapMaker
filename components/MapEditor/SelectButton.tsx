import React, {memo} from 'react';
import { Dimensions, StatusBar, Text, TouchableOpacity, StyleSheet} from 'react-native';

const { width, height } = Dimensions.get('window');
//const STATUSBAR_HEIGHT = (StatusBar.currentHeight? StatusBar.currentHeight : 0);
//const HEIGHT = height - STATUSBAR_HEIGHT;


const SelectButton = memo((props:any) => {
    console.log("SelectButton");
    const {assetSelectHandler, initStatus, onRegionSelect, onDivNumSelect} = props;

    const InitLocationMenu = () => {
        return (
            <TouchableOpacity
              style={styles.okButtonForInitLocation}
              onPress={onRegionSelect}>
                <Text style={{color: "white", fontSize: 20}}> 場所を決定！ </Text>
            </TouchableOpacity>
        )
    }
    const InitDivNumMenu = () => {
        return(
            <TouchableOpacity 
              style={styles.okButtonForInitLocation}
              onPress={onDivNumSelect}>
                <Text style={{color: "white", fontSize: 20}}> 分割数を決定 </Text>
            </TouchableOpacity>
        )

    }
    const EditMapMode = () => {
        return(
            <TouchableOpacity style={styles.okButtonForInitLocation} onPress={assetSelectHandler}>
                <Text style={{color: "white", fontSize: 20}}> アセット選択 </Text>
            </TouchableOpacity>
        )
    }

    if(initStatus.location){
        console.log("#init Location Mode")
        return(
          <><InitLocationMenu /></>
        )
      }else if(initStatus.divNum){
        console.log("#init DivNum Mode")
        return(
          <><InitDivNumMenu /></>
        )
      }else{
        console.log("#edit Map Mode")
        return (
          <><EditMapMode /></>
        )
      }
})

export default SelectButton;

const styles = StyleSheet.create({
    okButtonForInitLocation: {
      width: '100%',
      height: height*0.05,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: 'darkblue',
    }
  });