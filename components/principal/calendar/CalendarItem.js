import React from 'react';
import { View, Text, Pressable } from 'react-native';
import style from './calendarItem-style';

export default function CalendarItem({month, color, monthData ,index, length, selectEvent, selectEdit}) {


    const getAge=(date)=>{
        const ageInMs= Date.now() - new Date(date).getTime();
        const ageInYears= Math.floor(ageInMs / (1000*60*60*24*365));
        if(ageInYears > 0){
            return `(${ageInYears} years)`;
        }else{
            return '';
        }
    }


    return (
        <View style={[style.mainContainer, {marginTop: index === 0 ? "30%" : 0,
        marginBottom: index + 1 === length ? '25%' : 20}]}>
            <View style={[{backgroundColor: color}, style.titleContainer]}>
                <Text style={style.title}>{month}</Text>
            </View>
            {
                Object.keys(monthData).map((day, i)=>{
                    return(
                        <View key={i}>
                        <View style={style.dayContainer} >
                            <View style={style.numContainer}>
                            <Text style={[style.dayNumber, {color:color}]} >{day}</Text>
                            </View>
                            <View style={style.eventSuperContainer}>
                                {
                                    monthData[day].map((event, j)=>{
                                        return (
                                            <Pressable key={j} style={[style.eventContainer,
                                            {backgroundColor: event._id === selectEvent ? 'white' : null}]}
                                            onPress={()=>selectEdit(event._id, event)}
                                            >
                                                <Text style={style.dayText}>
                                                    {
                                                    event.AnniversaryType ?
                                                    `${event.personName} ${event.AnniversaryType} ${event.type} ${getAge(event.date)}`
                                                    :
                                                    `${event.personName} ${event.type} ${getAge(event.date)}`
                                                    }
                                                </Text>
                                            </Pressable>
                                        )
                                    })
                                }
                            </View>
                        </View>
                            <View style={style.divisor} />
                        </View>
                    )
                })
            }
        </View>
    )
}
