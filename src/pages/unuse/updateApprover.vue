<template>
    <div id="approver" class="mt-3 container">
        <div>
            <h4>Update Approver</h4>
            <div style="width: 80%;margin:auto;">
                <form class="needs-validation" novalidate @submit.prevent="onSubmit">

                    <div class="mb-2">
                        <!--<label for="password">Password</label>-->
                        <input type="text" class="form-control" id="approverID" v-model="approverID"
                               placeholder="Approver ID"
                               required>
                        <div class="invalid-feedback" style="width: 100%;">
                            Your Approver ID is required.
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="approverLevel">Approver Level</label>
                        <select class="form-control" id="approverLevel" v-model="approverLevel">
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <div class="invalid-feedback" style="width: 100%;">
                            Please select a level.
                        </div>
                    </div>

                    <div class="mb-2">
                        <!--<label for="password">Password</label>-->
                        <input type="text" class="form-control" id="approverUserID" v-model="approverUserID"
                               placeholder="Approver User ID"
                               required>
                        <div class="invalid-feedback" style="width: 100%;">
                            Your Approver User ID is required.
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="approverLevel">Status</label>
                        <select class="form-control" id="status" v-model="status">
                            <option selected value="Active">Active</option>
                            <option value="Void">Disable</option>
                        </select>
                        <div class="invalid-feedback" style="width: 100%;">
                            Please select a status.
                        </div>
                    </div>
                    <div class="system-msg"><p>{{approverUpdateResults}}</p></div>
                    <div class="row d-flex mt-3 mb-5">
                        <div class="col-md-6"></div>
                        <div class="col-md-6">
                            <button class="btn btn-primary btn-lg btn-block login-btn"
                                    type="submit"
                                    :disabled="isLoading===true">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
    import DataSource from "../../data/datasource";

    export default {
        name: 'parentPost',
        data() {
            return {
                results: "",
                approverUpdateResults: "",
                approverID: "",
                approverLevel: "",
                approverUserID: "",
                status: "",
                isLoading: ""
            }
        },
        methods: {
            async onSubmit() {
                try {
                    this.isLoading = true;
                    const response = await DataSource.shared.updateApproverMaster(this.approverID, this.approverLevel, this.approverUserID,this.status);
                    this.isLoading = false;
                    console.log(response);
                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.approverUpdateResults = `Approver updated`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "2":
                                this.approverUpdateResults = `Duplicated approver`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "88":
                                this.approverUpdateResults = `Please Login`;
                                //this.results = `Invalid password - sample 2: code: ${response.code}`;
                                break;
                            case "99":
                                this.approverUpdateResults = `Please try again later`;
                                //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                break;
                        }
                    }
                } catch (e) {
                    this.approverSaveResults = e;
                    this.isLoading = false;
                }
            },
        }
    };
</script>

<style scoped>
</style>