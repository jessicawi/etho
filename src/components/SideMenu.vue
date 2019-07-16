<template>
    <div class="menu-box-wrap">
        <!--<div class="menu-box-wrap" :class="{'fixed-header':scrollPosition>120}">-->
        <div class="menu-box" v-if="primaryMenuFiltered && primaryMenuFiltered.length>0">
            <!--<vs-sidebar static-position default-index="1" color="primary" class="sidebarx" spacer v-model="active"-->
            <!--icon-pack="fa">-->
            <!--<div class="header-sidebar" slot="header">-->
            <!--<a href="/"><img src="../assets/kagami.jpg"/></a>-->
            <!--</div>-->
            <b-nav pills v-for="item in primaryMenuFiltered" :key=item.MENid class="menu-wrap">
                <!-- if menu has submenu, click will open submenu -->
                <b-nav-item-dropdown
                        id="my-nav-dropdown"
                        :text="item.MENname"
                        toggle-class="nav-link-custom"
                        v-if="item.subMenus"
                        class="menu-wrap__item"
                >
                    <b-dropdown-item v-for="submenu in item.subMenus" :href="submenu.MENnewurl">{{submenu.MENname}}
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <!-- if menu has no submenu, click will route to url (MENnewurl) -->
                <b-nav-item v-else class="parent-menu" v-if="item.MENnewurl"
                            :class="{'null-item':item.MENnewurl===null}">
                    <!-- if MENnewurl has value -->
                    <router-link v-if="item.MENnewurl" :to="item.MENnewurl">
                        <i :class="item.MENicon"></i> <span>{{item.MENname}}</span>
                    </router-link>
                    <!-- if MENnewurl is null -->
                    <div v-else class="url-null">
                        <i :class="item.MENicon"></i> <span>{{item.MENname}}</span>
                    </div>
                </b-nav-item>
            </b-nav>
            <!--<div class="menu-wrap" v-for="item in primaryMenuFiltered" :key=item.MENid>-->
            <!--&lt;!&ndash; if menu has submenu, click will open submenu &ndash;&gt;-->
            <!--<div v-if="item.subMenus" class="menu-wrap__item">-->
            <!--<div class="parent-menu has-sub-menu"-->
            <!--@click="handleParentMenuClick(item.MENid)">-->
            <!--<i class="big-icon" :class="item.MENicon"></i><span>{{item.MENname}}</span> <i-->
            <!--class="material-icons">keyboard_arrow_down</i>-->
            <!--</div>-->
            <!--<div class="sub-menu" v-if="item.subMenus" @mouseleave="didClickAway"-->
            <!--:class="{'menu-wrap-active':currentParentMenuId===item.MENid}">-->
            <!--<div v-for="submenu in item.subMenus">-->
            <!--<a :href="submenu.MENnewurl">-->
            <!--<i :class="submenu.MENicon"></i> {{submenu.MENname}}-->
            <!--</a>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--&lt;!&ndash; if menu has no submenu, click will route to url (MENnewurl) &ndash;&gt;-->
            <!--<div v-else :class="{'null-item':item.MENnewurl===null}">-->
            <!--<div class="parent-menu" v-if="item.MENnewurl">-->
            <!--&lt;!&ndash; if MENnewurl has value &ndash;&gt;-->
            <!--<router-link v-if="item.MENnewurl" :to="item.MENnewurl">-->
            <!--<i :class="item.MENicon"></i> <span>{{item.MENname}}</span>-->
            <!--</router-link>-->
            <!--&lt;!&ndash; if MENnewurl is null &ndash;&gt;-->
            <!--<div v-else class="url-null">-->
            <!--<i :class="item.MENicon"></i> <span>{{item.MENname}}</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</vs-sidebar>-->
        </div>
        <div class="mobilemenu-box-wrap" v-if="isMobile() && primaryMenuFiltered && primaryMenuFiltered.length>0">
            <el-menu default-active="2" class="el-menu-vertical-demo ">
                <el-submenu>
                    <template slot="title">
                        <i class="material-icons">
                            dashboard
                        </i>
                        <span>Navigation</span>
                    </template>
                    <el-submenu
                            v-for="item in primaryMenuFiltered"
                            :index="item.MENid"
                            v-if="item.subMenus">
                        <template slot="title">{{item.MENname}}</template>
                        <el-menu-item v-for="submenu in item.subMenus" index="submenu.MENid">
                            <router-link :to="submenu.MENnewurl">
                                {{submenu.MENname}}
                            </router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item
                            v-for="item in primaryMenuFiltered"
                            index="item.MENid"
                            v-if="item.MENnewurl"
                            v-else>
                        <router-link v-if="item.MENnewurl" :to="item.MENnewurl">
                            <i :class="item.MENicon"></i> <span>{{item.MENname}}</span>
                        </router-link>
                        <div v-else class="url-null">
                            <i :class="item.MENicon"></i> <span>{{item.MENname}}</span>
                        </div>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <!--<div class="input-group search" v-if="isMobile()">-->
        <!--<input type="text" class="form-control" placeholder="Search for...">-->
        <!--<span class="input-group-btn">-->
        <!--<button class="btn btn-default" type="button"><i class="fa fa-search"-->
        <!--aria-hidden="true"></i></button>-->
        <!--</span>-->
        <!--</div>-->
        <!-- /input-group -->
    </div>
</template>
<script>
    import DataSource from "../data/datasource";

    export default {
        name: 'sideMenu',
        data() {
            return {
                pathName: null,
                primaryMenu: [],
                nonPrimaryTable: [],
                primaryMenuFiltered: [],
                active: false,
                currentMenu: null,
                currentParentMenuId: null,
                currentParentMenuId2: null,
                isNullItem: "",
                showMobileMenu: false,
                mouseover: false,
                scrollPosition: null,
            };
        },
        destroy() {
            window.removeEventListener('scroll', this.updateScroll);
        },
        async mounted() {
            window.addEventListener('scroll', this.updateScroll);
            const response = await DataSource.shared.getUserMenu();
            if (response) {
                this.primaryMenu = response.PrimaryTable && response.PrimaryTable.Table;
                if (!this.primaryMenu) {
                    return;
                }
                this.primaryMenu.forEach(m => {
                    this.primaryMenuFiltered.push(m);

                    // switch (m.MENname) {
                    //     case "Administration":
                    //     case "Dashboards":
                    //     case "Pre Admission":
                    //         this.primaryMenuFiltered.push(m);
                    // }
                });

                this.nonPrimaryTable = response.NonPrimaryTable.Table;
                this.nonPrimaryTable.map(d => {

                    // set current active menu based on URL pathname
                    // if (d.MENnewurl === window.location.pathname) {
                    //     this.currentMenu = d.MENid;
                    //     this.currentParentMenuId = d.MGPMENparentid;
                    //     this.currentParentMenuId2 = d.MGPMENparentid_2;
                    // }

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
            updateScroll() {
                this.scrollPosition = window.scrollY;
            },
            didClickAway: function (e) {
                this.event = function (event) {
                    if (event.target !== e.target) {
                        this.currentParentMenuId = null;
                        document.body.removeEventListener("click", this.event);
                    } else {
                        this.currentParentMenuId = menuId;
                    }
                }.bind(this);
                document.body.addEventListener("click", this.event);
            },
            handleParentMenuClick(menuId) {
                // if clicked menu already open, then make it close
                if (this.currentParentMenuId === menuId) {
                    this.currentParentMenuId = null;
                }
                // open clicked menu
                else {
                    this.currentParentMenuId = menuId;
                }
            },
            isMobile() {
                if (screen.width <= 769) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    };
</script>
<style scoped>
    .fixed-header {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 99;
    }
</style>
<style>
</style>