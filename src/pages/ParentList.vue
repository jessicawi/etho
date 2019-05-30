<template>
    <div id="parent-list">
        <div class="datatable-form__header">
            <div class="datatable-form__input form-group">
                <!--<label>Family No</label>-->
                <vs-input label-placeholder="Family No" v-model="inputFamilyNo" ref="inputFamilyNo" v-on:keyup.enter="Search"/>
            </div>
            <div class="datatable-form__input form-group">
                <!--<label>Parent First Name</label>-->
                <vs-input label-placeholder="Parent First Name" v-model="inputParentFirstName" ref="inputParentFirstName" v-on:keyup.enter="Search"/>
            </div>
            <div class="datatable-form__input form-group">
                <!--<label>Parent Last Name</label>-->
                <vs-input label-placeholder="Parent Last Name" v-model="inputParentLastName" ref="inputParentLastName" v-on:keyup.enter="Search"/>
            </div>

            <div class="datatable-form__submit text-center">
                <button class="btn btn-success searchbtn" v-on:click="Search">Search</button>
            </div>
        </div>
        <div class="mt-3 container">
            <div class="emptylist-info" v-if="list&&list.length===0" >
                <span>PLEASE SEARCH TO VIEW LIST...</span>
                <div class="emptylist__img">
                    <img src="../assets/table-loading.png"/>
                </div>
            </div>
            <div v-if="list&&list.length>0" class="datatable_group">
                <data-tables :data="list" :action-col="actionCol" @selection-change="handleSelectionChange">
                    <!--<el-table-column type="selection" width="55">-->
                    <!--</el-table-column>-->
                    <el-table-column v-for="parentListInfo in parentList" :prop="parentListInfo.prop"
                                     :label="parentListInfo.label" :key="parentListInfo.prop"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: 'ParentList',
        data() {
            return {
                list: [],
                parentList: [{
                    prop: "PAR_Family_Number",
                    label: "Family No"
                }, {
                    prop: "Parent_FName",
                    label: "Father's Name"
                }, {
                    prop: "Parent_MName",
                    label: "Mother's Name"
                }, {
                    prop: "Parent_GName",
                    label: "Guardian's Name"
                }, {
                    prop: "PAR_Status",
                    label: "Parent Status"
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
                            this.$router.push('parent?id=' + row.PAR_ID);
                        },
                        label: 'Edit'
                    }]
                },
                selectedRow: null,
                inputFamilyNo:"",
                inputParentFirstName:"",
                inputParentLastName:""
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
                    const response = await DataSource.shared.getParentList(this.$refs.inputFamilyNo.value, this.$refs.inputParentFirstName.value, this.$refs.inputParentLastName.value);
                    if (response) {
                        this.list = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
        },
    };
</script>

<style scoped>
</style>