<template>
    <div id="printClassStudent" class="container">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <el-button v-on:click="showClassModal()">Class</el-button>
        </div>
        <b-modal id="addClassModal" hide-footer size="lg"
                 title="Add_Class" ref="addClassModal">
            <EventTagsComponent @tags="setTags" :parent_Post="post"></EventTagsComponent>
            <el-button v-on:click="AddComponentValue()">Add Class</el-button>
        </b-modal>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import EventTagsComponent from "../components/Event_Tags_Component";
    export default {
        name: "PrintClassStudent",
    }
</script>

<style scoped>

</style>