import {StyleSheet, Dimensions} from 'react-native';
const wh= Dimensions.get('window').height;
const ww= Dimensions.get('window').width;

export default StyleSheet.create({
    KeyboardAvoidingView:{
        height:wh,
    },
    mainContainer:{
        height: '100%', 
    },
    header:{
        height:'30%'
    },
    backgroundImage:{
        height:'100%',
        resizeMode : 'stretch',
        width:"100%",

    },
    backgroundImageContainer:{
        height:'100%',
    },
    logo:{
        height:ww < 400 ? '50%' : '55%',
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop:20
    },
    hederText:{
        fontSize: ww < 400 ? 15 : 20,
        alignSelf:'center',
        color:"#f9e385",
        fontFamily:'Roboto_700Bold',
        textAlign: 'center'
    },
    footer:{
        flex: wh < 600 ? 0.25 : 0.2,
        width: '100%',
    },
    footerBkImage:{
        height:'100%', 
        width:'100%', 
        alignItems:'center', 
        justifyContent:'center'
    },
    footerTextContainer:{
        flexDirection:'row'
    },
    footerText:{
        fontSize:ww < 400 ? 12 : 14,
        marginBottom: wh < 600 ? 10 : 0
    }
});