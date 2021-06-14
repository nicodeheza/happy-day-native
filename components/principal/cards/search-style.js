import {StyleSheet, Dimensions} from 'react-native';
const vw= Dimensions.get('window').width;

export default StyleSheet.create({
    formToInputs:{
        width: vw < 400 ? 70 : 80,
        marginRight:15
    },
    container:{
        flexDirection:'row',
    },
    nameInput:{
        width: vw < 400 ? 150 : 200
    },
    typePicker:{
        width:155
    },
    labelMargin:{
        marginBottom:10
    },
    btn:{
        alignSelf:'center'
    }
});