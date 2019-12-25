<template>
    <div id="plannerAssignSchool">
        <div class="container" style="margin-top: 10px;">
            <div class="row header mb-2">
                <div class="col-lg-4">
                    <h3 class="text-left mb-3">
                        {{$route.name}}
                    </h3>
                </div>
                <div class="col-lg-8 actionDiv">
                    <el-select v-model="ddlSchool" @change="BindSemester()" placeholder="Select School">
                        <el-option
                                v-for="item in schoolList"
                                :key="item.PK_SCH_ID"
                                :label="item.SCH_Name"
                                :value="item.PK_SCH_ID">
                        </el-option>
                    </el-select>

                    <el-select v-model="ddlSemester" @change="getPlannerAssignedToSchool()" placeholder="Select Academic Year">
                        <el-option
                                v-for="item in semesterList"
                                :key="item.PK_Semester_ID"
                                :label="item.SMT_Code"
                                :value="item.PK_Semester_ID">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="pb-5">
                <div class="empty-list_image" v-if="plannerSummaryInt.length<1">
                    <strong>No Data Found...</strong>
                    <img src="../assets/notfound.png"/>
                </div>
                <div v-if="plannerSummaryInt.length>0" class="datatable_group">
                    <data-tables :data="plannerSummaryInt">
                        <el-table-column v-for="plannerSummaryInfo in plannerSummary" :prop="plannerSummaryInfo.prop"
                                         :label="plannerSummaryInfo.label" :key="plannerSummaryInfo.prop"
                                         sortable="custom">
                        </el-table-column>

                        <el-table-column label="Assign" min-width="100px">
                            <template slot-scope="scope">
                                <el-button v-for="assignPlannerButton in assignPlanner(scope.row)"
                                           :key="assignPlannerButton.name" type="primary"
                                           @click="assignPlannerButton.handler">
                                    {{assignPlannerButton.name}}
                                </el-button>
                            </template>
                        </el-table-column>

                        <el-table-column label="Rule" min-width="100px">
                            <template slot-scope="scope">
                                <el-button v-for="assignRuleButton in assignRule(scope.row)"
                                           :key="assignRuleButton.name" type="primary"
                                           @click="assignRuleButton.handler">
                                    {{assignRuleButton.name}}
                                </el-button>
                            </template>
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
            <b-modal id="assignPlannerModel" size="lg" title="Assigned Planner" ok-only ok-variant="secondary" ok-title="Cancel" ref="assignPlannerModel" hide-footer>
                <div class="row">
                    <div class="col-lg-12">
                        <el-button type="primary" class="mt-2 mb-2" @click="getPlannerUnAssignToSchoolDetails()">
                            Assign
                        </el-button>
                    </div>
                    <div class="col-lg-12">
                        <div class="empty-list_image" v-if="plannerAssignedListInt.length<1">
                            <strong>No Data Found...</strong>
                            <img src="../assets/notfound.png"/>
                        </div>
                        <div v-if="plannerAssignedListInt.length>0" class="datatable_group">
                            <data-tables :data="plannerAssignedListInt" :action-col="plannerAssignedListDelete">
                                <el-table-column v-for="plannerAssignedListInfo in plannerAssignedList" :prop="plannerAssignedListInfo.prop"
                                                 :label="plannerAssignedListInfo.label" :key="plannerAssignedListInfo.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>
                        </div>
                    </div>
                </div>
            </b-modal>
            <b-modal id="unassignPlannerModel" size="lg" title="UnAssign Planner" ok-only ok-variant="secondary" ok-title="Cancel" ref="unassignPlannerModel" hide-footer>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="empty-list_image" v-if="plannerUnAssignedListInt.length<1">
                            <strong>No Data Found...</strong>
                            <img src="../assets/notfound.png"/>
                        </div>
                        <div v-if="plannerUnAssignedListInt.length>0" class="datatable_group">
                            <div class="col-lg-12">
                                <el-button type="primary" class="mt-2 mb-2" @click="SavePlannerDetials()">
                                    Save
                                </el-button>
                            </div>
                            <div class="col-lg-12">
                                <data-tables :data="plannerUnAssignedListInt" @selection-change="changeSelection">
                                    <el-table-column type="selection" width="55" :reserve-selection="true">
                                    </el-table-column>
                                    <el-table-column v-for="plannerUnAssignedListInfo in plannerUnAssignedList" :prop="plannerUnAssignedListInfo.prop"
                                                     :label="plannerUnAssignedListInfo.label" :key="plannerUnAssignedListInfo.prop"
                                                     sortable="custom">
                                    </el-table-column>
                                </data-tables>
                            </div>
                        </div>
                    </div>
                </div>
            </b-modal>
            <b-modal id="assignPlannerRuleModel" size="lg" title="Assigned Planner Rules" ok-only ok-variant="secondary" ok-title="Cancel" ref="assignPlannerRuleModel" hide-footer>
                <div class="row">
                    <div class="col-lg-12">
                        <el-button type="primary" class="mt-2 mb-2" @click="getPlannerUnAssignRuleDomainName()">
                            Assign
                        </el-button>
                    </div>
                    <div class="col-lg-12">
                        <div class="empty-list_image" v-if="plannerAssignedRuleListInt.length<1">
                            <strong>No Data Found...</strong>
                            <img src="../assets/notfound.png"/>
                        </div>
                        <div v-if="plannerAssignedRuleListInt.length>0" class="datatable_group">
                            <data-tables :data="plannerAssignedRuleListInt" :action-col="plannerAssignedRuleListInfoDelete">
                                <el-table-column v-for="plannerAssignedRuleListInfo in plannerAssignedRuleList" :prop="plannerAssignedRuleListInfo.prop"
                                                 :label="plannerAssignedRuleListInfo.label" :key="plannerAssignedRuleListInfo.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>
                        </div>
                    </div>
                </div>
            </b-modal>
            <b-modal id="assignUnPlannerRuleModel" size="lg" title="UnAssigned Planner Rules" ok-only ok-variant="secondary" ok-title="Cancel" ref="assignUnPlannerRuleModel" hide-footer>
                <div class="row">
                    <div class="col-lg-6">
                        <label>Domain</label>
                        <el-select v-model="ddlDomain" placeholder="Select Domain" class="domainSelect">
                            <el-option
                                    v-for="item in unAssignedRuleDomain"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-lg-6">
                        <label>Min</label>
                        <input type="text" class="form-control inputDomainMin" v-model="inputDomainMin" @keypress="onlyNumber">
                    </div>
                    <div class="col-lg-12">
                        <el-button type="primary" class="mt-2 mb-2" @click="addDomainRule()">
                            Add
                        </el-button>
                    </div>
                    <div class="col-lg-12" v-if="DomainRuleAddInt.length>0">
                        <div class="col-lg-12" >
                            <data-tables :data="DomainRuleAddInt"
                                         :action-col="DomainRuleAddRemove">
                                <el-table-column v-for="DomainRuleAddInfo in DomainRuleAdd" :prop="DomainRuleAddInfo.prop"
                                                 :label="DomainRuleAddInfo.label" :key="DomainRuleAddInfo.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>
                        </div>

                        <div class="col-lg-12">
                            <el-button type="primary" class="mt-2 mb-2" @click="SavePlannerRule()">
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

    export default {
        name: "PlannerAssignSchool",
        data() {
            return {
                multipleSelection: [],
                currentCrsID: '',
                currentSemID: '',
                currentSchID: '',
                currentLevelType: '',

                ddlSchool: '',
                schoolList: [],
                ddlSemester: '',
                semesterList: [],
                ddlDomain: '',
                unAssignedRuleDomain: [],
                inputDomainMin: '',

                plannerSummaryInt: [],
                plannerSummary: [{
                    prop: 'Level',
                    label: "Level"
                }, {
                    prop: "PlannerAssigned",
                    label: "Planner Assigned"
                }],

                plannerAssignedListInt: [],
                plannerAssignedList: [{
                    prop: "PlnMasDomain",
                    label: "Domain"
                }, {
                    prop: "PlnMasGoals",
                    label: "Goals"
                }, {
                    prop: "PlnMasGoalsType",
                    label: "Goals Type"
                }, {
                    prop: "KeySkillOrCLD",
                    label: "Key Skills Or CLD"
                }, {
                    prop: "KeySkillOrCLDType",
                    label: "Key Skills Or CLD Type"
                }],
                plannerAssignedListDelete: {
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
                            this.deletePlannerAssignedToSchoolDetails(row.PlnScadID);
                        },
                        label: 'Delete'
                    }]
                },

                plannerUnAssignedListInt: [],
                plannerUnAssignedList: [{
                    prop: "PlnMasDomain",
                    label: "Domain"
                }, {
                    prop: "PlnMasGoals",
                    label: "Goals"
                }, {
                    prop: "PlnMasGoalsType",
                    label: "Goals Type"
                }, {
                    prop: "KeySkillOrCLD",
                    label: "Key Skills Or CLD"
                }, {
                    prop: "KeySkillOrCLDType",
                    label: "Key Skills Or CLD Type"
                }],

                plannerAssignedRuleListInt: [],
                plannerAssignedRuleList: [{
                    prop: "PlnScarDomain",
                    label: "Domain"
                }, {
                    prop: "PlnScarMin",
                    label: "Min"
                }],
                plannerAssignedRuleListInfoDelete: {
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
                            this.deletePlannerAssignedRule(row.PlnScarID);
                        },
                        label: 'Delete'
                    }]
                },

                DomainRuleAddInt: [],
                DomainRuleAdd: [{
                    prop: "Domain",
                    label: "Domain"
                }, {
                    prop: "Min",
                    label: "Min"
                }],
                DomainRuleAddRemove: {
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
                            this.DomainRuleAddInt.splice(this.DomainRuleAddInt.indexOf(row), 1);
                            this.unAssignedRuleDomain.push(row.Domain);
                        },
                        label: 'Delete'
                    }]
                },
            }
        },
        async created() {
            this.BindSchool();
        },
        methods: {
            changeSelection(val) {
                this.multipleSelection = val;
            },
            async BindSchool() {
                try {
                    const response = await DataSource.shared.getAllActiveSchool('', 'UTY201300000061');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.schoolListResponse = response.Table;
                            this.schoolListResponse.forEach(m => {
                                if (m.PK_SCH_ID !== 'SCH20120000001') {
                                    this.schoolList.push(m);
                                }
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindSemester() {
                try {
                    this.plannerSummaryInt = [];
                    this.ddlSemester = '';
                    this.semesterList = [];

                    const response = await DataSource.shared.getAcademicYearBySchoolID(this.ddlSchool);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.semesterList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPlannerAssignedToSchool() {
                try {
                    this.plannerSummaryInt = [];

                    const response = await DataSource.shared.getPlannerAssignedToSchool(this.ddlSchool, this.ddlSemester);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.plannerSummaryInt = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPlannerAssignedToSchoolDetails(CrsID, SemID, SchID) {
                try {
                    const response = await DataSource.shared.getPlannerAssignedDetialsToSchool(SchID, SemID, CrsID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get Assigned Planner List: Error',
                            });
                        } else if (response.code === '2') {
                            this.plannerAssignedListInt = [];
                            this.$refs.assignPlannerModel.show();
                        } else {
                            this.plannerAssignedListInt = response.Table;
                            this.$refs.assignPlannerModel.show();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async deletePlannerAssignedToSchoolDetails(plannerSchoolAssginDetailsID) {
                try {
                    const response = await DataSource.shared.updatePlannerAssignedDetialsToSchool(plannerSchoolAssginDetailsID, 'Delete');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Delete Assigned Planner List: Error',
                            });
                        } else {
                            this.getPlannerAssignedToSchoolDetails(this.currentCrsID, this.currentSemID, this.currentSchID);
                            this.getPlannerAssignedToSchool();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPlannerUnAssignToSchoolDetails() {
                try {
                    this.multipleSelection = [];
                    this.plannerUnAssignedListInt = [];

                    const response = await DataSource.shared.getPlannerUnAssignToSchool(this.currentCrsID, this.currentSemID, this.currentSchID, this.currentLevelType);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get UnAssign Planner List: Error',
                            });
                        } else if (response.code === '2') {
                            this.$refs.unassignPlannerModel.show();
                        } else {
                            this.plannerUnAssignedListInt = response.Table;
                            this.$refs.unassignPlannerModel.show();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async SavePlannerDetials() {
                try {
                    let PlannerMasterIDList = [];

                    this.multipleSelection.forEach(item => {
                        let PlannerMasterIDListTemp = {
                            PlannerMasterID: item.PlnMasID,
                        };

                        PlannerMasterIDList.push(PlannerMasterIDListTemp);
                    });

                    let newPlannerAssignedToSchoolObjJson = {
                        CrsID : this.currentCrsID,
                        SemID : this.currentSemID,
                        SchID : this.currentSchID,
                        PlannerMasterIDList : PlannerMasterIDList,
                    };

                    const response = await DataSource.shared.savePlannerAssignedToSchool(JSON.stringify(newPlannerAssignedToSchoolObjJson));
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Save Planner Detials: Error',
                            });
                        } else {
                            this.$refs.unassignPlannerModel.hide();
                            this.getPlannerAssignedToSchoolDetails(this.currentCrsID, this.currentSemID, this.currentSchID);
                            this.getPlannerAssignedToSchool();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPlannerAssignedRule() {
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
                            this.plannerAssignedRuleListInt = [];
                            this.$refs.assignPlannerRuleModel.show();
                        } else {
                            this.plannerAssignedRuleListInt = response.Table;
                            this.$refs.assignPlannerRuleModel.show();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPlannerUnAssignRuleDomainName() {
                try {
                    this.ddlDomain = '';
                    this.inputDomainMin = '';
                    this.unAssignedRuleDomain = [];
                    this.DomainRuleAddInt = [];

                    const response = await DataSource.shared.getPlannerUnAssignRuleDomainName(this.currentCrsID, this.currentSemID, this.currentSchID, this.currentLevelType);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get Planner UnAssign Rule Domain Name: Error',
                            });
                        } else if (response.code === '2') {
                            this.$notify({
                                title: 'No Action Required',
                                message: 'All Domain have been assigned rule',
                            });
                        } else {
                            response.Table.forEach(m => {
                                this.unAssignedRuleDomain.push(m.PlnMasDomain);
                            });
                            this.$refs.assignUnPlannerRuleModel.show();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async deletePlannerAssignedRule(plannerSchoolAssginRuleID) {
                try {
                    const response = await DataSource.shared.updatePlannerAssignedRule(plannerSchoolAssginRuleID, 'Delete');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Delete Planner Assigned Rule: Error',
                            });
                        } else {
                            this.getPlannerAssignedRule();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async SavePlannerRule() {
                try {
                    let PlannerRule = [];

                    this.DomainRuleAddInt.forEach(item => {
                        let PlannerRuleTemp = {
                            Domain: item.Domain,
                            Min: item.Min,
                        };

                        PlannerRule.push(PlannerRuleTemp);
                    });

                    let newPlannerAssignedRuleObjJson = {
                        CrsID : this.currentCrsID,
                        SemID : this.currentSemID,
                        SchID : this.currentSchID,
                        PlannerRuleList : PlannerRule,
                    };

                    const response = await DataSource.shared.savePlannerAssignedRule(JSON.stringify(newPlannerAssignedRuleObjJson));
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Save Planner Rule: Error',
                            });
                        } else {
                            this.$refs.assignUnPlannerRuleModel.hide();
                            this.getPlannerAssignedRule();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            addDomainRule () {
                try {
                    if (this.ddlDomain === '' || this.inputDomainMin === '' ) {
                        this.$notify({
                            title: 'Required',
                            message: 'Required All Fields...',
                        });
                    } else {
                        let addNewRowList = {
                            Domain: this.ddlDomain,
                            Min: this.inputDomainMin,
                        };

                        this.DomainRuleAddInt.push(addNewRowList);

                        this.unAssignedRuleDomain.splice(this.unAssignedRuleDomain.indexOf(this.ddlDomain), 1);

                        this.ddlDomain = '';
                        this.inputDomainMin = '';
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            assignPlanner(row) {
                return [{
                    name: 'Assign',
                    handler: _ => {
                        this.getPlannerAssignedToSchoolDetails(row.CrsID, row.SemID, row.SchID);
                        this.currentCrsID = row.CrsID;
                        this.currentSemID = row.SemID;
                        this.currentSchID = row.SchID;
                        this.currentLevelType = row.LevelType;
                    }
                }];
            },
            assignRule(row) {
                return [{
                    name: 'Rule',
                    handler: _ => {
                        this.currentCrsID = row.CrsID;
                        this.currentSemID = row.SemID;
                        this.currentSchID = row.SchID;
                        this.currentLevelType = row.LevelType;

                        this.getPlannerAssignedRule();
                    }
                }];
            },
            onlyNumber($event) {
                //console.log($event.keyCode); //keyCodes value
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                //if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                if (keyCode < 48 || keyCode > 57) { // 46 is dot
                    $event.preventDefault();
                }
            },
        },
    }
</script>

<style scoped>
    .actionDiv {
        text-align: right;
    }
    .domainSelect, .inputDomainMin {
        width: 100%;
    }
</style>