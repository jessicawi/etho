<template>
    <div id="event_Email">
        <div class="container admin-wrap mt-5">
            <div class="row header mb-3">
                <div class="col-lg-5 ">
                    <h3 class="text-left ">EVENT SEND EMAIL</h3>
                </div>
                <div class="col-lg-7">
                    <div class="event-email_buttonGroup">
                        <el-button-group v-if="isSelection">
                            <el-button type="primary" icon="el-icon-delete" @click="deleteParticipant">Delete
                                Participant
                            </el-button>
                            <el-button type="primary" icon="el-icon-position" @click="sendEmail">Send Email</el-button>
                        </el-button-group>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <data-tables :data="participantList" :action-col="eventListAction"
                                 @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column v-for="item in participantListTable" min-width="50px"
                                         :prop="item.prop"
                                         :label="item.label" :key="item.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";
    import Cookies from "js-cookie";
    import moment from 'moment';

    export default {
        name: "EventEmail",
        computed: {},
        components: {},
        async created() {
        },
        async mounted() {
            this.eventID = this.$route.query.id;
            this.editEvent();
            this.BindParticipant();
        },
        data() {
            return {
                eventID: "",
                notification: '',
                participantList: [],
                participantListTable: [
                    {
                        prop: "PaxName",
                        label: "Name"
                    },
                    {
                        prop: "EventParCount",
                        label: "Number of guest"
                    },
                    {
                        prop: "participantStatus",
                        label: "Status"
                    }
                ],
                eventListAction: {
                    label: 'Send',
                    props: {
                        align: 'right',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-delete'

                        },
                        handler: row => {
                            this.deleteParticipant(row);
                        },
                        label: ''
                    }, {
                        props: {
                            type: 'primary',
                            icon: 'el-icon-position'

                        },
                        handler: row => {
                            this.sendEmail(row);
                        },
                        label: ''
                    }],
                },
                arrobj_SelectedFiles: [],
                eventDetails: '',
                oldEventFileID: '',
                multipleSelection: [],
                isSelection: false,
            };
        },
        watch: {},
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.isSelection = true;
                console.log(this.multipleSelection, "ss");
            },
            async BindParticipant() {
                try {
                    const resp = DataSource.shared.getEventParticipantByEventID(this.eventID);
                    resp.then((resp) => {
                        if (resp.code === '2') {
                            this.notification = "No Participant Yet...";
                        } else {
                            this.participantList = resp.Table;
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            },
            deleteParticipant(row) {
                if (this.isSelection === false) {
                    this.participantList.splice(this.participantList.indexOf(row), 1);
                    this.btnEditEvent();
                } else {
                    this.multipleSelection.forEach(object => {
                        this.participantList = this.participantList.filter(d => {
                            return d.EventParPaxID !== object.EventParPaxID;
                        });
                    });
                    this.btnEditEvent();
                }
            },
            async editEvent() {
                try {
                    this.$vs.loading();
                    const response = await DataSource.shared.getEventDetails(this.eventID);
                    this.arrobj_SelectedFiles = await DataSource.shared.getEventFile(this.eventID);

                    if (response) {
                        if (response === '88') {
                            window.location.replace('/');
                        } else if (response === '99') {
                            console.log('Cannot get event');
                        } else if (response === '2') {
                            console.log('invalid ID');
                            window.location.replace('/');
                        } else {
                            let tempEventDetails = [];
                            response.Table.forEach(m => {
                                if (this.arrobj_SelectedFiles.Table && this.arrobj_SelectedFiles.Table.length > 0) {
                                    let oldEventFile = JSON.stringify(this.arrobj_SelectedFiles.Table.map(m => m.EventFileID));
                                    let my_object = {
                                        EventID: m.EventID,
                                        EventTitle: m.EventTitle,
                                        EventType: m.EventType,
                                        EventStartTime: moment(m.EventStartTime).format("DD/MM/YYYY hh:mm:ss"),
                                        EventEndTime: moment(m.EventEndTime).format("DD/MM/YYYY hh:mm:ss"),
                                        EventFullDay: "Yes",
                                        EventParentSignUp: m.EventParentSignUp,
                                        EventRegCutOffDay: m.EventRegCutOffDay,
                                        EventRegLimit: m.EventRegLimit,
                                        EventLocation: m.EventLocation,
                                        EventRegistrationStartTime: moment(m.EventRegistrationStartTime).format("DD/MM/YYYY hh:mm:ss"),
                                        EventDuration: m.EventDuration,
                                        OldEventFileID: oldEventFile.substring(2, oldEventFile.length - 2)
                                    };
                                    tempEventDetails.push(my_object);
                                } else {
                                    let my_object = {
                                        EventID: m.EventID,
                                        EventTitle: m.EventTitle,
                                        EventType: m.EventType,
                                        EventStartTime: moment(m.EventStartTime).format("DD/MM/YYYY hh:mm:ss"),
                                        EventEndTime: moment(m.EventEndTime).format("DD/MM/YYYY hh:mm:ss"),
                                        EventFullDay: "Yes",
                                        EventParentSignUp: m.EventParentSignUp,
                                        EventRegCutOffDay: m.EventRegCutOffDay,
                                        EventRegLimit: m.EventRegLimit,
                                        EventLocation: m.EventLocation,
                                        EventRegistrationStartTime: moment(m.EventRegistrationStartTime).format("DD/MM/YYYY hh:mm:ss"),
                                        EventDuration: m.EventDuration,
                                        OldEventFileID: ""
                                    };
                                    tempEventDetails.push(my_object);
                                }


                            });
                            this.eventDetails = tempEventDetails;
                        }
                    }
                    this.$vs.loading.close();
                } catch (e) {
                    console.log(e);
                }

            },
            async btnEditEvent() {
                try {

                    let Obj = {
                        EventID: this.eventDetails[0].EventID,
                        EventTitle: this.eventDetails[0].EventTitle,
                        EventType: this.eventDetails[0].EventType,
                        EventStartTime: this.eventDetails[0].EventStartTime,
                        EventEndTime: this.eventDetails[0].EventEndTime,
                        EventFullDay: this.eventDetails[0].EventFullDay,
                        EventParentSignUp: this.eventDetails[0].EventParentSignUp,
                        EventRegCutOffDay: this.eventDetails[0].EventRegCutOffDay,
                        EventRegLimit: this.eventDetails[0].EventRegLimit,
                        EventLocation: this.eventDetails[0].EventLocation,
                        EventRegistrationStartTime: this.eventDetails[0].EventRegistrationStartTime,
                        EventDuration: this.eventDetails[0].EventDuration,
                        OldEventFileID: this.eventDetails[0].OldEventFileID
                    };

                    let filesToInsert = this.arrobj_SelectedFiles;
                    if (Array.isArray(this.arrobj_SelectedFiles)) {
                        filesToInsert = undefined;
                    }
                    let editParticipantTemp = [];

                    let guestInt = this.participantList.filter(d => {
                        return d.Type === "Others";
                    });
                    guestInt.forEach(m => {
                        let my_object = {
                            Type: m.EventParType,
                            value: m.PaxName,
                        };
                        editParticipantTemp.push(my_object);
                    });
                    let studentInt = this.participantList.filter(d => {
                        return d.EventParType === "Student";
                    });
                    studentInt.forEach(m => {
                        let my_object = {
                            Type: m.EventParType,
                            value: m.EventParPaxID,
                        };
                        editParticipantTemp.push(my_object);
                    });

                    const response = await DataSource.shared.updateEvent(filesToInsert, JSON.stringify(Obj), JSON.stringify(editParticipantTemp));

                    if (response.code === '88') {
                        console.log('88');
                    } else if (response.code === "99") {
                        console.log('99');
                    } else if (response.code === '1') {
                        this.$notify({
                            title: 'Success',
                            message: 'Participant Deleted',
                            type: 'success'
                        });
                        this.editEvent();
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            async sendEmail(row) {
                if (this.isSelection === false) {
                    let tempSelection = [];
                    tempSelection.push(row);
                    this.multipleSelection = tempSelection;
                }
                this.multipleSelection = this.multipleSelection.map(m => {
                    if (m.EventParType === "Student") {
                        if (m.FatherEmail !== "" && m.MotherEmail !== "") {
                            m.email = m.FatherEmail + "," + m.MotherEmail;
                        } else if (m.FatherEmail !== "") {
                            m.email = m.FatherEmail;
                        } else if (m.MotherEmail !== "") {
                            m.email = m.MotherEmail;
                        }
                    }
                    return m;
                });
                console.log(this.multipleSelection, "22");
                let tempEmail = [];
                this.multipleSelection.forEach(m => {
                    if (m.EventParType === "Student") {
                        let my_object = {
                            email: m.email,
                            paxType: m.EventParType
                        };
                        tempEmail.push(my_object);
                    } else {
                        let my_object = {
                            email: m.PaxName,
                            paxType: m.EventParType
                        };
                        tempEmail.push(my_object);
                    }
                });
                let emailList = JSON.stringify(tempEmail);
                console.log(emailList, "aa");
                const response = await DataSource.shared.sendEvent(this.eventID, emailList);
                if (response.code === '88') {
                    console.log('88');
                } else if (response.code === "99") {
                    console.log('99');
                } else if (response.code === '1') {
                    this.$notify({
                        title: 'Success',
                        message: 'Email Sent',
                        type: 'success'
                    });
                    this.editEvent();
                }


            }
        },
    };
</script>
<style scoped>
</style>