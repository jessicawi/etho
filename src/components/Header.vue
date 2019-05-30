<template lang="html">
    <div id="header"></div>

</template>

<script>
    // import SideMenu from "./SideMenu";

    export default {
        name: 'Header',
        // components: {SideMenu},
        data: () => ({
            active: false
        }),
        // data() {
        //     return {
        //         isSideBarOpen: false
        //     };
        // },
        // methods: {
        //     toggleSideBar: function () {
        //         this.isSideBarOpen = !this.isSideBarOpen; // toggle, true to false, false to true
        //     }
        // }
    };
</script>

<style>
    #header {
        background: #fff;
        text-align: center;
        padding: 15px;
        position: fixed;
        width: 100%;
    }

    .top-menu a {
        padding: 2px 5px;
    }

    header.vs-sidebar--header {
        background: #f8f6f7 !important;
    }

    .header-sidebar {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
    }

    .header-sidebar h4 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .header-sidebar h4 > button {
        margin-left: 10px;
    }

    .footer-sidebar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .footer-sidebar > button {
        border: 0px solid rgba(0, 0, 0, 0) !important;
        border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
        border-radius: 0px !important;
    }

    .vs-sidebar--background {
        z-index: 0 !important;
        background: #413f56 !important;
        position: absolute !important;
    }

    .vs-sidebar {
        background: #413f56 !important;
    }

    .vs-sidebar--item a {
        color: white !important;
    }

    .footer-sidebar > button {
        color: white !important;
    }

    .footer-sidebar > button:hover {
        color: #eb4052 !important;
    }

    .vs-divider--text {
        background: transparent !important;
        color: white !important;
    }

    .vs-divider .after, .vs-divider .before {
        border-color: #504e68 !important;
    }

    .vs-navbar--item span {
        display: none !important;
    }

    .vs-sidebar-group h4 {
        color: white;
        opacity: 0.8;
        font-size: .85rem !important;
    }


</style>
