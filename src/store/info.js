import firebase from "firebase/app";
export default {
    state: {
        info: {},
    },
    mutations: {
        setInfo(state, info){
            state.info = info
        },
        clearInfo(state){
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUID')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
            } catch (e){
            }
        },
        async modProfile({dispatch, commit}, {username, dateBirth, course, group, ava}){
            try{
                const uid = await dispatch ('getUID')
                if(username){
                   let tmp = await firebase.database().ref(`/users/${uid}/info`).child('username')
                    tmp.transaction(function(data) {
                            return data = username
                        }
                    )
                }
                if(dateBirth){
                    let tmp = await firebase.database().ref(`/users/${uid}/info`).child('dateBirth')
                    tmp.transaction(function(data) {
                            return data = dateBirth
                        }
                    )
                }
                if(course){
                    let tmp = await firebase.database().ref(`/users/${uid}/info`).child('course')
                    tmp.transaction(function(data) {
                            return data = course
                        }
                    )
                }
                if(group){
                    let tmp = await firebase.database().ref(`/users/${uid}/info`).child('group')
                    tmp.transaction(function(data) {
                            return data = group
                        }
                    )
                }
                if(ava){
                    let tmp = await firebase.database().ref(`/users/${uid}/info`).child('ava')
                    tmp.transaction(function(data) {
                            return data = ava
                        }
                    )
                }
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
    },
    getters: {
        info: s => s.info
    }
}
