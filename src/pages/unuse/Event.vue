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
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12" v-if="showLatest">
                            <h5>Upcoming Event </h5>
                            <div style="overflow-x:scroll; height:800px;background:whitesmoke;scrollbar-color:rebeccapurple green">
                                <ul class='eventUI'>
                                    <li v-for="item in eventList" v-bind:key="item.EventID">
                                        <b>{{item.EventTitle}}</b><br>
                                        {{convertToDate(item.EventStartTime)}}<br>
                                        {{getEventTime(item.EventStartTime,item.EventEndTime)}}<br>
                                        {{item.EventLocation}}<br>
                                        <b>Created By:{{item.CONname}}</b><br>
                                        <b-btn v-if="item.EventCreatedBy === sessionID" @click="editEvent(item)">Edit
                                        </b-btn>&nbsp;
                                        <b-btn v-if="item.EventCreatedBy === sessionID"
                                               @click="deleteEvent(item.EventID)">Delete
                                        </b-btn>
                                        <hr>
                                    </li>
                                </ul>
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
                                              @beforeCreateSchedulecalendar="beforeCreateSchedulecalendar"
                                              @clickMore="onclickMore"
                                              @clickDayname="onClickDayname"
                                              @beforeDeleteSchedule="onBeforeDeleteSchedule"
                                              @afterRenderSchedule="onAfterRenderSchedule"
                                              @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
                                              @beforeUpdateSchedule="onBeforeUpdateSchedule"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <b-modal id="create_event_modal_nonStaff" size="xl" title='Event' ref="EventShowModalNonStaff"
                         hide-footer
                         ok-variant="secondary">
                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Event Type">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>{{ lblNewEditCalendar }} Event</label> <br>
                            <label><h1>Calendar Title</h1></label>
                            <input type="text" class="form-control" v-model="inputEventTitle"
                                   :disabled="this.isDisabled">
                            <b-form-group label="Event Type" align="left" :disabled="this.isDisabled">
                                <b-form-radio v-model="rdEventType" name="some-radios" value="Event" checked>Event
                                </b-form-radio>
                                <b-form-radio v-model="rdEventType" name="some-radios" value="SchoolClosure">School
                                    Closure
                                </b-form-radio>
                                <b-form-radio v-model="rdEventType" name="some-radios" value="PublicHoliday">Public
                                    Holiday
                                </b-form-radio>
                            </b-form-group>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <el-button v-on:click="showClassModal()">Class</el-button>
                            <el-input v-if=""></el-input>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label><b>Participant Email</b></label>
                            <div v-if="(ParticipantNameListInt.length>0)&& this.isDisabled==false">
                                <data-tables :data="ParticipantNameListInt" :action-col="ParticipantNameListAction">
                                    <el-table-column v-for="item in ParticipantNameList"
                                                     :prop="item.prop"
                                                     :label="item.label"
                                                     :key="item.prop"
                                                     sortable="custom">
                                    </el-table-column>
                                </data-tables>
                            </div>
                            <div v-else-if="(ParticipantNameListInt.length>0)&& this.isDisabled==true">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                    </thead>
                                    <tbody v-for="item in ParticipantNameListInt" v-bind:key="item.CONid">
                                    <tr>
                                        <td>{{item.StAllItem}}</td>
                                        <td>{{item.SelectedConEmail}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!--                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
                        <!--                            <label>From-->
                        <!--                                <el-date-picker v-model="inputEventStartTime" format="dd-MM-yyyy HH:mm:ss"-->
                        <!--                                                value-format="dd-MM-yyyy HH:mm:ss" type="datetime"-->
                        <!--                                                class="form-control"-->
                        <!--                                                placeholder="Pick a day" :picker-options="datePicker" :disabled="this.isDisabled"></el-date-picker></label>-->
                        <!--                            <label> To-->
                        <!--                                <el-date-picker v-model="inputEventEndTime" format="dd-MM-yyyy HH:mm:ss"-->
                        <!--                                                value-format="dd-MM-yyyy HH:mm:ss" type="datetime"-->
                        <!--                                                class="form-control"-->
                        <!--                                                placeholder="Pick a day" :picker-options="datePicker" :disabled="this.isDisabled"></el-date-picker></label>-->
                        <!--                            <br>-->
                        <!--                        </div>-->
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <b-form-checkbox :disabled="this.isDisabled"
                                             v-model="optParentSignUp" name="btnParentSignUp" switch>Parent sign up?
                                <h6 v-if="this.optParentSignUp==true">Yes</h6>
                                <h6 v-else>No</h6>
                            </b-form-checkbox>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Registration Limit</label>
                            <b-form-input id="RegLimitNonStaff" :disabled="this.isDisabled"
                                          type="text" class="form-control" v-model="inputEventRegLimit" value="0"
                                          min="0" max="99"></b-form-input>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Registration cutoff(days)</label>
                            <b-form-input id="range-1NonStaff" v-model="inputEventRegCutOffDay"
                                          :disabled="this.isDisabled" type="range" value="0" min="0" max="5"
                                          step="1"></b-form-input>
                            <div class="mt-2">Days: {{ inputEventRegCutOffDay }}</div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <el-select v-model="ddlClassLevel" placeholder="Select" class="fullwidth"
                                       :disabled="this.isDisabled">
                                <el-option
                                        v-for="item in levelList"
                                        :key="item.PK_Course_ID"
                                        :label="item.CRS_Course_Name"
                                        :value="item.PK_Course_ID">
                                </el-option>
                            </el-select>
                            <button v-on:click="btnAddClasses()" :disabled="this.isDisabled">Add Classes</button>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Location</label>
                            <input type="text" class="form-control" v-model="inputEventLocation"
                                   :disabled="this.isDisabled">
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <el-select v-model="ddlParticipant" placeholder="Select One" class="fullwidth"
                                       :disabled="this.isDisabled"
                                       filterable :filter-method="filterSelectedParticipant">
                                <el-option v-for="item in CurrentParticipantList"
                                           :value=item.CONid
                                           :label="item.CONname"
                                           :key="item.ID">
                                </el-option>
                            </el-select>
                            <button v-on:click="AddParticipantList()" :disabled="this.isDisabled">Add Participant
                            </button>
                        </div>
                    </div>
                    <div v-if="this.lblNewEditCalendar==='New'">
                        <button v-on:click="btnRejectEvent()">Reject Event</button>
                    </div>
                    <div v-else>
                        <button v-on:click="btnJoinEvent()">Join Event</button>
                    </div>
                </b-modal>
            </div>
        </div>
        <div v-if="isStaff" class="">
            <div>
                <b-modal id="create_event_modal" size="xl" :title="lblNewEditCalendar + ' Event'" ref="EventShowModal"
                         hide-footer
                         ok-variant="secondary">
                    <!--<label>{{ lblNewEditCalendar }} Event</label> <br>-->
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
                                <!--ul class='eventUI'>
                                    <li v-for="item in eventList" v-bind:key="item.EventID">
                                        <b>{{item.EventTitle}}</b><br>
                                        {{convertToDate(item.EventStartTime)}}<br>
                                        {{getEventTime(item.EventStartTime,item.EventEndTime)}}<br>
                                        {{item.EventLocation}}<br>
                                        <b>Created By:{{item.CONname}}</b><br>
                                        <b-btn v-if="item.EventCreatedBy === sessionID" @click="editEvent(item)">Edit
                                        </b-btn>&nbsp;
                                        <b-btn v-if="item.EventCreatedBy === sessionID"
                                               @click="deleteEvent(item.EventID)">Delete
                                        </b-btn>
                                        <hr>
                                    </li>
                                </ul-->
                                <data-tables :data="latestEventList" :action-col="eventListAction">
                                    <el-table-column v-for="item in eventListTable" min-width="50px"
                                                     :prop="item.prop"
                                                     :label="item.label" :key="item.prop"
                                                     sortable="custom">
                                    </el-table-column>
                                </data-tables>
                            </div>
                        </div>
                        <!--div class="col-sm-2">
                            <h5>Upcoming Event</h5>
                            <div>
                                <ul class='upComingEventUI'>
                                    <li v-for="item in upComingEventList" v-bind:key="item.EventID">
                                        {{convertToDate((item.EventDate))}}&nbsp;
                                        <a href="#" v-on:click="showMore(item.EventDate)" id="upComingEvent1"><b>{{(item.EventCount)}}</b></a><br>
                                        <hr>
                                    </li>
                                    <ul v-if="this.upComingDetailClicked==true" id="upComingDetail">
                                        <li v-for="item in upComingEventDetailList" v-bind:key="item.EventID">
                                            <a href="#" v-on:click="editEvent(item)">{{item.EventTitle}}</a><br>
                                            {{item.EventType}}<br>
                                            Venue:{{item.EventLocation}}<br>
                                            NoOfParticipant:{{item.NumberOfParticipant}}<br>
                                            <hr>
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                        </div-->
                        <div class="col-sm-12" v-if="!showLatest">
                            <div class="event-calendar">
                                <!--full-calendar
                                defaultView="dayGridMonth"
                                :events="events"
                                locale="en">
                                </full-calendar-->
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
                                              @beforeCreateSchedulecalendar="beforeCreateSchedulecalendar"
                                              @clickMore="onclickMore"
                                              @clickDayname="onClickDayname"
                                              @beforeDeleteSchedule="onBeforeDeleteSchedule"
                                              @afterRenderSchedule="onAfterRenderSchedule"
                                              @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
                                              @beforeUpdateSchedule="onBeforeUpdateSchedule"
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
    console.log(today);
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
            // 'full-calendar': require('vue-fullcalendar'),
            EventTagsComponent,
            'calendar': Calendar,
            Event_Modal_Component
        },
        props: ["images", "post"],
        async created() {
            // this.imgStaffProfile = ProfileImg;

            if (Cookies.get('userTypeSession') === 'Parent') {
                this.isStaff = false;
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
            console.log(this.userType);
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
                        prop: "EventStartTime_Convert",
                        label: "Start"
                    },
                    {
                        prop: "EventTime",
                        label: "Time"
                    },
                    {
                        prop: "CONname",
                        label: "Add By"
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
                // arrobj_Levels: [],
                // arrobj_Classes: [],
                // arrobj_SelectedStudents: [],
                //End: class component

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
                        //  Without using the second variable, you can replace 7 for with your back x days:
                        //e.g return date< Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
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
            };
        },
        watch: {
            selectedView(newValue) {
                this.$refs.tuiCal.invoke('changeView', newValue, true);
                this.setRenderRangeText();
            }
        },
        methods: {
            hideEventShowModal() {
                this.$refs['EventShowModal'].hide();
                this.$refs['EventShowModalNonStaff'].hide();
            },
            async changeSelection(val) {
                this.spdSelection = val;
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
                        console.log(this.tags, 'tags value');
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
                        console.log(uniqueTags, "uniqueTags");
                        uniqueTags.forEach(m => {
                            let my_object = {
                                Type: "Student",
                                value: m.Student_ID,
                                label: m.First_Name + " " + m.Middle_Name + " " + m.Last_Name,
                            };
                            this.studentInt.push(my_object);
                        });
                        console.log(this.studentInt, "uniqueTags");
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

                    resultTable.forEach(m => {
                        this.inputEventTitle = m.EventTitle;
                        this.rdEventType = m.EventType;
                        this.inputEventTime[0] = new Date(m.EventStartTime);
                        this.inputEventTime[1] = new Date(m.EventEndTime);
                        this.inputEventRegLimit = m.EventRegLimit;
                        this.inputEventRegCutOffDay = m.EventRegCutOffDay;
                        this.inputEventLocation = m.EventLocation;
                        this.inputEventRegistrationStartTime = new Date(m.EventRegistrationStartTime);


                        const resp = DataSource.shared.getEventParticipantByEventID(m.EventID);
                        resp.then((resp) => {
                            if (resp.code === '2') {
                                this.MasterParticipantList.forEach(m => {
                                    this.CurrentParticipantList.push(m);
                                });
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
                                console.log(this.studentInt, "fromedit");

                                // this.ParticipantNameListIntTemp.forEach(n => {
                                //     let tempList = {
                                //         StAllItem: n.CONname,
                                //         SelectedConID: n.CONid,
                                //         SelectedConEmail: n.CONEmail,
                                //         SelectedEventParID: n.EventParID,
                                //     };
                                //     this.ParticipantNameListInt.push(tempList);
                                //
                                //     this.MasterParticipantList.forEach(p => {
                                //         if (n.CONid === p.CONid) {
                                //             // this.CurrentParticipantList.splice(this.CurrentParticipantList.indexOf(m), 1);
                                //         } else {
                                //             let tempCurrentList = {
                                //                 CONname: p.CONname,
                                //                 CONid: p.CONid,
                                //                 CONEmail: p.CONEmail,
                                //                 SelectedEventParID: p.EventParID,
                                //             };
                                //             this.CurrentParticipantList.push(tempCurrentList);
                                //         }
                                //     });
                                //
                                // });

                                // this.selectedParticipantList = (resp.Table) ? resp.Table : [];
                            }
                        });
                        if (m.EventParentSignUp === 'Yes') {
                            this.optParentSignUp = true;
                        }
                        ;
                    });
                } catch (e) {
                    this.results = e;
                }
            },

            async editEvent(objValue) {
                try {
                    console.log(objValue);
                    //capture EventID
                    var obj = {
                        eventID: objValue.EventID,
                        eventCreatedBy: objValue.EventCreatedBy,
                    };

                    //Disable user to editEvent if
                    // if (Cookies.get('userIDSession') == obj.eventCreatedBy || Cookies.get('userIDSession') == null) {
                    //     this.isDisabled = false;
                    // } else {
                    //     this.isDisabled = true;
                    // }

                    this.selectedEventID = obj.eventID;
                    const response = await DataSource.shared.getEvent(this.selectedEventID);
                    if (response === '88') {
                        window.location.replace('/');
                    } else if (response === '99') {
                        console.log('Cannot get event');
                    } else if (response === '2') {
                        console.log('invalid ID');
                        window.location.replace('/');
                    }

                    if (this.isStaff === false) {
                        this.BindEventFields(response.Table);
                        this.$refs['EventShowModalNonStaff'].show();
                    } else if (this.isDisabled === true) {
                        this.BindEventFields(response.Table);
                        this.$refs['EventShowModal'].show();
                    } else {
                        this.isEditEvent = true;
                        this.editEventID = objValue.EventID;
                        console.log(this.editEventID);
                        this.BindEventFields(response.Table);
                        this.$refs['EventShowModal'].show();
                    }
                    this.eventNewEdit('Edit');

                } catch (e) {
                    alert(e);
                    console.log(e);
                }

            },

            async deleteEvent(eventID) {
                try {
                    console.log(eventID);
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

            getEventTime(startValue, endValue) {
                try {
                    let startTime = new Date(startValue);
                    let endTime = new Date(endValue);
                    let timeDiff = Math.abs(endTime.getTime() - startTime.getTime());
                    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    let starthour = new Date(startValue).getHours();
                    let startminute = new Date(startValue).getMinutes();
                    let endhour = new Date(endValue).getHours();
                    let endminute = new Date(endValue).getMinutes();
                    let Time;
                    if (diffDays > 1) {
                        return "All Day";
                    } else {
                        Time = starthour + ":" + startminute + "AM to " + endhour + ":" + endminute + "PM";
                        return Time;
                    }
                } catch (e) {
                    alert(e);
                }
            },

            convertToDate(startTime) {
                let day = new Date(startTime).getDate();
                let month = new Date(startTime).getMonth() + 1;
                let year = new Date(startTime).getFullYear();
                let date;

                let monthValue = new Array();
                monthValue[0] = "January";
                monthValue[1] = "February";
                monthValue[2] = "March";
                monthValue[3] = "April";
                monthValue[4] = "May";
                monthValue[5] = "June";
                monthValue[6] = "July";
                monthValue[7] = "August";
                monthValue[8] = "September";
                monthValue[9] = "October";
                monthValue[10] = "November";
                monthValue[11] = "December";

                let m = monthValue[month - 1];
                date = day + "th " + m + " " + year;
                return date;
            },


            async LoadEventDetails() {
                try {
                    this.scheduleList = [];
                    const response = DataSource.shared.getEvent();
                    response.then((response) => {

                        if (response.Table.length < 1) {
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
                            console.log("eventList", this.eventList);

                            this.eventList.forEach((m) => {
                                let items = {
                                    EventTitle: m.EventTitle,
                                    EventStartTime_Convert: m.EventStartTime_Convert,
                                    EventTime: moment(m.EventStartTime).format("hh:mm A") + " - " + moment(m.EventEndTime).format("hh:mm A"),
                                    EventLocation: m.EventLocation,
                                    CONname: m.CONname,
                                    EventEndTime_Convert: m.EventEndTime_Convert,
                                    EventID: m.EventID,
                                };
                                this.latestEventList.push(items);
                                console.log(this.latestEventList);

                            });

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
            eventNewEdit(value) {
                if (value === 'New') {
                    this.lblNewEditCalendar = value;
                    this.refreshBModalValue();
                } else {
                    this.lblNewEditCalendar = value;
                }

                if (this.isStaff === false) {
                    this.$refs.EventShowModalNonStaff.show();
                } else {
                    // this.obj_SelectedComponent = updates;
                    // this.str_PostComponentTitle = "Updates";
                    this.$refs.EventShowModal.show();
                }

                // if (this.userType === "Teacher") {
                //     this.rdEventType = "PTC";
                // }
            },
            refreshBModalValue() {
                let getCurrentDateTime = new Date();
                this.isDisabled = false;
                this.inputEventTitle = '';
                this.rdEventType = '';
                // this.rdEventType = 'Event';
                this.inputEventTime = getCurrentDateTime;
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
            },
            async filterSelectedParticipant(filterValue, allOptions) {
                return allOptions.filter(option => option.includes(filterValue));
            },
            async btnAddClasses() {
                console.log(this.ddlClassLevel);
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
                console.log(this.guestInt, "remove");
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
                res.guide.clearGuideElement();
                this.eventNewEdit('New');
            },
            onClickSchedule(res) {
                let item =
                    {
                        "EventID": res.schedule.id,
                        "EventCreatedBy": res.schedule.raw
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