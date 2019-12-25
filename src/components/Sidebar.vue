<template>

    <div class="sidebar-container col-md-4">
        <div class="sidebar-list-container col-md-4">
            <div class="each-sidebar" v-for="item in sidebarList" v-bind:class="item.name == defaultSidebarName ? 'active' : ''">
<!--                :href="item.linkto"-->
                <a class="w3-bar-item w3-button" v-on:click="changeSidebar($event, item.linkto, item.iconName)" v-bind:id="item.name">
                    <span class="sidebar-icon" style="display:block;"><i :class="item.iconName" class="fa fa-2x sidebar-logo" aria-hidden="true"></i></span>
                    <label class="sidebar-label">{{item.name}}</label>
                </a>
            </div>
        </div>

        <div class="sidebar-action-container col-md-8">
            <div class="action-header">
                <span class="action-logo" style="display:inline-block;"><i :class="sidebarIcon" class="fa fa-2x sidebar-logo" aria-hidden="true"></i></span>
                <label style="display: inline-block!important;">{{defaultSidebarName.toUpperCase()}}</label>
            </div>

            <div class="action-body">
                <a href="#" v-if="defaultSidebarName == 'Feed'">
                    <p class="common-action">Student Feed<i class="fa fa-angle-right" aria-hidden="true" style="float:right; margin: 5px 0px;"></i></p>
                </a>

                <a href="#" v-if="defaultSidebarName == 'Broadcast'">
                    <p class="common-action">Student Broadcast<i class="fa fa-angle-right" aria-hidden="true" style="float:right; margin: 5px 0px;"></i></p>
                </a>
            </div>
        </div>
    </div>

</template>

<script>
    import Cookies from "js-cookie";
    import $ from 'jquery';
    import DataSource from "../data/datasource";

    export default {
        name: "Sidebar",
        components: {},
        data() {
            return {
                sidebarList: [
                    {"name":"Bookmark", "iconName": "fa-bookmark-o", "linkto": "#"},
                    {"name":"Broadcast", "iconName": "fa-bell-o", "linkto": "newbroadcast"},
                    {"name":"Feed", "iconName": "fa-align-justify", "linkto": "newfeed"},
                    {"name":"Event", "iconName": "fa-calendar-o", "linkto": "newevent"},
                    {"name":"Media", "iconName": "fa-picture-o", "linkto": "newmedia"},
                    {"name":"Student", "iconName": "fa-user-circle-o", "linkto": "#"},
                    {"name":"Message", "iconName": "fa-comment-o", "linkto": "#"}],

                loading: true,
                defaultSidebarName: "",
                sidebarIcon: "",
                isParent: "",

                changedLink: "",
            };
        },
        methods: {
            changeSidebar: function(event, linkto, iconName) {
                event.preventDefault;

                if (this.defaultSidebarName != event.currentTarget.id) {

                    this.defaultSidebarName = event.currentTarget.id;
                    this.sidebarIcon = iconName;

                    // this.$router.push({name: pathName});
                    // this.$router.push('/' + linkto);
                    window.location.href = linkto;
                }
            },
        },
        mounted() {
            const self = this;

            let sidebarName = "";
            let sidebarIcon = "";

            if (this.$router.currentRoute.fullPath.toLowerCase() === "/newfeed") {
                sidebarName = "Feed";
                sidebarIcon = "fa-align-justify";
            } else if (this.$router.currentRoute.fullPath.toLowerCase() === "/newmedia") {
                sidebarName = "Media";
                sidebarIcon = "fa-picture-o";
            } else if (this.$router.currentRoute.fullPath.toLowerCase() === "/newbroadcast") {
                sidebarName = "Broadcast";
                sidebarIcon = "fa-bell-o";
            } else if (this.$router.currentRoute.fullPath.toLowerCase() === "/newevent") {
                sidebarName = "Event";
                sidebarIcon = "fa-calendar-o";
            }
            // else if (this.$router.currentRoute.fullPath.toLowerCase() === "/testingpage4") {
            //     sidebarName = "Bookmark";
            //     sidebarIcon = "fa-bookmark-o";
            // }

            this.defaultSidebarName = sidebarName;
            this.sidebarIcon = sidebarIcon;

            // this.isParent = Cookies.get('userTypeSession');
        },
    }
</script>

<style scoped>
    .sidebar-container {
        padding: 10px;
        display: inline-block;
        vertical-align: top;
        position: sticky;
        top: 0px;
        background: #edf0f4;
    }

    .sidebar-list-container {
        display: inline-block;
        border-right: 1px solid lightgrey;
    }

    .sidebar-action-container {
        display: inline-block;
        vertical-align: top;
        text-align: left;
    }

    .each-sidebar {
        padding: 10px;
    }

    .action-header {
        margin-bottom: 20px;
    }

    .action-logo {
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
    }

    .common-action {
        border-bottom: 1px solid lightgrey;
    }

    .sidebar-label, .sidebar-icon {
        text-align: center;
        color: darkgrey;
        word-wrap: break-word;
        cursor: pointer;
    }

    .btn-plus-icon {
        vertical-align: middle;
        margin-right: 10px;
    }

    .each-sidebar.active .sidebar-label,
    .each-sidebar.active .sidebar-icon {
        color: black;
    }
</style>

<style>
    #main-content {
        overflow-x: unset!important;
    }

    .topbar {
        margin-right: 0px!important;
    }
</style>