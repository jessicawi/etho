<template>
    <div id="event_Calendar">

        <div v-if="!isStaff" class="mt-3 container  pt-5">
            <div>
                <h1>Parent Event PAGE</h1>
                <div class="container">
                    <div class="row">

                        <div class="col-sm-2">
                            <h5>Upcoming Event</h5>
                            <div>
                                <ul class ='upComingEventUI'>
                                    <li v-for="item in upComingEventList" v-bind:key="item.EventID">
                                        {{convertToDate((item.EventDate))}}&nbsp;
                                        <a href="#" v-on:click="showMore(item.EventDate)" id="upComingEvent2"><b>{{(item.EventCount)}}</b></a><br>
                                        <hr>
                                    </li>

                                    <ul v-if="this.upComingDetailClicked==true" id="upComingDetailParent">
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
                        </div>

                        <div class="col-sm-8">

                            <h5>Calender</h5>
<!--                            <div><full-calendar :events="events" locale="en"></full-calendar></div>-->

                        </div>
                    </div>
                </div>
                <b-modal id="create_event_modal_nonStaff" size="xl" title='Event' ref="EventShowModalNonStaff" hide-footer
                         ok-variant="secondary">

                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Event Type">

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>{{ lblNewEditCalendar }} Event</label> <br>
                            <label><h1>Calendar Title</h1></label>
                            <input type="text" class="form-control" v-model="inputEventTitle" :disabled="this.isDisabled">
                            <b-form-group label="Event Type" align="left" :disabled="this.isDisabled">
                                <b-form-radio v-model="rdEventType" name="some-radios" value="Event" checked>Event</b-form-radio>
                                <b-form-radio v-model="rdEventType" name="some-radios" value="SchoolClosure">School Closure</b-form-radio>
                                <b-form-radio v-model="rdEventType" name="some-radios" value="PublicHoliday">Public Holiday</b-form-radio>
                            </b-form-group>
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
                                          type="text" class="form-control" v-model="inputEventRegLimit" value="0" min="0" max="99"></b-form-input>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Registration cutoff(days)</label>
                            <b-form-input id="range-1NonStaff" v-model="inputEventRegCutOffDay" :disabled="this.isDisabled" type="range" value="0" min="0" max="5" step="1"></b-form-input>
                            <div class="mt-2">Days: {{ inputEventRegCutOffDay }}</div>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <el-select v-model="ddlClassLevel" placeholder="Select" class="fullwidth" :disabled="this.isDisabled">
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
                            <input type="text" class="form-control" v-model="inputEventLocation" :disabled="this.isDisabled">
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <el-select v-model="ddlParticipant" placeholder="Select One" class="fullwidth" :disabled="this.isDisabled"
                                       filterable :filter-method="filterSelectedParticipant">
                                <el-option v-for="item in CurrentParticipantList"
                                           :value=item.CONid
                                           :label="item.CONname"
                                           :key="item.ID">
                                </el-option>
                            </el-select>
                            <button v-on:click="AddParticipantList()" :disabled="this.isDisabled">Add Participant</button>
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


        <div div v-if="isStaff" class="">
            <div >
                    <b-btn variant="primary" class="btnCreateEvent" v-on:click="eventNewEdit('New')">
                        Create Event
                    </b-btn>

                <b-modal id="create_event_modal" size="xl" title='Event' ref="EventShowModal" hide-footer
                         ok-variant="secondary">
                    <label>{{ lblNewEditCalendar }} Event</label> <br>

                    <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Event Type">

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label><h3>Event Title</h3></label>
                            <input type="text" class="form-control" v-model="inputEventTitle" :disabled="this.isDisabled">
                            <b-form-group label="Event Type" align="left" :disabled="this.isDisabled">
                                <b-form-radio v-model="rdEventType" name="some-radios" value="Event" checked>Event</b-form-radio>
                                <b-form-radio v-model="rdEventType" name="some-radios" value="PTC" checked>PTC</b-form-radio>
                                <b-form-radio v-model="rdEventType" name="some-radios" value="SchoolClosure">School Closure</b-form-radio>
                                <b-form-radio v-model="rdEventType" name="some-radios" value="PublicHoliday">Public Holiday</b-form-radio>
                            </b-form-group>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Select Date</label>
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
                            <br>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Registration Limit</label>
                            <b-form-input id="RegLimit" :disabled="this.isDisabled"
                                          type="text" class="form-control" v-model="inputEventRegLimit" value="0" min="0" max="99"></b-form-input>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Registration cutoff(days)</label>
                            <b-form-input id="range-1" v-model="inputEventRegCutOffDay" :disabled="this.isDisabled" type="range" value="0" min="0" max="10" step="1"></b-form-input>
                            <div class="mt-2">Days: {{ inputEventRegCutOffDay }}</div>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <el-button v-on:click="showClassModal()">Class</el-button>
                            <el-input v-if=""></el-input>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Location</label>
                            <el-input type="text" v-model="inputEventLocation" :disabled="this.isDisabled"></el-input>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Add Participant(Guest email only)</label>
                            <el-input type="text" v-model="inputEventParticipant" :disabled="this.isDisabled"></el-input>
                            <el-button v-on:click="addToParticipantList()">Add</el-button>
                                <div v-if="guestInt.length>0">
                                    <data-tables :data="guestInt" @selection-change="changeSelection" :action-col="guestListAction">
                                        <el-table-column type="selection" width="55">
                                        </el-table-column>
                                        <el-table-column v-for="item in guestList" min-width="50px"
                                                         :prop="item.prop"
                                                         :label="item.label" :key="item.prop"
                                                         sortable="custom">
                                        </el-table-column>
                                    </data-tables>
                            </div>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Event Registration Time </label>
                            <el-date-picker
                                    v-model="inputEventRegistrationStartTime"
                                    type="datetime"
                                    start-placeholder="Start Date"
                                    format="dd/MM/yyyy HH:mm:ss"
                                    value-format="dd/MM/yyyy HH:mm:ss"
                                    :picker-options="datePicker">
                            </el-date-picker>
                        </div>
                    </div>

                    <div v-if="this.lblNewEditCalendar==='New'">
                        <el-button class="btnCreateEvent" v-on:click="btnCreateEvent()" :disabled="this.isDisabled">Create Event</el-button>
                    </div>

                    <div v-else>
                        <el-button class="btnCreateEvent"  v-on:click="btnEditEvent()" :disabled="this.isDisabled">Edit Event</el-button>
                    </div>
                </b-modal>

                <b-modal id="addClassModal" hide-footer size="lg"
                         title="Add_Class" ref="addClassModal">
                    <EventTagsComponent @tags="setTags" :parent_Post="post"></EventTagsComponent>
                    <el-button v-on:click="AddComponentValue()">Add Class</el-button>
                </b-modal>

                <div class="container">
                    <div>
                        <h1>Event Overview</h1>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <h5>Event Details</h5>
                            <div style="overflow-x:scroll; height:800px;background:whitesmoke;scrollbar-color:rebeccapurple green">
                                <ul class ='eventUI'>
                                    <li v-for="item in eventList" v-bind:key="item.EventID">
                                        <b>{{item.EventTitle}}</b><br>
                                        {{convertToDate(item.EventStartTime)}}<br>
                                        {{getEventTime(item.EventStartTime,item.EventEndTime)}}<br>
                                        {{item.EventLocation}}<br>
                                        <b>Created By:{{item.CONname}}</b><br>
                                        <b-btn v-if="item.EventCreatedBy === sessionID" @click="editEvent(item)">Edit</b-btn>&nbsp;
                                        <b-btn v-if="item.EventCreatedBy === sessionID" @click="deleteEvent(item.EventID)">Delete</b-btn>
                                        <hr>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-sm-2">
                            <h5>Upcoming Event</h5>
                            <div>
                                <ul class ='upComingEventUI'>
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
                        </div>

                        <div class="col-sm-6">

                            <h5>Calender</h5>
<!--                            <div><full-calendar :events="events" locale="en"></full-calendar></div>-->

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

    export default {
        name: "Event",
        components: {
            'full-calendar': require('vue-fullcalendar'),
            EventTagsComponent,
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
        },
        data(){
            return{
                //Start: class component
                spdSelection:[],
                tags: [],
                guestInt:[],
                guestList: [{
                    prop: "guestEmail",
                    label: "Guest Email"
                }],
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
                            this.status = row.SPPD_Status;

                            if (this.status == 'Active') {
                                this.deleteSPDID = row.PK_SPD_ID;
                                this.paymentPlanDetailID = row.SPPD_FK_Payment_Plan_Detail_ID;
                                this.studentCourseID = row.SPPD_FK_Student_Course_ID;

                                this.deletePaymentItem();
                            } else {
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'Payment item cannot be deleted'
                                });
                            }
                        },
                        label: 'Delete'
                    }]
                },
                // arrobj_Levels: [],
                // arrobj_Classes: [],
                // arrobj_SelectedStudents: [],
                //End: class component

                userType:"",
                isStaff: '',
                imgStaffProfile: '',

                //
                obj_SelectedComponent: "",
                str_PostComponentTitle: "",
                arrobj_SelectedItem: [],
                obj_ComponentProperties: {},
                //

                upComingDetailClicked:false,
                isDisabled:false,
                datePicker:{
                    disabledDate(date){

                        return date<(new Date().getTime() - (1 * 24 * 60 * 60 * 1000));
                        //  Without using the second variable, you can replace 7 for with your back x days:
                        //e.g return date< Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
                    }
                },

                ddlParticipant:'',
                selectedParticipantList:[],
                upComingEventList:[],
                upComingEventDetailList:[],
                rdEventType: '',
                eventList:[],
                levelList: [],
                inputEventTime:'',
                inputEventRegistrationStartTime:'',
                optParentSignUp:false,
                inputEventRegCutOffDay:'0',
                inputEventRegLimit:'0',
                inputEventTitle:'',
                inputEventLocation:'',
                inputEventParticipant:'',
                inputEventParticipantList:[],
                inputEventDesc:'',
                selectedEventID:'',
                ddlClassLevel: '',
                //Full Calendar
                events:[{
                            title  : 'Monday Blue',
                            start  : '2019-06-10',
                        },
                        {
                            title  : 'Sunny CoCo ',
                            start  : '2019-06-24',
                            end    : '2019-06-27',
                        },
                        {
                            title  : 'EMS Meeting',
                            start  : '2019-06-11T12:30:00',
                            allDay : false,
                         }],

                mode:'single',
                selectedDate:null,
                sessionID: '',
                lblNewEditCalendar: '',
                MasterParticipantList:[],
                CurrentParticipantList:[],
                ParticipantNameListIntTemp:[],
                ParticipantNameListInt:[],
                tempParticipantList:[],
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
                            let objValue= {
                                CONname: row.StAllItem,
                                CONEmail: row.SelectedConEmail,
                                CONid: row.SelectedConID,
                                EventParID:row.SelectedEventParID,
                            }
                            this.CurrentParticipantList.push(objValue);

                        },
                        label: 'Delete'
                    }]
                },
                ParticipantNameList:[{
                    prop: "StAllItem",
                    label: "Email Address"
                }],
            }
        },
        methods:{
            async changeSelection(val) {
                this.spdSelection = val;
            },

            setTags(value) {
                try{
                    this.tags = value;
                }
                catch (e) {
                    this.results = e;
                }
            },

            AddComponentValue(){
                try{
                    if(this.tags){
                        console.log(this.tags,'tags value');
                        this.$notify({
                            title: 'Success',
                            message: 'Successfully!',
                            type: 'success'
                        });
                        this.$refs.addClassModal.hide();
                    }
                    else{
                        this.$notify.error({
                            title: 'Error, please try again',
                            message: 'Error'
                        });
                    }
                }
                catch (e) {
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

            showMore(obj){
                this.upComingDetailClicked = true;
                this.LoadUpComingEventDetail(obj);
            },

            async BindEventFields(resultTable){
                try {
                    this.ParticipantNameListIntTemp=[];
                    this.ParticipantNameListInt=[];
                    this.CurrentParticipantList=[];

                    resultTable.forEach(m => {
                        this.inputEventTitle = m.EventTitle;
                        this.rdEventType = m.EventType;
                        // this.inputEventTime[0] = m.EventStartTime;
                        // this.inputEventTime[1] = m.EventEndTime;
                        this.inputEventRegLimit = m.EventRegLimit;
                        this.inputEventRegCutOffDay = m.EventRegCutOffDay;
                        this.inputEventLocation = m.EventLocation;

                        const resp = DataSource.shared.getEventParticipantByEventID(m.EventID);
                        resp.then((resp)=>{
                            if(resp.code ==='2'){
                                this.MasterParticipantList.forEach(m=>{
                                    this.CurrentParticipantList.push(m);
                                });
                            }
                            else {
                                this.ParticipantNameListIntTemp=resp.Table;
                                this.ParticipantNameListIntTemp.forEach(n=> {
                                    let tempList ={
                                            StAllItem: n.CONname,
                                            SelectedConID:n.CONid,
                                            SelectedConEmail:n.CONEmail,
                                            SelectedEventParID:n.EventParID,
                                    }
                                        this.ParticipantNameListInt.push(tempList);

                                        this.MasterParticipantList.forEach(p=>{
                                            if(n.CONid===p.CONid)
                                            {
                                               // this.CurrentParticipantList.splice(this.CurrentParticipantList.indexOf(m), 1);
                                            }
                                            else
                                            {
                                                let tempCurrentList ={
                                                    CONname: p.CONname,
                                                    CONid:p.CONid,
                                                    CONEmail:p.CONEmail,
                                                    SelectedEventParID:p.EventParID,
                                                }
                                                this.CurrentParticipantList.push(tempCurrentList);
                                            }
                                        });

                                });

                                this.selectedParticipantList = (resp.Table)? resp.Table:[];
                            }
                        });
                        if (m.EventParentSignUp === 'Yes') {
                            this.optParentSignUp = true;
                        };
                    });
                } catch (e) {
                    this.results = e;
                }
            },

            async editEvent(objValue){
                try{
                    //capture EventID
                    var obj = {
                        eventID:objValue.EventID,
                        eventCreatedBy:objValue.EventCreatedBy,
                    }

                    //Disable user to editEvent if
                    if(Cookies.get('userIDSession')==obj.eventCreatedBy||Cookies.get('userIDSession')==null){
                        this.isDisabled = false;
                    }
                    else{
                        this.isDisabled = true;
                    }

                    this.selectedEventID = obj.eventID;
                    const response = await DataSource.shared.getEvent(this.selectedEventID);
                    if(response==='88') {
                        window.location.replace('/');
                    }else if(response==='99'){
                        console.log('Cannot get event');
                    }else if(response==='2'){
                        console.log('invalid ID');
                        window.location.replace('/');
                    }

                    if(this.isStaff === false){
                        this.BindEventFields(response.Table);
                        this.$refs['EventShowModalNonStaff'].show();
                    }
                    else{
                        this.BindEventFields(response.Table);
                        this.$refs['EventShowModal'].show();
                    }
                    this.eventNewEdit('Edit');

                }catch(e){
                    alert(e);
                    console.log(e);
                }

            },

            async deleteEvent(eventID){
                try{
                    //capture EventID
                    this.selectedEventID = eventID;

                    const response = await DataSource.shared.deleteEvent(eventID);

                    if(response.code==='88') {
                        window.location.replace('/');
                    }else if(response.code==='99'){
                        console.log('Event Not Found');
                    }else if(response.code==='2'){
                        console.log('invalid ID');
                        window.location.replace('/');
                    }
                    else if(response.code==='1'){
                        alert('Event Deleted!');
                        window.location.replace('/event');
                    }

                }catch(e){
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

            getEventTime(startValue,endValue){
                try{
                    let startTime = new Date(startValue);
                    let endTime = new Date(endValue);
                    let timeDiff = Math.abs(endTime.getTime()-startTime.getTime());
                    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    let starthour = new Date(startValue).getHours();
                    let startminute = new Date(startValue).getMinutes();
                    let endhour = new Date(endValue).getHours();
                    let endminute = new Date(endValue).getMinutes();
                    let Time;
                    if(diffDays>1)
                    {
                        return "All Day";
                    }
                    else{
                        Time = starthour + ":"+startminute+ "AM to " +endhour+":"+endminute+"PM";
                        return Time;
                    }
                }catch(e){
                    alert(e);
                }
            },

            convertToDate(startTime){
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

                let m = monthValue[month-1];
                date = day + "th " + m + " " + year;
                return date;
            },

            async btnCreateEvent(){
                try
                {
                    if(this.optParentSignUp===true){
                        this.optParentSignUp = "Yes";
                    }
                    else{
                        this.optParentSignUp = "No";
                    }
                    let participantList=[];

                    console.log(this.inputEventTime[0],this.inputEventTime[1],this.inputEventTime, this.inputEventRegistrationStartTime);

                    var Obj = {
                        EventTitle:this.inputEventTitle,
                        EventType:this.rdEventType,
                        EventStartTime:this.inputEventTime[0],
                        EventEndTime:this.inputEventTime[1],
                        EventRegistrationStartTime:this.inputEventRegistrationStartTime,
                        EventParentSignUp: this.optParentSignUp,
                        EventRegCutOffDay:this.inputEventRegCutOffDay,
                        EventRegLimit:this.inputEventRegLimit,
                        EventLocation: this.inputEventLocation,
                    };

                    if(this.selectedParticipantList){
                        this.selectedParticipantList.forEach(item => {
                            let participantListDetail = {
                                Type: 'EventParConID',
                                value: item.participantConID,
                            };
                            participantList.push(participantListDetail);
                        });
                    }

                    if(this.inputEventTitle=== '' || this.inputEventTitle === null || this.inputEventTitle === undefined){
                        alert('Please insert event title.');
                    }
                    else if(this.inputEventTime === '' || this.inputEventTime === undefined){
                        alert('Please select date from.');
                    }
                    else{

                        const response = await DataSource.shared.saveEvent(JSON.stringify(Obj),JSON.stringify(participantList));

                        if(response.code==='88'){
                            console.log('88');
                        }
                        else if(response.code==="99"){
                            console.log('99');
                        }
                        else if(response.code==='1'){
                            alert('Success');
                            window.location.replace('/Event');
                        }
                    }
                }
                catch(e){
                    alert(e);
                }
            },

            async LoadEventDetails() {
                try{
                    const response = DataSource.shared.getEvent();
                    response.then((response)=>{

                        if(response.Table.length < 1){
                            alert('No record found');
                            console.log('No record found');
                        }
                        else if(response.code ==='99'){
                            alert('No event found');
                            console.log('No event found');
                        }
                        else {
                            this.eventList = (response.Table)? response.Table:[];
                        }
                    });
                }catch(e){
                    console.log(e);
                }
            },

            async LoadUpComingEvent() {
                try{
                    const response = DataSource.shared.getUpComingEvent();
                    response.then((response)=>{

                        if(response.code ==='2'){
                            console.log('No record found');
                        }
                        else if(response.code ==='99'){
                            console.log('99');
                        }
                        else {
                            this.upComingEventList = (response.Table)? response.Table:[];
                        }
                    });
                }catch(e){
                    console.log(e);
                }
            },

            async LoadUpComingEventDetail(value){
                try{

                    var obj = {
                        EventStartTime:value,
                    };

                    const response = await DataSource.shared.getUpComingEventDetail(JSON.stringify(obj));

                        if(response.code ==='99'){
                            console.log('99');
                        }
                        else if(response.code ==='2'){
                            console.log('2');
                            alert('No record found');
                        }
                        else {
                            return this.upComingEventDetailList = (response.Table)? response.Table:[];
                        }

                }catch(e){
                    console.log(e);
                }
            },

            eventNewEdit (value) {
                if(value==='New'){
                    this.lblNewEditCalendar = value;
                    this.refreshBModalValue();
                }
                else{
                    this.lblNewEditCalendar = value;
                }

                if(this.isStaff === false){
                    this.$refs.EventShowModalNonStaff.show();
                }
                else{
                    // this.obj_SelectedComponent = updates;
                    // this.str_PostComponentTitle = "Updates";
                    this.$refs.EventShowModal.show();
                }

            },

            refreshBModalValue(){
                let getCurrentDateTime = new Date();
                this.isDisabled = false;
                this.inputEventTitle = '';
                this.rdEventType = 'Event';
                this.inputEventTime = getCurrentDateTime;
                this.inputEventRegLimit = '0';
                this.inputEventRegCutOffDay = '0';
                this.inputEventLocation = '';
                this.optParentSignUp = false;
                this.ParticipantNameListInt=[];
                this.ddlParticipant='';
                this.CurrentParticipantList=[];
                this.MasterParticipantList.forEach(m => {
                    this.CurrentParticipantList.push(m);
                });
            },

            async filterSelectedParticipant(filterValue, allOptions){
                return allOptions.filter(option => option.includes(filterValue));
            },

            async btnEditEvent(){
                try
                {
                    if(this.optParentSignUp===true){
                        this.optParentSignUp = "Yes";
                    }
                    else{
                        this.optParentSignUp = "No";
                    }

                    var Obj = {
                        EventID:this.selectedEventID,
                        EventTitle:this.inputEventTitle,
                        EventType:this.rdEventType,
                        EventStartTime:this.inputEventTime[0],
                        EventEndTime:this.inputEventTime[1],
                        EventParentSignUp: this.optParentSignUp,
                        EventRegCutOffDay:this.inputEventRegCutOffDay,
                        EventRegLimit:this.inputEventRegLimit,
                        EventLocation: this.inputEventLocation,
                        // EventDesc:this:inputEventDesc
                    };

                    if(this.inputEventTitle=== '' || this.inputEventTitle === null || this.inputEventTitle === undefined){
                        alert('Please insert event title.');
                    }
                    else if(this.inputEventTime === '' || this.inputEventTime === undefined){
                        alert('Please select date from.');
                    }
                    else{

                        const response = await DataSource.shared.updateEvent(JSON.stringify(Obj),JSON.stringify(this.ParticipantNameListInt));

                        if(response.code==='88'){
                            console.log('88');
                        }
                        else if(response.code==="99"){
                            console.log('99');
                        }
                        else if(response.code==='1'){
                            alert('Event update successful');
                            window.location.replace('/Event');
                        }
                    }
                }
                catch(e){
                    alert(e);
                }
            },

            async btnAddClasses(){
                console.log(this.ddlClassLevel);
            },

            showClassModal(){
                console.log('show class model');
                this.$refs.addClassModal.show();
            },

            addToParticipantList(){
                try{

                    let type = 'Others';
                    this.inputEventParticipantList.push(this.inputEventParticipant);
                    let emailList =[];
                    this.inputEventParticipantList.forEach(m=>{
                        let tempEmail={
                            guestEmail:m,
                            Type:type,
                        }
                        emailList.push(tempEmail);
                    });
                    this.guestInt = emailList;
                    console.log(this.guestInt);
                    this.inputEventParticipant = '';
                }
                catch (e) {
                            this.results = e;
                        }
            },

            async btnJoinEvent(){
                console.log('btnJoinEvent');
            },
            async btnRejectEvent(){
                console.log('btnRejectEvent');
            },
        },
    }
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