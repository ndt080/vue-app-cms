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
        schedule_next: [],
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
                    let data = new Date(dateFrom)
                    let newDate = data.getDate()
                    for(let i=0; i <= this.getters.daysSch.length-1; i++) {
                        let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}/${this.getters.daysSch[i]}/`).child('date')
                        await conn.transaction(function () {
                                return data.toISOString().split('T')[0]
                            }
                        )
                        newDate++
                        data.setDate(newDate)
                    }
                }
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
        async modSchedule({dispatch, commit}, {dateWeek, lesson, timeFrom, timeTo, subject, teachOne, teachTwo, cabOne, cabTwo, homework}){
            try{
                if(dateWeek && lesson && timeFrom){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}/${dateWeek}/lessons/${lesson}`).child('time')
                    conn.transaction(function () {
                            return timeFrom
                        }
                    )
                }
                if(dateWeek && lesson && timeTo){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}/${dateWeek}/lessons/${lesson}`).child('timeEnd')
                    conn.transaction(function () {
                            return timeTo
                        }
                    )
                }
                if(dateWeek && lesson && subject){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}/${dateWeek}/lessons/${lesson}`).child('subj')
                    conn.transaction(function () {
                            return (subject === 'del') ? '' : subject
                        }
                    )
                }
                if(dateWeek && lesson && teachOne){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}/${dateWeek}/lessons/${lesson}`).child('teach1')
                    conn.transaction(function () {
                            return (teachOne === 'del') ? '' : teachOne
                        }
                    )
                }
                if(dateWeek && lesson && teachTwo){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}/${dateWeek}/lessons/${lesson}`).child('teach2')
                    conn.transaction(function () {
                            return (teachTwo === 'del') ? '' : teachTwo
                        }
                    )
                }
                if(dateWeek && lesson && cabOne){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}/${dateWeek}/lessons/${lesson}`).child('cab1')
                    conn.transaction(function () {
                            return (cabOne === 'del') ? '' : cabOne
                        }
                    )
                }
                if(dateWeek && lesson && cabTwo){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}/${dateWeek}/lessons/${lesson}`).child('cab2')
                    conn.transaction(function () {
                            return (cabTwo === 'del') ? '' : cabTwo
                        }
                    )
                }
                if(dateWeek && lesson && homework){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}/${dateWeek}/lessons/${lesson}`).child('homework')
                    conn.transaction(function () {
                            return (homework === 'del') ? '' : homework
                        }
                    )
                }
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
        dataTransaction(conn, data){
            return conn.transaction(function () {
                    return data.toISOString().split('T')[0]
                }
            )
        }
    },
    getters:{
        getSchedule_next(state){
            return state.schedule_next;
        },
        schedule: s => s.schedule,
        daysSch: s => s.daysSch
    }


}
