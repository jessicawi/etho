<template>
    <div id="manage-relationship">
        <div class="datatable-form__header">
            <div class="datatable-form__input form-group">
                <label>Family No</label>
                <input class="form-control" ref="familyID">
            </div>

            <div class="datatable-form__submit text-center">
                <button class="btn btn-success searchbtn" v-on:click="Search" @click="openLoading">Search</button>
            </div>
        </div>
        <div class="mt-3 container">

            <div v-if="list.length>0">
                <data-tables :data="list" :actionCol="actionCol" @selection-change="handleSelectionChange">
                    <el-table-column v-for="relationshipListInfo in relationshipList" :prop="relationshipListInfo.prop" :label="relationshipListInfo.label" :key="relationshipListInfo.prop"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>

            <b-modal id="editFamilyID" class="editFamilyID" size="lg" title="Edit Family ID" ok-only ok-variant="secondary" ok-title="Cancel" ref="editFamilyModalShowModal">
                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label style="display:none !important;">{{editStudentID}}</label>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Student Name: </label> <label>{{editStudentName}}</label>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Father Name: </label> <label>{{editFatherName}}</label>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Mother Name: </label> <label>{{editMotherName}}</label>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Guardian Name: </label> <label>{{editGuardianName}}</label>
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 editFamilyArea">
                        <label>Edit Family Id:</label>
                        <input class="form-control" ref="editFamilyID">
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 editFamilyArea">
                        <button v-on:click="Save" type="button" class="btn btn-primary waves-effect waves-light m-r-10" >Save</button>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "ManageRelationship",
        data() {
            return {
                editStudentName: '',
                editStudentID: '',
                editFatherName: '',
                editMotherName: '',
                editGuardianName: '',

                list: [],
                relationshipList: [{
                    prop: "Student_ID",
                    label: "Student ID",
                }, {
                    prop: "StudentName",
                    label: "Student Name"
                }, {
                    prop: "Parent_FName",
                    label: "Father Name"
                }, {
                    prop: "Parent_MName",
                    label: "Mother Name"
                }, {
                    prop: "Parent_GName",
                    label: "Guardian Name"
                }, {
                    prop: "PAR_Family_Number",
                    label: "Family Id"
                }],
                actionCol: {
                    label: 'Edit',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.$refs.editFamilyModalShowModal.show();
                            this.editStudentName = row.StudentName;
                            this.editStudentID = row.Student_ID;
                            this.editFatherName = row.Parent_FName;
                            this.editMotherName = row.Parent_MName;
                            this.editGuardianName = row.Parent_GName;
                            this.$refs.editFamilyID.value = row.PAR_Family_Number;
                        },
                        label: 'Edit'
                    }]
                },
                selectedRow: null,
            };
        },
        async mounted() {
        },
        methods: {
            handleSelectionChange(val) {
                this.selectedRow = val;
            },
            async Search() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getRelationship(this.$refs.familyID.value, '', '', '', '');
                    if (response) {
                        if (response.code == 2)
                        {
                            alert('No record found');
                        }
                        else if (response.code == 99) {
                            alert('Please try again later');
                        }
                        else
                        {
                            this.list = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close()
            },
            async Save(){
                try {
                    if (this.$refs.editFamilyID.value == "" || this.$refs.editFamilyID.value == null)
                    {
                        alert('Please fill in family no');
                    }
                    else
                    {
                        const response = await DataSource.shared.updateRelationship(this.$refs.editFamilyID.value, this.editStudentID);
                        if (response) {
                            if (response.code == 1)
                            {
                                alert("Successfully Edited");
                                this.$refs.editFamilyModalShowModal.hide();
                                this.list = [];
                                this.Search();
                            }
                            else if (response.code == 99) {
                                alert('Error! Please try again');
                                this.$refs.editFamilyModalShowModal.hide();
                                this.list = [];
                                this.Search();
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
        },
    }
</script>

<style scoped>
    .editFamilyArea
    {
        margin-top:20px;
    }
</style>