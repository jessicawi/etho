<template>
    <div id="portfoliopreview">
        <div class="container">
            <div class="portfolio-preview__box">
                <div style="display: none;">{{ saveEditMode }}</div>
                <div style="display: none;">{{ portfolioID }}</div>
                <div class="ppTitle  mb-4">
                    <el-tooltip class="item" effect="dark" content="Portfolio Name" placement="top">
                        <input type="text" class=" inputLearningStory" v-model="inputLearningStory"
                               id="inputLearningStory">
                    </el-tooltip>
                </div>
                <div class="row">
                    <!--<el-button @click="show3 = !show3">Click Me</el-button>-->
                    <!--<el-collapse-transition>-->
                    <!--<div v-show="show3">-->
                    <!--<div class="transition-box">el-collapse-transition</div>-->
                    <!--<div class="transition-box">el-collapse-transition</div>-->
                    <!--</div>-->
                    <!--</el-collapse-transition>-->
                </div>
                <div class=" ppEndduringThemes ">
                    <div class="preview-top">
                        <label class="ppEndduringThemesTitle">Enduring Themes: </label>
                        <el-input
                                type="textarea"
                                autosize
                                v-model="taEnduringThemes"
                                class="mb-2"
                        >
                        </el-input>
                        <el-button @click="show3 = !show3" class="preview-comment__btn" size="mini" v-if="commentField">
                            <i class="material-icons">
                                chat_bubble_outline
                            </i>
                        </el-button>
                        <!--<textarea rows="1" class="textArea" v-model="taEnduringThemes"-->
                        <!--@input="textareaResize($event)"></textarea>-->
                        <!--<i class="fa fa-clone" aria-hidden="true" v-on:click="openCommentField($event)"-->
                        <!--v-if="commentField">-->
                    </div>
                    <div class="preview-comment">
                        <el-collapse-transition>
                            <div v-show="!show3" class="spanComment">
                                <h6 class="text-left">Remark:</h6>
                                <!--<textarea rows="1" class="textArea" v-model="inputEndduringThemesComment" @input="textareaResize($event)"></textarea>-->
                                <input type="text" class="form-control" v-model="inputEndduringThemesComment">
                                <div v-for="value in portfolioCommentHistoryList" class="preview-comment__list"
                                     v-if="value.AppComValue !== undefined && value.AppComDesc==='Enduring Themes' && value.AppComType === 'Portfolio Header'">
                                    <label class="preview-comment__commenter">
                                        Commenter: {{ value.CONname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>Date: {{ value.AppComCreatedDate_convert }}</span>
                                    </label>
                                    <label>
                                        {{ value.AppComValue }}
                                    </label>
                                </div>
                            </div>
                        </el-collapse-transition>
                    </div>
                    <div class="preview-top">
                        <label class="ppResearchQuestionTitle">Research Question: </label>
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
                        <el-button @click="showResearch = !showResearch" class="preview-comment__btn" size="mini"
                                   v-if="commentField">
                            <i class="material-icons">
                                chat_bubble_outline
                            </i>
                        </el-button>
                    </div>
                    <div class="preview-comment">
                        <el-collapse-transition>
                            <div v-show="!showResearch" class="spanComment">
                                <h6 class="text-left">Remark:</h6>
                                <!--<textarea rows="1" class="textArea" v-model="inputResearchQuestionComment" @input="textareaResize($event)"></textarea>-->
                                <input type="text" class="form-control" v-model="inputResearchQuestionComment">
                                <div v-for="value in portfolioCommentHistoryList" class="preview-comment__list"
                                     v-if="value.AppComValue !== undefined && value.AppComDesc==='Research Question' && value.AppComType === 'Portfolio Header'">
                                    <label class="preview-comment__commenter">
                                        Commenter: {{ value.CONname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date of Commenter:
                                        {{ value.AppComCreatedDate_convert }}
                                    </label>
                                    <label>
                                        {{ value.AppComValue }}
                                    </label>
                                </div>
                            </div>
                        </el-collapse-transition>
                    </div>
                </div>
                <!--div class="row ppEndduringThemes">
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 ppEndduringThemesTitle">Enduring Themes: </div>
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9" >

                    </div>
                </div>

                <div class="row ppResearchQuestion">
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 ppResearchQuestionTitle"></div>
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9" >

                    </div>
                </div-->
                <div v-for="item in postList" class="ppEachPost" ref="ppEachPost_Update">
                    <div class="ppDateOfObservation">
                        <span class="ppDateOfObservationTitle">Date of observation: </span>
                        <span><input type="text" class="form-control inputPostCreatedDate" ref="postCreatedDate"
                                     :value="item.PostCreatedDate_convert.trim()" readonly></span>
                        <!--<span ref="postCreatedDate">{{item.PostCreatedDate_convert.trim()}}</span>-->
                    </div>
                    <div class="preview-content-wrap">
                        <el-tooltip class="item" effect="dark" content="Post Content" placement="top">
                            <input type="text" class="form-control ppPostContent" ref="postContent"
                                   v-model="item.PostContent">
                            <!--<input type="text" class="form-control ppPostContent" ref="postContent"-->
                            <!--:value="item.PostContent.trim()" v-model="item.PostContent">-->
                        </el-tooltip>
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
                        <el-button @click="showContent = !showContent" class="preview-comment__btn" size="mini"
                                   v-if="commentField">
                            <i class="material-icons">
                                chat_bubble_outline
                            </i>
                        </el-button>
                    </div>
                    <div class="preview-comment">
                        <el-collapse-transition>
                            <div v-show="!showContent" class="spanComment">
                                <h6 class="text-left">Remark:</h6>
                                <input type="text" class="form-control" ref="postContentComment">
                                <div v-for="value in portfolioCommentHistoryList" class="preview-comment__list"
                                     v-if="value.AppComValue !== undefined && value.AppComApproverItemID === item.PostID && value.AppComType === 'Portfolio Details' && value.AppComDesc === 'Post Title'">
                                    <label class="preview-comment__commenter">
                                        Commenter: {{ value.CONname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date of Commenter:
                                        {{ value.AppComCreatedDate_convert }}
                                    </label>
                                    <label>
                                        {{ value.AppComValue }}
                                    </label>
                                </div>
                            </div>
                        </el-collapse-transition>
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
                    <div class="ppGoals">
                        <div class="ppGoalsTitle mb-2">Connection with long-term goals</div>
                        <div class="preview-top mb-3">
                            <el-input
                                    type="textarea"
                                    autosize
                                    v-model="item.PostPorDtlDevelopmentGoals"
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
                            <el-button @click="showConnection = !showConnection" class="preview-comment__btn"
                                       size="mini" v-if="commentField">
                                <i class="material-icons">
                                    chat_bubble_outline
                                </i>
                            </el-button>
                        </div>
                        <div class="preview-comment">
                            <el-collapse-transition>
                                <div v-show="!showConnection" class="spanComment">
                                    <h6 class="text-left">Remark:</h6>
                                    <input type="text" class="form-control" ref="postGoalComment">
                                    <div v-for="value in portfolioCommentHistoryList" class="preview-comment__list"
                                         v-if="value.AppComValue !== undefined && value.AppComApproverItemID === item.PostID && value.AppComType === 'Portfolio Details' && value.AppComDesc === 'Post Goals'">
                                        <label class="preview-comment__commenter">
                                            Commenter: {{ value.CONname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date of
                                            Commenter: {{ value.AppComCreatedDate_convert }}
                                        </label>
                                        <label>
                                            {{ value.AppComValue }}
                                        </label>
                                    </div>
                                </div>
                            </el-collapse-transition>
                        </div>
                    </div>
                    <div class="ppObservation">
                        <div class="ppObservationTitle mb-2">Anecdotal Observations</div>
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
                            <el-button @click="showObservation = !showObservation" class="preview-comment__btn"
                                       size="mini" v-if="commentField">
                                <i class="material-icons">
                                    chat_bubble_outline
                                </i>
                            </el-button>
                        </div>
                        <div class="preview-comment">
                            <el-collapse-transition>
                                <div v-show="!showObservation" class="spanComment">
                                    <h6 class="text-left">Remark:</h6>
                                    <input type="text" class="form-control" ref="postObservationComment">
                                    <div v-for="value in portfolioCommentHistoryList" class="preview-comment__list"
                                         v-if="value.AppComValue !== undefined && value.AppComApproverItemID === item.PostID && value.AppComType === 'Portfolio Details' && value.AppComDesc === 'Post Observations'">
                                        <label class="preview-comment__commenter">
                                            Commenter: {{ value.CONname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date of
                                            Commenter: {{ value.AppComCreatedDate_convert }}
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
                <div class="portfolio-preview__submit">
                    <button v-on:click="savePortfolio()" v-if="savePortfolioAction"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Submit
                    </button>
                    <button v-on:click="approvePortfolio('Approved')" v-if="approverPortfolioAction"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Approve
                    </button>
                    <button v-on:click="approvePortfolio('Reject')" v-if="approverPortfolioAction"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Reject
                    </button>
                    <button v-on:click="generatePortfolioPdf()" v-if="btnDownloadPDF"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Download PDF
                    </button>
                </div>
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
                showContent: true,
                showConnection: true,
                showObservation: true,
                btnDownloadPDF: false,
            };
        },
        async created() {
            if (this.$route.params.mode === '' || this.$route.params.mode === null || this.$route.params.mode === undefined) { //this is from email link
                if (this.$route.query.id != null || this.$route.query.id !== undefined) {
                    this.saveEditMode = 'APPROVER';
                    //this.portfolioID = this.$route.query.id;
                    this.commentField = true;

                    await this.deString(this.$route.query.id);
                } else {
                    this.$router.push('/Portfolio');
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

                    if (this.$route.params.status === 'Approved') {
                        this.btnDownloadPDF = true;
                    }
                } else if (this.$route.params.mode === 'APPROVER') {
                    this.saveEditMode = 'APPROVER';
                    this.portfolioID = this.$route.params.portfolioID;
                    this.commentField = true;

                    await this.getPortfolioComment(this.$route.params.portfolioID);
                    await this.getPortfolioPost(this.$route.params.portfolioID);
                    await this.checkApprover(this.$route.params.portfolioID);
                }
            }
        },
        component: {
            CollapseTransition
        },
        async mounted() {

        },
        methods: {
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
                            console.log(this.postList, "postList");
                            if (response.Table.length > 0) {
                                let tempAnalysis = response.Table[0].PostPorDtlAnalysisReflection;
                                let tempObservation = response.Table[0].PostPorDtlObservation;
                                this.analysis = tempAnalysis + '\n' + tempObservation;
                                console.log(this.analysis);
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
                                postGoal: m.PostPorDtlDevelopmentGoals,
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
        margin-bottom: 50px;
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
        text-align: right;
    }

    .ppPostContent {
        color: red;
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
        text-align: center;
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