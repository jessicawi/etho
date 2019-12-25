<template>
    <div>
        <div class="row add-event" title="Event Type" v-if="isDisabled === false">
            <div class="col-lg-12 mb-3">
                <input type="file" multiple class="inputfile"
                       id="FU_Portfolio"/>
                <label for="FU_Portfolio">Choose a file</label>
                <el-carousel arrow="always" class="event-UploadCarousel" :autoplay="false"
                             v-if="arrobj_SelectedFiles&&arrobj_SelectedFiles.length > 0">
                    <el-carousel-item v-for="(obj_Images, key) of arrobj_SelectedFiles" :key="(obj_Images, key).id">
                        <img
                                :src="getMediumSource(obj_Images)"
                                :alt="obj_Images.EventFIleName"
                                v-bind:ref="'image'+parseInt( key )"/>
                    </el-carousel-item>
                </el-carousel>
                <div class="btn btn-primary" v-if="arrobj_SelectedFiles" @click="clearPreview()"><strong>X</strong>
                    REMOVE ALL
                </div>
            </div>
            <div class="d-flex col-lg-12 addEvent-title">
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
                            <el-dropdown-item command="sendEventEmail">Send Email</el-dropdown-item>
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
                        timelapse
                    </i>
                    <div class="event-details_duration">
                        <el-select v-model="EventDuration" placeholder="Duration" :disabled="this.isDisabled"
                                   v-if="checkedUser === 'Teacher'">
                            <el-option
                                    label="0.5 hour"
                                    value="0.5">
                            </el-option>
                            <el-option
                                    label="1 hour"
                                    value="1">
                            </el-option>
                            <el-option
                                    label="1.5 hour"
                                    value="1.5">
                            </el-option>
                            <el-option
                                    label="2 hour"
                                    value="2">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="event-details_item">
                    <i class="material-icons">
                        navigation
                    </i>
                    <el-input type="text" v-model="inputEventLocation" placeholder="Location"
                              :disabled="this.isDisabled"></el-input>
                </div>
                <div class="event-add-participant" v-if="userType !== 'Teacher'">
                    <label class="mt-4">Add Participant(Guest email only)
                        <small> separate by comma</small>
                    </label>
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
                </div>
                <div class="event-add-participant" v-if="userType === 'Teacher'">
                    <label class="mt-4">Add Student</label>
                    <div class="event-participant_student">
                        <el-tag
                                v-for="guest in studentInt"
                                :key="guest.value"
                                closable
                                v-if="studentInt.length>0"
                                @close="removeStudentList(guest)"
                                class="mb-2"
                        >
                            {{guest.label}}
                        </el-tag>
                        <el-button v-on:click="showClassModal()" size="small">+ Add Student</el-button>
                    </div>
                    <label class="mt-2">
                        Add Participant(Guest email only)
                        <small> separate by comma</small>
                    </label>
                    <div class="event-participant_parent">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";
    import Cookies from "js-cookie";
    import moment from 'moment';
    import $ from "jquery";

    export default {
        name: "Event_Modal_Component",
        data() {
            return {
                inputEventTitle: '',
                lblNewEditCalendar: '',
                inputEventTime: [],
                datePicker: {
                    disabledDate(date) {
                        return date < (new Date().getTime() - (1 * 24 * 60 * 60 * 1000));
                        //  Without using the second variable, you can replace 7 for with your back x days:
                        //e.g return date< Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
                    }
                },
                optParentSignUp: false,
                // optFullDay: false,
                userType: "",
                guestInt: [],
                inputVisible: false,
                inputEventParticipant: "",
                studentInt: [],
                isDisabled: false,
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
                checkedUser: "",
                inputEventRegLimit: 0,
                inputEventRegCutOffDay: 0,
                inputEventRegistrationStartTime: '',
                inputEventLocation: '',
                inputEventParticipantList: [],
                inputValue: '',
                inputEventParticipantType: '',
                arrobj_SelectedFiles: [],
                selectedFiles: [],
                images: [],
                EventDuration: '',
                oldEventFileID: '',
                isUploadFile: false
            };
        },
        mounted() {
            const self = this;
            this.initEvent();
            self.loadWhitelist();
            this.userType = Cookies.get('userTypeSession');
            this.sessionID = Cookies.get('userIDSession');
            for (let image of this.images) {
                let url = "data:" + image.GalFileType + ";base64," + image.GalFileLow;
                let fileName = image.GalFileName + image.GalFileExt;
                let mimeType = image.GalFileType;
                this.urltoFile(url, fileName, mimeType).then((file) => {
                    this.arrobj_SelectedFiles.push(file);
                }).finally(() => {
                    this.getImagePreviews();
                });
            }
            $("#FU_Portfolio").on("change", function (e) {
                self.onFileChanged(e);
            });


        },
        props: ["isDisable", "lblNewEditEvent", "eventCheckedUser", "eventStudentInt", "eventInputEventTitle", "eventInputEventTime", "eventOptParentSignUp", "eventRdEventType", "eventInputEventRegLimit", "eventInputEventRegCutOffDay", "eventInputEventRegistrationStartTime", "eventInputEventLocation", "eventGuestInt", "eventDurationHour", "eventID", "eventFiles"],
        methods: {
            async initEvent() {
                this.isDisabled = this.isDisable;
                this.lblNewEditCalendar = this.lblNewEditEvent;
                this.checkedUser = this.eventCheckedUser;
                this.studentInt = this.eventStudentInt;
                this.inputEventTitle = this.eventInputEventTitle;
                this.inputEventTime = this.eventInputEventTime;
                this.optParentSignUp = this.eventOptParentSignUp;
                this.rdEventType = this.eventRdEventType;
                this.inputEventRegLimit = this.eventInputEventRegLimit;
                this.inputEventRegCutOffDay = this.eventInputEventRegCutOffDay;
                this.inputEventRegistrationStartTime = this.eventInputEventRegistrationStartTime;
                this.inputEventLocation = this.eventInputEventLocation;
                this.guestInt = this.eventGuestInt;
                this.EventDuration = this.eventDurationHour;
                this.selectedEventID = this.eventID;
                this.arrobj_SelectedFiles = this.eventFiles.Table;
            },
            async btnCreateEvent() {
                try {
                    if (this.optParentSignUp === true) {
                        this.optParentSignUp = "Yes";
                    } else {
                        this.optParentSignUp = "No";
                    }
                    // if (this.optFullDay === true) {
                    //     this.optFullDay = "Yes";
                    // } else {
                    //     this.optFullDay = "No";
                    // }
                    // this.ParticipantNameListInt = [];
                    // console.log(this.inputEventTime[0], this.inputEventTime[1], this.inputEventTime, this.inputEventRegistrationStartTime);
                    if (this.EventDuration === "0.5") {
                        this.EventDuration = 30;
                    } else if (this.EventDuration === "1") {
                        this.EventDuration = 60;
                    } else if (this.EventDuration === "1.5") {
                        this.EventDuration = 90;
                    } else if (this.EventDuration === "2") {
                        this.EventDuration = 120;
                    }

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
                        EventDuration: this.EventDuration,
                    };

                    let guestIntSave = [];
                    guestIntSave.push(...this.guestInt);
                    if (this.studentInt) {
                        this.studentInt.forEach(item => {
                            let participantListDetail = {
                                Type: 'Student',
                                value: item.value,
                            };
                            guestIntSave.push(participantListDetail);
                        });
                    }


                    if (this.inputEventTitle === '' || this.inputEventTitle === null || this.inputEventTitle === undefined) {
                        alert('Please insert event title.');
                    } else if (this.inputEventTime === '' || this.inputEventTime === undefined) {
                        alert('Please select date from.');
                    } else {
                        this.$vs.loading();

                        let response = {};
                        try {
                            response = await DataSource.shared.saveEvent(this.arrobj_SelectedFiles, JSON.stringify(Obj), JSON.stringify(guestIntSave));
                        } catch (e) {
                            console.log(e);
                        }


                        if (response.code === '88') {
                            console.log('88');
                            window.location.replace('/');
                        } else if (response.code === "99") {
                            console.log('99');
                        } else if (response.code === '1') {
                            this.$notify({
                                title: 'Success',
                                message: 'Event Added!',
                                type: 'success'
                            });
                            this.$emit("LoadEventDetails");
                            this.$emit("hideEventShowModal");
                            // this.LoadEventDetails();

                            // window.location.replace('/Event');
                        }
                    }
                    this.$vs.loading.close();
                } catch (e) {
                    console.log(e);
                    // alert(e);
                }
            },
            sleep(milliseconds) {
                return new Promise(resolve => setTimeout(resolve, milliseconds));
            },
            async btnEditEvent() {
                try {
                    this.$vs.loading();
                    await this.sleep(200);
                    if (this.optParentSignUp === true) {
                        this.optParentSignUp = "Yes";
                    } else {
                        this.optParentSignUp = "No";
                    }
                    if (this.EventDuration === "0.5") {
                        this.EventDuration = 30;
                    } else if (this.EventDuration === "1") {
                        this.EventDuration = 60;
                    } else if (this.EventDuration === "1.5") {
                        this.EventDuration = 90;
                    } else if (this.EventDuration === "2") {
                        this.EventDuration = 120;
                    }

                    if (this.arrobj_SelectedFiles && this.isUploadFile === false) {
                        let oldEventFile = this.arrobj_SelectedFiles.map(m => m.EventFileID);
                        this.oldEventFileID = oldEventFile.toString();
                    }
                    let Obj = {
                        EventID: this.selectedEventID,
                        EventTitle: this.inputEventTitle,
                        EventType: this.rdEventType,
                        EventStartTime: moment(this.inputEventTime[0]).format("DD/MM/YYYY hh:mm:ss"),
                        EventEndTime: moment(this.inputEventTime[1]).format("DD/MM/YYYY hh:mm:ss"),
                        EventFullDay: "Yes",
                        EventParentSignUp: this.optParentSignUp,
                        EventRegCutOffDay: this.inputEventRegCutOffDay,
                        EventRegLimit: this.inputEventRegLimit,
                        EventLocation: this.inputEventLocation,
                        EventRegistrationStartTime: moment(this.inputEventRegistrationStartTime).format("DD/MM/YYYY hh:mm:ss"),
                        EventDuration: this.EventDuration,
                        OldEventFileID: this.oldEventFileID
                        // EventDesc:this:inputEventDesc
                    };

                    let guestIntSave = [];
                    guestIntSave.push(...this.guestInt);
                    if (this.studentInt) {
                        this.studentInt.forEach(item => {
                            let participantListDetail = {
                                Type: 'Student',
                                value: item.value,
                            };
                            guestIntSave.push(participantListDetail);
                        });
                    }

                    if (this.inputEventTitle === '' || this.inputEventTitle === null || this.inputEventTitle === undefined) {
                        alert('Please insert event title.');
                    } else if (this.inputEventTime === '' || this.inputEventTime === undefined) {
                        alert('Please select date from.');
                    } else {
                        let filesToInsert = this.arrobj_SelectedFiles;
                        if (Array.isArray(this.arrobj_SelectedFiles)) {
                            filesToInsert = undefined;
                        }

                        const response = await DataSource.shared.updateEvent(filesToInsert, JSON.stringify(Obj), JSON.stringify(guestIntSave));

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
                            this.$emit("hideEventShowModal");
                            this.$emit("refreshBModalValue");
                            this.$emit("LoadEventDetails");
                            // window.location.replace('/Event');
                        }
                    }
                    this.$vs.loading.close();
                } catch (e) {
                    alert(e);
                }
            },
            editEventMoreAction(command) {
                if (command === "deleteEvent") {
                    this.$emit("deleteEvent");
                } else if (command === "createEvent") {
                    this.$emit("eventNewEdit", "New");
                } else if (command === "sendEventEmail") {
                    this.$router.push('eventemail?id=' + this.selectedEventID);
                }
            },
            validEmail() {
                const re = /(.+)@(.+){2,}\.(.+){2,}/;
                return re.test(this.inputEventParticipant.toLowerCase());
            },
            addToParticipantList() {
                try {

                    const exist = this.guestInt.find(p => {
                        return p.value === this.inputEventParticipant;
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
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.guestInt.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            showInput() {
                this.inputVisible = true;
            },
            showClassModal() {
                this.$emit("showClassModal");
            },
            removeStudentList(guest) {
                this.studentInt.splice(this.studentInt.indexOf(guest), 1);
            },
            removeParticipantList(guest) {
                this.guestInt.splice(this.guestInt.indexOf(guest), 1);
            },
            isImageByExt(obj_File) {
                let ext = String(obj_File.EventFileExt).toUpperCase();
                let isImage = false;

                switch (ext) {
                    case ".PNG":
                    case ".JPG":
                    case ".BMP":
                    case ".GIF":
                        isImage = true;
                        break;
                    default:
                        isImage = false;
                        break;
                }

                return isImage;
            },

            getMediumSource(file) {
                let SourceisImage = this.isImageByExt(file);
                if (SourceisImage === true) {
                    return `data:image/jpg;base64, ${file.EventFileMedium}`;
                } else {
                    return `data:application/pdf;base64, ${file.EventFileOriginal}`;
                }
            },
            getLowSource(file) {
                return `data:image/jpg;base64, ${file.EventFileLow}`;
            },
            getFile(file) {
                return `data:${file.EventFileType};base64,${file.EventFileOriginal}`;
            },
            urltoFile(url, filename, mimeType) {
                return (fetch(url)
                        .then(function (res) {
                            return res.arrayBuffer();
                        })
                        .then(function (buf) {
                            return new File([buf], filename, {type: mimeType});
                        })
                );
            },
            onFileChanged(event) {
                this.isUploadFile = true;
                for (let file of event.target.files) {
                    let fileSize = file.size / 1024 / 1024;
                    if (fileSize > 2) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'File limit exceeded 2MB!'
                        });
                    } else {
                        if (this.isWhitelist(file)) {
                            this.arrobj_SelectedFiles = event.target.files;
                        } else {
                            this.$notify.error({
                                title: 'Error',
                                message: 'File Format Not Accepted!'
                            });
                        }
                    }
                }

                if (this.arrobj_SelectedFiles && this.arrobj_SelectedFiles.length) {
                    this.getImagePreviews();
                }

            },
            isWhitelist(file) {
                let temparrstr = file.name.split(".");
                let str_Ext = ("." + temparrstr[temparrstr.length - 1]).toUpperCase();
                let isWhitelisted = this.arrstr_Whitelist.findIndex(x => x.type.toUpperCase() === str_Ext) !== -1;
                let isValidFile = file.size > 0;

                return (isWhitelisted && isValidFile);
            },
            async loadWhitelist() {
                await DataSource.shared.getWhitelist().then((result) => {
                    this.arrstr_Whitelist = result.Table;
                });
            },
            getImagePreviews() {
                /*
                  Iterate over all of the files and generate an image preview for each one.
                */
                for (let i = 0; i < this.arrobj_SelectedFiles.length; i++) {
                    /*
                      Ensure the file is an image file
                    */
                    if (/\.(jpe?g|png|gif)$/i.test(this.arrobj_SelectedFiles[i].name)) {
                        /*
                          Create a new FileReader object
                        */
                        let reader = new FileReader();

                        /*
                          Add an event listener for when the file has been loaded
                          to update the src on the file preview.
                        */
                        reader.addEventListener("load", function () {
                            if (this.$refs['image' + parseInt(i)]) {
                                this.$refs['image' + parseInt(i)][0].src = reader.result;
                            }
                        }.bind(this), false);

                        /*
                          Read the data for the file in through the reader. When it has
                          been loaded, we listen to the event propagated and set the image
                          src to what was loaded from the reader.
                        */
                        reader.readAsDataURL(this.arrobj_SelectedFiles[i]);
                    }
                }
            },
            getSource(obj) {
                let imgsrc = "";
                if (obj.Profile_Img == null || obj.Profile_Img == "")
                    imgsrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAQAAACUXCEZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCAoFIgoPraT3AAAhSUlEQVR42u2deZgU5bX/P2/17DPAMAuoKJuKkc0FFRAQUNzAJUboAdxC3GKues2Niff3y01wicnj9Zq7RBMN3mhQIzSIhiCLiuyboKAsCrIMqyyzwCzM0st7/6iqXqt7eqleZqhvP/NMdXV11dv1rXPec877nvOCBQsWLFiwYMGCBQsWYoPoeD/p7c55vT29RS9PqSgVpbKMcjojKAZyKAQaaQVOIqnjhKiS1bJaqZb72ZdbeXu9RXAGQoo5vcVgBsnB9KUPJQmcqppKsYetbJVfTaoU0iI4rXD0EFfLEVzBIDon4fR1bGOjWONaM+WIRXBK8V5f941yhBhJrxRdsFKuYbVYYt9nEZxUvJFXMFrczE1cFOkoGwUUUkguOd4/QRZgwwa48ABOoJUW7a+Z0zTSiCdyA74Ri1jcsHJas0WwyZhZmHcLdm6iwPjzHLrQhS50ppD8BK7TRCN1nOIUp2gNd9BpFgpH3oe3nrYINqOfzWcCdiYYUWujK6WU0TUhUsPzeJIqqqkxlutGFghHw8JMl+aMJnjWJcoD3E1x8H6FMs6ijK4oKWiFhxqqOEaVEdG18m0xw77VIjhWuS0Sk+WDXBW8v4CzOJtuZKWhTS6OcZSjGGjmDcxgtr3BIjg6cs+SPxaPBXuzBfTgXMoyoH11HOQAIWzWizdc/zHloEVwZHIvFT+TFWT778ujJ+dSmmE3rpqDHKAlcGernGV7aeJXFsHGPe4w5RluCGxcd/pwTkp62vh65yPs5TgBAS/JEqbbP7MIDpTcITzDhEC57UufcF5RRqGRfewNluV/KNMnbrYIViV3oPIct/u3pDMX0gtbOwrBuNnPLuoDJXkev7bvOMMJ/ltZ9nPyQX8uy7mIs2mPkHzHLk4EGN7iNdv0H1SfoQS/lt11Gs/7G8alDKQb7RtVbOd4oKf8gvhPe+sZR/DsceJl/5hyCQPpTsfAUbZT479jh3y0YtkZRLCjhJe4z3ftTgzmHDoWDvOVv68s+Uv2k3ecPCMInn2r+BM99HdZ9OPijHWEEnOi9rAdp2/HMfGLSTM7OMF/6571Z27zXbwPA8ml46KZbVT6+8nv87D9RIcleM4N8k2fidyFIRkXn0oGqtlEne/tcXH/pAUdkOA38opekI/p11Pox4AOqZiNlfUutvvGoiQz8n+aqtHkFBE8d7DnXfrr78q4gk6cWahjE34O8TbPlMnbOgzBs6eIGRTqF7yY/h1xtm4UgZCd/nLcxE/sb3YAgpdlVf1GPqW/K+SqjBjySxdq2ODvPP259tGHne2aYMdZOBilv+vDpWkZqs8kuNhMpe/tClfF1GPtlmDHIBbQU922cRl9sACwn89x62+OMMG+pV0S7LieOXRRtwsYnlDCQUfDSdbSqL9pkBUVC9sdwbN/JF7VZ2aUM7xDhzPiQSvr8epml3ys4tXkXCcpg65S9P+teFE/94UMPeN7XqMb35NWfUhCEbfYbXOWtROCpZj7XzypK4jLzlCnKBrleTY5PikebT9rwKLl0vyrmN3z2uQMMU3dzmJohxslMhuH2eA1uMTbZdPGujKa4Neyu77DJHU7l1F0tRiMwjde7ZvRNbv2HnM9Y2EyvXP1saJ8Rp9x4ch4UccKvBkwH9TazaTYRIIdNvm2mKy7RaMpspiLGo2s8LlN75VPNk9Rm2ZkSbH9NXGvut2JMXro2UJUyKEH3+n5jP2beg2Yb5a5ZTOL3jmviId99OZbnMWIbM7jiE7xpWUlcxdlFMEDfsdP1a1CRlv0xoUsenBYm+IjhprlF5vSBzvu53XdtBprKecE0MBymnSt+IgZ0S0TCJ59o1ighqpyGZOUaihnEupZrlvUTibYP047wXMHeNaoQwo2xlgDCiagluVoRnSdMirRXMUEp0U5zvIsVukVDLPoNQVduUqXu86e+fO6pZHg17KZzbnq9iVWUNI09GCwvtnLNWtZVtoILn6Ja9StC7nQ4sVE9OMCfXNs1e/S1Ac7pvKOutWdUdaIkcmQrOaovl1R4Ug5wXMHe9ap+dmFjCPHYsR0tPCJXvClgaHxZhrHqaLfyPO8rdJrY7hFb1KQywg9DlWEw5GfUoILXmKQunW5NSSYNBQzRN8cIJ5PoYqec4ucr36zD1dYPCQVn7Ff64jlzRVLUkKwo5yvOEvVHNdbs62SDBcf61Plj7sGxz6HOh4V/bpKr2JNpksBsnxhj25Zr6SgD3ZU6HM2+luRq5Sg1Je1d6fjjiSraEcJO9RSGmWMsXzflPnEy/TMxCP0t59KpgS/pNKrMMSiN2UQXKkTdY58IYkqevY47lO3LraGBVOKTnxPJ/uh2dckieBlWeK/VLHt4r2chVTBK1JC/CmW4YcYCK56lAGqwrjijCm+kDnw6xT7Vz2UBCPLUcK3qtl8Ppdb9zst2KhnFtdk9Yu2QGLUoiieV+nN9hntFlKMQXq6Zon71yZL8KyByhY18n0J/aw7nTZ8g7Y8hFMZPPEbEyVYeU6lt8g3EG0hDein54tke541UUU7hnC7unWJZV6l2dQapG/eOesS8yT4WVWVd7XmXaUd5+oBYkV5xiSCZ13JzXonbyH98Bq5tzuuMoVg5Teq/JZ1mHrO7Rtn+yp8TjeB4LmDuV7dGmjd2wzBAH1jfNv9cJsEy5+r8ltOuXVnMwTdvdUClScS9IMdPdirzqkb2U6XyuiYOMxazR+29b3zUAISLJ5Q6e2kTuKwkCHooQ89ZLv/KQEJdhRxSM08GkJf665mFPbwhbpR23zevY1xSrCcotKbm7K11C1Ei97kqRtdcyviVtHiAfV/33a1CtmZAZu3tKvOUswEzx2srt8rrCqxGYk+ev86PJKzFIFg+ZBulFtFGTIRhV7HVZkWB8GOfHmX/qRYyEx4Dd973siLmWBxC8UAedYAQwY7S1qR5pKCm2ImWGoVJ3taA4QZC4Xz9C17jAT/o4Dx6tZ51n3MYOjsyNtmFsZEcPNtqmVVYKWnZDTK9DXSC3Nviolgabfkt33gXN1mqoiB4DfyuNEiuH0paW5emBs1wQWjVckvsLL3Mx4lemXQovpRURMstCk61gBhe4B3nO+m6Pvgm4O+aqEdECyiJdjRR53brtDNunvtAN11Ege81ys6Cb5JN8GtAg3tAdneSXiuG6IjeKSloNubDGtKelRMBJdZd66dwDsdckQUBDt6qOuFKpaL1G7QVaex73shjk9WOPktMXGQoUqbEVIQskSl+klhmGKIbk6iLj5SRF6U16rDDeT4jWE3oC9DJEMCr7V+N8JolSf9u9E87PXa8lYKXQ2mujX5VkYKdUvVgbu4YaOrVqTFdTXvtUGwHCFMV9ATtbzWJ5hg+Mm7BlfbxWq+4gR1SIopZxBXc0EUZt9t2hl9BDczRdvyMI27/Y5tZCFvattOlhucbT0vAG6eJlJhjAZ2s56dHOcUkiLKuJChXBnQ2kZvK0JhfO1YUKoRrIxok2AxRP+K+ZjDiKie1TpmsBTf8l/HOMY23mMcUxNKn1FYGkTwmojHn2S9JiGLwxIs2cMsVuHx7qmhhl18SA/u5doUKekydqmtubKNPlgKPUMlGT3wYT6M4qgj/ILFGr0unDi17VYW8hx74rx2KznAXg4GtOfbqAiGjXo5wSB42MxvWIEHkFpbnVq3cphnDY53Grw8JvTCGgZJEVGC5/VRZ1TnJGntow+4to0AaLOXxO7czDB6IDjOGhZyGIWd/DdPxzWE6eZK1pDNfPSZ4qfYBEgGsj0Meeu8i0ZK5jPV4Jh9vMxhwEU/xjGUUnJpYCdfs97w4XEnrIyNUUC2KgZd5vXUq5caSrBLWyygSxIakQucZF4bR/0vuwHJrczkLs4nj1zOYzJ/ZRJu4GtmEc+qb1lcCQi/G9zMSsCpD5yFoJp1gJvugOBTw67kAw4Cgl/wGpPoSSFZFDOUH/Iq/+FLEksBugQxGIZgoX1cnIQmTEACSyIq2RrUxezH83hQ0wQ/5nYk8DEH4rr+ZRQBJ9imyeS3HAWKuCxsh/I1IHiSLGA3e0OOOMpSwMkTevA+6HqvpIHg4CTuYF9I64GTUcfuB5QDTcz2LogciiW0AqUYF4J6lGKggXVx3oLhQDYLNPncBHgYHcYyb2I1AFdwEZcB2fw9xLxahxO4UJ/dlFYUR0lw3+QRbONuPMAqvVKMAVTpui7M0rQ2TZ1ui0tJFzIUgDW4gFZWAS5D2VN76NWAk++TjxoBXBFkDNWyB3BnBL0+xsT5kQnWJkEnZ+3fCfQBXMzWV9kMwV6jh9APV+ABDoaxadvC9+gG1LMBN1upA8rCprV/STVQzFDgMkqAOlYGGWH7AXeAij9NbcDrVIjU14a8TppkZmnoHcGK/nunlhJVUvKS9Jzdzy+xsYkNjAoTDYJIwxzn40ahgZa4VhcvZhjzyeZDLuQzwM24MOmVJ1kHSMaiAN0YyiJsLGZMkJEFIiBIczoonBEcwsjBnoQwB0A+iqphyh1F9oYwEtzUN+hpMB3DtTW9ZukLxgThtNbYyM9pY9x2/HAANlHLBsAdVkHX8hng5A7tJo3Rvlcf1E9Hbm0qIbysKb3Cqmhbb723Sh4ewg3sYmkEApvCfrteOyreOHkv+gIu/kgL0CtYn3m91bWa+dTTqznUld3+HiQ1wa31BTJcYXzrZIQ5AlmTfcKqaHlesiUY+jOSdcAcRhk4Y51oAY6GufHwLVlAYdwtLOEq9mJjR0QDq4a1gJtr/AYjhvEtIiDUKelMA3DCz2Lp5lW3VYax52QFOgLEsmf4SJY2sJiXVGXyMOuRfMc/uCfks75UAVsZFtb0EUCvuFto42pmaza4ZFyYow6wC7DxFm+FRK52e4s5FnEeR8hiQ4ak5+kjdbIsrIoWpYGHJgc9UGeWzOe7kM8GIYHlHA8TxvwIIKEIUbnXbh4Qpm7Q6QhDENl84KegLwIEn0BGESxKwxKsc5/speoeIAc4GTyyBdxCFnCcWQb9sORlTgL5CY3RlHKlZrtOiOgBh/aWaq+6yi9MM5xcYF+b4dfUIKdtCSYlEgzFWm3TJSFRpCJuQQL/4K/UBMnVK6gLf92Y0JChYCjgxBZ2AHAztUBnPmV5wGsWpUA9K/C5nKMBhRnMCTGVnGmT4MCR3sA7nCIJhvtYTD3NBl7oj/mSSuA9NnItgyhFUM12lnBIs2d/lOC1+/JxhE9rWA94uC7EUi9nOAuwscirQbK4j284gIs/8wnX0o9S8mmimp1s1LROaKDD6KErNlGCA2dPZAUZsVpPk/ynrYIZhkGGLF7gSQ4gOOCdbeHv5kxPst9Zw0bAxfdDPlEYzQLgC056CenGU/yWw8Beg8EIeCqEBKNEXnNCHV6CO4dX0bm6rZl8TAobryrhVcMsDMH1/HeS02lcrMMFXOTN2guU/e8Bgvl++/rxkhbvCiZtEDNSGqdWQnR1qATnGrFuxm0LPavCfTyP8fVyeJJ7WMCXHKEO6MzZXMINgQ5eGHhwQsB4lQsnRAgn+H9ezVKcyDAGWGeGshX4mHsDDJf/z10sZRuHqKeVLpQziBuDFr2XEXplTxIJDtCSjpPqsOL3U6CkLZiNVj3OVmsvCaeic5IjwRZSAZuhBFsEdxgoURBsoePSrqlxEzt9C6mFl7UWi+AOCbdF8Bkiwa3hCW6xCO7YKrolSNgtdDCC69R/TututUN4NfOp8ARXGTwCFtoJWoJYNCBYVhv00hbamQTL6rAEC0uCO4AEiwAJDpxVWS2SIsFu7Yz5YfbnhZl+rk6TESFT7NTxHyXMzBP1rP6femgxPE8opFZoITdMiK85aAg/8nE5YQdeWyJ4KjlxDtcaS3CWkQQ3m0zwMn4HSH7JdQH7G/hnDiJ5GONSqQ7+ApwTMrfxU62wwm/0giIBqGYK4PRLNKlmctCecPiU3wLwFDcYfn5DwDibQj7ncAk3h0zzVY+bFXY5wOsjjNe9G2cBOl2ClQgqWkt/P20qvZLlKCjYQia7d2GM4X4VjaxFQQmZ3Nqk7c/WUk2DoWgvv98Vsic8weqRy8N8rgS8oIk9zONxLWMx+Ljwq44pEV/xQc/3kOETwMW+wEPNwUE2a1ubQhKtRpIFfEulwfd2swvwcFvQ/mNs0rY2xpmEFg4n+Fzb2syRiB6n+pLeR+5l7zdj81yNX4kRrFSGVdHZ+1o0CZZtrVoZA1b5egcWBBRBgZ5cwudk8QFPGCh2gMtDqoWs8SojDwuYbCLBH3lDPC4+DWqpP2ZqRSSaOMR63sODm3kMifl6bxlWQsmJU0/qetcTXoJvr1fnqrpN7IVbWAXoSRPLQ36MOnl1Zcj8wyo2AJ6QvvAkawFJd0AxedL5cr+WroggSbnkk08+JQzmIS1FZVdQYlo0yNHOE/iKz8Rq0tt73N4QPtABpivpr9kDSP6FLGAv3wR9PoRi4JT2GPiwmSqgKGSSeyW7AOktrLDPtJZuYx+g8AQCqOTLKL93I26gMc3OZaPvBhGBYKEV0Kgz0YJWabycwYAtxDDqxlBAYXGQI6RavKOCnmePNu38CvpxOZDN+6a19GMEcClXcalfy6NF56Sm7LWNuiAGw0mwVl3hlEmXrdUSqa/z5tiuDFJ9grEAfBag4g6xGXCFGFgntMo34ynQXKSVJo19tWo6ZKz2B2ui9CY+wgb0TDPBOmPyq4gE6x+bRfBn1AJFjAOGaiVUgp2iflphkPkhhlRvtTK5H7ZQDXRmFHCpVlhhtUmapt575mspIrRkg79d0UQTTdSwlRm8CygGE+WjeaiaQl7uBAkOLoCSZSzBJ025aR7NbLkGBShhGIsRLOX6gKM6MZK9CD7lLm8AZA0gQ/rf0xqZ12iFFYaxEBsLI9aRjK0rGUEhkMtIFgPLjZdB8M6KFpqvUcQDWu2A2HCPiWEOnWB3ZAmeVKkqc6cpwY4DfIl/HRpV9X0elFYGI8kG9mr1FmG3ViXu9hAP+HN8hRVsjNa86/qEW3pc89XHau/HIYEtWj5UuDCFXrb1XkbF5VaaF+Zo1Id4T04+FNnIklolI8Mkqdg9YCd6wgdAf00ZB8d9zuVSIMurpJdrhlRwMafVOIELvAnX2uISAco9PizBA/RGX4j3EnoDbsP6dgSFJKr4I4+xxbRARzzwatytQkZW0bCRqwGq6ZHgTWvW+rCRfrm+I9gLLAtI/YBsRrMRWMVPsWmGVKgHXMta1NJl+vnyGMouBJ94lXtiCnqkn6szkv3Acu42kCk90OGmmkOs5hOOMJ0XvA9yIoGO+MIc+gCS/Cz4k9BywmvkP/t/JX5s11yywEIICrCfHfQPOPZySqihgWWMYzM1QKegkkWwl92A4E2/rEO1F9zHHs5PoKVbOIAAZjIzqKUH2cLlhoEOtN63FyPozjuc5l2eiSPQYQ6qvOyFdgNBcK3R5cVtilRg0MOEesNlDAMUlnjHfK4JappL84BFwNmEpgES84Y/0c5j1Bd+GsX378AJbDfBFogPbp+KXtcmwVOOqILnSbAXrtZqLRv3MauCygzp3vAXbOeLMB7wekCGPV/8j2OzZpsbn3ltFAMaHs3QSVcsq0bvuXfbj7apokGuEb1VsU+krP8GTgFFvB30DNXzKLU08kmQC3IBF/ItCi/iBM731rLxhS5rgU4h56vmSaqpZ6XXAo4Vn9IIdGFG0IQAF/dRTz0r28zyfZ9soHPaSqKFV9CGuUnKKt0pSdwDHk1hUCi9G1cDIiTcUaStCXMctYRgsBugtn1MyPnOZrih0jd4cA3CCs1+BlbXoDN30vzrZWEDHQ0cZC3/zrsADAgpINdWIMPo83hCHUd9bgZRSLBriU17Lpxx5wnvYyvgNkykHsOHqIMJgRpiBO9qSk6EKOjv+MLPA/aHzVtY4VQbZcyzuSVkn5NZ2qCCkfyPYwGCreynl2Ggw18+8g0GLo0CGf6zPO4xbGesoQ6nN64gP4pKgqdUslOVwuMJeMAuTe2G4mIuAISBN6zbq1eGlBpdjQvoZ5jj39ugsIIRhGFY4SMk0JfBBt8YSF/AHSLDoUGJcn4VElY1DmSINgMdsYY6juk98Db7gagIBrkoSPRjxGmW4cETplfMZRQePCFKOkvb7wopsl/FSjy4wsyTKmYoHiQfBYUP/JWzJ+zrYzx4GBMmEjVWa6nbMDQhyaKUIfyYV7kyihCGbxaIJ+IrTgW9yPixNsCcG+QSgIKwxcLa6oFbtECE8W1TZ0WGmy0Z/X6fknLhm0cZblZlZI/UFtUvCZ5VmR2mXnxz2JLl6pXMnFW5QAv8iHGTlkbVB0PDysLTFMBpauJa4URpw57MCnNbYt3vu83ZAb1yfoztif6XRFsjs63jzCs1V63H9RrkKuNfYIBpzbq4H8RCZsPL0If21qgJBulQ/x+y7mBGQ/oYmh1OBxmiYIEawDlNtXUXMxhVuoKuD5rz1BbBt57WV6GzlHQmQ5dfOd/eFBPBIDQlfcDK989YeHziNzu8mRgGDQvV0YaWiHP8LaQTh3X3r6rTRzETPK1Zvq1u7bXuZIbCy8zM8S0xEwxihvr/mMkZQBbMQSMndBL/EsmTDwv7Vn353Errbmak/GrRsjUTt8dFMPC6fiqr7k6mwe1L2nk90nERCW6epc4FaQlcc9hCBqBSN7BqmufETfC9jeI1dWtXXOt9WkgWpHcOOX+6tzFugsH1P2pyb73BGkcW0ukgaYZvi62NVajbIHjKETlLl2ELmQOdDfHOnd8lRDDIF1XtfCKB+R0WzMVRfYRAypfaOrZNgidv09ajYrt1ZzMEXiYW2HckTDAov1JluCruKTwWzMQRfZKd9DwXBXttHzJxkz6ytM26u5kkv+9P3mgKwaD8WpXhWg5b9zfNOKinqXh4Oiruojlo4mY9+edLa/AwrXB7E/ilw77VNIKBX6nJRI1aaraFdLlHWlTDKadH940oCbbv0GNaO0yvZGkhWjT5ilD9YfIuUwmG1l+pzpfLMrXShq16TuaJ7Oei/U7UBN9VK7T85koTksMtxI4TviGff7vjpOkEQ9mfVOGVbLKGD1MOD1/om1/yv9F/LwaCx7rk46q7VB9SkNBCsrFDr2Xn4VG7OykEQ8UytMkh35hY7NBC2zilJnwC8lV7TJXfYsxVdP5cHTf0sMkaIU4ZJJv0+MNh5/+L7bsxEnxXLY+rW9V8bd35lKlnb4r3o3fXJZVgsM/Vo1o7rLSWlKDKJ0pzKj6I9dvxVM57WFXTkg3WGmlJh5PP9M7wiOsnsX8/DoLtJ8T96jUb4yrgZyEWfKEHJz3yvqlVKSEYJi2SL6tblSZWXLcQij3oZTfE7yviWr8gzjVcOv0crWzt5pDasRbMQo1PQ25r+FV854iT4PEtylRVd7hZZy2FlxQ0s1Z3juqVSdOaU0owTNzO/erWaTZYPnESfN/1enK3FD+cGHfoUIm/CfbZ/F7dOuaLk1owCVu8qWW8MGle/OdREmlE+VP6Qkh7rXnTpuIbduubn/JviZwpIYLHulyTdTPvK2u+lmk45Btzr2Sy3Z02gmHqMc8EdT0IyQbLnjYF1b7QRq1nvP1EYmdTEm3O5G3i+2r+kpvV1hhTwjjFan203SkmTU444K8k3qRJy+Uj6lYLy9NW9bxjoIGV+lKeUj44aWniZ7SZ0ay5m+3aGjdujnBu3EWIz3ScZrl3wRE5veJ/zDinzZymzVk2sVQMBXDyHee1UVvSghGaWOFdYlL8p/2X5pzVtGWCpZjzKg+p24WMDql+bqEt6V3hK3bz5qQfCZNiR4pZDRRyxyNCrW1PI8utyjwxoZ5lvjs2lweEaaFBYWYzX8vu6tBXacxjdMjKZRbCWc4rfekE75fbx7rMO7fNzIYu8Iybl3ehGAjg4hDlaVuHpH35vSt9wzV/K7/LTHpNVNEqHnaKu/VZuy0st0qZtolDrNAdI8SMHfeYS6/JKlo3txy/F0/o7/ozwGIxLL7lS+9InHhl4mPC9GE5xfxGC1nxU+HNndnBZmsw0VgQ+Jwt+r2R8teTHhVJuFEiWc13/JA/6xGPcoZFvdrBmYIW1vvK2rTygP2t5FxHJO8nzLlOzqVY3c5nOKUWq17Usta3BHetvLNiWbKuJJL5M2YNVBboi4YpXKYtD21hD1t8lRIqPeMnJzGHQCT3p8zr5prtWwi4F5ed8XFqJ1/gt0DZUtfkqUnNxhXJ/kEOm3he/kK/TgFDE1rTtL2jhg2+iJUUfyj7mdluUcoJBphzu/yrvnKk4CIGJMN4bwdW8062+1RzPT+yz03+VUVqfpyjP7MYpL8rZUgbK4V2PJxik/+Mly3KlIkpSbK2pebnzTkx/o3cbK5WH6gm9uGmPFVPV9rhYScbfFazFH8oqrj9WGqundJ7PHuc+Cvn6O+KGBLjSrntE1V87j+V6ZiYNmlR6q6eYiFylPMqP/BdvBeDOnQIpImtgdXy57h+MjWlNWzSoCVn3yr+yLn6uyz68b1U9RQpVsx72Iafkfwdj6fCrEo7wfB+sevf5QO+axcy2Md4B8FBttLoz/Zrrf96dxomnabNznGM5mUG+t53ZQBndxByj7BdLxmq4kv5TxVr0tOWNBqyTysD7pYv+ttZJVzss8HaKY6xLTABoIZnedmetsJiafZUHCViunzEP35ZRj/OaZcOlOQIOwPrljjFy1nPRl+VrgMSDDDrYuUZJvq3pBP96NWuDC83lewKnGjokQ7xtH1nuluWIaIyd7DnWW7zb00ufenTLibfNrCPfYFJ8JIPmB5dPeczhGCAuVd4nma8f4sE3ehDj4yNXHs4zN7g1WgkCzxPT86YhOkM6+xmDVR+xlRy/Pfl0pNzM2wMSlLNQQ54p8tpaBHviN9PzKjlaTLQmvlbd9sj4jFKAvfmc26G0FzHQfYTsp5cnXhTefHOQ5l2NzPUXJ1ZmG+XDzI8eH8+Z3EW3dMybcDJMY5y1Jse5oe14vUmR+Q1BC2CjXrlAZ4HuSdYlkFQRnfK6ZoSS9tNDVUcpdpodmi1fEvMaHt5KovgsFiYW3+zYpe3UhT6mUJXSimjOCnWdiMnqaKaWuOVZurlfOEoWjI+w2tItZOIgiNfjhcVjA/HZDZd6EIxnSgiL+4fJWmikTpOcYpT4etwNvChcMhF9qb2cOfaVchoYW79KG4SN9M/0lEKBRRSSB455JBLDjkIsgGFLMCFB3AiaaWVFlppoYVGGjnd1qpQ28RiFstV9tb2c8/a5aQKR095oxjFiJTNw90t14qV7o+mtMNUq3Y9a+a9s11XM1JcwaCkTPE6yVaxidVyrb0dr8rZQaZFvdtbGaQM9AwWfelDeQInOk6l2MNWtipb79zfEe5MB5z3NrMwp4+tt6eXKBWlsoxSyugKdEEhmyKgASdu6oAaqmWVUi2rRRUHxL7TlZnpy1qwYMGCBQsWLFiwYCGV+D+ZSxKMIN18mwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wOC0xMFQwNTozNDowOSswMDowMIkZh/IAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDgtMTBUMDU6MzQ6MDkrMDA6MDD4RD9OAAAAAElFTkSuQmCC";
                else
                    imgsrc = "data:" + obj.Profile_ImgType + ";base64," + obj.Profile_Img;
                return imgsrc;
            },
            isImage(obj_File) {
                let ext = String(obj_File.EventFileExt).toUpperCase();
                let isImage = false;

                switch (ext) {
                    case ".PNG":
                    case ".JPG":
                    case ".BMP":
                    case ".GIF":
                        isImage = true;
                        break;
                    default:
                        isImage = false;
                        break;
                }

                return isImage;
            },
            clearPreview() {
                $("#FU_Portfolio").val("");
                this.arrobj_SelectedFiles = null;
            },
            /*#region Carousel Slider*/
            onSlideStart(slide) {
                this.sliding = true;
            },
            onSlideEnd(slide) {
                this.sliding = false;
            },
        },

    };
</script>
<style scoped>
    .el-date-editor {
        width: 100% !important;
    }
</style>