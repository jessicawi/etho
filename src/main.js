import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import BootstrapVue from 'bootstrap-vue';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import "./custom.css";
import "./responsive.css";
import vbclass from 'vue-body-class';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {DataTables, DataTablesServer} from 'vue-data-tables';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import {Modal} from 'bootstrap-vue/es/components';
import VueUploadComponent from "vue-upload-component";
import Vuelidate from 'vuelidate';
import VueCharts from 'vue-chartjs';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import Cookies from "js-cookie";
import Vuex from "vuex";
import VueTour from 'vue-tour';
import VueClipboard from 'vue-clipboard2';
import XLSX from 'xlsx';

Vue.component('file-upload', VueUploadComponent);

require('vue-tour/dist/vue-tour.css');

locale.use(lang);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(DataTables);
Vue.use(DataTablesServer);
Vue.use(ElementUI);
Vue.use(Vuesax);
Vue.use(vbclass, router);
Vue.use(Modal);
Vue.use(Vuelidate);
Vue.use(VueCharts);
Vue.use(Cookies);
Vue.use(Vuex);
Vue.use(VueTour);
Vue.use(VueClipboard);
Vue.use(XLSX);
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead);
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
