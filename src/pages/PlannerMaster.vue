<template>
    <div id="plannermaster">
        <div class="container" style="margin-top: 10px;">
            <div class="row header mb-2">
                <div class="col-lg-3 ">
                    <h3 class="text-left mb-3">
                        {{$route.name}}
                    </h3>
                </div>
                <div class="col-lg-9 actionDiv">
                    <el-button type="primary" class="mt-2 mb-2" @click="openModel('NewMasterPlanner')">
                        <i class="material-icons">playlist_add</i>
                        New Master Planner
                    </el-button>

                    <el-button type="primary" class="mt-2 mb-2" @click="assignSchool()">
                        <i class="material-icons">layers</i>
                        Assign Planner
                    </el-button>
                </div>
            </div>
            <div class="pb-5">
                <div class="empty-list_image" v-if="plannerMasterListInt.length<1">
                    <strong>No Data Found...</strong>
                    <img src="../assets/notfound.png"/>
                </div>
                <div v-if="plannerMasterListInt.length>0" class="datatable_group">
                    <div class="col-lg-12 searchArea">
                        <el-input class="search-datatable" placeholder="Search Level"  v-model="plannerMasterListFilters[0].value">
                            <template slot="prepend">
                                <i class="material-icons">search</i>
                                <span>Search Level</span>
                            </template>
                        </el-input>

                        <el-input class="search-datatable" placeholder="Search Domain" v-model="plannerMasterListFilters[1].value">
                            <template slot="prepend">
                                <i class="material-icons">search</i>
                                <span>Search Domain</span>
                            </template>
                        </el-input>
                    </div>
                    <data-tables :data="plannerMasterListInt" :action-col="plannerMasterListDelete" :filters="plannerMasterListFilters">
                        <el-table-column v-for="plannerMasterListInfo in plannerMasterList" :prop="plannerMasterListInfo.prop"
                                         :label="plannerMasterListInfo.label" :key="plannerMasterListInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
        </div>
        <b-modal id="newPlannerModel" size="lg" title="New Planner Master" ok-only ok-variant="secondary" ok-title="Cancel" ref="newPlannerModel" hide-footer>
            <div class="row">
                <div class="col-lg-12">
                    <label>Domain</label>
                    <input type="text" class="form-control" v-model="inputNewDomain">
                </div>
                <div class="col-lg-6">
                    <label>Type</label>
                    <el-select v-model="ddlNewType" placeholder="Select Type" class="newTypeSelect">
                        <el-option
                                v-for="item in plannerType"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-lg-6">
                    <label>Level</label>
                    <el-select v-model="ddlNewLevel" placeholder="Select Level" class="newLevelSelect">
                        <el-option
                                v-for="item in plannerLevel"
                                :key="item.CRS_Level"
                                :label="item.CRS_Level"
                                :value="item.CRS_Level">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-lg-12">
                    <label>Goals</label>
                    <input type="text" class="form-control" v-model="inputNewGoals">
                </div>
                <div class="col-lg-12">
                    <label>Key Skills</label>
                    <input type="text" class="form-control" v-model="inputNewKeySkills">
                </div>
                <div class="col-lg-12">
                    <label>Goals: We "see" children's learning and development in this area when they...</label>
                    <input type="text" class="form-control" v-model="inputNewCLD">
                </div>
                <div class="col-lg-12">
                    <el-button type="primary" class="mt-2 mb-2" @click="saveNewPlannerMaster()">
                        Save
                    </el-button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "PlannerMaster",
        data() {
            return {
                plannerType: ['ITL', 'NEL'],
                plannerLevel: [],
                inputNewDomain: '',
                inputNewGoals: '',
                inputNewKeySkills: '',
                inputNewCLD: '',
                ddlNewType: '',
                ddlNewLevel: '',

                plannerMasterListInt: [],
                plannerMasterList: [{
                    prop: "PlnMasDomain",
                    label: "Domain"
                }, {
                    prop: "PlnMasGoals",
                    label: "Goals"
                }, {
                    prop: "PlnMasKeySkill",
                    label: "Key Skills"
                }, {
                    prop: "PlnMasCLD",
                    label: "CLD"
                }, {
                    prop: "PlnMasType",
                    label: "Type"
                }, {
                    prop: "PlnMasLevel",
                    label: "Level"
                }],
                plannerMasterListDelete: {
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
                            this.deletePlannerMaster(row.PlnMasID);
                        },
                        label: 'Delete'
                    }]
                },
                plannerMasterListFilters: [
                    {
                        value: '',
                        prop: 'PlnMasLevel',
                    },
                    {
                        value: '',
                        prop: 'PlnMasDomain',
                    }
                ]
            }
        },
        async created() {
            this.getPlannerMasterList();
            this.getCoursesLevel();
        },
        methods: {
            async getCoursesLevel(){
                try {
                    const response = await DataSource.shared.getAllCoursesLevel();
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            console.log('getAllCoursesLevel Error');
                        } else if (response.code === '2') {
                            console.log('getAllCoursesLevel no records return');
                        } else {
                            this.plannerLevel = response.Table ;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPlannerMasterList(){
                try {
                    const response = await DataSource.shared.getPlannerMaster('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get Master Planner List: Error',
                            });
                        } else if (response.code === '2') {
                            this.plannerMasterListInt = [];
                        } else {
                            this.plannerMasterListInt = response.Table ;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async saveNewPlannerMaster () {
                try {
                    if (this.inputNewDomain === '' || this.inputNewGoals === '' || this.inputNewKeySkills === '' || this.inputNewCLD === '' || this.ddlNewType === '' || this.ddlNewLevel === '') {
                        this.$notify({
                            title: 'Require',
                            message: 'All Fields Required...',
                        });
                    } else {
                        let newPlannerMasterObjJson = {
                            Domain : this.inputNewDomain,
                            Goals : this.inputNewGoals,
                            KeySkill : this.inputNewKeySkills,
                            CLD : this.inputNewCLD,
                            Type : this.ddlNewType,
                            Level: this.ddlNewLevel,
                        };

                        const response = await DataSource.shared.savePlannerMaster(JSON.stringify(newPlannerMasterObjJson));
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Save Master Planner List: Error',
                                });
                            } else if (response.code === '2') {
                                this.$notify.error({
                                    title: 'Duplicated',
                                    message: 'Planner duplicated',
                                });
                            } else {
                                this.clearNewMasterPlannerModelInput();
                                this.getPlannerMasterList();
                                this.$refs.newPlannerModel.hide();
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async deletePlannerMaster (PlnMasID) {
                try {
                    const response = await DataSource.shared.updatePlannerMaster(PlnMasID, 'Delete');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Delete Master Planner List: Error',
                            });
                        } else {
                            this.getPlannerMasterList();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            openModel (value) {
                if (value === 'NewMasterPlanner') {
                    this.clearNewMasterPlannerModelInput();
                    this.$refs.newPlannerModel.show();
                }
            },
            clearNewMasterPlannerModelInput(){
                this.inputNewDomain = '';
                this.inputNewGoals = '';
                this.inputNewKeySkills = '';
                this.inputNewCLD = '';
                this.ddlNewType = '';
                this.ddlNewLevel = '';
            },
            assignSchool(){
                this.$router.push({
                    name: 'Planner Assign School',
                });
            },
        },
    }
</script>

<style scoped>
    .actionDiv {
        text-align: right;
    }
    .newTypeSelect, .newLevelSelect {
        width: 100%;
    }
    .searchArea .el-input-group {
        width: 50% !important;
    }
</style>