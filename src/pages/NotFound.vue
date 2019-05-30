<template>
    <div class="Content">
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>Oops! Nothing was found</h2>
                <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <a href="/">Return to homepage</a></p>
            </div>
        </div>
    </div>
</template>

<script>
    // import Step from "../components/Step";
    import DataSource from "../data/datasource";

    export default {
        name: 'notFound',
        data() {
            return {
                token: null,
                userType: null,
                list: [],
                results: "",
            };
        },
        async mounted() {

        },
        methods: {

        }
    };
</script>

<style scoped>


</style>
