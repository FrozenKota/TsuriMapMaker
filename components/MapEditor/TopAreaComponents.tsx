import React, {memo} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Touchable} from 'react-native';
import { isArgumentsObject } from 'util/types';

const { width } = Dimensions.get('window');


const TopAreaComponents = (props:any) => {
  const {fileName} = props;
  console.log("TopAreaComponents");

  const InitLocationMenu = () => {
    return(
      <View style={styles.menuLayout}>
        <View style={{...styles.initMenu, backgroundColor: 'black'}}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: width/15}}>地図を動かして、エリアを選択🐟</Text>
        </View>
      </View> 
    )
  }
  const InitDivNumMenu = () => {
    return(
      <View style={styles.menuLayout}>
        <View style={{...styles.menuButtons, backgroundColor: 'brown'}}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={props.countup}
          >
            <Text style={{color: "white"}}> Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{
            flex:1,
            backgroundColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
          }}
              onPress={props.countdown}
          >
            <Text style={{color: "white"}}> Down</Text>
          </TouchableOpacity>
        </View>
        <View style={{...styles.menuButtons, backgroundColor: 'darkblue'}}><Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>分割数を設定！</Text></View>
      </View>
    )
  }
  const EditMapMode = () => {
    return(
      <View style={styles.menuLayout}>
        <View style={{...styles.initMenu, backgroundColor: 'black'}}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>地図を編集しよう</Text>
          <Text style={{color: 'gray', textAlign: 'center', fontSize: 15}}>{fileName}</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={()=>{console.log("SAVE")}}>
          <Text style={{color:'white', fontSize:(width*0.25)/5}}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={()=>{console.log("CLOSE")}}>
          <Text style={{color:'white', fontSize:(width*0.25)/5}}>CLOSE</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if(props.initStatus.location){
    console.log("#init Location Mode")
    return(
      <><InitLocationMenu /></>
    )
  }else if(props.initStatus.divNum){
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
}

export default TopAreaComponents;

const styles = StyleSheet.create({
    // 親コンテナ
    mainContainer: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'black',
    },
    // メニュー（戻る、保存など）
    menuLayout: {
      width: '100%',
      height: '15%',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row',
    },
    menuButtons: {
      flex: 1,
      height: '100%',
      borderRadius: 10,
      alignContent: 'center',
      justifyContent: 'center',
    },
    initMenu: {
      flex: 3,
      flexDirection: 'column',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    saveButton: {
      flex: 1,
      height: '100%',
      color: 'white',
      borderColor: 'white',
      borderWidth: 3,
      backgroundColor: 'darkblue',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 1,
    },
    closeButton: {
      flex: 1,
      height: '100%',
      color: 'white',
      borderColor: 'white',
      borderWidth: 2,
      backgroundColor: 'darkred',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 1,
    },
    // GoogleMap表示エリア設定
    mapLayout: {
      width: '100%',
      height: '70%',
    },
    // コントロールボタン配置エリア
    controllerLayout: {
      width: '100%',
      height: '10%',
      flexDirection: 'row',
    },
    assetButtonLayout: {
      width: '100%',
      height: '5%',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: 'green',
    },
    okButtonForInitLocation: {
      width: '100%',
      height: '5%',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightblue',
    },
    controlButtons: {
      flex:1,
      width: '100%',
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });