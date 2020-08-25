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
        async logout (){
            await firebase.auth().signOut()
            localStorage.removeItem('userAuth')
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
        },
        async editCard({dispatch, commit}, {schedule, schedule_next}){
            try{
                await firebase.database().ref(`/schedule`).set({
                    now: schedule,
                    next: schedule_next
                })
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
    }
}
