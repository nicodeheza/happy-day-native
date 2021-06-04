import {StyleSheet, Dimensions} from 'react-native';
const wh= Dimensions.get('window').height;

export default StyleSheet.create({
    imgBckContainer:{
        position:'absolute',
        top:0,
        left:0,
        height:'15%', 
        flexDirection:'row', 
        alignItems:'center'
    },
    imgBckImage:{
        height:'100%',
        resizeMode: 'stretch',
    },
    logo:{
        height: "75%", 
        width: undefined,
        aspectRatio:1,
        resizeMode:'contain', 
        margin:5,
        marginBottom:10,
       // borderColor:'white',
        //borderWidth:1
    },
    monthBtnPress:{
        height: '100%'
    },
    monthBtnContainer:{
        height:'70%',
        aspectRatio:1 ,
        marginRight:10,
        marginTop:10,
        justifyContent:'center', 
        alignItems:'center',
        borderRadius:50,
        borderWidth:2,   
    },
    btnText:{
        fontFamily:'FredokaOne_400Regular',
        fontSize:wh > 1000 ? 22 :  15
    }
});