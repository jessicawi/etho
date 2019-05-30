<template>
    <div class="container-fluid">
        <div class="form-group row promotion-modal-tag" v-if="showStudentTag === true">
            <el-tag
                    :key="student.Student_ID"
                    v-for="student in selectedStudents"
                    closable
                    :disable-transitions="false"
                    @close="RemoveSelectedStudent(student.Student_ID)">
                {{student.Student_Name}}
            </el-tag>
        </div>


        <div class="row promotion-clear-select" v-if="isStudent === true">
            <div class="col-6">
            </div>
            <div class="col-6">
                <button class="btn btn-secondary float-right" @click="clearSelection"><i class="material-icons">
                    cancel
                </i> Clear
                </button>
            </div>
        </div>
        <div class="form-group row">
            <label for="ddl_NewYear">Academic Year</label>
            <select id="ddl_NewYear" class="mb-3 form-control" v-model="obj_SelectedNewYear"
                    @change="loadNewClasses">
                <option v-for="tempobj_AcademicYear of arrobj_NewAcademicYears" :value="tempobj_AcademicYear"
                        :key="tempobj_AcademicYear.id">
                    {{tempobj_AcademicYear.SMT_Code + ": " + tempobj_AcademicYear.SMT_From_convert + " - " +
                    tempobj_AcademicYear.SMT_To_convert}}
                </option>
            </select>
        </div>

        <div class="form-group row">
            <label for="ddl_NewClass">Class </label>
            <select id="ddl_NewClass" class="mb-3 form-control" v-model="obj_SelectedNewClass" @change="emitclasslevel">
                <optgroup v-for="tempobj_Level of arrobj_NewClasses" :label="tempobj_Level.Str_SortBy"
                          :key="tempobj_Level.id">
                    <option v-for="tempobj_Class of tempobj_Level.ArrObj_Items" :value="tempobj_Class"
                            :key="tempobj_Class.id">
                        {{tempobj_Class.CLS_ClassName}} of {{tempobj_Class.CLS_Batch}}
                    </option>
                </optgroup>
            </select>
        </div>

        <div class="row" v-if="showStudentTag === true">
            <div class="col-6">
                <button class="btn btn-primary" @click="promoteStudents">OK</button>
            </div>
            <div class="col-6">
                <button class="btn btn-secondary" @click="close">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    "use strict";
    import $ from 'jquery';
    import DataSource from "../data/datasource";

    export default {
        name: "Promotion_Component",
        data() {
            return {
                arrobj_NewAcademicYears: null,
                arrobj_NewClasses: null,
                obj_SelectedNewYear: null,
                obj_SelectedNewClass: null,
                filterStudents: "",
                nextlvl: null
            };
        },
        props: ["selectedStudents", "courseId", "arrobjSelectedStudentID", "showStudentTag", "isStudent"],
        // props: {selectedStudents: [Array], CourseId: String, arrobjSelectedStudentID: [Array]},
        methods: {
            clearSelection() {
                if (this.isStudent === true) {
                    this.obj_SelectedNewYear = "";
                    this.obj_SelectedNewClass = "";
                }
            },
            sleep(milliseconds) {
                return new Promise(resolve => setTimeout(resolve, milliseconds));
            },
            isNull(obj) {
                return (obj === null || obj === undefined || obj === "undefined");
            },
            RemoveSelectedStudent(student) {
                this.selectedStudents = this.selectedStudents.filter(d => {
                    return d.Student_ID !== student;
                });
                this.arrobjSelectedStudentID = this.arrobjSelectedStudentID.filter(d => {
                    return d !== student;
                });
            },
            async promoteStudents() {
                let str_StudentIDs = "";
                for (let i of this.arrobjSelectedStudentID) {
                    str_StudentIDs += i + ",";
                }


                str_StudentIDs = str_StudentIDs.substr(0, str_StudentIDs.length - 1);
                if (this.obj_SelectedNewYear === null || this.obj_SelectedNewClass === null) {

                    this.$notify.error({
                        title: 'Error',
                        message: 'Please fill in content'
                    });
                } else {

                    this.showLoading();
                }
                await DataSource.shared.saveStudentPromotions(str_StudentIDs, this.obj_SelectedNewYear.PK_Semester_ID, this.obj_SelectedNewClass.PK_Course_ID, this.obj_SelectedNewClass.PK_Class_ID).then((result) => {

                    this.hideLoading();
                    if (!this.isNull(result) && result.code === "1") {
                        this.$notify({
                            title: 'Success',
                            message: 'Students Promoted',
                            type: 'success'
                        });
                    } else if (!this.isNull(result) && result.code === "2") {
                        this.$notify({
                            title: 'Student Exceeded',
                            message: 'Number of students assign to this class have excceded max number of class',
                            type: 'success'
                        });
                    }
                    this.$emit("result", true);
                });
                // this.filterStudents = this.selectedStudents;

                this.hideLoading();
            },
            emitclasslevel() {
                if (this.isStudent === true) {
                    console.log("isstudent");
                    this.$emit('studentPromoteAction', this.obj_SelectedNewYear.PK_Semester_ID, this.obj_SelectedNewClass.PK_Course_ID, this.obj_SelectedNewClass.PK_Class_ID);
                }
            },
            loadNewYears() {
                DataSource.shared.getAcademicYear().then((result) => {
                    this.arrobj_NewAcademicYears = result.Table;
                });
            },
            loadNewClasses() {
                if (this.isNull(this.obj_SelectedNewYear))
                    return;

                this.arrobj_NewClasses = null;

                let promise_NextLevel = new Promise((resolve) => {
                    DataSource.shared.getNextLevel(this.courseId).then((result) => {
                        resolve(result.Table[0]);
                        this.nextlvl = result.Table;
                    });
                });

                let promise_Classes = new Promise((resolve) => {
                    DataSource.shared.getClassByAcademicYear(this.obj_SelectedNewYear.PK_Semester_ID).then((result) => {
                        resolve(this.groupBy(result.Table, "CRS_Course_Name"));
                    });
                });

                Promise.all([promise_NextLevel, promise_Classes]).then((result) => {
                    let obj_NextLevel = result[0];
                    let temparrobj_Classes = result[1];
                    let index = temparrobj_Classes.findIndex(x => x.Str_SortBy === obj_NextLevel.CRS_Course_Name);

                    // this.arrobj_NewClasses = temparrobj_Classes.splice(0, index + 1);
                    for (let obj of this.nextlvl) {
                        this.arrobj_NewClasses = temparrobj_Classes.filter(d => {
                            return d.Str_SortBy === obj.CRS_Course_Name;
                        });
                    }
                });

                /*let obj_NextLevel =

                let temparrobj_Classes = DataSource.shared.getClassByAcademicYear(this.obj_SelectedNewYear.PK_Semester_ID).then((result) => {
                    if (result.code == 2 || result.code == 99)
                        return;

                    return this.groupBy(result.Table, "CRS_Course_Name");
                });*/

                /*let temparrobj_Classes = new Promise((resolve, reject) => {
                    DataSource.shared.getClassByAcademicYear(this.obj_SelectedNewYear.PK_Semester_ID).then((result) => {
                        if (result.code == 2 || result.code == 99) {
                            this.obj_SelectedNewClass = null;
                            return;
                        }

                        resolve this.groupBy(result.Table, "CRS_Course_Name");
                    });
                });

                temparrobj_Classes.then((result) => {
                    DataSource.shared.getNextLevel(this.obj_SelectedClass.PK_Course_ID).then((result) => {
                        console.log(result);
                    });
                });*/


                /*DataSource.shared.getNextLevel(this.obj_SelectedClass.PK_Course_ID).then((result) => {
                    console.log(result.Table[0].CRS_Course_Name)
                    console.log(result);
                });*/
            },
            close() {
                this.$emit("result", true);
            },

            /*#region Array Grouping Function*/
            groupBy(data, key) {
                //Credits to Ceasar Bautista and Juan Castillo @ stackoverflow
                /*return data.reduce(function(storage, item) {
                    let group = item[key];

                    storage[group] = storage[group] || [];
                    storage[group].push(item);
                    return storage;
                }, {});*/

                let ArrObj_Sorted = [];

                for (let item of data) {
                    let index = ArrObj_Sorted.findIndex(x => x.Str_SortBy === item[key]);

                    if (index === -1) {
                        ArrObj_Sorted.push({Str_SortBy: item[key], ArrObj_Items: [item]});
                    } else
                        ArrObj_Sorted[index].ArrObj_Items.push(item);
                }

                return ArrObj_Sorted;
            },
            /*#endregion*/

            /*#region Loader Functions*/
            showLoading() {
                this.$vs.loading();
            }
            ,
            hideLoading() {
                this.$vs.loading.close();
            }
            ,
            /*#endregion*/
        },
        mounted() {
            this.loadNewYears();
            this.loadNewClasses();
            // this.loadStudentID();

            // this.filterStudents = this.selectedStudents;
            // this.arrobjSelectedStudentID = this.selectedStudents.map(d => d.Student_ID);


        }
    };
</script>

<style scoped>

</style>