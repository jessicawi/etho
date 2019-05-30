<template>
    <div id="staff-post" class="container">
        <div class="profile-student" v-if="isParent === 'Parent' ">
            <div class="profile-student__wrapper">
                <img src="../assets/boy.png">
                <span class="studentName"><strong>Alexander</strong><br/>Student Name</span>
                <span class="teacherName"><strong>Alice</strong><br/>Teacher Name</span>
                <span class=""><strong>SG-016-16-0038</strong><br/>Student ID</span>
                <span class=""><strong>Year 2018: 01/01/2018 - 31/12/2018</strong><br/>Academic Year</span>
                <span class=""><strong>Class One</strong><br/>Class</span>
            </div>
        </div>
        <div class="whitespace-30"></div>
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
                <div class="notification">
                    <div class="row">
                        <div class="col-md-9">
                            <h4 class="text-left mb-3">Broadcast</h4>
                        </div>
                        <div class="col-md-3">
                            <button @click="showMoreBroadcastModal" class="btn btn-link">Show More <i
                                    class="fa fa-ellipsis-h" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4" v-for="obj_BroadcastPost of filteredBroadcastPost"
                             :key="obj_BroadcastPost.id">
                            <div class="notification__item">
                                <div class="desc">
                                    <span>{{obj_BroadcastPost.PostContent}}</span>
                                </div>
                                <div class="notification-item__footer">
                                    <div class="notification__footer-item">
                                        {{obj_BroadcastPost.CONname}}<br/>
                                        {{obj_BroadcastPost.PostCreatedBy}}
                                    </div>
                                </div>
                                <div class="notification-item__footer">
                                    <div class="notification__footer-item">
                                        <button class="btn text-center">Mark as read</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="notification">
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
                </div>-->

                <div class="feed-header">
                    <h4 class="text-left">Activity</h4>
                    <div class="addPost" :class="{'d-none' :userType==='Teacher'}">
                        <b-btn v-b-modal.modal1 @click="showBroadcast"><i class="fa fa-bullhorn" aria-hidden="true"></i>
                            <span>Broadcast</span></b-btn>
                    </div>
                    <div class="addPost" :class="{'d-none' :userType==='Teacher'}">
                        <b-btn v-b-modal.modal1 @click="showUpdates"><i class="fa fa-newspaper-o"
                                                                        aria-hidden="true"></i> <span>Updates</span>
                        </b-btn>
                    </div>
                    <div class="addPost" :class="{'d-none' :userType==='Teacher'}">
                        <b-btn v-b-modal.modal1 @click="showPortfolio"><i class="fa fa-book" aria-hidden="true"></i>
                            <span>Portfolio</span></b-btn>
                    </div>
                </div>
                <div class="success">{{success}}</div>
                <div v-if="isLoading">Loading...</div>

                <div class="" v-for="object of list"
                     :key="`${object.PostID}${object.commentItems ? object.commentItems.length : ''}`">
                    <PostComponent
                            :parent-post="object"
                            @commentitemSubmit="commentitemSubmit"
                            @commentEdit="commentEdit"
                            @commentDelete="commentDelete"
                            :commentPostContent="commentPostContent"
                            :PostID="commentPostID"
                            @loadPosts="loadPosts"
                    />
                    <hr/>
                </div>

            </div>
        </div>
        <b-modal id="modal_ShowMoreBroadcast" ref="modal_ShowMoreBroadcast" size="lg" hide-footer title="Broadcast">
            <button class="btn btn-primary" @click="showBroadcast"><i class="el-icon-bell"></i> Create Broadcast
            </button>
            <div class="" v-for="object of arrobj_BroadcastPost" :key="object.id">
                <BroadcastList :parent-post="object" :hideComment="true" :hideSubmenu="true"/>
                <!--<hr/>-->
            </div>
        </b-modal>
        <b-modal id="modal1" size="lg" hide-footer :title="modalTitle ? modalTitle : 'Post'" v-model="isModalOpen"
                 @hidden="hideComponentModal">
            <el-button-group class="mb-4 modal-quicklink">
                <el-button type="primary" @click="showBroadcast" :class="{'active':modalTitle === 'Broadcast'}"><i
                        class="fa fa-bullhorn" aria-hidden="true"></i> <span> Broadcast</span></el-button>
                <el-button type="primary" @click="showUpdates" :class="{'active':modalTitle === 'Post'}"><i
                        class="fa fa-newspaper-o" aria-hidden="true"></i> <span> Updates</span></el-button>
                <el-button type="primary" @click="showPortfolio" :class="{'active':modalTitle === 'Portfolio'}"><i
                        class="fa fa-book" aria-hidden="true"></i> <span> Portfolio</span></el-button>
            </el-button-group>
            <component
                    @result="displayResult"
                    :is="obj_SelectedComponent"
                    @loadPosts="loadPosts"
            ></component>
        </b-modal>
        <button @click="loadPosts" v-if="bool_ShowRefresh" class="btn btn-secondary"
                style="position: fixed; right: 20px; bottom: 20px"><i class="fa fa-refresh" aria-hidden="true"></i>
        </button>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import {required, minLength} from 'vuelidate/lib/validators';
    import isImage from "is-image";
    import PostComponent from "../components/postCompnent";
    import BroadcastList from "../components/BroadcastListCompnent";
    import VueTagsInput from '@johmun/vue-tags-input';
    import portfolio from "../components/Post_Portfolio_Component";
    import updates from "../components/Post_Updates_Component.vue";
    import broadcast from "../components/Post_Broadcast_Component.vue";
    import $ from 'jquery';
    import Cookies from "js-cookie";


    // import RichTextEditor from "../components/RichTextEditor/RichTextEditor";

    export default {
        name: 'staffPost',
        components: {
            PostComponent,
            VueTagsInput,
            // At,
            BroadcastList
        },
        data() {
            return {
                modalTitle: null,
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
                success: "",
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
                isParent: "",

                obj_SelectedComponent: false,
                int_NumberOfPost: 3,

                arrobj_BroadcastPost: [],
                intervalCheckNew: {},
                bool_ShowRefresh: false,
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
        /*async mounted() {
            this.loadPosts();
        },*/
        mounted() {
            const self = this;
            this.loadPosts();
            this.loadBroadcast();
            /*#region Scroll Loader Functions*/
            $(window).scroll(self.debounce(() => {
                    if (self.getScrollPercent() >= 50) {
                        this.isParent = Cookies.get('userTypeSession');
                        let obj_LastPost = !this.isNull(this.list) ? this.list[this.list.length - 1] : "";
                        let promise_GetPosts = this.isParent === "Parent" ? DataSource.shared.getParentPost(this.int_NumberOfPost, obj_LastPost.PostID) : DataSource.shared.getStaffPost(this.int_NumberOfPost, obj_LastPost.PostID);


                        promise_GetPosts.then((response) => {
                            if (response.Table) {
                                this.list.push.apply(this.list, response.Table);
                            }
                        });

                        /*if (this.isParent === "Parent") {
                            DataSource.shared.getParentPost(this.int_NumberOfPost, str_LastPostID).then((response) => {
                                if (response.Table) {
                                    for (let item of response.Table) {
                                        this.list.push.apply(this.list, response.Table);

                                        DataSource.shared.getPostFile(item.PostID).then((fileRes) => {
                                            if (fileRes.Table) {
                                                item.postFiles = fileRes.Table;
                                            }
                                            item.commentPostID = item.PostID;
                                        }).then(() => {
                                            DataSource.shared.getComment(item.PostID).then((getCommentResponse) => {
                                                if (getCommentResponse.Table) {
                                                    item.commentItems = getCommentResponse.Table;
                                                    item.collapsed = true;
                                                }
                                            });
                                        });
                                    }
                                }
                            });
                        } else {
                            DataSource.shared.getStaffPost(this.int_NumberOfPost, str_LastPostID).then((response) => {
                                if (response.Table) {
                                    this.list.push.apply(this.list, response.Table);

                                    for (let item of response.Table) {
                                        DataSource.shared.getPostFile(item.PostID).then((fileRes) => {
                                            if (fileRes.Table) {
                                                item.postFiles = fileRes.Table;
                                            }
                                            item.commentPostID = item.PostID;
                                        }).then(() => {
                                            DataSource.shared.getComment(item.PostID).then((getCommentResponse) => {
                                                if (getCommentResponse.Table) {
                                                    item.commentItems = getCommentResponse.Table;
                                                    item.collapsed = true;
                                                }
                                            });
                                        });
                                    }
                                }
                            });
                        }*/
                    }
                }, 250
            ));
            /*#endregion*/
        },
        methods: {
            initIntervalCheckNew() {
                if (!this.bool_ShowRefresh)
                    this.intervalCheckNew = setInterval(() => {
                        this.CheckNew();
                    }, 300000);
            },

            CheckNew() {
                this.isParent = Cookies.get('userTypeSession');

                let promise_GetPosts = this.isParent === "Parent" ?
                    DataSource.shared.getParentPost(1, null, null)
                    : DataSource.shared.getStaffPost(1, null, null);

                promise_GetPosts.then((response) => {
                    if (response.Table && (new Date(response.Table[0].PostCreatedDate)) > (new Date(this.list[0].PostCreatedDate))) {
                        this.bool_ShowRefresh = true;
                        clearInterval(this.intervalCheckNew);
                    }
                });
            },

            showMoreBroadcastModal() {
                this.$refs.modal_ShowMoreBroadcast.show();
            },

            isNull(obj) {
                return (obj === null || obj === undefined || obj === "undefined" || obj.length === 0 || obj === "");
            }
            ,
            /*#region Scroll Loader Functions*/
            getScrollPercent() {
                //Credits to Phil Ricketts @ stackoverflow
                let height = document.documentElement,
                    body = document.body,
                    scrollTop = 'scrollTop',
                    scrollHeight = 'scrollHeight';

                return (height[scrollTop] || body[scrollTop]) / ((height[scrollHeight] || body[scrollHeight]) - height.clientHeight) * 100;
            }
            ,
            isScrollable() {
                return $(document).height() > $(window).height();
            }
            ,
            debounce(func, wait, immediate) {
                // Returns a function, that, as long as it continues to be invoked, will not
                // be triggered. The function will be called after it stops being called for
                // N milliseconds. If `immediate` is passed, trigger the function on the
                // leading edge, instead of the trailing.
                let timeout, result;
                let self = this;

                let later = function (context, args) {
                    timeout = null;
                    if (args) result = func.apply(context, args);
                };

                let debounced = self.restArguments(function (args) {
                    if (timeout) clearTimeout(timeout);
                    if (immediate) {
                        let callNow = !timeout;
                        timeout = setTimeout(later, wait);
                        if (callNow) result = func.apply(this, args);
                    } else {
                        timeout = self.delay(later, wait, this, args);
                    }

                    return result;
                });

                debounced.cancel = function () {
                    clearTimeout(timeout);
                    timeout = null;
                };

                return debounced;
            }
            ,
            delay(func, wait, ...args) {
                // Lodash Delay
                /**
                 * Invokes `func` after `wait` milliseconds. Any additional arguments are
                 * provided to `func` when it's invoked.
                 *
                 * @since 0.1.0
                 * @category Function
                 * @param {Function} func The function to delay.
                 * @param {number} wait The number of milliseconds to delay invocation.
                 * @param {...*} [args] The arguments to invoke `func` with.
                 * @returns {number} Returns the timer id.
                 * @example
                 *
                 * delay(text => console.log(text), 1000, 'later')
                 * // => Logs 'later' after one second.
                 */
                if (typeof func != 'function') {
                    throw new TypeError('Expected a function');
                }
                return setTimeout(func, +wait || 0, ...args);
            }
            ,
            restArguments(func, startIndex) {
                // Some functions take a variable number of arguments, or a few expected
                // arguments at the beginning and then a variable number of values to operate
                // on. This helper accumulates all remaining arguments past the function?s
                // argument length (or an explicit `startIndex`), into an array that becomes
                // the last argument. Similar to ES6?s "rest parameter".
                startIndex = startIndex == null ? func.length - 1 : +startIndex;
                return function () {
                    let length = Math.max(arguments.length - startIndex, 0),
                        rest = Array(length),
                        index = 0;
                    for (; index < length; index++) {
                        rest[index] = arguments[index + startIndex];
                    }
                    switch (startIndex) {
                        case 0:
                            return func.call(this, rest);
                        case 1:
                            return func.call(this, arguments[0], rest);
                        case 2:
                            return func.call(this, arguments[0], arguments[1], rest);
                    }
                    let args = Array(startIndex + 1);
                    for (index = 0; index < startIndex; index++) {
                        args[index] = arguments[index];
                    }
                    args[startIndex] = rest;
                    return func.apply(this, args);
                };
            }
            ,
            /*#endregion*/
            loadPosts() {
                // this.showSession()
                // user menu
                $("html, body").animate({scrollTop: 0}, "fast");
                this.bool_ShowRefresh = false;
                this.initIntervalCheckNew();
                this.isParent = Cookies.get('userTypeSession');
                this.list = [];
                let promise_GetPosts = this.isParent === "Parent" ?
                    DataSource.shared.getParentPost(this.int_NumberOfPost)
                    : DataSource.shared.getStaffPost(this.int_NumberOfPost);

                promise_GetPosts.then((response) => {
                    if (response.Table)
                        this.list.push.apply(this.list, response.Table);

                    this.isLoading = false;
                });


                /*#region Past revision*/
                /*for (let item of response.Table) {
                DataSource.shared.getPostFile(item.PostID).then((fileRes) => {
                    if (fileRes.Table) {
                        item.postFiles = fileRes.Table;
                    }
                    item.commentPostID = item.PostID;
                }).then(() => {
                    DataSource.shared.getComment(item.PostID).then((getCommentResponse) => {
                        if (getCommentResponse.Table) {
                            item.commentItems = getCommentResponse.Table;
                            item.collapsed = true;
                        }
                    });
                });
            }

            this.list = response.Table;
        }*/

                // if (this.isParent === "Parent") {
                //     DataSource.shared.getParentPost(this.int_NumberOfPost).then((response) => {
                //         this.list = [];
                //         if (response.Table) {
                //             for (let item of response.Table) {
                //                 this.list.push.apply(this.list, response.Table);
                //
                //                 DataSource.shared.getPostFile(item.PostID).then((fileRes) => {
                //                     if (fileRes.Table) {
                //                         item.postFiles = fileRes.Table;
                //                     }
                //                     item.commentPostID = item.PostID;
                //                 }).then(() => {
                //                     DataSource.shared.getComment(item.PostID).then((getCommentResponse) => {
                //                         if (getCommentResponse.Table) {
                //                             item.commentItems = getCommentResponse.Table;
                //                             item.collapsed = true;
                //                         }
                //                     });
                //                 });
                //             }
                //         }
                //     });
                // } else {
                //
                // }

                // if (isParent === "Parent") {
                //     let response = await DataSource.shared.getParentPost(this.int_NumberOfPost, "");
                //     if (response.Table) {
                //         for (let item of response.Table) {
                //             const fileRes = await DataSource.shared.getPostFile(item.PostID);
                //             const getCommentResponse = await DataSource.shared.getComment(item.PostID);
                //             if (getCommentResponse.Table) {
                //                 item.commentItems = getCommentResponse.Table;
                //                 item.collapsed = true;
                //             }
                //             if (fileRes.Table) {
                //                 item.postFiles = fileRes.Table;
                //             }
                //             item.commentPostID = item.PostID;
                //         }
                //         this.list = response.Table;
                //     }
                // } else {
                //     let response = await DataSource.shared.getStaffPost(this.int_NumberOfPost, "");
                //     if (response.Table) {
                //         for (let item of response.Table) {
                //             const fileRes = await DataSource.shared.getPostFile(item.PostID);
                //             const getCommentResponse = await DataSource.shared.getComment(item.PostID);
                //             if (getCommentResponse.Table) {
                //                 item.commentItems = getCommentResponse.Table;
                //                 item.collapsed = true;
                //             }
                //             if (fileRes.Table) {
                //                 item.postFiles = fileRes.Table;
                //             }
                //             item.commentPostID = item.PostID;
                //         }
                //         this.list = response.Table;
                //     }
                // }


                // try {
                //     let tagResponse = await DataSource.shared.getPostDropdown();
                //
                //     if (tagResponse.AcademicYearTable && tagResponse.AcademicYearTable.Table) {
                //         let uniqueYears = [];
                //         tagResponse.AcademicYearTable.Table.forEach(object => {
                //             const isExist = uniqueYears.find(year => year.SMT_Code === object.SMT_Code);
                //             if (!isExist) {
                //                 uniqueYears.push(object);
                //             }
                //         });
                //         this.academicYearTable = uniqueYears;
                //     }
                //     if (tagResponse.ClassesTable && tagResponse.ClassesTable.Table) {
                //         let uniqueClass = [];
                //         tagResponse.ClassesTable.Table.forEach(object => {
                //             const isExist = uniqueClass.find(year => year.PK_Class_ID === object.PK_Class_ID);
                //             if (!isExist) {
                //                 uniqueClass.push(object);
                //             }
                //         });
                //         this.classesTable = uniqueClass;
                //     }
                //     if (tagResponse.LevelsTable && tagResponse.LevelsTable.Table) {
                //
                //         let uniqueLevel = [];
                //         tagResponse.LevelsTable.Table.forEach(object => {
                //             const isExist = uniqueLevel.find(level => level.SC_FK_CourseID === object.SC_FK_CourseID);
                //             if (!isExist) {
                //                 uniqueLevel.push(object);
                //             }
                //         });
                //
                //         this.levelsTable = uniqueLevel;
                //     }
                //     if (tagResponse.StudentTable && tagResponse.StudentTable.Table) {
                //         let uniqueStudent = [];
                //         tagResponse.StudentTable.Table.forEach(object => {
                //             const isExist = uniqueStudent.find(student => student.Student_ID === object.Student_ID);
                //             if (!isExist) {
                //                 const selectedValue = {
                //                     Student_ID: object.Student_ID,
                //                     text: object.Full_Name,
                //                     Sex: object.Sex,
                //                     // email: object.email,
                //                     Status: object.Status
                //                 };
                //                 uniqueStudent.push(selectedValue);
                //             }
                //         });
                //         // this.studentTable = tagResponse.StudentTable.Table;
                //         this.studentTable = uniqueStudent;
                //     }
                //
                //     this.userType = Cookies.get('userTypeSession');
                //
                // } catch (e) {
                //     console.log(e, '  errrr');
                // }
                // this.isLoading = false;
                /*#endregion*/
            }
            ,

            loadBroadcast() {
                this.isParent = Cookies.get('userTypeSession');
                this.arrobj_BroadcastPost = [];

                let promise_GetPosts = this.isParent === "Parent" ?
                    DataSource.shared.getParentPost(10, null, "BROADCAST")
                    : DataSource.shared.getStaffPost(10, null, "BROADCAST");

                promise_GetPosts.then((response) => {
                    if (response.Table)
                        this.arrobj_BroadcastPost.push.apply(this.arrobj_BroadcastPost, response.Table);
                });
            },
            hideComponentModal() {
                this.obj_SelectedComponent = false;
                this.isModalOpen = false;
                this.modalTitle = null;
            }
            ,
            displayResult(value) {
                //TODO: Show Message
                if (value == "TRUE") {
                    this.hideComponentModal();
                }
                // this.success = "Successfully posted";
                // else
                // this.success = "Something went wrong. Please inform the adminstrator";


            }
            ,
            showUpdates() {
                this.modalTitle = "Post";
                this.obj_SelectedComponent = updates;
                this.isModalOpen = true;
            }
            ,
            showPortfolio() {
                this.modalTitle = "Portfolio";
                this.obj_SelectedComponent = portfolio;
                this.isModalOpen = true;
            }
            ,
            showBroadcast() {
                this.modalTitle = "Broadcast";
                this.obj_SelectedComponent = broadcast;
                this.isModalOpen = true;
            },
            inputChange(input) {
                this.postContent = input;
            }
            ,
            showModal() {
                this.isModalOpen = true;
            }
            ,
            hideModal() {
                this.isModalOpen = false;
            }
            ,
            onFileChanged(event) {
                this.selectedFile = event.target.files;
                this.getImagePreviews();
            }
            ,
            async onUpload() {
                // const formData = new FormData();
                // formData.append('myFile', this.selectedFile, this.selectedFile.name);
                // this.formData = formData;
                // await DataSource.shared.uploadFile(this.selectedFile);
            }
            ,
            async onSubmit() {
                this.$v.$touch();
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {
                    const studentsIds = this.tags.map(d => d.Student_ID);
                    const saveResponse = await DataSource.shared.savePostUpdate(this.selectedFile, this.addPostContent, studentsIds, this.tagClassID, this.tagLevelID);

                    if (saveResponse) {
                        switch (saveResponse.code) {
                            case "1":
                                this.isModalOpen = false;
                                // reset all input filed to blank
                                this.selectedFile = null;
                                this.$refs.fileupload.value = "";
                                this.addPostContent = "";
                                this.tagAcademicYearID = null;

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

            }
            ,
            async commentitemSubmit(postId, comment) {
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {

                    this.commentPostID = postId;
                    const commentResponse = await DataSource.shared.saveComment(this.commentPostID, comment);


                    if (commentResponse) {
                        switch (commentResponse.code) {
                            case "1":
                                // reset all input filed to blank
                                this.commentPostID = null;
                                this.commentPostContent = "";

                            //    const newComment = await DataSource.shared.getComment(commentPostID);

                                this.list.find(item => {


                                    if (item.PostID === commentPostID) {
                                        item.commentItems = newComment.Table;
                                        return item;
                                    }

                                });

                               // this.$forceUpdate();


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
            }
            ,
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

                               // const newComment = await DataSource.shared.getComment(PoCmID);
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
            }
            ,
            async okClick() {

            }
            ,
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

                           //     const newComment = await DataSource.shared.getComment(PoCmID);

                                this.list.find(item => {

                                    if (item.PostID === postId) {
                                        item.commentItems = item.commentItems.filter(comment => comment.PoCmID !== PoCmID);
                                        return item;
                                    }

                                });
                              //  this.$forceUpdate();
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
            }
            ,
            async disableReadonly(PoCmID) {
                this.error = "";
                try {
                    this.readonly = false;
                    this.checkidcomment = PoCmID;
                } catch (e) {
                    console.log(e);
                    this.error = e;
                }
            }
            ,
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
            }
            ,
            clearPreview() {
                this.selectedFile = null;
            }
            ,
        }
        ,
        validations: {
            updateContent: {
                required
                // minLength: minLength(4)
            }
        }
        ,
        computed: {
            filteredBroadcastPost: function () {
                return this.arrobj_BroadcastPost.slice(0, 3);
            },
        },
    };
</script>

<style scoped>
    .overflow-x-scroll {
        overflow-x: hidden;
    }
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

    #modal1 .modal-lg {
        /*max-width: 95% !important;*/
    }
</style>