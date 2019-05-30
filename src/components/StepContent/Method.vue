<template>
    <div id="method">
        fdlsfk ;dfkl;d fk;
        <div v-for="method in methods" :key="method.name">
            {{ method.name }}
        </div>
    </div>
</template>

<script>
    import DataSource from "@/data/datasource";

    export default {
        name: 'Method',
        data() {
            return {
                methods: [],
            };
        },
        async mounted() {
            // const res = await DataSource.shared.callAPI('Students', 'GET');
            // this.methods = res.json;
        },
    };
</script>

<style scoped>
    #step {

    }
</style>
