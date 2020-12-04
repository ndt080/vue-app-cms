import firebase from "firebase/app";

export default {
    state: {
        loading: true,
        isNullSchedule: false,
        selectedSchedule: 'actual_week',
        isQueueShow: false,
        isScrollerShow: false,
        isEditSchedule: false,
    },
    mutations: {
        setLoading(state, loading){
            state.loading = loading;
        },
        setStateSchedule(state, isNullSchedule){
            state.isNullSchedule = isNullSchedule;
        },
        setSelectedSchedule(state, selectedSchedule){
            state.selectedSchedule = selectedSchedule;
        },
        setQueueShow(state, isQueueShow){
            state.isQueueShow = isQueueShow;
        },
        setScrollerShow(state, isScrollerShow){
            state.isScrollerShow = isScrollerShow;
        },
        setEditSchedule(state, isEditSchedule){
            state.isEditSchedule = isEditSchedule;
        },
        clearScheduleСommon(state) {
            state.loading = null;
            state.isNullSchedule = null;
            state.selectedSchedule = null;
            state.isQueueShow = null;
            state.isScrollerShow = null;
            state.isEditSchedule = null;
        }
    },
    actions: {
        async refresh({commit, dispatch}){
            commit('setLoading', true);
            await dispatch('fetchSchedule');
            commit('setStateSchedule', !this.getters.schedule);
            commit('setLoading', false);
        },
    },
    getters:{
        loading: s => s.loading,
        isNullSchedule: s => s.isNullSchedule,
        selectedSchedule: s=> s.selectedSchedule,
        queueShow: s=> s.isQueueShow,
        scrollerShow: s=>s.isScrollerShow,
        editSchedule: s=>s.isEditSchedule
    },

}
