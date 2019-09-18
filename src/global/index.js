import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false,
        portfolioID: "",
        eventID:""
    },
    mutations: {
        setLoading(state, boolean) {
            state.isLoading = boolean;
        },
        setPortfolioID(state, ID) {
            state.portfolioID = ID;
        },
        setEventID(state, data) {
            state.eventID = data;
        }
    },
});