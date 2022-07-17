import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from  'react-native';

const { width, height } = Dimensions.get('window');

const ConfirmModal = (props: any) => {
    const {closeHandler, okHandler, msg} = props;
    let message = msg;

    const _okHandler = () => {
        console.log("_okHandler() (ConfirmModal.tsx)");
        okHandler();
        closeHandler();
    }

    const _cancelHandler = () => {
        console.log("_cancelHandler() (ConfirmModal.tsx)");
        closeHandler();
    }

    if(msg === "") message = "undefined message";

    return(
        <View style={styles.mainContainer} >
            <View style={styles.inputContainer} >
                <View style={styles.titleLayout}>
                    <View style={styles.titleStyle}>
                        <Text style={styles.titleText}>確認</Text>
                    </View>
                </View>
                <View style={styles.inputLayout}>
                    <View style={styles.message}>
                        <Text style={{color: '#222222', fontSize: 15}}>{msg}</Text>
                    </View>
                    <View style={styles.buttonLayout}>
                        <TouchableOpacity onPress={_cancelHandler} style={styles.Button}>
                            <Text style={{color: 'black'}}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={_okHandler} style={styles.Button}>
                            <Text style={{color: 'black'}}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ConfirmModal;

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