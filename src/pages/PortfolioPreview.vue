<template>
    <div id="portfoliopreview">
        <div class="container">
            <div class="portfolio-preview__box mt-5 ">
                <div style="display: none;">{{ saveEditMode }}</div>
                <div style="display: none;">{{ portfolioID }}</div>
                <h2 v-if="savePortfolioAction">Create Portfolio</h2>
                <h2 v-if="approverPortfolioAction">Portfolio Edit</h2>
                <h2 v-if="!approverPortfolioAction && !savePortfolioAction && !btnDownloadPDF">Portfolio</h2>
                <h2 v-if="btnDownloadPDF">Portfolio Download</h2>
                <div class="row">
                    <div class="pp-header-wrap col-lg-4" :class="{'fix-box' :scrollPosition === true}">
                        <div class="pp-header">
                            <div class="ppTitle  mb-4">
                                <label>Portfolio Name</label>
                                <input type="text" class=" inputLearningStory" v-model="inputLearningStory"
                                       id="inputLearningStory">
                            </div>
                            <div class=" ppEndduringThemes mb-4" :class="{'comment-ActiveWrap' :!show3}">
                                <div class="row ppCommentBtn">
                                    <div class="col-lg-8"><label class="ppEndduringThemesTitle">Enduring
                                        Themes: </label></div>
                                    <div class="col-lg-4">
                                        <el-button @click="remarkHeader('Enduring Themes')" class="preview-comment__btn"
                                                   size="mini"
                                                   v-if="commentField">
                                            <i class="material-icons">
                                                chat_bubble_outline
                                            </i> Remark
                                        </el-button>
                                    </div>
                                </div>
                                <div class="preview-top">
                                    <el-input
                                            type="textarea"
                                            autosize
                                            v-model="taEnduringThemes"
                                            class="mb-4"
                                    >
                                    </el-input>
                                    <!--<textarea rows="1" class="textArea" v-model="taEnduringThemes"-->
                                    <!--@input="textareaResize($event)"></textarea>-->
                                    <!--<i class="fa fa-clone" aria-hidden="true" v-on:click="openCommentField($event)"-->
                                    <!--v-if="commentField">-->
                                </div>
                                <div class="preview-comment">
                                    <el-collapse-transition>
                                        <div v-show="!show3" class="spanComment">
                                            <div class="preview-comment_input" v-if="!btnDownloadPDF">
                                                <span class="text-left">Remark:</span>
                                                <!--<textarea rows="1" class="textArea" v-model="inputEndduringThemesComment" @input="textareaResize($event)"></textarea>-->
                                                <input type="text" class="form-control"
                                                       v-model="inputEndduringThemesComment">
                                            </div>
                                            <el-alert
                                                    title="No Remark Yet..."
                                                    type="warning"
                                                    :closable="false"
                                                    v-if="noEnduringRemark">
                                            </el-alert>
                                            <div v-for="value in portfolioCommentHistoryList"
                                                 class="preview-comment__list"
                                                 v-if="value.AppComValue !== undefined && value.AppComDesc==='Enduring Themes' && value.AppComType === 'Portfolio Header'">
                                                <label class="preview-comment__commenter">
                                                    Commenter:
                                                    <span>{{ value.CONname }}</span>
                                                    <span>Date: {{ value.AppComCreatedDate_convert }}</span>
                                                </label>
                                                <label>
                                                    {{ value.AppComValue }}
                                                </label>
                                            </div>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </div>
                            <div class="ppResearchQuestion" :class="{'comment-ActiveWrap' :!showResearch}">
                                <div class="row ppCommentBtn">
                                    <div class="col-lg-8"><label class="ppResearchQuestionTitle">Research
                                        Question: </label>
                                    </div>
                                    <div class="col-lg-4">
                                        <el-button class="preview-comment__btn"
                                                   size="mini"
                                                   v-if="commentField" @click="remarkHeader('Research Question')">
                                            <i class="material-icons">
                                                chat_bubble_outline
                                            </i> Remark
                                        </el-button>
                                    </div>
                                </div>
                                <div class="preview-top">
                                    <el-input
                                            type="textarea"
                                            autosize
                                            v-model="taResearchQuestion"
                                            class="mb-2 textArea"
                                    >
                                    </el-input>
                                    <!--<textarea rows="1" class="textArea" v-model="taResearchQuestion"-->
                                    <!--@input="textareaResize($event)"></textarea>-->
                                    <!--<i class="fa fa-clone" aria-hidden="true" v-on:click="openCommentField($event)"-->
                                    <!--v-if="commentField">                        </i>-->
                                </div>
                                <div class="preview-comment">
                                    <el-collapse-transition>
                                        <div v-show="!showResearch" class="spanComment">
                                            <div class="preview-comment_input" v-if="!btnDownloadPDF">
                                                <span class="text-left">Remark:</span>
                                                <!--<textarea rows="1" class="textArea" v-model="inputEndduringThemesComment" @input="textareaResize($event)"></textarea>-->
                                                <input type="text" class="form-control"
                                                       v-model="inputResearchQuestionComment">
                                            </div>
                                            <el-alert
                                                    title="No Remark Yet..."
                                                    type="warning"
                                                    :closable="false"
                                                    v-if="noResearchRemark">
                                            </el-alert>
                                            <div v-for="value in portfolioCommentHistoryList"
                                                 class="preview-comment__list"
                                                 v-if="value.AppComValue !== undefined && value.AppComDesc==='Research Question' && value.AppComType === 'Portfolio Header'">
                                                <label class="preview-comment__commenter">
                                                    Commenter: <span>{{ value.CONname }}</span>
                                                    <span>Date of Commenter: {{ value.AppComCreatedDate_convert }}</span>
                                                </label>
                                                <label>
                                                    {{ value.AppComValue }}
                                                </label>
                                            </div>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </div>
                            <div class="pp-header-button">
                                <button class="btn btn-secondary float-left" @click="$router.go(-1)">Back</button>
                                <button v-on:click="savePortfolio()" v-if="savePortfolioAction"
                                        class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch float-right">
                                    Submit
                                </button>
                                <button v-on:click="approvePortfolio('Approved')" v-if="approverPortfolioAction"
                                        class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch float-right">
                                    Approve
                                </button>
                                <button v-on:click="approvePortfolio('Reject')" v-if="approverPortfolioAction"
                                        class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch float-right">
                                    Reject
                                </button>
                                <button v-on:click="generatePortfolioPdf()" v-if="btnDownloadPDF"
                                        class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch float-right">
                                    Download PDF
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class=" ppEachPost" ref="ppEachPost_Update" v-for="item in postList">
                            <div class="ppDateOfObservation">
                                <span class="ppDateOfObservationTitle">
                                    <i class="material-icons">date_range</i> Date of observation: {{item.PostCreatedDate_convert}}
                                </span>
                                <!--<span><input type="text" class="form-control inputPostCreatedDate" ref="postCreatedDate"-->
                                <!--:value="item.PostCreatedDate_convert.trim()" readonly></span>-->
                                <!--<span ref="postCreatedDate">{{item.PostCreatedDate_convert.trim()}}</span>-->
                            </div>
                            <div class="preview-content-wrap"
                                 :class="{'comment-ActiveWrap' :item.showContent === false}">
                                <div class="row ppCommentBtn">
                                    <div class="col-lg-8"><label class="ppEndduringThemesTitle">Post Content </label>
                                    </div>
                                    <div class="col-lg-4">
                                        <el-button @click="showContent(item)" class="preview-comment__btn"
                                                   size="mini"
                                                   v-if="commentField">
                                            <i class="material-icons">
                                                chat_bubble_outline
                                            </i> Remark
                                        </el-button>
                                    </div>
                                </div>
                                <input type="text" class="form-control ppPostContent" ref="postContent"
                                       v-model="item.PostContent">
                                <!--<input type="text" class="form-control ppPostContent" ref="postContent"-->
                                <!--:value="item.PostContent.trim()" v-model="item.PostContent">-->
                                <!--<i class="fa fa-clone" aria-hidden="true" v-on:click="openCommentField($event)"-->
                                <!--v-if="commentField">-->
                                <!--<span class="spanComment">-->
                                <!--<div v-for="value in portfolioCommentHistoryList"-->
                                <!--v-if="value.AppComValue !== undefined && value.AppComApproverItemID === item.PostID && value.AppComType === 'Portfolio Details' && value.AppComDesc === 'Post Title'">-->
                                <!--<label>-->
                                <!--Commenter: {{ value.CONname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date of Commenter: {{  value.AppComCreatedDate_convert }}-->
                                <!--</label>-->
                                <!--<label>-->
                                <!--{{ value.AppComValue }}-->
                                <!--</label>-->
                                <!--</div>-->
                                <!--<input type="text" class="form-control" ref="postContentComment">-->
                                <!--</span>-->
                                <!--</i>-->
                                <div class="preview-comment">
                                    <el-collapse-transition>
                                        <div v-show="item.showContent === false" class="spanComment">
                                            <div class="preview-comment_input" v-if="!btnDownloadPDF">
                                                <span class="text-left">Remark:</span>
                                                <input type="text" class="form-control" ref="postContentComment">
                                            </div>
                                            <el-alert
                                                    title="No Remark Yet..."
                                                    type="warning"
                                                    :closable="false"
                                                    v-if="item.noContentRemark">
                                            </el-alert>
                                            <div v-for="value in portfolioCommentHistoryList"
                                                 class="preview-comment__list"
                                                 v-if="value.AppComValue !== undefined && value.AppComApproverItemID === item.PostID && value.AppComType === 'Portfolio Details' && value.AppComDesc === 'Post Title'">
                                                <label class="preview-comment__commenter">
                                                    <span>Commenter: {{ value.CONname }}</span>
                                                    <span>Date of Commenter: {{ value.AppComCreatedDate_convert }}</span>
                                                </label>
                                                <label>
                                                    {{ value.AppComValue }}
                                                </label>
                                            </div>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </div>
                            <div class="carousel-wrap">
                                <b-carousel id="carousel1"
                                            style="text-shadow: 1px 1px 2px #333;"
                                            indicators
                                            :controls="!isNull(mediaList[item.PostID]) && mediaList[item.PostID].length>1"
                                            background="#ababab"
                                            :interval="0">
                                    <div class="ppMedia" v-for="media in mediaList[item.PostID]">
                                        <b-carousel-slide>
                                            <img slot="img" class="card-img-top d-block img-fluid w-100"
                                                 :src="getLowSource(media)"
                                            />
                                        </b-carousel-slide>
                                    </div>
                                </b-carousel>
                            </div>
                            <!--<div v-for="media in postList[item.PostID]" >-->
                            <!--<img slot="img" class="card-img-top d-block img-fluid w-100"-->
                            <!--:src="getLowSource(media)"/>-->
                            <!--</div>-->
                            <div class="ppGoals" :class="{'comment-ActiveWrap' :item.showConnection === false}">
                                <div class="row ppCommentBtn">
                                    <div class="col-lg-8"><label class="ppEndduringThemesTitle">Connection with
                                        long-term goals </label></div>
                                    <div class="col-lg-4">
                                        <el-button @click="showConnection(item)"
                                                   class="preview-comment__btn"
                                                   size="mini"
                                                   v-if="commentField">
                                            <i class="material-icons">
                                                chat_bubble_outline
                                            </i> Remark
                                        </el-button>
                                    </div>
                                </div>
                                <!--<div class="ppGoalsTitle mb-2"></div>-->
                                <div class="preview-top mb-3">
                                    <el-input
                                            type="textarea"
                                            autosize
                                            v-model="item.newConnection"
                                            ref="postGoal"
                                            class="mb-2"
                                    >
                                    </el-input>
                                    <!--<textarea rows="1" class="textArea" @input="textareaResize($event)" ref="postGoal">{{ item.PostPorDtlDevelopmentGoals }}</textarea>-->
                                    <!--<i class="fa fa-clone" aria-hidden="true" v-on:click="openCommentField($event)"-->
                                    <!--v-if="commentField">-->
                                    <!--<span class="spanComment">-->
                                    <!--<div v-for="value in portfolioCommentHistoryList"-->
                                    <!--v-if="value.AppComValue !== undefined && value.AppComApproverItemID === item.PostID && value.AppComType === 'Portfolio Details' && value.AppComDesc === 'Post Goals'">-->
                                    <!--<label>-->
                                    <!--Commenter: {{ value.CONname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date of Commenter: {{  value.AppComCreatedDate_convert }}-->
                                    <!--</label>-->
                                    <!--<label>-->
                                    <!--{{ value.AppComValue }}-->
                                    <!--</label>-->
                                    <!--</div>-->
                                    <!--<input type="text" class="form-control" ref="postGoalComment">-->
                                    <!--</span>-->
                                    <!--</i>-->
                                </div>
                                <div class="preview-comment">
                                    <el-collapse-transition>
                                        <div v-show="item.showConnection === false" class="spanComment">
                                            <div class="preview-comment_input" v-if="!btnDownloadPDF">
                                                <span class="text-left" >Remark:</span>
                                                <input type="text" class="form-control" ref="postGoalComment">
                                            </div>
                                            <el-alert
                                                    title="No Remark Yet..."
                                                    type="warning"
                                                    :closable="false"
                                                    v-if="item.noConnectionRemark">
                                            </el-alert>
                                            <div v-for="value in portfolioCommentHistoryList"
                                                 class="preview-comment__list"
                                                 v-if="value.AppComValue !== undefined && value.AppComApproverItemID === item.PostID && value.AppComType === 'Portfolio Details' && value.AppComDesc === 'Post Goals'">
                                                <label class="preview-comment__commenter">
                                                    <span>Commenter: {{ value.CONname }}</span>
                                                    <span>Date of Commenter: {{ value.AppComCreatedDate_convert }}</span>
                                                </label>
                                                <label>
                                                    {{ value.AppComValue }}
                                                </label>
                                            </div>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </div>
                            <div class="ppObservation" :class="{'comment-ActiveWrap' :item.showObservation === false}">
                                <div class="row ppCommentBtn">
                                    <div class="col-lg-8"><label class="ppEndduringThemesTitle">Anecdotal
                                        Observations</label></div>
                                    <div class="col-lg-4">
                                        <el-button @click="showObservation(item)"
                                                   class="preview-comment__btn"
                                                   size="mini"
                                                   v-if="commentField">
                                            <i class="material-icons">
                                                chat_bubble_outline
                                            </i> Remark
                                        </el-button>
                                    </div>
                                </div>
                                <!--<div class="ppObservationTitle mb-2">Anecdotal Observations</div>-->
                                <div class="preview-top mb-3">
                                    <el-input
                                            type="textarea"
                                            autosize
                                            v-model="item.newAnalysis"
                                            ref="postObservation"
                                    >
                                    </el-input>
                                    <!--<textarea rows="1" class="textArea" @input="textareaResize($event)" ref="postObservation">{{ item.PostPorDtlAnalysisReflection }}-->
                                    <!--{{ item.PostPorDtlObservation }}</textarea>-->
                                    <!--<i class="fa fa-clone" aria-hidden="true" v-on:click="openCommentField($event)"-->
                                    <!--v-if="commentField">-->
                                    <!--<span class="spanComment">-->
                                    <!--<div v-for="value in portfolioCommentHistoryList"-->
                                    <!--v-if="value.AppComValue !== undefined && value.AppComApproverItemID === item.PostID && value.AppComType === 'Portfolio Details' && value.AppComDesc === 'Post Observations'">-->
                                    <!--<label>-->
                                    <!--Commenter: {{ value.CONname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date of Commenter: {{  value.AppComCreatedDate_convert }}-->
                                    <!--</label>-->
                                    <!--<label>-->
                                    <!--{{ value.AppComValue }}-->
                                    <!--</label>-->
                                    <!--</div>-->
                                    <!--<input type="text" class="form-control" ref="postObservationComment">-->
                                    <!--</span>-->
                                    <!--</i>-->
                                </div>
                                <div class="preview-comment">
                                    <el-collapse-transition>
                                        <div v-show="item.showObservation === false" class="spanComment">
                                            <div class="preview-comment_input" v-if="!btnDownloadPDF">
                                                <span class="text-left">Remark:</span>
                                                <input type="text" class="form-control" ref="postObservationComment">
                                            </div>
                                            <el-alert
                                                    title="No Remark Yet..."
                                                    type="warning"
                                                    :closable="false"
                                                    v-if="item.noObservationRemark">
                                            </el-alert>
                                            <div v-for="value in portfolioCommentHistoryList"
                                                 class="preview-comment__list"
                                                 v-if="value.AppComValue !== undefined && value.AppComApproverItemID === item.PostID && value.AppComType === 'Portfolio Details' && value.AppComDesc === 'Post Observations'">
                                                <label class="preview-comment__commenter">
                                                    <span>Commenter: {{ value.CONname }}</span>
                                                    <span>Date of Commenter: {{ value.AppComCreatedDate_convert }}</span>
                                                </label>
                                                <label>
                                                    {{ value.AppComValue }}
                                                </label>
                                            </div>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="portfolio-preview__submit row">-->
                <!--<div class="col-lg-6">-->
                <!--</div>-->
                <!--<div class="col-lg-6">-->
                <!--</div>-->
                <!--</div>-->
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";
    import Vue from 'vue';
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

    export default {
        name: "PortfolioPreview",
        data() {
            return {
                postList: [],
                mediaList: [],
                portfolioCommentHistoryList: [],

                taEnduringThemes: '',
                taResearchQuestion: '',
                inputLearningStory: '',
                taObservation: '',
                saveEditMode: '',
                savePortfolioAction: '',
                approverPortfolioAction: '',

                commentField: '',
                spanEndduringThemes: '',
                inputEndduringThemesComment: '',
                inputResearchQuestion: '',
                inputResearchQuestionComment: '',
                portfolioID: '',
                connection: '',
                analysis: '',
                show3: true,
                showResearch: true,
                btnDownloadPDF: false,

                scrollPosition: false,
                showEnduringButton: true,
                showResearchButton: true,
                noEnduringRemark: false,
                noResearchRemark: false

            };
        },
        async created() {
            if (this.$route.params.mode === '' || this.$route.params.mode === null || this.$route.params.mode === undefined) { //this is from email link
                if (this.$route.query.id != null || this.$route.query.id !== undefined) {
                    this.saveEditMode = 'APPROVER';
                    //this.portfolioID = this.$route.query.id;
                    this.commentField = true;

                    await this.deString(this.$route.query.id.replace(' ', '+'));
                } else {
                    this.$router.go(-1);
                    // this.$router.push('/Portfolio');
                }
            } else {
                if (this.$route.params.mode === 'NEW') {
                    this.saveEditMode = 'NEW';
                    this.savePortfolioAction = true;

                    await this.getPostData(this.$route.params.stringifyPostIDs);
                } else if (this.$route.params.mode === 'EDIT') {
                    this.saveEditMode = 'EDIT';
                    this.commentField = true;

                    await this.getPortfolioComment(this.$route.params.portfolioID);
                    await this.getPortfolioPost(this.$route.params.portfolioID);


                    // this.postList = this.postList.map(m => {
                    // m.showContentButton = true;
                    //     m.showConnectionButton = true;
                    //     m.showObservationButton = true;
                    //     return m;
                    // });

                    if (this.$route.params.status === 'Approved') {
                        this.btnDownloadPDF = true;
                        this.commentField = true;
                        // this.postList.map(x => {
                        //     const exist = this.portfolioCommentHistoryList.find(p => {
                        //         // console.log(`${p.AppComApproverItemID} - ${x.PostID} - ${p.AppComDesc} p.AppComValue: ${p.AppComValue}`);
                        //         return p.AppComApproverItemID === x.PostID && p.AppComValue;
                        //     });
                        //     if (exist) {
                        //         // console.log(`matched, ${x.PostID} ${exist.AppComApproverItemID} ${exist.AppComValue}`)
                        //         if(exist.AppComDesc==="Post Title"){
                        //             x.showContentButton = true;
                        //         }
                        //         if(exist.AppComDesc==="Post Goals"){
                        //             x.showConnectionButton = true;
                        //         }
                        //         if(exist.AppComDesc==="Post Observations"){
                        //             x.showObservationButton = true;
                        //         }
                        //
                        //     }
                        //     return x;
                        // });
                    }
                } else if (this.$route.params.mode === 'APPROVER') {
                    this.saveEditMode = 'APPROVER';
                    this.portfolioID = this.$route.params.portfolioID;
                    this.commentField = true;

                    await this.getPortfolioComment(this.$route.params.portfolioID);
                    await this.getPortfolioPost(this.$route.params.portfolioID);
                    await this.checkApprover(this.$route.params.portfolioID);

                    // this.postList = this.postList.map(m => {
                    //     m.showContentButton = true;
                    //     m.showConnectionButton = true;
                    //     m.showObservationButton = true;
                    //     return m;
                    // });
                }
            }
        },
        component: {
            CollapseTransition
        },
        mounted() {
            window.addEventListener('scroll', this.updateScroll);
        },
        destroy() {
            window.removeEventListener('scroll', this.updateScroll);
        },
        methods: {
            remarkContent(item, AppComDesc) {
                let filterResult = [];

                filterResult = this.portfolioCommentHistoryList.filter(d => {
                    if (AppComDesc === "Post Title") {
                        return d.AppComApproverItemID === item.PostID && d.AppComDesc === "Post Title" && d.AppComValue !== undefined;
                    } else if (AppComDesc === "Post Goals") {
                        return d.AppComApproverItemID === item.PostID && d.AppComDesc === "Post Goals" && d.AppComValue !== undefined;
                    } else if (AppComDesc === "Post Observations") {
                        return d.AppComApproverItemID === item.PostID && d.AppComDesc === "Post Observations" && d.AppComValue !== undefined;
                    }
                });
                if (filterResult && filterResult.length < 1) {
                    if (AppComDesc === "Post Title") {
                        item.noContentRemark = true;
                    } else if (AppComDesc === "Post Goals") {
                        item.noConnectionRemark = true;
                    } else if (AppComDesc === "Post Observations") {
                        item.noObservationRemark = true;
                    }
                }
            },
            remarkHeader(AppComDesc) {
                console.log(AppComDesc)
                if (AppComDesc === 'Enduring Themes') {
                    this.show3 = !this.show3;
                } else if (AppComDesc === 'Research Question') {
                    this.showResearch = !this.showResearch;
                }
                let tempHeader = this.portfolioCommentHistoryList.filter(d => {
                    if (AppComDesc === 'Enduring Themes') {
                        return d.AppComDesc === "Enduring Themes" && d.AppComValue !== undefined;
                    } else if (AppComDesc === 'Research Question') {
                        return d.AppComDesc === "Research Question" && d.AppComValue !== undefined;
                    }
                });
                console.log(tempHeader);
                if (tempHeader && tempHeader.length < 1) {
                    if (AppComDesc === 'Enduring Themes') {
                        this.noEnduringRemark = true;
                    } else if (AppComDesc === 'Research Question') {
                        this.noResearchRemark = true;
                    }
                }
            },
            showContent(item) {
                if (item.showContent === true) {
                    item.showContent = false;
                } else {
                    item.showContent = true;
                }
                this.$forceUpdate();
                let AppComDesc = "Post Title";
                this.remarkContent(item, AppComDesc);
            },
            showConnection(item) {
                if (item.showConnection === true) {
                    item.showConnection = false;
                } else {
                    item.showConnection = true;
                }
                this.$forceUpdate();

                let AppComDesc = "Post Goals";
                this.remarkContent(item, AppComDesc);
            },
            showObservation(item) {
                if (item.showObservation === true) {
                    item.showObservation = false;
                } else {
                    item.showObservation = true;
                }
                this.$forceUpdate();
                let AppComDesc = "Post Observations";
                this.remarkContent(item, AppComDesc);
            },
            updateScroll() {
                if (window.scrollY > 200) {
                    this.scrollPosition = true;
                } else {
                    this.scrollPosition = false;
                }
            },
            isNull(obj) {
                return (obj === null || obj === undefined || obj === "undefined" || obj.length === 0 || obj === "");
            },
            async deString(inputString) {
                try {
                    const response = await DataSource.shared.deString(inputString);
                    if (response) {
                        switch (response.code) {
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$router.push('/pendingapprover');
                                break;
                        }
                        this.portfolioID = response.string;

                        await this.getPortfolioComment(this.portfolioID);
                        await this.getPortfolioPost(this.portfolioID);
                        await this.checkApprover(this.portfolioID);
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPortfolioPost(portfolioID) {
                try {
                    const response = await DataSource.shared.getPortfolioHeaderDetails(portfolioID);
                    if (response) {
                        switch (response.code) {
                            case "2":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'no record found'
                                });
                                break;
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$router.push('/pendingapprover');
                                break;
                        }
                        response.HeaderTable.Table.forEach((m, index) => {
                            this.inputLearningStory = m.PortfolioTitle;
                            this.taEnduringThemes = m.PortfolioEnduringThemes;
                            this.taResearchQuestion = m.PortfolioResearchQuestion;
                        });
                        let tempPortfolioDetails = [];
                        response.DetailsTable.Table.forEach((m, index) => {
                            let my_object = {
                                PostID: m.PortfolioDetailsPostID,
                                PostCreatedDate_convert: m.PortfolioDetailsPostCreatedDate,
                                PostContent: m.PortfolioDetailsTitle,
                                PostPorDtlDevelopmentGoals: m.PortfolioDetailsGoals,
                                PostPorDtlAnalysisReflection: m.PortfolioDetailsObservations
                            };
                            this.connection = m.PortfolioDetailsGoals;
                            this.analysis = m.PortfolioDetailsObservations;
                            tempPortfolioDetails.push(my_object);
                        });
                        this.postList = tempPortfolioDetails;

                        this.getImage();
                        this.postList = this.postList.map(m => {
                            m.newAnalysis = m.PostPorDtlAnalysisReflection;
                            m.newConnection = m.PostPorDtlDevelopmentGoals;
                            m.showContent = true;
                            m.showConnection = true;
                            m.showObservation = true;
                            m.noContentRemark = false;
                            m.noConnectionRemark = false;
                            m.noObservationRemark = false;
                            return m;
                        });

                        // if (response.code === '88') {
                        //     window.location.replace('/');
                        // } else if (response.code === '99') {
                        //     // alert('Error');
                        // } else if (response.code === '2') {
                        //     alert('no record found');
                        //
                        // } else {
                        //     response.HeaderTable.Table.forEach((m, index) => {
                        //         this.inputLearningStory = m.PortfolioTitle;
                        //         this.taEnduringThemes = m.PortfolioEnduringThemes;
                        //         this.taResearchQuestion = m.PortfolioResearchQuestion;
                        //     });
                        //     let tempPortfolioDetails = [];
                        //     response.DetailsTable.Table.forEach((m, index) => {
                        //         let my_object = {
                        //             PostID: m.PortfolioDetailsPostID,
                        //             PostCreatedDate_convert: m.PortfolioDetailsPostCreatedDate,
                        //             PostContent: m.PortfolioDetailsTitle,
                        //             PostPorDtlDevelopmentGoals: m.PortfolioDetailsGoals,
                        //             PostPorDtlAnalysisReflection: m.PortfolioDetailsObservations
                        //         };
                        //         this.connection = m.PortfolioDetailsGoals;
                        //         this.analysis = m.PortfolioDetailsObservations;
                        //         tempPortfolioDetails.push(my_object);
                        //     });
                        //     this.postList = tempPortfolioDetails;
                        //
                        //     this.getImage();
                        // }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPostData(arrayPostID) {
                try {
                    //let jsonStringPostID = JSON.stringify(["POS201900005560","POS201900005576","POS201900005585"]);
                    let jsonStringPostID = arrayPostID;

                    const response = await DataSource.shared.getPostByPostID(jsonStringPostID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error'
                            });
                        } else {
                            this.postList = response.Table;
                            if (response.Table.length > 0) {
                                let tempAnalysis = response.Table[0].PostPorDtlAnalysisReflection;
                                let tempObservation = response.Table[0].PostPorDtlObservation;
                                this.analysis = tempAnalysis + '\n' + tempObservation;
                                let tempConnection = JSON.stringify(response.Table[0].PostPorDtlDevelopmentGoals);
                                this.connection = JSON.parse(tempConnection);

                                // let tempLearning = JSON.stringify(response.Table[0].PostPorDtlTitle);
                                // this.inputLearningStory = JSON.parse(tempLearning);

                            }

                            // response.Table.forEach((m, index) => {
                            //     let my_object = {
                            //         newAnalysis: m.PostPorDtlAnalysisReflection + '\n' + m.PostPorDtlObservation
                            //     };
                            //     m.push(my_object);
                            // });
                            this.getImage();
                            this.postList = this.postList.map(m => {
                                m.newAnalysis = m.PostPorDtlAnalysisReflection + '\n' + m.PostPorDtlObservation;
                                m.newConnection = m.PostPorDtlDevelopmentDomain + '\n' + m.PostPorDtlDevelopmentGoals;
                                return m;
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getImage() {
                for (const post of this.postList) {
                    const response2 = await DataSource.shared.getPostFile(post.PostID);
                    if (response2) {
                        if (response2.code === '88') {
                            window.location.replace('/');
                        } else if (response2.code === '2') {
                            console.log('no data found');
                        } else {
                            Vue.set(this.mediaList, post.PostID, response2.Table);
                        }
                    }
                }
            },
            getLowSource(file) {
                if (this.isImage(file))
                    return "data:" + file.PostItemFileType + ";base64," + file.PostItemFile;
                else
                    return "";
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
            textareaResize(e) {
                // this.$refs.ppEndduringThemesTa.style.minHeight = this.$refs.ppEndduringThemesTa.scrollHeight + 'px';
                // this.$refs.ppResearchQuestionTa.style.minHeight = this.$refs.ppResearchQuestionTa.scrollHeight + 'px';
                // this.$refs.ppObservationTa.style.minHeight = this.$refs.ppObservationTa.scrollHeight + 'px';
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
            },
            async savePortfolio() {
                try {
                    if (this.inputLearningStory === '' || this.taEnduringThemes === '' || this.taResearchQuestion === '') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all fields'
                        });
                    } else {
                        this.$vs.loading();
                        let postDetails = [];

                        // this.$refs.ppEachPost_Update.forEach((m, index) => {
                        //     let my_object = {
                        //         postID: this.postList[index].PostID,
                        //         postContent: this.$refs.postContent[index].value,
                        //         postGoal: this.$refs.postGoal[index].value,
                        //         postObservation: this.$refs.postObservation[index].value,
                        //         postCreatedDate: this.$refs.postCreatedDate[index].value
                        //     };
                        //     postDetails.push(my_object);
                        // });

                        this.postList.forEach((m) => {
                            let objects = {
                                postID: m.PostID,
                                postContent: m.PostContent,
                                // postGoal: m.PostPorDtlDevelopmentGoals,
                                postGoal: m.newConnection,
                                postObservation: m.newAnalysis,
                                postCreatedDate: m.PostCreatedDate_convert
                            };
                            postDetails.push(objects);
                        });


                        const response = await DataSource.shared.savePortfolio(this.$route.params.portfolioDesc, this.$route.params.studentID, this.$route.params.portfolioID, this.inputLearningStory, this.taEnduringThemes, this.taResearchQuestion, JSON.stringify(postDetails));
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$vs.loading.close();
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Please fill up all content..'
                                });
                            } else {
                                this.$vs.loading.close();
                                this.$notify({
                                    title: 'Success',
                                    message: 'Portfolio Submitted!',
                                    type: 'success'
                                });
                                setTimeout("window.location.replace('/Portfolio')", 300);

                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async approvePortfolio(actionStatus) {
                try {
                    this.$vs.loading();
                    let postDetailsComment = [];

                    this.$refs.ppEachPost_Update.forEach((m, index) => {
                        let my_object = {
                            postID: this.postList[index].PostID,
                            postContentComment: this.$refs.postContentComment[index].value,
                            postGoalComment: this.$refs.postGoalComment[index].value,
                            postObservationComment: this.$refs.postObservationComment[index].value
                        };
                        postDetailsComment.push(my_object);
                    });


                    let portfolioID = this.portfolioID;
                    let portfolioEnduringThemesComment = this.inputEndduringThemesComment;
                    let portfolioResearchQuestionComment = this.inputResearchQuestionComment;
                    let jsonStringCommentValue = JSON.stringify(postDetailsComment);

                    const response = await DataSource.shared.approvePortfolio(portfolioID, actionStatus, portfolioEnduringThemesComment, portfolioResearchQuestionComment, jsonStringCommentValue);
                    if (response) {
                        this.$vs.loading.close();
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error'
                                });
                            } else {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Done!',
                                    type: 'success'
                                });
                                this.$router.go(-1);
                                // window.location.replace('/');
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            openCommentField(e) {
                try {
                    if (e.target.classList.contains('visibleAll')) {
                        e.target.classList.remove('visibleAll');
                    } else {
                        e.target.className += " visibleAll";
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async checkApprover(portfolioID) {
                try {
                    const response = await DataSource.shared.checkApproveStatusByUser(portfolioID, "PORTFOLIO");
                    if (response) {
                        if (response.code === '1') {
                            this.approverPortfolioAction = true;
                        } else {
                            this.approverPortfolioAction = false;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPortfolioComment(portfolioID) {
                try {
                    const response = await DataSource.shared.getApproverComment(portfolioID);
                    if (response) {
                        this.portfolioCommentHistoryList = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async generatePortfolioPdf() {
                try {
                    this.$vs.loading();
                    const response = await DataSource.shared.generatePortfolioPDF(this.$route.params.portfolioID);
                    if (response) {
                        //console.log(response);

                        // const bytes = new Uint8Array(response); // pass your byte response to this constructor
                        //
                        // const blob=new Blob([bytes], {type: "application/pdf"});// change resultByte to bytes
                        //
                        // const link = document.createElement('a');
                        // link.href=window.URL.createObjectURL(blob);
                        // link.download="myFileName.pdf";
                        // link.click();

                        //

                        // const url = window.URL.createObjectURL(new Blob([response.data]));
                        // const link = document.createElement('a');
                        // link.href = url;
                        // link.setAttribute('download', 'file' + fileExt);
                        // document.body.appendChild(link);
                        // link.click();

                        this.$vs.loading.close();

                        var byteChar = atob(response);
                        var byteNo = new Array(byteChar.length);
                        for (var i = 0; i < byteChar.length; i++) {
                            byteNo[i] = byteChar.charCodeAt(i);
                        }

                        var byteArray = new Uint8Array(byteNo);
                        var file = new Blob([byteArray], {type: 'application/pdf;base64'});
                        var fileUrl = URL.createObjectURL(file);
                        // window.openBrowser(fileUrl);
                        window.open(fileUrl, '_blank', 'width=500, height=500');

                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }
            },
        },
    };
</script>
<style scoped>
    .carousel {
        /*width: 70%;*/
        display: inline-block;
    }

    .ppTitle, .ppResearchQuestion, .ppDateOfObservation, .ppPostContent, #carousel1 {
        margin-bottom: 20px;
    }

    .ppEachPost {
        background: #fff;
        padding: 20px;
        /* border-radius: 5px; */
        margin-bottom: 20px;
        /* border: 1px solid #ccc; */

    }

    /*.ppGoals, .ppObservation {*/
    /*padding: 10px 10px 20px 10px;*/
    /*border: 3px solid;*/
    /*}*/

    .ppObservation {
        border-top: 0px solid !important;
    }

    /*.ppTitle, .ppGoalsTitle, .ppObservationTitle {*/
    /*text-decoration: underline;*/
    /*font-weight: bold;*/
    /*}*/
    .ppEndduringThemes, .ppResearchQuestion, .ppGoals, .ppObservation {
        text-align: left;
    }

    .ppEndduringThemes .ppEndduringThemesTitle, .ppResearchQuestion .ppResearchQuestionTitle, .ppDateOfObservation .ppDateOfObservationTitle, .ppGoalsTitle, .ppObservationTitle {
        font-weight: bold;
    }

    .ppDateOfObservation {
        text-align: left;
    }

    .ppPostContent {
        color: #409eff;
        font-style: italic;
    }

    .ppMedia img {
        width: 100% !important;
    }

    .textArea {
        width: 100%;
        resize: none;
    }

    .inputLearningStory, .ppPostContent {
        /*text-align: center;*/
    }

    .inputPostCreatedDate {
        width: auto;
        display: inline;
    }

    .fa-clone {
        cursor: pointer;
    }

    .visibleAll * {
        visibility: visible !important;
    }
</style>