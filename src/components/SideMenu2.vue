<template>
    <div>
        <vs-sidebar static-position default-index="1" color="primary" class="sidebarx" spacer v-model="active"
                    icon-pack="fa">

            <div class="header-sidebar" slot="header">
                <img src="../assets/kagami.jpg"/>
            </div>

            <vs-sidebar-group v-for="item in primaryMenuFiltered" :key=item.MENid :title=item.MENname
                              :icon=item.MENicon>
                <vs-sidebar-item v-for="submenu in item.subMenus" :icon=submenu.MENicon :to=submenu.MENurl>
                    {{submenu.MENname}}
                </vs-sidebar-item>
            </vs-sidebar-group>
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
                primaryMenuFiltered:[],
                active: false
            };
        },
        async mounted() {
            const response = await DataSource.shared.getUserMenu();
            if (response) {
                this.primaryMenu = response.PrimaryTable.Table;
                this.primaryMenu.forEach(m => {
                    // console.log(m);
                    switch (m.MENname) {
                        case "Administration":
                        case "Dashboards":
                        case "Pre Admission":
                            this.primaryMenuFiltered.push(m);
                    }
                });
                console.log(this.primaryMenuFiltered);

                this.nonPrimaryTable = response.NonPrimaryTable.Table;
                this.nonPrimaryTable.map(d => {
                    if (d.MENnewurl == null && d.MENnewurl === "") {
                        return null;
                    }

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
                });
            }
        },
        methods: {}
    };
</script>
