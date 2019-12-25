<template>
    <div id="plannerAssignStudent">
        <div class="container" style="margin-top: 10px;">
            <div class="row header mb-2">
                <div class="col-lg-4">
                    <h3 class="text-left mb-3">
                        {{$route.name}}
                    </h3>
                </div>
                <div class="col-lg-8 actionDiv">
                    <el-select v-model="ddlClass" placeholder="Select Class" class="pro-edt-select"
                               @change="Load()">
                        <el-option
                                v-for="item in ddlClassList"
                                :key="item.PK_Class_ID"
                                :label="item.CLS_ClassName.trim() + ' ' +item.CLS_Batch.trim()"
                                :value="item.PK_Semester_ID.trim() + ',' + item.SC_FK_CourseID.trim() + ',' + item.PK_Class_ID.trim()">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="pb-5">
                <div class="empty-list_image" v-if="studentPlannerSummaryInt.length<1">
                    <strong>No Data Found...</strong>
                    <img src="../assets/notfound.png"/>
                </div>
                <div v-if="studentPlannerSummaryInt.length>0" class="datatable_group">
                    <data-tables :data="studentPlannerSummaryInt" :action-col="studentPlannerSummaryAssign">
                        <el-table-column v-for="studentPlannerSummaryInfo in studentPlannerSummary" :prop="studentPlannerSummaryInfo.prop"
                                         :label="studentPlannerSummaryInfo.label" :key="studentPlannerSummaryInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
            <b-modal id="assignedStudentPlannerModel" size="lg" title="Assigned Student Planner" ok-only ok-variant="secondary" ok-title="Cancel" ref="assignedStudentPlannerModel" hide-footer>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="col-lg-12">
                            <el-button type="primary" class="mt-2 mb-2" @click="openAssignedStudentPlannerModel()">
                                Assign
                            </el-button>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="empty-list_image" v-if="studentPlannerDetailsInt.length<1">
                            <strong>No Data Found...</strong>
                            <img src="../assets/notfound.png"/>
                        </div>
                        <div v-if="studentPlannerDetailsInt.length>0" class="datatable_group">
                            <data-tables :data="studentPlannerDetailsInt" :action-col="studentPlannerDetailsDelete">
                                <el-table-column v-for="studentPlannerDetailsInfo in studentPlannerDetails" :prop="studentPlannerDetailsInfo.prop"
                                                 :label="studentPlannerDetailsInfo.label" :key="studentPlannerDetailsInfo.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>
                        </div>
                    </div>
                </div>
            </b-modal>
            <b-modal id="assignStudentPlannerModel" size="lg" title="Assign Student Planner" ok-only ok-variant="secondary" ok-title="Cancel" ref="assignStudentPlannerModel" hide-footer>
                <div class="row">
                    <div class="col-lg-6">
                        <label>
                            Domain
                        </label>
                        <el-select v-model="ddlDomain" @change="newDllChange('Domain')" placeholder="Select Domain" class="addNewDll">
                            <el-option
                                v-for="item in ddlDomainList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-lg-6">
                        <label>
                            Goals
                        </label>
                        <el-select v-model="ddlGoals" @change="newDllChange('Goals')" placeholder="Select Goals" class="addNewDll">
                            <el-option
                                    v-for="item in ddlGoalsList"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-lg-12">
                        <label class="inlineLabel">
                            Key Skills
                        </label>
                        <span class="cursorPointer">
                            <i class="material-icons" @click="masterKeySkillCLDManual()">edit</i>
                        </span>
                        <el-select v-if="masterKeySkillCLD" v-model="ddlKeySkillCLD" placeholder="Select Key Skill or CLD" class="addNewDll">
                            <el-option
                                    v-for="item in ddlKeySkillCLDList"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        <input type="text" class="form-control" v-if="!masterKeySkillCLD" v-model="inputKeySkillCLD">
                    </div>
                    <div class="col-lg-12">
                        <el-button type="primary" class="mt-2 mb-2" @click="addStudentPlanner()">
                            Add
                        </el-button>
                    </div>
                    <div v-if="addStudentPlannerListInt.length>0" class="datatable_group col-lg-12">
                        <div>
                            <label>New</label>
                        </div>
                        <div v-if="studentPlannerSaveEditNew === 'New'" v-html="ruleDisplay"></div>
                        <div>
                            <data-tables :data="addStudentPlannerListInt" :action-col="addStudentPlannerListDelete">
                                <el-table-column v-for="addStudentPlannerListInfo in addStudentPlannerList" :prop="addStudentPlannerListInfo.prop"
                                                 :label="addStudentPlannerListInfo.label" :key="addStudentPlannerListInfo.prop"
                                                 sortable="custom">
                                </el-table-column>

                                <el-table-column label="Suggested" min-width="100px">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.PlnMasID !== 'No'">Yes</span>
                                        <span v-if="scope.row.PlnMasID === 'No'">No</span>
                                    </template>
                                </el-table-column>
                            </data-tables>
                        </div>
                        <div>
                            <el-button type="primary" class="mt-2 mb-2" @click="saveStudentPlanner()">
                                Save
                            </el-button>
                        </div>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import Cookies from "js-cookie";

    export default {
        name: "PlannerAssignStudent",
        data() {
            return {
                currentSchID: Cookies.get('schoolSession'),
                currentStudentID: '',
                currentSemID: '',
                currentCrsID: '',
                currentLevelType: '',

                ddlClassList: [],
                ddlClass: '',
                plannerMasterList: [],
                ruleList: [],
                ruleDisplay: '',
                studentPlannerSaveEditNew: '',

                ddlDomainList: [],
                ddlDomain: '',
                ddlGoalsList: [],
                ddlGoals: '',
                masterKeySkillCLD: true,
                ddlKeySkillCLD: '',
                inputKeySkillCLD: '',
                ddlKeySkillCLDList: [],

                plannerSummaryInt: [],
                plannerSummary: [{
                    prop: 'Level',
                    label: "Level"
                }, {
                    prop: "PlannerAssigned",
                    label: "Planner Assigned"
                }],

                studentPlannerSummaryInt: [],
                studentPlannerSummary: [{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "StudentFullName",
                    label: "Student Name"
                }, {
                    prop: "NumberOfPlannerDetialsAssigned",
                    label: "Number of Planner Assigned"
                }],
                studentPlannerSummaryAssign: {
                    label: 'Assign',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.currentStudentID = row.StudentID;
                            this.currentSemID= row.SemID;
                            this.currentCrsID= row.CrsID;
                            this.currentLevelType= row.LevelType;
                            this.getStudentPlannerDetails();
                        },
                        label: 'Assign'
                    }]
                },

                studentPlannerDetailsInt: [],
                studentPlannerDetails: [{
                    prop: 'PlnStaDomain',
                    label: "Domain"
                }, {
                    prop: "PlnStaGoals",
                    label: "Goals"
                }, {
                    prop: "PlnStaKeySkillCLD",
                    label: "Key Skills Or CLD"
                }],
                studentPlannerDetailsDelete: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.deleteStudentPlannerDetails(row.PlnStaID);
                        },
                        label: 'Delete'
                    }]
                },

                addStudentPlannerListInt: [],
                addStudentPlannerList: [{
                    prop: 'PlnMasDomain',
                    label: "Domain"
                }, {
                    prop: "PlnMasGoals",
                    label: "Goals"
                }, {
                    prop: "KeySkillOrCLD",
                    label: "Key Skills Or CLD"
                }],
                addStudentPlannerListDelete: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.addStudentPlannerListInt.splice(this.addStudentPlannerListInt.indexOf(row), 1);
                            this.checkRule();
                        },
                        label: 'Delete'
                    }]
                },
            };
        },
        async created() {
            await this.bindClasses();
        },
        methods: {
            async bindClasses() {
                try {
                    const response = await DataSource.shared.getAttendanceClass();
                    if (response) {
                        this.class = response.Table;
                        this.class.forEach(m => {
                            this.ddlClassList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async Load() {
                try {
                    if (this.ddlClass === '') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select class'
                        });
                    } else {
                        this.$vs.loading();
                        const response = await DataSource.shared.getPlannerAssignedStudentSummaryByClassSemester(this.ddlClass);
                        if (response) {
                            if (response.code === '2') {
                                this.studentPlannerSummaryInt = [];
                            } else if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Get Planner Assigned Student Summary: ERROR!!'
                                });
                            } else {
                                this.studentPlannerSummaryInt = response.Table;
                            }
                        }
                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getStudentPlannerDetails() {
                try {
                    const response = await DataSource.shared.getPlannerAssignedStudentDetails(this.currentStudentID, this.currentSemID, this.currentCrsID);
                    if (response) {
                        if (response.code === '2') {
                            this.studentPlannerDetailsInt = [];
                            this.studentPlannerSaveEditNew = 'New';
                        } else if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get Planner Assigned Student Details: ERROR!!'
                            });
                        } else {
                            this.studentPlannerDetailsInt = response.Table;
                            this.studentPlannerSaveEditNew = 'Edit';
                        }

                        this.$refs.assignedStudentPlannerModel.show();
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async deleteStudentPlannerDetails(plannerAssignedStudentDetailsID) {
                try {
                    const response = await DataSource.shared.updatePlannerAssignedStudentDetails(plannerAssignedStudentDetailsID, 'Delete');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Delete Planner Assigned Student Details: ERROR!!'
                            });
                        } else if (response.code === '2') {
                            this.$notify.error({
                                title: 'Action Rejected',
                                message: 'Cannot delete due to rule not fulfill...'
                            });
                        } else {
                            this.$notify({
                                title: 'Successfully',
                                message: 'Deleted successfully'
                            });

                            this.getStudentPlannerDetails();
                            this.Load();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPlannerRule() {
                try {
                    const response = await DataSource.shared.getPlannerAssignedRule(this.currentCrsID, this.currentSemID, this.currentSchID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get Planner Assigned Rule: Error',
                            });
                        } else if (response.code === '2') {
                            this.ruleList = [];
                        } else {
                            this.ruleList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPlannerMaster() {
                try {
                    const response = await DataSource.shared.getPlannerMaster(this.currentLevelType);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get Planner Master: Error',
                            });
                        } else if (response.code === '2') {
                            this.plannerMasterList = [];
                        } else {
                            this.plannerMasterList = response.Table;

                            this.ddlDomainList = [];
                            this.ddlDomain = '';
                            this.plannerMasterList.forEach(item => {
                                if (!this.ddlDomainList.includes(item.PlnMasDomain)){
                                    this.ddlDomainList.push(item.PlnMasDomain)
                                }
                            })
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPlannerAssignedDetialsToSchool() {
                try {
                    const response = await DataSource.shared.getPlannerAssignedDetialsToSchool(this.currentSchID, this.currentSemID, this.currentCrsID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get Planner Master: Error',
                            });
                        } else if (response.code === '2') {
                            this.addStudentPlannerListInt = [];
                        } else {
                            this.addStudentPlannerListInt = response.Table;
                        }
                    }

                    this.checkRule();
                } catch (e) {
                    this.results = e;
                }
            },
            async saveStudentPlanner() {
                try {
                    if (!this.studentPlannerSave && this.studentPlannerSaveEditNew === 'New') {
                        this.$notify({
                            title: 'Require',
                            message: 'Please fulfill rules...'
                        });
                    } else {
                        this.$vs.loading();
                        let newPlannerStudentObjJson = [];

                        this.addStudentPlannerListInt.forEach(item => {
                            let PlannerStudenTemp = {
                                StudentID: this.currentStudentID,
                                Domain: item.PlnMasDomain,
                                Goals: item.PlnMasGoals,
                                KeySkillOrCLD: item.KeySkillOrCLD,
                                SemID: this.currentSemID,
                                CrsID: this.currentCrsID,
                                levelType: this.currentLevelType,
                            };

                            newPlannerStudentObjJson.push(PlannerStudenTemp);
                        });

                        const response = await DataSource.shared.savePlannerAssignStudent(JSON.stringify(newPlannerStudentObjJson));
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Save Planner Assigned Student Details: ERROR!!'
                                });
                            } else {
                                this.getStudentPlannerDetails();
                                this.Load();
                                this.clearAddStudentPlanner(true);
                                this.$refs.assignStudentPlannerModel.hide();
                            }
                        }
                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            openAssignedStudentPlannerModel () {
                this.clearAddStudentPlanner(true);
                this.getPlannerRule();
                this.getPlannerMaster();
                if (this.studentPlannerDetailsInt.length < 1) {
                    this.getPlannerAssignedDetialsToSchool();
                }
                this.$refs.assignStudentPlannerModel.show();
            },
            addStudentPlanner() {
                try {
                    // if (this.inputNewDomain === '' || this.inputNewGoals === ''  || this.inputNewKeySkills === ''  || this.inputNewCLD === '') {
                    //     this.$notify({
                    //         title: 'Required',
                    //         message: 'Required All Fields...',
                    //     });
                    // } else {
                    //     let addNewRowList = {
                    //         Domain: this.inputNewDomain,
                    //         Goals: this.inputNewGoals,
                    //         KeySkill: this.inputNewKeySkills,
                    //         CLD: this.inputNewCLD,
                    //         Type: this.inputNewType,
                    //     };
                    //
                    //     this.addStudentPlannerListInt.push(addNewRowList);
                    //
                    //     this.studentUnassignPlannerDetailsInt.forEach((m, index) => {
                    //         if (m.PlnMasDomain === this.inputNewDomain && m.PlnMasGoals === this.inputNewGoals && m.PlnMasKeySkill === this.inputNewKeySkills && m.PlnMasCLD === this.inputNewCLD) {
                    //             console.log(index);
                    //             this.studentUnassignPlannerDetailsInt.splice(index, 1);
                    //         }
                    //     });
                    //
                    //     this.clearAddStudentPlanner(false);
                    // }

                    if (this.ddlDomain === '' || this.ddlGoals === '') {
                        this.$notify({
                            title: 'Required',
                            message: 'Required All Fields...',
                        });
                    } else if ((this.masterKeySkillCLD === true && this.ddlKeySkillCLD === '') || (this.masterKeySkillCLD === false && this.inputKeySkillCLD === '')) {
                        this.$notify({
                            title: 'Required',
                            message: 'Required All Fields...',
                        });
                    } else {
                        let keySkillCLD;
                        let duplicated = false;

                        if (this.masterKeySkillCLD === true) {
                            keySkillCLD = this.ddlKeySkillCLD;
                        } else {
                            keySkillCLD = this.inputKeySkillCLD;
                        }

                        this.addStudentPlannerListInt.forEach(item => {
                            if (item.KeySkillOrCLD.trim() === keySkillCLD.trim()) {
                                duplicated = true;
                            }
                        });

                        if (this.studentPlannerDetailsInt.length > 0) {
                            this.studentPlannerDetailsInt.forEach(item => {
                                if (item.PlnStaKeySkillCLD.trim() === keySkillCLD.trim()) {
                                    duplicated = true;
                                }
                            });
                        }

                        if (duplicated){
                            this.$notify.error({
                                title: 'Duplicated',
                                message: 'Duplicated Key Skill or CLD value...',
                            });
                        } else {
                            let addNewRowList = {
                                PlnMasDomain: this.ddlDomain,
                                PlnMasGoals: this.ddlGoals,
                                KeySkillOrCLD: keySkillCLD,
                                PlnMasID: 'No',
                            };

                            this.addStudentPlannerListInt.push(addNewRowList);

                            this.clearAddStudentPlanner(false);
                            this.checkRule();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            clearAddStudentPlanner (clearAddStudentList) {
                if (clearAddStudentList) {
                    this.addStudentPlannerListInt = [];
                }

                this.ddlDomain = '';
                this.ddlGoalsList = [];
                this.ddlGoals = '';
                this.masterKeySkillCLD = true;
                this.ddlKeySkillCLD = '';
                this.inputKeySkillCLD = '';
                this.ddlKeySkillCLDList = [];
            },
            newDllChange(value) {
                if (value === 'Domain') {
                    this.ddlGoalsList = [];
                    this.ddlGoals = '';
                    this.ddlKeySkillCLDList = [];
                    this.ddlKeySkillCLD = '';
                    this.inputKeySkillCLD = '';

                    this.plannerMasterList.forEach((m, index) => {
                        if (m.PlnMasDomain === this.ddlDomain) {
                            this.ddlGoalsList.push(m.PlnMasGoals)
                        }
                    });
                } else if (value === 'Goals') {
                    this.ddlKeySkillCLDList = [];
                    this.ddlKeySkillCLD = '';
                    this.inputKeySkillCLD = '';

                    this.plannerMasterList.forEach((m, index) => {
                        if (m.PlnMasDomain === this.ddlDomain && m.PlnMasGoals === this.ddlGoals) {
                            this.ddlKeySkillCLDList.push(m.KeySkillOrCLD)
                        }
                    });
                }
            },
            masterKeySkillCLDManual () {
                this.ddlKeySkillCLD = '';
                this.inputKeySkillCLD = '';

                if (this.masterKeySkillCLD === true) {
                    this.masterKeySkillCLD = false;
                } else {
                    this.masterKeySkillCLD = true;
                }
            },
            checkRule() {
                this.ruleDisplay = '';
                let count = 0;
                let left = 0;

                this.ruleList.forEach(item => {
                    count = 0;
                    left = item.PlnScarMin;

                    this.addStudentPlannerListInt.forEach(item2 => {
                        if (item.PlnScarDomain === item2.PlnMasDomain) {
                            count ++;
                        }
                    });

                    if (count > 0) {
                        left = left - count;
                    }

                    if (left > 0) {
                        this.ruleDisplay += '<br>' + item.PlnScarDomain + ' : ' + left;
                    }
                });

                if (this.ruleDisplay === '') {
                    this.ruleDisplay = 'Rules Fulfilled...';
                    this.studentPlannerSave = true;
                } else {
                    this.ruleDisplay = 'Rules to fulfill:' + this.ruleDisplay;
                    this.studentPlannerSave = false;
                };
            },
        },
    }
</script>

<style scoped>
    .actionDiv {
        text-align: right;
    }
    .addNewDll {
        width: 100%;
    }
    .inlineLabel {
        display: inline !important;
    }
    .cursorPointer {
        cursor: pointer;
    }
</style>