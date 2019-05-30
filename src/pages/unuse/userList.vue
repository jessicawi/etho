<template>
    <div>
        <h2>API content below:</h2>
        <!-- render object in list(array) one by one -->
        <div v-for="object in list" :key="object.CNYCode">
            {{object.CNYid}} - {{ object.CNYname }}
        </div>

        <h2>End APi content</h2>
    </div>
</template>

<script>
    import DataSource from "../../data/datasource";

    export default {
        name: 'userList',
        data() {
            return {
                list: [],
            };
        },
        async mounted() {
            // get data from api
            let response = await DataSource.shared.getUserList();

            // assign data to "list"
            this.list = response.Table;
            console.log(response);
        },
    };
</script>

<style scoped>
</style>
