import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container:{
        flexDirection: 'row',
        flexWrap:'wrap',
        alignItems:'center',
        marginBottom: 5
    },
    eventPicker:{
        width:155
    },
    month:{
        width:100,
        marginRight:15
    },
    year:{
        width:55
    },
    day:{
        width:40,
        marginRight: 15
    },
    nameInput:{
        width:200
    },
    reminderPicker:{
        width:200,
        marginRight:10
    },
    reminderInput:{
        width:40,
        marginRight:10
    },
    remindersList:{
        marginTop:10,
        marginBottom:10,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    reminder:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:20,
        marginBottom:5
    },
    drop:{
        marginLeft:10
    },
    submit:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }
});