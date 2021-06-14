import {StyleSheet, Dimensions} from 'react-native';
const vw= Dimensions.get('window').width;

export default StyleSheet.create({
    mainContainer:{
        backgroundColor: '#eaeaea',
        width:'90%',
        maxWidth: 600,
        alignSelf:'center',
        borderRadius:20,
        elevation:10,
    },
    titleContainer:{
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: 50,
        justifyContent:'center',
        paddingLeft:10
    },
    title:{
        color:'white',
        fontFamily: 'FredokaOne_400Regular',
        fontSize:25
    },
    numContainer:{
        width: '20%',
        alignItems:'center'
    },
    dayNumber:{
        fontFamily:'FredokaOne_400Regular',
        fontSize: vw < 400 ? 30 : 40,
        marginLeft: 10,
    },
    dayContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    
    },
    dayText:{
        textTransform:'capitalize',
        fontSize:15,
        color:'#6700b7',
        marginLeft:5
    },
    eventSuperContainer:{
        width: '100%',
        paddingTop:5,
        paddingBottom:5,

    },
    eventContainer:{
        borderColor: 'white',
        borderWidth:2,
        borderRadius:20,
        padding:5,
        margin: 5,
        width: '75%'
    },
    divisor:{
        width:'90%',
        height: 1,
        borderColor: 'white',
        borderWidth: 1,
        alignSelf: 'center'
    }
});