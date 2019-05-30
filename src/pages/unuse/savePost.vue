<template>
    <div id="staff-post" class="mt-3 container">
        <div class="save-post mt-2" style="width: 80%;margin:auto;">
            <h4>SAVE POST</h4>
            <form class="needs-validation form-style" novalidate @submit.prevent="onSubmit">

                <div class="mb-3">
                    <!--<label for="username">Username</label>-->
                    <textarea type="text" class="form-control" id="postContent" v-model="postContent"
                              placeholder="CONTENT"
                              required></textarea>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your content is required.
                    </div>
                </div>

                <div class="mb-2">
                    <!--<label for="password">Password</label>-->
                    <input type="text" class="form-control" id="tagAcademicYearID" v-model="tagAcademicYearID"
                           placeholder="Tag Academic Year ID"
                           required>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Tag Academic Year ID is required.
                    </div>
                </div>


                <div class="mb-2">
                    <label for="profolio">Profolio</label>
                    <select class="form-control" id="profolio" v-model="profolio">
                        <option selected value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div class="mb-2">
                    <!--<label for="password">Password</label>-->
                    <input type="text" class="form-control" id="tagUserID" v-model="tagUserID"
                           placeholder="Tag User ID"
                           required>
                    <small>separate ID by comma</small>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Tag User ID is required.
                    </div>
                </div>

                <div class="mb-2">
                    <!--<label for="password">Password</label>-->
                    <input type="text" class="form-control" id="tagClassID" v-model="tagClassID"
                           placeholder="Tag Class ID"
                           required>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Tag Class ID is required.
                    </div>
                </div>

                <div class="mb-2">
                    <!--<label for="password">Password</label>-->
                    <input type="text" class="form-control" id="tagLevelID" v-model="tagLevelID"
                           placeholder="Tag Level ID"
                           required>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Tag Level ID is required.
                    </div>
                </div>

                <input type="file" @change="onFileChanged">
                <button @click.prevent="onUpload">Upload!</button>

                <div class="mb-2">

                </div>
                <div class="system-msg"><p>{{results}}</p>
                    <p v-if="error" style="color: red">{{error}}</p></div>
                <div class="row d-flex mt-3 mb-5">
                    <div class="col-md-6"></div>
                    <div class="col-md-6">
                        <button class="btn btn-primary btn-lg btn-block login-btn" type="submit">Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>

<script>
    import DataSource from "../../data/datasource";
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    import '@websanova/vue-upload';

    export default {
        name: 'staffPost',
        data() {
            return {
                error: "",
                results: "",
                postContent: "",
                tagAcademicYearID: "",
                profolio: "",
                tagUserID: "",
                tagClassID: "",
                tagLevelID: "",
                // files: [],
                content: '<h2>Example</h2>',
                editorOption: {},
                selectedFile: null,

                dropzoneOptions: {
                    url: 'http://local.emsv2/controller/Upload_File.asmx/uploadFile',
                }
            }
        },
        components: {
            // FileUpload: VueUploadComponent
            // vueDropzone: vue2Dropzone
        },
        methods: {
            onFileChanged(event) {
                this.selectedFile = event.target.files
            },
            async onUpload() {
                const formData = new FormData();
                formData.append('myFile', this.selectedFile, this.selectedFile.name)
                this.formData = formData
                await DataSource.shared.uploadFile(this.selectedFile)
            },
            async onSubmit() {
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {
                    const saveResponse = await DataSource.shared.savePost(this.selectedFile, this.postContent, this.tagAcademicYearID, this.profolio, this.tagUserID, this.tagClassID, this.tagLevelID, this.formData);
                    if (saveResponse) {
                        switch (saveResponse.code) {
                            case "1":
                                this.results = `Post Submitted`;
                                break;
                            case "88":
                                this.results = `Please Login to submit post`;
                                break;
                            case "99":
                                this.results = `Please try again later`;
                                break;
                            // default:
                            //     alert("Please try again later");
                            //     this.results = JSON.stringify(response);
                        }
                    }
                } catch (e) {
                    console.log(e)
                    this.error = e;
                }

            }
        }
    };
</script>

<style scoped>
</style>