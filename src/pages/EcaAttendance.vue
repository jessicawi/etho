<template>
    <div id="ecaattendance">
        <div class="container admin-wrap">
            <div class="row header mb-5">
                <div class="col-lg-5 ">
                    <h3 class="text-left mb-3">ECA ATTENDANCE</h3>
                </div>
                <div class="col-lg-7">
                    <div class=" attendance-search">
                        <el-select v-model="ddlEca" placeholder="Select ECA" class="pro-edt-select"
                                   @change="Load()">
                            <el-option
                                    v-for="item in ddlEcaList"
                                    :key="item.EcaID"
                                    :label="item.EcaName"
                                    :value="item.EcaID">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="pb-5">
                <div class="">
                    <div class="empty-list_image" v-if="attendanceList.length < 1">
                        <img src="../assets/attendance.jpg"/>
                    </div>
                    <div class="responsive-table" v-if="attendanceList.length > 0">
                        <table class="attTable">
                            <tr>
                                <th>Attendance</th>
                                <th>Student Name</th>
                                <th>Remarks</th>
                                <th>Parents Mobile</th>
                                <th>Class (Level)</th>
                            </tr>
                            <tr v-for="(item,i) in attendanceList" ref="attendanceList_Update">
                                <td :class="{'attendanceListDisableTickRow' : (item.markingStatusDisable === 'Yes') }">
                                    <vs-checkbox ref="studentCheck" v-model="item.markingStatus"
                                                 :checked="item.markingStatus === 'Yes'"
                                                 :disabled="item.markingStatusDisable === 'Yes'"></vs-checkbox>
                                </td>
                                <td :class="{'attendanceListDisableTickRow' : (item.markingStatusDisable === 'Yes') }">
                                    <label class="lblStudentName">{{ item.StudentFirstName }} {{ item.StudentLastName }} {{ item.StudentMiddleName }}</label>
                                    <input type="text" class="form-control" ref="studentIndexNo" v-model="item.EcaDtlStudentIndexNo"
                                           style="display: none;">
                                </td>
                                <td :class="{'attendanceListDisableTickRow' : (item.markingStatusDisable === 'Yes') }">
                                    <input type="text" class="form-control" ref="studentRemark" v-model="item.remarks">
                                    <div v-if="item.attClassRemarks !== ''">
                                        <label class="lblClassAttRemark">
                                            Attendance Remark: <br>
                                            <span class="lblClassAttRemarkContent">{{item.attClassRemarks}}</span>
                                        </label>
                                    </div>
                                </td>
                                <td :class="{'attendanceListDisableTickRow' : (item.markingStatusDisable === 'Yes') }">
                                    <el-popover
                                            placement="bottom"
                                            width="200"
                                            trigger="click"
                                            popper-class="mobile-popover">
                                        <el-tag v-if="item.fatherMobile !== ''"
                                                v-clipboard:copy="item.fatherMobile"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                                class="pointer">Father - {{ item.fatherMobile }}
                                        </el-tag>
                                        <el-tag v-if="item.fatherMobile === ''">Father - Nil</el-tag>
                                        <el-tag v-if="item.motherMobile !== ''"
                                                v-clipboard:copy="item.motherMobile"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                                class="pointer">Mother - {{ item.motherMobile }}
                                        </el-tag>
                                        <el-tag v-if="item.motherMobile === ''">Mother - Nil</el-tag>
                                        <el-button slot="reference" type="primary" round>Show Mobile</el-button>
                                    </el-popover>
                                </td>
                                <td>
                                    <label class="lblClassLevelName">{{ item.className }} ({{ item.levelName }})</label>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" v-if="attendanceList.length > 0">
                        <button type="button" class="btn btn-primary float-right" v-on:click="Save()">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import moment from "moment";

    export default {
        name: "EcaAttendance",
        async created() {
            await this.getEcaList();
        },
        data() {
            return {
                ddlEca: '',

                ddlEcaList: [],
                attendanceList: [],
            };
        },
        methods: {
            onCopy: function (e) {
                this.$notify.info({
                    message: e.text + ' was copied to the clipboard.'
                });
            },
            onError: function (e) {
                this.$notify.error({
                    message: ' fail to copy.'
                });
            },
            async getEcaList() {
                this.$vs.loading();
                try {
                    var todayDate = moment(new Date(), 'YYYY-MM-DD').format('DD/MM/YYYY');

                    const response = await DataSource.shared.getEcaBySchoolIDDate(todayDate);
                    if (response) {
                        this.ddlEcaList = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async Load() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.LoadEcaAttendanceList(this.ddlEca);
                    if (response) {
                        this.attendanceList = [];

                        this.attendanceListResponse = response.Table;

                        this.attendanceListResponse.forEach(m => {
                            if (m.markingStatusDisable !== 'Yes') {
                                if (m.markingStatus === 'Yes') {
                                    m.markingStatus = true;
                                } else {
                                    m.markingStatus = false;
                                }
                                this.attendanceList.push(m);
                            }
                        });
                        this.attendanceListResponse.forEach(m => {
                            if (m.markingStatusDisable === 'Yes') {
                                if (m.markingStatus === 'Yes') {
                                    m.markingStatus = true;
                                } else {
                                    m.markingStatus = false;
                                }
                                this.attendanceList.push(m);
                            }

                        });
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async Save() {
                try {
                    let attendanceList = [];

                    this.$refs.attendanceList_Update.forEach((m, index) => {
                        let currentStatus = '';

                        if (this.$refs.studentCheck[index].isChecked === false || this.$refs.studentCheck[index].isChecked === undefined) {
                            currentStatus = 'No';
                        } else {
                            currentStatus = 'Yes';
                        }

                        let attendanceListTemp = {
                            ecaID: this.ddlEca,
                            studentIndexNo: this.$refs.studentIndexNo[index].value,
                            status: currentStatus,
                            remark: this.$refs.studentRemark[index].value,
                        };

                        attendanceList.push(attendanceListTemp);
                    });

                    this.$vs.loading();
                    const response = await DataSource.shared.updateEcaAttendanceList(JSON.stringify(attendanceList));
                    if (response) {
                        if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error! Please try again later'
                            });
                        } else if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully Saved'
                            });
                        }
                    }
                    this.$vs.loading.close();
                } catch (e) {
                    this.results = e;
                }
            },
        },
    }
</script>

<style scoped>
    .attTable {
        width: 100%;
        margin-top: 20px;
    }

    .attTable td, .attTable th, .attTable label {
        text-align: center;
        padding: 10px;
    }

    .attTable tr:nth-child(even) {
        background: #fff;
    }

    .attendanceListDisableTickRow {
        background-color: #edf0f4;
        color: #c0c4cc;
    }

    .lblStudentName {
        font-weight: normal !important;
    }

    .lblClassAttRemark {
        text-align: left !important;
    }

    .lblClassAttRemarkContent {
        font-weight: normal;
    }
</style>