import {StyleSheet,Dimensions} from 'react-native';
const wh= Dimensions.get('window').height;

export default StyleSheet.create({
    mainContainer:{
        alignItems: 'center',
        flex:1,
        marginTop:wh < 600 ? 5 : 30, 
    },
    container:{
        alignItems: 'center',
        width: '100%',
    },
    inputs:{
        fontSize:wh < 600 ? 15 : 20,
        borderColor: '#b9b9b9',
        borderWidth:1,
        borderRadius:wh < 600 ? 5 : 10,
        backgroundColor: '#f4f4f4',
        height:wh < 600 ? 30 : 40,
        width:'80%',
        marginBottom:wh < 600 ? 10 : 20,
        paddingLeft:10,
    },
    btnBackground:{
        width:150,
        height:wh < 600 ? 30 : 50,
        borderRadius:20,
        alignItems: 'center',
        justifyContent:'center'
    },
    btnText:{
        fontFamily: 'Roboto_700Bold',
        color: '#f9e385',
        fontSize:wh < 600 ? 15 : 18
    },
    or:{
        fontSize:wh < 600 ? 10 : 15,
        margin:wh < 600 ? 2 : 10
    },
    switch:{
        color:'red',
        fontSize:wh < 600 ? 15 : 20
    },
    message:{
        color:'red',
        fontSize:wh < 600 ? 10 : 15
    }
});