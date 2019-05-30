<template>
    <div id="main-content">
        <navBar/>
        <SideMenu/>
        <slot/>
    </div>

</template>

<script>
    import navBar from "../components/Nav";
    import SideMenu from "../components/SideMenu";
    // import Header from "../components/Header";

    export default {
        name: 'MainContent',
        components: {
            navBar,
            SideMenu
            // Header,
        },
    };
</script>

<style scoped>
</style>

<style>


</style>
