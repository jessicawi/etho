<template>
    <div class="container-fluid">

        <div class="row">
            <div class="col-12">
                <form class="needs-validation form-style vs-con-loading__container" novalidate
                      @submit.prevent="onSubmit" id="div-with-loading">
                    <div class="mb-3 form-group" :class="{ 'form-group--error': $v.addPostContent.$error }">
                        <!--<label for="username">Username</label>-->
                        <textarea type="text" class="form-control" id="postContent" v-model="addPostContent"
                                  placeholder="CONTENT" v-model.trim="$v.addPostContent.$model"></textarea>
                        <div class="error requiredFieldsMsg" v-if="!$v.addPostContent.required">
                            <el-alert
                                    title="Content is required"
                                    type="error">
                            </el-alert>
                        </div>
                    </div>
                    <!--<div class="row">
                        <div class="col-md-6 ">
                            <label :for="tagClassID">Class</label>
                            <select class="form-control" id="tagClassID" v-model="tagClassID">
                                <option v-for="object in classesTable" :key="object.PK_Class_ID"
                                        :value="object.PK_Class_ID">{{object.CLS_ClassName}}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="tagLevelID">Level</label>
                            <select class="form-control" id="tagLevelID" v-model="tagLevelID">
                                <option v-for="object in levelsTable" :key="object.PK_Class_ID"
                                        :value="object.SC_FK_CourseID">{{object.CRS_Course_Name}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Student</label>
                            <vue-tags-input
                                    v-model="tag"
                                    :tags="tags"
                                    :allow-edit-tags="true"
                                    :autocomplete-items="items"
                                    :add-only-from-autocomplete="true"
                                    :autocomplete-min-length="3"
                                    placeholder="Min 3 Character"
                                    class="tags-input"
                                    @tags-changed="newTags => tags = newTags"
                            />
                        </div>
                    </div>-->
                    <tags-component @tags="setTags" :parent_Post="post"></tags-component>
                    <div class="row inputFile-box">
                        <div class="col-md-12">
                            <input type="file" multiple @change="onFileChanged" ref="fileupload" class="inputfile"
                                   id="inputfile"
                                   data-multiple-caption="{count} files selected">
                            <label for="inputfile">Choose a file</label>

                            <div class="btn btn-primary" v-if="selectedFile" @click="clearPreview()"><strong>X</strong>
                                REMOVE ALL
                            </div>
                            <div class="uploadFile-image">
                                <div v-for="(file, key) in selectedFile" class="col-md-3 file-listing"
                                     :key="(file, key).id"
                                     v-if="checkIfImage(file)">
                                    <img class="preview" v-bind:ref="'image'+parseInt( key )"/>
                                    <span @click="removePreviewImg(file.name)" class="clearFile-single"><i class="el-icon-error"></i></span>
                                </div>
                                <div v-for="(file, key) in selectedFile" class="col-md-3 file-listing nonimg-uploadFile"
                                     :key="(file, key).id"
                                     v-if="!checkIfImage(file)">
                                    <i class="el-icon-tickets"></i> {{ file.name }}
                                    <span @click="removePreviewImg(file)" class="clearFile-single"><i class="el-icon-error"></i> </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-2">

                    </div>
                    <!--<div class="system-msg" v-bind:class="{'bg-danger': systemmsgError===true}">{{results}}-->
                    <!--<p v-if="error" style="color: red">{{error}}</p></div>-->
                    <div class="row d-flex  form-footer">
                        <div class="col-md-6">
                            <b-btn @click="resetAll" class="float-left btn-secondary">Cancel</b-btn>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-primary " type="submit" @click="Validation">Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import VueTagsInput from '@johmun/vue-tags-input';
    import isImage from "is-image";
    import DataSource from "../data/datasource";
    import tagsComponent from "./Post_Tags_Component";
    import $ from "jquery";
    import {removeElementFromArray} from "../helper/utily";
    import {required} from "vuelidate/lib/validators";

    export default {
        name: "updatesComponent",
        data() {
            return {
                PostID: "",
                addPostContent: "",
                tagClassID: "",
                tagLevelID: "",
                classesTable: [],
                levelsTable: [],
                tag: '',
                tags: [],
                selectedFile: [],
                systemmsgError: false,
                error: "",
                results: "",
                academicYearTable: [],
                studentTable: [],
                loading: false,
                uploadedFiles: []
            };
        },
        validations: {
            addPostContent: {
                required
            },
        },
        methods: {
            sleep(milliseconds) {
                return new Promise(resolve => setTimeout(resolve, milliseconds));
            },
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
            isNull(obj) {
                return (obj === null || obj === undefined || obj === "undefined");
            },
            resetAll() {
                this.clearPreview();
                this.$emit("result", "CANCEL");
            },
            init() {
                DataSource.shared.getPostDropdown().then((tagResponse) => {
                    if (tagResponse.AcademicYearTable && tagResponse.AcademicYearTable.Table) {
                        let uniqueYears = [];
                        tagResponse.AcademicYearTable.Table.forEach(object => {
                            const isExist = uniqueYears.find(year => year.SMT_Code === object.SMT_Code);
                            if (!isExist) {
                                uniqueYears.push(object);
                            }
                        });
                        this.academicYearTable = uniqueYears;
                    }
                    if (tagResponse.ClassesTable && tagResponse.ClassesTable.Table) {
                        let uniqueClass = [];
                        tagResponse.ClassesTable.Table.forEach(object => {
                            const isExist = uniqueClass.find(year => year.PK_Class_ID === object.PK_Class_ID);
                            if (!isExist) {
                                uniqueClass.push(object);
                            }
                        });
                        this.classesTable = uniqueClass;
                    }
                    if (tagResponse.LevelsTable && tagResponse.LevelsTable.Table) {

                        let uniqueLevel = [];
                        tagResponse.LevelsTable.Table.forEach(object => {
                            const isExist = uniqueLevel.find(level => level.SC_FK_CourseID === object.SC_FK_CourseID);
                            if (!isExist) {
                                uniqueLevel.push(object);
                            }
                        });

                        this.levelsTable = uniqueLevel;
                    }
                    if (tagResponse.StudentTable && tagResponse.StudentTable.Table) {
                        let uniqueStudent = [];
                        tagResponse.StudentTable.Table.forEach(object => {
                            const isExist = uniqueStudent.find(student => student.Student_ID === object.Student_ID);
                            if (!isExist) {
                                const selectedValue = {
                                    Student_ID: object.Student_ID,
                                    text: object.Full_Name,
                                    Sex: object.Sex,
                                    // email: object.email,
                                    Status: object.Status
                                };
                                uniqueStudent.push(selectedValue);
                            }
                        });
                        // this.studentTable = tagResponse.StudentTable.Table;
                        this.studentTable = uniqueStudent;
                    }
                });
            },
            onFileChanged(event) {
                // this.selectedFile = event.target.files;
                for (let file of event.target.files) {
                    if (file.size > 10048576) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'File limit exceeded 10MB!'
                        });
                    } else {
                        this.selectedFile.push(file);
                    }
                }
                // if (this.selectedFile.size > 5048576) {
                //     alert("File is too big!");
                //     this.selectedFile = "";
                // }
                this.getImagePreviews();
            },
            inputChange(input) {
                this.postContent = input;
            },
            checkIfImage(file) {
                const fileType = file.type.toLowerCase();
                switch (fileType) {
                    case "image/jpeg":
                    case "image/png":
                    case "image/jpg":
                        return true;
                    default:
                        return false;
                }
            },
            isImageByExt(obj_File) {
                let ext = String(obj_File.PostItemFileExt).toUpperCase();
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
            successMsg() {

            },
            errorMsg() {

            },
            Validation(){
                this.$v.$touch();
            },
            async onSubmit() {
                if (!this.$v.$error) {
                    this.error = "";
                    this.$vs.loading();
                    await this.sleep(500);
                    //this.results = "<< Requesting.. >>";
                    try {
                        /*const studentsIds = this.tags.map(d => d.Student_ID);*/


                        const saveResponse = await DataSource.shared.savePostUpdate(this.selectedFile, this.addPostContent, this.tags, this.tagClassID, this.tagLevelID, this.PostID);
                        if (saveResponse) {

                            if (saveResponse.code == "1")
                                this.$emit("result", "TRUE");
                            else
                                this.$emit("result", "FALSE");
                            switch (saveResponse.code) {
                                case "1":
                                    this.$emit("loadPosts");
                                    this.isModalOpen = false;
                                    // reset all input filed to blank
                                    this.selectedFile = [];
                                    this.$refs.fileupload.value = "";
                                    this.addPostContent = "";
                                    this.tagAcademicYearID = null;

                                    this.tagLevelID = null;
                                    this.tagClassID = null;
                                    this.results = `Post Submitted`;
                                    // this.success = '';
                                    this.$notify({
                                        title: 'Success',
                                        message: 'Post Submitted, activity will be active in a while',
                                        type: 'success'
                                    });
                                    await DataSource.shared.softDeletePost(this.PostID);

                                    this.$vs.loading.close();
                                    break;
                                case "88":
                                    this.$vs.loading.close();
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Please Login to submit post'
                                    });
                                    this.systemmsgError = true;
                                    break;
                                case "99":
                                    this.$vs.loading.close();
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Please fill in content'
                                    });
                                    this.systemmsgError = true;
                                    break;
                                // default:
                                //     alert("Please try again later");
                                //     this.results = JSON.stringify(response);
                            }
                        }
                    } catch (e) {
                        console.log(e);
                        this.error = e;
                    }
                }
            },
            getImagePreviews() {
                /*
                  Iterate over all of the files and generate an image preview for each one.
                */
                for (let i = 0; i < this.selectedFile.length; i++) {
                    /*
                      Ensure the file is an image file
                    */
                    if (/\.(jpe?g|png|gif)$/i.test(this.selectedFile[i].name)) {
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
                        reader.readAsDataURL(this.selectedFile[i]);
                    }
                }
            },
            clearPreview() {
                $("#inputfile").val("");
                this.selectedFile = [];
            },
            removePreviewImg(fileName) {

                this.selectedFile = this.selectedFile.filter(d => {
                    return d.name !== fileName;
                });

                this.getImagePreviews()
            },
            setTags(value) {
                this.tags = value;
            },
        },
        mounted() {
            this.init();

            if (!this.isNull(this.post)) {
                this.addPostContent = this.post.PostContent;
                this.PostID = this.post.PostID;
                /*this.selectedFile = ()=>{
                    let tempselectedFile = [];
                    for (let image of this.post.postFiles) {
                        let url = "data:" + image.GalFileType + ";base64," + image.GalFileLow;
                        let fileName = image.GalFileName + image.GalFileExt;
                        let mimeType = image.GalFileType;
                        this.urltoFile(url, fileName, mimeType).then((file) => {
                            tempselectedFile.push(file)
                        }).finally(() => {
                            return tempselectedFile;
                        });
                    }
                };*/
            }

            if (!this.isNull(this.images)) {
                this.selectedFile = [];
                for (let image of this.images) {
                    let url = "data:" + image.GalFileType + ";base64," + image.GalFileLow;
                    let fileName = image.GalFileName + image.GalFileExt;
                    let mimeType = image.GalFileType;
                    this.urltoFile(url, fileName, mimeType).then((file) => {
                        this.selectedFile.push(file);
                    }).finally(() => {
                        this.getImagePreviews();
                    });
                }
            }
        },
        computed: {
            items() {
                return this.studentTable.filter(i => {
                    return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
                });
            },
        },
        components: {
            /*VueTagsInput,*/
            tagsComponent
        },
        props: ["images", "post"],
    };
</script>

<style scoped>

</style>