import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false,
        portfolioID: "",
        HoverChartBG:['rgba(255, 99, 132,1)','rgba(0, 123, 255,1)','rgba(255, 193, 7,1)','rgba(23, 162, 184,1)','rgba(0, 186, 255,1)','rgba(97,47,225,1)','rgba(161,167,178,1)','rgba(255,151,19,1)','rgba(0,230,250,1)','rgba(129,146,186,1)','rgba(255,146,144,1)','rgba(206,175,255,1)','rgba(124,224,204,1)','rgba(124,168,242,1)','rgba(88,120,246,1)','rgba(8,182,129,1)','rgba(255,217,116,1)','rgba(119,79,144,1)','rgba(237,99,112,1)','rgba(255,159,36,1)','rgba(0,182,41,1)','rgba(49,46,216,1)'],
        ChartBG:['rgba(255, 99, 132,0.6)','rgba(0, 123, 255,0.6)','rgba(255, 193, 7,0.6)','rgba(23, 162, 184,0.6)','rgba(0, 186, 255,0.6)','rgba(97,47,225,0.6)','rgba(161,167,178,0.6)','rgba(255,151,19,0.6)','rgba(0,230,250,0.6)','rgba(129,146,186,0.6)','rgba(255,146,144,0.6)','rgba(206,175,255,0.6)','rgba(124,224,204,0.6)','rgba(124,168,242,0.6)','rgba(88,120,246,0.6)','rgba(8,182,129,0.6)','rgba(255,217,116,0.6)','rgba(119,79,144,0.6)','rgba(237,99,112,0.6)','rgba(255,159,36,0.6)','rgba(0,182,41,0.6)','rgba(49,46,216,0.6)']
    },
    mutations: {
        setLoading(state, boolean) {
            state.isLoading = boolean;
        },
        setPortfolioID(state, ID) {
            state.portfolioID = ID;
        }
    },
});

