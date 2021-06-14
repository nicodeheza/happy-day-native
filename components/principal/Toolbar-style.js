import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    toolbar:{
        position:'absolute',
        bottom:0,
        left:0,
        backgroundColor: '#eaeaea',
        flexDirection: 'row',
        width:'100%',
        height: '10%',
        alignItems: 'center',
        justifyContent:'space-around',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        elevation:20,
        borderColor: '#d4d4d4',
        borderTopWidth:1,
        borderRightWidth:1,
        borderLeftWidth:1
    },
    btnImage:{
        resizeMode:'contain',
        height:'60%'
    }
});