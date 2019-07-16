<template>
    <div id="classmanagement">
        <div class="container admin-wrap">
            <div class="row header mb-2">
                <div class="col-lg-4 ">
                    <h3 class="text-left mb-3">Class Management</h3>
                </div>
                <div class="col-lg-8 actionDiv">
                    <el-button-group>
                        <el-button type="primary" v-b-modal.newClassModal variant="primary" id="btnAddNewClass"><i
                                class="material-icons">
                            playlist_add
                        </i> New Class
                        </el-button>
                        <el-button type="primary" variant="primary" v-on:click="directToPromotion()"
                                   id="btnMassPromotion">Mass Promotion <i
                                class="material-icons">
                            view_module
                        </i></el-button>
                        <el-button type="primary" variant="primary" v-on:click="directToTransferIn()">Transfer In <i
                                class="material-icons">
                            transfer_within_a_station
                        </i></el-button>
                        <el-button type="primary" variant="primary" v-on:click="directToStudentGraduation()">Graduation
                            <i
                                    class="material-icons">
                                school
                            </i></el-button>
                    </el-button-group>
                    <!--<b-btn v-b-modal.newClassModal variant="primary">-->
                    <!--Mass Promotion-->
                    <!--</b-btn>-->
                    <!--<b-btn variant="primary" v-on:click="directToPromotion()">-->
                    <!--Mass Promotion-->
                    <!--</b-btn>-->
                </div>
            </div>
            <div class="">
                <div style="margin-bottom: 10px" class="row">
                    <div class="col-lg-6">
                        <el-input v-model="ClassFilters[0].value" class="search-datatable" placeholder="Search"
                                  id="inputSearchClassName">
                            <template slot="prepend"><i class="material-icons">
                                search
                            </i> <span>Search Class Name</span>
                            </template>
                        </el-input>
                    </div>
                    <div class="col-lg-4 offset-lg-2">
                        <!--<el-select v-model="ClassFilters[1].value" placeholder="select type"-->
                        <!--multiple="multiple" class="float-right">-->
                        <!--<el-option-->
                        <!--v-for="item in classListFilteritem"-->
                        <!--:key="item"-->
                        <!--:label="item"-->
                        <!--:value="item">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <el-popover
                                placement="bottom-end"
                                width="400"
                                trigger="click">
                            <el-checkbox-group v-model="ClassFilters[1].value" class="custom-checkbox">
                                <el-checkbox-button v-for="item in classListFilteritem" :label="item"
                                                    :key="item">{{item}}
                                </el-checkbox-button>
                            </el-checkbox-group>
                            <el-button slot="reference" type="primary" round
                                       class="float-right large-btn classManage-filter" id="btnFilterByLevel"><i
                                    class="material-icons">
                                tune
                            </i> Filter
                            </el-button>
                        </el-popover>
                    </div>
                </div>
                <data-tables :data="parentClassListInt" :action-col="parentClassListAction"
                             class="classManage-Table" :filters="ClassFilters">
                    <el-table-column v-for="parentClassListIntInfo in parentClassList"
                                     :prop="parentClassListIntInfo.prop"
                                     :label="parentClassListIntInfo.label" :key="parentClassListIntInfo.prop"
                                     sortable="custom"
                                     id="parentClassList">
                    </el-table-column>
                </data-tables>
            </div>
            <!--<div class="row">-->
            <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
            <!--<div v-if="classListInt.length>0">-->
            <!--<el-row style="margin-bottom: 10px">-->
            <!--<el-col :span="11">-->
            <!--<el-input v-model="ClassFilters[0].value" class="search-datatable" placeholder="Search">-->
            <!--<template slot="prepend"><i class="material-icons">-->
            <!--search-->
            <!--</i> Search Class Name-->
            <!--</template>-->
            <!--</el-input>-->
            <!--</el-col>-->
            <!--<el-col :span="11" :offset="2">-->
            <!--&lt;!&ndash;<el-select v-model="ClassFilters[1].value" placeholder="select type"&ndash;&gt;-->
            <!--&lt;!&ndash;multiple="multiple" class="float-right">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-option&ndash;&gt;-->
            <!--&lt;!&ndash;v-for="item in classListFilteritem"&ndash;&gt;-->
            <!--&lt;!&ndash;:key="item"&ndash;&gt;-->
            <!--&lt;!&ndash;:label="item"&ndash;&gt;-->
            <!--&lt;!&ndash;:value="item">&ndash;&gt;-->
            <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
            <!--<el-popover-->
            <!--placement="bottom-end"-->
            <!--width="400"-->
            <!--trigger="click">-->
            <!--<el-checkbox-group v-model="ClassFilters[1].value" class="custom-checkbox">-->
            <!--<el-checkbox-button v-for="item in classListFilteritem" :label="item"-->
            <!--:key="item">{{item}}-->
            <!--</el-checkbox-button>-->
            <!--</el-checkbox-group>-->
            <!--<el-button slot="reference" type="primary" round-->
            <!--class="float-right large-btn classManage-filter"><i-->
            <!--class="material-icons">-->
            <!--tune-->
            <!--</i> Filter-->
            <!--</el-button>-->
            <!--</el-popover>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--<data-tables :data="classListInt" :action-col="classListAction" class="classManage-Table"-->
            <!--:filters="ClassFilters">-->
            <!--<el-table-column v-for="classListInfo in classList" :prop="classListInfo.prop"-->
            <!--:label="classListInfo.label" :key="classListInfo.prop"-->
            <!--sortable="custom">-->
            <!--</el-table-column>-->
            <!--<el-table-column label="Assign Students" min-width="100px">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button v-for="assignStudents in assignStudentToClass(scope.row)"-->
            <!--:key="assignStudents.name" type="primary"-->
            <!--@click="assignStudents.handler">-->
            <!--{{assignStudents.name}}-->
            <!--</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="View Students" min-width="100px">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button v-for="assignStudents in ViewStudentToClass(scope.row)"-->
            <!--:key="assignStudents.name" type="primary"-->
            <!--@click="assignStudents.handler">-->
            <!--{{assignStudents.name}}-->
            <!--</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--</data-tables>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
        </div>
        <b-modal id="newClassModal" size="lg" title="Create New Class" ok-only ok-variant="secondary" hide-footer
                 ref="newClassShowModal" v-model="newClassShowModal">
            <div class="row ml-2 mr-2">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-3">
                    <label>Level</label>
                    <!--<select v-model="ddlClassLevel" class="form-control pro-edt-select form-control-primary">-->
                    <!--<option v-for="item in levelList" v-bind:value="item.PK_Course_ID">-->
                    <!--{{ item.CRS_Course_Name }}-->
                    <!--</option>-->
                    <!--</select>-->
                    <el-select v-model="ddlClassLevel" placeholder="Select" class="fullwidth">
                        <el-option
                                v-for="item in levelList"
                                :key="item.PK_Course_ID"
                                :label="item.CRS_Course_Name"
                                :value="item.PK_Course_ID">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Semester</label>
                    <el-select v-model="ddlSemester" placeholder="Select" class="fullwidth">
                        <el-option
                                v-for="item in semesterList"
                                :key="item.PK_Semester_ID"
                                :label="item.SMT_Code"
                                :value="item.PK_Semester_ID">
                        </el-option>
                    </el-select>
                    <!--<select v-model="ddlSemester" class="form-control pro-edt-select form-control-primary">-->
                    <!--<option v-for="item in semesterList" v-bind:value="item.PK_Semester_ID">-->
                    <!--{{ item.SMT_Code }}-->
                    <!--</option>-->
                    <!--</select>-->
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Class Name</label>
                    <input type="text" class="form-control" v-model="inputClassName">
                </div>
                <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                <!--<label>Programme</label>-->
                <!--<el-select v-model="ddlClassType" placeholder="Select" class="fullwidth">-->
                <!--<el-option-->
                <!--v-for="item in classTypeList"-->
                <!--:key="item.CTY_ClassType"-->
                <!--:label="item.CTY_ClassType"-->
                <!--:value="item.CTY_ClassType">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--&lt;!&ndash;<select v-model="ddlClassType" class="form-control pro-edt-select form-control-primary">&ndash;&gt;-->
                <!--&lt;!&ndash;<option v-for="item in classTypeList" v-bind:value="item.CTY_ClassType">&ndash;&gt;-->
                <!--&lt;!&ndash;{{ item.CTY_ClassType }}&ndash;&gt;-->
                <!--&lt;!&ndash;</option>&ndash;&gt;-->
                <!--&lt;!&ndash;</select>&ndash;&gt;-->
                <!--</div>-->
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Class Teacher</label>
                    <el-select v-model="ddlClassTeacher" filterable placeholder="Select" class="fullwidth">
                        <el-option
                                v-for="item in classTeacherList"
                                :key="item.CONid"
                                :label="item.CONname"
                                :value="item.CONid">
                        </el-option>
                    </el-select>
                    <!--<select v-model="ddlClassTeacher" class="form-control pro-edt-select form-control-primary">-->
                    <!--<option v-for="item in classTeacherList" v-bind:value="item.CONid">-->
                    <!--{{ item.CONname }}-->
                    <!--</option>-->
                    <!--</select>-->
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Maximum Student</label>
                    <input type="text" class="form-control" v-model="inputMaxStudents" @keypress="onlyNumber">
                </div>
                <hr class="custom-hr"/>
                <div class="col-lg-6">
                    <button v-on:click="closeAssignModal()"
                            class="btn btn-secondary close-modal-btn float-left">Close
                    </button>
                </div>
                <div class="col-lg-6">
                    <button v-on:click="createNewProgrmamme('New')"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Next
                    </button>
                </div>
            </div>
        </b-modal>
        <b-modal id="editClassModal" size="lg" title="Edit Class" ok-only ok-variant="secondary"
                 ref="editClassShowModal" hide-footer v-model="editClassShowModal">
            <div class="row ml-2 mr-2">
                <div style="display: none;">{{ editSemesterID }} - {{ editCourseID }} - {{ editClassName }} - {{
                    editClassClassTeacher }}
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Level</label>
                    <input type="text" class="form-control" v-model="inputeditLevel" readonly="readonly" disabled>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Class Name</label>
                    <input type="text" class="form-control" v-model="inputEditClassName">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Status</label>
                    <el-select v-model="ddlEditClassStatus" filterable placeholder="Select" class="fullwidth">
                        <el-option
                                v-for="item in editClassStatusList"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                    <!--<select v-model="ddlEditClassStatus" class="form-control pro-edt-select form-control-primary">-->
                    <!--<option v-for="item in editClassStatusList" v-bind:value="item">-->
                    <!--{{ item }}-->
                    <!--</option>-->
                    <!--</select>-->
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Maximum Student</label>
                    <input type="text" class="form-control" v-model="inputEditMaxStudents" @keypress="onlyNumber">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Class Teacher</label>
                    <el-select v-model="ddlEditClassTeacher" filterable placeholder="Select" class="fullwidth">
                        <el-option
                                v-for="item in classTeacherList"
                                :key="item.CONid"
                                :label="item.CONname"
                                :value="item.CONid">
                        </el-option>
                    </el-select>
                </div>
                <hr class="custom-hr"/>
                <div class="col-lg-6">
                    <button @click="backtoClassList()" class=" btn btn-secondary float-left">
                        Back
                    </button>
                </div>
                <div class="col-lg-6">
                    <button v-on:click="updateClass()"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Save
                    </button>
                </div>
            </div>
        </b-modal>
        <b-modal id="assignClassModal" size="lg" title="Assign Class" ok-only ok-variant="secondary" hide-footer
                 ref="assignClassShowModal" v-model="assignClassModal">
            <div class="">
                <div style="display: none;">{{ assignClassLevelID }} - {{ assignClassID }} - {{ assignClassSemID }}
                </div>
                <div class="">
                    <div v-if="assignStudentsListInt.length<1" class="empty-list_image">
                        <strong>No Record ...</strong>
                        <img src="../assets/promotion.jpg"/>
                    </div>
                    <div v-if="assignStudentsListInt.length>0">
                        <el-row style="margin-bottom: 10px" class="classManage-ActionBar">
                            <el-col :span="16">
                                <!--<el-input v-model="filters[0].value">-->
                                <!--<template slot="prepend">Search</template>-->
                                <!--</el-input>-->
                                <el-input v-model="assignStudentsListSearchFilter">
                                    <template slot="prepend">Search</template>
                                </el-input>
                            </el-col>
                            <el-col :span="7" :offset="1">
                                <el-button type="primary" round @click="ViewStudentToClassInner()">View Assigned Student
                                </el-button>
                            </el-col>
                        </el-row>
                        <!--<data-tables :data="assignStudentsListInt" :filters="filters" layout="table"-->
                        <!--:pagination-props="{ background: true, pageSizes: [2, 3, 4] }"-->
                        <!--@selection-change="changeSelection" :row-key="getRowKey" ref="articleTable">-->
                        <!--<el-table-column type="selection" width="55" :reserve-selection="true">-->
                        <!--</el-table-column>-->
                        <!--<el-table :data="assignStudentsListInt.filter(data => !assignStudentsListSearchFilter || data.Full_Name.toLowerCase().includes(assignStudentsListSearchFilter.toLowerCase()))"-->
                        <!--@selection-change="changeSelection" :row-key="getRowKey" ref="articleTable">-->
                        <el-table
                                :data="assignStudentsListInt.filter(data => !assignStudentsListSearchFilter || data.Full_Name.toLowerCase().includes(assignStudentsListSearchFilter.toLowerCase())).slice((assignStudentsListCurrentPage-1)*assignStudentsListPageSize,assignStudentsListCurrentPage*assignStudentsListPageSize)"
                                @selection-change="changeSelection" :row-key="getRowKey" ref="articleTable">
                            <el-table-column type="selection" width="55" :reserve-selection="true">
                            </el-table-column>
                            <el-table-column v-for="assignStudentsListInfo in assignStudentsList"
                                             :prop="assignStudentsListInfo.prop"
                                             :label="assignStudentsListInfo.label" :key="assignStudentsListInfo.prop"
                                             sortable="custom">
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @current-change="assignStudentsListChangePage"
                                @size-change="assignStudentsListChangePageSize"
                                :page-sizes="[20, 40, 60, 80]"
                                :page-size=assignStudentsListPageSize
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="assignStudentsListTotal">
                        </el-pagination>
                    </div>
                </div>
                <hr class="custom-hr"/>
                <div class="row">
                    <div class="col-lg-6">
                        <button v-on:click="backtoClassList()"
                                class="btn btn-secondary close-modal-btn float-left">Back
                        </button>
                    </div>
                    <div class="col-lg-6">
                        <button v-on:click="assignClass()"
                                class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch float-right"
                                :disabled="assignStudentsListInt.length<1">
                            Assign
                        </button>
                    </div>
                </div>
            </div>
        </b-modal>
        <b-modal id="ViewClassModal" size="lg" title="Assign Class" ok-only ok-variant="secondary"
                 ref="ViewClassModal" ok-title="Close" hide-footer v-model="ViewClassModal">
            <div class="">
                <div style="display: none;">{{ assignClassLevelID }} - {{ assignClassID }}</div>
                <div v-if="currentStudent.length<1" class="empty-list_image">
                    <strong>No Record ...</strong>
                    <img src="../assets/promotion.jpg"/>
                </div>
                <div class="">
                    <div>
                        <data-tables :data="currentStudent" v-if="currentStudent.length>0">
                            <el-table-column v-for="studentList in currentStudentList"
                                             :prop="studentList.prop"
                                             :label="studentList.label" :key="studentList.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>
            </div>
            <hr class="custom-hr"/>
            <div class="row ">
                <div class="col-lg-6">
                    <button @click="closeAssignModal"
                            class="btn btn-secondary waves-effect waves-light m-r-10 btnFamilyIDSearch float-left">
                        Close
                    </button>
                </div>
                <div class="col-lg-6">
                    <button @click="returnAssignStudents"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch float-right">
                        Assign Student
                    </button>
                </div>
            </div>
        </b-modal>
        <b-modal id="ClassListModal" size="lg" title="Class List" ok-only ok-variant="secondary" hide-footer
                 ref="classListShowModal" v-model="ClassListModal">
            <div class="row ml-2 mr-2">
                <div style="display: none;">{{ classListSemesterID }} - {{ classListCourseID }} - {{ classListClassName
                    }} - {{ classListLevelName }} - {{ classListMaxStudents }} - {{ classListClassTeacher }}
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div class="">
                        <el-button-group class=" ">
                            <el-button type="primary" v-on:click="editClass()" variant="primary"><i
                                    class="material-icons">
                                edit
                            </i> Edit Class
                            </el-button>
                            <el-button type="primary" v-on:click="createNewProgrmamme('Edit')" variant="primary"><i
                                    class="material-icons">
                                note_add
                            </i> Create New Programme
                            </el-button>
                        </el-button-group>
                        <!--<div class="delete_programme_btn">-->
                        <!--<small>Remove Programme</small>-->
                        <!--<el-button type="info" round v-on:click="" variant="primary"><i-->
                        <!--class="material-icons">-->
                        <!--delete-->
                        <!--</i>-->
                        <!--</el-button>-->
                        <!--</div>-->
                    </div>
                    <div class="totalNumberOfStudentAssignedToClass" v-if="totalNumberOfStudentAssignedToClass">
                        <label>
                            Total Student Assigned: {{ totalNumberOfStudentAssignedToClass }}
                        </label>
                    </div>
                    <div v-if="classListInt.length>0">
                        <data-tables :data="classListInt" class="classManage-Table" :action-col="classListAction"
                                     :filters="ClassFilters">
                            <el-table-column v-for="classListInfo in classList" :prop="classListInfo.prop"
                                             :label="classListInfo.label" :key="classListInfo.prop"
                                             sortable="custom">
                            </el-table-column>
                            <el-table-column label="Assign Students" min-width="100px">
                                <template slot-scope="scope">
                                    <el-button v-for="assignStudents in assignStudentToClass(scope.row)"
                                               :key="assignStudents.name" type="primary"
                                               @click="assignStudents.handler">
                                        {{assignStudents.name}}
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column label="View Students" min-width="100px">
                                <template slot-scope="scope">
                                    <el-button v-for="assignStudents in ViewStudentToClass(scope.row)"
                                               :key="assignStudents.name" type="primary"
                                               @click="assignStudents.handler">
                                        {{assignStudents.name}}
                                    </el-button>
                                </template>
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>
                <hr class="custom-hr"/>
                <div class="col-lg-6">
                    <button v-on:click="closeAssignModal()"
                            class="btn btn-secondary close-modal-btn float-left">Close
                    </button>
                </div>
                <!--<div class="col-lg-6">-->
                <!--<button v-on:click="editClass()"-->
                <!--class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Edit Class-->
                <!--</button>-->
                <!--<button v-on:click="createNewProgrmamme('Edit')"-->
                <!--class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Create New-->
                <!--Programme-->
                <!--</button>-->
                <!--</div>-->
            </div>
        </b-modal>
        <b-modal id="newProgrammeModal" size="lg" title="Create New Programme" ok-only ok-variant="secondary"
                 hide-footer
                 ref="newProgrammeShowModal" v-model="newProgrammeShowModal">
            <div class="row ml-2 mr-2">
                <div style="display: none;">{{ programmeLevelID }} - {{ programmeSemID }} - {{ programmeClassName }} -
                    {{ programmeMaxStudent }} - {{ programmeClassTeacher }} - {{ programmeSaveType }}
                </div>
                <div class="col-lg-12" v-if="currentClassTypeList.length > 0">
                    <label>Programme</label>
                </div>
                <div class="col-lg-6">
                    <el-select v-model="ddlClassType" placeholder="Select" class="fullwidth"
                               v-if="currentClassTypeList.length > 0">
                        <el-option
                                v-for="item in currentClassTypeList"
                                :key="item.CTY_ClassType"
                                :label="item.CTY_ClassType"
                                :value="item.CTY_ClassType"
                                :disabled="item.disabled===true">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-lg-12">
                    <div v-if="currentClassTypeList.length<1" class="empty-list_image">
                        <strong class="text-center">All Programme has been created.</strong>
                        <img src="../assets/promotion.jpg"/>
                    </div>
                </div>
                <hr class="custom-hr"/>
                <div class="col-lg-6">
                    <button v-on:click="backtoClassList()"
                            class="btn btn-secondary close-modal-btn float-left" v-if="showbackBtn === true">Back
                    </button>
                </div>
                <div class="col-lg-6">
                    <button v-on:click="saveClass()"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch"
                            :disabled="currentClassTypeList < 1">Create
                    </button>
                </div>
            </div>
        </b-modal>
        <v-tour name="classManagementPageVueTourName" :steps="classManagementPageVueTour"
                :options="classManagementPageVueTourOptions" :callbacks="classManagementPageVueTourCallBacks">
            <template slot-scope="tour">
                <transition name="fade">
                    <v-step
                            v-if="tour.currentStep === index"
                            v-for="(step, index) of tour.steps"
                            :key="index"
                            :step="step"
                            :previous-step="tour.previousStep"
                            :next-step="tour.nextStep"
                            :stop="tour.stop"
                            :is-first="tour.isFirst"
                            :is-last="tour.isLast"
                            :labels="tour.labels"
                    >
                        <template v-if="tour.currentStep === 0">
                            <div slot="actions">
                                <button class="v-step__button" @click="tourStop()">Finish</button>
                                <button class="v-step__button" @click="tour.nextStep">Next</button>
                            </div>
                        </template>
                        <template v-if="tour.currentStep !== 0 && tour.currentStep !== 7">
                            <div slot="actions">
                                <button class="v-step__button" @click="tourStop()">Skip tour</button>
                                <button class="v-step__button" @click="tour.previousStep">Previous</button>
                                <button class="v-step__button" @click="tour.nextStep">Next</button>
                            </div>
                        </template>
                        <template v-if="tour.currentStep === 7">
                            <div slot="actions">
                                <button class="v-step__button" @click="tourStop()">Finish</button>
                                <button class="v-step__button" @click="tour.previousStep">Previous</button>
                            </div>
                        </template>
                    </v-step>
                </transition>
            </template>
        </v-tour>
        <div style="display:none;">
            <el-button type="primary" class="btn btn-primary waves-effect waves-light m-r-10 float-left"
                       @click="classManagementPageVueTourStart()">
                Guided Tour
            </el-button>
        </div>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";

    export default {
        name: "ClassManagement",
        async created() {
            //await this.getClass();
            await this.getParentClassList();
            await this.getLevel();
            await this.getAcademicYear();
            await this.getClassType();
            await this.getClassTeacher();
        },
        async mounted() {
            window.addEventListener('load', () => {
                if (this.$route.query.clsName !== undefined) {
                    this.ClassFilters[0].value = this.$route.query.clsName;
                }

                if (this.$route.query.tour === 'YES') {
                    this.classManagementPageVueTourStart();
                }
            });
        },
        data() {
            return {
                currentClassProgs: [],
                assignClassModal: false,
                newClassShowModal: false,
                editClassShowModal: false,
                newProgrammeShowModal: false,
                ClassListModal: false,
                ViewClassModal: false,
                showbackBtn: false,
                ddlClassLevel: '',
                ddlSemester: '',
                inputClassName: '',
                ddlClassType: '',
                ddlClassTeacher: '',
                inputMaxStudents: '',
                ddlEditClassStatus: '',
                inputEditClassName: '',
                inputEditMaxStudents: '',
                inputeditLevel: '',
                assignClassLevelID: '',
                assignClassID: '',
                classListSemesterID: '',
                classListCourseID: '',
                classListClassName: '',
                classListLevelName: '',
                classListMaxStudents: '',
                programmeLevelID: '',
                programmeSemID: '',
                programmeClassName: '',
                programmeMaxStudent: '',
                programmeClassTeacher: '',
                programmeSaveType: '',
                editSemesterID: '',
                editCourseID: '',
                editClassName: '',
                assignStudentsListSearchFilter: '',
                totalNumberOfStudentAssignedToClass: '',
                assignClassSemID: '',
                classListClassTeacher: '',
                editClassClassTeacher: '',
                ddlEditClassTeacher: '',

                levelList: [],
                semesterList: [],
                classTypeList: [],
                currentClassTypeList: [],
                classTeacherList: [],
                classListInt: [],
                classListFilteritem: [],
                editClassStatusList: ['Active', 'Closed'],
                assignStudentsListInt: [],


                classList: [{
                    prop: "CLS_ClassName",
                    label: "Class Name"
                }, {
                    prop: "CLS_Batch",
                    label: "Programme"
                    // }, {
                    //     prop: "CLS_Class_Max_Students",
                    //     label: "Max Students"
                }, {
                    prop: "CRS_Course_Name",
                    label: "Level"
                    // }, {
                    //     prop: "PK_Class_ID",
                    //     label: "class id"
                }],
                classListAction: {
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
                            this.removeClassProgramme(row.PK_Class_ID);
                        },
                        label: ''
                    }]
                },


                multipleSelection: [],
                assignStudentsListCurrentPage: 1,
                assignStudentsListPageSize: 20,
                assignStudentsListTotal: 0,
                assignStudentsList: [{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Middle_name",
                    label: "Middle Name"
                }, {
                    prop: "Last_name",
                    label: "Last Name"
                },
                    //     {
                    //     prop: "assignToCurrentClass",
                    //     label: "Assigned Current Class"
                    // }
                ],
                ClassFilters: [
                    {
                        value: '',
                        prop: 'CLS_ClassName',
                    },
                    {
                        value: [],
                        prop: 'CRS_Course_Name'
                    }],
                // filters: [{
                //     value: '',
                //     prop: 'Full_Name',
                // }],


                currentStudent: [],
                currentStudentList: [{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Middle_name",
                    label: "Middle Name"
                }, {
                    prop: "Last_name",
                    label: "Last Name"
                }],
                tempRow: "",


                parentClassListInt: [],
                parentClassList: [{
                    prop: "CLS_ClassName",
                    label: "Class Name"
                }, {
                    prop: "Average_MaxStudents",
                    label: "Max Students"
                }, {
                    prop: "CRS_Course_Name",
                    label: "Level"
                }, {
                    prop: "SMT_Year",
                    label: "Year"
                }],
                parentClassListAction: {
                    label: 'Edit',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.classListSemesterID = row.CLS_FK_Semester_ID;
                            this.classListCourseID = row.CLS_FK_Course_ID;
                            this.classListClassName = row.CLS_ClassName;
                            this.classListLevelName = row.CRS_Course_Name;
                            this.classListMaxStudents = row.Average_MaxStudents;
                            this.classListClassTeacher = row.TeacherInCharge;
                            this.getClass();
                            this.$refs.classListShowModal.show();
                            this.showbackBtn = true;
                        },
                        label: 'Edit'
                    }]
                },

                //vue tour
                classManagementPageVueTourOptions: {
                    useKeyboardNavigation: false,
                    labels: {
                        buttonSkip: 'Skip tour',
                        buttonPrevious: 'Previous',
                        buttonNext: 'Next',
                        buttonStop: 'Finish'
                    }
                },
                classManagementPageVueTourCallBacks: {
                    onPreviousStep: this.classManagementPageVueTourCallBacksPreviousSteps,
                    onNextStep: this.classManagementPageVueTourCallBacksNextSteps
                },
                classManagementPageVueTour: [
                    //new class
                    {
                        target: '#btnAddNewClass',
                        content: `<div>Step 1 / 8 <br> Create new class</div>`,
                        params: {
                            placement: 'bottom',
                        }
                    },
                    {
                        target: '#btnAddNewClass',
                        content: `<div>Step 2 / 8 <br> Create new class <br> Select & fill in all the fields, click Next button <br> Select Programme, click Create button</div>`,
                        params: {
                            placement: 'bottom',
                        }
                    },
                    //edit class
                    {
                        target: '#inputSearchClassName',
                        content: `<div>Step 3 / 8 <br> Edit class <br> Fill in to search class name</div>`,
                        params: {
                            placement: 'bottom',
                        }
                    },
                    {
                        target: '#btnFilterByLevel',
                        content: `<div>Step 4 / 8 <br> Edit class <br> Click and select to filter class by level</div>`,
                        params: {
                            placement: 'bottom',
                        }
                    },
                    {
                        target: '#parentClassList',
                        content: `<div>Step 5 / 8 <br> Edit class <br> Click Edit button to edit</div>`,
                        params: {
                            placement: 'top',
                        }
                    },
                    {
                        target: '#parentClassList',
                        content: `<div>Step 6 / 8 <br> Edit class <br> Click Edit Class button to edit class information <br> Click Create New Programme button to create new programme for the class</div>`,
                        params: {
                            placement: 'top',
                        }
                    },
                    {
                        target: '#parentClassList',
                        content: `<div>Step 7 / 8 <br> Edit class <br> Inside programme list, click Assign button to assign student belong to the level into the class programme < br> click View button to view student that assigned to the class programme</div>`,
                        params: {
                            placement: 'top',
                        }
                    },
                    //mass promotion
                    {
                        target: '#btnMassPromotion',
                        content: `<div>Step 8 / 8 <br> Mass promotion <br> Redirect to the promotion page</div>`,
                        params: {
                            placement: 'top',
                        }
                    },
                ],
                //vue tour
            };
        },
        methods: {
            getRowKey(row) {
                return row.Student_ID;
            },
            changeSelection(val) {
                this.multipleSelection = val;
            },
            backtoClassList() {
                this.$refs.classListShowModal.show();
            },
            async getParentClassList() {
                try {
                    const response = await DataSource.shared.getParentClassList('', 'GET CLASS LIST GROUP BY LEVEL, SEMESTER, SCHOOL AND CLASS NAME');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            console.log('Error! getParentClassList');
                        } else {
                            this.parentClassListInt = response.Table;
                            this.parentClassListInt.forEach(object => {
                                const foundLevel = this.classListFilteritem.find(d => d === object.CRS_Course_Name);
                                if (!foundLevel) {
                                    this.classListFilteritem.push(object.CRS_Course_Name);
                                }
                            });
                        }
                    }

                } catch (e) {
                    this.results = e;
                }
            },
            async getClass() {
                try {
                    const response = await DataSource.shared.getClass('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.classListInt = response.Table;
                            // this.classListInt.forEach(object => {
                            //     const found = this.classListFilteritem.find(d => d === object.CLS_Batch);
                            //     if (!found) {
                            //         this.classListFilteritem.push(object.CLS_Batch);
                            //     }
                            //     const foundLevel = this.classListFilteritem.find(d => d === object.CRS_Course_Name);
                            //     if (!foundLevel) {
                            //         this.classListFilteritem.push(object.CRS_Course_Name);
                            //     }
                            // });


                            let classListList = response.Table;
                            this.classListInt = classListList.filter(d => {
                                return d.CLS_FK_Semester_ID === this.classListSemesterID && d.CLS_FK_Course_ID === this.classListCourseID && d.CLS_ClassName === this.classListClassName;
                            });


                            this.currentClassProgs = this.classListInt.map(d => d.CLS_Batch);

                        }
                    }

                    const totalStudentsInClassResponse = await DataSource.shared.getClassStudentList(this.classListSemesterID, this.classListCourseID, this.classListClassName);
                    if (totalStudentsInClassResponse) {
                        if (totalStudentsInClassResponse.code === '88') {
                            window.location.replace('/');
                        } else if (totalStudentsInClassResponse.code === '99') {
                            console.log('Error! in getClassStudentList');
                        } else if (totalStudentsInClassResponse.code === '2') {
                            console.log('No student in this class');
                        } else {
                            this.totalNumberOfStudentAssignedToClass = totalStudentsInClassResponse.Table.length;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getLevel() {
                try {
                    const response = await DataSource.shared.getLevel('');
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
            async getAcademicYear() {
                try {
                    const response = await DataSource.shared.getAcademicYear('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.semesterList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getClassType() {
                try {
                    const response = await DataSource.shared.getClassType('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.classTypeList = response.Table;
                            //
                            // this.classTypeList = this.classTypeList.filter(d => d.ID !== fileId);
                            //
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getClassTeacher() {
                try {
                    const response = await DataSource.shared.getTeacherListBySchool();
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.classTeacherList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            onlyNumber($event) {
                //console.log($event.keyCode); //keyCodes value
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                //if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                if (keyCode < 48 || keyCode > 57) { // 46 is dot
                    $event.preventDefault();
                }
            },
            async saveClass() {
                try {
                    if (this.programmeLevelID === '' || this.programmeSemID === '' || this.ddlClassType === '' || this.programmeClassName === '' || this.programmeMaxStudent === '' || this.programmeClassTeacher === '' || this.programmeSaveType === '') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all information'
                        });
                    } else {
                        const response = await DataSource.shared.saveClass(this.programmeLevelID, this.programmeSemID, this.ddlClassType, this.programmeClassName, this.programmeMaxStudent, this.programmeClassTeacher, this.programmeSaveType);
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Save Class Error!'
                                });
                            } else if (response.code === '2') {
                                this.$notify.error({
                                    title: 'Duplicated',
                                    message: 'Duplicated Class with programme!'
                                });
                            } else {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Successfully Saved!',
                                    type: 'success'
                                });
                                window.location.replace('/ClassManagement');
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async updateClass() {
                try {
                    if (this.editSemesterID === '' || this.editCourseID === '' || this.editClassName === '') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please close and open again'
                        });
                    } else if (this.inputEditClassName === '' || this.ddlEditClassStatus === '' || this.inputEditMaxStudents === '') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all information'
                        });
                    } else {
                        const response = await DataSource.shared.updateClass(this.ddlEditClassStatus, this.inputEditClassName, this.inputEditMaxStudents, this.editClassName, this.editCourseID, this.editSemesterID, this.ddlEditClassTeacher);
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Edit Class Error!'
                                });
                            } else {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Successfully Edited!',
                                    type: 'success'
                                });
                                this.getParentClassList();
                                this.closeAssignModal();
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            directToPromotion() {
                window.location.replace('/Promotion');
            },
            directToTransferIn() {
                window.location.replace('/TransferIn');
            },
            directToStudentGraduation() {
                window.location.replace('/StudentGraduation');
            },
            assignStudentToClass(row) {
                return [{
                    name: 'Assign',
                    handler: _ => {
                        this.assignClassLevelID = row.PK_Course_ID;
                        this.assignClassID = row.PK_Class_ID;
                        this.assignClassSemID = row.CLS_FK_Semester_ID;
                        this.getAssignStudents();
                        // this.$refs.assignClassShowModal.show();
                        this.assignClassModal = true;
                        this.tempRow = row;
                    }
                }];
            },
            closeAssignModal() {
                this.assignClassModal = false;
                this.newClassShowModal = false;
                this.editClassShowModal = false;
                this.newProgrammeShowModal = false;
                this.ClassListModal = false;
                this.ViewClassModal = false;
            },
            ViewStudentToClass(row) {
                return [{
                    name: 'View',
                    handler: _ => {
                        this.assignClassLevelID = row.PK_Course_ID;
                        this.assignClassID = row.PK_Class_ID;
                        this.assignClassSemID = row.CLS_FK_Semester_ID;
                        this.getAssignStudents();
                        this.$refs.ViewClassModal.show();

                    }
                }];
            },
            ViewStudentToClassInner() {
                const row = this.tempRow;
                this.assignClassLevelID = row.PK_Course_ID;
                this.assignClassID = row.PK_Class_ID;
                this.getAssignStudents();
                this.$refs.ViewClassModal.show();
            },
            returnAssignStudents() {
                this.$refs.assignClassShowModal.show();
            },
            async getAssignStudents() {
                try {
                    if (this.multipleSelection.length > 0) {
                        this.$refs.articleTable.clearSelection();
                    }

                    this.$vs.loading();
                    const response = await DataSource.shared.getActiveStudentsByLevelSchool(this.assignClassLevelID, this.assignClassID, this.assignClassSemID);
                    if (response) {
                        this.$vs.loading.close();
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            // response.Table.forEach(d => {
                            let assignStudentList = response.Table;

                            this.assignStudentsListInt = assignStudentList.filter(d => {
                                return d.assignToCurrentClass !== "YES";
                            });
                            this.currentStudent = assignStudentList.filter(d => {
                                return d.assignToCurrentClass === "YES";
                            });
                            this.assignStudentsListTotal = this.assignStudentsListInt.length;
                            this.assignStudentsListCurrentPage = 1;
                            this.assignStudentsListPageSize = 20;

                            //console.log("assignStudentsListInt", this.assignStudentsListInt);

                            // if (x.assignToCurrentClass !== "YES") {
                            //     this.assignStudentsListInt.push(x);
                            // }else{
                            //     this.currentStudent.push(x);
                            //     console.log(this.currentStudent,"111")
                            // }
                            // });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async assignClass() {
                let classAssignList = [];

                this.multipleSelection.forEach(item => {
                    let classAssignDetials = {
                        studentID: item.Student_ID,
                        classHistoryID: item.PK_Student_Course_ID
                    };

                    classAssignList.push(classAssignDetials);
                });

                const response = await DataSource.shared.massSetClass(this.assignClassID, JSON.stringify(classAssignList));
                if (response) {
                    if (response.code === '1') {
                        this.$notify({
                            title: 'Success',
                            message: 'Successfully saved',
                            type: 'success'
                        });
                        this.closeAssignModal();
                        this.getAssignStudents();
                        // window.location.replace('/ClassManagement');
                    } else if (response.code === '2') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'The class have been exceeded max number of student!'
                        });
                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Error! Please try again later'
                        });
                        window.location.replace('/ClassManagement');
                    }
                }
            },
            createNewProgrmamme(value) {
                if (value === 'New') {
                    if (this.ddlClassLevel === '' || this.ddlSemester === '' || this.inputClassName === '' || this.inputMaxStudents === '' || this.ddlClassTeacher === '') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all information'
                        });
                    } else {
                        this.programmeLevelID = this.ddlClassLevel;
                        this.programmeSemID = this.ddlSemester;
                        this.programmeClassName = this.inputClassName;
                        this.programmeMaxStudent = this.inputMaxStudents;
                        this.programmeClassTeacher = this.ddlClassTeacher;
                        this.programmeSaveType = 'NEW CLASS';

                        this.newProgrammeShowModal = true;

                        this.currentClassTypeList = this.classTypeList;
                    }
                } else if (value === 'Edit') {
                    this.programmeLevelID = this.classListInt[0].CLS_FK_Course_ID;
                    this.programmeSemID = this.classListInt[0].CLS_FK_Semester_ID;
                    this.programmeClassName = this.classListInt[0].CLS_ClassName;
                    this.programmeMaxStudent = this.classListInt[0].CLS_Class_Max_Students;
                    this.programmeClassTeacher = this.classListInt[0].CLS_Class_Incharge_Staff;
                    this.programmeSaveType = 'NEW BATCH ONLY';

                    this.newProgrammeShowModal = true;


                    this.currentClassTypeList = this.classTypeList.filter(d => {
                        const found = this.currentClassProgs.find(c => {
                            return d.CTY_ClassType === c;
                        });
                        if (!found) {
                            return d;
                        }
                    });

                }
            },
            editClass() {
                this.editSemesterID = this.classListSemesterID;
                this.editCourseID = this.classListCourseID;
                this.editClassName = this.classListClassName;
                this.editClassClassTeacher = this.classListClassTeacher;
                this.inputEditClassName = this.classListClassName;
                this.ddlEditClassStatus = 'Active';
                this.inputEditMaxStudents = this.classListMaxStudents;
                this.inputeditLevel = this.classListLevelName;
                this.ddlEditClassTeacher = this.classListClassTeacher;
                this.$refs.editClassShowModal.show();
            },
            assignStudentsListChangePage(currentPage) {
                this.assignStudentsListCurrentPage = currentPage;
            },
            assignStudentsListChangePageSize(currentPageSize) {
                this.assignStudentsListPageSize = currentPageSize;
            },
            removeClassProgramme(classID) {
                try {
                    const response = DataSource.shared.updateClassProgramme(classID, 'CLOSED');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Remove Class Programme Error!'
                            });
                        } else {
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully Removed Programme!',
                                type: 'success'
                            });
                            //this.closeAssignModal();
                            window.location.replace('/ClassManagement');
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            classManagementPageVueTourStart() {
                this.$tours['classManagementPageVueTourName'].start();
            },
            classManagementPageVueTourCallBacksPreviousSteps(currentStep) {
                let finalSteps = currentStep - 1;

                this.tourCallBackStepsFunc(finalSteps);
            },
            classManagementPageVueTourCallBacksNextSteps(currentStep) {
                let finalSteps = currentStep + 1;

                this.tourCallBackStepsFunc(finalSteps);
            },
            tourCallBackStepsFunc(finalSteps) {
                // if (finalSteps === 2) {
                //     this.studentListAreaBorder = true;
                // } else if (finalSteps === 3) {
                //     this.btnPromoteVueSample = true;
                // }
            },
            tourStop() {
                this.$tours['classManagementPageVueTourName'].stop();
            },
        },
    };
</script>
<style scoped>
    .actionDiv {
        text-align: right;
    }

    .actionDiv .btn-primary {
        display: inline;
        margin-left: 10px;
    }

    .totalNumberOfStudentAssignedToClass {
        margin: 10px 0 0 0;
    }

    .totalNumberOfStudentAssignedToClass label {
        display: inline-block !important;
        background: linear-gradient(#1D976C, #93F9B9);
        padding: 10px;
        border-radius: 10px;
    }

    .totalNumberOfStudentAssignedToClass label:hover {
        opacity: 0.8;
    }
</style>