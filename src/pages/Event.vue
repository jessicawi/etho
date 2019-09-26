<template>
    <div id="event_Calendar">
        <div v-if="!isStaff" class="mt-3 container  pt-5">
            <div>
                <div class="container admin-wrap">
                    <div class="row header mb-3">
                        <div class="col-lg-5 ">
                            <h3 class="text-left ">EVENT OVERVIEW</h3>
                        </div>
                        <div class="col-lg-7">
                            <div class="event_viewby">
                                <span class="event_viewby-title">VIEW BY</span>
                                <el-switch
                                        v-model="showLatest"
                                        active-text="Latest Event"
                                        inactive-text='Calendar'>
                                </el-switch>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12" v-if="showLatest">
                            <div class="event-calendar_header">
                                <div class="ec-header-left">
                                    <span class="render-range">Upcoming Event </span>
                                </div>
                                <div class="ec-header-middle">
                                </div>
                                <div class="ec-header-right">
                                    <el-button type="primary" class="btnCreateEvent " round
                                               v-on:click="eventNewEdit('New')" v-if="checkedUser !== 'Parent'">
                                        Add Events
                                    </el-button>
                                </div>
                            </div>
                            <div class="latestEventList">
                                <data-tables :data="upComingEventList">
                                    <el-table-column v-for="item in eventListTable" min-width="50px"
                                                     :prop="item.prop"
                                                     :label="item.label" :key="item.prop"
                                                     sortable="custom">
                                    </el-table-column>
                                </data-tables>
                            </div>
                        </div>
                        <div class="col-sm-12" v-if="!showLatest">
                            <div class="event-calendar">
                                <div>
                                    <div class="event-calendar_header">
                                        <div class="ec-header-left">
                                            <span class="render-range">{{dateRange}}</span>
                                        </div>
                                        <div class="ec-header-middle">
                                        </div>
                                        <div class="ec-header-right">
                                            <span @click="onClickNavi($event)">
                                                <el-button class="el-icon move-day" circle data-action="move-prev">
                                                    <i class="fa fa-angle-left" aria-hidden="true"
                                                       data-action="move-prev"></i>
                                                </el-button>
                                                <el-button class="el-icon move-day" circle data-action="move-next">
                                                    <i class="fa fa-angle-right" aria-hidden="true"
                                                       data-action="move-next"></i>
                                                </el-button>
                                            <el-button type="primary" class="move-today" round data-action="move-today">
                                                <span data-action="move-today">TODAY</span>
                                            </el-button>
                                            </span>
                                            <el-button type="primary" class="btnCreateEvent " round
                                                       v-on:click="eventNewEdit('New')" v-if="checkedUser !== 'Parent'">
                                                Add Events
                                            </el-button>
                                        </div>
                                    </div>
                                    <calendar style="height: 800px"
                                              ref="tuiCal"
                                              :useDetailPopup="false"
                                              :useCreationPopup="false"
                                              :view="selectedView"
                                              :calendars="calendarList"
                                              :schedules="scheduleList"
                                              :template="template"
                                              :taskView="true"
                                              :scheduleView="true"
                                              :month="month"
                                              :week="week"
                                              :timezones="timezones"
                                              :disableDblClick="true"
                                              :isReadOnly="true"
                                              @beforeCreateSchedule="beforeCreateSchedule"
                                              @clickSchedule="onClickSchedule"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <b-modal id="create_event_modal_nonStaff" size="xl" title='Join Event' ref="EventShowModalNonStaff"
                         hide-footer
                         ok-variant="secondary">
                    <div class="event-join">
                        <h4>{{joinEventDetails.EventTitle}}</h4>
                        <div class="event-join_item">
                            <i class="fa fa-user-circle" aria-hidden="true"></i>
                            <span>Hosted By: {{joinEventDetails.CONname}}</span>
                        </div>
                        <div class="event-join_item">
                            <i class="fa fa-clock-o" aria-hidden="true"></i>
                            <span>Event Duration: {{joinEventDetails.EventDuration}}</span>
                        </div>
                        <div class="event-join_item">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                            <span>Date: {{joinEventDetails.EventStartTime_Convert}} - {{joinEventDetails.EventEndTime_Convert}}</span>
                        </div>
                        <div class="event-join_item">
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                            <span>Location: {{joinEventDetails.EventLocation}}</span>
                        </div>
                        <div class="event-join_item">
                            <i class="fa fa-users" aria-hidden="true"></i>
                            <span>Number of Guest : <el-input-number size="small" v-model="num" @change="handleChange"
                                                                     :min="1" :max="10" label="描述文字"></el-input-number></span>
                        </div>
                        <div class="event-join_btn" v-if="this.lblNewEditCalendar==='New'">
                            <el-button type="primary" class="btnCreateEvent" v-on:click="btnRejectEvent()">
                                Reject Event
                            </el-button>
                        </div>
                        <div class="event-join_btn" v-else>
                            <el-button type="primary" class="btnCreateEvent" v-on:click="btnJoinEvent()">
                                Join Event
                            </el-button>
                        </div>
                    </div>
                </b-modal>
            </div>
        </div>
        <div v-if="isStaff" class="">
            <div>
                <b-modal id="create_event_modal" size="xl" :title="lblNewEditCalendar + ' Event'" ref="EventShowModal"
                         hide-footer
                         ok-variant="secondary">
                    <Event_Modal_Component
                            :isDisable="isDisabled"
                            :lblNewEditEvent="lblNewEditCalendar"
                            @LoadEventDetails="LoadEventDetails"
                            @hideEventShowModal="hideEventShowModal"
                            @refreshBModalValue="refreshBModalValue"
                            @deleteEvent="deleteEvent"
                            @eventNewEdit="eventNewEdit"
                            @showClassModal="showClassModal"
                            :eventCheckedUser="checkedUser"
                            :eventStudentInt="studentInt"
                            :eventInputEventTitle="inputEventTitle"
                            :eventInputEventTime="inputEventTime"
                            :eventOptParentSignUp="optParentSignUp"
                            :eventRdEventType="rdEventType"
                            :eventInputEventRegLimit="inputEventRegLimit"
                            :eventInputEventRegCutOffDay="inputEventRegCutOffDay"
                            :eventInputEventRegistrationStartTime="inputEventRegistrationStartTime"
                            :eventInputEventLocation="inputEventLocation"
                            :eventGuestInt="guestInt"
                            :eventDurationHour="EventDurationHour"
                            :eventID="selectedEventID"
                            :eventFiles="arrobj_SelectedFiles"
                    />
                </b-modal>
                <b-modal id="addClassModal" hide-footer size="lg"
                         title="Add_Class" ref="addClassModal">
                    <EventTagsComponent @tags="setTags" :parent_Post="post"></EventTagsComponent>
                    <el-button v-on:click="AddComponentValue()">Add Class</el-button>
                </b-modal>
                <div class="container admin-wrap mt-5">
                    <div class="row header mb-3">
                        <div class="col-lg-5 ">
                            <h3 class="text-left ">EVENT OVERVIEW</h3>
                        </div>
                        <div class="col-lg-7">
                            <div class="event_viewby">
                                <span class="event_viewby-title">VIEW BY</span>
                                <el-switch
                                        v-model="showLatest"
                                        active-text="Latest Event"
                                        inactive-text='Calendar'>
                                </el-switch>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12" v-if="showLatest">
                            <div class="event-calendar_header">
                                <div class="ec-header-left">
                                    <span class="render-range">Upcoming Event </span>
                                </div>
                                <div class="ec-header-middle">
                                </div>
                                <div class="ec-header-right">
                                    <el-button type="primary" class="btnCreateEvent " round
                                               v-on:click="eventNewEdit('New')" v-if="checkedUser !== 'Parent'">
                                        Add Events
                                    </el-button>
                                </div>
                            </div>
                            <div class="latestEventList">
                                <data-tables :data="upComingEventList" :action-col="eventListAction">
                                    <el-table-column v-for="item in eventListTable" min-width="50px"
                                                     :prop="item.prop"
                                                     :label="item.label" :key="item.prop"
                                                     sortable="custom">
                                    </el-table-column>
                                </data-tables>
                            </div>
                        </div>
                        <div class="col-sm-12" v-if="!showLatest">
                            <div class="event-calendar">
                                <div>
                                    <div class="event-calendar_header">
                                        <div class="ec-header-left">
                                            <el-select v-model="selectedView">
                                                <el-option
                                                        v-for="(options, index) in viewModeOptions"
                                                        :key="index"
                                                        :label="options.title"
                                                        :value="options.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="ec-header-middle">
                                            <span class="render-range">{{dateRange}}</span>
                                        </div>
                                        <div class="ec-header-right">
                                            <span @click="onClickNavi($event)">
                                                <el-button class="el-icon move-day" circle data-action="move-prev">
                                                    <i class="fa fa-angle-left" aria-hidden="true"
                                                       data-action="move-prev"></i>
                                                </el-button>
                                                <el-button class="el-icon move-day" circle data-action="move-next">
                                                    <i class="fa fa-angle-right" aria-hidden="true"
                                                       data-action="move-next"></i>
                                                </el-button>
                                            <el-button type="primary" class="move-today" round data-action="move-today">
                                                <span data-action="move-today">TODAY</span>
                                            </el-button>
                                            </span>
                                            <el-button type="primary" class="btnCreateEvent " round
                                                       v-on:click="eventNewEdit('New')" v-if="checkedUser !== 'Parent'">
                                                Add Events
                                            </el-button>
                                        </div>
                                    </div>
                                    <calendar style="height: 800px"
                                              ref="tuiCal"
                                              :useDetailPopup="false"
                                              :useCreationPopup="false"
                                              :view="selectedView"
                                              :calendars="calendarList"
                                              :schedules="scheduleList"
                                              :template="template"
                                              :taskView="true"
                                              :scheduleView="true"
                                              :theme="theme"
                                              :month="month"
                                              :week="week"
                                              :timezones="timezones"
                                              :disableDblClick="true"
                                              :isReadOnly="false"
                                              @beforeCreateSchedule="beforeCreateSchedule"
                                              @clickSchedule="onClickSchedule"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";
    import EventTagsComponent from "../components/Event_Tags_Component";
    import Event_Modal_Component from "../components/Event_Modal_Component";
    import Cookies from "js-cookie";
    import {fullCalendar} from "vue-fullcalendar";
    import 'tui-calendar/dist/tui-calendar.css';
    import {Calendar} from '@toast-ui/vue-calendar';
    import moment from 'moment';

    const today = new Date();
    const getDate = (type, start, value, operator) => {
        start = new Date(start);
        type = type.charAt(0).toUpperCase() + type.slice(1);
        if (operator === '+') {
            start[`set${type}`](start[`get${type}`]() + value);
        } else {
            start[`set${type}`](start[`get${type}`]() - value);
        }
        return start;
    };


    export default {
        name: "Event",
        components: {
            EventTagsComponent,
            'calendar': Calendar,
            Event_Modal_Component
        },
        props: ["images", "post"],
        async created() {
            if (Cookies.get('userTypeSession') === 'Parent') {
                this.isStaff = false;
                await this.LoadEventDetails();
                await this.LoadUpComingEvent();
            } else {
                this.isStaff = true;
                // await this.LoadProfileImg();
                await this.LoadEventDetails();
                await this.LoadUpComingEvent();
                // await this.BindParticipantList();
                await this.getLevelSpecificSchool();
            }
        },
        async mounted() {
            this.userType = Cookies.get('userTypeSession');
            this.sessionID = Cookies.get('userIDSession');
            this.init();
            this.checkUser();

        },
        data() {
            return {
                //Start: class component
                spdSelection: [],
                tags: [],
                guestInt: [],
                studentInt: [],
                inputVisible: false,
                inputValue: '',
                guestList: [
                    {
                        prop: "value",
                        label: "Guest Email"
                    },
                    {
                        prop: "Type",
                        label: "Guest Type"
                    }
                ],
                eventListTable: [
                    {
                        prop: "EventTitle",
                        label: "Event"
                    },
                    {
                        prop: "EventStartTimeConvert",
                        label: "Start"
                    },
                    {
                        prop: "EventEndTimeConvert",
                        label: "End"
                    }
                ],
                eventListAction: {
                    label: 'Edit',
                    props: {
                        align: 'right',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'

                        },
                        handler: row => {
                            this.editEvent(row);
                        },
                        label: ''
                    }]
                },
                guestListAction: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-delete'

                        },
                        handler: row => {
                            this.guestInt.splice(this.guestInt.indexOf(row), 1);
                        },
                        label: 'Delete'
                    }]
                },
                userType: "",
                isStaff: '',
                imgStaffProfile: '',
                //
                obj_SelectedComponent: "",
                str_PostComponentTitle: "",
                arrobj_SelectedItem: [],
                obj_ComponentProperties: {},
                //
                upComingDetailClicked: false,
                isDisabled: false,
                datePicker: {
                    disabledDate(date) {
                        return date < (new Date().getTime() - (1 * 24 * 60 * 60 * 1000));
                    }
                },
                ddlParticipant: '',
                selectedParticipantList: [],
                upComingEventList: [],
                upComingEventDetailList: [],
                rdEventType: '',
                rdEventTypeList: [
                    {
                        value: 'Event',
                        label: 'Event'
                    }, {
                        value: 'SchoolClosure',
                        label: 'School Closure'
                    }, {
                        value: 'PublicHoliday',
                        label: 'Public Holiday'
                    }
                ],
                eventList: [],
                latestEventList: [],
                levelList: [],
                inputEventTime: [],
                inputEventRegistrationStartTime: '',
                EventDurationHour: '',
                optParentSignUp: false,
                inputEventRegCutOffDay: 0,
                inputEventRegLimit: 0,
                inputEventTitle: '',
                inputEventLocation: '',
                inputEventParticipant: "",
                inputEventParticipantList: [],
                inputEventDesc: '',
                selectedEventID: '',
                ddlClassLevel: '',
                //Full Calendar
                mode: 'single',
                selectedDate: null,
                sessionID: '',
                lblNewEditCalendar: '',
                MasterParticipantList: [],
                CurrentParticipantList: [],
                ParticipantNameListIntTemp: [],
                ParticipantNameListInt: [],
                tempParticipantList: [],
                ParticipantNameListAction: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {

                            this.ParticipantNameListInt.splice(this.ParticipantNameListInt.indexOf(row), 1);
                            this.selectedParticipantList.splice(this.selectedParticipantList.indexOf(row), 1);
                            let objValue = {
                                CONname: row.StAllItem,
                                CONEmail: row.SelectedConEmail,
                                CONid: row.SelectedConID,
                                EventParID: row.SelectedEventParID,
                            };
                            this.CurrentParticipantList.push(objValue);

                        },
                        label: 'Delete'
                    }]
                },
                ParticipantNameList: [{
                    prop: "StAllItem",
                    label: "Email Address"
                }],
                showLatest: false,

                //calendar option
                viewModeOptions: [
                    {
                        title: 'Monthly',
                        value: 'month'
                    },
                    {
                        title: 'Weekly',
                        value: 'week'
                    },
                    {
                        title: 'Daily',
                        value: 'day'
                    }
                ],
                dateRange: '',
                selectedView: 'month',
                calendarList: [
                    {
                        id: 'PublicHoliday',
                        name: 'Public Holiday',
                        bgColor: '#9e5fff',
                        borderColor: '#9e5fff'
                    },
                    {
                        id: 'Event',
                        name: 'Event',
                        bgColor: '#00a9ff',
                        borderColor: '#00a9ff'
                    },
                    {
                        id: 'SchoolClosure',
                        name: 'SchoolClosure',
                        bgColor: '#ffc900',
                        borderColor: '#ffc900'
                    },
                    {
                        id: 'PTC',
                        name: 'PTC',
                        bgColor: '#69d5a1',
                        borderColor: '#69d5a1'
                    }
                ],
                scheduleList: [],
                timezones: [{
                    timezoneOffset: 540,
                    displayLabel: 'GMT+09:00',
                    tooltip: 'Seoul'
                }, {
                    timezoneOffset: -420,
                    displayLabel: 'GMT-08:00',
                    tooltip: 'Los Angeles'
                }],
                template: {
                    milestone(schedule) {
                        return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`;
                    },
                    milestoneTitle() {
                        return 'Milestone';
                    },
                    allday(schedule) {
                        return `${schedule.title}`;
                    },
                    alldayTitle() {
                        return 'All Day';
                    },
                    popupSave() {
                        return 'Saves';
                    },
                    popupDetailBody(schedule) {
                        return schedule.body;
                    },

                },
                month: {
                    startDayOfWeek: 0
                },
                week: {
                    showTimezoneCollapseButton: true,
                    timezonesCollapsed: true
                },
                checkedUser: "",
                isEditEvent: false,
                editEventID: "",
                theme: {
                    'month.dayname.height': '42px',
                },
                joinEventDetails: [],
                arrobj_SelectedFiles: [],
            };
        },
        watch: {
            selectedView(newValue) {
                this.$refs.tuiCal.invoke('changeView', newValue, true);
                this.setRenderRangeText();
            }
        },
        methods: {
            sleep(milliseconds) {
                return new Promise(resolve => setTimeout(resolve, milliseconds));
            },
            hideEventShowModal() {
                this.$refs['EventShowModal'].hide();
                // this.$refs['EventShowModalNonStaff'].hide();
            },
            setTags(value) {
                try {
                    this.tags = value;

                } catch (e) {
                    this.results = e;
                }
            },
            AddComponentValue() {
                try {
                    if (this.tags) {
                        this.$notify({
                            title: 'Success',
                            message: 'Successfully!',
                            type: 'success'
                        });
                        this.$refs.addClassModal.hide();
                        let uniqueTags = [];
                        this.tags.forEach(object => {
                            const isExist = this.studentInt.find(m => m.value === object.Student_ID);
                            if (!isExist) {
                                uniqueTags.push(object);
                            }
                        });
                        uniqueTags.forEach(m => {
                            let my_object = {
                                Type: "Student",
                                value: m.Student_ID,
                                label: m.First_Name + " " + m.Middle_Name + " " + m.Last_Name,
                            };
                            this.studentInt.push(my_object);
                        });
                    } else {
                        this.$notify.error({
                            title: 'Error, please try again',
                            message: 'Error'
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            showLoading() {
                this.$vs.loading();
            },
            hideLoading() {
                this.$vs.loading.close();
            },
            isNull(obj) {
                return (obj === null || obj === undefined || obj === "undefined" || obj.length === 0 || obj === "");
            },
            showMore(obj) {
                this.upComingDetailClicked = true;
                this.LoadUpComingEventDetail(obj);
            },
            async BindEventFields(resultTable) {
                try {
                    this.ParticipantNameListIntTemp = [];
                    this.ParticipantNameListInt = [];
                    this.CurrentParticipantList = [];

                    resultTable.forEach(async m => {
                        this.inputEventTitle = m.EventTitle;
                        this.rdEventType = m.EventType;
                        this.inputEventTime[0] = new Date(m.EventStartTime);
                        this.inputEventTime[1] = new Date(m.EventEndTime);
                        this.inputEventRegLimit = m.EventRegLimit;
                        this.inputEventRegCutOffDay = m.EventRegCutOffDay;
                        this.inputEventLocation = m.EventLocation;
                        this.inputEventRegistrationStartTime = new Date(m.EventRegistrationStartTime);
                        this.EventDurationHour = m.EventDuration;


                        const resp = await DataSource.shared.getEventParticipantByEventID(m.EventID);
                        if (resp){
                            if (resp.code === '2') {
                                this.MasterParticipantList.forEach(m => {
                                    this.CurrentParticipantList.push(m);
                                });
                                this.guestInt = [];
                                this.studentInt = [];
                            } else {
                                const participantResponse = resp.Table;

                                let editParticipantTemp = [];
                                participantResponse.forEach(m => {
                                    let my_object = {
                                        Type: m.EventParType,
                                        value: m.PaxName,
                                    };
                                    editParticipantTemp.push(my_object);
                                });
                                this.ParticipantNameListInt = editParticipantTemp;
                                this.guestInt = this.ParticipantNameListInt.filter(d => {
                                    return d.Type === "Others";
                                });
                                let studentIntFilter = participantResponse.filter(d => {
                                    return d.EventParType === "Student";
                                });
                                if (this.isStaff === false) {
                                    this.studentInt = studentIntFilter;
                                } else {
                                    let tempStudentInt = [];
                                    studentIntFilter.forEach(m => {
                                        let my_object = {
                                            Type: m.EventParType,
                                            value: m.EventParPaxID,
                                            label: m.PaxName
                                        };
                                        tempStudentInt.push(my_object);
                                    });
                                    this.studentInt = tempStudentInt;
                                }


                            }
                        }
                        if (m.EventParentSignUp === 'Yes') {
                            this.optParentSignUp = true;
                        }
                    });



                } catch (e) {
                    this.results = e;
                }
            },
            async editEvent(objValue) {
                try {
                    this.$vs.loading();
                    //capture EventID
                    let obj = {
                        eventID: objValue.EventID,
                        eventCreatedBy: objValue.EventCreatedBy,
                    };

                    this.selectedEventID = obj.eventID;
                    const response = await DataSource.shared.getEventDetails(this.selectedEventID);
                    this.BindEventFields(response.Table);
                    await this.sleep(800);
                    let promise_GetPostFile = await DataSource.shared.getEventFile(this.selectedEventID);

                    this.arrobj_SelectedFiles = promise_GetPostFile;


                    if (response === '88') {
                        window.location.replace('/');
                    } else if (response === '99') {
                        console.log('Cannot get event');
                    } else if (response === '2') {
                        console.log('invalid ID');
                        window.location.replace('/');
                    }

                    if (this.isStaff === false) {
                        this.joinEventDetails = response.Table[0];
                        this.$refs['EventShowModalNonStaff'].show();
                    } else if (this.isDisabled === true) {
                        this.$refs['EventShowModal'].show();
                    } else {
                        this.isEditEvent = true;
                        this.editEventID = objValue.EventID;
                        this.$refs['EventShowModal'].show();
                    }
                    this.eventNewEdit('Edit');
                    this.$vs.loading.close();

                } catch (e) {
                    alert(e);
                    console.log(e);
                }

            },
            async deleteEvent(eventID) {
                try {
                    //capture EventID
                    this.selectedEventID = eventID;

                    if (eventID === undefined) {
                        eventID = this.editEventID;
                    }
                    const response = await DataSource.shared.deleteEvent(eventID);

                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === '99') {
                        console.log('Event Not Found');
                    } else if (response.code === '2') {
                        console.log('invalid ID');
                        window.location.replace('/');
                    } else if (response.code === '1') {
                        // alert('Event Deleted!');
                        this.$notify({
                            title: 'Success',
                            message: 'Event Removed!',
                            type: 'success'
                        });
                        // window.location.replace('/event');
                        this.LoadEventDetails();
                        this.$refs['EventShowModal'].hide();
                    }

                } catch (e) {
                    alert(e);
                    console.log(e);
                }
            },
            async getLevelSpecificSchool() {
                try {
                    const response = await DataSource.shared.getLevelSpecificSchool(Cookies.get('schoolSession'));
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.levelList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async LoadEventDetails() {
                try {
                    this.scheduleList = [];
                    const response = DataSource.shared.getEvent();
                    response.then((response) => {

                        if (response && response.Table.length < 1) {
                            alert('No record found');
                            console.log('No record found');
                        } else if (response.code === '99') {
                            alert('No event found');
                            console.log('No event found');
                        } else {
                            this.eventList = (response.Table) ? response.Table : [];
                            if (this.userType === "Teacher") {
                                this.eventList = this.eventList.filter(a => {
                                    return a.EventType === "PTC";
                                });

                            }

                            this.eventList.forEach((m) => {
                                // m.start = m.EventCreatedOn_Convert;
                                let objects = {
                                    id: m.EventID,
                                    calendarId: m.EventType,
                                    title: m.EventTitle,
                                    category: 'allday',
                                    dueDateClass: '',
                                    start: m.EventStartTime,
                                    end: m.EventEndTime,
                                    showContentButton: true,
                                    showConnectionButton: true,
                                    showObservationButton: true,
                                    location: m.EventLocation,
                                    body:
                                        "Registration Time: " + m.EventRegistrationStartTime_Convert + "\n" +
                                        "Registration Limit: " + m.EventRegLimit + "\n" +
                                        "Registration cutoff(days): " + m.EventRegCutOffDay,
                                    raw: m.EventCreatedBy
                                };
                                this.scheduleList.push(objects);
                            });
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            },
            async LoadUpComingEvent() {
                try {
                    const response = DataSource.shared.getUpComingEvent();
                    response.then((response) => {

                        if (response.code === '2') {
                            console.log('No record found');
                        } else if (response.code === '99') {
                            console.log('99');
                        } else {
                            this.upComingEventList = (response.Table) ? response.Table : [];
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            },
            async LoadUpComingEventDetail(value) {
                try {
                    var obj = {
                        EventStartTime: value,
                    };

                    const response = await DataSource.shared.getUpComingEventDetail(JSON.stringify(obj));

                    if (response.code === '99') {
                        console.log('99');
                    } else if (response.code === '2') {
                        console.log('2');
                        alert('No record found');
                    } else {
                        return this.upComingEventDetailList = (response.Table) ? response.Table : [];
                    }

                } catch (e) {
                    console.log(e);
                }
            },
            eventNewEdit(value,res) {
                if (value === 'New') {
                    this.lblNewEditCalendar = value;
                    this.refreshBModalValue(res);
                } else {
                    this.lblNewEditCalendar = value;
                }

                if (this.isStaff === false) {
                    this.$refs.EventShowModalNonStaff.show();
                } else {
                    this.$refs.EventShowModal.show();
                }
            },
            refreshBModalValue(res) {
                // let getCurrentDateTime = new Date();
                this.isDisabled = false;
                this.inputEventTitle = '';
                this.rdEventType = '';
                this.inputEventTime[0] = new Date(res);
                this.inputEventTime[1] = new Date(res);
                this.inputEventRegLimit = 0;
                this.inputEventRegCutOffDay = 0;
                this.inputEventLocation = '';
                this.optParentSignUp = false;
                this.ParticipantNameListInt = [];
                this.ddlParticipant = '';
                this.CurrentParticipantList = [];
                this.guestInt = [];
                this.studentInt = [];
                this.inputEventRegistrationStartTime = '';
                this.MasterParticipantList.forEach(m => {
                    this.CurrentParticipantList.push(m);
                });
                this.EventDurationHour = '';
                this.arrobj_SelectedFiles = [];
            },
            showClassModal() {
                this.$refs.addClassModal.show();
            },
            validEmail() {
                const re = /(.+)@(.+){2,}\.(.+){2,}/;
                return re.test(this.inputEventParticipant.toLowerCase());
            },
            removeParticipantList(guest) {
                // this.inputEventParticipantList.splice(this.inputEventParticipantList.indexOf(guest), 1);
                this.guestInt.splice(this.guestInt.indexOf(guest), 1);
            },
            async btnJoinEvent() {
                console.log('btnJoinEvent');
            },
            async btnRejectEvent() {
                console.log('btnRejectEvent');
            },

            //calendar
            init() {
                this.setRenderRangeText();
            },
            setRenderRangeText() {
                const {invoke} = this.$refs.tuiCal;
                const view = invoke('getViewName');
                const calDate = invoke('getDate');
                const rangeStart = invoke('getDateRangeStart');
                const rangeEnd = invoke('getDateRangeEnd');
                let year = calDate.getFullYear();
                let month = calDate.getMonth() + 1;
                let date = calDate.getDate();
                let dateRangeText = '';
                let endMonth, endDate, start, end;
                switch (view) {
                    case 'month':
                        dateRangeText = `${year}-${month}`;
                        break;
                    case 'week':
                        year = rangeStart.getFullYear();
                        month = rangeStart.getMonth() + 1;
                        date = rangeStart.getDate();
                        endMonth = rangeEnd.getMonth() + 1;
                        endDate = rangeEnd.getDate();
                        start = `${year}-${month}-${date}`;
                        end = `${endMonth}-${endDate}`;
                        dateRangeText = `${start} ~ ${end}`;
                        break;
                    default:
                        dateRangeText = `${year} ${month} ${date}`;
                }
                this.dateRange = moment(dateRangeText).format('YYYY MMMM ');
            },
            onClickNavi(event) {
                const {target} = event;
                let action = target.dataset ? target.dataset.action : target.getAttribute('data-action');
                action = action.replace('move-', '');
                this.$refs.tuiCal.invoke(action);
                this.setRenderRangeText();
            },
            beforeCreateSchedule(res) {

                this.inputEventTime[0] =  new Date(res.start);
                this.inputEventTime[1] =  new Date(res.start);
                this.eventNewEdit('New',res.start);
            },
            onClickSchedule(res) {
                let item =
                    {
                        "EventID": res.schedule.id,
                        "EventCreatedBy": res.schedule.raw,
                    };
                this.editEvent(item);
            },
            //check user
            checkUser() {
                this.checkedUser = Cookies.get('userTypeSession');
            },
        },
    };
</script>
<style scoped>
    .el-date-editor {
        width: 100% !important;
    }

    .buttonArea {
        margin: 20px 0 0 0;
    }

    .requiredFieldsMsg {
        color: red;
        font-weight: bold;
    }

    .btn-primary {
        display: inline;
    }

    .buttonArea .btn-primary {
        margin: 0 0 0 20px;
    }

    .actionDiv {
        text-align: right;
    }

    .EligibleColor {
        color: green !important;
    }

    .NotEligibleColor {
        color: red !important;
    }

    .textArea {
        width: 100%;
        resize: none;
    }
</style>