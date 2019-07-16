<template>
    <div id="busattendance">
        <div class="container admin-wrap">
            <div class="row header mb-5">
                <div class="col-lg-5 ">
                    <h3 class="text-left mb-3">BUS ATTENDANCE</h3>
                </div>
                <div class="col-lg-7">
                    <div class=" attendance-search">
                        <el-select v-model="ddlBus" placeholder="Select Bus" class="pro-edt-select"
                                   @change="Load()">
                            <el-option
                                    v-for="item in ddlBusList"
                                    :key="item.BusNo"
                                    :label="item.BusNo"
                                    :value="item.BusNo">
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
                            </tr>
                            <tr v-for="(item,i) in attendanceList" ref="attendanceList_Update">
                                <td :class="{'attendanceListDisableTickRow' : (item.markingStatusDisable === 'Yes') }">
                                    <vs-checkbox ref="studentCheck" v-model="item.markingStatus"
                                                 :checked="item.markingStatus === 'Yes'"
                                                 :disabled="item.markingStatusDisable === 'Yes'"></vs-checkbox>
                                </td>
                                <td :class="{'attendanceListDisableTickRow' : (item.markingStatusDisable === 'Yes') }">
                                    <label>{{ item.Full_Name }} {{ item.Middle_name }} {{ item.Last_name }}</label>
                                    <input type="text" class="form-control" ref="studentIndexNo" v-model="item.Index_No"
                                           style="display: none;">
                                </td>
                                <td :class="{'attendanceListDisableTickRow' : (item.markingStatusDisable === 'Yes') }">
                                    <input type="text" class="form-control" ref="studentRemark" v-model="item.remarks">
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
                                    <!--<select class="parentsMobileNo">-->
                                    <!--<option v-if="item.fatherMobile !== ''">Father - {{ item.fatherMobile }}-->
                                    <!--</option>-->
                                    <!--<option v-if="item.fatherMobile === ''">Father - Nil</option>-->
                                    <!--<option v-if="item.motherMobile !== ''">Mother - {{ item.motherMobile }}-->
                                    <!--</option>-->
                                    <!--<option v-if="item.motherMobile === ''">Mother - Nil</option>-->
                                    <!--</select>-->
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="" v-if="attendanceList.length > 0">
                        <button type="button" class="btn btn-primary float-right" v-on:click="Save()">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";

    export default {
        name: "BusAttendance",
        async created() {
            await this.getBusList();
        },
        data() {
            return {
                ddlBus: '',

                ddlBusList: [],
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
            async getBusList() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getBusMasterList();
                    if (response) {
                        this.ddlBusList = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async Load() {
                try {
                    if (this.ddlBus === '') {
                        this.$notify.error({
                            title: 'Require',
                            message: 'Please select bus'
                        });
                    } else {
                        this.$vs.loading();
                        const response = await DataSource.shared.LoadBusAttendanceList(this.ddlBus);
                        if (response) {
                            if (response.code === '2') {
                                this.$notify.error({
                                    title: 'No Record',
                                    message: 'No student assign to this bus'
                                });
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error! Please try again later'
                                });
                            } else if (response.code === '88') {
                                window.location.replace('/');
                            } else {
                                this.attendanceList = [];

                                this.attendanceListResponse = response.Table;
                                // this.attendanceListResponse.forEach(m => {
                                //     if (m.markingStatus === 'Yes') {
                                //         m.markingStatus = true;
                                //     } else {
                                //         m.markingStatus = false;
                                //     }
                                //     this.attendanceList.push(m);
                                // });

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

                                //this.attendanceList = response.Table;
                            }
                        }
                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }
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
                            busNo: this.ddlBus,
                            studentIndexNo: this.$refs.studentIndexNo[index].value,
                            status: currentStatus,
                            remark: this.$refs.studentRemark[index].value,
                        };

                        attendanceList.push(attendanceListTemp);
                    });

                    console.log(attendanceList);
                    this.$vs.loading();
                    const response = await DataSource.shared.updateBusAttendanceList(JSON.stringify(attendanceList));
                    if (response) {
                        if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error! Please try again later'
                            });
                        } else if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            //window.location.replace('/BusAttendance');
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
    };
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

    .parentsMobileNo {
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
    }

    .attendanceListDisableTickRow {
        background-color: #edf0f4;
        color: #c0c4cc;
    }
</style>