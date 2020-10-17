import firebase from "firebase/app";
export default {
    state: {
        info: {},
        UID: {},
    },
    mutations: {
        setInfo(state, info){
            state.info = info
        },
        setUID(state, UID){
            state.UID = UID
        },
        clearInfo(state){
            state.info = {}
            state.UID = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUID')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
                commit('setUID', uid)
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
        info: s => s.info,
        UID: s => s.UID
    }
}
