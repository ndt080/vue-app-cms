import firebase from "firebase/app";

export default {
    state: {
        schedule: {},
        daysSch: [
            {code: 'D1Monday', title: 'ПОНЕДЕЛЬНИК'},
            {code: 'D2Tuesday', title: 'ВТОРНИК'},
            {code: 'D3Wednesday', title: 'СРЕДА'},
            {code: 'D4Thursday', title: 'ЧЕТВЕРГ'},
            {code: 'D5Friday', title: 'ПЯТНИЦА'},
            {code: 'D6Saturday', title: 'СУББОТА'},
        ],
        schedule_next: {},
    },
    mutations: {
        setSchedule(state, schedule){
            state.schedule = schedule
        },
        setScheduleNext(state, schedule){
            state.schedule_next = schedule
        },
        clearSchedule(state){
            state.schedule = {}
            state.schedule_next = {}
        }
    },
    actions: {
        async fetchSchedule({dispatch, commit}) {
            try {
                const schedule = (await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}`).once('value')).val()
                commit('setSchedule', schedule)

                const schedule_next = (await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}_next`).once('value')).val()
                commit('setScheduleNext', schedule_next)
            } catch (e){ }
        },
        async modScheduleDate({dispatch, commit}, {dateFrom}){
            try{
                if(dateFrom){
                    let data = new Date(dateFrom);
                    let newDate = data.getDate();
                    let schNext = false;
                    let statusSch = ''
                    for(let i=0; i < this.getters.daysSch.length; i++) {
                        data.getDate();
                        await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${statusSch}/${this.getters.daysSch[i].code}/`)
                            .child('date').transaction(function () {
                                return data.toISOString().split('T')[0]
                            })
                        if (i+1 === this.getters.daysSch.length && !schNext){
                            newDate = data.getDate() + 2;
                            data.setDate(newDate);
                            schNext = true;
                            statusSch = '_next'
                            i = -1;
                        } else{
                            newDate = data.getDate() + 1;
                            data.setDate(newDate);
                        }
                    }
                    schNext = false;
                    statusSch = ''
                    if(!this.getters.schedule.title || !this.getters.schedule_next.title) {
                        for (let i = 0; i < this.getters.daysSch.length; i++) {
                            let name = this.getters.daysSch[i].title
                            await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${statusSch}/${this.getters.daysSch[i].code}/`)
                                .child('title').transaction(function () {
                                    return name
                                })
                            if (i + 1 === this.getters.daysSch.length && !schNext) {
                                schNext = true;
                                statusSch = '_next'
                                i = -1;
                            }
                        }
                    }
                }
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
        async cloneSchedule({commit}, {}){
            try{
                for(let i = 0; i < this.getters.daysSch.length; i++){
                    const lessons = (await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}/${this.getters.daysSch[i].code}/lessons/`)
                        .once('value')).val()
                    await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}_next/${this.getters.daysSch[i].code}/`)
                        .child('lessons').transaction(function () {
                            return lessons
                        }
                    )
                }
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
        async modSchedule({dispatch, commit}, {week, dateWeek, lesson, timeFrom, timeTo, subject, teachOne, teachTwo, cabOne, cabTwo, homework, colorLes}){
            try{
                if(week==='_now'){
                    week = ''
                }
                if(dateWeek && lesson && timeFrom){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week}/${dateWeek}/lessons/${lesson}`).child('time')
                    conn.transaction(function () {
                            return timeFrom
                        }
                    )
                }
                if(dateWeek && lesson && timeTo){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week}/${dateWeek}/lessons/${lesson}`).child('timeEnd')
                    conn.transaction(function () {
                            return timeTo
                        }
                    )
                }
                if(dateWeek && lesson && subject){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week}/${dateWeek}/lessons/${lesson}`).child('subj')
                    conn.transaction(function () {
                            return (subject === 'del') ? '' : subject
                        }
                    )
                }
                if(dateWeek && lesson && teachOne){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week}/${dateWeek}/lessons/${lesson}`).child('teach1')
                    conn.transaction(function () {
                            return (teachOne === 'del') ? '' : teachOne
                        }
                    )
                }
                if(dateWeek && lesson && teachTwo){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week}/${dateWeek}/lessons/${lesson}`).child('teach2')
                    conn.transaction(function () {
                            return (teachTwo === 'del') ? '' : teachTwo
                        }
                    )
                }
                if(dateWeek && lesson && cabOne){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week}/${dateWeek}/lessons/${lesson}`).child('cab1')
                    conn.transaction(function () {
                            return (cabOne === 'del') ? '' : cabOne
                        }
                    )
                }
                if(dateWeek && lesson && cabTwo){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week}/${dateWeek}/lessons/${lesson}`).child('cab2')
                    conn.transaction(function () {
                            return (cabTwo === 'del') ? '' : cabTwo
                        }
                    )
                }
                if(dateWeek && lesson && homework){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week}/${dateWeek}/lessons/${lesson}`).child('homework')
                    conn.transaction(function () {
                            return (homework === 'del') ? '' : homework
                        }
                    )
                }
                if(dateWeek && lesson && colorLes){
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week}/${dateWeek}/lessons/${lesson}`).child('color')
                    conn.transaction(function () {
                            return colorLes
                        }
                    )
                }
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
    },
    getters:{
        schedule_next: s => s.schedule_next,
        schedule: s => s.schedule,
        daysSch: s => s.daysSch
    }


}
