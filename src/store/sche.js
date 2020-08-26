import firebase from "firebase/app";

export default {
    state: {
        schedule: {},
        schedule_next: [
            {id: 1, title: 'ПОНЕДЕЛЬНИК', date: '08.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '09:45', timeEnd: '11:05', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '11:15', timeEnd: '12:35', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '13:00', timeEnd: '14:20', subj: '--', homework: '--', teach: '--', cab: '--'},
                ]},
            {id: 2, title: 'ВТОРНИК', date: '09.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '09:45', timeEnd: '11:05', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '11:15', timeEnd: '12:35', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '13:00', timeEnd: '14:20', subj: '--', homework: '--', teach: '--', cab: '--'},
                ]},
            {id: 3, title: 'СРЕДА', date: '10.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '09:45', timeEnd: '11:05', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '11:15', timeEnd: '12:35', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '13:00', timeEnd: '14:20', subj: '--', homework: '--', teach: '--', cab: '--'},
                ]},
            {id: 4, title: 'ЧЕТВЕРГ', date: '11.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '09:45', timeEnd: '11:05', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '11:15', timeEnd: '12:35', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '13:00', timeEnd: '14:20', subj: '--', homework: '--', teach: '--', cab: '--'},
                ]},
            {id: 5, title: 'ПЯТНИЦА', date: '12.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '09:45', timeEnd: '11:05', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '11:15', timeEnd: '12:35', subj: '--', homework: '--', teach: '--', cab: '--'},
                    {time: '13:00', timeEnd: '14:20', subj: '--', homework: '--', teach: '--', cab: '--'},
                ]},
            {id: 6, title: 'СУББОТА', date: '13.09', lessons: [
                    {time: '08:15', timeEnd: '09:35', subj: '--', homework: '--', teach: '', cab: '--'},
                    {time: '09:45', timeEnd: '11:05', subj: '--', homework: '--', teach: '', cab: '--'},
                    {time: '11:15', timeEnd: '12:35', subj: '--', homework: '--', teach: '', cab: '--'},
                    {time: '13:00', timeEnd: '14:20', subj: '--', homework: '--', teach: '', cab: '--'},
                ]},
        ],
    },
    mutations: {
        setSchedule(state, schedule){
            state.schedule = schedule
        },
        clearSchedule(state){
            state.schedule = {}
        }
    },
    actions: {
        async fetchSchedule({dispatch, commit}) {
            try {
                const schedule = (await firebase.database().ref(`/schedule`).once('value')).val()
                commit('setSchedule', schedule)
            } catch (e){

            }

        }
    },
    getters:{
        getSchedule_next(state){
            return state.schedule_next;
        },
        schedule: s => s.schedule
    }


}
