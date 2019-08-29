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
                    <div class="row add-event" title="Event Type" v-if="isDisabled === false">
                        <div class="d-flex col-lg-12 addEvent-title">
                            <!--<label><h3>Event Title</h3></label>-->
                            <el-input
                                    v-model="inputEventTitle"
                                    type="text"
                                    placeholder="Event Title"
                                    :disabled="this.isDisabled"
                            >
                            </el-input>
                            <div class=" addEvent-btn-group ml-3">
                                <div v-if="this.lblNewEditCalendar==='New'">
                                    <el-button class="btnCreateEvent" v-on:click="btnCreateEvent()"
                                               :disabled="this.isDisabled">
                                        SAVE
                                    </el-button>
                                </div>
                                <div v-else>
                                    <el-button class="btnCreateEvent" v-on:click="btnEditEvent()"
                                               :disabled="this.isDisabled">
                                        SAVE
                                    </el-button>
                                </div>
                                <el-dropdown class="ml-3" @command="editEventMoreAction"
                                             v-if="this.lblNewEditCalendar!=='New'">
                                    <el-button type="info">
                                        MORE ACTIONS
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="deleteEvent">Remove Event</el-dropdown-item>
                                        <el-dropdown-item command="createEvent">Add New</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                        <div class="col-lg-12 mt-2">
                            <small>Select Date</small>
                            <el-date-picker
                                    v-model="inputEventTime"
                                    type="datetimerange"
                                    range-separator="To"
                                    start-placeholder="Start Date"
                                    end-placeholder="End Date"
                                    format="dd/MM/yyyy HH:mm:ss"
                                    value-format="dd/MM/yyyy HH:mm:ss"
                                    :picker-options="datePicker">
                            </el-date-picker>
                        </div>
                        <div class="col-lg-12 mt-2 event-parentSignUp">
                            <el-checkbox :disabled="this.isDisabled" v-model="optParentSignUp">Parent sign up?
                            </el-checkbox>
                        </div>
                        <div class="col-lg-12">
                            <label class="createEvent_details-title">Event Details</label>
                            <div class="event-details_item">
                                <i class="material-icons">
                                    star
                                </i>
                                <el-select v-model="rdEventType" placeholder="Event Type" :disabled="this.isDisabled"
                                           v-if="checkedUser !== 'Teacher'">
                                    <el-option
                                            v-for="item in rdEventTypeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="rdEventType" placeholder="Event Type" :disabled="this.isDisabled"
                                           v-if="checkedUser === 'Teacher'">
                                    <el-option
                                            label="PTC"
                                            value="PTC">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="event-details_item" v-if="optParentSignUp===true">
                                <i class="material-icons">
                                    group
                                </i>
                                <div class="event-cutoff">
                                    <label>Registration Limit</label>
                                    {{inputEventRegLimit}}
                                    <el-slider
                                            v-model="inputEventRegLimit"
                                            :disabled="this.isDisabled"
                                            show-input
                                            :max="99"
                                            value=0>
                                    </el-slider>
                                </div>
                            </div>
                            <div class="event-details_item" v-if="optParentSignUp===true">
                                <i class="material-icons">
                                    date_range
                                </i>
                                <div class="event-cutoff">
                                    <label>Registration cutoff(days)</label>
                                    <el-slider
                                            v-model="inputEventRegCutOffDay"
                                            :disabled="this.isDisabled"
                                            show-input
                                            :max="10"
                                            value=0>
                                    </el-slider>
                                </div>
                            </div>
                            <div class="event-details_item">
                                <i class="material-icons">
                                    access_time
                                </i>
                                <div class="event-register-time">
                                    <label>Event Registration Time</label>
                                    <el-date-picker
                                            v-model="inputEventRegistrationStartTime"
                                            type="datetime"
                                            start-placeholder="Event Registration Time"
                                            format="dd/MM/yyyy HH:mm:ss"
                                            value-format="dd/MM/yyyy HH:mm:ss"
                                            :picker-options="datePicker">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="event-details_item">
                                <i class="material-icons">
                                    navigation
                                </i>
                                <el-input type="text" v-model="inputEventLocation" placeholder="Location"
                                          :disabled="this.isDisabled"></el-input>
                            </div>
                            <div class="event-add-participant">
                                <label class="mt-4">Add Participant(Guest email only)
                                    <small> separate by comma</small>
                                </label>
                                <!--el-input
                                        class="input-new-tag"
                                        v-model="inputEventParticipant"
                                        type="email"
                                        :disabled="this.isDisabled"
                                        placeholder="Participant Email"
                                >
                                </el-input>
                                <el-button class="" size="small" @click="addToParticipantList()">+ Add Participant>
                                </el-button-->
                                <el-tag
                                        v-for="guest in guestInt"
                                        :key="guest.value"
                                        closable
                                        v-if="guestInt.length>0"
                                        @close="removeParticipantList(guest)"
                                        class="mb-2"
                                >
                                    {{guest.value}}
                                </el-tag>
                                <el-input
                                        class="input-new-tag"
                                        v-if="inputVisible"
                                        v-model="inputEventParticipant"
                                        ref="saveTagInput"
                                        size="small"
                                        type="email"
                                        @keyup.enter.native="addToParticipantList"
                                        @blur="handleInputConfirm"
                                        :disabled="this.isDisabled"
                                        placeholder="press enter to add participant"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Add Email
                                </el-button>
                                <!--<div class="d-flex">-->
                                <!--<el-input type="text" v-model="inputEventParticipant"-->
                                <!--:disabled="this.isDisabled"></el-input>-->
                                <!--<el-button v-on:click="addToParticipantList()" class="ml-2"><i class="material-icons">-->
                                <!--add-->
                                <!--</i></el-button>-->
                                <!--</div>-->
                            </div>
                            <!--div v-if="guestInt.length>0 && isEditEvent===true">
                                <data-tables :data="guestInt" @selection-change="changeSelection"
                                             :action-col="guestListAction">
                                    <el-table-column type="selection" width="55">
                                    </el-table-column>
                                    <el-table-column v-for="item in guestList" min-width="50px"
                                                     :prop="item.prop"
                                                     :label="item.label" :key="item.prop"
                                                     sortable="custom">
                                    </el-table-column>
                                </data-tables>
                            </div-->
                        </div>
                    </div>
                    <div class="row add-event event-details" title="Event Type" v-else>
                        <div class="d-flex col-lg-12 addEvent-title">
                            <h4>{{inputEventTitle}}</h4>
                        </div>
                        <div class="col-lg-12 mt-2">
                            <small>Date</small>
                            <el-date-picker
                                    v-model="inputEventTime"
                                    type="datetimerange"
                                    range-separator="To"
                                    start-placeholder="Start Date"
                                    end-placeholder="End Date"
                                    format="dd/MM/yyyy HH:mm:ss"
                                    value-format="dd/MM/yyyy HH:mm:ss"
                                    :picker-options="datePicker"
                                    :disabled="this.isDisabled">
                            </el-date-picker>
                        </div>
                        <div class="col-lg-12 mt-2 event-parentSignUp">
                            <el-checkbox :disabled="this.isDisabled" v-model="optParentSignUp">Parent sign up?
                            </el-checkbox>
                        </div>
                        <div class="col-lg-12">
                            <label class="createEvent_details-title">Event Details</label>
                            <div class="event-details_item">
                                <i class="material-icons">
                                    star
                                </i>
                                <el-select v-model="rdEventType" placeholder="Event Type" :disabled="this.isDisabled"
                                           v-if="checkedUser !== 'Teacher'">
                                    <el-option
                                            v-for="item in rdEventTypeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="rdEventType" placeholder="Event Type" :disabled="this.isDisabled"
                                           v-if="checkedUser === 'Teacher'">
                                    <el-option
                                            label="PTC"
                                            value="PTC">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="event-details_item" v-if="optParentSignUp===true">
                                <i class="material-icons">
                                    group
                                </i>
                                <div class="event-cutoff">
                                    <label>Registration Limit</label>
                                    {{inputEventRegLimit}}
                                    <el-slider
                                            v-model="inputEventRegLimit"
                                            :disabled="this.isDisabled"
                                            show-input
                                            :max="99"
                                            value=0>
                                    </el-slider>
                                </div>
                            </div>
                            <div class="event-details_item" v-if="optParentSignUp===true">
                                <i class="material-icons">
                                    date_range
                                </i>
                                <div class="event-cutoff">
                                    <label>Registration cutoff(days)</label>
                                    <el-slider
                                            v-model="inputEventRegCutOffDay"
                                            :disabled="this.isDisabled"
                                            show-input
                                            :max="10"
                                            value=0>
                                    </el-slider>
                                </div>
                            </div>
                            <div class="event-details_item">
                                <i class="material-icons">
                                    access_time
                                </i>
                                <div class="event-register-time">
                                    <label>Event Registration Time</label>
                                    <el-date-picker
                                            v-model="inputEventRegistrationStartTime"
                                            type="datetime"
                                            start-placeholder="Event Registration Time"
                                            format="dd/MM/yyyy HH:mm:ss"
                                            value-format="dd/MM/yyyy HH:mm:ss"
                                            :picker-options="datePicker">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="event-details_item">
                                <i class="material-icons">
                                    navigation
                                </i>
                                <el-input type="text" v-model="inputEventLocation" placeholder="Location"
                                          :disabled="this.isDisabled"></el-input>
                            </div>
                            <div class="event-add-participant">
                                <label class="mt-4">Add Participant(Guest email only)
                                    <small> separate by comma</small>
                                </label>
                                <!--el-input
                                        class="input-new-tag"
                                        v-model="inputEventParticipant"
                                        type="email"
                                        :disabled="this.isDisabled"
                                        placeholder="Participant Email"
                                >
                                </el-input>
                                <el-button class="" size="small" @click="addToParticipantList()">+ Add Participant>
                                </el-button-->
                                <el-tag
                                        v-for="guest in guestInt"
                                        :key="guest.value"
                                        closable
                                        v-if="guestInt.length>0"
                                        @close="removeParticipantList(guest)"
                                        class="mb-2"
                                >
                                    {{guest.value}}
                                </el-tag>
                                <el-input
                                        class="input-new-tag"
                                        v-if="inputVisible"
                                        v-model="inputEventParticipant"
                                        ref="saveTagInput"
                                        size="small"
                                        type="email"
                                        @keyup.enter.native="addToParticipantList"
                                        @blur="handleInputConfirm"
                                        :disabled="this.isDisabled"
                                        placeholder="press enter to add participant"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Add Email
                                </el-button>
                                <!--<div class="d-flex">-->
                                <!--<el-input type="text" v-model="inputEventParticipant"-->
                                <!--:disabled="this.isDisabled"></el-input>-->
                                <!--<el-button v-on:click="addToParticipantList()" class="ml-2"><i class="material-icons">-->
                                <!--add-->
                                <!--</i></el-button>-->
                                <!--</div>-->
                            </div>
                            {{guestInt}}
                            <!--div v-if="guestInt.length>0 && isEditEvent===true">
                                <data-tables :data="guestInt" @selection-change="changeSelection"
                                             :action-col="guestListAction">
                                    <el-table-column type="selection" width="55">
                                    </el-table-column>
                                    <el-table-column v-for="item in guestList" min-width="50px"
                                                     :prop="item.prop"
                                                     :label="item.label" :key="item.prop"
                                                     sortable="custom">
                                    </el-table-column>
                                </data-tables>
                            </div-->
                        </div>
                    </div>
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
                                <!--<full-calendar-->
                                <!--defaultView="dayGridMonth"-->
                                <!--:events="events"-->
                                <!--locale="en">-->
                                <!--</full-calendar>-->
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
            'calendar': Calendar
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
                    console.log("99");

                    this.ParticipantNameListIntTemp = [];
                    this.ParticipantNameListInt = [];
                    this.CurrentParticipantList = [];

                    resultTable.forEach(m => {
                        console.log(resultTable, "199");
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
                                this.guestInt = this.ParticipantNameListInt;

                                console.log(this.guestInt, "guestInt");
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

            async btnCreateEvent() {
                try {
                    if (this.optParentSignUp === true) {
                        this.optParentSignUp = "Yes";
                    } else {
                        this.optParentSignUp = "No";
                    }
                    // this.ParticipantNameListInt = [];

                    // console.log(this.inputEventTime[0], this.inputEventTime[1], this.inputEventTime, this.inputEventRegistrationStartTime);

                    let Obj = {
                        EventTitle: this.inputEventTitle,
                        EventType: this.rdEventType,
                        EventStartTime: this.inputEventTime[0],
                        EventEndTime: this.inputEventTime[1],
                        EventRegistrationStartTime: this.inputEventRegistrationStartTime,
                        EventParentSignUp: this.optParentSignUp,
                        EventRegCutOffDay: this.inputEventRegCutOffDay,
                        EventRegLimit: this.inputEventRegLimit,
                        EventLocation: this.inputEventLocation,
                    };
                    console.log(this.guestInt, "create");
                    // if (this.guestInt) {
                    //     this.guestInt.forEach(item => {
                    //         let participantListDetail = {
                    //             Type: 'Others',
                    //             value: item.value,
                    //         };
                    //         this.ParticipantNameListInt.push(participantListDetail);
                    //     });
                    // }

                    if (this.inputEventTitle === '' || this.inputEventTitle === null || this.inputEventTitle === undefined) {
                        alert('Please insert event title.');
                    } else if (this.inputEventTime === '' || this.inputEventTime === undefined) {
                        alert('Please select date from.');
                    } else {

                        const response = await DataSource.shared.saveEvent(JSON.stringify(Obj), JSON.stringify(this.guestInt));

                        if (response.code === '88') {
                            console.log('88');
                        } else if (response.code === "99") {
                            console.log('99');
                        } else if (response.code === '1') {
                            this.$notify({
                                title: 'Success',
                                message: 'Event Added!',
                                type: 'success'
                            });
                            this.LoadEventDetails();
                            this.$refs['EventShowModal'].hide();
                            // window.location.replace('/Event');
                        }
                    }
                } catch (e) {
                    alert(e);
                }
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
                this.inputEventRegistrationStartTime = '';
                this.MasterParticipantList.forEach(m => {
                    this.CurrentParticipantList.push(m);
                });
            },

            async filterSelectedParticipant(filterValue, allOptions) {
                return allOptions.filter(option => option.includes(filterValue));
            },

            async btnEditEvent() {
                try {
                    if (this.optParentSignUp === true) {
                        this.optParentSignUp = "Yes";
                    } else {
                        this.optParentSignUp = "No";
                    }
                    let Obj = {
                        EventID: this.selectedEventID,
                        EventTitle: this.inputEventTitle,
                        EventType: this.rdEventType,
                        EventStartTime: this.inputEventTime[0],
                        EventEndTime: this.inputEventTime[1],
                        EventFullDay: "Yes",
                        EventParentSignUp: this.optParentSignUp,
                        EventRegCutOffDay: this.inputEventRegCutOffDay,
                        EventRegLimit: this.inputEventRegLimit,
                        EventLocation: this.inputEventLocation,
                        EventRegistrationStartTime: this.inputEventRegistrationStartTime,
                        // EventDesc:this:inputEventDesc
                    };

                    console.log(Obj, "update");
                    // let participantList = [];
                    // if (this.guestInt) {
                    //     this.guestInt.forEach(item => {
                    //         let participantListDetail = {
                    //             Type: 'Others',
                    //             value: item.guestEmail,
                    //         };
                    //         participantList.push(participantListDetail);
                    //     });
                    // }

                    if (this.inputEventTitle === '' || this.inputEventTitle === null || this.inputEventTitle === undefined) {
                        alert('Please insert event title.');
                    } else if (this.inputEventTime === '' || this.inputEventTime === undefined) {
                        alert('Please select date from.');
                    } else {

                        const response = await DataSource.shared.updateEvent(JSON.stringify(Obj), JSON.stringify(this.guestInt));

                        if (response.code === '88') {
                            console.log('88');
                        } else if (response.code === "99") {
                            console.log('99');
                        } else if (response.code === '1') {
                            this.$notify({
                                title: 'Success',
                                message: 'Event update successful',
                                type: 'success'
                            });
                            this.$refs['EventShowModalNonStaff'].hide();
                            this.refreshBModalValue();
                            this.LoadEventDetails();
                            // window.location.replace('/Event');
                        }
                    }
                } catch (e) {
                    alert(e);
                }
            },
            editEventMoreAction(command) {
                console.log(command);
                if (command === "deleteEvent") {
                    this.deleteEvent();
                } else if (command === "createEvent") {
                    this.eventNewEdit('New');
                }
            },
            async btnAddClasses() {
                console.log(this.ddlClassLevel);
            },

            showClassModal() {
                this.$refs.addClassModal.show();
            },
            showInput() {
                this.inputVisible = true;
                // this.$nextTick(_ => {
                //     this.$refs.saveTagInput.$refs.input.focus();
                // });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.guestInt.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            validEmail() {
                const re = /(.+)@(.+){2,}\.(.+){2,}/;
                return re.test(this.inputEventParticipant.toLowerCase());
            },
            addToParticipantList() {
                try {
                    const exist = this.inputEventParticipantList.find(p => {
                        return p === this.inputEventParticipant;
                    });
                    if (this.validEmail() && !exist) {
                        let tempGuestInt = [];
                        let Type = "Others";
                        tempGuestInt.push(...this.inputEventParticipant.split(","));
                        // let emailList = [];
                        // if (this.inputEventParticipantType === "") {
                        //     this.inputEventParticipantType = "Others";
                        // }
                        tempGuestInt.forEach(m => {
                            let tempEmail = {
                                Type: Type,
                                value: m,
                            };
                            this.guestInt.push(tempEmail);
                        });
                        this.$forceUpdate();
                        // this.guestInt = emailList;
                        this.inputEventParticipant = '';
                        this.inputVisible = false;
                        this.inputValue = '';
                        this.inputEventParticipantType = '';
                    } else if (this.validEmail() && exist) {
                        this.$notify.error({
                            title: 'error',
                            message: 'email duplicated'
                        });
                    } else {
                        this.$notify.error({
                            title: 'error',
                            message: 'Please insert valid email'
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
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
                console.log('beforeCreateSchedule', res);
                res.guide.clearGuideElement();
                this.eventNewEdit('New');
            },
            onClickSchedule(res) {
                console.group('onClickSchedule', res);
                let item =
                    {
                        "EventID": res.schedule.id,
                        "EventCreatedBy": res.schedule.raw
                    };

                console.log(item);
                this.editEvent(item);
                // console.log('MouseEvent : ', res.event);
                // console.log('Calendar Info : ', res.calendar);
                // console.log('Schedule Info : ', res.schedule);
                // console.groupEnd();
            },
            beforeCreateSchedulecalendar(res) {
                // console.log('beforeCreateSchedulecalendar');
            },
            onclickMore(res) {
                // console.log('onclickMore');
            },
            onClickDayname(res) {
                // view : week, day
                // console.group('onClickDayname');
                // console.log(res.date);
                // console.groupEnd();
            },
            onBeforeDeleteSchedule(res) {
                // console.group('onBeforeDeleteSchedule');
                // console.log('Schedule Info : ', res.schedule);
                // console.groupEnd();
                const idx = this.scheduleList.findIndex(item => item.id === res.schedule.id);
                this.scheduleList.splice(idx, 1);
            },
            onAfterRenderSchedule(res) {
                // console.group('onAfterRenderSchedule');
                // console.log('Schedule Info : ', res.schedule);
                // console.groupEnd();
            },
            onClickTimezonesCollapseBtn(timezonesCollapsed) {
                // view : week, day
                // console.group('onClickTimezonesCollapseBtn');
                // console.log('Is Collapsed Timezone? ', timezonesCollapsed);
                // console.groupEnd();
                if (timezonesCollapsed) {
                    this.theme['week.timegridLeft.width'] = '100px';
                    this.theme['week.daygridLeft.width'] = '100px';
                } else {
                    this.theme['week.timegridLeft.width'] = '50px';
                    this.theme['week.daygridLeft.width'] = '50px';
                }
            },
            onBeforeUpdateSchedule() {
                // console.log("onBeforeUpdateSchedule");
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