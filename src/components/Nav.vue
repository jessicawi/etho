<template>
    <div class="row nabarx topbar">
        <div class="col-md-12 col-lg-5 text-left">
            <a href="/"> <img src="../assets/kagami-white.png"/></a>
            <span v-if="conType !== 'Parent'">
                <!--{{$route.name}}--> {{ currentSchoolName }}
            </span>
        </div>
        <div class="col-md-12 col-lg-7 info-menu">
            <div class="input-group search" v-if="!isMobile() && conTypePL">
                <!--<input type="text" class="form-control" placeholder="Search for...">-->
                <!--<span class="input-group-btn">-->
                <!--<button class="btn btn-default" type="button"><i class="fa fa-search"-->
                <!--aria-hidden="true"></i></button>-->
                <!--</span>-->
                <!--<el-select v-model="generalSearchSelectValue"-->
                <!--placeholder="Search Student by Name"-->
                <!--:remote-method="generalSearchChange"-->
                <!--@change="generalSearchChangeValue"-->
                <!--filterable-->
                <!--remote-->
                <!--reserve-keyword>-->
                <!--<el-option v-for="generalSearchListItem in generalSearchList"-->
                <!--:key="generalSearchListItem.Value"-->
                <!--:label="generalSearchListItem.Display"-->
                <!--:value="[generalSearchListItem.Value, generalSearchListItem.QueryType]">-->
                <!--<span style="float: left">{{ generalSearchListItem.Display }}</span>-->
                <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ generalSearchListItem.QueryType }}</span>-->
                <!--</el-option>-->
                <!--</el-select>-->
                <div id="search" :class="{ active: searchIsActive}" @click="setSearchActive"
                     v-click-outside="removeSearchActive">
                    <i class="material-icons">
                        search
                    </i>
                    <el-select v-model="generalSearchSelectValue"
                               placeholder="Search"
                               :remote-method="generalSearchChange"
                               @change="generalSearchChangeValue"
                               filterable
                               remote
                               reserve-keyword
                               popper-class="generalSearch">
                        <el-option-group
                                v-for="generalSearchListItemGroup in generalSearchList"
                                :key="generalSearchListItemGroup.GroupCat"
                                :label="generalSearchListItemGroup.GroupCat">
                            <el-option
                                    v-for="item in generalSearchListItemGroup.GroupVal"
                                    :key="item.Value"
                                    :label="item.Display"
                                    :value="[item.Value, item.QueryType]">
                                <span class="option-value" @mouseover="handleOptionHover(item)">{{item.Display}}</span>
                            </el-option>
                        </el-option-group>
                    </el-select>
                </div>
                <div class="newsearchvalueWrap"
                     v-click-outside="resetGeneralSearchList" v-if="showNewSearchValue">
                    <div class="hover-content" :class="{ active: isSearchResultHovered===true }">
                        <div class="hover-content-parent" v-if="searchResultDetails.QueryType === 'Student'">
                            Details for "<span v-html="filterSearch(searchResultDetails.Display)"></span>"
                            <hr/>
                            <div class="hover-item">
                                <strong>Parent</strong>
                                <div>
                                    <span>Father Name: {{searchResultDetails.FatherFullName}}</span>
                                    <span>Mother Name: {{searchResultDetails.MotherFullName}}</span>
                                </div>
                                    <el-button type="primary" round size="mini" @click="newGeneralSearchChangeValue(searchResultDetails.PAR_ID,'Parent')">Edit Parents Details</el-button>
                            </div>
                            <hr/>
                            <div class="hover-item">
                                <strong>Class</strong>
                                <div>
                                    <span v-if="searchResultDetails.CLS_ClassName !== ''">Name: {{searchResultDetails.CLS_ClassName}}</span>
                                    <span v-if="searchResultDetails.CLS_ClassName === ''">Name: No Active Class</span>
                                    <span v-if="searchResultDetails.CRS_Course_Name !== ''">Level: {{searchResultDetails.CRS_Course_Name}}</span>
                                    <span v-if="searchResultDetails.CRS_Course_Name === ''">Level: No Active Level</span>
                                </div>
                                <el-button type="primary" round size="mini" @click="newGeneralSearchChangeValue(searchResultDetails.Value,'EditClass')">Edit Class</el-button>
                            </div>
                        </div>

                        <div class="hover-content-parent" v-if="searchResultDetails.QueryType === 'Parent'">
                            Details for "<span v-html="filterSearch(searchResultDetails.Display)"></span>"
                            <hr/>
                            <div class="hover-item">
                                <strong>Parent</strong>
                                <div>
                                    <span>Father Name: {{searchResultDetails.ParentFatherFullName}}</span>
                                    <span>Mother Name: {{searchResultDetails.ParentMotherFullName}}</span>
                                    <span>Number of Child: {{searchResultDetails.NumberOfChild}}</span>
                                    <span v-if="searchResultDetails.PAR_Father_Phone !== ''">Father Phone Number: <span style="display: inline !important" v-html="filterSearch(searchResultDetails.PAR_Father_Phone)"></span></span>
                                    <span v-if="searchResultDetails.PAR_Father_Phone === ''">Father Phone Number: -</span>
                                    <span v-if="searchResultDetails.PAR_Mother_Phone !== ''">Mother Phone Number: <span style="display: inline !important" v-html="filterSearch(searchResultDetails.PAR_Mother_Phone)"></span></span>
                                    <span v-if="searchResultDetails.PAR_Mother_Phone === ''">Mother Phone Number: -</span>
                                </div>
                                <el-button type="primary" round size="mini" @click="newGeneralSearchChangeValue(searchResultDetails.Value,'Parent')">Edit Parents Details</el-button>
                            </div>
                            <hr/>
                            <div class="hover-item">
                                <strong
                                    v-if="searchResultDetails.PAR_Father_Email.includes(currentGeneralSearchValue) || searchResultDetails.PAR_Mother_Email.includes(currentGeneralSearchValue) || searchResultDetails.PAR_Guardian_Email.includes(currentGeneralSearchValue)">
                                    Personal Email
                                </strong>
                                <div>
                                    <span v-if="searchResultDetails.PAR_Father_Email.includes(currentGeneralSearchValue)">Father: <span style="display: inline !important" v-html="filterSearch(searchResultDetails.PAR_Father_Email)"></span></span>
                                    <span v-if="searchResultDetails.PAR_Mother_Email.includes(currentGeneralSearchValue)">Mother: <span style="display: inline !important" v-html="filterSearch(searchResultDetails.PAR_Mother_Email)"></span></span>
                                    <span v-if="searchResultDetails.PAR_Guardian_Email.includes(currentGeneralSearchValue)">Guardian: <span style="display: inline !important" v-html="filterSearch(searchResultDetails.PAR_Guardian_Email)"></span></span>
                                </div>
                                <strong
                                    v-if="searchResultDetails.PAR_FComp_Email.includes(currentGeneralSearchValue) || searchResultDetails.PAR_MComp_Email.includes(currentGeneralSearchValue) || searchResultDetails.PAR_GComp_Email.includes(currentGeneralSearchValue) || searchResultDetails.PAR_TPComp_Email.includes(currentGeneralSearchValue)">
                                    Company Email
                                </strong>
                                <div>
                                    <span v-if="searchResultDetails.PAR_FComp_Email.includes(currentGeneralSearchValue)">Father: <span style="display: inline !important" v-html="filterSearch(searchResultDetails.PAR_FComp_Email)"></span></span>
                                    <span v-if="searchResultDetails.PAR_MComp_Email.includes(currentGeneralSearchValue)">Mother: <span style="display: inline !important" v-html="filterSearch(searchResultDetails.PAR_MComp_Email)"></span></span>
                                    <span v-if="searchResultDetails.PAR_GComp_Email.includes(currentGeneralSearchValue)">Guardian: <span style="display: inline !important" v-html="filterSearch(searchResultDetails.PAR_GComp_Email)"></span></span>
                                    <span v-if="searchResultDetails.PAR_TPComp_Email.includes(currentGeneralSearchValue)">Third Party: <span style="display: inline !important" v-html="filterSearch(searchResultDetails.PAR_TPComp_Email)"></span></span>
                                </div>
                            </div>
                        </div>

                        <div class="hover-content-parent" v-if="searchResultDetails.QueryType === 'Class'">
                            Details for "<span v-html="filterSearch(searchResultDetails.Display)"></span>"
                            <hr/>
                            <div class="hover-item">
                                <strong>Class</strong>
                                <div>
                                    <span>Class Name: {{searchResultDetails.Display}}</span>
                                </div>
                                <el-button type="primary" round size="mini" @click="newGeneralSearchChangeValue(searchResultDetails.Value,'Class')">Edit Parents Details</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="newsearchvalue" :class="{ active: isSearchResultHovered===true }">
                        <span v-if="generalSearchList && generalSearchList.length <1">No Suggestions</span>
                        <div v-for="generalSearchListItemGroup in generalSearchList">
                            <div class="newSearch-Child">
                                <strong>{{generalSearchListItemGroup.GroupCat}}</strong>
                                <div v-for="item in generalSearchListItemGroup.GroupVal">
                                    <span @mouseover="handleOptionHover(item)" @click="setSearchValue(item)"><span style="display: inline !important;" v-html="filterSearch(item.Display)"></span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hover-overlay" v-if="isSearchResultHovered===true" @mouseover="closehover"></div>
                </div>
            </div>
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
            <li class="info-menu__item" v-if="conType !== 'Parent'">
                <!--<a class="a-icon" href="#" @click="showSchoolList()">-->
                <!--<i class="fa fa-university" aria-hidden="true"></i>-->
                <!--<span>School List</span>-->
                <!--</a>-->
                <el-dropdown v-if="schList.length > 0" trigger="click">
                    <a class="el-dropdown-link">
                        <i class="fa fa-university" aria-hidden="true"></i>
                        <span>School List</span>
                    </a>
                    <el-dropdown-menu slot="dropdown" class="nav-dropdown">
                        <el-dropdown-item icon="el-icon-plus" v-for="item in schList"
                                          :class="{ 'active': item.CONSchool.trim() === schSession }">
                            <a @click="ChangeSchool(item.CONSchool.trim())" v-bind:value="item.CONSchool.trim()">{{
                                item.SCH_Name.trim() }}</a>
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
            <li class="info-menu__item" v-if="conTypePL">
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
                <el-dropdown trigger="click" >
                    <a class="el-dropdown-link">
                        <i class="fa fa-life-ring" aria-hidden="true"></i>
                        <span>Guided Tour</span>
                    </a>
                    <el-dropdown-menu slot="dropdown" class="nav-dropdown">
                        <el-dropdown-item icon="el-icon-plus">
                            <a @click="guidedTour('HowToCreateNewStudent')"> How to create new student</a>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-plus">
                            <a @click="guidedTour('HowToPromoteStudents')"> How to promote students</a>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-plus">
                            <a @click="guidedTour('HowToManageClasses')"> How to manage classes</a>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-plus">
                            <a @click="guidedTour('HowToUpdateStudentLevelAndClass')"> How to update student level and
                                class</a>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-plus">
                            <a @click="guidedTour('HowToMassGraduationStudents')"> How to mass graduation students</a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li class="info-menu__item" v-if="isToken">
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
                        <el-dropdown-item icon="el-icon-plus">
                            <a href="/MyAccount">My Account</a>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-plus">
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
                currentSchoolName: '',
                generalSearchList: [],
                generalSearchSelectValue: '',
                generalSearchInputValue: '',
                schSession: Cookies.get('schoolSession'),
                schoolListOpen: false,
                isToken: Cookies.get('authToken'),

                conTypePL: false,
                conType: '',
                isSearchResultHovered: false,
                searchResultDetails: "",
                currentGeneralSearchValue: '',

                showNewSearchValue: false,
                searchIsActive: false,
            };
        },
        directives: {
            'click-outside': {
                bind: function (el, binding, vNode) {
                    // Provided expression must evaluate to a function.
                    if (typeof binding.value !== 'function') {
                        const compName = vNode.context.name;
                        let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
                        if (compName) {
                            warn += `Found in component '${compName}'`;
                        }

                        console.warn(warn);
                    }
                    // Define Handler and cache it on the element
                    const bubble = binding.modifiers.bubble;
                    const handler = (e) => {
                        if (bubble || (!el.contains(e.target) && el !== e.target)) {
                            binding.value(e);
                        }
                    };
                    el.__vueClickOutside__ = handler;

                    // add Event Listeners
                    document.addEventListener('click', handler);
                },

                unbind: function (el, binding) {
                    // Remove Event Listeners
                    document.removeEventListener('click', el.__vueClickOutside__);
                    el.__vueClickOutside__ = null;

                }
            }
        },
        async created() {
            await this.BindSchoolList();
            await this.guidedTourAccess();
            await this.staffOrParentAccess();
        },
        methods: {
            setSearchActive() {
                this.searchIsActive = !this.searchIsActive;
            },
            removeSearchActive(){
              if (this.searchIsActive === true){
                  this.searchIsActive = false;
              }
            },
            showSchoolList() {
                this.schoolListOpen = true;
            },
            logout() {
                DataSource.shared.logout();
                //this.logoutGoogle();
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
                            if (Cookies.get('schoolSession') === m.CONSchool) {
                                this.currentSchoolName = m.SCH_Name;
                            }
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
                } else if (value === 'HowToUpdateStudentLevelAndClass') {
                    window.location.replace('/student-list?mode=Search&tour=UpdateLevelClass');
                } else if (value === 'HowToMassGraduationStudents') {
                    window.location.replace('/StudentGraduation?tour=YES');
                }
            },
            guidedTourAccess() {
                if (Cookies.get('userTypeSession') === 'Parent Liaison') {
                    this.conTypePL = true;
                } else (
                    this.conTypePL = false
                );
            },
            staffOrParentAccess () {
                this.conType = Cookies.get('userTypeSession');
            },
            async generalSearch(valueInput) {
                try {
                    const response = await DataSource.shared.getValueFromGeneralSearch(valueInput);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            console.log("generalSearchStudent Error");
                        } else if (response.code === '2') {
                            this.generalSearchList = [];
                        } else {
                            //this.generalSearchList = response.Table;

                            let generalSearchList = [];
                            let generalSearchListDtl_Stu = [];
                            let generalSearchListDtl_Par = [];
                            let generalSearchListDtl_Cls = [];

                            response.Table.forEach((m, index) => {
                                if (m.QueryType === 'Student') {
                                    let generalSearchListDtlTemp = {
                                        Value: m.Value,
                                        Display: m.Display,
                                        QueryType: m.QueryType,
                                        FatherFullName: m.FatherFullName,
                                        MotherFullName: m.MotherFullName,
                                        PAR_ID: m.PAR_ID,
                                        CRS_Course_Name: m.CRS_Course_Name,
                                        CLS_ClassName: m.CLS_ClassName,
                                        NumberOfChild: m.NumberOfChild,
                                        ParentFatherFullName: m.ParentFatherFullName,
                                        ParentMotherFullName: m.ParentMotherFullName,
                                        PAR_Father_Phone: m.PAR_Father_Phone,
                                        PAR_Mother_Phone: m.PAR_Mother_Phone,
                                        PAR_Father_Email: m.PAR_Father_Email,
                                        PAR_Mother_Email: m.PAR_Mother_Email,
                                        PAR_Guardian_Email: m.PAR_Guardian_Email,
                                        PAR_FComp_Email: m.PAR_FComp_Email,
                                        PAR_MComp_Email: m.PAR_MComp_Email,
                                        PAR_GComp_Email: m.PAR_GComp_Email,
                                        PAR_TPComp_Email: m.PAR_TPComp_Email,
                                    };

                                    generalSearchListDtl_Stu.push(generalSearchListDtlTemp);
                                } else if (m.QueryType === 'Parent') {
                                    let generalSearchListDtlTemp = {
                                        Value: m.Value,
                                        Display: m.Display,
                                        QueryType: m.QueryType,
                                        FatherFullName: m.FatherFullName,
                                        MotherFullName: m.MotherFullName,
                                        PAR_ID: m.PAR_ID,
                                        CRS_Course_Name: m.CRS_Course_Name,
                                        CLS_ClassName: m.CLS_ClassName,
                                        NumberOfChild: m.NumberOfChild,
                                        ParentFatherFullName: m.ParentFatherFullName,
                                        ParentMotherFullName: m.ParentMotherFullName,
                                        PAR_Father_Phone: m.PAR_Father_Phone,
                                        PAR_Mother_Phone: m.PAR_Mother_Phone,
                                        PAR_Father_Email: m.PAR_Father_Email,
                                        PAR_Mother_Email: m.PAR_Mother_Email,
                                        PAR_Guardian_Email: m.PAR_Guardian_Email,
                                        PAR_FComp_Email: m.PAR_FComp_Email,
                                        PAR_MComp_Email: m.PAR_MComp_Email,
                                        PAR_GComp_Email: m.PAR_GComp_Email,
                                        PAR_TPComp_Email: m.PAR_TPComp_Email,
                                    };

                                    generalSearchListDtl_Par.push(generalSearchListDtlTemp);
                                } else if (m.QueryType === 'Class') {
                                    let generalSearchListDtlTemp = {
                                        Value: m.Value,
                                        Display: m.Display,
                                        QueryType: m.QueryType,
                                        FatherFullName: m.FatherFullName,
                                        MotherFullName: m.MotherFullName,
                                        PAR_ID: m.PAR_ID,
                                        CRS_Course_Name: m.CRS_Course_Name,
                                        CLS_ClassName: m.CLS_ClassName,
                                        NumberOfChild: m.NumberOfChild,
                                        ParentFatherFullName: m.ParentFatherFullName,
                                        ParentMotherFullName: m.ParentMotherFullName,
                                        PAR_Father_Phone: m.PAR_Father_Phone,
                                        PAR_Mother_Phone: m.PAR_Mother_Phone,
                                        PAR_Father_Email: m.PAR_Father_Email,
                                        PAR_Mother_Email: m.PAR_Mother_Email,
                                        PAR_Guardian_Email: m.PAR_Guardian_Email,
                                        PAR_FComp_Email: m.PAR_FComp_Email,
                                        PAR_MComp_Email: m.PAR_MComp_Email,
                                        PAR_GComp_Email: m.PAR_GComp_Email,
                                        PAR_TPComp_Email: m.PAR_TPComp_Email,
                                    };

                                    generalSearchListDtl_Cls.push(generalSearchListDtlTemp);
                                }
                            });

                            if (generalSearchListDtl_Stu.length > 0) {
                                let generalSearchListTemp = {
                                    GroupCat: 'Student',
                                    GroupVal: generalSearchListDtl_Stu
                                };

                                generalSearchList.push(generalSearchListTemp);
                            }

                            if (generalSearchListDtl_Par.length > 0) {
                                let generalSearchListTemp = {
                                    GroupCat: 'Parent',
                                    GroupVal: generalSearchListDtl_Par
                                };

                                generalSearchList.push(generalSearchListTemp);
                            }

                            if (generalSearchListDtl_Cls.length > 0) {
                                let generalSearchListTemp = {
                                    GroupCat: 'Class',
                                    GroupVal: generalSearchListDtl_Cls
                                };

                                generalSearchList.push(generalSearchListTemp);
                            }

                            this.generalSearchList = generalSearchList;

                            if (this.generalSearchList && this.generalSearchList.length > 0) {
                                this.showNewSearchValue = true;
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            generalSearchChange(query) {
                if (query !== '') {
                    this.currentGeneralSearchValue = query;
                    this.generalSearch(query);
                } else {
                    this.generalSearchList = [];
                }
            },
            handleOptionHover(e) {
                this.searchResultDetails = e;
                this.isSearchResultHovered = true;
            },
            closehover() {
                this.isSearchResultHovered = false;
            },
            setSearchValue(item) {
                this.generalSearchSelectValue = item.Display;
                this.newGeneralSearchChangeValue(item.Value, item.QueryType);
            },
            newGeneralSearchChangeValue(value, query) {
                if (query === 'Student') {
                    window.location.replace('student?id=' + value);
                } else if (query === 'Parent') {
                    window.location.replace('parent?id=' + value);
                } else if (query === 'Class') {
                    window.location.replace('ClassManagement?clsName=' + value);
                } else if (query === 'EditClass') {
                    window.location.replace('student?id=' + value + '&generalsearch=editclass');
                }
            },
            generalSearchChangeValue(e) {
                if (this.generalSearchSelectValue[1] === 'Student') {
                    //this.$router.push('student?id=' + this.generalSearchSelectValue[0]);
                    window.location.replace('student?id=' + this.generalSearchSelectValue[0]);
                } else if (this.generalSearchSelectValue[1] === 'Parent') {
                    //this.$router.push('parent?id=' + this.generalSearchSelectValue[0]);
                    window.location.replace('parent?id=' + this.generalSearchSelectValue[0]);
                } else if (this.generalSearchSelectValue[1] === 'Class') {
                    // this.$router.push({
                    //     name: 'Class Management',
                    //     params: {
                    //         className: this.generalSearchSelectValue[0],
                    //     }
                    // });

                    //this.$router.push('ClassManagement?clsName=' + this.generalSearchSelectValue[0]);
                    window.location.replace('ClassManagement?clsName=' + this.generalSearchSelectValue[0]);
                }
            },
            resetGeneralSearchList() {
                let query = "";
                this.generalSearchChange(query);
                this.showNewSearchValue = false;
                this.isSearchResultHovered = false;
            },
            filterSearch(value) {
                let finalValue;
                let toReplace = new RegExp(this.currentGeneralSearchValue, "gim");
                finalValue = value.replace(toReplace, function (x){
                    x = '<span style="display:inline !important; font-weight: bold; background-color: yellow; padding: 0px !important">' + x + '</span>';
                    return x;
                });
                return (finalValue);
            },
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
    .option-value {
        display: block;
    }
</style>