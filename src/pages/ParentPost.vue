<template>
    <div id="staff-post" class="container">
        <div class="row">
            <!--<b>result:</b> {{staffPostResults}}-->
            <vs-col vs-justify="center" vs-w="4" class="right-sideBar">
                <div class="dashboard-logo mt-4 mb-3"><img src="../assets/kagami-long.png"/></div>
                <div class="sideBarSection__wrapper">
                    <div class="sideBarSection__item">
                        <div class="subtitle">
                            <h6>Communities</h6>
                        </div>
                        <div class="desc flex">
                            <ul>
                                <li><span class="sideBarSection__img"><img src="../assets/boy.png"></span> N2 Inquirers
                                    Class
                                </li>
                                <li><span class="sideBarSection__img"><img src="../assets/boy.png"></span> K2 Explorers
                                    Class
                                </li>
                                <li><span class="sideBarSection__img"><img src="../assets/boy.png"></span> PSA Group
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="sideBarSection__item">
                        <div class="subtitle">
                            <h6>Upcoming Events</h6>
                        </div>
                        <div class="desc">
                            <ul>
                                <li>22 DEC Christmas Party</li>
                                <li>24 DEC Half Day Closure</li>
                                <li>25 DEC Full Day Closure</li>
                                <li>30 DEC Celebration of learning</li>
                                <li>31 DEC Full Day Closure</li>
                                <li>01 JAN Full Day Closure</li>
                                <li>07 JAN Start of Term 1</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </vs-col>
            <div class="col-md-8 mt-4 pb-4">
                <div class="notification ">
                    <h4 class="text-left mb-3">Important Notification</h4>
                    <div class="row">
                        <div class=" col-md-4">
                            <div class="notification__item">
                                <div class="subtitle">
                                    <h6>Parent Teacher Conference 2018</h6>
                                </div>
                                <div class="desc">
                                    <span>Please sign up for a slot for the Parent Teachers Conference by 30 Nov 2018.</span>
                                </div>
                                <div class="notification-item__footer ">
                                    <div class="notification__footer-item">
                                        Ms Lisa<br/>
                                        23 February at 19:36
                                    </div>
                                    <div class="notification__footer-item">
                                        <button class="btn text-center">Mark as read</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class=" col-md-4">
                            <div class="notification__item">
                                <div class="subtitle">
                                    <h6>Parent Teacher Conference 2018</h6>
                                </div>
                                <div class="desc">
                                    <span>Please sign up for a slot for the Parent Teachers Conference by 30 Nov 2018.</span>
                                </div>
                                <div class="notification-item__footer ">
                                    <div class="notification__footer-item">
                                        Ms Lisa<br/>
                                        23 February at 19:36
                                    </div>
                                    <div class="notification__footer-item">
                                        <button class="btn text-center">Mark as read</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" col-md-4">
                            <div class="notification__item">
                                <div class="subtitle">
                                    <h6>Parent Teacher Conference 2018</h6>
                                </div>
                                <div class="desc">
                                    <span>Please sign up for a slot for the Parent Teachers Conference by 30 Nov 2018.</span>
                                </div>
                                <div class="notification-item__footer ">
                                    <div class="notification__footer-item">
                                        Ms Lisa<br/>
                                        23 February at 19:36
                                    </div>
                                    <div class="notification__footer-item">
                                        <button class="btn text-center">Mark as read</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="feed-header">
                    <h4 class="text-left">Activity</h4>
                    <div class="addPost" :class="{'d-none' :userType!=='Teacher'}">
                        <b-btn v-b-modal.modal1 @click="showModal">ADD NOTE</b-btn>
                    </div>
                </div>
                <div class="success">{{success}}</div>
                <div v-if="isLoading">Loading...</div>

                <div class="" v-for="object in list"
                     :key="`${object.PostID}${object.commentItems ? object.commentItems.length : ''}`">
                    <PostComponent
                            :post="object"
                            :checkIfImage="checkIfImage"
                            @commentitemSubmit="commentitemSubmit"
                            @commentEdit="commentEdit"
                            @commentDelete="commentDelete"
                            :commentPostContent="commentPostContent"
                    />
                    <hr/>
                </div>

            </div>

        </div>


        <b-modal id="modal1" hide-footer title="ADD NOTE" v-model="isModalOpen">
            <form class="needs-validation form-style" novalidate @submit.prevent="onSubmit">

                <div class="mb-3 form-group">
                    <!--<label for="username">Username</label>-->
                    <textarea type="text" class="form-control" id="postContent" v-model="addPostContent"
                              placeholder="CONTENT"></textarea>
                </div>
                <div class="row">
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
                </div>
                <div class="row inputFile-box">
                    <div class="col-md-12">
                        <input type="file" multiple @change="onFileChanged" ref="fileupload" class="inputfile"
                               id="inputfile"
                               data-multiple-caption="{count} files selected">
                        <label for="inputfile" @click="inputFile()">Choose a file</label>
                        <!--<button @click.prevent="onUpload">Upload!</button>-->

                        <div class="btn btn-primary" v-if="selectedFile" @click="clearPreview()"><strong>X</strong>
                            REMOVE ALL
                        </div>
                        <div class="uploadFile-image">
                            <div v-for="(file, key) in selectedFile" class="col-md-3 file-listing">
                                <!--{{ file.name }}-->
                                <img class="preview" v-bind:ref="'image'+parseInt( key )"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-2">

                </div>
                <div class="system-msg" v-bind:class="{'bg-danger': systemmsgError===true}">{{results}}
                    <p v-if="error" style="color: red">{{error}}</p></div>
                <div class="row d-flex submit-wrap">
                    <div class="col-md-6">
                        <b-btn class="float-left" @click="hideModal">Cancel</b-btn>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-primary login-btn" type="submit">Submit
                        </button>
                    </div>
                </div>
            </form>
        </b-modal>

    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import {required, minLength} from 'vuelidate/lib/validators';
    import isImage from "is-image";
    import PostComponent from "../components/postCompnent";
    import VueTagsInput from '@johmun/vue-tags-input';
    import Cookies from "js-cookie";

    // import RichTextEditor from "../components/RichTextEditor/RichTextEditor";

    export default {
        name: 'ParentPost',
        components: {
            PostComponent,
            VueTagsInput,
            // At,
        },
        data() {
            return {
                files: [],
                systemmsgError: false,
                isModalOpen: false,
                token: null,
                userType: "",
                list: [],
                error: "",
                staffPostResults: "",
                results: "",
                postContent: "",
                addPostContent: "",
                tagAcademicYearID: "",
                profolio: "No",
                tagClassID: "",
                tagLevelID: "",
                // files: [],
                content: '',
                selectedFile: null,
                success: null,
                isLoading: true,
                saveResponse: "",
                PostItemPath: "",
                tagResponseText: "123",
                academicYearTable: [],
                classesTable: [],
                levelsTable: [],
                studentTable: [],
                PostID: "",
                commentPostContent: "",
                commentPostID: "",
                actionMode: "",
                readonly: true,
                checkidcomment: "",
                showDeleteModal: false,
                query: '',
                tag: '',
                tags: [],
            };
        },
        filters: {
            stringify(value) {
                return JSON.stringify(value, null, 2);
            }
        },
        computed: {
            items() {
                return this.studentTable.filter(i => {
                    return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
                });
            },
        },
        async mounted() {
            // this.showSession()
            // user menu
            try {
                let response = await DataSource.shared.getStaffPost();
                if (response.Table) {
                    for (let item of response.Table) {
                        const fileRes = await DataSource.shared.getPostFile(item.PostID);
                        const getCommentResponse = await DataSource.shared.getComment(item.PostID);
                        if (getCommentResponse.Table) {
                            item.commentItems = getCommentResponse.Table;
                            item.collapsed = true;
                        }
                        if (fileRes.Table) {
                            item.postFiles = fileRes.Table;
                        }
                        item.commentPostID = item.PostID;
                    }
                    this.list = response.Table;
                }

                let tagResponse = await DataSource.shared.getPostDropdown();

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
                    // console.log("a ", this.studentTable);
                }

                this.userType = Cookies.get('userTypeSession');


            } catch (e) {
                console.log(e, '  errrr');
            }
            this.isLoading = false;
        },
        methods: {
            inputChange(input) {
                this.postContent = input;
            },
            checkIfImage(file) {
                return isImage(file);
            },
            showModal() {
                this.isModalOpen = true;
            },
            hideModal() {
                this.isModalOpen = false;
            },
            onFileChanged(event) {
                this.selectedFile = event.target.files;
                this.getImagePreviews();
            },
            async onUpload() {
                // const formData = new FormData();
                // console.log(this.selectedFile);
                // formData.append('myFile', this.selectedFile, this.selectedFile.name);
                // this.formData = formData;
                // await DataSource.shared.uploadFile(this.selectedFile);
            },
            async onSubmit() {
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {
                    const studentsIds = this.tags.map(d => d.Student_ID);
                    const saveResponse = await DataSource.shared.savePost(this.selectedFile, this.addPostContent, this.profolio, studentsIds, this.tagClassID, this.tagLevelID);

                    if (saveResponse) {
                        switch (saveResponse.code) {
                            case "1":
                                this.isModalOpen = false;
                                // reset all input filed to blank
                                this.selectedFile = null;
                                this.$refs.fileupload.value = "";
                                this.addPostContent = "";
                                this.tagAcademicYearID = null;
                                this.profolio = null;

                                this.tagLevelID = null;
                                this.tagClassID = null;
                                this.results = `Post Submitted`;
                                this.success = 'Post Submitted, activity will be active in a while';
                                break;
                            case "88":
                                this.results = `Please Login to submit post`;
                                this.systemmsgError = true;
                                break;
                            case "99":
                                this.results = `Please fill in content`;
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

            },
            async commentitemSubmit(commentPostID, comment) {
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {

                    this.commentPostID = commentPostID;

                    const commentResponse = await DataSource.shared.saveComment(this.commentPostID, comment);


                    if (commentResponse) {
                        switch (commentResponse.code) {
                            case "1":
                                // reset all input filed to blank
                                this.commentPostID = null;
                                this.commentPostContent = "";

                                const newComment = await DataSource.shared.getComment(commentPostID);

                                this.list.find(item => {

                                    console.log("item ", item);
                                    console.log("postid ", newComment);

                                    if (item.PostID === commentPostID) {
                                        item.commentItems = newComment.Table;
                                        console.log(item);
                                        return item;
                                    }

                                });

                                this.$forceUpdate();


                                // this.results = `Post Submitted`;
                                // this.success = 'Post Submitted, activity will be active in a while';
                                break;
                            case "88":
                                this.results = `Please Login to submit post`;
                                this.systemmsgError = true;
                                break;
                            case "99":
                                this.results = `Please fill in content`;
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
            },
            async commentEdit(PoCmID, PoCmContent) {
                this.error = "";
                try {
                    this.actionMode = "Edit";
                    const commentResponse = await DataSource.shared.editComment(PoCmID, PoCmContent, this.actionMode);
                    if (commentResponse) {
                        switch (commentResponse.code) {
                            case "1":
                                // reset all input filed to blank
                                this.commentPostID = null;
                                this.commentPostContent = "";
                                this.readonly = true;

                                const newComment = await DataSource.shared.getComment(PoCmID);
                                this.list.find(item => {

                                    if (item.PostID === PoCmID) {
                                        item.commentItems = newComment.Table;
                                        return item;
                                    }

                                });
                                break;
                            case "88":
                                this.results = `Please Login to submit post`;
                                this.systemmsgError = true;
                                break;
                            case "99":
                                this.results = `Please fill in content`;
                                this.systemmsgError = true;
                                break;
                        }
                    }
                } catch (e) {
                    console.log(e);
                    this.error = e;
                }
            },
            async okClick() {

            },
            async commentDelete(PoCmID, PoCmContent, postId) {
                this.error = "";
                try {
                    this.actionMode = "Delete";
                    const deleteCommentResponse = await DataSource.shared.deleteComment(PoCmID, PoCmContent, this.actionMode);
                    if (deleteCommentResponse) {
                        switch (deleteCommentResponse.code) {
                            case "1":
                                // reset all input filed to blank
                                this.commentPostID = null;
                                this.commentPostContent = "";

                                const newComment = await DataSource.shared.getComment(PoCmID);

                                console.log(newComment);
                                this.list.find(item => {

                                    if (item.PostID === postId) {
                                        console.log('hey', postId);
                                        item.commentItems = item.commentItems.filter(comment => comment.PoCmID !== PoCmID);
                                        return item;
                                    }

                                });
                                this.$forceUpdate();
                                break;
                            case "88":
                                this.results = `Please Login to submit post`;
                                this.systemmsgError = true;
                                break;
                            case "99":
                                this.results = `Please fill in content`;
                                this.systemmsgError = true;
                                break;
                        }
                    }
                } catch (e) {
                    console.log(e);
                    this.error = e;
                }
            },
            async disableReadonly(PoCmID) {
                this.error = "";
                try {
                    this.readonly = false;
                    this.checkidcomment = PoCmID;
                } catch (e) {
                    console.log(e);
                    this.error = e;
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
                this.selectedFile = null;
            },
        },
        validations: {
            content: {
                required,
                minLength: minLength(4)
            }
        },
    };
</script>

<style scoped>
</style>

<style>
    .vue-tags-input {
        max-width: 100% !important;
    }

    .ti-input {
        border: 0px !important;
        background: whitesmoke;
        border-radius: 4px;
        padding: 0px !important;
    }

    input.ti-new-tag-input {
        background: transparent;
        font-size: 1rem;
    }

    li.ti-new-tag-input-wrapper {
        padding: 10px !important;
        margin: 0px !important;
    }

    .tags-input {
        margin-top: 15px;
    }

    .ti-input {
        min-height: 46px;
    }

    li.ti-tag {
        background-color: #E6E6E6;
        color: #000;
        border-radius: 12px;
        padding: 4px 8px;
    }

    .ti-tag input {
        color: #000;
    }

    .ti-tag-left {
        margin-right: 2px;
        width: 24px;
    }

    .my-item, .my-tag-left {
        display: flex;
        align-items: center;
    }

    .my-item i {
        margin-right: 5px;
    }

    .ti-deletion-mark {
        background-color: $ error;
    }
</style>