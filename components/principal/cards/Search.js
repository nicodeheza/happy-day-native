import React, {useContext, useState} from 'react'
import { View, Text, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import FormSubmitBtn from '../../home/FormSubmitBtn';
import style from './search-style';
import formStyle from './form-elements-style';
import {principalContext} from '../../../contexts';

export default function Search() {
    const {setSearchFilters, setShowCard}= useContext(principalContext);
    const[fields, setFields]= useState({
        from:'',
        to:'',
        name: '',
        type: 'any'
    });
    const[message, setMessage]=useState('');
    
    const searchEvent= ()=>{
        if(!/\d\d\/\d\d/.test(fields.from) && !/\d\d\/\d\d/.test(fields.to) &&  fields.from && fields.to ){
            setMessage("From and to expects mm/dd format");
        }else if(!/\d\d\/\d\d/.test(fields.from) && fields.from && !fields.to){
            setMessage("From expects mm/dd format");
        }else if(!/\d\d\/\d\d/.test(fields.to) && fields.to && !fields.from){
            setMessage("To expects mm/dd format");
        }else{
        setMessage('');
        setSearchFilters(fields);
        setShowCard('none');
        setFields({
            from:'',
            to:'',
            name: '',
            type: 'any'
        });
    }
    }
    return (
        <View>
            <View style={[style.container, style.labelMargin]}>
                <View style={style.container}>
                    <Text style={[formStyle.labels]}>From</Text>
                    <TextInput 
                    placeholder="mm/dd"
                    style={[formStyle.input, style.formToInputs]}
                    value={fields.from}
                    onChangeText={(text)=> setFields({...fields, from: text})}
                    />
                </View>
                <View style={style.container}>
                    <Text style={[formStyle.labels]}>To</Text>
                    <TextInput 
                    placeholder="mm/dd"
                    style={[formStyle.input, style.formToInputs]}
                    value={fields.to}
                    onChangeText={(text)=> setFields({...fields, to: text})}
                    />
                </View>
            </View>
            <View style={[style.container, style.labelMargin]}>
                <Text style={[formStyle.labels]}>Name</Text>
                <TextInput 
                placeholder='any'
                style={[formStyle.input, style.nameInput]}
                value={fields.name}
                onChangeText={(text)=> setFields({...fields, name: text})}
                />
            </View>
            <View style={[style.container, style.labelMargin]}>
                <Text style={[formStyle.labels]}>Type</Text>
                <View  style={[formStyle.piker, style.typePicker]}>
                <Picker selectedValue={fields.type}
                onValueChange={(item, index)=> setFields({...fields, type: item})}>
                    <Picker.Item label='Any' value='any'/>
                    <Picker.Item label='Birthday' value='birthday'/>
                    <Picker.Item label='Anniversary' value='anniversary'/>
                </Picker>
                </View>
            </View>
            {
                message ?
                (<Text style={{
                    alignSelf:'center',
                    color: 'red'
                }}>{message}</Text>) : 
                (null)
            }
            <View style={style.btn}>
            <FormSubmitBtn text='Search' submit={searchEvent}/>
            </View>
        </View>
    )
}
