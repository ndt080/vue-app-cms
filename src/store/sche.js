import firebase from "firebase/app";

export default {
    state: {
        schedule: [
            {id: 1, title: 'ПОНЕДЕЛЬНИК', date: '01.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '09:45', timeEnd: '11:05', less: '', homework: '', teach: '', kab: ''},
                    {time: '11:15', timeEnd: '12:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '13:00', timeEnd: '14:20', less: '', homework: '', teach: '', kab: ''},
                ]},
            {id: 2, title: 'ВТОРНИК', date: '02.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '09:45', timeEnd: '11:05', less: '', homework: '', teach: '', kab: ''},
                    {time: '11:15', timeEnd: '12:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '13:00', timeEnd: '14:20', less: '', homework: '', teach: '', kab: ''},
                ]},
            {id: 3, title: 'СРЕДА', date: '03.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '09:45', timeEnd: '11:05', less: '', homework: '', teach: '', kab: ''},
                    {time: '11:15', timeEnd: '12:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '13:00', timeEnd: '14:20', less: '', homework: '', teach: '', kab: ''},
                ]},
            {id: 4, title: 'ЧЕТВЕРГ', date: '04.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '09:45', timeEnd: '11:05', less: '', homework: '', teach: '', kab: ''},
                    {time: '11:15', timeEnd: '12:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '13:00', timeEnd: '14:20', less: '', homework: '', teach: '', kab: ''},
                ]},
            {id: 5, title: 'ПЯТНИЦА', date: '05.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '09:45', timeEnd: '11:05', less: '', homework: '', teach: '', kab: ''},
                    {time: '11:15', timeEnd: '12:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '13:00', timeEnd: '14:20', less: '', homework: '', teach: '', kab: ''},
                ]},
            {id: 6, title: 'СУББОТА', date: '06.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '09:45', timeEnd: '11:05', less: '', homework: '', teach: '', kab: ''},
                    {time: '11:15', timeEnd: '12:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '13:00', timeEnd: '14:20', less: '', homework: '', teach: '', kab: ''},
                ]},
        ],
        schedule_next: [
            {id: 1, title: 'ПОНЕДЕЛЬНИК', date: '08.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '09:45', timeEnd: '11:05', less: '', homework: '', teach: '', kab: ''},
                    {time: '11:15', timeEnd: '12:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '13:00', timeEnd: '14:20', less: '', homework: '', teach: '', kab: ''},
                ]},
            {id: 2, title: 'ВТОРНИК', date: '09.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '09:45', timeEnd: '11:05', less: '', homework: '', teach: '', kab: ''},
                    {time: '11:15', timeEnd: '12:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '13:00', timeEnd: '14:20', less: '', homework: '', teach: '', kab: ''},
                ]},
            {id: 3, title: 'СРЕДА', date: '10.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '09:45', timeEnd: '11:05', less: '', homework: '', teach: '', kab: ''},
                    {time: '11:15', timeEnd: '12:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '13:00', timeEnd: '14:20', less: '', homework: '', teach: '', kab: ''},
                ]},
            {id: 4, title: 'ЧЕТВЕРГ', date: '11.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '09:45', timeEnd: '11:05', less: '', homework: '', teach: '', kab: ''},
                    {time: '11:15', timeEnd: '12:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '13:00', timeEnd: '14:20', less: '', homework: '', teach: '', kab: ''},
                ]},
            {id: 5, title: 'ПЯТНИЦА', date: '12.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '09:45', timeEnd: '11:05', less: '', homework: '', teach: '', kab: ''},
                    {time: '11:15', timeEnd: '12:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '13:00', timeEnd: '14:20', less: '', homework: '', teach: '', kab: ''},
                ]},
            {id: 6, title: 'СУББОТА', date: '13.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '09:45', timeEnd: '11:05', less: '', homework: '', teach: '', kab: ''},
                    {time: '11:15', timeEnd: '12:35', less: '', homework: '', teach: '', kab: ''},
                    {time: '13:00', timeEnd: '14:20', less: '', homework: '', teach: '', kab: ''},
                ]},
        ],
    },
    getters:{
        getSchedule(state) {
            return state.schedule;
        },
        getSchedule_next(state){
            return state.schedule_next;
        }
    }


}
