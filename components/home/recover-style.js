import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    mainContainer:{
        position:'absolute',
        top:0,
        left:0,
        width: '100%',
        height: '100%',
        zIndex:10,
        alignItems:'center',
        justifyContent:'center',
    },
    container:{
        width:'80%',
        backgroundColor:'#eaeaea',
        borderRadius: 25,
        padding: 25,
        elevation:15
    },
    close:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        marginBottom: 10
    },
    closeImg:{
        resizeMode: 'contain',
        width:15,
    },
    title:{
        fontFamily: 'FredokaOne_400Regular',
        fontSize:25,
        textAlign:'center',
        color:'#0ba9f7',
    },
    input:{
        backgroundColor:'white',
        borderColor:'gray',
        borderWidth:1,
        borderRadius:10,
        height:40,
        width:'100%',
        paddingLeft:15,
        margin:20,
        marginBottom:5,
        alignSelf:'center'
    },
    btnContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:15
    }
});