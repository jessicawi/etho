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
    import DataSource from "../data/datasource";

    export default {
        name: 'countryListPage',
        data() {
            return {
                list: [],
            };
        },
        async mounted() {
            // get data from api
            let response = await DataSource.shared.getCountryList();

            // assign data to "list"
            this.list = response.Table;
            console.log(response);
        },
    };
</script>

<style scoped>
    #main-content {
        padding: 74px 10px 10px 10px;
        min-height: 100vh;
    }
</style>
