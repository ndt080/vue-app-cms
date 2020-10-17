import firebase from "firebase/app";

export default {
    state: {
        queue: {},
    },
    mutations: {
        clearQueue(state) {
            state.queue = {}
        },
        setQueueStatus(state, queue){
            state.queue = queue
        }
    },
    actions: {
        async fetchQueue({commit}){
            try{
                const queue = (await firebase.database().ref(`/queueC${this.getters.info.course}G${this.getters.info.group}`).once('value')).val()
                commit('setQueueStatus', queue)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async addQueueCard({dispatch, commit}, {subject, teacher1, teacher2}) {
            try {
                await firebase.database().ref(`/queueC${this.getters.info.course}G${this.getters.info.group}`)
                    .push({subject: subject, teacher1: teacher1, teacher2: teacher2, people: {}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async addQueuePeople({dispatch, commit}, {user, queueID, teacher}) {
            try {
                const uid = await dispatch('getUID')
                await firebase.database().ref(`/queueC${this.getters.info.course}G${this.getters.info.group}/${queueID}/people`)
                    .push({user: user, teach: teacher, userID: uid})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async delRecQueue({commit}, {queueID, recID}) {
            try {
                await firebase.database().ref(`/queueC${this.getters.info.course}G${this.getters.info.group}/${queueID}/people/${recID}`).remove()
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async removeQueue({commit}, {queueID}) {
            try {
                await firebase.database().ref(`/queueC${this.getters.info.course}G${this.getters.info.group}/${queueID}`).remove()
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    },
    getters:{
        queue: s => s.queue,
    },


}
