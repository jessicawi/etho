<template>
    <div id='dailyroutine'>
        <div class="container">
            <h5 class="d-block mb-4" v-if="StudentHeader1===null">Please select a student...</h5>
            <div class="routine-select">

                <!--<div  v-for="classes of arrobj_Classes">-->
                <!--<div    v-for="student of classes.arrobj_Student">-->
                <!--{{student}}-->
                <!--</div>-->
                <!--</div>-->
                <!--<br/>-->

                <el-select v-model="StudentHeader" filterable placeholder="Select Student" id="ddl_Students"
                           @input="Load">
                    <el-option-group
                            v-for="classes of arrobj_Classes"
                            :key="classes.id"
                            :label="classes.CLS_ClassName">
                        <el-option
                                v-for="student of classes.arrobj_Student"
                                :key="student.id"
                                :label="student.First_Name + ' ' + student.Student_ID"
                                :value="student">
                        </el-option>
                    </el-option-group>
                </el-select>
            </div>
            <h2 class="daily-studentName text-left" v-if="StudentHeader!==null">{{StudentHeader}}</h2>
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
            <div>
                <div class="daily-activity">
                    <label><h5>Select Activity:</h5></label>
                    <select v-model='ddlTaskDescription' @change="TaskDescription()">
                        <option>Rest</option>
                        <option>Feed</option>
                        <option>Poop</option>
                        <option>Hygiene</option>
                    </select>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <select v-model="ddlRest" v-if="selectionRest">
                        <option></option>
                        <option>Nap</option>
                        <option>Sleep</option>
                    </select>
                </div>

                <div v-if="selectionFeed" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <select v-model='ddlFeed' @change="TaskDescription()">
                        <option>Bottle-Type</option>
                        <option>Solid</option>
                        <option>Latch On</option>
                        <option>Menu</option>
                    </select>

                    <div v-if="selectionFeedBottleType" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <select v-model='ddlFeedBottleType'>
                            <option>Formula</option>
                            <option>Breast Milk</option>
                        </select>
                    </div>

                    <div v-if="selectionLatchOn" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <select v-model='ddlLatchOn'>
                            <option>Left</option>
                            <option>Right</option>
                        </select>
                    </div>
                </div>

                <div v-if="selectionPoop" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <select v-model="ddlPoop" @change="TaskDescription()">
                        <option>Texture</option>
                        <option>Color</option>
                    </select>
                    <div v-if="selectionTexture" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <select v-model='ddlTexture' class="mb-3">
                            <option>Creamy</option>
                            <option>Firm</option>
                            <option>Hard</option>
                            <option>Watery</option>
                        </select>
                    </div>
                    <div v-if="selectionColor" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <select v-model='ddlColor'>
                            <option>Brown</option>
                            <option>Tan</option>
                            <option>Yellow</option>
                            <option>Green</option>
                            <option>Black</option>
                        </select>
                    </div>
                </div>

                <div v-if="selectionHygiene" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <select v-model='ddlHygiene'>
                        <option>Diaper change</option>
                        <option>Shower&Diaper change</option>
                        <option>Shower</option>
                    </select>
                </div>

                <div v-if="selectionCurrentTime" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <el-time-picker type="time" v-model="txtTimeStart" value-format="hh:mm"
                                    placeholder="Get current time"></el-time-picker>
                </div>

                <div v-if="selectionStartEndTime" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <el-time-picker type="time" v-model="txtTimeStart" value-format="hh:mm"
                                    placeholder="Get Start time"></el-time-picker>
                </div>
                <div v-if="selectionStartEndTime" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <el-time-picker type="time" v-model="txtTimeStop" value-format="hh:mm"
                                    placeholder="Get End time"></el-time-picker>
                </div>
                <div v-if="selectionRemark" class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    Remark:<input type="text" class="form-control" v-model="txtRemark">
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <b-button @click="btnAdd">Add</b-button>
                </div>
            </div>

            <div>
                <table border="3" class="DrTable">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Daily Routine Activity</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>CreatedOn</th>
                        <th>Selected <br> <input type="checkbox" @click="checkAll()" ref="isCheckAll"></th>
                        <th>Remark</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in DailyRoutineList" v-bind:value="item.drID" :key="item.ID"
                        ref="dailyRoutineList_Update">
                        <td><label>{{i+1}}</label></td>
                        <td><img :src="getIcon(item.DrReferenceType)"/></td>
                        <td><label>{{item.DrStartTime_convert}}</label></td>
                        <td><label>{{item.DrEndTime_convert}}</label></td>
                        <td><label>{{item.DrCreatedOn_convert}}</label></td>
                        <td><input type="text" class="form-control" ref="refDrRemark" :value="item.DrRemark"></td>
                        <td>
                            <div class="form-group__wrapper row">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox_wrapper">
                                    <label class="lblCheckBox">
                                        <input class="form-control" type="checkbox" ref="chkitems">
                                        <span>
                                            <span>
                                            <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                             fill="none" stroke="white"
                                                                                             d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <b-button @click="btnDelete">Delete</b-button>
                </div>
                <div>
                    <b-button @click="btnUpdate">Update</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

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
                selectedStudent: null
            };
        },
        async created() {
            this.loadStudents();
            this.loadHardCodeArray();
        },
        methods: {
            getIcon(value) {
                return require('../img/' + this.hardCodeItem[value]);
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
            async loadStudents() {
                console.log("go");
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
                        console.log(this.arrobj_Classes);
                    }
                } catch (e) {
                    this.results = e;
                }

            },
            checkAll() {
                try {
                    if (this.$refs.isCheckAll.checked === true) {
                        this.$refs.chkitems.forEach(m => {
                            m.checked = true;
                        });
                    } else {
                        this.$refs.chkitems.forEach(m => {
                            m.checked = false;
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            Load(Student_ID) {
                try {
                    const response = DataSource.shared.getDailyRoutineByStudentID(Student_ID.Student_ID);
                    this.StudentHeader = Student_ID.First_Name;
                    response.then((response) => {
                        this.DailyRoutineList = (response.Table) ? response.Table : [];
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
                        btnAddObject.studentID = this.obj_Student.Student_ID;
                        btnAddObject.DrReferenceType = drReferenceType;

                        const resp = DataSource.shared.addDailyRoutine(btnAddObject);
                        resp.then((resp) => {

                            let tempStudent = this.obj_Student;
                            let tempClass = this.arrobj_Classes;
                            Object.assign(this.$data, this.$options.data.call(this));

                            this.arrobj_Classes = tempClass;
                            this.loadHardCodeArray();

                            this.obj_Student = tempStudent;
                            this.Load(this.obj_Student);
                            console.log(this.obj_Student.Student_ID);

                            if (resp.code === '1') {
                                alert('Task added.');

                            } else {
                                alert('Error.');
                            }
                        });

                    } else {
                        alert("Please select student.");
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
                    this.$refs.dailyRoutineList_Update.forEach((m, index) => {
                        if (this.$refs.chkitems[index].checked === true) {
                            Count++;
                            btnDelObject.DrStudentID = this.DailyRoutineList[index].DrStudentID;
                            btnDelObject.drID = this.DailyRoutineList[index].DrID;
                            DataSource.shared.deleteDailyRoutine(btnDelObject);
                        }
                    });
                    if (Count < 1) {
                        alert("Nothing selected!");
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
                    this.$refs.dailyRoutineList_Update.forEach((m, index) => {

                        if (this.$refs.chkitems[index].checked === true) {
                            Count++;
                            btnUpdateObject.DrStudentID = this.DailyRoutineList[index].DrStudentID;
                            btnUpdateObject.drID = this.DailyRoutineList[index].DrID;
                            btnUpdateObject.drRemark = this.$refs.refDrRemark[index].value;
                            DataSource.shared.updateDailyRoutine(btnUpdateObject);
                        }

                    });
                    if (Count < 1) {
                        alert("Nothing selected!");
                    } else {
                        alert("Task Updated.");
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