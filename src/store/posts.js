import firebase from "firebase/app";

export default {
    state: {
        postsUpdate: {},
        postsSchedule: {},
    },
    mutations: {
        setPostsUpdate(state, postsUpdate){
            state.postsUpdate =  postsUpdate.reverse()
        },
        setPostsSchedule(state, postsSchedule){
            state.postsSchedule = postsSchedule
        },
    },
    actions: {
        async fetchPostsUpdate({commit}) {
            try {
                let posts = (await firebase.database().ref(`/update/posts/`).once('value')).val()
                commit('setPostsUpdate', Object.values(posts))
            } catch (e){
            }
        },
        async addPostsUpdate({dispatch, commit}, {title, post}){
            try{
                const uid = await dispatch ('getUID');
                let tmp = new Date();
                let datePost = tmp.toISOString().split('T')[0]+" "+tmp.getHours()+":"+tmp.getMinutes();
                await firebase.database().ref(`/update/posts/`).push({
                    userID: uid,
                    date: datePost,
                    title: title,
                    text: post
                })
            }catch (e){
                commit('setError', e)
                throw e
            }
        },
    },
    getters: {
        postsUpdate: s => s.postsUpdate,
    }
}
