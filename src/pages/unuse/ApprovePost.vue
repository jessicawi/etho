<template>
    <div id="staff-post" class="mt-3 container">
        <div>
            <h4>APPROVE POST</h4>
            <b>result:</b> {{results}}
            <form class="needs-validation" novalidate @submit.prevent="onSubmit">

                <div class="mb-3">
                    <label for="actionStatus">Status</label>
                    <select class="form-control" id="actionStatus" v-model="actionStatus">
                        <option selected value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <div class="invalid-feedback" style="width: 100%;">
                        Please select a level.
                    </div>
                </div>

                <div class="mb-2">
                    <!--<label for="password">Password</label>-->
                    <input type="text" class="form-control" id="postApproverID" v-model="postApproverID"
                           placeholder="Post Approver ID"
                           required>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Post Approver ID is required.
                    </div>
                </div>
                <div class="system-msg"><p>{{approverSaveResults}}</p></div>
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

</template>

<script>
    import DataSource from "../../data/datasource";

    export default {
        name: 'parentPost',
        data() {
            return {
                results: "",
                postApproverID: "",
                actionStatus: "",
                isLoading: "",
            }
        },
        methods: {
            async onSubmit() {
                try {
                    this.isLoading = true;
                    const response = await DataSource.shared.approvePost(this.postApproverID, this.actionStatus);
                    this.isLoading = false;
                    console.log(response);
                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.results = `Post Approved`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "2":
                                this.results = `Pending Earlier Approver Level`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "88":
                                this.results = `Please Login`;
                                //this.results = `Invalid password - sample 2: code: ${response.code}`;
                                break;
                            case "99":
                                this.results = `Please try again later`;
                                //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                break;
                        }
                    }
                } catch (e) {
                    this.results = e;
                    this.isLoading = false;
                }
            },
        }
    };
</script>

<style scoped>
</style>