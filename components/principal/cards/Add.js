import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Image, Dimensions, Pressable } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {abrMonthsCap, uri} from '../../../constants';
import Btn from './Btn';
import formStyle from './form-elements-style';
import style from './add-style';
import {authContext, principalContext} from '../../../contexts';

const vh= Dimensions.get('window').height;

export default function Add() {
    const setAuth= useContext(authContext);
    const {setMessage, setUpdateCalendar, setShowCard}= useContext(principalContext);
    const [formMessage, setFormMessage]= useState('');
    const [formFields, setFormFields]= useState({
        event:'birthday',
        type:'',
        day:'',
        month:abrMonthsCap[0],
        year:'',
        personName:'',
        reminders:[{title:'The Same Day', date:''}]
    });
    const[reminder, setReminder]= useState({
        timeBefore:'same-day',
        numBefore:''
    });

    const addReminder=()=>{

        let newReminder={
          title:'',
          date:'',
        }
        switch (reminder.timeBefore) {
          case 'same-day':
            newReminder.title= 'The Same Day';
            break;
          case 'days-before':
            newReminder.title= `${!reminder.numBefore ? '1' : reminder.numBefore} Days Before`;
            break;
          case 'weeks-before':
            newReminder.title= `${!reminder.numBefore ? '1' : reminder.numBefore} Weeks Before`
            break; 
        
          default:
            break;
        }
    
        let remindersArr= formFields.reminders;
        remindersArr.push(newReminder);
    
        setFormFields({...formFields, reminders: remindersArr});
      }

      const removeReminder=(i)=>{
        let remindersArr= formFields.reminders
        remindersArr.splice(i, 1);
    
        setFormFields({...formFields, reminders:remindersArr}); 
      }

      const submit=()=>{
          if(!formFields.day || !formFields.personName){
                setFormMessage('Day and Name are Require');
          }else if(parseInt(formFields.day) > 31 || parseInt(formFields.day) < 1){
              setFormMessage('Day Must be a Valid Date');
          }else{
        setMessage("Adding...");
        let submitForm={
          event:formFields.event,
          type: formFields.type,
          date: new Date(`${formFields.month} ${formFields.day} ${formFields.year === '' ? '9999' : formFields.year}`),
          personName: formFields.personName,
          reminders:[]
        }
    
        const submitReminders= formFields.reminders.map((ele)=>{
          let eleR={title: ele.title};
          if(ele.title === 'The Same Day'){
            eleR.date= submitForm.date;
          }else{
            const dateSub= ele.title.split(' ',2);
            let dateInMs= submitForm.date.getTime();
            const oneDay=1000*60*60*24;
            const oneWeek= oneDay * 7;
            if(dateSub[1]==='Days'){
              eleR.date= new Date(dateInMs - oneDay * dateSub[0]);
            }else{
              eleR.date= new Date(dateInMs - oneWeek * dateSub[0]);
            }
          }
          return eleR;
        });
    
        submitForm ={...submitForm, reminders: submitReminders};
    
        fetch(`${uri}/api/add`,{
                    method:'POST',
                    body: JSON.stringify(submitForm),
                    headers:{"Content-type": "application/json; charset=UTF-8"},
                })
                .then(res=> res.json())
                .then(data=>{
                  if(data.auth === false){
                    setAuth(data.auth);
                  }else{
                   // console.log('fetch add.js')
                    setMessage(data.message);
                    setUpdateCalendar(true);
                  }
                  })
                .catch(err => console.log(err));
                
                setShowCard('none');
                setFormMessage('');
                setFormFields({
                  event:'birthday',
                  type:'',
                  day:'',
                  month:abrMonthsCap[0],
                  year:'',
                  personName:'',
                  reminders:[{title:'The Same Day', date:''}]
                });
            }
      }
    
    

    return (
        <View>
            <View style={style.container}>
                <Text style={formStyle.labels}>Event</Text>
                <View style={[formStyle.piker, style.eventPicker]}>
                    <Picker selectedValue={formFields.event}
                    onValueChange={(item, index)=> setFormFields({...formFields, event: item})}>
                        <Picker.Item label='Birthday' value='birthday'/>
                        <Picker.Item label='Anniversary' value='anniversary'/>
                    </Picker>
                </View>
            </View>
            {
              formFields.event === 'anniversary' ? 
              (
                <View style={style.container}>
                  <Text style={formStyle.labels}>Type</Text>
                  <TextInput style={[formStyle.input, {width: '80%'}]}
                  value={formFields.type}
                  onChangeText={(text)=> setFormFields({...formFields, type: text})}
                  />
                </View>
              ): null
            }

            <View style={style.container}>
                <View style={style.container}>
                    <Text style={formStyle.labels}>Day</Text>
                    <TextInput style={[formStyle.input, style.day]} keyboardType='numeric'
                    value={formFields.day}
                    onChangeText={(text)=>!/[-,.\s]/.test(text) ? setFormFields({...formFields, day: text}) : null} />
                </View>
                <View style={style.container}>
                    <Text style={formStyle.labels}>Month</Text>
                    <View style={[formStyle.piker, style.month]}>
                        <Picker selectedValue={formFields.month}
                        onValueChange={(item, index)=> setFormFields({...formFields, month: item})}>
                            {
                                abrMonthsCap.map((month, index)=>(
                                    <Picker.Item label={month} value={month} key={index}/>
                                ))
                            }
                        </Picker>
                    </View>
                </View>
                <View style={style.container}>
                    <Text style={formStyle.labels}>Year</Text>
                    <TextInput style={[formStyle.input, style.year]} placeholder='any' keyboardType='numeric'
                    value={formFields.year} 
                    onChangeText={(text)=>!/[-,.\s]/.test(text) ? setFormFields({...formFields, year: text}) : null}/>
                </View>
            </View>

            <View style={style.container}>
                <Text style={formStyle.labels}>Name</Text>
                <TextInput style={[formStyle.input, style.nameInput]} 
                value={formFields.personName} onChangeText={(text)=> setFormFields({...formFields, personName: text})}/>
            </View>

            <View>
                <View style={style.container}>
                <Text style={formStyle.labels}>Add Reminders</Text>
                <View style={[formStyle.piker, style.reminderPicker]}>
                    <Picker selectedValue={reminder.timeBefore}
                    onValueChange={(item, index)=>  setReminder({...reminder, timeBefore:item})}>
                        <Picker.Item value='same-day' label='The Same Day' />
                        <Picker.Item value='days-before' label='Days Before' />
                        <Picker.Item value='weeks-before' label='Weeks Before' />
                    </Picker>
                </View>
                {
                    reminder.timeBefore !== 'same-day' ?
                    (
                        <TextInput style={[formStyle.input, style.reminderInput]} keyboardType='numeric' 
                        value={reminder.numBefore}
                         onChangeText={(text)=> !/[-,.\s]/.test(text) ? setReminder({...reminder, numBefore: text}) : null}/>
                    ) : (null)
                }
                <View>
                    <Btn text='Add' width={vh < 700 ? 30 : 50} height={vh < 700 ? 20 : 25} submit={addReminder}/>
                </View>
                </View>
                <View>
                    <View style={style.remindersList}>
                        {
                            formFields.reminders.map((ele, index)=>{
                                return (
                        <View style={style.reminder} key={index} >
                        <Text>{ele.title}</Text>
                        <Pressable onPress={()=> removeReminder(index)}>
                        <Image source={require('../../../assets/img/drop.png')} 
                         style={style.drop}/>
                         </Pressable>
                        </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
            {
                formMessage ? 
                (<Text style={{
                    color:'red',
                    alignSelf:'center'
                }}>{formMessage}</Text>):
                (null)
            }

            <View style={style.submit}>
                <Btn text='Add Event' width={150} height={vh < 700 ? 30 : 50} submit={submit}/>
            </View>

        </View>
    )
}
