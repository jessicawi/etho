<template>
    <div>
        <vs-sidebar static-position default-index="1" color="primary" class="sidebarx" spacer v-model="active"
                    icon-pack="fa">

            <div class="header-sidebar" slot="header">
                <img src="../assets/kagami.jpg"/>
            </div>

            <div class="menu-wrap" v-for="item in primaryMenuFiltered" :key=item.MENid>

                <!-- if menu has submenu, click will open submenu -->
                <div v-if="item.subMenus">
                    <div class="parent-menu has-sub-menu" @click="handleParentMenuClick(item.MENname)" :class="{'menu-active':currentMenu===item.MENname}">
                        <i :class="item.MENicon"></i>{{item.MENname}} <i class="material-icons">keyboard_arrow_down</i>
                    </div>
                    <div class="sub-menu" v-if="item.subMenus" :class="{'menu-active':currentMenu===item.MENname}">
                        <div v-for="submenu in item.subMenus">
                            <router-link :to="submenu.MENnewurl">
                                <i :class="submenu.MENicon"></i> {{submenu.MENname}}
                            </router-link>
                        </div>
                    </div>
                </div>
                <!-- if menu has no submenu, click will route to url (MENnewurl) -->
                <div v-else>
                    <div class="parent-menu">
                        <!-- if MENnewurl has value -->
                        <router-link v-if="item.MENnewurl" :to="item.MENnewurl">
                            <i :class="item.MENicon"></i> {{item.MENname}}
                        </router-link>
                        <!-- if MENnewurl is null -->
                        <div v-else class="url-null">
                            <i :class="item.MENicon"></i> {{item.MENname}}
                        </div>
                    </div>
                </div>

            </div>
        </vs-sidebar>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: 'sideMenu',
        data() {
            return {
                primaryMenu: [],
                nonPrimaryTable: [],
                primaryMenuFiltered: [],
                active: false,
                currentMenu: null,
            };
        },
        async mounted() {
            const response = await DataSource.shared.getUserMenu();
            if (response) {
                this.primaryMenu = response.PrimaryTable.Table;
                this.primaryMenu.forEach(m => {
                    //console.log(m);
                    this.primaryMenuFiltered.push(m);
                    // switch (m.MENname) {
                    //     case "Administration":
                    //     case "Dashboards":
                    //     case "Pre Admission":
                    //         this.primaryMenuFiltered.push(m);
                    // }
                });
                //console.log(this.primaryMenuFiltered);

                this.nonPrimaryTable = response.NonPrimaryTable.Table;
                this.nonPrimaryTable.map(d => {
                    if (d.MENnewurl != null && d.MENnewurl != "") {
                        //return null;

                        if (d.MGPMENparentid_2 === null || d.MGPMENparentid_2 === "") {
                            this.primaryMenuFiltered.find(parentMenu => {
                                    if (parentMenu.MENid === d.MGPMENparentid) {
                                        if (Array.isArray(parentMenu.subMenus)) {
                                            parentMenu.subMenus.push(d);
                                        } else {
                                            parentMenu.subMenus = [d];
                                        }

                                    }
                                }
                            );
                        } else {
                            this.primaryMenuFiltered.find(parentMenu => {
                                    if (parentMenu.MENid === d.MGPMENparentid_2) {
                                        if (Array.isArray(parentMenu.subMenus)) {
                                            parentMenu.subMenus.push(d);
                                        } else {
                                            parentMenu.subMenus = [d];
                                        }
                                    }
                                }
                            );
                        }
                    }
                });
            }
        },
        methods: {
            handleParentMenuClick(menuName) {
                // if clicked menu already open, then make it close
                if (this.currentMenu === menuName) {
                    this.currentMenu = null;
                }
                // open clicked menu
                else {
                    this.currentMenu = menuName;
                }
            }
        }
    };
</script>

<style scoped>
    .menu-wrap {
        color: #fff;
    }

    .parent-menu {
        cursor: pointer;
        padding: 10px 20px 10px 30px;
        color: #c0bed8;
        text-align: left;
        margin: 10px 0px;
        background: transparent;
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }

    .sub-menu {
        height: 0;
        visibility: hidden;
        opacity: 0;
    }

    .menu-active {
        height: auto;
        visibility: visible;
        opacity: 1;
    }

    .vs-sidebar--items {
        overflow-y: initial;
    }

    .parent-menu i {width: 29px;}

    .sub-menu a {
        color: #9796a9;
        padding: 5px 60px;
        display: block;
        text-align: left;
    }

    .parent-menu:hover {
        background: #eb4958;
        color: white;
    }

    .sub-menu a:hover {
        color: white;
    }
    .parent-menu i.material-icons {
        font-size: 26px;
        float: right;
        position: relative;
        top: -3px;
    }

    .parent-menu.menu-active {
        background: #eb4958;
        color: white;
    }

</style>

<style>

    #parentx-static {
        overflow: hidden;
        position: fixed;
        width: 260px;
        height: 100vh;
        background: #413f56;
        overflow-y:auto;
    }
</style>