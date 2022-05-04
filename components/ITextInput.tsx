import { generateKey } from 'crypto';
import { setDefaultResultOrder } from 'dns';
import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Alert} from 'react-native';

const { width, height } = Dimensions.get('window');

const ITextInput = (props: any) => {
    const {closeHandler} = props;
    const [text, onChangeText] = React.useState("ファイル名を入力");

    return(
        <View style={styles.mainContainer} >
            <View style={styles.inputContainer} >
                <View style={styles.titleLayout}>
                    <View style={styles.titleStyle}>
                        <Text style={styles.titleText}>ファイル名を入力</Text>
                    </View>
                </View>
                <View style={styles.inputLayout}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}> 
                    </TextInput>
                    <View style={styles.buttonLayout}>
                        <TouchableOpacity onPress={closeHandler} style={styles.Button}>
                            <Text style={{color: 'black'}}>Close</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={closeHandler} style={styles.Button}>
                            <Text style={{color: 'black'}}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ITextInput;

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        flex: 1,
        height: height,
        width: width,
        backgroundColor: 'black',
        opacity: 0.9,
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'column',
        height: '30%',
        width: width,
    },
    titleLayout: {
        flex: 0.2,
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        opacity: 0.8,
        width: width,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    inputLayout: {
        flex: 0.8,
        flexDirection: 'column',
        backgroundColor: 'white',
        opacity: 0.8,
        width: width,
        justifyContent: 'space-around',

    },
    titleStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText:{
        color: 'white',
        fontSize: width/20,
    },
    buttonLayout: {
        flex: 1,
        flexDirection: 'row',
        height: '30%',
        width: width,
        background: 'yellow',

    },
    Button: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 12,
        width: '100%',
    },
    input: {
        height: '30%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
});