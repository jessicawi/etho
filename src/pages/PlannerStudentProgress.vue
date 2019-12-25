<template>
    <div id="plannerstudentprogress">
        <div class="admin-wrap">
            <div class="row header mb-5">
                <div class="col-lg-12">
                    <h3 class="text-left mb-3">Student Learning Moment Progress</h3>
                </div>
            </div>
            <div class="pb-5">
                <div class="empty-list_image" v-if="!studentLearningMomentProgressListRecords">
                    <strong>{{startupText}}</strong>
                    <img src="../assets/notfound.png"/>
                </div>
                <div v-if="studentLearningMomentProgressListRecords">
                    <div class="row">
                        <div class="col-lg-6">
                            <label class="partTitle">Posted Domains</label>
                            <div v-if="postedDomainChart.labels.length<1">
                                <label>No Posted...</label>
                            </div>
                            <div v-if="postedDomainChart.labels.length>0">
                                <div>
                                    <pie-chart
                                        :chartdata="postedDomainChart"
                                    />
                                </div>
                                <div>
                                    <label class="partTitle">Posted Domains Summary</label>
                                    <div v-if="postedDomainChart.labels.length>0">
                                        <div v-for="item in postedDomainSummary">
                                            <label>{{item.Domain}} : Posted {{item.PostedCount}} out of {{item.Total}}, Percentage {{item.DonePercentage}}%</label>
                                        </div>
                                    </div>
                                    <div>
                                        <el-button type="primary" round @click="openPostedDomainDetailsModal()">View More Detials...</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <label class="partTitle">Pending Domains</label>
                            <div v-if="pendingDomainChart.labels.length<1">
                                <label>No Pending...</label>
                            </div>
                            <div v-if="pendingDomainChart.labels.length>0">
                                <div>
                                    <pie-chart
                                        :chartdata="pendingDomainChart"
                                    />
                                </div>
                                <div>
                                    <label class="partTitle">Pending Domains Summary</label>
                                    <div v-if="pendingDomainChart.labels.length>0">
                                        <div v-for="item in pendingDomainSummary">
                                            <label>{{item.Domain}} : Pending {{item.PendingCount}} out of {{item.Total}}, Percentage {{item.UnDonePercentage}}%</label>
                                        </div>
                                    </div>
                                    <div>
                                        <el-button type="primary" round @click="openPendingDomainDetailsModal()">View More Detials...</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="studentLearningMomentProgressList.length>0" class="postedReportDiv">
                        <div>
                            <label class="partTitle">Posted Report</label>
                        </div>
                        <div class="studentLearningMomentProgressTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(header, index) in studentLearningMomentProgressListValue" v-if="index !== 1">
                                            <div v-if="index === 0">

                                            </div>
                                            <div v-if="index !== 0 && index !== 1">
                                                {{header.label}}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="detials in studentLearningMomentProgressList" :class="{'domainTr':detials.isDomain}">
                                        <td v-for="(detialsValue, detialsValueKey, detialsValueIndex) in detials" v-if="detialsValueKey !== 'isDomain'">
                                            <div v-if="detialsValueKey === 'Domain'"
                                                 :class="{'domainDiv':detials.isDomain}">
                                                {{detialsValue}}
                                            </div>
                                            <div v-if="detialsValueKey !== 'Domain' && detialsValueKey !== 'isDomain'">
                                                <span v-for="KeySkillOrCLD in detialsValue" class="keySkillCLDSpan" @click="displayPost(KeySkillOrCLD.PostID);">
                                                    {{KeySkillOrCLD.Value}}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal size="lg" title="Post" ok-only ok-variant="secondary" hide-footer ref="postModal">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" v-for="object of postIDList">
                <PostComponent
                        :parent-post="object"
                        @loadPosts="loadPosts"
                        ref="pComponent"
                        :hideComment="true"
                        @loadingclose="loadingclose"
                />
            </div>
        </b-modal>
        <b-modal size="lg" title="Pending Domain Details" ok-only ok-variant="secondary" hide-footer ref="pendingDomainDetailsModal">
            <div v-if="pendingDomainDetailsInt.length>0" class="datatable_group">
                <data-tables :data="pendingDomainDetailsInt">
                    <el-table-column v-for="viewDomainDetailsInfo in viewDomainDetails"
                                     :prop="viewDomainDetailsInfo.prop" :label="viewDomainDetailsInfo.label"
                                     :key="viewDomainDetailsInfo.prop" sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>
        </b-modal>
        <b-modal size="lg" title="Posted Domain Details" ok-only ok-variant="secondary" hide-footer ref="postedDomainDetailsModal">
            <div v-if="postedDomainDetailsInt.length>0" class="datatable_group">
                <data-tables :data="postedDomainDetailsInt">
                    <el-table-column v-for="viewDomainDetailsInfo in viewDomainDetails"
                                     :prop="viewDomainDetailsInfo.prop" :label="viewDomainDetailsInfo.label"
                                     :key="viewDomainDetailsInfo.prop" sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import PostComponent from "../components/postCompnent";
    import pieChart from "../components/charts/pieChart.vue";
    import Global from "../global";

    export default {
        name: "PlannerStudentProgress",
        data() {
            return {
                startupText: 'No Record Found...',
                currentStudentID: '',
                currentClassID: '',

                studentLearningMomentProgressListRecords:  false,
                studentLearningMomentProgressList: [],
                studentLearningMomentProgressListValue: [],
                postIDList: [],

                plannerAssignedListInt: [],

                pendingDomainSummary: [],
                pendingDomainDetailsInt: [],
                postedDomainSummary: [],
                postedDomainDetailsInt: [],

                pendingDomainChart: {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: [],
                        hoverBackgroundColor: [],
                    }],
                },
                postedDomainChart: {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: [],
                        hoverBackgroundColor: [],
                    }],
                },
                viewDomainDetails: [{
                    prop: "Domain",
                    label: "Domain"
                }, {
                    prop: "Goals",
                    label: "Goals"
                }, {
                    prop: "KeySkillCLD",
                    label: "Key Skills Or CLD"
                }, {
                    prop: "Done",
                    label: "Done"
                }],
            }
        },
        components: {
            PostComponent,
            pieChart
        },
        computed: {
            ChartBG:()=>Global.state.ChartBG,
            HoverChartBG:()=>Global.state.HoverChartBG,
        },
        async created() {
            if (this.$route.params.studentID && this.$route.params.classID) {
                this.currentStudentID = this.$route.params.studentID;
                this.currentClassID = this.$route.params.classID;

                this.getStudentPlannerProgressByClassIDRange();
            } else {
                // this.$router.push('/Portfolio');

                //test
                this.currentStudentID = 'STU201800104808';
                this.currentClassID = 'CLS201800024287';

                this.getStudentPlannerProgressByClassIDRange();
                //test
            }
        },
        methods: {
            async getStudentPlannerProgressByClassIDRange(){
                try {
                    this.studentLearningMomentProgressListRecords = false;
                    this.studentLearningMomentProgressList = [];

                    const response = await DataSource.shared.getStudentPlannerProgressByClassIDRange(this.currentClassID, this.currentStudentID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            console.log('Get Student Planner Progress By ClassID Range: Error!!');
                        } else if (response.code === '2') {
                            this.studentLearningMomentProgressListRecords = false;
                            this.studentLearningMomentProgressList = [];
                            this.studentLearningMomentProgressListValue = [];
                        } else {
                            this.studentLearningMomentProgressListRecords = true;
                            this.studentLearningMomentProgressList = [];
                            this.studentLearningMomentProgressListValue = [];

                            //arrange the month to year
                            let AcademicYearMonthYearTemp = {
                                prop: 'Domain',
                                label: 'Domain',
                            };
                            this.studentLearningMomentProgressListValue.push(AcademicYearMonthYearTemp);

                            AcademicYearMonthYearTemp = {
                                prop: 'isDomain',
                                label: 'isDomain',
                            };
                            this.studentLearningMomentProgressListValue.push(AcademicYearMonthYearTemp);

                            response.AcademicYearMonthYear.Table.forEach(aymyItem => {
                                let currentMonth = '';

                                if (aymyItem.Month === 1) {
                                    currentMonth = 'Jan';
                                } else if (aymyItem.Month === 2) {
                                    currentMonth = 'Feb';
                                } else if (aymyItem.Month === 3) {
                                    currentMonth = 'Mar';
                                } else if (aymyItem.Month === 4) {
                                    currentMonth = 'Apr';
                                } else if (aymyItem.Month === 5) {
                                    currentMonth = 'May';
                                } else if (aymyItem.Month === 6) {
                                    currentMonth = 'Jun';
                                } else if (aymyItem.Month === 7) {
                                    currentMonth = 'Jul';
                                } else if (aymyItem.Month === 8) {
                                    currentMonth = 'Aug';
                                } else if (aymyItem.Month === 9) {
                                    currentMonth = 'Sep';
                                } else if (aymyItem.Month === 10) {
                                    currentMonth = 'Oct';
                                } else if (aymyItem.Month === 11) {
                                    currentMonth = 'Nov';
                                } else if (aymyItem.Month === 12) {
                                    currentMonth = 'Dec';
                                }

                                let AcademicYearMonthYearTemp = {
                                    prop: currentMonth,
                                    label: currentMonth,
                                };

                                this.studentLearningMomentProgressListValue.push(AcademicYearMonthYearTemp);
                            });
                            //arrange the month to year

                            //posted report
                            response.PostedInfo.GroupByDomain.forEach(gbdItem => {
                                let currentDomain = gbdItem.Domain;

                                //insert domain
                                let newRow = {
                                    'Domain': gbdItem.Domain,
                                    'isDomain': true,
                                    'Jan': [],
                                    'Feb': [],
                                    'Mar': [],
                                    'Apr': [],
                                    'May': [],
                                    'Jun': [],
                                    'Jul': [],
                                    'Aug': [],
                                    'Sep': [],
                                    'Oct': [],
                                    'Nov': [],
                                    'Dec': [],
                                };
                                this.studentLearningMomentProgressList.push(newRow);
                                //insert domain

                                //insert goals and key skill or CLD
                                response.PostedInfo.GroupByDomainGoals.forEach(gbdgItem => {
                                    if (currentDomain === gbdgItem.Domain) {
                                        let currentGoals = gbdgItem.Goals;
                                        let jan = [], feb = [], mar = [], apr = [], may = [], jun = [], jul = [], aug = [], sep = [], oct = [], nov = [], dec = [];

                                        response.PostedInfo.All.forEach(allItem => {
                                            if (currentDomain === allItem.Domain && currentGoals === allItem.Goals) {
                                                let newKeySkill = {
                                                    'PostID': allItem['PosID'],
                                                    'Value': allItem['KeySkillOrCLD'],
                                                };

                                                if (allItem.Month === 1) {
                                                    jan.push(newKeySkill);
                                                } else if (allItem.Month === 2) {
                                                    feb.push(newKeySkill);
                                                } else if (allItem.Month === 3) {
                                                    mar.push(newKeySkill);
                                                } else if (allItem.Month === 4) {
                                                    apr.push(newKeySkill);
                                                } else if (allItem.Month === 5) {
                                                    may.push(newKeySkill);
                                                } else if (allItem.Month === 6) {
                                                    jun.push(newKeySkill);
                                                } else if (allItem.Month === 7) {
                                                    jul.push(newKeySkill);
                                                } else if (allItem.Month === 8) {
                                                    aug.push(newKeySkill);
                                                } else if (allItem.Month === 9) {
                                                    sep.push(newKeySkill);
                                                } else if (allItem.Month === 10) {
                                                    oct.push(newKeySkill);
                                                } else if (allItem.Month === 11) {
                                                    nov.push(newKeySkill);
                                                } else if (allItem.Month === 12) {
                                                    dec.push(newKeySkill);
                                                }
                                            }
                                        });

                                        let newRow = {
                                            'Domain': currentGoals,
                                            'isDomain': false,
                                            'Jan': jan,
                                            'Feb': feb,
                                            'Mar': mar,
                                            'Apr': apr,
                                            'May': may,
                                            'Jun': jun,
                                            'Jul': jul,
                                            'Aug': aug,
                                            'Sep': sep,
                                            'Oct': oct,
                                            'Nov': nov,
                                            'Dec': dec,
                                        };
                                        this.studentLearningMomentProgressList.push(newRow);
                                    }
                                });
                                //insert goals and key skill or CLD
                            });
                            //posted report

                            //assigned planner list details
                            response.PlannerInfo.AssignedPlannerDetials.forEach(plannerAssignedListInt => {
                                let doneTime = 0;

                                response.PostedInfo.All.forEach(allItem => {
                                    if (plannerAssignedListInt.PlnStaDomain === allItem.Domain && plannerAssignedListInt.PlnStaGoals === allItem.Goals && plannerAssignedListInt.PlnStaKeySkillCLD === allItem.KeySkillOrCLD) {
                                        doneTime ++;
                                    }
                                });

                                let newRow = {
                                    'Domain': plannerAssignedListInt.PlnStaDomain,
                                    'Goals': plannerAssignedListInt.PlnStaGoals,
                                    'KeySkillCLD': plannerAssignedListInt.PlnStaKeySkillCLD,
                                    'Done': doneTime,
                                };
                                this.plannerAssignedListInt.push(newRow);
                            });
                            //assigned planner list details

                            //posted domain
                            response.PlannerInfo.AssignedPlannerGroupByDomainCount.forEach(assignedPlannerGroupByDomainCountItem => {
                                let currentDomain = assignedPlannerGroupByDomainCountItem.Domain;
                                let postedCount = 0;

                                this.plannerAssignedListInt.forEach(plannerAssignedListIntItem => {
                                    if (currentDomain === plannerAssignedListIntItem.Domain && plannerAssignedListIntItem.Done > 0) {
                                        postedCount ++;
                                    }
                                });

                                if (postedCount > 0) {
                                    let donePercentage = 0;
                                    donePercentage = (postedCount * 100) / assignedPlannerGroupByDomainCountItem.Total;
                                    donePercentage = parseFloat(parseFloat(donePercentage).toFixed(2));

                                    let newRow = {
                                        'Domain': currentDomain,
                                        'PostedCount': postedCount,
                                        'Total': assignedPlannerGroupByDomainCountItem.Total,
                                        'DonePercentage': donePercentage,
                                    };
                                    this.postedDomainSummary.push(newRow);
                                }
                            });

                            let colorIndexPosted = 0;
                            let colorHoverIndexPosted = 0;
                            this.postedDomainSummary.forEach(assignedPlannerGroupByDomainPostedItem => {
                                this.postedDomainChart.labels.push(assignedPlannerGroupByDomainPostedItem.Domain);

                                this.postedDomainChart.datasets[0].data.push(assignedPlannerGroupByDomainPostedItem.PostedCount);
                                this.postedDomainChart.datasets[0].backgroundColor.push(this.ChartBG[colorIndexPosted]);
                                this.postedDomainChart.datasets[0].hoverBackgroundColor.push(this.HoverChartBG[colorHoverIndexPosted]);

                                if (colorIndexPosted <= this.ChartBG.length) {
                                    colorIndexPosted ++;
                                } else {
                                    colorIndexPosted = 0;
                                }

                                if (colorHoverIndexPosted <= this.HoverChartBG.length) {
                                    colorHoverIndexPosted ++;
                                } else {
                                    colorHoverIndexPosted = 0;
                                }
                            });

                            this.plannerAssignedListInt.forEach(plannerAssignedListIntItem => {
                                if (plannerAssignedListIntItem.Done>0){
                                    this.postedDomainDetailsInt.push(plannerAssignedListIntItem);
                                }
                            });
                            //posted domain

                            //pending domain
                            response.PlannerInfo.AssignedPlannerGroupByDomainCount.forEach(assignedPlannerGroupByDomainCountItem => {
                                let currentDomain = assignedPlannerGroupByDomainCountItem.Domain;
                                let pendingCount = assignedPlannerGroupByDomainCountItem.Total;

                                this.plannerAssignedListInt.forEach(plannerAssignedListIntItem => {
                                    if (currentDomain === plannerAssignedListIntItem.Domain && plannerAssignedListIntItem.Done > 0) {
                                        pendingCount --;
                                    }
                                });

                                if (pendingCount > 0) {
                                    let undonePercentage = 0;
                                    undonePercentage = (pendingCount * 100) / assignedPlannerGroupByDomainCountItem.Total;
                                    undonePercentage = parseFloat(parseFloat(undonePercentage).toFixed(2));

                                    let newRow = {
                                        'Domain': currentDomain,
                                        'PendingCount': pendingCount,
                                        'Total': assignedPlannerGroupByDomainCountItem.Total,
                                        'UnDonePercentage': undonePercentage,
                                    };
                                    this.pendingDomainSummary.push(newRow);
                                }
                            });

                            let colorIndexPending = 0;
                            let colorHoverIndexPending = 0;
                            this.pendingDomainSummary.forEach(assignedPlannerGroupByDomainPendingItem => {
                                this.pendingDomainChart.labels.push(assignedPlannerGroupByDomainPendingItem.Domain);

                                this.pendingDomainChart.datasets[0].data.push(assignedPlannerGroupByDomainPendingItem.PendingCount);
                                this.pendingDomainChart.datasets[0].backgroundColor.push(this.ChartBG[colorIndexPending]);
                                this.pendingDomainChart.datasets[0].hoverBackgroundColor.push(this.HoverChartBG[colorHoverIndexPending]);

                                if (colorIndexPending <= this.ChartBG.length) {
                                    colorIndexPending ++;
                                } else {
                                    colorIndexPending = 0;
                                }

                                if (colorHoverIndexPending <= this.HoverChartBG.length) {
                                    colorHoverIndexPending ++;
                                } else {
                                    colorHoverIndexPending = 0;
                                }
                            });

                            this.plannerAssignedListInt.forEach(plannerAssignedListIntItem => {
                                if (plannerAssignedListIntItem.Done<1){
                                    this.pendingDomainDetailsInt.push(plannerAssignedListIntItem);
                                }
                            });
                            //pending domain
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async displayPost (postID) {
                let jsonStringPostID = JSON.stringify([postID]);

                const response = await DataSource.shared.getPostByPostID(jsonStringPostID);
                if (response) {
                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === '99') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Error: Get Post'
                        });
                    } else if (response.code === '2') {
                        this.$notify.error({
                            title: 'Invalid',
                            message: 'No Post Found'
                        });
                    } else {
                        this.postIDList = response.Table;
                    }
                }

                this.$refs.postModal.show();
            },
            openPendingDomainDetailsModal () {
                this.$refs.pendingDomainDetailsModal.show();
            },
            openPostedDomainDetailsModal () {
                this.$refs.postedDomainDetailsModal.show();
            },
        },
    }
</script>

<style scoped>
    .studentLearningMomentProgressTable {
        max-width: 100%;
        max-height: 700px;
        overflow: scroll;
        position: relative;
    }

    .studentLearningMomentProgressTable table {
        position: relative;
        border-collapse: collapse;
    }

    .studentLearningMomentProgressTable td, .studentLearningMomentProgressTable th {
        padding: 15px;
        min-width: 300px;
    }

    .studentLearningMomentProgressTable thead th {
        position: -webkit-sticky; /* for Safari */
        position: sticky;
        top: 0;
        background: #FFF;
        outline: 1px solid #e9ecef;
        border:none;
        outline-offset: -1px;
    }

    .studentLearningMomentProgressTable thead th:first-child {
        left: -1px;
        z-index: 1;
        background: #FFF;
    }

    .studentLearningMomentProgressTable tbody td:first-child {
        position: -webkit-sticky; /* for Safari */
        position: sticky;
        left: -1px;
        background: #FFF;
        border-right: 1px solid #CCC;
    }

    .studentLearningMomentProgressTable .keySkillCLDSpan {
        background: #C9F1FD;
        color: #0C59CF;
        margin-right: 15px;
        padding: 5px;
        display: inline-block;
        max-width: 280px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
    }

    .studentLearningMomentProgressTable .domainDiv {
        color: #1464F6;
        font-weight: bold;
    }

    .studentLearningMomentProgressTable .domainTr {
        border-top: 1px black solid;
    }

    .postedReportDiv {
        margin-top: 100px;
    }

    .partTitle {
        text-decoration: underline;
    }
</style>