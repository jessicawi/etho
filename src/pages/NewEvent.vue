<template>
    <div id="eventList" v-if="renderComponent">
        <sideBar/>

        <div class="content-body-container col-md-8">
            <div class="sideBarSection__item">
                <div class="subtitle">
                    <h6>Upcoming Events</h6>
                </div>
                <div class="desc">
                    <ul>
                        <li><i class="fa fa-bullhorn" aria-hidden="true"></i> 22 DEC Christmas Party</li>
                        <li><i class="fa fa-bullhorn" aria-hidden="true"></i> 24 DEC Half Day Closure</li>
                        <li><i class="fa fa-bullhorn" aria-hidden="true"></i> 25 DEC Full Day Closure</li>
                        <li><i class="fa fa-bullhorn" aria-hidden="true"></i> 30 DEC Celebration of learning</li>
                        <li><i class="fa fa-bullhorn" aria-hidden="true"></i> 31 DEC Full Day Closure</li>
                        <li><i class="fa fa-bullhorn" aria-hidden="true"></i> 01 JAN Full Day Closure</li>
                        <li><i class="fa fa-bullhorn" aria-hidden="true"></i> 07 JAN Start of Term 1</li>
                    </ul>
                </div>
            </div>

            <eventCom/>
        </div>
    </div>
</template>

<script>
    "use strict";
    import DataSource from "../data/datasource";

    import sideBar from "../components/Sidebar";
    import eventCom from "../pages/Event";

    import $ from 'jquery';
    import Cookies from "js-cookie";

    export default {
        name: "NewEvent",
        components: {
            sideBar,
            eventCom,
        },
        data() {
            return {
                renderComponent: true,
            };
        },
        methods: {
            forceRerender() {
                // Remove my-component from the DOM
                this.renderComponent = false;

                this.$nextTick(() => {
                    // Add the component back in
                    this.renderComponent = true;
                });
            }
        },
        mounted() {
            const self = this;
            // self.forceRerender();

            $(document).ready(function(){
                $(".content-body-container").css("min-height", window.outerHeight);
                $(".sideBarSection__item").appendTo(".sidebar-action-container .action-body");
            });
        },
    }
</script>

<style scoped>
    .content-body-container {
        display: inline-block;
        padding: 20px;
        background: white;
    }
</style>