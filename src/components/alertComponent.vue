<template>
    <b-modal class="alert-modal" hide-footer title="ARE YOU SURE?" v-model="showModal">
        Once you delete a post, you can't undo it.
        <br/>
        <div class="row d-flex submit-wrap">
            <div class="col-md-6">
                <b-btn class="float-left" @click="onCancelClick">Cancel</b-btn>
            </div>
            <div class="col-md-6">
                <b-btn class="float-right" @click="onOkClick">OK</b-btn>
            </div>
        </div>
    </b-modal>
</template>

<script>
    import isImage from "is-image";
    import DataSource from "../data/datasource";


    export default {
        name: 'alertComponent',
        props: ["showModal"],
        methods: {
            onCancelClick() {
                this.$emit("cancelClick")
            },
            onOkClick(){
                this.$emit("okClick")
            }
        }
    };
</script>