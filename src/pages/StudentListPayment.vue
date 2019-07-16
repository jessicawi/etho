<template>
    <div id="student-list-payment">
        <div class="datatable-form__header ">
            <div class="datatable-form__input form-group">
                <vs-input label-placeholder="Student No" v-model="stud_id" v-on:keyup.enter="Search"/>
            </div>

            <div class="datatable-form__input form-group">
                <vs-input label-placeholder="Student First Name" v-model="stud_fname" v-on:keyup.enter="Search"/>
            </div>

            <div class="datatable-form__input form-group">
                <vs-input label-placeholder="Student Last Name" v-model="stud_lname" v-on:keyup.enter="Search"/>
            </div>

            <div class="datatable-form__input form-group">
                <vs-input label-placeholder="Parent Name" v-model="stud_parname" v-on:keyup.enter="Search"/>
            </div>

            <div class="datatable-form__input form-group">
                <el-select placeholder="Select" v-model="statusSearch" class="ddlSearchStatus" @change="Search">
                    <el-option
                            v-for="statusSearchListInfo in statusSearchList"
                            :key="statusSearchListInfo"
                            :label="statusSearchListInfo"
                            :value="statusSearchListInfo"
                    >
                    </el-option>
                </el-select>
            </div>

            <div class="datatable-form__submit text-center">
                <button class="btn btn-success searchbtn" id="btnSearch" v-on:click="Search">Search</button>
            </div>
        </div>

        <div style="display: none;">{{stud_id}}</div>

        <div class="mt-5 container" :class="{'admin-wrap' :listCount>0}">
            <div class="row header mb-2" v-if="listCount>0">
                <div class="col-lg-5 ">
                    <h3 class="text-left mb-3">Student List</h3>
                </div>
                <div class="col-lg-7 actionDiv">
                    <div class="text-right  student-search-count">Total <span>{{listCount}}</span> Students</div>
                    <el-popover
                            placement="bottom-end"
                            width="600"
                            trigger="click"
                    >

                        <el-checkbox-group v-model="studentFilter[0].value" class="custom-checkbox" >
                            <el-checkbox-button v-for="item in studentFilterItem" :label="item"
                                                :key="item" :value="item">{{item}}
                            </el-checkbox-button>
                        </el-checkbox-group>
                        <el-button slot="reference" type="primary" round
                                   class="float-right large-btn classManage-filter mr-2"><i
                                class="material-icons">
                            tune
                        </i> Filter
                        </el-button>
                    </el-popover>
                </div>
            </div>
            <div class="emptylist-info" v-if="listCount===0">
                <span>PLEASE SEARCH TO VIEW LIST...</span>
                <div class="emptylist__img">
                    <img src="../assets/table-loading.png"/>
                </div>
            </div>


            <div v-if="listCount>0" class="datatable_group">

                <data-tables :data="list" :action-col="actionCol" @selection-change="handleSelectionChange" :filters="studentFilter">
                    <el-table-column v-for="studentListInfo in studentList" :prop="studentListInfo.prop"
                                     :label="studentListInfo.label" :key="studentListInfo.prop"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>
        </div>

        <el-button type="primary" class="btn btn-primary waves-effect waves-light m-r-10 float-left" style="display: none;"
                   @click="studentListPageVueUpdateLevelClassTourStart()">
            Guided Tour - UpdateLevelClass
        </el-button>

        <v-tour name="StudentListPageUpdateLevelClassVueTourName" :steps="studentListPageUpdateLevelClassVueTour" :options="studentListPageUpdateLevelClassVueTourOptions" :callbacks="studentListPageUpdateLevelClassVueTourCallBacks">
            <template slot-scope="tour">
                <transition name="fade">
                    <v-step
                            v-if="tour.currentStep === index"
                            v-for="(step, index) of tour.steps"
                            :key="index"
                            :step="step"
                            :previous-step="tour.previousStep"
                            :next-step="tour.nextStep"
                            :stop="tour.stop"
                            :is-first="tour.isFirst"
                            :is-last="tour.isLast"
                            :labels="tour.labels"
                    >
                        <template v-if="tour.currentStep === 0">
                            <div slot="actions">
                                <button class="v-step__button" @click="tour.stop">Close</button>
                            </div>
                        </template>
                    </v-step>
                </transition>
            </template>
        </v-tour>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: 'StudentListPayment',
        data() {
            return {
                statusSearchList: ['', 'Active', 'Closed', 'Pending', 'Withdrawn', 'Graduated', 'Waitlist', 'Void', 'Rejected', 'Blacklist'],
                statusSearch: '',
                list: [],
                listCount:'',
                Father_Name: "",
                studentList: [{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Last_name",
                    label: "Last Name"
                }, {
                    prop: "Status",
                    label: "Status"
                },],
                actionCol: {
                    label: 'More',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-hand-up'
                        },
                        handler: row => {
                                this.$router.push('studentCourse-List?id=' + row.Student_ID);
                        },
                        label: 'More'
                    },]
                },
                selectedRow: null,
                stud_id: "",
                stud_fname: "",
                stud_lname: "",
                stud_parname: "",
                studentFilter: [
                    {
                        value: [],
                        prop: 'Status',
                    }
                ],
                studentFilterItem:[],

                //vue tour Update Level Class
                studentListPageUpdateLevelClassVueTourOptions: {
                    useKeyboardNavigation: false,
                    labels: {
                        buttonSkip: 'Skip tour',
                        buttonPrevious: 'Previous',
                        buttonNext: 'Next',
                        buttonStop: 'Finish'
                    }
                },
                studentListPageUpdateLevelClassVueTourCallBacks: {
                    onPreviousStep: this.studentListPageUpdateLevelClassVueTourCallBacksPreviousSteps,
                    onNextStep: this.studentListPageUpdateLevelClassVueTourCallBacksNextSteps
                },
                studentListPageUpdateLevelClassVueTour: [
                    {
                        target: '#btnSearch',
                        content: `<div>Step 1 / 3 <br>Fill the searching info and click Search button</div>`,
                        params: {
                            placement: 'top',
                        }
                    },
                ],
                //vue tour Update Level Class
            };
        },
        async mounted() {
            window.addEventListener('load', () => {
                if (this.$route.query.tour === 'UpdateLevelClass') {
                    this.studentListPageVueUpdateLevelClassTourStart();
                }
            })
        },
        methods: {
            handleSelectionChange(val) {
                this.selectedRow = val;
            },
            async Search() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getStudentWithPendingCourse('', this.stud_id, this.stud_fname, this.stud_lname, this.stud_parname, this.statusSearch);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Search Student: Error',
                            });
                        } else if (response.code === '2') {
                            this.$notify.error({
                                title: 'No Record',
                                message: 'No Student Found',
                            });
                        } else {
                            this.list = response.Table ;
                            this.listCount = response.Table && response.Table.length;
                            this.list.forEach(object => {
                                const found = this.studentFilterItem.find(d => d === object.Status);
                                if (!found) {
                                    this.studentFilterItem.push(object.Status);
                                }
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            studentListPageVueUpdateLevelClassTourStart () {
                this.$tours['StudentListPageUpdateLevelClassVueTourName'].start();
            },
            studentListPageUpdateLevelClassVueTourCallBacksPreviousSteps (currentStep) {
                let finalSteps = currentStep - 1;

                this.windowsSrollUpdateLevelClass(finalSteps);
            },
            studentListPageUpdateLevelClassVueTourCallBacksNextSteps (currentStep) {
                let finalSteps = currentStep + 1;

                this.windowsSrollUpdateLevelClass(finalSteps);
            },
            studentListPageUpdateLevelClassVueTourCallBacksNextPage () {
                window.location.replace('/student?id=TOURDEMO');
            },
            windowsSrollUpdateLevelClass(finalSteps) {
                // if (finalSteps >= 0 && finalSteps <= 1) {
                //     this.activeTab = 'Level';
                // }
            },
        },
    };
</script>

<style>
    #student-list-payment .vs-con-input {
        text-align: left;
    }

    #student-list-payment .vs-input--placeholder {
        color: rgba(255, 255, 255, 0.6);
    }

    #student-list-payment .isFocus .vs-placeholder-label {
        color: #fff;
    }

    /*jess*/
    .action-list button {
        /*width: 100%;*/
        margin: 5px 0px;
    }

    .sc-table .action-list > span + span {
        margin: 0px 0px;
        display: block;
    }

    .ddlSearchStatua .el-input__inner {
        color: white;
        height: 37px;
        border: 1px solid;
        border-color: rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        top: 1px;
        position: relative;
    }


</style>