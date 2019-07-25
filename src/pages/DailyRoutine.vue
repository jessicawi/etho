<template>
    <div id='dailyroutine'>
        <div class="container daily-header__wrap" style="background: transparent;">
            <div class="daily-header">
                <div class="title">
                    <div class="daily-title_item">
                        <h4>DAILY ROUTINE</h4>
                        <div v-if="StudentHeader === null" class="mb-3">Please select a student ...</div>
                    </div>
                    <div class="daily-title_item">
                        <router-link :to="{name: 'Daily Routine Update By Class'}">
                            <el-button type="primary" class="d-flex" round>
                                Update By Class
                            </el-button>
                        </router-link>
                    </div>
                </div>
                <div class="routine-select">

                    <!--<div  v-for="classes of arrobj_Classes">-->
                    <!--<div    v-for="student of classes.arrobj_Student">-->
                    <!--{{student}}-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--<br/>-->

                    <el-select v-model="StudentHeader" filterable placeholder="Select Student" id="ddl_Students"
                               @input="Load" value-key="Student_ID">
                        <el-option-group
                                v-for="classes of arrobj_Classes"
                                :key="classes.id"
                                :label="classes.CLS_ClassName">
                            <el-option
                                    v-for="student of classes.arrobj_Student"
                                    :key="student.id"
                                    :label="student.First_Name + ' (' + student.Index_No + ')'"
                                    :value="student">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </div>
            </div>


        </div>
        <div class="container daily-activity__wrap" v-if="StudentHeader!==null">
            <h2 class="daily-studentName text-left">{{StudentHeader}}</h2>
            <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
            <!--<label>Select Student:</label>-->
            <!--<b-form-select v-model="obj_Student" class="mb-3" id="ddl_Students" @input="Load">-->
            <!--<optgroup v-for="classes of arrobj_Classes" :label="classes.CLS_ClassName" :key="classes.id">-->
            <!--<option v-for="student of classes.arrobj_Student" v-bind:value="student.Student_ID" :key="student.id">-->
            <!--{{student.First_Name}} : {{student.Student_ID}}-->
            <!--</option>-->
            <!--</optgroup>-->
            <!--</b-form-select>-->
            <!--</div>-->
            <div v-if="StudentHeader !== null">
                <label class="activity-title"><h5>Select Activity:</h5></label>
                <div class="daily-activity">
                    <el-form>
                        <el-form-item label="Activity">
                            <el-select v-model="ddlTaskDescription" @change="TaskDescription()">
                                <el-option key="Rest" label="Rest" value="Rest"></el-option>
                                <el-option key="Feed" label="Feed" value="Feed"></el-option>
                                <el-option key="Poop" label="Poop" value="Poop"></el-option>
                                <el-option key="Hygiene" label="Hygiene" value="Hygiene"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<select v-model='ddlTaskDescription' @change="TaskDescription()">-->
                        <!--<option>Rest</option>-->
                        <!--<option>Feed</option>-->
                        <!--<option>Poop</option>-->
                        <!--<option>Hygiene</option>-->
                        <!--</select>-->
                        <el-form-item label="Rest Type" v-if="selectionRest">
                            <el-select v-model="ddlRest">
                                <el-option key="Nap" label="Nap" value="Nap"></el-option>
                                <el-option key="Sleep" label="Sleep" value="Sleep"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<select v-model="ddlRest">-->
                        <!--<option></option>-->
                        <!--<option>Nap</option>-->
                        <!--<option>Sleep</option>-->
                        <!--</select>-->

                        <!--<div class="daily-feed">-->
                        <el-form-item label="Feed Type" v-if="selectionFeed">
                            <el-select v-model="ddlFeed" @change="TaskDescription()">
                                <el-option key="Bottle-Type" label="Bottle-Type" value="Bottle-Type"></el-option>
                                <el-option key="Solid" label="Solid" value="Solid"></el-option>
                                <el-option key="Latch On" label="Latch On" value="Latch On"></el-option>
                                <el-option key="Menu" label="Menu" value="Menu"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Bottle-Type" v-if="selectionFeedBottleType && selectionFeed">
                            <el-select v-model="ddlFeedBottleType">
                                <el-option key="Formula" label="Formula" value="Formula"></el-option>
                                <el-option key="Breast Milk" label="Breast Milk" value="Breast Milk"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Latch Side" v-if="selectionLatchOn && selectionFeed">
                            <el-select v-model="ddlLatchOn" placeholder="Latch On">
                                <el-option key="Left" label="Left" value="Left"></el-option>
                                <el-option key="Right" label="Right" value="Right"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--</div>-->

                            <!--<div class="daily-poop">-->
                        <el-form-item label="Poop Detail" v-if="selectionPoop">
                            <el-select v-model="ddlPoop" @change="TaskDescription()">
                                <el-option key="Texture" label="Texture" value="Texture"></el-option>
                                <el-option key="Color" label="Color" value="Color"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Texture Type" v-if="selectionTexture && selectionPoop">
                            <el-select v-model="ddlTexture">
                                <el-option key="Creamy" label="Creamy" value="Creamy"></el-option>
                                <el-option key="Firm" label="Firm" value="Firm"></el-option>
                                <el-option key="Hard" label="Hard" value="Hard"></el-option>
                                <el-option key="Watery" label="Watery" value="Watery"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="Poop Color" v-if="selectionColor && selectionPoop">
                            <el-select v-model="ddlColor">
                                <el-option key="Brown" label="Brown" value="Brown"></el-option>
                                <el-option key="Tan" label="Tan" value="Tan"></el-option>
                                <el-option key="Yellow" label="Yellow" value="Yellow"></el-option>
                                <el-option key="Green" label="Green" value="Green"></el-option>
                                <el-option key="Black" label="Black" value="Black"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--</div>-->

                        <el-form-item label="Hygiene Activity" v-if="selectionHygiene">
                            <el-select v-model="ddlHygiene">
                                <el-option key="Diaper change" label="Diaper change" value="Diaper change"></el-option>
                                <el-option key="Shower&Diaper change" label="Shower&Diaper change"
                                           value="Shower&Diaper change"></el-option>
                                <el-option key="Shower" label="Shower" value="Shower"></el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-time-picker type="time" v-model="txtTimeStart" value-format="hh:mm"-->
                        <!--placeholder="Get current time" v-if="selectionCurrentTime"></el-time-picker>-->

                        <el-form-item label="Start" v-if="selectionCurrentTime">
                            <el-time-select
                                    placeholder="Get current time"
                                    v-model="txtTimeStart"
                            >
                            </el-time-select>
                        </el-form-item>

                        <el-form-item label="Start" v-if="selectionStartEndTime">

                            <el-time-select
                                    placeholder="Get Start time"
                                    v-model="txtTimeStart"

                                    :picker-options="{
                            start: '08:30',
                            step: '00:10',
                            end: '20:30'
                            }">
                            </el-time-select>
                        </el-form-item>

                        <el-form-item label="End" v-if="selectionStartEndTime">
                            <el-time-select
                                    placeholder="End time"
                                    v-model="txtTimeStop"

                                    :picker-options="{
                            start: '08:30',
                            step: '00:10',
                            end: '20:30',
                            minTime: txtTimeStart
                            }">
                            </el-time-select>
                        </el-form-item>

                        <!--<el-time-picker type="time" v-model="txtTimeStart" value-format="hh:mm"-->
                        <!--placeholder="Get Start time" v-if="selectionStartEndTime"></el-time-picker>-->

                        <!--<el-time-picker type="time" v-model="txtTimeStop" value-format="hh:mm"-->
                        <!--placeholder="Get End time" v-if="selectionStartEndTime"></el-time-picker>-->
                    </el-form>
                </div>


                <div v-if="selectionRemark" class="daily-remark  mb-3 ">
                    <label class="text-left">Remark:</label>
                    <input type="text" class="form-control" v-model="txtRemark">
                    <b-button @click="btnAdd">ADD</b-button>
                </div>
            </div>
        </div>
        <div class="daily-empty" v-if="StudentHeader === null">
            <img src="../assets/daily-baby.png"/>
        </div>
        <div class="container mt-4" v-if="StudentHeader !== null">
            <div class="daily-empty" v-if="noActivity === true">
                <img src="../assets/empty-list.jpg"/>
            </div>
            <div>
                <div class="daily-timeline" v-if="noActivity === false">
                    <div class="daily-checkall">
                        <h4>Today's Activity</h4>
                        <vs-checkbox v-model="selectall" ref="isCheckAll" @click="checkAll()">Select All</vs-checkbox>
                        <!--<label class="control control&#45;&#45;checkbox">-->
                        <!--Select All-->
                        <!--<input type="checkbox" ref="isCheckAll" @click="checkAll()"/>-->
                        <!--<div class="control__indicator"></div>-->
                        <!--</label>-->
                        <!--<input class="form-control" type="checkbox" ref="isCheckAll" @click="checkAll()">-->
                        <!--<input type="checkbox" @click="checkAll()" ref="isCheckAll">-->
                    </div>

                    <div class="daily-timeline__item" v-for="(item,i) in DailyRoutineList" v-bind:value="item.drID"
                         :key="item.ID" ref="dailyRoutineList_Update" :class="item.MainReferenceType">
                        <div class="daily-item_image">
                            <img :src="getIcon(item.DrReferenceType)"/>
                        </div>
                        <div class="daily-item_desc">
                            <div class="row daily-desc_wrap">
                                <div class="col-md-9">
                                    <label class="DrReferenceType">{{item.DrReferenceType}}</label>
                                    <!--<input type="text" class="form-control" v-model="item.DrRemark" ref="refDrRemark">-->
                                    <el-input
                                            type="textarea"
                                            autosize
                                            placeholder="Remark"
                                            v-model="item.DrRemark"
                                            ref="refDrRemark">
                                    </el-input>
                                    <!--<input type="text" class="form-control" v-model="item.DrRemark" ref="refDrRemark" :value="item.DrRemark">-->
                                </div>
                                <div class="col-md-3 date">
                                    <label class="text-center daily-date-strong"><strong>{{item.DrCreatedOn_convert}}</strong></label>
                                    <label class="text-center" v-if="item.MainReferenceType !== 'Poop'">
                                        <strong v-if="item.MainReferenceType === 'Rest'">From:</strong>
                                        <strong v-else>On:</strong>
                                        {{item.DrStartTime_convert}}
                                    </label>
                                    <label class="text-center"
                                           v-if="item.MainReferenceType === 'Rest'"><strong>To:</strong>
                                        {{item.DrEndTime_convert}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="daily-item_chkitem">
                            <vs-checkbox ref="chkitems" v-model="item.checked"></vs-checkbox>
                        </div>
                        <!--<label class="lblCheckBox">-->
                        <!--<input class="form-control" type="checkbox" ref="chkitems">-->
                        <!--<span>-->
                        <!--<span>-->
                        <!--<svg class="checkmark" viewBox="0 0 24 24">-->
                        <!--<path class="checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>-->
                        <!--</svg>-->
                        <!--</span>-->
                        <!--</span>-->
                        <!--</label>-->
                    </div>

                </div>
                <!--<table border="3" class="DrTable">-->
                <!--<thead>-->
                <!--<tr>-->
                <!--<th>No.</th>-->
                <!--<th>Daily Routine Activity</th>-->
                <!--<th>Start Time</th>-->
                <!--<th>End Time</th>-->
                <!--<th>CreatedOn</th>-->
                <!--<th>Selected <br> <input type="checkbox" @click="checkAll()" ref="isCheckAll"></th>-->
                <!--<th>Remark</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr v-for="(item,i) in DailyRoutineList" v-bind:value="item.drID" :key="item.ID"-->
                <!--ref="dailyRoutineList_Update">-->
                <!--<td><label>{{i+1}}</label></td>-->
                <!--<td><img :src="getIcon(item.DrReferenceType)"/></td>-->
                <!--<td><label>{{item.DrStartTime_convert}}</label></td>-->
                <!--<td><label>{{item.DrEndTime_convert}}</label></td>-->
                <!--<td><label>{{item.DrCreatedOn_convert}}</label></td>-->
                <!--<td><input type="text" class="form-control" ref="refDrRemark" :value="item.DrRemark"></td>-->
                <!--<td>-->
                <!--<div class="form-group__wrapper row">-->
                <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox_wrapper">-->
                <!--<label class="lblCheckBox">-->
                <!--<input class="form-control" type="checkbox" ref="chkitems">-->
                <!--<span>-->
                <!--<span>-->
                <!--<svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"-->
                <!--fill="none" stroke="white"-->
                <!--d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>-->
                <!--</span>-->
                <!--</span>-->
                <!--</label>-->
                <!--</div>-->
                <!--</div>-->
                <!--</td>-->
                <!--</tr>-->
                <!--</tbody>-->
                <!--</table>-->
                <div class="row mt-3 dr-button-group" v-if="noActivity === false">
                    <div class="col-md-6">
                        <el-button type="danger" @click="btnDelete" class="float-left">Delete</el-button>
                    </div>
                    <div class="col-md-6">
                        <el-button type="primary" @click="btnUpdate" class="float-right">Update</el-button>
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
        name: "DailyRoutine",
        data() {
            return {
                obj_Student: {},
                arrobj_Classes: {},
                ddlTaskDescription: '',
                txtTimeStart: '',
                txtTimeStop: '',
                txtTimeCurrent: '',
                txtRemark: '',
                ddlRest: '',
                ddlFeed: '',
                ddlFeedBottleType: '',
                ddlLatchOn: '',
                ddlPoop: '',
                ddlTexture: '',
                ddlColor: '',
                ddlHygiene: '',

                selectionRest: '',
                selectionStartEndTime: '',
                selectionCurrentTime: '',
                selectionRemark: '',
                selectionFeed: '',
                selectionFeedBottleType: '',
                selectionLatchOn: '',
                selectionPoop: '',
                selectionTexture: '',
                selectionColor: '',
                selectionHygiene: '',
                hardCodeItem: [],
                DailyRoutineList: [],
                StudentHeader: null,
                selectedStudent: null,
                selectall: false,
                selectItem: false,
                activityClass: [],
                noActivity: false,
            };
        },
        async created() {
            this.loadStudents();
            this.loadHardCodeArray();
            this.loadHardCodeClassArray();
        },
        async mounted() {
            this.txtTimeStart = moment().format("HH:mm");
        },
        methods: {
            getIcon(value) {
                return require('../img/' + this.hardCodeItem[value]);
            },
            getClass(value) {
                return this.activityClass[value];
            },
            async loadHardCodeArray() {
                this.hardCodeItem = {

                    'Rest|Nap': "Nap.png",
                    'Rest|Sleep': 'Sleep.png',

                    'Feed|Bottle-Type|Formula': 'Formula.png',
                    'Feed|Bottle-Type|Breast Milk': 'Breast Milk.png',
                    'Feed|Solid': 'Solid.png',
                    'Feed|Latch On|Left': 'Left.png',
                    'Feed|Latch On|Right': 'Right.png',
                    'Feed|Menu': 'Menu.png',

                    'Poop|Texture|Creamy': 'Creamy.png',
                    'Poop|Texture|Firm': 'Firm.png',
                    'Poop|Texture|Hard': 'Hard.png',
                    'Poop|Texture|Watery': 'Watery.png',
                    'Poop|Color|Brown': 'Brown.png',
                    'Poop|Color|Tan': 'Tan.png',
                    'Poop|Color|Yellow': 'Yellow.png',
                    'Poop|Color|Green': 'Green.png',
                    'Poop|Color|Black': 'Black.png',

                    'Hygiene|Diaper change': 'Diaper change.png',
                    'Hygiene|Shower&Diaper change': 'Shower&Diaper Change.png',
                    'Hygiene|Shower': 'Shower.png',
                };

            },
            async loadHardCodeClassArray() {
                this.activityClass = {

                    'Rest|Nap': "rest",
                    'Rest|Sleep': 'rest',

                    'Feed|Bottle-Type|Formula': 'feed',
                    'Feed|Bottle-Type|Breast Milk': 'feed',
                    'Feed|Solid': 'feed',
                    'Feed|Latch On|Left': 'feed',
                    'Feed|Latch On|Right': 'feed',
                    'Feed|Menu': 'feed',

                    'Poop|Texture|Creamy': 'poop',
                    'Poop|Texture|Firm': 'poop',
                    'Poop|Texture|Hard': 'poop',
                    'Poop|Texture|Watery': 'poop',
                    'Poop|Color|Brown': 'poop',
                    'Poop|Color|Tan': 'poop',
                    'Poop|Color|Yellow': 'poop',
                    'Poop|Color|Green': 'poop',
                    'Poop|Color|Black': 'poop',

                    'Hygiene|Diaper change': 'hygiene',
                    'Hygiene|Shower&Diaper change': 'hygiene',
                    'Hygiene|Shower': 'hygiene',
                };

            },
            async loadStudents() {
                // this.arrobj_Classes = [];
                // await DataSource.shared.getAttendanceClass().then((result) => {
                //     return result.Table;
                // }).then((result) => {
                //     for (let obj of result) {
                //         DataSource.shared.getAllActiveStudentsByClass(obj.PK_Class_ID).then((result) => {
                //             obj.arrobj_Student = result.Table;
                //             this.arrobj_Classes.push(obj);
                //         });
                //     }
                // });

                try {
                    this.$vs.loading();
                    this.arrobj_Classes = [];
                    const response = await DataSource.shared.getAttendanceClass();
                    if (response) {
                        let tempClasses = response.Table;
                        let tempStudent = [];
                        for (let obj of tempClasses) {
                            const studentResponse = await DataSource.shared.getAllActiveStudentsByClass(obj.PK_Class_ID);
                            if (studentResponse) {
                                obj.arrobj_Student = studentResponse.Table;
                                await tempStudent.push(obj);
                                // this.arrobj_Classes = tempStudent;
                            }
                        }
                        this.arrobj_Classes = tempStudent;

                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }

            },
            checkAll() {
                try {
                    if (this.selectall === false) {

                        this.DailyRoutineList.forEach(m => {
                            m.checked = true;
                        });
                        // this.$refs.chkitems.forEach(m => {
                        //     m.checked = true;
                        //     m.check = true;
                        // });
                        // this.selectItem = true;
                    } else {

                        this.DailyRoutineList.forEach(m => {
                            m.checked = false;
                        });
                        // this.selectItem = false;
                        // this.$refs.chkitems.forEach(m => {
                        //     m.checked = false;
                        // });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            Load(Student_ID) {
                try {
                    const response = DataSource.shared.getDailyRoutineByStudentID(Student_ID.Student_ID);
                    this.StudentHeader = Student_ID.First_Name;
                    this.obj_Student = Student_ID;
                    response.then((response) => {
                        this.DailyRoutineList = (response.Table) ? response.Table : [];
                        if (response.code === '2') {
                            this.noActivity = true;
                        }
                    });

                    if (this.$refs.isCheckAll.checked === true) {
                        this.$refs.isCheckAll.checked = false;
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            TaskDescription() {
                this.selectionRest = false;
                this.selectionFeed = false;
                this.selectionPoop = false;
                this.selectionHygiene = false;
                this.selectionStartEndTime = false;
                this.selectionCurrentTime = false;
                this.selectionRemark = false;
                if (this.ddlTaskDescription === 'Rest') {
                    this.selectionRest = true;
                    this.selectionStartEndTime = true;
                    this.selectionRemark = true;
                } else if (this.ddlTaskDescription === 'Feed') {
                    this.selectionCurrentTime = true;
                    this.selectionFeed = true;
                    this.selectionFeedBottleType = false;
                    this.selectionLatchOn = false;

                    if (this.ddlFeed === "Bottle-Type") {
                        this.selectionFeedBottleType = true;
                    } else if (this.ddlFeed === "Latch On") {
                        this.selectionLatchOn = true;
                    }
                    this.selectionRemark = true;
                } else if (this.ddlTaskDescription === 'Poop') {
                    this.selectionPoop = true;
                    this.selectionTexture = false;
                    this.selectionColor = false;

                    if (this.ddlPoop === "Texture") {
                        this.selectionTexture = true;
                    } else if (this.ddlPoop === "Color") {
                        this.selectionColor = true;
                    }
                    this.selectionRemark = true;
                } else if (this.ddlTaskDescription === 'Hygiene') {
                    this.selectionHygiene = true;
                    this.selectionCurrentTime = true;
                    this.selectionRemark = true;
                }
            },
            btnAdd() {
                try {
                    let drReferenceType = '';

                    if (Object.keys(this.obj_Student).length !== 0) {

                        if (this.selectionRest === true) {
                            if (this.ddlRest === "Nap") {
                                drReferenceType = this.ddlTaskDescription + "|" + this.ddlRest;

                            } else if (this.ddlRest === "Sleep") {
                                drReferenceType = this.ddlTaskDescription + "|" + this.ddlRest;
                            }
                        } else if (this.selectionFeed == true) {
                            if (this.selectionFeedBottleType == true) {
                                if (this.ddlFeedBottleType === "Formula") {
                                    drReferenceType = this.ddlTaskDescription + "|" + this.ddlFeed + "|" + this.ddlFeedBottleType;
                                } else if (this.ddlFeedBottleType === "Breast Milk") {
                                    drReferenceType = this.ddlTaskDescription + "|" + this.ddlFeed + "|" + this.ddlFeedBottleType;
                                }
                            } else if (this.ddlFeed === "Solid") {
                                drReferenceType = this.ddlTaskDescription + "|" + this.ddlFeed;
                            } else if (this.selectionLatchOn == true) {
                                if (this.ddlLatchOn === "Left") {
                                    drReferenceType = this.ddlTaskDescription + "|" + this.ddlFeed + "|" + this.ddlLatchOn;
                                } else if (this.ddlLatchOn === "Right") {
                                    drReferenceType = this.ddlTaskDescription + "|" + this.ddlFeed + "|" + this.ddlLatchOn;
                                }

                            } else if (this.ddlFeed === "Menu") {
                                drReferenceType = this.ddlTaskDescription + "|" + this.ddlFeed;
                            }

                        } else if (this.selectionPoop == true) {
                            if (this.selectionTexture == true) {
                                drReferenceType = this.ddlTaskDescription + "|" + this.ddlPoop + "|" + this.ddlTexture;
                            } else if (this.selectionColor == true) {
                                drReferenceType = this.ddlTaskDescription + "|" + this.ddlPoop + "|" + this.ddlColor;
                            }

                        } else if (this.selectionHygiene == true) {
                            if (this.ddlHygiene === "Diaper change") {
                                drReferenceType = this.ddlTaskDescription + "|" + this.ddlHygiene;
                            } else if (this.ddlHygiene === "Shower&Diaper change") {
                                drReferenceType = this.ddlTaskDescription + "|" + this.ddlHygiene;
                            } else if (this.ddlHygiene === "Shower") {
                                drReferenceType = this.ddlTaskDescription + "|" + this.ddlHygiene;
                            }

                        }

                        let btnAddObject = [];
                        btnAddObject.DrStartTime = this.txtTimeStart;
                        btnAddObject.DrEndTime = this.txtTimeStop;
                        btnAddObject.DrRemark = this.txtRemark;
                        btnAddObject.studentIDArray = JSON.stringify(this.obj_Student.Student_ID);
                        btnAddObject.DrReferenceType = drReferenceType;


                        if (this.selectionRest === true && this.txtTimeStop === "") {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please fill in content'
                            });
                        } else if (this.selectionRest === true && this.txtTimeStart === "") {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please fill in content'
                            });
                        } else if (this.selectionFeed === true && this.txtTimeStart === "") {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please fill in content'
                            });
                        } else if (this.selectionHygiene === true && this.txtTimeStart === "") {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please fill in content'
                            });
                        } else {
                            const resp = DataSource.shared.addDailyRoutine(btnAddObject);
                            resp.then((resp) => {

                                let tempStudent = this.obj_Student;
                                let tempClass = this.arrobj_Classes;
                                Object.assign(this.$data, this.$options.data.call(this));

                                this.arrobj_Classes = tempClass;
                                this.loadHardCodeArray();

                                this.obj_Student = tempStudent;
                                this.Load(this.obj_Student);

                                if (resp.code === '1') {
                                    this.$notify({
                                        title: 'Success',
                                        message: 'Task added.',
                                        type: 'success'
                                    });

                                } else {
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Error'
                                    });
                                }
                            });
                        }

                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select student.'
                        });
                    }

                } catch (e) {
                    console.log(e);
                }
            },
            btnDelete() {
                try {
                    let Count = 0;
                    let btnDelObject = [];
                    this.DailyRoutineList.forEach((m, index) => {
                        if (m.checked === true) {
                            Count++;
                            btnDelObject.DrStudentID = m.DrStudentID;
                            btnDelObject.drID = m.DrID;
                            DataSource.shared.deleteDailyRoutine(btnDelObject);
                            this.selectall = false;
                            this.$notify({
                                title: 'Success',
                                message: 'Activity Deleted',
                                type: 'success'
                            });
                        }
                    });
                    // this.$refs.dailyRoutineList_Update.forEach((m, index) => {
                    //     if (this.$refs.chkitems[index].checked === true) {
                    //         Count++;
                    //         btnDelObject.DrStudentID = this.DailyRoutineList[index].DrStudentID;
                    //         btnDelObject.drID = this.DailyRoutineList[index].DrID;
                    //         DataSource.shared.deleteDailyRoutine(btnDelObject);
                    //     }
                    // });
                    if (Count < 1) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Nothing selected!'
                        });
                    }
                    this.Load(this.obj_Student);

                } catch (exception) {
                    alert(exception);
                }
            },
            btnUpdate() {
                try {
                    //if no checkbox is checked, pop up alert
                    let Count = 0;
                    let btnUpdateObject = [];
                    this.DailyRoutineList.forEach((m, index) => {

                        if (m.checked === true) {
                            Count++;
                            btnUpdateObject.DrStudentID = m.DrStudentID;
                            btnUpdateObject.drID = m.DrID;
                            btnUpdateObject.drRemark = m.DrRemark;
                            DataSource.shared.updateDailyRoutine(btnUpdateObject);
                            this.selectall = false;
                        }

                    });
                    // ;this.$refs.dailyRoutineList_Update.forEach((m, index) => {
                    //
                    //     if (this.$refs.chkitems[index].checked === true) {
                    //         Count++;
                    //         btnUpdateObject.DrStudentID = this.DailyRoutineList[index].DrStudentID;
                    //         btnUpdateObject.drID = this.DailyRoutineList[index].DrID;
                    //         btnUpdateObject.drRemark = this.$refs.refDrRemark[index].value;
                    //         DataSource.shared.updateDailyRoutine(btnUpdateObject);
                    //     }
                    //
                    // });
                    if (Count < 1) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Nothing selected!'
                        });
                    } else {
                        this.$notify({
                            title: 'Success',
                            message: 'Task Updated.',
                            type: 'success'
                        });
                    }
                    this.Load(this.obj_Student);
                } catch (exception) {
                    alert(exception);
                }
            },
        }
    };
</script>

<style scoped>
    .DrTable {
        width: 80%;
        margin-top: 20px;
    }

    .DrTable td, .DrTable th, .DrTable label {
        text-align: left;
        padding: 10px;
    }

    .DrTable tr:nth-child(even) {
        background: #fff;
    }

    input[type='checkbox'] {
        width: 30px;
        height: 30px;
        background: white;
        border-radius: 5px;
        border: 2px solid #555;
    }

    .checkbox_wrapper {
        min-width: 100%;
    }

    .lblCheckBox {
        width: 100%;
    }
</style>