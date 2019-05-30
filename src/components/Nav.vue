<template>
    <div class="row nabarx topbar">
        <div class="col-md-12 col-lg-4 text-left">
            <a href="/"> <img src="../assets/kagami-white.png"/></a>
            {{$route.name}}
        </div>
        <div class="col-md-12 col-lg-8 info-menu">
            <!--<div class="input-group search" v-if="!isMobile()">-->
                <!--<input type="text" class="form-control" placeholder="Search for...">-->
                <!--<span class="input-group-btn">-->
                    <!--<button class="btn btn-default" type="button"><i class="fa fa-search"-->
                                                                     <!--aria-hidden="true"></i></button>-->
                <!--</span>-->
            <!--</div>-->
            <!-- /input-group -->
            <!--<li class="info-menu__item">-->
            <!--<a href="#">-->
            <!--<i class="fa fa-commenting" aria-hidden="true"></i>-->
            <!--<span>Feedback</span>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li class="info-menu__item">-->
            <!--<a href="#">-->
            <!--<i class="fa fa-code-fork" aria-hidden="true"></i>-->
            <!--<span>Timeline</span>-->
            <!--</a>-->
            <!--</li>-->
            <!--<li class="info-menu__item">-->
            <!--<a href="#">-->
            <!--<i class="fa fa-calendar" aria-hidden="true"></i>-->
            <!--<span>Calendar</span>-->
            <!--</a>-->
            <!--</li>-->
            <li class="info-menu__item">
                <!--<a class="a-icon" href="#" @click="showSchoolList()">-->
                <!--<i class="fa fa-university" aria-hidden="true"></i>-->
                <!--<span>School List</span>-->
                <!--</a>-->
                <el-dropdown trigger="click">
                    <a class="el-dropdown-link">
                        <i class="fa fa-university" aria-hidden="true"></i>
                        <span>School List</span>
                    </a>
                    <el-dropdown-menu slot="dropdown" class="nav-dropdown">
                        <el-dropdown-item icon="el-icon-plus" v-for="item in schList" :class="{ 'active': item.CONSchool.trim() === schSession }">
                            <a @click="ChangeSchool(item.CONSchool.trim())" v-bind:value="item.CONSchool.trim()" >{{ item.SCH_Name.trim() }}</a>
                            <!--<i v-if="item.CONSchool.trim() === schSession" class="fa fa-check-square"-->
                                    <!--aria-hidden="true"></i>-->
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <!--<vs-popup id="schoolListModal" class="holamundo" title="Select School " :active.sync="schoolListOpen">-->
                    <!--<ul v-model="schListCurrent">-->
                        <!--<li v-for="item in schList">-->
                            <!--<span v-on:click="ChangeSchool(item.CONSchool.trim())" v-bind:value="item.CONSchool.trim()">{{ item.SCH_Name.trim() }} <i-->
                                    <!--v-if="item.CONSchool.trim() === schSession" class="fa fa-check-square"-->
                                    <!--aria-hidden="true"></i></span>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</vs-popup>-->
                <!--<vs-dropdown>-->
                    <!--<vs-dropdown-menu v-model="schListCurrent">-->
                        <!--<vs-dropdown-item v-for="(key, value) in schList">-->
                            <!--<span v-on:click="ChangeSchool(value)" v-bind:value=value>{{ key }} <i-->
                                    <!--v-if="value === schSession" class="fa fa-check-square"-->
                                    <!--aria-hidden="true"></i></span>-->
                        <!--</vs-dropdown-item>-->
                        <!--<vs-dropdown-item v-for="item in schList">-->
                <!--<span v-on:click="ChangeSchool(item.CONSchool.trim())" v-bind:value="item.CONSchool.trim()">{{ item.SCH_Name.trim() }} <i-->
                        <!--v-if="item.CONSchool.trim() === schSession" class="fa fa-check-square"-->
                        <!--aria-hidden="true"></i></span>-->
                        <!--</vs-dropdown-item>-->
                    <!--</vs-dropdown-menu>-->
                <!--</vs-dropdown>-->
            </li>
            <li class="info-menu__item">
                <!--<vs-dropdown class="CSTEST">-->
                <!--<a class="a-icon" href="#">-->
                <!--<i class="fa fa-life-ring" aria-hidden="true"></i>-->
                <!--<span>Guided Tour</span>-->
                <!--</a>-->
                <!--<vs-dropdown-menu>-->
                <!--<vs-dropdown-item>-->
                <!--<span @click="guidedTour('HowToCreateNewStudent')">How to create new student</span>-->
                <!--</vs-dropdown-item>-->
                <!--</vs-dropdown-menu>-->
                <!--</vs-dropdown>-->
                <el-dropdown trigger="click">
                    <a class="el-dropdown-link">
                        <i class="fa fa-life-ring" aria-hidden="true"></i>
                        <span>Guided Tour</span>
                    </a>
                    <el-dropdown-menu slot="dropdown" class="nav-dropdown">
                        <el-dropdown-item icon="el-icon-plus" >
                            <a @click="guidedTour('HowToCreateNewStudent')"> How to create new student</a>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-plus" >
                            <a @click="guidedTour('HowToPromoteStudents')"> How to promote students</a>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-plus" >
                            <a @click="guidedTour('HowToManageClasses')"> How to manage classes</a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li class="info-menu__item">
                <!--<vs-dropdown>-->
                <!--<a class="a-icon" href="#">-->
                <!--<i class="fa fa-user-circle" aria-hidden="true"></i>-->
                <!--<span>Account</span>-->
                <!--</a>-->
                <!--<vs-dropdown-menu>-->
                <!--<vs-dropdown-item>-->
                <!--<span @click="logout">Logout</span>-->
                <!--</vs-dropdown-item>-->
                <!--</vs-dropdown-menu>-->
                <!--</vs-dropdown>-->
                <el-dropdown trigger="click">
                    <a class="el-dropdown-link">
                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                        <span>Account</span>
                    </a>
                    <el-dropdown-menu slot="dropdown" class="nav-dropdown">
                        <el-dropdown-item icon="el-icon-plus" >
                            <a @click="logout">Logout</a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </div>
        <!--<b-modal id="schoolListModal" hide-footer title="Select School " v-model="schoolListOpen">-->
        <!--<ul v-model="schListCurrent">-->
        <!--<li v-for="item in schList">-->
        <!--<span v-on:click="ChangeSchool(item.CONSchool.trim())" v-bind:value="item.CONSchool.trim()">{{ item.SCH_Name.trim() }} <i-->
        <!--v-if="item.CONSchool.trim() === schSession" class="fa fa-check-square"-->
        <!--aria-hidden="true"></i></span>-->
        <!--</li>-->
        <!--</ul>-->
        <!--</b-modal>-->
        <vs-popup id="schoolListModal" class="holamundo" title="Select School " :active.sync="schoolListOpen">
            <ul v-model="schListCurrent">
                <li v-for="item in schList">
                            <span v-on:click="ChangeSchool(item.CONSchool.trim())" v-bind:value="item.CONSchool.trim()">{{ item.SCH_Name.trim() }} <i
                                    v-if="item.CONSchool.trim() === schSession" class="fa fa-check-square"
                                    aria-hidden="true"></i></span>
                </li>
            </ul>
        </vs-popup>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";
    import Cookies from "js-cookie";

    export default {
        name: 'navBar',
        data() {
            return {
                // isLoading: true,
                // token: null,
                // isLoggedIn: null

                schList: [],
                schListCurrent: '',

                schSession: Cookies.get('schoolSession'),
                schoolListOpen: false,
                isToken: Cookies.get('authToken'),
            };
        },
        async created() {
            await this.BindSchoolList();
        },
        methods: {
            showSchoolList() {
                this.schoolListOpen = true;
            },
            logout() {
                DataSource.shared.logout();
                this.logoutGoogle();
                window.location.replace("/login");
            },
            logoutGoogle() {
                $.getScript('https://apis.google.com/js/platform.js', function () {
                    gapi.load("auth2", () => {
                        gapi.auth2.init({
                            client_id: "646978523324-lcudp248dvuuk0rda4q6kf2bti9qkk3b.apps.googleusercontent.com"
                        }).then((auth2) => {
                            auth2.signOut();
                            console.log("Google Logout");
                        });
                    });
                });
            },
            isMobile() {
                if (screen.width <= 770) {
                    return true;
                } else {
                    return false;
                }
            },
            async BindSchoolList() {
                try {
                    const response = await DataSource.shared.getUserSch();
                    if (response) {
                        //this.schList = response;

                        // for (const item in response) {
                        //     this.schList.push(item);
                        // }

                        this.schListResponse = response.Table;
                        this.schListResponse.forEach(m => {
                            this.schList.push(m);
                        });

                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async ChangeSchool(value) {
                try {
                    //Cookies.set('schoolSession', value);
                    //window.location.replace('/');

                    this.schList.forEach(m => {
                        if (m.CONSchool === value) {
                            Cookies.set('schoolSession', m.CONSchool, {expires: 3 / 24}); //expire in 3 hour
                            Cookies.set('userIDSession', m.CONid, {expires: 3 / 24}); //expire in 3 hour
                            Cookies.set('userTypeSession', m.CONType, {expires: 3 / 24}); //expire in 3 hour
                            Cookies.set('userUniversitySession', m.CONUniversity, {expires: 3 / 24}); //expire in 3 hour
                            Cookies.set('usRidSession', m.USRid, {expires: 3 / 24}); //expire in 3 hour
                            window.location.replace('/');
                        }
                    });
                } catch (e) {
                    this.results = e;
                }
            },
            guidedTour(value) {
                if (value === 'HowToCreateNewStudent') {
                    // this.$router.push({
                    //     name: 'Student',
                    //     params: {
                    //         guidedTour: 'YES'
                    //     }
                    // });

                    //var currentUrl = window.location.pathname;

                    window.location.replace('/student?tour=YES');
                } else if (value === 'HowToPromoteStudents') {
                    window.location.replace('/promotion?tour=YES');
                } else if (value === 'HowToManageClasses') {
                    window.location.replace('/ClassManagement?tour=YES');
                }
            }
        }
        // mounted() {
        //     const isLogin = Cookies.get('authToken');
        //     if (this.$route.path !== "/login" && (!isLogin || isLogin === "null")) {
        //         this.$router.push('/login');
        //     } else if (isLogin) {
        //         this.isLoggedIn = true;
        //         setTimeout(this.warningLogout, 10800); // 3 hours
        //     }
        //     this.isLoading = false;
        // },
    };
</script>
<style>
</style>