import firebase from "firebase/app";
export default {
    actions: {
        async login ({dispatch, commit}, {email, password}) {
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
                localStorage.setItem('userAuth', 'yes');
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
        async logout ({commit}){
            await firebase.auth().signOut()
            localStorage.removeItem('userAuth')
            commit('clearInfo')
            commit('clearSchedule')
        },
        async register({dispatch, commit}, {username, dateBirth, course, group, email, password}){
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch ('getUID')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    username: username,
                    dateBirth: dateBirth,
                    course: course,
                    group: group,
                    status: 'user'
                })
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
        getUID(){
            const user = firebase.auth().currentUser;
            return user ? user.uid : null
        }
    }
}
