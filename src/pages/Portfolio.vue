<template>
    <div class=" ">
        <div class="portfolio_wrap">
            <div class="portfolioClass">
                <h5 class="text-left">Select a class</h5>
                <hr/>
                <ul class="" v-model="obj_Class" id="ddl_Class">
                    <li class="portfolioClass_item" v-for="classes of arrobj_Classes" :key="classes.id"
                        :class="{'active':activeClass === classes.PK_Class_ID}"
                        @click="loadStudents(classes.PK_Class_ID)">
                        <span>{{classes.CLS_ClassName}}</span>
                    </li>
                </ul>
            </div>
            <div class="portfolioStudent">
                <h5 class="text-left pl-3">Select a student</h5>
                <hr/>
                <!--{{arrobj_Student}}..{{}}-->
                <ul class="" v-model="obj_Student" id="ddl_Students">
                    <li class="portfolioClass_item" v-for="student of arrobj_Student" :key="student.Student_ID"
                        :class="{'active':activeStudent === student.Student_ID}" @click="loadPortfolio(student)">
                        <span>{{student.First_Name}}</span>
                    </li>
                </ul>
                <span> {{StudentResult}}</span>

            </div>
            <div class="portfolio_Content">
                <div class="header mb-4">
                    <div class="student-name-wrap">
                        <h4 class="student-name text-left">{{selectedStudentsName}}</h4>
                        <h4 class="student-name text-left" v-if="isNull(selectedStudentsName)">Select a student..</h4>
                        <el-button size="mini" type="primary" v-if="!isNull(arrobj_Posts)"
                                   @click="initCreatePortfolioModal" class="float-left">Generate Portfolio <i
                                class="el-icon-circle-plus-outline el-icon-right"></i></el-button>
                        <el-button size="mini" type="primary"
                                   v-if="!isNull(arrobj_Posts) && !isNull(arrobj_SelectedPortfolios)"
                                   @click="showDeleteModal" class="float-left">Delete Selected Portfolio <i
                                class="el-icon-delete el-icon-right"></i></el-button>
                    </div>
                    <div class="student-image-wrap">
                        <img class="student-image float-right" :src="getSource(obj_Student)" :bind="obj_Student"
                             :alt="obj_Student.Student_Name"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="">
                            <h5 v-if="isNull(arrobj_Portfolios)">NO PORTFOLIO</h5>
                            <h5 v-if="!isNull(arrobj_Portfolios)" class="text-left pl-3">Portfolio List</h5>
                            <hr v-if="!isNull(arrobj_Portfolios)"/>
                            <table id="tbl_Portfolios" class="table table-light table-hover">
                                <tbody>
                                <tr v-for="tempobj_Portfolio of arrobj_Portfolios"
                                    :key="tempobj_Portfolio.id" @click="arrobj_SelectedPortfolios.checked === true">
                                    <td><label class="label-checkbox">
                                        <input type="checkbox" :value="tempobj_Portfolio"
                                               v-model="arrobj_SelectedPortfolios"
                                               :disabled="isNull(arrobj_SelectedPortfolios.find(x=>x.PortfolioID === tempobj_Portfolio.PortfolioID))
                                       && arrobj_SelectedPortfolios.length >= int_SelectLimit"/>
                                        <span class="span-checkbox"></span>
                                    </label></td>
                                    <th scope="row">
                                        <div>
                                            {{tempobj_Portfolio.PortfolioDesc}}
                                        </div>
                                    </th>
                                    <td>
                                        {{tempobj_Portfolio.PortfolioCreatedDate}}
                                    </td>
                                    <td>
                                        {{tempobj_Portfolio.PortfolioStatus}}
                                    </td>

                                    <td>
                                        <!--<el-button size="mini" type="primary"-->
                                                   <!--@click="initSavedPortfolioPostModal(tempobj_Portfolio)">VIEW-->
                                        <!--</el-button>-->
                                        <el-button size="mini" type="primary"
                                                   @click="editPortfolio(tempobj_Portfolio)">VIEW
                                        </el-button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-2">

                    </div>
                </div>
            </div>
        </div>
        <b-modal id="modal_CreatePortfolio" hide-footer size="lg" title="Create Portfolio"
                 ref="modal_CreatePortfolio"
                 centered>
            <el-steps :active="stepActive" class="mb-4">
                <el-step title="Select Content"></el-step>
                <el-step title="Fill in description">
                </el-step>
            </el-steps>
            <div class="portfolio-step1" v-if="stepActive === 0">
                <div class="d-table w-100 mb-2">
                    <el-button class="float-right ml-2" icon="el-icon-circle-check-outline" id="btn_SelectAll"
                               size="small" type="primary">Select All
                    </el-button>
                    <el-button class="float-right" icon="el-icon-circle-close-outline" id="btn_UnselectAll" size="small"
                               type="primary">Unselect All
                    </el-button>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="row div_PortfolioPosts">
                            <div class="col-4" v-for="tempobj_Post of arrobj_Posts" :key="tempobj_Post.id">
                                <div class="card portfolio-view">
                                    <!--<div class="card-header">-->
                                    <!--<div class="text-left float-left">-->
                                    <!--<p class="mb-0"></p>-->
                                    <!--<p class="mb-0">{{tempobj_Post.PostPorDtlTitle}}</p>-->
                                    <!--</div>-->
                                    <!--<div class="text-right float-right">-->
                                    <!---->
                                    <!--</div>-->
                                    <!--</div>-->
                                    <label class="label-checkbox">
                                        <input class="limited" type="checkbox" :value="tempobj_Post"
                                               v-model="obj_PortFolio.arrobj_SelectedPortfolioPosts"
                                        />
                                        <span class="span-checkbox"></span>
                                    </label>
                                    <b-carousel id="portfolioPostCarousel"
                                                style="text-shadow: 1px 1px 2px #333;"
                                                :controls="!isNull(tempobj_Post) && !isNull(tempobj_Post.ArrObj_Images) && tempobj_Post.ArrObj_Images.length > 1"
                                                indicators
                                                background="#ababab"
                                                :interval="0"
                                    >
                                        <div>
                                            <b-carousel-slide v-for="tempobj_Images of tempobj_Post.ArrObj_Images"
                                                              :key="tempobj_Images.id">
                                                <img slot="img" class="card-img-top d-block img-fluid w-100"
                                                     :src="getLowSource(tempobj_Images)"
                                                     :alt="tempobj_Post.PostPorDtlTitle"/>
                                            </b-carousel-slide>
                                        </div>
                                    </b-carousel>
                                    <div class="card-body">
                                        <h5 class="card-title">{{tempobj_Post.PostPorDtlTitle}}</h5>
                                        <p class="card-text">Observation: {{tempobj_Post.PostPorDtlObservation}}</p>
                                        <p class="card-text">{{tempobj_Post.PostCreatedDate}}</p>
                                        <!--<p class="card-text">Analysis & Reflection:-->
                                        <!--{{obj_Post.PostPorDtlAnalysisReflection}}</p>-->
                                        <!--<p class="card-text">Developmental Goals:-->
                                        <!--{{obj_Post.PostPorDtlDevelopmentGoals}}</p>-->

                                        <el-button class="mt-2" href="#" size="mini" type="text" icon="el-icon-view"
                                                   @click="showViewPostModal(tempobj_Post, showCreatePortfolioModal)">
                                            View
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <span class="portfolio-selected__count">{{obj_PortFolio.arrobj_SelectedPortfolioPosts.length}} files selected</span>

                        <draggable v-model="obj_PortFolio.arrobj_SelectedPortfolioPosts" :options="draggableOptions"
                                   class="row overflow-x-scroll flex-row flex-nowrap portfolio-selected__item">
                            <div v-for="obj_SelectedItem in obj_PortFolio.arrobj_SelectedPortfolioPosts"
                                 :key="obj_SelectedItem.id" class="item">
                                {{obj_SelectedItem.PostPorDtlTitle}}
                            </div>
                        </draggable>
                        <hr/>
                    </div>
                    <!--<button id="btn_Next"-->
                    <!--class="btn btn-secondary" @click="showPortfolioDescriptionModal">Next-->
                    <!--</button>-->
                </div>
                <div class="create-porfolio__footer">
                    <el-button id="btn_Cancel" style="margin-top: 12px;" @click="hideGeneratePortfolioModal">
                        Cancel
                    </el-button>
                    <el-button style="margin-top: 12px;"
                               :disabled="obj_PortFolio.arrobj_SelectedPortfolioPosts.length === 0"
                               @click="stepNext">
                        Next step
                    </el-button>

                </div>
            </div>
            <div class="portfolio-step2" v-if="stepActive === 1">
                <div class="portfolio-desc__input">
                    <strong>Portfolio Description</strong>
                    <textarea v-model="obj_PortFolio.PortfolioDesc" type="text" class="form-control"
                              id="tb_PortfolioDescription"
                              placeholder="Please enter your Portfolio Description" required></textarea>
                </div>
                <div class=" create-porfolio__footer">
                    <el-button id="btn_Back" style="margin-top: 12px;" @click="stepActive = 0">
                        Back
                    </el-button>
                    <el-button id="btn_Submit" style="margin-top: 12px;" @click="generatePortfolio">
                        Submit
                    </el-button>
                </div>
            </div>
        </b-modal>
        <b-modal id="modal_PortfolioDescription" hide-footer size="lg" title="Portfolio Description"
                 ref="modal_PortfolioDescription"
                 centered>

        </b-modal>
        <b-modal id="modal_SavedPortfolioPost" hide-footer size="lg" title="View Portfolio"
                 ref="modal_SavedPortfolioPost"
                 centered>
            <div class="d-table w-100">
                <el-button class="float-right" type="primary" icon="el-icon-edit" id="btn_EdtPortfolio"
                           @click="showCreatePortfolioModal" size="mini">Rearrange Content
                </el-button>
            </div>
            <div class="row justify-content-center">
                <div class="col-11">
                    <p style="white-space: pre-line;" class="text-left">{{obj_PortFolio.PortfolioDesc}}</p>
                </div>
            </div>
            <div class="row ">
                <div class="col-12">
                    <div class="row overflow-x-scroll flex-row flex-nowrap div_PortfolioPosts">
                        <div class="col-4" v-for="tempobj_Post of obj_PortFolio.arrobj_SelectedPortfolioPosts"
                             :key="tempobj_Post.id">
                            <div class="card portfolio-view">
                                <label class="label-checkbox">
                                    <input class="limited" type="checkbox" :value="tempobj_Post"
                                           v-model="obj_PortFolio.arrobj_SelectedPortfolioPosts"
                                    />
                                    <span class="span-checkbox"></span>
                                </label>
                                <b-carousel id="portfolioSavedPostCarousel"
                                            style="text-shadow: 1px 1px 2px #333;"
                                            :controls="!isNull(tempobj_Post) && !isNull(tempobj_Post.ArrObj_Images) && tempobj_Post.ArrObj_Images.length > 1"
                                            indicators
                                            background="#ababab"
                                            :interval="0"
                                >
                                    <div>
                                        <b-carousel-slide v-for="tempobj_Images of tempobj_Post.ArrObj_Images"
                                                          :key="tempobj_Images.id">
                                            <img slot="img" class="card-img-top d-block img-fluid w-100"
                                                 :src="getLowSource(tempobj_Images)"
                                                 :alt="tempobj_Post.PostPorDtlTitle"/>
                                        </b-carousel-slide>
                                    </div>
                                </b-carousel>
                                <div class="card-body">
                                    <div class="card-desc">
                                        <h5 class="card-title">{{tempobj_Post.PostPorDtlTitle}}</h5>
                                        <p class="card-text">Observation: {{tempobj_Post.PostPorDtlObservation}}</p>
                                        <p class="card-text">{{tempobj_Post.PostCreatedDate}}</p>
                                    </div>
                                    <!--<p class="card-text">Analysis & Reflection:-->
                                    <!--{{obj_Post.PostPorDtlAnalysisReflection}}</p>-->
                                    <!--<p class="card-text">Developmental Goals:-->
                                    <!--{{obj_Post.PostPorDtlDevelopmentGoals}}</p>-->
                                    <el-button class="mt-2" href="#" size="mini" type="text" icon="el-icon-view"
                                               @click="showViewPostModal(tempobj_Post, showSavedPortfolioPostModal)">
                                        View
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
        <b-modal id="modal_ViewPost" hide-footer size="lg" title="View Post"
                 ref="modal_ViewPost"
                 centered
                 @hidden="hideViewPostModal">
            <div class="row">
                <div class="col-6 viewpost-carousel">
                    <b-carousel id="postImages"
                                style="text-shadow: 1px 1px 2px #333;"
                                :controls="!isNull(obj_Post.ArrObj_Images) && obj_Post.ArrObj_Images.length > 1"
                                indicators
                                background="#ababab"
                                :interval="0"
                    >
                        <div v-for="tempobj_Images of obj_Post.ArrObj_Images" :key="tempobj_Images.id">
                            <b-carousel-slide>
                                <img slot="img" class="card-img-top d-block img-fluid w-100"
                                     :src="getHighSource(tempobj_Images)"
                                     :alt="obj_Post.PostPorDtlTitle"/>
                            </b-carousel-slide>
                        </div>
                    </b-carousel>
                </div>
                <div class="col-6 ">
                    <div class="viewpost-desc__box ">
                        <div class="">
                            <span>Date:</span>
                            {{obj_Post.PostCreatedDate}}
                        </div>
                        <div class="">
                            <span>Title:</span>
                            {{obj_Post.PostPorDtlTitle}}
                        </div>
                        <div class="">
                            <span>Observation:</span>
                            {{obj_Post.PostPorDtlObservation}}
                        </div>
                        <div class="">
                            <span>Development Goals:</span>
                            {{obj_Post.PostPorDtlDevelopmentGoals}}
                        </div>
                        <div class="">
                            <span>Analysis & Reflection:</span>
                            {{obj_Post.PostPorDtlAnalysisReflection}}
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
        <b-modal class="alert-modal" title="ARE YOU SURE?" ref="modal_DeletePost" @ok="deletePortfolio">
            Once you delete a post, you can't undo it.
        </b-modal>
        <!--<b-modal id="modal_SavedPortfolioPost" hide-footer size="lg" title="Portfolio saved post"
                 ref="modal_SavedPortfolioPost"
                 centered>
            <div class="row">
                <div class="col-" v-for="tempobj_SavedPortfolioPost of arrobj_SavedPortfolioPosts"
                     :key="tempobj_SavedPortfolioPost.id">
                    <div class="card">
                        <div class="card-header">
                            <div class="text-left float-left">
                                <p class="mb-0">{{tempobj_SavedPortfolioPost.PostCreatedDate}}</p>
                                <p class="mb-0">{{tempobj_SavedPortfolioPost.PostPorDtlTitle}}</p>
                            </div>
                        </div>
                        &lt;!&ndash;<b-carousel id="savedPortfolioPostCarousel"
                                    style="text-shadow: 1px 1px 2px #333;"
                                    :controls="!isNull(tempobj_Post) && !isNull(tempobj_SavedPortfolioPost.ArrObj_Images) && tempobj_SavedPortfolioPost.ArrObj_Images.length > 1"
                                    indicators
                                    background="#ababab"
                                    :interval="0"
                        >
                            <div>
                                <b-carousel-slide v-for="tempobj_Images of tempobj_Post.ArrObj_Images"
                                                  :key="tempobj_Images.id">
                                    <img slot="img" class="card-img-top d-block img-fluid w-100"
                                         :src="getLowSource(tempobj_Images)"
                                         :alt="tempobj_Post.PostPorDtlTitle"/>
                                </b-carousel-slide>
                            </div>
                        </b-carousel>&ndash;&gt;
                        <div class="card-body">
                            <h5 class="card-title">{{tempobj_SavedPortfolioPost.PostPorDtlTitle}}</h5>
                            <p class="card-text">Observation: {{tempobj_SavedPortfolioPost.PostPorDtlObservation}}</p>
                            &lt;!&ndash;<p class="card-text">Analysis & Reflection:&ndash;&gt;
                            &lt;!&ndash;{{obj_Post.PostPorDtlAnalysisReflection}}</p>&ndash;&gt;
                            &lt;!&ndash;<p class="card-text">Developmental Goals:&ndash;&gt;
                            &lt;!&ndash;{{obj_Post.PostPorDtlDevelopmentGoals}}</p>&ndash;&gt;
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>-->
    </div>
</template>
<script>
    "use strict";
    import DataSource from "../data/datasource";
    import $ from "jquery";
    import draggable from 'vuedraggable';
    import * as vm from "vue";

    export default {
        name: "Portfolio",
        data() {
            return {
                draggableOptions: {
                    sort: true,
                    animation: 150,
                    easing: "cubic-bezier(1, 0, 0, 1)",
                    handle: ".fa-arrows-h"
                },
                arrobj_Posts: [],
                obj_Post: {
                    ArrObj_Images: [{}],
                    CONname: "",
                    PostContent: "",
                    PostCreatedBy: "",
                    PostCreatedDate: "",
                    PostID: "",
                    PostLinkPostID: "",
                    PostPorDtlAnalysisReflection: "",
                    PostPorDtlDevelopmentGoals: "",
                    PostPorDtlObservation: "",
                    PostPorDtlTitle: "",
                    PostTagUserID: "",
                    PostType: "",
                    ProfileImage: "",
                    RowNumber: "",
                }, // For showing single post
                arrobj_Classes: [{
                    CLS_Batch: "",
                    CLS_ClassName: "",
                    CLS_Class_Admin_Staff: "",
                    CLS_Class_Incharge_Staff: "",
                    CLS_Class_Max_Students: "",
                    CLS_Created_On: "",
                    CLS_Description: "",
                    CLS_FK_Course_ID: "",
                    CLS_FK_Created_by: "",
                    CLS_FK_School_ID: "",
                    CLS_FK_Semester_ID: "",
                    CLS_FK_Subject_ID: "",
                    CLS_Status: "",
                    CLS_TeacherCount: "",
                    PK_Class_ID: "",
                    PK_SchoolCourse_ID: "",
                    PK_Semester_ID: "",
                    SC_FK_CourseID: "",
                    SC_FK_SchoolID: "",
                    SMT_Code: "",
                    SMT_From: "",
                    SMT_School: "",
                    SMT_Status: "",
                    SMT_To: "",
                    SMT_Year: "",
                    // arrobj_Student: [],
                    smt_course: "",
                }],
                arrobj_Student: [],
                arrobj_Portfolios: [], // For storing all created portfolios
                arrobj_SelectedPortfolios: [],
                selectedPortfolios: [],
                obj_PortFolio: {
                    PortfolioID: "",
                    PortfolioDesc: "",
                    arrobj_SelectedPortfolioPosts: []
                }, // For any single portfolio
                obj_Student: {},
                obj_Class: {},

                int_NumberOfPost: 10,
                int_SelectLimit: 30,

                returnPage: null, // For callback when click to view single post

                str_PostType: "PORTFOLIO",

                fileStudent: "",
                StudentResult: "No Student Yet...",
                selectedStudentsName: "",
                activeClass: "",
                activeStudent: "",
                stepActive: 0
            };
        },
        methods: {
            stepNext() {
                if (this.active++ > 2) this.active = 0;
                this.stepActive = 1;
            },
            clear_obj_Portfolio() {
                this.obj_PortFolio = {
                    PortfolioID: "",
                    PortfolioDesc: "",
                    arrobj_SelectedPortfolioPosts: []
                };
            },

            initCreatePortfolioModal() {
                this.clear_obj_Portfolio();
                this.showCreatePortfolioModal();
            },

            showCreatePortfolioModal() {
                this.$refs.modal_CreatePortfolio.show();
            },

            showPortfolioDescriptionModal() {
                this.$refs.modal_PortfolioDescription.show();
            },

            async initSavedPortfolioPostModal(tempobj_Portfolio) {
                const PortPostResponse = await DataSource.shared.getPostByPortfolioID(tempobj_Portfolio.PortfolioID);
                DataSource.shared.getPostByPortfolioID(tempobj_Portfolio.PortfolioID).then((result) => {
                    this.obj_PortFolio = {
                        PortfolioID: tempobj_Portfolio.PortfolioID,
                        PortfolioDesc: tempobj_Portfolio.PortfolioDesc,
                        arrobj_SelectedPortfolioPosts: [],
                    };

                    for (let tempobj of result.Table)
                        this.obj_PortFolio.arrobj_SelectedPortfolioPosts.push.apply(this.obj_PortFolio.arrobj_SelectedPortfolioPosts, this.arrobj_Posts.filter(x => x.PostID === tempobj.PostID));

                    this.showSavedPortfolioPostModal();
                });

                if (PortPostResponse) {
                    switch (PortPostResponse.code) {
                        case "88":
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please Login'
                            });
                            this.results = `Please Login to submit post`;
                            this.systemmsgError = true;
                            break;
                        case "99":
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please Try Again'
                            });
                            this.results = `Please fill in content`;
                            this.systemmsgError = true;
                            break;
                    }
                }
            },

            showSavedPortfolioPostModal() {
                this.$refs.modal_SavedPortfolioPost.show();
            },

            showViewPostModal(tempobj_Post, next) {
                this.obj_Post = tempobj_Post;
                this.returnPage = next;
                this.$refs.modal_ViewPost.show();
            },

            showDeleteModal() {
                this.$refs.modal_DeletePost.show();
            },

            hideGeneratePortfolioModal() {
                this.$refs.modal_CreatePortfolio.hide();
            },

            hidePortfolioDescriptionModal() {
                this.$refs.modal_PortfolioDescription.hide();
            },

            hideSavedPortfolioPostModal() {
                this.$refs.modal_SavedPortfolioPost.hide();
                if (!this.isNull(this.returnPage))
                    this.returnPage();
            },

            hideDeleteModal() {
                this.$refs.modal_DeletePost.hide();
            },

            hideViewPostModal() {
                this.$refs.modal_ViewPost.hide();
                this.returnPage();
            },

            generatePortfolio() {
                // let arrstr_PostIDs = JSON.stringify(this.obj_PortFolio.arrobj_SelectedPortfolioPosts.map(x => x.PostID));
                // DataSource.shared.savePortfolio(this.obj_PortFolio.PortfolioDesc, this.obj_Student.Student_ID, arrstr_PostIDs, this.obj_PortFolio.PortfolioID).then((result) => {
                //     DataSource.shared.softDeletePortfolio(JSON.stringify([this.obj_PortFolio.PortfolioID])).then(() => {
                //         this.hideGeneratePortfolioModal();
                //         this.hidePortfolioDescriptionModal();
                //         this.loadPortfolio();
                //         this.clear_obj_Portfolio();
                //     });
                // });
                this.stepActive = 2;
                this.$router.push({
                    name: 'Portfolio Preview',
                    params: {
                        stringifyPostIDs: JSON.stringify(this.obj_PortFolio.arrobj_SelectedPortfolioPosts.map(x => x.PostID)),
                        portfolioDesc: this.obj_PortFolio.PortfolioDesc,
                        portfolioID: '',
                        studentID: this.activeStudent,
                        mode: 'NEW'
                    }
                });
            },

            editPortfolio(tempobj_Portfolio) {
                this.$router.push({
                    name: 'Portfolio Preview',
                    params: {
                        stringifyPostIDs: '',
                        portfolioDesc: '',
                        portfolioID: tempobj_Portfolio.PortfolioID,
                        studentID: '',
                        mode: 'EDIT'
                    }
                });
            },

            deletePortfolio() {
                DataSource.shared.softDeletePortfolio(JSON.stringify(this.arrobj_SelectedPortfolios.map(x => x.PortfolioID))).then((result) => {
                    this.arrobj_SelectedPortfolios = [];
                    this.$router.go(0);
                });
            },

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

            isNull(obj) {
                return (obj === null || obj === undefined || obj === "undefined" || obj.length === 0 || obj === "");
            },
            isImage(obj_File) {
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
            getLowSource(file) {
                if (this.isImage(file))
                    return "data:" + file.PostItemFileType + ";base64," + file.PostItemFileLow;
                else
                    return "";
            },
            getHighSource(file) {
                if (this.isImage(file))
                    return "data:" + file.PostItemFileType + ";base64," + file.PostItemFile;
                else
                    return "";
            },
            getSource(obj) {
                let imgsrc = "";
                if (obj.Profile_Img == null || obj.Profile_Img == "")
                    imgsrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAQAAACUXCEZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCAoFIgoPraT3AAAhSUlEQVR42u2deZgU5bX/P2/17DPAMAuoKJuKkc0FFRAQUNzAJUboAdxC3GKues2Niff3y01wicnj9Zq7RBMN3mhQIzSIhiCLiuyboKAsCrIMqyyzwCzM0st7/6iqXqt7eqleZqhvP/NMdXV11dv1rXPec877nvOCBQsWLFiwYMGCBQsWYoPoeD/p7c55vT29RS9PqSgVpbKMcjojKAZyKAQaaQVOIqnjhKiS1bJaqZb72ZdbeXu9RXAGQoo5vcVgBsnB9KUPJQmcqppKsYetbJVfTaoU0iI4rXD0EFfLEVzBIDon4fR1bGOjWONaM+WIRXBK8V5f941yhBhJrxRdsFKuYbVYYt9nEZxUvJFXMFrczE1cFOkoGwUUUkguOd4/QRZgwwa48ABOoJUW7a+Z0zTSiCdyA74Ri1jcsHJas0WwyZhZmHcLdm6iwPjzHLrQhS50ppD8BK7TRCN1nOIUp2gNd9BpFgpH3oe3nrYINqOfzWcCdiYYUWujK6WU0TUhUsPzeJIqqqkxlutGFghHw8JMl+aMJnjWJcoD3E1x8H6FMs6ijK4oKWiFhxqqOEaVEdG18m0xw77VIjhWuS0Sk+WDXBW8v4CzOJtuZKWhTS6OcZSjGGjmDcxgtr3BIjg6cs+SPxaPBXuzBfTgXMoyoH11HOQAIWzWizdc/zHloEVwZHIvFT+TFWT778ujJ+dSmmE3rpqDHKAlcGernGV7aeJXFsHGPe4w5RluCGxcd/pwTkp62vh65yPs5TgBAS/JEqbbP7MIDpTcITzDhEC57UufcF5RRqGRfewNluV/KNMnbrYIViV3oPIct/u3pDMX0gtbOwrBuNnPLuoDJXkev7bvOMMJ/ltZ9nPyQX8uy7mIs2mPkHzHLk4EGN7iNdv0H1SfoQS/lt11Gs/7G8alDKQb7RtVbOd4oKf8gvhPe+sZR/DsceJl/5hyCQPpTsfAUbZT479jh3y0YtkZRLCjhJe4z3ftTgzmHDoWDvOVv68s+Uv2k3ecPCMInn2r+BM99HdZ9OPijHWEEnOi9rAdp2/HMfGLSTM7OMF/6571Z27zXbwPA8ml46KZbVT6+8nv87D9RIcleM4N8k2fidyFIRkXn0oGqtlEne/tcXH/pAUdkOA38opekI/p11Pox4AOqZiNlfUutvvGoiQz8n+aqtHkFBE8d7DnXfrr78q4gk6cWahjE34O8TbPlMnbOgzBs6eIGRTqF7yY/h1xtm4UgZCd/nLcxE/sb3YAgpdlVf1GPqW/K+SqjBjySxdq2ODvPP259tGHne2aYMdZOBilv+vDpWkZqs8kuNhMpe/tClfF1GPtlmDHIBbQU922cRl9sACwn89x62+OMMG+pV0S7LieOXRRtwsYnlDCQUfDSdbSqL9pkBUVC9sdwbN/JF7VZ2aUM7xDhzPiQSvr8epml3ys4tXkXCcpg65S9P+teFE/94UMPeN7XqMb35NWfUhCEbfYbXOWtROCpZj7XzypK4jLzlCnKBrleTY5PikebT9rwKLl0vyrmN3z2uQMMU3dzmJohxslMhuH2eA1uMTbZdPGujKa4Neyu77DJHU7l1F0tRiMwjde7ZvRNbv2HnM9Y2EyvXP1saJ8Rp9x4ch4UccKvBkwH9TazaTYRIIdNvm2mKy7RaMpspiLGo2s8LlN75VPNk9Rm2ZkSbH9NXGvut2JMXro2UJUyKEH3+n5jP2beg2Yb5a5ZTOL3jmviId99OZbnMWIbM7jiE7xpWUlcxdlFMEDfsdP1a1CRlv0xoUsenBYm+IjhprlF5vSBzvu53XdtBprKecE0MBymnSt+IgZ0S0TCJ59o1ighqpyGZOUaihnEupZrlvUTibYP047wXMHeNaoQwo2xlgDCiagluVoRnSdMirRXMUEp0U5zvIsVukVDLPoNQVduUqXu86e+fO6pZHg17KZzbnq9iVWUNI09GCwvtnLNWtZVtoILn6Ja9StC7nQ4sVE9OMCfXNs1e/S1Ac7pvKOutWdUdaIkcmQrOaovl1R4Ug5wXMHe9ap+dmFjCPHYsR0tPCJXvClgaHxZhrHqaLfyPO8rdJrY7hFb1KQywg9DlWEw5GfUoILXmKQunW5NSSYNBQzRN8cIJ5PoYqec4ucr36zD1dYPCQVn7Ff64jlzRVLUkKwo5yvOEvVHNdbs62SDBcf61Plj7sGxz6HOh4V/bpKr2JNpksBsnxhj25Zr6SgD3ZU6HM2+luRq5Sg1Je1d6fjjiSraEcJO9RSGmWMsXzflPnEy/TMxCP0t59KpgS/pNKrMMSiN2UQXKkTdY58IYkqevY47lO3LraGBVOKTnxPJ/uh2dckieBlWeK/VLHt4r2chVTBK1JC/CmW4YcYCK56lAGqwrjijCm+kDnw6xT7Vz2UBCPLUcK3qtl8Ppdb9zst2KhnFtdk9Yu2QGLUoiieV+nN9hntFlKMQXq6Zon71yZL8KyByhY18n0J/aw7nTZ8g7Y8hFMZPPEbEyVYeU6lt8g3EG0hDein54tke541UUU7hnC7unWJZV6l2dQapG/eOesS8yT4WVWVd7XmXaUd5+oBYkV5xiSCZ13JzXonbyH98Bq5tzuuMoVg5Teq/JZ1mHrO7Rtn+yp8TjeB4LmDuV7dGmjd2wzBAH1jfNv9cJsEy5+r8ltOuXVnMwTdvdUClScS9IMdPdirzqkb2U6XyuiYOMxazR+29b3zUAISLJ5Q6e2kTuKwkCHooQ89ZLv/KQEJdhRxSM08GkJf665mFPbwhbpR23zevY1xSrCcotKbm7K11C1Ei97kqRtdcyviVtHiAfV/33a1CtmZAZu3tKvOUswEzx2srt8rrCqxGYk+ev86PJKzFIFg+ZBulFtFGTIRhV7HVZkWB8GOfHmX/qRYyEx4Dd973siLmWBxC8UAedYAQwY7S1qR5pKCm2ImWGoVJ3taA4QZC4Xz9C17jAT/o4Dx6tZ51n3MYOjsyNtmFsZEcPNtqmVVYKWnZDTK9DXSC3Nviolgabfkt33gXN1mqoiB4DfyuNEiuH0paW5emBs1wQWjVckvsLL3Mx4lemXQovpRURMstCk61gBhe4B3nO+m6Pvgm4O+aqEdECyiJdjRR53brtDNunvtAN11Ege81ys6Cb5JN8GtAg3tAdneSXiuG6IjeKSloNubDGtKelRMBJdZd66dwDsdckQUBDt6qOuFKpaL1G7QVaex73shjk9WOPktMXGQoUqbEVIQskSl+klhmGKIbk6iLj5SRF6U16rDDeT4jWE3oC9DJEMCr7V+N8JolSf9u9E87PXa8lYKXQ2mujX5VkYKdUvVgbu4YaOrVqTFdTXvtUGwHCFMV9ATtbzWJ5hg+Mm7BlfbxWq+4gR1SIopZxBXc0EUZt9t2hl9BDczRdvyMI27/Y5tZCFvattOlhucbT0vAG6eJlJhjAZ2s56dHOcUkiLKuJChXBnQ2kZvK0JhfO1YUKoRrIxok2AxRP+K+ZjDiKie1TpmsBTf8l/HOMY23mMcUxNKn1FYGkTwmojHn2S9JiGLwxIs2cMsVuHx7qmhhl18SA/u5doUKekydqmtubKNPlgKPUMlGT3wYT6M4qgj/ILFGr0unDi17VYW8hx74rx2KznAXg4GtOfbqAiGjXo5wSB42MxvWIEHkFpbnVq3cphnDY53Grw8JvTCGgZJEVGC5/VRZ1TnJGntow+4to0AaLOXxO7czDB6IDjOGhZyGIWd/DdPxzWE6eZK1pDNfPSZ4qfYBEgGsj0Meeu8i0ZK5jPV4Jh9vMxhwEU/xjGUUnJpYCdfs97w4XEnrIyNUUC2KgZd5vXUq5caSrBLWyygSxIakQucZF4bR/0vuwHJrczkLs4nj1zOYzJ/ZRJu4GtmEc+qb1lcCQi/G9zMSsCpD5yFoJp1gJvugOBTw67kAw4Cgl/wGpPoSSFZFDOUH/Iq/+FLEksBugQxGIZgoX1cnIQmTEACSyIq2RrUxezH83hQ0wQ/5nYk8DEH4rr+ZRQBJ9imyeS3HAWKuCxsh/I1IHiSLGA3e0OOOMpSwMkTevA+6HqvpIHg4CTuYF9I64GTUcfuB5QDTcz2LogciiW0AqUYF4J6lGKggXVx3oLhQDYLNPncBHgYHcYyb2I1AFdwEZcB2fw9xLxahxO4UJ/dlFYUR0lw3+QRbONuPMAqvVKMAVTpui7M0rQ2TZ1ui0tJFzIUgDW4gFZWAS5D2VN76NWAk++TjxoBXBFkDNWyB3BnBL0+xsT5kQnWJkEnZ+3fCfQBXMzWV9kMwV6jh9APV+ABDoaxadvC9+gG1LMBN1upA8rCprV/STVQzFDgMkqAOlYGGWH7AXeAij9NbcDrVIjU14a8TppkZmnoHcGK/nunlhJVUvKS9Jzdzy+xsYkNjAoTDYJIwxzn40ahgZa4VhcvZhjzyeZDLuQzwM24MOmVJ1kHSMaiAN0YyiJsLGZMkJEFIiBIczoonBEcwsjBnoQwB0A+iqphyh1F9oYwEtzUN+hpMB3DtTW9ZukLxgThtNbYyM9pY9x2/HAANlHLBsAdVkHX8hng5A7tJo3Rvlcf1E9Hbm0qIbysKb3Cqmhbb723Sh4ewg3sYmkEApvCfrteOyreOHkv+gIu/kgL0CtYn3m91bWa+dTTqznUld3+HiQ1wa31BTJcYXzrZIQ5AlmTfcKqaHlesiUY+jOSdcAcRhk4Y51oAY6GufHwLVlAYdwtLOEq9mJjR0QDq4a1gJtr/AYjhvEtIiDUKelMA3DCz2Lp5lW3VYax52QFOgLEsmf4SJY2sJiXVGXyMOuRfMc/uCfks75UAVsZFtb0EUCvuFto42pmaza4ZFyYow6wC7DxFm+FRK52e4s5FnEeR8hiQ4ak5+kjdbIsrIoWpYGHJgc9UGeWzOe7kM8GIYHlHA8TxvwIIKEIUbnXbh4Qpm7Q6QhDENl84KegLwIEn0BGESxKwxKsc5/speoeIAc4GTyyBdxCFnCcWQb9sORlTgL5CY3RlHKlZrtOiOgBh/aWaq+6yi9MM5xcYF+b4dfUIKdtCSYlEgzFWm3TJSFRpCJuQQL/4K/UBMnVK6gLf92Y0JChYCjgxBZ2AHAztUBnPmV5wGsWpUA9K/C5nKMBhRnMCTGVnGmT4MCR3sA7nCIJhvtYTD3NBl7oj/mSSuA9NnItgyhFUM12lnBIs2d/lOC1+/JxhE9rWA94uC7EUi9nOAuwscirQbK4j284gIs/8wnX0o9S8mmimp1s1LROaKDD6KErNlGCA2dPZAUZsVpPk/ynrYIZhkGGLF7gSQ4gOOCdbeHv5kxPst9Zw0bAxfdDPlEYzQLgC056CenGU/yWw8Beg8EIeCqEBKNEXnNCHV6CO4dX0bm6rZl8TAobryrhVcMsDMH1/HeS02lcrMMFXOTN2guU/e8Bgvl++/rxkhbvCiZtEDNSGqdWQnR1qATnGrFuxm0LPavCfTyP8fVyeJJ7WMCXHKEO6MzZXMINgQ5eGHhwQsB4lQsnRAgn+H9ezVKcyDAGWGeGshX4mHsDDJf/z10sZRuHqKeVLpQziBuDFr2XEXplTxIJDtCSjpPqsOL3U6CkLZiNVj3OVmsvCaeic5IjwRZSAZuhBFsEdxgoURBsoePSrqlxEzt9C6mFl7UWi+AOCbdF8Bkiwa3hCW6xCO7YKrolSNgtdDCC69R/TututUN4NfOp8ARXGTwCFtoJWoJYNCBYVhv00hbamQTL6rAEC0uCO4AEiwAJDpxVWS2SIsFu7Yz5YfbnhZl+rk6TESFT7NTxHyXMzBP1rP6femgxPE8opFZoITdMiK85aAg/8nE5YQdeWyJ4KjlxDtcaS3CWkQQ3m0zwMn4HSH7JdQH7G/hnDiJ5GONSqQ7+ApwTMrfxU62wwm/0giIBqGYK4PRLNKlmctCecPiU3wLwFDcYfn5DwDibQj7ncAk3h0zzVY+bFXY5wOsjjNe9G2cBOl2ClQgqWkt/P20qvZLlKCjYQia7d2GM4X4VjaxFQQmZ3Nqk7c/WUk2DoWgvv98Vsic8weqRy8N8rgS8oIk9zONxLWMx+Ljwq44pEV/xQc/3kOETwMW+wEPNwUE2a1ubQhKtRpIFfEulwfd2swvwcFvQ/mNs0rY2xpmEFg4n+Fzb2syRiB6n+pLeR+5l7zdj81yNX4kRrFSGVdHZ+1o0CZZtrVoZA1b5egcWBBRBgZ5cwudk8QFPGCh2gMtDqoWs8SojDwuYbCLBH3lDPC4+DWqpP2ZqRSSaOMR63sODm3kMifl6bxlWQsmJU0/qetcTXoJvr1fnqrpN7IVbWAXoSRPLQ36MOnl1Zcj8wyo2AJ6QvvAkawFJd0AxedL5cr+WroggSbnkk08+JQzmIS1FZVdQYlo0yNHOE/iKz8Rq0tt73N4QPtABpivpr9kDSP6FLGAv3wR9PoRi4JT2GPiwmSqgKGSSeyW7AOktrLDPtJZuYx+g8AQCqOTLKL93I26gMc3OZaPvBhGBYKEV0Kgz0YJWabycwYAtxDDqxlBAYXGQI6RavKOCnmePNu38CvpxOZDN+6a19GMEcClXcalfy6NF56Sm7LWNuiAGw0mwVl3hlEmXrdUSqa/z5tiuDFJ9grEAfBag4g6xGXCFGFgntMo34ynQXKSVJo19tWo6ZKz2B2ui9CY+wgb0TDPBOmPyq4gE6x+bRfBn1AJFjAOGaiVUgp2iflphkPkhhlRvtTK5H7ZQDXRmFHCpVlhhtUmapt575mspIrRkg79d0UQTTdSwlRm8CygGE+WjeaiaQl7uBAkOLoCSZSzBJ025aR7NbLkGBShhGIsRLOX6gKM6MZK9CD7lLm8AZA0gQ/rf0xqZ12iFFYaxEBsLI9aRjK0rGUEhkMtIFgPLjZdB8M6KFpqvUcQDWu2A2HCPiWEOnWB3ZAmeVKkqc6cpwY4DfIl/HRpV9X0elFYGI8kG9mr1FmG3ViXu9hAP+HN8hRVsjNa86/qEW3pc89XHau/HIYEtWj5UuDCFXrb1XkbF5VaaF+Zo1Id4T04+FNnIklolI8Mkqdg9YCd6wgdAf00ZB8d9zuVSIMurpJdrhlRwMafVOIELvAnX2uISAco9PizBA/RGX4j3EnoDbsP6dgSFJKr4I4+xxbRARzzwatytQkZW0bCRqwGq6ZHgTWvW+rCRfrm+I9gLLAtI/YBsRrMRWMVPsWmGVKgHXMta1NJl+vnyGMouBJ94lXtiCnqkn6szkv3Acu42kCk90OGmmkOs5hOOMJ0XvA9yIoGO+MIc+gCS/Cz4k9BywmvkP/t/JX5s11yywEIICrCfHfQPOPZySqihgWWMYzM1QKegkkWwl92A4E2/rEO1F9zHHs5PoKVbOIAAZjIzqKUH2cLlhoEOtN63FyPozjuc5l2eiSPQYQ6qvOyFdgNBcK3R5cVtilRg0MOEesNlDAMUlnjHfK4JappL84BFwNmEpgES84Y/0c5j1Bd+GsX378AJbDfBFogPbp+KXtcmwVOOqILnSbAXrtZqLRv3MauCygzp3vAXbOeLMB7wekCGPV/8j2OzZpsbn3ltFAMaHs3QSVcsq0bvuXfbj7apokGuEb1VsU+krP8GTgFFvB30DNXzKLU08kmQC3IBF/ItCi/iBM731rLxhS5rgU4h56vmSaqpZ6XXAo4Vn9IIdGFG0IQAF/dRTz0r28zyfZ9soHPaSqKFV9CGuUnKKt0pSdwDHk1hUCi9G1cDIiTcUaStCXMctYRgsBugtn1MyPnOZrih0jd4cA3CCs1+BlbXoDN30vzrZWEDHQ0cZC3/zrsADAgpINdWIMPo83hCHUd9bgZRSLBriU17Lpxx5wnvYyvgNkykHsOHqIMJgRpiBO9qSk6EKOjv+MLPA/aHzVtY4VQbZcyzuSVkn5NZ2qCCkfyPYwGCreynl2Ggw18+8g0GLo0CGf6zPO4xbGesoQ6nN64gP4pKgqdUslOVwuMJeMAuTe2G4mIuAISBN6zbq1eGlBpdjQvoZ5jj39ugsIIRhGFY4SMk0JfBBt8YSF/AHSLDoUGJcn4VElY1DmSINgMdsYY6juk98Db7gagIBrkoSPRjxGmW4cETplfMZRQePCFKOkvb7wopsl/FSjy4wsyTKmYoHiQfBYUP/JWzJ+zrYzx4GBMmEjVWa6nbMDQhyaKUIfyYV7kyihCGbxaIJ+IrTgW9yPixNsCcG+QSgIKwxcLa6oFbtECE8W1TZ0WGmy0Z/X6fknLhm0cZblZlZI/UFtUvCZ5VmR2mXnxz2JLl6pXMnFW5QAv8iHGTlkbVB0PDysLTFMBpauJa4URpw57MCnNbYt3vu83ZAb1yfoztif6XRFsjs63jzCs1V63H9RrkKuNfYIBpzbq4H8RCZsPL0If21qgJBulQ/x+y7mBGQ/oYmh1OBxmiYIEawDlNtXUXMxhVuoKuD5rz1BbBt57WV6GzlHQmQ5dfOd/eFBPBIDQlfcDK989YeHziNzu8mRgGDQvV0YaWiHP8LaQTh3X3r6rTRzETPK1Zvq1u7bXuZIbCy8zM8S0xEwxihvr/mMkZQBbMQSMndBL/EsmTDwv7Vn353Errbmak/GrRsjUTt8dFMPC6fiqr7k6mwe1L2nk90nERCW6epc4FaQlcc9hCBqBSN7BqmufETfC9jeI1dWtXXOt9WkgWpHcOOX+6tzFugsH1P2pyb73BGkcW0ukgaYZvi62NVajbIHjKETlLl2ELmQOdDfHOnd8lRDDIF1XtfCKB+R0WzMVRfYRAypfaOrZNgidv09ajYrt1ZzMEXiYW2HckTDAov1JluCruKTwWzMQRfZKd9DwXBXttHzJxkz6ytM26u5kkv+9P3mgKwaD8WpXhWg5b9zfNOKinqXh4Oiruojlo4mY9+edLa/AwrXB7E/ilw77VNIKBX6nJRI1aaraFdLlHWlTDKadH940oCbbv0GNaO0yvZGkhWjT5ilD9YfIuUwmG1l+pzpfLMrXShq16TuaJ7Oei/U7UBN9VK7T85koTksMtxI4TviGff7vjpOkEQ9mfVOGVbLKGD1MOD1/om1/yv9F/LwaCx7rk46q7VB9SkNBCsrFDr2Xn4VG7OykEQ8UytMkh35hY7NBC2zilJnwC8lV7TJXfYsxVdP5cHTf0sMkaIU4ZJJv0+MNh5/+L7bsxEnxXLY+rW9V8bd35lKlnb4r3o3fXJZVgsM/Vo1o7rLSWlKDKJ0pzKj6I9dvxVM57WFXTkg3WGmlJh5PP9M7wiOsnsX8/DoLtJ8T96jUb4yrgZyEWfKEHJz3yvqlVKSEYJi2SL6tblSZWXLcQij3oZTfE7yviWr8gzjVcOv0crWzt5pDasRbMQo1PQ25r+FV854iT4PEtylRVd7hZZy2FlxQ0s1Z3juqVSdOaU0owTNzO/erWaTZYPnESfN/1enK3FD+cGHfoUIm/CfbZ/F7dOuaLk1owCVu8qWW8MGle/OdREmlE+VP6Qkh7rXnTpuIbduubn/JviZwpIYLHulyTdTPvK2u+lmk45Btzr2Sy3Z02gmHqMc8EdT0IyQbLnjYF1b7QRq1nvP1EYmdTEm3O5G3i+2r+kpvV1hhTwjjFan203SkmTU444K8k3qRJy+Uj6lYLy9NW9bxjoIGV+lKeUj44aWniZ7SZ0ay5m+3aGjdujnBu3EWIz3ScZrl3wRE5veJ/zDinzZymzVk2sVQMBXDyHee1UVvSghGaWOFdYlL8p/2X5pzVtGWCpZjzKg+p24WMDql+bqEt6V3hK3bz5qQfCZNiR4pZDRRyxyNCrW1PI8utyjwxoZ5lvjs2lweEaaFBYWYzX8vu6tBXacxjdMjKZRbCWc4rfekE75fbx7rMO7fNzIYu8Iybl3ehGAjg4hDlaVuHpH35vSt9wzV/K7/LTHpNVNEqHnaKu/VZuy0st0qZtolDrNAdI8SMHfeYS6/JKlo3txy/F0/o7/ozwGIxLL7lS+9InHhl4mPC9GE5xfxGC1nxU+HNndnBZmsw0VgQ+Jwt+r2R8teTHhVJuFEiWc13/JA/6xGPcoZFvdrBmYIW1vvK2rTygP2t5FxHJO8nzLlOzqVY3c5nOKUWq17Usta3BHetvLNiWbKuJJL5M2YNVBboi4YpXKYtD21hD1t8lRIqPeMnJzGHQCT3p8zr5prtWwi4F5ed8XFqJ1/gt0DZUtfkqUnNxhXJ/kEOm3he/kK/TgFDE1rTtL2jhg2+iJUUfyj7mdluUcoJBphzu/yrvnKk4CIGJMN4bwdW8062+1RzPT+yz03+VUVqfpyjP7MYpL8rZUgbK4V2PJxik/+Mly3KlIkpSbK2pebnzTkx/o3cbK5WH6gm9uGmPFVPV9rhYScbfFazFH8oqrj9WGqundJ7PHuc+Cvn6O+KGBLjSrntE1V87j+V6ZiYNmlR6q6eYiFylPMqP/BdvBeDOnQIpImtgdXy57h+MjWlNWzSoCVn3yr+yLn6uyz68b1U9RQpVsx72Iafkfwdj6fCrEo7wfB+sevf5QO+axcy2Md4B8FBttLoz/Zrrf96dxomnabNznGM5mUG+t53ZQBndxByj7BdLxmq4kv5TxVr0tOWNBqyTysD7pYv+ttZJVzss8HaKY6xLTABoIZnedmetsJiafZUHCViunzEP35ZRj/OaZcOlOQIOwPrljjFy1nPRl+VrgMSDDDrYuUZJvq3pBP96NWuDC83lewKnGjokQ7xtH1nuluWIaIyd7DnWW7zb00ufenTLibfNrCPfYFJ8JIPmB5dPeczhGCAuVd4nma8f4sE3ehDj4yNXHs4zN7g1WgkCzxPT86YhOkM6+xmDVR+xlRy/Pfl0pNzM2wMSlLNQQ54p8tpaBHviN9PzKjlaTLQmvlbd9sj4jFKAvfmc26G0FzHQfYTsp5cnXhTefHOQ5l2NzPUXJ1ZmG+XDzI8eH8+Z3EW3dMybcDJMY5y1Jse5oe14vUmR+Q1BC2CjXrlAZ4HuSdYlkFQRnfK6ZoSS9tNDVUcpdpodmi1fEvMaHt5KovgsFiYW3+zYpe3UhT6mUJXSimjOCnWdiMnqaKaWuOVZurlfOEoWjI+w2tItZOIgiNfjhcVjA/HZDZd6EIxnSgiL+4fJWmikTpOcYpT4etwNvChcMhF9qb2cOfaVchoYW79KG4SN9M/0lEKBRRSSB455JBLDjkIsgGFLMCFB3AiaaWVFlppoYVGGjnd1qpQ28RiFstV9tb2c8/a5aQKR095oxjFiJTNw90t14qV7o+mtMNUq3Y9a+a9s11XM1JcwaCkTPE6yVaxidVyrb0dr8rZQaZFvdtbGaQM9AwWfelDeQInOk6l2MNWtipb79zfEe5MB5z3NrMwp4+tt6eXKBWlsoxSyugKdEEhmyKgASdu6oAaqmWVUi2rRRUHxL7TlZnpy1qwYMGCBQsWLFiwYCGV+D+ZSxKMIN18mwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wOC0xMFQwNTozNDowOSswMDowMIkZh/IAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDgtMTBUMDU6MzQ6MDkrMDA6MDD4RD9OAAAAAElFTkSuQmCC";
                else
                    imgsrc = "data:" + obj.Profile_ImgType + ";base64," + obj.Profile_Img;
                return imgsrc;
            },
            async loadClass() {
                const classResponse = await DataSource.shared.getAttendanceClass();
                this.arrobj_Classes = classResponse.Table;
                this.activeClass = this.arrobj_Classes[0].PK_Class_ID;
            },
            async loadStudents(classID) {
                try {
                    if (classID === undefined) {
                        this.fileStudent = this.arrobj_Classes[0].PK_Class_ID;
                    } else {
                        this.fileStudent = classID;
                        this.activeClass = classID;
                    }
                    const studentResponse = await DataSource.shared.getAllActiveStudentsByClass(this.fileStudent);


                    if (studentResponse) {

                        this.arrobj_Student = studentResponse.Table;
                        this.StudentResult = "";
                        switch (studentResponse.code) {
                            case "1":
                                break;
                            case "2":
                                this.StudentResult = `No Student Yet...`;
                                break;
                        }
                    }
                } catch (e) {
                    console.log(e);
                    this.error = e;
                }


            },
            async loadPortfolio(student) {
                const {Student_ID} = student;
                // DataSource.shared.getPortfolioListByStudentID(Student_ID).then((result) => {
                //     this.arrobj_Portfolios = result.Table;
                // });

                this.selectedStudentsName = student.First_Name;
                this.activeStudent = Student_ID;

                const result = await DataSource.shared.getPortfolioListByStudentID(Student_ID);
                if (result) {
                    this.arrobj_Portfolios = result.Table;


                    const studentSelected = this.arrobj_Student.find(d => d.PortfolioStudentID === Student_ID);
                }

                this.loadPortfolioPosts(Student_ID);
            },
            loadPortfolioPosts(Student_ID) {
                this.arrobj_Posts = [];
                this.showLoading();

                DataSource.shared.getStudentPostByType(Student_ID, this.str_PostType, this.int_NumberOfPost).then((result) => {
                    return result.Table;
                }).then((arrobj_Portfolio) => {
                    if (this.isNull(arrobj_Portfolio))
                        return;

                    let temparr_Promise = [];

                    for (let obj of arrobj_Portfolio)
                        temparr_Promise.push(DataSource.shared.getPostFile(obj.PostID));

                    Promise.all(temparr_Promise).then((result) => {
                        for (let [index, obj_Portfolio] of arrobj_Portfolio.entries())
                            obj_Portfolio.ArrObj_Images = result[index].Table;

                        this.arrobj_Posts = arrobj_Portfolio;
                    });
                }).finally(() => {
                    setTimeout(this.hideLoading, 2050);
                    // this.hideLoading();
                });

            },

            /*#region Array Grouping Function*/
            groupBy(data, key, display) {
                //Credits to Ceasar Bautista and Juan Castillo @ stackoverflow
                /*return data.reduce(function(storage, item) {
                    let group = item[key];

                    storage[group] = storage[group] || [];
                    storage[group].push(item);
                    return storage;
                }, {});*/
                let ArrObj_Sorted = [];
                let arrstr_display = !this.isNull(display) ? display.split(",") : [key];

                for (let item of data) {
                    let index = ArrObj_Sorted.findIndex(x => x.Str_SortBy === item[key]);

                    if (index === -1) {
                        let str_Display = "";
                        for (let tempdisp of arrstr_display)
                            str_Display += item[tempdisp] + " ";

                        ArrObj_Sorted.push({Str_SortBy: item[key], Str_Display: str_Display, ArrObj_Items: [item]});
                    } else
                        ArrObj_Sorted[index].ArrObj_Items.push(item);
                }

                return ArrObj_Sorted;
            }
            /*#endregion*/,

            /*#region Scroll Loader Functions*/
            getScrollPercent() {
                //Credits to Phil Ricketts @ stackoverflow
                let height = document.documentElement,
                    body = document.body,
                    scrollTop = "scrollTop",
                    scrollHeight = "scrollHeight";

                return (height[scrollTop] || body[scrollTop]) / ((height[scrollHeight] || body[scrollHeight]) - height.clientHeight) * 100;
            },
            isScrollable() {
                return $(document).height() > $(window).height();
            },
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
            },
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
                if (typeof func != "function") {
                    throw new TypeError("Expected a function");
                }
                return setTimeout(func, +wait || 0, ...args);
            },
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
            },
            /*#endregion*/
        },
        mounted() {

            let self = this;

            self.loadClass();

            /*#region floating draggable component. Need to be at main body to work instead of inside a modal*/
            /*let nabarxHeight = $(".nabarx").outerHeight();
            let menuBoxWrap = $(".menu-box-wrap").outerHeight();

            $(window).scroll(() => {
                if ($(window).scrollTop() > (nabarxHeight + menuBoxWrap))
                    $(".draggable" +
                        "").addClass("position-fixed");
                else
                    $(".draggable" +
                        "").removeClass("position-fixed");
            });*/
            /*#endregion*/

            /*#region Select/Unselect All Functions*/
            $("#btn_SelectAll").click(() => {
                let cb_All = $("input[type='checkbox']");

                cb_All.each(function () {
                    if (!$(this).prop("checked"))
                        $(this).click();
                });
            });

            $("#btn_UnselectAll").click(() => {
                let cb_All = $("input[type='checkbox']");

                cb_All.each(function () {
                    if ($(this).prop("checked"))
                        $(this).click();
                });
            });
            /*#endregion*/

            $(document).on("change", "#ddl_Students", self.debounce(() => {
                // self.loadPosts();
                self.loadPortfolio();
                self.loadPortfolioPosts();
            }, 250));
        },
        components: {
            draggable
        },
    };
</script>
<style scoped>
    #tbl_Portfolios {
        width: 100%;
    }

    #tbl_Portfolios tbody tr {
        cursor: pointer;
    }

    #tbl_Portfolios tbody th div {
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /*#region Post Card*/
    .card {
        max-width: 16rem;
        margin: 10px 0;
    }

    .card .card-body p {
        overflow: hidden;
        text-overflow: ellipsis;
        /*white-space: nowrap;*/
        max-height: 60px;
        width: 198px;
    }

    /*#endregion*/

    /*#region Custom Checkbox*/
    .label-checkbox {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .span-checkbox {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
    }

    .label-checkbox:hover ~ .span-checkbox {
        background: #ccc;
    }

    .label-checkbox input:checked ~ .span-checkbox {
        background-color: #2196f3;
    }

    .label-checkbox input:checked ~ .span-checkbox:after {
        display: block;
    }

    .span-checkbox:after {
        content: "";
        position: absolute;
        display: none;
        left: 8px;
        top: 4px;
        width: 8px;
        height: 14px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    /*#endregion*/

    /*#region Draggable*/
    .fa-arrows-h {
        font-size: 25pt;
    }

    .fa-arrows-h:hover {
        cursor: pointer;
    }

    .position-fixed {
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
        margin: 0;
        background-color: white;
    }

    .item {
        background-color: #ccc;
        padding: 5px 10px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 100px;
        margin: 15px 5px 15px 10px;
    }

    .overflow-x-scroll {
        overflow-x: auto;
    }

    .sortable-ghost {
        opacity: 0.5;
    }

    .sortable-drag {
        opacity: 0;
    }

    .sortable-chosen {
        opacity: 0.5;
    }

    /*#endregion*/

    @media (max-width: 576px) {
        .student-image {
            max-width: 94px;
        }
    }

    @media (max-width: 768px) {
        .student-image {
            max-width: 120px;
        }
    }

    .div_PortfolioPosts {
        max-height: 500px;
        overflow-y: scroll;
    }
</style>
<style>
    #portfolioCarousel .carousel-control-prev, #portfolioCarousel .carousel-control-next {
        background-color: black;
    }
</style>