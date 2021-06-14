import {StyleSheet, Dimensions} from 'react-native';

const vw= Dimensions.get('window').width;
const vh= Dimensions.get('window').height;
const boxW= 250;
const boxH = 50;

export default StyleSheet.create({
    messageContainer:{
        backgroundColor: 'rgba(0,0,0,.5)',
        width: boxW,
        height: boxH,
        position:'absolute',
        top: vh / 2 - boxH/2 ,
        left: vw / 2 - boxW/2,
        borderRadius: 20,
        justifyContent:'center',
        alignItems:'center'
        
    },
    messageText:{
        color:'white'
    }
});