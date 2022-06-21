import React, {memo} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';

const { width } = Dimensions.get('window');


const TopAreaComponents = memo((props:any) => {
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
          <View style={{...styles.initMenu, backgroundColor: 'black'}}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>アセット配置の細かさ設定</Text>
          </View>
        </View>
      )
    }
    const EditMapMode = () => {
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
          <View style={{...styles.menuButtons, backgroundColor: 'green'}}><Text style={{textAlign: 'center', fontSize: 50}}>hoge</Text></View>
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
            <Text style={{color: "white"}}> Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{
              flex:1,
              backgroundColor: 'gray',
              justifyContent: 'center',
              alignItems: 'center',
            }}
                onPress={props.closeMapEditorHandler}
            >
              <Text style={{color: "white"}}> Close</Text>
            </TouchableOpacity>
          </View>
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
})

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
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      alignContent: 'center',
      justifyContent: 'center',
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