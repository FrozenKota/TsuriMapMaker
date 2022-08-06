import React, {memo} from 'react';
import { Dimensions, StatusBar, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Images from '../../Asset/asset';

const { width, height } = Dimensions.get('window');
const STATUSBAR_HEIGHT = (StatusBar.currentHeight? StatusBar.currentHeight : 0);
const HEIGHT = height - STATUSBAR_HEIGHT;

const BottomAreaComponents = memo((props:any) => {
    console.log("BottomAreaComponents");
    return (
      <View style={styles.controllerLayout}>
      <TouchableOpacity style={styles.controlButtons} onPress={() => props.addData({PosX: props.horizontal, PosY: props.vertical, source: Images[props.currentImageTag]})} >
        <Image style={{resizeMode: 'stretch', width: width/6, height: '100%'}} source={require('../../Asset/Buttons/plus.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButtons} onPress={() => props.deleteData({PosX: props.horizontal, PosY: props.vertical, source: Images[props.currentImageTag]})}>
        <Image style={{resizeMode: 'stretch', width: width/6, height: '100%'}} source={require('../../Asset/Buttons/minus.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButtons} onPress={props.moveLeft}>
        <Image style={{resizeMode: 'stretch', width: width/6, height: '100%'}} source={require('../../Asset/Buttons/left.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButtons} onPress={props.moveDown}>
        <Image style={{resizeMode: 'stretch', width: width/6, height: '100%'}} source={require('../../Asset/Buttons/down.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButtons} onPress={props.moveUp}>
        <Image style={{resizeMode: 'stretch', width: width/6, height: '100%'}} source={require('../../Asset/Buttons/up.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButtons} onPress={props.moveRight}>
        <Image style={{resizeMode: 'stretch', width: width/6, height: '100%'}} source={require('../../Asset/Buttons/right.png')} />
      </TouchableOpacity>
    </View>
    )
  }
)


export default BottomAreaComponents;

const styles = StyleSheet.create({
    // コントロールボタン配置エリア
    controllerLayout: {
      width: '100%',
      height: HEIGHT * 0.10,
      flexDirection: 'row',
    },
    controlButtons: {
      flex:1,
      width: '100%',
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });