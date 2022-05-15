import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ITextInput = (props: any) => {
    const {closeHandler} = props;
    const [text, onChangeText] = React.useState('新規ファイル');

    const okHandler = () => {
        closeHandler(text);
    }

    const cancelHandler = () => {
        closeHandler("");
    }

    return(
        <View style={styles.mainContainer} >
            <View style={styles.inputContainer} >
                <View style={styles.titleLayout}>
                    <View style={styles.titleStyle}>
                        <Text style={styles.titleText}>新規作成</Text>
                    </View>
                </View>
                <View style={styles.inputLayout}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}> 
                    </TextInput>
                    <View style={styles.message}>
                        <Text style={{color: '#222222', fontSize: 15}}>使用可能なファイル名です(checker 未実装)</Text>
                    </View>
                    <View style={styles.buttonLayout}>
                        <TouchableOpacity onPress={cancelHandler} style={styles.Button}>
                            <Text style={{color: 'black'}}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={okHandler} style={styles.Button}>
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
    },
    inputContainer: {
        flexDirection: 'column',
        height: '30%',
        width: width,
        marginTop: '30%',
    },
    titleLayout: {
        flex: 0.2,
        flexDirection: 'row',
        backgroundColor: '#191970',
        opacity: 0.8,
        width: width,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    inputLayout: {
        flex: 0.8,
        flexDirection: 'column',
        backgroundColor: 'white',
        opacity: 0.9,
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
    message: {
        marginLeft: 12,
        marginBottom: 12,
        color: 'blue'
    }
});