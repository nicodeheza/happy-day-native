import {StyleSheet, Dimensions} from 'react-native';
const vh= Dimensions.get('window').height;

export default StyleSheet.create({
    card:{
        backgroundColor:'#eaeaea',
        position:'absolute',
        bottom:0,
        width:'90%',
        maxWidth: 500,
        alignSelf:'center',
        paddingBottom: vh < 700 ? '20%' : vh > 1000 ? '20%' : '30%',
        padding:30,
        borderTopRightRadius: 30,
        borderTopLeftRadius:30,
        elevation:10
    },
    title:{
        fontFamily:'FredokaOne_400Regular',
        color:'#6700b7',
        fontSize:30
    },
    header:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:15,
    }
});