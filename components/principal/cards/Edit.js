import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Image, Dimensions, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { abrMonthsCap, uri } from "../../../constants";
import Btn from "./Btn";
import formStyle from "./form-elements-style";
import style from "./edit-style";
import DropBtn from "./DropBtn";
import { authContext, principalContext } from "../../../contexts";

const vw = Dimensions.get("window").width;

export default function Edit() {
  const setAuth = useContext(authContext);
  const { setUpdateCalendar, edit, showCard, setShowCard, setMessage } = useContext(principalContext);
  const [formMessage, setFormMessage]= useState('');
  const [formFields, setFormFields] = useState({
    event: edit.type,
    type: edit.AnniversaryType,
    day: new Date(edit.date).getDate().toString(),
    month: abrMonthsCap[new Date(edit.date).getMonth()],
    year:
      new Date(edit.date).getFullYear() > 9000
        ? ""
        : new Date(edit.date).getFullYear().toString(),
    personName: edit.personName,
    reminders: edit.reminders,
  });

  //add info in fields
  useEffect(() => {
    setFormFields({
      event: edit.type,
      type: edit.AnniversaryType,
      day: new Date(edit.date).getDate().toString(),
      month: abrMonthsCap[new Date(edit.date).getMonth()],
      year:
        new Date(edit.date).getFullYear() > 9000
          ? ""
          : new Date(edit.date).getFullYear().toString(),
      personName: edit.personName,
      reminders: edit.reminders,
    });
  }, [edit, showCard]);

  const[reminder, setReminder]= useState({
    timeBefore:'same-day',
    numBefore:''
  });

  const addReminder=(e)=>{

    let newReminder={
      name:'',
      date:'',
    }

    switch (reminder.timeBefore) {
      case 'same-day':
        newReminder.name= 'The Same Day';
        break;
      case 'days-before':
        newReminder.name= `${reminder.numBefore} Days Before`;
        break;
      case 'weeks-before':
        newReminder.name= `${reminder.numBefore} Weeks Before`
        break; 
    
      default:
        break;
    }

    let remindersArr= [...formFields.reminders];
    remindersArr.push(newReminder);

    setFormFields({...formFields, reminders: remindersArr});
  }

  const removeReminder=(i)=>{
    let remindersArr= [...formFields.reminders];
    let ele= remindersArr.splice(i, 1);
    if(formFields.removeReminders){
      let rr=formFields.removeReminders;
      rr.push(ele[0]._id);
      setFormFields({...formFields, reminders:remindersArr, removeReminders: rr});
    }else{
      setFormFields({...formFields, reminders:remindersArr, removeReminders: [ele[0]._id]});
    }
  }

  const submit=()=>{
    if(!formFields.day || !formFields.personName){
        setFormMessage('Day and Name are Require');
  }else if(parseInt(formFields.day) > 31 || parseInt(formFields.day) < 1){
      setFormMessage('Day Must be a Valid Date');
  }else{
     setMessage("Editing...");
    let submitForm={
      event:formFields.event,
      type: formFields.event === "birthday"? '' : formFields.type,
      date: new Date(`${formFields.month} ${formFields.day} ${formFields.year === '' ? '9999' : formFields.year}`),
      personName: formFields.personName,
      reminders:[],
      removeReminders: formFields.removeReminders ? formFields.removeReminders : [],
      _id: edit._id
    }

    const submitReminders= formFields.reminders.map((ele)=>{
  
      let eleR={name: ele.name,
        event: edit._id,
        date: ele.date ? ele.date : null,
        _id: ele._id ? ele._id : null
      };
      if(! eleR.date){
        if(ele.name === 'The Same Day'){
          eleR.date= submitForm.date;
        }else{
          const dateSub= ele.name.split(' ',2);
          let dateInMs= submitForm.date.getTime();
          const oneDay=1000*60*60*24;
          const oneWeek= oneDay * 7;
          if(dateSub[1]==='Days'){
            eleR.date= new Date(dateInMs - oneDay * dateSub[0]);
          }else{
            eleR.date= new Date(dateInMs - oneWeek * dateSub[0]);
          }
        }
      }
      return eleR;
    });

    submitForm ={...submitForm, reminders: submitReminders};

    fetch(`${uri}/api/edit`,{
                method:'PUT',
                body: JSON.stringify(submitForm),
                headers:{"Content-type": "application/json; charset=UTF-8"},
            })
            .then(res=> res.json())
            .then(data=>{
              if(data.auth === false){
                setAuth(data.auth);
              }else{
                setMessage(data.message);
                if(data.message ==="Event Edited"){
                  setUpdateCalendar(true);
                }
              }
                //console.log("fetch edit.js edit");
              })
            .catch(err => console.log(err));

            setShowCard('none');
  }
  }

  const deleteEvent=(e)=>{

    setMessage("Deleting...");
    //console.log('delete');
    const eventToDelete={
      eventId: edit._id,
      remindersId:[]
  }

  edit.reminders.forEach(ele=>{
    eventToDelete.remindersId.push(ele._id);
  });

  fetch(`${uri}/api/delete`,{
    method:'DELETE',
    body: JSON.stringify(eventToDelete),
    headers:{"Content-type": "application/json; charset=UTF-8"},
  })
  .then(res=> res.json())
  .then(data=>{
    if(data.auth === false){
      setAuth(data.auth);
    }else{
      setMessage(data.message);
      setUpdateCalendar(true);
    }
    console.log("fetch edit.js delete");
    
    })
  .catch(err => console.log(err));  
  setShowCard('none');

  } 

  return (
    <View>
      <View style={style.container}>
        <Text style={formStyle.labels}>Event</Text>
        <View style={[formStyle.piker, style.eventPicker]}>
          <Picker
            selectedValue={formFields.event}
            onValueChange={(item, index) => setFormFields({...formFields, event: item})}
          >
            <Picker.Item label="Birthday" value="birthday" />
            <Picker.Item label="Anniversary" value="anniversary" />
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
          <TextInput
            style={[formStyle.input, style.day]}
            keyboardType="numeric"
            value={formFields.day}
            onChangeText={(text)=>!/[-,.\s]/.test(text) ? setFormFields({...formFields, day:text}) : null}
          />
        </View>
        <View style={style.container}>
          <Text style={formStyle.labels}>Month</Text>
          <View style={[formStyle.piker, style.month]}>
            <Picker
              selectedValue={formFields.month}
              onValueChange={(item, index) => setFormFields({...formFields, month: item})}
            >
              {abrMonthsCap.map((month, index) => (
                <Picker.Item label={month} value={month} key={index} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={style.container}>
          <Text style={formStyle.labels}>Year</Text>
          <TextInput
            style={[formStyle.input, style.year]}
            placeholder="any"
            keyboardType="numeric"
            value={formFields.year}
            onChangeText={(text)=>!/[-,.\s]/.test(text) ? setFormFields({...formFields, year:text}) : null}
          />
        </View>
      </View>

      <View style={style.container}>
        <Text style={formStyle.labels}>Name</Text>
        <TextInput style={[formStyle.input, style.nameInput]} 
        value={formFields.personName}
        onChangeText={(text)=>setFormFields({...formFields, personName: text})}
        />
      </View>

      <View>
        <View style={style.container}>
          <Text style={formStyle.labels}>Add Reminders</Text>
          <View style={[formStyle.piker, style.reminderPicker]}>
            <Picker
              selectedValue={reminder.timeBefore}
              onValueChange={(item, index) => setReminder({...reminder, timeBefore: item})}
            >
              <Picker.Item value="same-day" label="The Same Day" />
              <Picker.Item value="days-before" label="Days Before" />
              <Picker.Item value="weeks-before" label="Weeks Before" />
            </Picker>
          </View>
          {reminder.timeBefore !== "same-day" ? (
            <TextInput
              style={[formStyle.input, style.reminderInput]}
              keyboardType="numeric"
              value={reminder.numBefore}
              onChangeText={(text)=> !/[-,.\s]/.test(text) ? setReminder({...reminder, numBefore: text}) : null}
            />
          ) : null}
          <View>
            <Btn text="Add" width={50} height={25} submit={addReminder} />
          </View>
        </View>
        <View>
          <View style={style.remindersList}>
              {
                  formFields.reminders.map((ele, index)=>{
                      return (
            <View style={style.reminder} key={index}>
              <Text>{ele.name}</Text>
              <Pressable onPress={()=>removeReminder(index)}>
              <Image
                source={require("../../../assets/img/drop.png")}
                style={style.drop}
              />
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
        <View style={{ marginRight: 10 }}>
          <Btn
            text="Edit Event"
            width={vw < 400 ? 100 : 150}
            height={vw < 400 ? 30 : 50}
            submit={submit}
          />
        </View>
        <DropBtn width={vw < 400 ? 100 : 150} height={vw < 400 ? 30 : 50} submit={deleteEvent}/>
      </View>
    </View>
  );
}
