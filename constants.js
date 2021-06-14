import Constants from "expo-constants";
const { manifest } = Constants;

export const uri= `http://${manifest.debuggerHost.split(':').shift()}:4000`;

export const abrMonths=['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL','AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const abrMonthsCap= [ "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const monthNames=['January', 'February', 'March', 'April', 'May', 'June', 'July',
'August', 'September', 'October', 'November', 'December'];

export const monthColors= [
    '#216b8e',
    '#27a3a3',
    '#149e84',
    '#00ae4d',
    '#69d503',
    '#d6df24',
    '#edc01c',
    '#faa818',
    '#f19616',
    '#fd6126',
    '#9458a9',
    '#6258a2'
]

//export const uri= 'http://192.168.0.252:4000';