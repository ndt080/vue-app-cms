import firebase from "firebase/app";

export default {
    state: {
        schedule: {},
        daysSch: [
            'D1Monday',
            'D2Tuesday',
            'D3Wednesday',
            'D4Thursday',
            'D5Friday',
            'D6Saturday'
        ],
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
                const schedule = (await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}`).once('value')).val()
                commit('setSchedule', schedule)
            } catch (e){

            }

        },
        async modScheduleDate({dispatch, commit}, {dateFrom}){
            try{
                if(dateFrom){
                    let tmpD = new Date(dateFrom)
                    for(let i=0; i <= this.getters.daysSch.length-1; i++) {
                        let tmp = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}/${this.getters.daysSch[i]}/`).child('date')
                        tmp.transaction(function (data) {
                                return data = dateFrom
                            }
                        )
                        console.log('#1:' + tmpD)
                        console.log('#2:' + dateFrom)
                    }
                }
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
    },
    getters:{
        getSchedule_next(state){
            return state.schedule_next;
        },
        schedule: s => s.schedule,
        daysSch: s => s.daysSch
    }


}
