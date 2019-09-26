<template>
    <div class="container-fluid fixed-height">
        <div class="row">
            <div class="col-12">
                <!--<div v-if="images != null && images.length > 0">
                    <b-carousel id="carousel1"
                                style="text-shadow: 1px 1px 2px #333;"
                                controls
                                indicators
                                background="#ababab"
                                :interval="4000"
                                v-model="slide"
                                @sliding-start="onSlideStart"
                                @sliding-end="onSlideEnd"
                    >
                        <b-carousel-slide v-for="obj_Item of images" :key="obj_Item.id">
                            <img slot="img" class="img-fluid" :src="getLowSource(obj_Item)"
                                 :alt="obj_Item.GalFileName"/>
                        </b-carousel-slide>
                    </b-carousel>
                </div>-->
                <div>
                    <input type="file" multiple class="inputfile"
                           id="FU_Portfolio"/>
                    <label for="FU_Portfolio">Choose a file</label>
                    <b-carousel v-if="arrobj_SelectedFiles != null && arrobj_SelectedFiles.length > 0" id="carousel2"
                                style="text-shadow: 1px 1px 2px #333;"
                                controls
                                indicators
                                background="#ababab"
                                :interval="4000"
                                v-model="slide"
                                @sliding-start="onSlideStart"
                                @sliding-end="onSlideEnd"
                    >
                        <b-carousel-slide v-for="(file, key) in arrobj_SelectedFiles" :key="(file, key).id">
                            <img slot="img" class="img-fluid preview" v-bind:ref="'image'+parseInt( key )"/>
                        </b-carousel-slide>
                    </b-carousel>
                    <div class="btn btn-primary" v-if="arrobj_SelectedFiles != null && arrobj_SelectedFiles.length > 0"
                         @click="clearPreview"><strong>X</strong>
                        REMOVE ALL
                    </div>
                </div>
                <form @submit.prevent="verifyPost">
                    <div class="form-group row pt-4">
                        <div class="col-md-6 formDiv"
                             :class="{ 'form-group--error': $v.obj_Post.PostPorDtlTitle.$error }">
                            <label for="tb_Title">Title</label>
                            <input v-model="obj_Post.PostPorDtlTitle" type="text" class="form-control" id="tb_Title"
                                   placeholder="Please enter a title"
                                   v-model.trim="$v.obj_Post.PostPorDtlTitle.$model"/>
                            <div class="error requiredFieldsMsg" v-if="!$v.obj_Post.PostPorDtlTitle.required">
                                <el-alert
                                        title="Title is required"
                                        type="error">
                                </el-alert>
                            </div>
                        </div>
                        <div class="col-md-6 formDiv"
                             :class="{ 'form-group--error': $v.obj_Post.PostPorDtlObservation.$error }">
                            <label for="tb_Observation">Observation</label>
                            <textarea v-model="obj_Post.PostPorDtlObservation" type="text" class="form-control"
                                      id="tb_Observation"
                                      placeholder="Please enter your observation"
                                      v-model.trim="$v.obj_Post.PostPorDtlObservation.$model"></textarea>
                            <div class="error requiredFieldsMsg" v-if="!$v.obj_Post.PostPorDtlObservation.required">
                                <el-alert
                                        title="Observation is required"
                                        type="error">
                                </el-alert>
                            </div>
                        </div>
                        <div class="col-md-6 formDiv" :class="{ 'form-group--error': $v.ddlClass.$error }">
                            <label>Class</label>
                            <el-select v-model="ddlClass" placeholder="Select Class"
                                       class="pro-edt-select fullWidth mb-3"
                                       @change="changeClass()" v-model.trim="$v.ddlClass.$model">
                                <el-option
                                        v-for="item in ddlClassList"
                                        :key="item.PK_Class_ID"
                                        :label="item.CLS_ClassName.trim() + ' ' +item.CLS_Batch.trim()"
                                        :value="item.PK_Class_ID.trim()">
                                </el-option>
                            </el-select>
                            <div class="error requiredFieldsMsg" v-if="!$v.ddlClass.required">
                                <el-alert
                                        title="Class is required"
                                        type="error">
                                </el-alert>
                            </div>
                        </div>
                        <div class="col-md-6 formDiv"
                             :class="{ 'form-group--error': $v.obj_Post.PostPorDtlDevelopmentGoals.$error }">
                            <label>Developmental Goals</label>
                            <!--<select v-model="obj_Post.PostPorDtlDevelopmentGoals" type="text" class="form-control"-->
                            <!--id="tb_Goals">-->
                            <!--<option disabled value="">Please select one</option>-->
                            <!--<option value="Option 1">Option 1</option>-->
                            <!--</select>-->
                            <el-select v-model="obj_Post.PostPorDtlDevelopmentGoals" placeholder="Select Goals"
                                       class="pro-edt-select fullWidth mb-3"
                                       @change="setValidateDropdown(obj_Post.PostPorDtlDevelopmentGoals)">
                                <el-option
                                        v-for="item in ddlGoalsList"
                                        :key="item.PlnStaDomain.trim() + ' - ' + item.PlnStaGoals.trim()"
                                        :label="item.PlnStaDomain.trim() + ' - ' + item.PlnStaGoals.trim()"
                                        :value="[item.PlnStaDomain.trim(),item.PlnStaGoals.trim()]">
                                </el-option>
                            </el-select>
                            <div class="error requiredFieldsMsg"
                                 v-if="!$v.obj_Post.PostPorDtlDevelopmentGoals.required">
                                <el-alert
                                        title="Developmental Goals is required"
                                        type="error">
                                </el-alert>
                            </div>
                        </div>
                        <div class="col-md-12 formDiv"
                             :class="{ 'form-group--error': $v.obj_Post.PostPorDtlAnalysisReflection.$error }">
                            <label>Analysis & Reflection</label>
                            <!--<select v-model="obj_Post.PostPorDtlAnalysisReflection" type="text" class="form-control"-->
                            <!--id="tb_AnalysisReflection">-->
                            <!--<option disabled value="">Please select one</option>-->
                            <!--<option value="Option 1">Option 1</option>-->
                            <!--</select>-->
                            <input v-model="obj_Post.PostPorDtlAnalysisReflection" type="text" class="form-control"
                                   placeholder="Analysis & reflection"
                                   v-model.trim="$v.obj_Post.PostPorDtlAnalysisReflection.$model"/>
                            <div class="error requiredFieldsMsg"
                                 v-if="!$v.obj_Post.PostPorDtlAnalysisReflection.required">
                                <el-alert
                                        title="Analysis & Reflection is required"
                                        type="error">
                                </el-alert>
                            </div>
                        </div>
                        <div class="col-md-12 formDiv">
                            <tags-component :parent_Post="post" @tags="setTags" :portfolio_Type="portfolio_Type"
                                            ref="studentListComponent"></tags-component>
                        </div>
                    </div>
                    <div class="row justify-content-center form-footer">
                        <div class="col-6">
                            <input type="reset" @click="resetAll" class="btn btn-secondary float-left" value="Cancel"/>
                        </div>
                        <div class="col-6">
                            <input type="submit" class="btn btn-primary " value="Submit" @click="Validation"/>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-6">
            </div>
        </div>
        <!--<div class="row col-12" v-for="obj_Class of arrobj_Classes" :key="obj_Class.id">
            <label>{{obj_Class.Str_SortBy}}</label>
            <div class="row">
                <label class="col- text-center" v-for="obj_Student of obj_Class.ArrObj_Items"
                       :key="obj_Student.id">
                    <img class="student" :src="getSource(obj_Student)"/>
                    <input type="checkbox" :value="obj_Student" v-model="obj_SelectedStudent"
                           :id="obj_Student.id">
                    <br/>
                    {{obj_Student.Student_Name}}
                </label>
            </div>
        </div>-->
    </div>
</template>
<script>
    "use strict";
    import DataSource from "../data/datasource";
    import $ from "jquery";
    import tagsComponent from "./Post_Tags_Component";
    import {required} from "vuelidate/lib/validators";

    export default {
        name: "Post_Portfolio_Component",
        data() {
            return {
                // CLS_CLassName, Profile_Img, Student_ID, Student_Name
                arrobj_Levels: [],
                arrobj_SelectedStudents: [],
                slide: 0,
                sliding: null,
                arrobj_SelectedFiles: [],
                obj_Post: {
                    PostID: "",
                    PostPorDtlTitle: "",
                    PostPorDtlObservation: "",
                    PostPorDtlAnalysisReflection: "",
                    PostPorDtlDevelopmentGoals: []
                },

                portfolio_Type: 'Yes',
                ddlClassList: [],
                ddlClass: '',
                ddlGoalsList: [],
            };
        },
        validations: {
            obj_Post: {
                PostPorDtlTitle: {
                    required
                },
                PostPorDtlObservation: {
                    required
                },
                PostPorDtlDevelopmentGoals: {
                    required
                },
                PostPorDtlAnalysisReflection: {
                    required
                }
            },
            ddlClass: {
                required
            }
        },
        methods: {
            //return a promise that resolves with a File instance
            urltoFile(url, filename, mimeType) {
                return (fetch(url)
                        .then(function (res) {
                            return res.arrayBuffer();
                        })
                        .then(function (buf) {
                            return new File([buf], filename, {type: mimeType});
                        })
                );
            },
            showLoading() {
                this.$vs.loading();
            },
            hideLoading() {
                this.$vs.loading.close();
            },
            sleep(milliseconds) {
                return new Promise(resolve => setTimeout(resolve, milliseconds));
            },
            Validation() {
                this.$v.$touch();
            },
            setValidateDropdown(value) {
                console.log(value);
                this.$v.obj_Post.PostPorDtlDevelopmentGoals.$touch()
            },
            async verifyPost() {
                try {
                    if (!this.$v.$error) {
                        this.$vs.loading();
                        if (this.isNull(this.obj_Post.PostPorDtlTitle) ||
                            this.isNull(this.obj_Post.PostPorDtlObservation) ||
                            this.isNull(this.obj_Post.PostPorDtlAnalysisReflection) ||
                            this.isNull(this.obj_Post.PostPorDtlDevelopmentGoals) ||
                            this.isNull(this.arrobj_SelectedStudents)) {

                            setTimeout(() => {
                                this.$vs.loading.close();
                            }, 500);

                            this.$emit("result", "FALSE");
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please fill in content'
                            });
                            return;
                        }

                        console.log('2');
                        await this.sleep(1000);
                        /*let studentsIds = this.arrobj_SelectedStudents.map(x => x.Student_ID);*/
                        const response = await DataSource.shared.savePortfolioPost(this.arrobj_SelectedFiles,
                            this.obj_Post.PostPorDtlTitle,
                            this.obj_Post.PostPorDtlObservation,
                            this.obj_Post.PostPorDtlAnalysisReflection,
                            this.obj_Post.PostPorDtlDevelopmentGoals[0],
                            this.obj_Post.PostPorDtlDevelopmentGoals[1],
                            this.arrobj_SelectedStudents, "", "",
                            this.obj_Post.PostID);

                        if (response) {
                            if (!this.isNull(response) && response.code === "1") {
                                this.$emit("result", "TRUE");
                                await DataSource.shared.softDeletePost(this.obj_Post.PostID);
                            } else
                                this.$emit("result", "FALSE");
                        }

                        this.$notify({
                            title: 'Success',
                            message: 'Portfolio added.',
                            type: 'success'
                        });
                        this.$vs.loading.close();
                        // DataSource.shared.savePortfolioPost(this.arrobj_SelectedFiles,
                        //     this.obj_Post.PostPorDtlTitle,
                        //     this.obj_Post.PostPorDtlObservation,
                        //     this.obj_Post.PostPorDtlAnalysisReflection,
                        //     this.obj_Post.PostPorDtlDevelopmentGoals,
                        //     this.arrobj_SelectedStudents, "", "",
                        //     this.obj_Post.PostID)
                        //     .then((result) => {
                        //
                        //         console.log("333")
                        //
                        //         if (!this.isNull(result) && result.code == "1") {
                        //             this.$emit("result", "TRUE");
                        //
                        //             DataSource.shared.softDeletePost(this.obj_Post.PostID);
                        //         }
                        //         else
                        //             this.$emit("result", "FALSE");
                        //     });
                    }

                } catch (e) {
                    this.results = e;
                }

            },
            isNull(obj) {
                return (obj === null || obj === undefined || obj === "undefined" || obj.length === 0);
            },
            init() {
                this.getStudents().then((result) => {
                    let sortedList = this.groupBy(result, "SMT_Code");

                    for (let i = 0; i < sortedList.length; i++) {
                        let temp = this.groupBy(sortedList[i].ArrObj_Items, "CRS_Course_Name");
                        sortedList[i].ArrObj_Items = temp;
                    }

                    this.arrobj_Levels = sortedList;
                    console.log(this.arrobj_Levels, "111");
                });

                this.bindClasses();
            },
            getStudents() {
                return new Promise((resolve, reject) => {
                    DataSource.shared.getAllActiveStudentsBySchool().then((result) => {
                        resolve(result.Table);
                    });
                });
            },
            onFileChanged(event) {
                this.arrobj_SelectedFiles = event.target.files;
                this.getImagePreviews();
            },
            getImagePreviews() {
                /*
                  Iterate over all of the files and generate an image preview for each one.
                */
                for (let i = 0; i < this.arrobj_SelectedFiles.length; i++) {
                    /*
                      Ensure the file is an image file
                    */
                    if (/\.(jpe?g|png|gif)$/i.test(this.arrobj_SelectedFiles[i].name)) {
                        /*
                          Create a new FileReader object
                        */
                        let reader = new FileReader();

                        /*
                          Add an event listener for when the file has been loaded
                          to update the src on the file preview.
                        */
                        reader.addEventListener("load", function () {
                            this.$refs['image' + parseInt(i)][0].src = reader.result;
                        }.bind(this), false);

                        /*
                          Read the data for the file in through the reader. When it has
                          been loaded, we listen to the event propagated and set the image
                          src to what was loaded from the reader.
                        */
                        reader.readAsDataURL(this.arrobj_SelectedFiles[i]);
                    }
                }
            },
            getSource(obj) {
                let imgsrc = "";
                if (obj.Profile_Img == null || obj.Profile_Img == "")
                    imgsrc = "data:image/png;base64,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";
                else
                    imgsrc = "data:" + obj.Profile_ImgType + ";base64," + obj.Profile_Img;
                return imgsrc;
            },
            isImage(obj_File) {
                let ext = String(obj_File.GalFileExt).toUpperCase();
                let isImage = false;

                switch (ext) {
                    case ".PNG":
                    case ".JPG":
                    case ".BMP":
                    case ".GIF":
                        isImage = true;
                        break;
                    default:
                        isImage = false;
                        break;
                }

                return isImage;
            },
            clearPreview() {
                $("#FU_Portfolio").val("");
                this.arrobj_SelectedFiles = null;
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
            }
            /*#endregion*/,
            getLowSource(file) {
                if (this.isImage(file))
                    return "data:" + file.GalFileType + ";base64," + file.GalFileLow;
                else
                    return "";
            },
            /*#region Carousel Slider*/
            onSlideStart(slide) {
                this.sliding = true;
            }
            ,
            onSlideEnd(slide) {
                this.sliding = false;
            }
            ,
            /*endregion*/
            /*#region Custom check functions*/
            isCheck(e) {
                $("#" + e.target.id).closest("div").toggleClass(["check", "uncheck"]);
            }
            ,
            selectAll() {
                $("input[type='checkbox']").each(function () {
                    if (!$(this).prop("checked"))
                        $(this).click();
                });
            }
            ,
            unselectAll() {
                $("input[type='checkbox']").each(function () {
                    if ($(this).prop("checked"))
                        $(this).click();
                });
            }
            ,
            /*#endregion*/
            setTags(value) {
                this.arrobj_SelectedStudents = value;
            },
            resetAll() {
                this.clearPreview();
                this.obj_Post = {
                    PostPorDtlTitle: "",
                    PostPorDtlObservation: "",
                    PostPorDtlAnalysisReflection: "",
                    PostPorDtlDevelopmentGoals: ""
                };
                this.$emit("result", "CANCEL");
            },
            changeClass() {
                this.$refs.studentListComponent.filterByClassIDChange(this.ddlClass);
                this.getPlannerAssignedStudentsGroupByClassID();
            },
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
            async getPlannerAssignedStudentsGroupByClassID() {
                try {
                    const response = await DataSource.shared.getPlannerAssignedStudentsGroupByClassID(this.ddlClass);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            console.log('getPlannerAssignedStudentsGroupByClassID Error');
                        } else if (response.code === '2') {
                            this.obj_Post.PostPorDtlDevelopmentGoals = '';
                            this.ddlGoalsList = [];
                        } else {
                            this.ddlGoalsList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
        },
        mounted() {
            const self = this;
            self.init();

            if (!this.isNull(this.post)) {
                console.log(this.post);
                this.obj_Post = this.post;
                this.arrobj_SelectedFiles = [];
                if (!this.isNull(this.post.postFiles)) {
                    for (let image of this.post.postFiles) {
                        let url = "data:" + image.PostItemFileExt + ";base64," + image.PostItemFile;
                        let fileName = image.PostItemID + image.PostItemFileExt;
                        let mimeType = image.PostItemFileType;
                        this.urltoFile(url, fileName, mimeType).then((file) => {
                            this.arrobj_SelectedFiles.push(file);
                        }).finally(() => {
                            this.getImagePreviews();
                        });
                    }
                }
            }

            if (!this.isNull(this.images)) {
                this.arrobj_SelectedFiles = [];
                for (let image of this.images) {
                    let url = "data:" + image.GalFileType + ";base64," + image.GalFileLow;
                    let fileName = image.GalFileName + image.GalFileExt;
                    let mimeType = image.GalFileType;
                    this.urltoFile(url, fileName, mimeType).then((file) => {
                        this.arrobj_SelectedFiles.push(file);
                    }).finally(() => {
                        this.getImagePreviews();
                    });
                }
            }


            $("#FU_Portfolio").on("change", function (e) {
                self.onFileChanged(e);
            });

        },
        components: {
            tagsComponent
        }
        ,
        props: ["images", "post"],
    };
</script>
<style scoped>
    #carousel1 img {
        height: 250px;
    }

    .fullWidth {
        width: 100%;
    }

    .formDiv {
        margin-top: 20px;
    }
</style>