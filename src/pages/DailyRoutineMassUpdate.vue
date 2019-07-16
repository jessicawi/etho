<template>
    <div id='dailyroutine'>
        <div class="container daily-header__wrap" style="background: transparent;">
            <div class="daily-header">
                <div class="title">
                    <h4>DAILY ROUTINE MASS UPDATE</h4>
                    <div v-if="StudentHeader === null" class="mb-3">Please select a student ...</div>
                </div>
                <div class="routine-select">
                    <el-select v-model="ClassSelected" filterable placeholder="Select Class" id="ddl_Students"
                               @input="LoadClass">
                        <el-option
                                v-for="classes in arrobj_Classes"
                                :key="classes.id"
                                :label="classes.CLS_ClassName"
                                :value="classes.PK_Class_ID">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="dailyRoutine-student container"
             v-if="selectedClassStudent && selectedClassStudent.length > 0 && showViewActiivity !== true">
            <div class="div_Student " v-for="student of selectedClassStudent"
                 :key="student.Student_ID">
                <label class="col- text-center" :for="student.Student_ID">
                    <img class="student" :src="getSource(student)"/>
                    <input type="checkbox" :value="student"
                           v-model="arrobj_SelectedStudents"
                           :id="student.Student_ID" @change="isCheck"/>
                    <br/>
                    <span v-if="!isNull(student.First_Name)">{{student.First_Name}}</span>
                    <span v-if="!isNull(student.Middle_Name)">{{" " + student.Middle_Name}}</span>
                    <span v-if="!isNull(student.Last_Name)">{{" " + student.Last_Name}}</span>
                    <span v-if="!isNull(student.Index_No)" class="d-block">{{" " + student.Index_No}}</span>
                    <div class="dr-view_activity">
                            <el-button type="primary" id="btn-view_activity"
                                       @click="Load(student.Student_ID)" slot="reference">
                                VIEW ACTIVITY
                            </el-button>
                    </div>
                </label>

            </div>
            <el-button type="primary" id="btn_PromoteSelected" style="z-index: 2;"
                       v-if="!this.isNull(arrobj_SelectedStudents) && arrobj_SelectedStudents.length > 0"
                       @click="showActivity" class="d-flex">
                <i class="material-icons">thumb_up_alt</i> UPDATE
            </el-button>
        </div>
        <b-modal id="activityModal" hide-footer title="ADD Activity" v-model="activityModal" hide-header>
            <div class="container daily-activity__wrap">
                <div>
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
                            <el-form-item label="Rest Type" v-if="selectionRest">
                                <el-select v-model="ddlRest">
                                    <el-option key="Nap" label="Nap" value="Nap"></el-option>
                                    <el-option key="Sleep" label="Sleep" value="Sleep"></el-option>
                                </el-select>
                            </el-form-item>
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
                            <el-form-item label="Hygiene Activity" v-if="selectionHygiene">
                                <el-select v-model="ddlHygiene">
                                    <el-option key="Diaper change" label="Diaper change"
                                               value="Diaper change"></el-option>
                                    <el-option key="Shower&Diaper change" label="Shower&Diaper change"
                                               value="Shower&Diaper change"></el-option>
                                    <el-option key="Shower" label="Shower" value="Shower"></el-option>
                                </el-select>
                            </el-form-item>
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
                        </el-form>
                    </div>
                    <div v-if="selectionRemark" class="daily-remark  mb-3 ">
                        <label class="text-left">Remark:</label>
                        <input type="text" class="form-control" v-model="txtRemark">
                        <b-button @click="btnAdd">ADD</b-button>
                    </div>
                </div>
            </div>
        </b-modal>
        <div class="daily-empty" v-if="selectedClassStudent && selectedClassStudent.length < 1 ">
            <img src="../assets/daily-baby.png"/>
        </div>
        <el-collapse-transition>
        <div class="container mt-4" v-if="showViewActiivity === true">
            <div class="daily-empty" v-if="noActivity === true && showViewActiivity === true">
                <img src="../assets/empty-list.jpg"/>
                <el-button type="primary" id="" @click="backToList" class="d-flex">
                    BACK
                </el-button>
            </div>
            <div>
                <div class="daily-timeline" v-if="noActivity === false && showViewActiivity === true">
                    <div class="daily-checkall">
                        <h4>Today's Activity</h4>
                        <vs-checkbox v-model="selectall" ref="isCheckAll" @click="checkAll()">Select All</vs-checkbox>
                        <div class="daily-timeline__btn">
                            <el-button type="primary" round @click="backToList" class="d-flex" v-if="showViewActiivity === true">
                                <i class="material-icons">
                                    keyboard_arrow_left
                                </i>
                                Back to Student List
                            </el-button>
                        </div>
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
                                    <el-input
                                            type="textarea"
                                            autosize
                                            placeholder="Remark"
                                            v-model="item.DrRemark"
                                            ref="refDrRemark">
                                    </el-input>
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
                    </div>
                </div>

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
        </el-collapse-transition>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";
    import moment from "moment";
    import $ from 'jquery';

    export default {
        name: "DailyRoutine2",
        data() {
            return {
                obj_Student: [],
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
                StudentHeader: [],
                selectedStudent: null,
                selectall: false,
                selectItem: false,
                activityClass: [],
                noActivity: false,

                //----------------//
                selectedClassStudent: [],
                arrobj_SelectedStudents: [],
                ClassSelected: null,
                activityModal: false,
                showViewActiivity: false,

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
            getSource(obj) {
                let imgsrc = "";
                if (obj.Profile_Img == null || obj.Profile_Img == "")
                    imgsrc = "data:image/png;base64,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";
                else
                    imgsrc = "data:" + obj.Profile_ImgType + ";base64," + obj.Profile_Img;
                return imgsrc;
            },
            isCheck(e) {
                console.log("111");
                $("#" + e.target.id).parent().toggleClass(["check"]);
            },
            unselectAll() {
                $("input[type='checkbox']").each(function () {
                    if ($(this).prop("checked"))
                        $(this).click();
                });
            },
            backToList(){
              this.showViewActiivity = false;
              this.noActivity = false;
            },
            showActivity() {
                this.activityModal = true;
                this.StudentHeader = this.arrobj_SelectedStudents.map(d => d.First_Name);
            },
            isNull(obj) {
                return (obj === null || obj === undefined || obj === "undefined" || obj.length === 0);
            },
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
                console.log("student");
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
                        this.$vs.loading.close();
                        let tempClasses = response.Table;
                        // let tempStudent = [];
                        // for (let obj of tempClasses) {
                        //     const studentResponse = await DataSource.shared.getAllActiveStudentsByClass(obj.PK_Class_ID);
                        //     if (studentResponse) {
                        //         obj.arrobj_Student = studentResponse.Table;
                        //         await tempStudent.push(obj);
                        //         // this.arrobj_Classes = tempStudent;
                        //     }
                        // }
                        this.arrobj_Classes = tempClasses;
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
                        //
                        // console.log("aa");
                        // this.$refs.chkitems.forEach(m => {
                        //     m.checked = true;
                        //     m.check = true;
                        // });
                        // this.selectItem = true;
                        // console.log(this.selectItem);
                    } else {

                        this.DailyRoutineList.forEach(m => {
                            m.checked = false;
                        });

                        //
                        //
                        // console.log("bbs");
                        // this.selectItem = false;
                        // this.$refs.chkitems.forEach(m => {
                        //     m.checked = false;
                        // });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async LoadClass() {
                try {
                    let tempStudent = [];
                    const studentResponse = await DataSource.shared.getAllActiveStudentsByClass(this.ClassSelected);
                    if (studentResponse) {
                        console.log(studentResponse);
                        // obj.arrobj_Student = studentResponse.Table;
                        // await tempStudent.push(obj);
                        this.selectedClassStudent = studentResponse.Table;
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            Load(Student_ID) {
                console.log(Student_ID, "Student_ID");
                try {
                    const response = DataSource.shared.getDailyRoutineByStudentID(Student_ID);
                    // this.StudentHeader = Student_ID.First_Name;
                    // this.obj_Student = Student_ID;
                    response.then((response) => {
                        this.DailyRoutineList = (response.Table) ? response.Table : [];
                        this.showViewActiivity = !this.showViewActiivity;
                        if (response.code === '2') {
                            console.log("noach");
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
                console.log(this.ddlTaskDescription);
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

                    this.obj_Student = this.arrobj_SelectedStudents.map(d => d.Student_ID);

                    if (Object.keys(this.arrobj_SelectedStudents).length !== 0) {

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
                        btnAddObject.studentIDArray = JSON.stringify(this.obj_Student);
                        btnAddObject.DrReferenceType = drReferenceType;

                        console.log(btnAddObject.studentID);
                        // if (this.txtTimeStop === null || this.txtTimeStart === null || this.txtTimeStop === "" || this.txtTimeStart === ""){
                        //     this.$notify.error({
                        //         title: 'Error',
                        //         message: 'Please fill in content'
                        //     });
                        // }else{


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
                            console.log("33");
                            const resp = DataSource.shared.addDailyRoutine(btnAddObject);
                            resp.then((resp) => {

                                // let tempStudent = this.obj_Student;
                                // let tempClass = this.arrobj_Classes;
                                // Object.assign(this.$data, this.$options.data.call(this));

                                // this.arrobj_Classes = tempClass;
                                // this.loadHardCodeArray();

                                // this.obj_Student = tempStudent;
                                // this.Load(this.obj_Student);

                                if (resp.code === '1') {
                                    this.$notify({
                                        title: 'Success',
                                        message: 'Task added.',
                                        type: 'success'
                                    });
                                    this.show3 === false;
                                    this.activityModal = false;
                                    this.arrobj_SelectedStudents = [];
                                    this.unselectAll();

                                    // alert('Task added.');

                                } else {
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Error'
                                    });
                                    // alert('Error.');
                                }
                            });
                        }

                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select student.'
                        });
                        // alert("Please select student.");
                    }

                } catch (e) {
                    alert(e);
                    console.log(e);
                }
            },
            btnDelete() {
                try {
                    let Count = 0;
                    let btnDelObject = [];
                    this.DailyRoutineList.forEach((m, index) => {
                        if (m.checked === true) {
                            console.log("go");
                            Count++;
                            btnDelObject.DrStudentID = m.DrStudentID;
                            btnDelObject.drID = m.DrID;
                            DataSource.shared.deleteDailyRoutine(btnDelObject);
                            console.log("deleted");
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
                        // alert("Nothing selected!");
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
                    console.log(this.DailyRoutineList);
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
                        // alert("Nothing selected!");
                    } else {
                        this.$notify({
                            title: 'Success',
                            message: 'Task Updated.',
                            type: 'success'
                        });
                        // alert("Task Updated.");
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

    /* TRANSITION */
    /* always present */
    .expand-transition {
        transition: all 0.5s ease;
    }

    /* .expand-enter defines the starting state for entering */
    /* .expand-leave defines the ending state for leaving */
    .expand-enter, .expand-leave {
        height: 0;
        opacity: 0;
    }
</style>