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
        isNewWeek: false,
        queue: {
            type: Object,
            status: Boolean,
            lesson: Number,
            teach1: String,
            teach2: String,
        },
        queueArr: []
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
            state.queue = {}
        },
        clearQueue(state) {
            state.queue = {}
            state.queueArr = []
        },
        setQueueStatus(state, queue){
            state.queue = queue
            state.queueArr.push(state.queue)
        }
    },
    actions: {
        async fetchSchedule({dispatch, commit}) {
            try {
                const schedule = (await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}`).once('value')).val()
                commit('setSchedule', schedule)

                const schedule_next = (await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}_next`).once('value')).val()
                commit('setScheduleNext', schedule_next)
                const update = (await firebase.database().ref(`/update`).once('value')).val()
               //ДЛЯ ОТЛАДКИ--
                    let date = new Date();
                    if (date.getDay() === 6 && (date.getHours() === 22) && (date.getMinutes() === 0)) {
                        await firebase.database().ref(`/update`).child('status').transaction(function () {
                            return true
                        })
                    }
                //--ДЛЯ ОТЛАДКИ)
                    if (update.status){
                        dispatch('newWeekSchedule')
                    }
            } catch (e){ }
        },
        async newWeekSchedule({dispatch}) {
            try {
                let dateFrom =  new Date();
                let tmp = dateFrom.getDate() + 2
                dateFrom.setDate(tmp);
                let i = 0
                let j = 0
                for(i=1; i <= 4; i++) {
                    for (j = 1; j <= 15; j++) {
                        try{
                            let data = (await firebase.database().ref(`/scheduleC${i}G${j}_next`).once('value')).val()
                            await firebase.database().ref(`/scheduleC${i}G${j}/`).update(data)
                            dispatch('modScheduleDate', {dateFrom, i, j})
                        }catch(e){}
                    }
                }
                await firebase.database().ref(`/update`).child('status').transaction(function () {
                    return false
                })
            } catch (e){ }
        },
        async modScheduleDate({dispatch, commit}, {dateFrom, course, group}){
            try{
                if(dateFrom){
                    let data = new Date(dateFrom);
                    let newDate = data.getDate();
                    let schNext = false;
                    let statusSch = ''
                    for(let i=0; i < this.getters.daysSch.length; i++) {
                        data.getDate();
                        await firebase.database().ref(`/scheduleC${course?course:this.getters.info.course}G${group?group:this.getters.info.group}${statusSch}/${this.getters.daysSch[i].code}/`)
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
        async modSchedule({dispatch, commit}, {week, dateWeek, lesson, timeFrom, timeTo, subject, teachOne, teachTwo, cabOne, cabTwo, homework, colorLes, queue}){
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
                if(dateWeek && lesson && queue.queueLes){
                    queue.queueLes = queue.queueLes === 'true';
                    let conn = await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week}/${dateWeek}/`).child('queue')
                    conn.transaction(function () {
                            return { status: queue.queueLes, lesson: queue.queueLes?lesson:null, teach1: queue.queueLesTeach1 , teach2: queue.queueLesTeach2}
                        }
                    )
                    if(queue.queueLes === false){
                        await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week}/${dateWeek}/lessons/${lesson}`)
                            .child('qPeople').remove()
                    }
                }
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
        async modQueue({dispatch, commit}, {user, cardID, week,  lesson, teacher}) {
            try {
                await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week?'':'_next'}/${cardID}/lessons/${lesson}`)
                    .child('qPeople').push({user: user, teach: teacher})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async delRecQueue({commit}, {cardID, week,  lesson, recID}) {
            try {
                await firebase.database().ref(`/scheduleC${this.getters.info.course}G${this.getters.info.group}${week?'':'_next'}/${cardID}/lessons/${lesson}/qPeople/${recID}`).remove()
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        fetchQueue({commit},{index, week}){
            try{
                let queue
                if(week){
                    queue = this.getters.schedule[index].queue
                }else{
                    queue = this.getters.schedule_next[index].queue
                }
                if(queue){
                    commit('setQueueStatus', queue)
                }else{
                    commit('setQueueStatus', queue = {status: false, lesson: null})
                }
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    },
    getters:{
        schedule_next: s => s.schedule_next,
        schedule: s => s.schedule,
        daysSch: s => s.daysSch,
        queueArr: s => s.queueArr,
    },


}
