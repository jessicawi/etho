<template>
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="system-msg">
                    <p v-if="str_Result" style="color: red">{{str_Result}}</p></div>
            </div>
            <div class="row gallery-action">
                <div class="col-md-4 ">
                    <button @click="showCreateModal" class="gallery-createFolder btn btn-secondary"
                            title="Create new folder"><i
                            class="fa fa-folder-open-o"></i>
                        <span class="ml-2">Create new folder</span>
                    </button>
                    <button class="upload-item btn btn-secondary" title="Upload">
                        <i class="fa fa-upload"></i>
                        <span class="ml-2">Upload</span>
                    </button>
                </div>
                <div class="col-md-8">
                    <el-button-group>
                        <el-button id="btn_SelectAll" type="primary" icon="el-icon-arrow-left"
                                   :class="{'d-none':selectall===true}">Select All
                        </el-button>
                        <el-button id="btn_UnselectAll" type="primary"
                                   :class="{'d-none':arrobj_SelectedItem.length === 0}">Unselect
                            All<i class="el-icon-arrow-right el-icon-right"></i></el-button>
                    </el-button-group>
                    <el-button-group class="gallery-action__item">
                        <el-button type="primary" icon="el-icon-download" class="download-item"
                                   v-if="arrobj_SelectedItem.length > 0">Download
                        </el-button>
                        <el-button type="primary" icon="el-icon-view" v-if="arrobj_SelectedItem.length > 0"
                                   @click="showViewModal">View
                        </el-button>
                        <el-button type="primary" icon="el-icon-rank" @click="showMoveModal"
                                   v-if="arrobj_SelectedItem.length > 0">Move
                        </el-button>
                        <el-button type="primary" icon="el-icon-picture" @click="showPortfolioModal"
                                   v-if="arrobj_SelectedItem.length > 0">Post as portfolio
                        </el-button>
                        <el-button type="primary" icon="el-icon-edit" @click="showUpdateModal"
                                   v-if="arrobj_SelectedItem.length > 0">Post as Updates
                        </el-button>
                        <el-button type="primary" icon="el-icon-delete" @click="showRemoveModal"
                                   v-if="obj_ContextTarget != null || arrobj_SelectedItem.length > 0">Remove
                        </el-button>
                    </el-button-group>
                </div>
            </div>
            <div class="row gallery-folder__top mt-4 ">
                <div class="col-md-9 text-left">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <i class="fa fa-home" aria-hidden="true"></i>
                        <el-breadcrumb-item v-for="(obj_Folder,i) of arrobj_FolderPath"
                                            :key="obj_Folder.GalID"><span @click="backSpecificDirectory(obj_Folder,i)">{{obj_Folder.GalFolder}}</span>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="col-md-3">
                    <el-button type="primary" size="mini" icon="el-icon-download" class="float-right" id="btn_Previous">
                        Back
                    </el-button>
                    <!--<h5>-->
                    <!--<i class="fa fa-folder" aria-hidden="true"></i>-->
                    <!--{{obj_Folder.GalFolder}} >-->
                    <!--</h5>-->
                </div>
            </div>
            <div class="row ">
                <div class="col-md-3  div_ItemContainer gallery-folder__bottom">
                    <div class="">
                        <div class="" v-for="obj_Folder of arrobj_Folders" :key="obj_Folder.GalID"
                             :data-type="obj_Folder.GalType">
                            <button class="btn btn-light" :id="obj_Folder.GalID" @click="changeDirectory(obj_Folder)">
                                <i class="material-icons">
                                    perm_media
                                </i>
                                {{obj_Folder.GalFolder}}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-9 bg-white div_ItemContainer">
                    <div class=" gallery-album">
                        <div class="" v-for="obj_File of arrobj_Files" :key="obj_File.GalID">
                            <label :for="obj_File.GalID" class="gallery-album__image">
                                <img v-if="isImage(obj_File)" :src="getLowSource(obj_File)" :alt="obj_File.GalFileName"
                                     draggable="false"/>
                            </label>
                            <input class="limited" type="checkbox" :id="obj_File.GalID" :value="obj_File"
                                   v-model="arrobj_SelectedItem"
                                   :disabled="isNull(arrobj_SelectedItem.find(x=>x.GalID === obj_File.GalID)) && arrobj_SelectedItem.length >= int_SelectLimit"/>
                            <label :for="obj_File.GalID"></label>
                            <!--<div v-if="isImage(obj_File)" :data-type="obj_File.GalType">
                                <label :for="obj_File.GalID">
                                    <img :src="getLowSource(obj_File)" :alt="obj_File.GalFileName" draggable="false"/>
                                </label>
                                <input type="checkbox" :id="obj_File.GalID" :value="obj_File"
                                       v-model="arrobj_SelectedItem"/>
                            </div>
                            <div v-else :data-type="obj_File.GalType">
                                <label :for="obj_File.GalID">
                                    <i class="fa fa-file-text-o" aria-hidden="true"></i>
                                </label>
                                <input type="checkbox" :id="obj_File.GalID" :value="obj_File"
                                       v-model="arrobj_SelectedItem"/>
                            </div>-->
                        </div>
                    </div>
                </div>
            </div>
            <input type="file" id="fileUpload" multiple/>
            <div id="div_ContextMenu" class="border border-secondary bg-white rounded-right rounded-bottom text-left">
                <ul id="ul_ContextMenuOptions">
                    <li class="li_MenuOption" @click="showCreateModal"><i class="fa fa-folder-open-o"></i><span
                            class="menu-text">Create New folder</span></li>
                    <li class="li_MenuOption" @click="showRenameModal" v-if="obj_ContextTarget != null"><i
                            class="fa fa-pencil-square-o"></i><span
                            class="menu-text">Rename folder</span></li>
                    <li class="li_MenuOption download-item" v-if="arrobj_SelectedItem.length > 0">
                        <i class="fa fa-download"></i>
                        <span class="menu-text">Download</span>
                    </li>
                    <li class="li_MenuOption upload-item">
                        <i class="fa fa-upload"></i>
                        <span class="menu-text">Upload</span>
                    </li>
                    <li class="li_MenuOption" @click="showViewModal" v-if="arrobj_SelectedItem.length > 0">
                        <i
                                class="fa fa-eye"></i><span
                            class="menu-text">View</span></li>
                    <li class="li_MenuOption" @click="showMoveModal" v-if="arrobj_SelectedItem.length > 0"><i
                            class="fa fa-arrows"></i><span
                            class="menu-text">Move</span>
                    </li>
                    <li class="li_MenuOption" @click="showRemoveModal"
                        v-if="obj_ContextTarget != null || arrobj_SelectedItem.length > 0"><i
                            class="fa fa-trash-o"></i><span
                            class="menu-text">Remove</span></li>
                    <li class="li_MenuOption" @click="showPortfolioModal" v-if="arrobj_SelectedItem.length > 0">
                        <i class="fa fa-eye"></i>
                        <span class="menu-text">Portfolio</span>
                    </li>
                    <li class="li_MenuOption" @click="showUpdateModal" v-if="arrobj_SelectedItem.length > 0">
                        <i class="fa fa-eye"></i>
                        <span class="menu-text">Updates</span>
                    </li>
                </ul>
            </div>
        </div>
        <b-modal id="modal_ViewItem" title="View" ref="modal_ViewItem" centered ok-only ok-title="Close">
            <b-carousel id="carousel1"
                        style="text-shadow: 1px 1px 2px #333;"
                        controls
                        indicators
                        background="#ababab"
                        :interval="4000"
                        v-model="slide"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd"
            >
                <b-carousel-slide v-for="obj_Item of filteredSelectedItem" :key="obj_Item.FileID">
                    <img slot="img" class="d-block img-fluid w-100" :src="getMidSource(obj_Item)"
                         :alt="obj_Item.GalFileName"/>
                    <span>{{obj_Item.GalFileName}}</span>
                </b-carousel-slide>
            </b-carousel>
        </b-modal>
        <b-modal id="modal_NewFolder" title="New Folder" ref="modal_NewFolder" centered ok-title="Create"
                 @ok="createFolder" @keyup.enter.native="createFolder">
            <div class="form-group">
                <input type="text" maxlength="10" ref="tb_FolderName" class="form-control" id="tb_FolderName"
                       v-model="str_NewFolderName"
                       placeholder="Folder Name" autocomplete="off" autofocus/>
            </div>
        </b-modal>
        <b-modal id="modal_RenameFolder" title="Rename Folder" ref="modal_RenameFolder" centered ok-title="Rename"
                 @ok="renameFolder" @keyup.enter.native="renameFolder">
            <div class="form-group">
                <input type="text" maxlength="10" ref="tb_RenameFolder" class="form-control" id="tb_RenameFolder"
                       v-model="str_NewFolderName"
                       placeholder="New Folder Name" autocomplete="off" autofocus/>
            </div>
        </b-modal>
        <b-modal id="modal_RemoveItem" title="Remove Item" ref="modal_RemoveItem" centered ok-title="Confirm"
                 @ok="removeItems">
            <div class="form-group">
                <div v-if="obj_ContextTarget != null && arrobj_SelectedItem.length > 0">
                    Are you sure you want to delete the folder and the selected image(s)?
                </div>
                <div v-else-if="obj_ContextTarget == null && arrobj_SelectedItem.length > 0">
                    Are you sure you want to delete the selected image(s)?
                </div>
                <div v-else-if="obj_ContextTarget != null && arrobj_SelectedItem.length === 0">
                    Are you sure you want to remove the folder?
                </div>
            </div>
        </b-modal>
        <b-modal id="modal_MoveItem" title="Move item(s) to?" ref="modal_MoveItem" centered @ok="MoveItems">

            <div class="row modal_MoveItem-buttonGroup">
                <div class="col-lg-4">

                    <el-button type="primary" id="btn_MoveModalPrevious" @click="MoveModalGoBack">
                        <i class="el-icon-house"></i>
                        Go Back
                    </el-button>

                    <div v-for="obj_MoveModalFolder of arrobj_MoveModalFolders"
                                     :key="obj_MoveModalFolder.GalID"
                                     :data-type="obj_MoveModalFolder.GalType">
                        <el-button type="primary" @click="MoveModalChangeDirectory(obj_MoveModalFolder)">
                            <i class="el-icon-folder"></i>
                            {{obj_MoveModalFolder.GalFolder}}
                            <i class="el-icon-arrow-right   "></i>
                        </el-button>
                    </div>
                </div>
                <div class="col-lg-8">

                    <div class="modal_MoveItem-slider">
                        <b-carousel id="carousel2"
                                    style="text-shadow: 1px 1px 2px #333;"
                                    controls
                                    indicators
                                    background="#ababab"
                                    :interval="0"
                        >
                            <b-carousel-slide v-for="obj_Item of arrobj_SelectedItem" :key="obj_Item.FileID">
                                <img slot="img" :src="getLowSource(obj_Item)"
                                     :alt="obj_Item.GalFileName"/>
                            </b-carousel-slide>
                        </b-carousel>
                    </div>
                </div>
            </div>
        </b-modal>
        <b-modal id="modal_PostComponents" hide-footer size="lg" @hidden="hideComponentModal"
                 :title="str_PostComponentTitle" ref="modal_PostComponent">
            <component @result="displayResult" :is="obj_SelectedComponent" :images="arrobj_SelectedItem"></component>
        </b-modal>
        <div id="div_DropZone" class="hideDropZone">
            <h1>Drop file(s) here to upload</h1>
        </div>
    </div>
</template>
<script>
    "use strict";
    import DataSource from "../data/datasource";
    import $ from 'jquery';
    import portfolio from "../components/Post_Portfolio_Component";
    import updates from "../components/Post_Updates_Component.vue";

    export default {
        name: "Gallery",
        data() {
            return {
                arrobj_Folders: [],
                arrobj_Files: [],
                arrobj_FolderPath: [{GalFolder: "Gallery", GalID: "PRIMARY", GalType: "Folder"}],
                arrobj_SelectedItem: [],
                arrobj_MoveModalFolders: [],
                arrobj_MoveModalFolderPath: [],
                arrstr_Whitelist: [],
                int_StartRowNo: 1,
                int_EndRowNo: 10,
                obj_ContextTarget: {},
                obj_SelectedComponent: "",
                obj_ComponentProperties: {},
                slide: 0,
                sliding: null,
                str_NewFolderName: "",
                str_PostComponentTitle: "",
                str_Result: "",
                systemmsgError: false,
                int_SelectLimit: 30,
                selectall: false,
            };
        },
        methods: {
            loadWhitelist() {
                DataSource.shared.getWhitelist().then((result) => {
                    this.arrstr_Whitelist = result.Table;
                });
            },
            isWhitelist(file) {
                let temparrstr = file.name.split(".");
                let str_Ext = ("." + temparrstr[temparrstr.length - 1]).toUpperCase();
                let isWhitelisted = this.arrstr_Whitelist.findIndex(x => x.type.toUpperCase() === str_Ext) !== -1;
                let isValidFile = file.size > 0;

                return (isWhitelisted && isValidFile);
            },
            initFolder(obj_Folder) {
                this.arrobj_Files = [];
                this.arrobj_Folders = [];
                this.arrobj_SelectedItem = [];
                this.int_StartRowNo = 1;
                this.int_EndRowNo = 10;

                this.getFolders(obj_Folder).then((result) => {
                    this.arrobj_Folders = result;
                });
                this.loadFiles(obj_Folder);
            },
            changeDirectory(obj_Folder) {
                this.arrobj_FolderPath.push(obj_Folder);

                this.initFolder(obj_Folder);
            },
            backSpecificDirectory(obj_Folder, i) {
                let checkPop = i + 1;
                let obj_PreviousFolder = this.arrobj_FolderPath[i];
                this.initFolder(obj_PreviousFolder);
                if (this.arrobj_FolderPath.length !== checkPop) {
                    this.arrobj_FolderPath.pop();
                }
            },
            getFolders(obj_Folder) {
                this.showLoading();
                return new Promise((resolve, reject) => {
                    DataSource.shared.getFolders(obj_Folder.GalID).then((result) => {
                        let temp = [];
                        if (result.code != 2 && result.code != 99)
                            temp = result.Table;

                        resolve(temp);
                    });
                });
            },
            loadFiles(obj_Folder) {
                /*RECURSIVE FUNCTION ONLY ON FIRST ENTRY*/
                this.getFiles(obj_Folder).then((result) => {
                    this.arrobj_Files.push.apply(this.arrobj_Files, result);

                    if (!this.isScrollable() && result != null)
                        this.loadFiles(obj_Folder);
                }).then(() => {
                    this.hideLoading();
                });
            },
            getFiles(obj_Folder) {
                this.showLoading();
                return new Promise((resolve, reject) => {
                    DataSource.shared.getFiles(obj_Folder.GalID, this.int_StartRowNo, this.int_EndRowNo).then((result) => {
                        let arr_Result;

                        if (result.code != 2 && result.code != 99) {
                            arr_Result = result.Table;

                            this.int_StartRowNo = this.int_EndRowNo + 1;
                            this.int_EndRowNo = this.int_EndRowNo + 10;
                        }

                        resolve(arr_Result);
                    });
                });
            },
            goBack() {
                if (this.arrobj_FolderPath.length >= 1)
                    this.arrobj_FolderPath.pop();

                let obj_PreviousFolder = this.arrobj_FolderPath[this.arrobj_FolderPath.length - 1];

                this.initFolder(obj_PreviousFolder);
            },
            isImage(obj_File) {
                let ext = String(obj_File.GalFileExt).toUpperCase();
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
            getLowSource(file) {
                if (this.isImage(file))
                    return "data:" + file.GalFileType + ";base64," + file.GalFileLow;
                else
                    return "";
            },
            getMidSource(file) {
                if (this.isImage(file))
                    return "data:" + file.GalFileType + ";base64," + file.GalFileMedium;
                else
                    return "";
            },
            showPortfolioModal() {
                this.obj_SelectedComponent = portfolio;
                this.str_PostComponentTitle = "Portfolio";
                this.showComponentModal();
            },
            showUpdateModal() {
                this.obj_SelectedComponent = updates;
                this.str_PostComponentTitle = "Updates";
                this.showComponentModal();
            },
            displayResult(value) {
                switch (value) {
                    case "TRUE":
                        this.$notify({
                            title: 'Success',
                            message: 'Successfully posted!',
                            type: 'success'
                        });
                        // this.str_Result = "Successfully posted!";
                        break;
                    case "FALSE":
                        this.$notify.error({
                            title: 'Error',
                            message: 'Whoops. Something went wrong. Please check your fields and try again.'
                        });
                        // this.str_Result = "Whoops. Something went wrong. Please check your fields and try again.";
                        break;
                }

                this.hideComponentModal();
            },
            showComponentModal() {
                this.obj_ComponentProperties = {images: this.arrobj_SelectedItem};
                this.$refs.modal_PostComponent.show();
            },
            hideComponentModal() {
                this.obj_SelectedComponent = false;
                this.$refs.modal_PostComponent.hide();
            },
            isNull(obj) {
                return (obj === null || obj === undefined || obj === "undefined" || obj.length === 0 || obj === "");
            },

            /*#region Download Item Functions*/
            downloadItem() {
                let arr_Promises = [];
                this.showLoading();

                for (let obj_SelectedItem of this.arrobj_SelectedItem) {
                    let downloadPromise = new Promise((resolve, reject) => {
                        DataSource.shared.downloadFile(obj_SelectedItem.GalID).then((result) => {
                            let file = (result.Table)[0];
                            let a = document.createElement("a");
                            let contentType = this.getContentType(file);
                            let b64Data = file.GalFile;
                            let blob = this.b64toBlob(b64Data, contentType);

                            a.href = URL.createObjectURL(blob);
                            a.download = (file.GalFileName + file.GalFileExt).toString();
                            a.style.display = "none";
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            resolve(result);
                        });
                    });

                    arr_Promises.push(downloadPromise);
                }

                Promise.all(arr_Promises).then((result) => {
                    this.hideLoading();
                });
            }
            ,
            getContentType(e) {
                let contentType = "";

                switch (e.GalFileExt.toUpperCase()) {
                    case ".PDF":
                        contentType += "application/octet-stream";
                        break;
                    default:
                        contentType += e.GalFileType;
                        break;
                }

                return contentType;
            }
            ,
            b64toBlob(b64Data, contentType, sliceSize) {
                //Credit to Jeremy Banks @ stackoverflow
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                let byteCharacters = atob(b64Data);
                let byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    let slice = byteCharacters.slice(offset, offset + sliceSize);

                    let byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    let byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                return new Blob(byteArrays, {type: contentType});
            }
            ,
            /*#endregion*/

            /*#region Create Folder Functions*/
            showCreateModal() {
                this.$refs.modal_NewFolder.show();
            }
            ,
            hideCreateModal() {

                this.$refs.modal_NewFolder.hide();
            }
            ,
            createFolder() {
                if (this.str_NewFolderName == null)
                    return;

                let obj_CurrentFolder = this.arrobj_FolderPath[this.arrobj_FolderPath.length - 1],
                    str_NewFolderName = this.str_NewFolderName;

                this.showLoading();
                DataSource.shared.createFolder(obj_CurrentFolder.GalID, str_NewFolderName).then((result) => {
                    this.initFolder(obj_CurrentFolder);
                    this.str_NewFolderName = "";
                    this.hideLoading();
                    this.hideCreateModal();
                });
            }
            ,
            /*#endregion*/

            /*#region Rename Item Functions*/
            showRenameModal() {
                this.$refs.modal_RenameFolder.show();
            }
            ,
            hideRenameModal() {
                this.$refs.modal_RenameFolder.hide();
            }
            ,
            renameFolder() {
                if (this.str_NewFolderName == null)
                    return;

                let obj_CurrentFolder = this.arrobj_FolderPath[this.arrobj_FolderPath.length - 1],
                    obj_TargetFolder = this.obj_ContextTarget,
                    str_NewFolderName = this.str_NewFolderName;

                DataSource.shared.renameFile(obj_TargetFolder.id, str_NewFolderName).then((result) => {
                    this.showLoading();
                }).then(() => {
                    this.initFolder(obj_CurrentFolder);
                    this.str_NewFolderName = "";
                    this.obj_ContextTarget = {};
                    this.hideLoading();
                });
            }
            ,
            /*#endregion*/

            /*#region Upload Item Functions*/
            /*#region Drop Zone Functions*/
            showDropZone() {
                $("#div_DropZone").css({
                    "visibility": "visible",
                    "opacity": "1"
                });
            }
            ,
            hideDropZone() {
                $("#div_DropZone").css({
                    "visibility": "hidden",
                    "opacity": 0
                });
            }
            ,
            /*#endregion*/

            uploadFiles(filesUploaded) {
                this.showLoading();
                let obj_CurrentFolder = this.arrobj_FolderPath[this.arrobj_FolderPath.length - 1];

                let arrobj_AcceptedFiles = [];

                for (let file of filesUploaded) {
                    if (this.isWhitelist(file))
                        arrobj_AcceptedFiles.push(file);
                }

                DataSource.shared.saveFile(arrobj_AcceptedFiles, obj_CurrentFolder.GalID).then((result) => {
                    this.hideLoading();
                    this.initFolder(obj_CurrentFolder);
                });
            }
            ,
            /*#endregion*/

            /*#region View Item Functions*/
            showViewModal() {
                this.$refs.modal_ViewItem.show();
            }
            ,
            hideViewModal() {
                this.$refs.modal_ViewItem.show();
            }
            ,
            /*#endregion*/

            /*#region Move Item Functions*/
            showMoveModal() {
                this.$refs.modal_MoveItem.show();
                this.arrobj_MoveModalFolderPath = [];
                this.arrobj_MoveModalFolderPath.push.apply(this.arrobj_MoveModalFolderPath, this.arrobj_FolderPath);
                let obj_CurrentFolder = this.arrobj_MoveModalFolderPath[this.arrobj_MoveModalFolderPath.length - 1];

                this.MoveModalInitFolder(obj_CurrentFolder);
            }
            ,
            hideMoveModal() {
                this.$refs.modal_MoveItem.hide();
            },
            MoveModalGoBack() {
                if (this.arrobj_MoveModalFolderPath.length >= 1)
                    this.arrobj_MoveModalFolderPath.pop();
                if (this.arrobj_MoveModalFolderPath.length > 0) {
                    let obj_PreviousFolder = this.arrobj_MoveModalFolderPath[this.arrobj_MoveModalFolderPath.length - 1];
                    this.MoveModalInitFolder(obj_PreviousFolder);
                }
            }
            ,
            MoveModalChangeDirectory(obj_Folder) {
                this.arrobj_MoveModalFolderPath.push(obj_Folder);
                this.MoveModalInitFolder(obj_Folder);
            },
            MoveModalInitFolder(obj_Folder) {
                this.arrobj_MoveModalFolders = [];

                this.getFolders(obj_Folder).then((result) => {
                    this.arrobj_MoveModalFolders = result;
                    this.hideLoading();
                });
            }
            ,

            MoveItems() {
                this.showLoading();

                let arr_Promises = [];
                let obj_TargetFolder = this.arrobj_MoveModalFolderPath[this.arrobj_MoveModalFolderPath.length - 1];

                for (let obj_ItemToMove of this.arrobj_SelectedItem)
                    arr_Promises.push(DataSource.shared.moveFile(obj_ItemToMove.GalID, obj_TargetFolder.GalID));

                Promise.all(arr_Promises).then(() => {
                    this.hideLoading();
                    this.initFolder(this.arrobj_FolderPath[this.arrobj_FolderPath.length - 1]);
                });
            }
            ,
            /*#endregion*/

            /*#region Remove Item Functions*/
            showRemoveModal() {
                this.$refs.modal_RemoveItem.show();
            }
            ,
            hideRemoveModal() {
                this.$refs.modal_RemoveItem.hide();
            }
            ,
            removeItems() {
                this.showLoading();

                let arrstr_IDToRemove = [];
                let arr_Promises = [];

                if (this.obj_ContextTarget != null)
                    arrstr_IDToRemove.push(this.obj_ContextTarget.id);

                for (let obj_SelectedItem of this.arrobj_SelectedItem)
                    arrstr_IDToRemove.push(obj_SelectedItem.GalID);

                for (let str_IDToRemove of arrstr_IDToRemove) {
                    arr_Promises.push(DataSource.shared.removeFile(str_IDToRemove));
                }

                Promise.all(arr_Promises).then(() => {
                    this.hideLoading();
                    this.initFolder(this.arrobj_FolderPath[this.arrobj_FolderPath.length - 1]);
                });

                /*if (i === itemsToRemove.length)
                    this.initFolder(this.filteredFolderPath[this.filteredFolderPath - 1]);*/
            }
            ,
            /*#endregion*/

            /*#region Custom Context Menu Functions*/
            showContextMenu(e) {
                e.preventDefault();
                this.obj_ContextTarget = null;
                let div_ContextMenu = $("#div_ContextMenu");

                div_ContextMenu.css("display", "block");

                console.log(e.clientY);
                console.log(e);
                console.log(e.screenY);
                console.log(div_ContextMenu.outerHeight());

                if ((e.clientX + div_ContextMenu.outerWidth()) >= $(document).innerWidth())
                    div_ContextMenu.css("left", (e.clientX - div_ContextMenu.outerWidth()) + "px");
                else
                    div_ContextMenu.css("left", e.clientX + "px");

                if ((e.screenY + div_ContextMenu.outerHeight()) >= $(document).innerHeight())
                    div_ContextMenu.css("top", (e.clientY - div_ContextMenu.outerHeight()) + "px");
                else if (e.screenY < div_ContextMenu.outerHeight())
                    div_ContextMenu.css("top", 0 + "px");
                else
                    div_ContextMenu.css("top", e.clientY + "px");

                if ($(e.target).closest("div").data("type") != null && $(e.target).closest("div").data("type").toUpperCase() === "FOLDER")
                    this.obj_ContextTarget = e.target.closest("button");
            }
            ,
            hideContextMenu() {
                $("#div_ContextMenu").css("display", "none");
            }
            ,
            /*#endregion*/

            /*#region Loader Functions*/
            showLoading() {
                this.$vs.loading();
            }
            ,
            hideLoading() {
                this.$vs.loading.close();
            }
            ,
            /*#endregion*/

            /*#region Carousel Slider*/
            onSlideStart(slide) {
                this.sliding = true;
            }
            ,
            onSlideEnd(slide) {
                this.sliding = false;
            }
            ,
            /*endregion*/

            /*#region Scroll Loader Functions*/
            getScrollPercent() {
                //Credits to Phil Ricketts @ stackoverflow
                let height = document.documentElement,
                    body = document.body,
                    scrollTop = 'scrollTop',
                    scrollHeight = 'scrollHeight';

                return (height[scrollTop] || body[scrollTop]) / ((height[scrollHeight] || body[scrollHeight]) - height.clientHeight) * 100;
            }
            ,

            isScrollable() {
                return $(document).height() > $(window).height();
            }
            ,

            debounce(func, wait, immediate) {
                // Returns a function, that, as long as it continues to be invoked, will not
                // be triggered. The function will be called after it stops being called for
                // N milliseconds. If `immediate` is passed, trigger the function on the
                // leading edge, instead of the trailing.
                let timeout, result;
                let self = this;

                let later = function (context, args) {
                    timeout = null;
                    if (args) result = func.apply(context, args);
                };

                let debounced = self.restArguments(function (args) {
                    if (timeout) clearTimeout(timeout);
                    if (immediate) {
                        let callNow = !timeout;
                        timeout = setTimeout(later, wait);
                        if (callNow) result = func.apply(this, args);
                    } else {
                        timeout = self.delay(later, wait, this, args);
                    }

                    return result;
                });

                debounced.cancel = function () {
                    clearTimeout(timeout);
                    timeout = null;
                };

                return debounced;
            }
            ,
            delay(func, wait, ...args) {
                // Lodash Delay
                /**
                 * Invokes `func` after `wait` milliseconds. Any additional arguments are
                 * provided to `func` when it's invoked.
                 *
                 * @since 0.1.0
                 * @category Function
                 * @param {Function} func The function to delay.
                 * @param {number} wait The number of milliseconds to delay invocation.
                 * @param {...*} [args] The arguments to invoke `func` with.
                 * @returns {number} Returns the timer id.
                 * @example
                 *
                 * delay(text => console.log(text), 1000, 'later')
                 * // => Logs 'later' after one second.
                 */
                if (typeof func != 'function') {
                    throw new TypeError('Expected a function');
                }
                return setTimeout(func, +wait || 0, ...args);
            }
            ,
            restArguments(func, startIndex) {
                // Some functions take a variable number of arguments, or a few expected
                // arguments at the beginning and then a variable number of values to operate
                // on. This helper accumulates all remaining arguments past the function?s
                // argument length (or an explicit `startIndex`), into an array that becomes
                // the last argument. Similar to ES6?s "rest parameter".
                startIndex = startIndex == null ? func.length - 1 : +startIndex;
                return function () {
                    let length = Math.max(arguments.length - startIndex, 0),
                        rest = Array(length),
                        index = 0;
                    for (; index < length; index++) {
                        rest[index] = arguments[index + startIndex];
                    }
                    switch (startIndex) {
                        case 0:
                            return func.call(this, rest);
                        case 1:
                            return func.call(this, arguments[0], rest);
                        case 2:
                            return func.call(this, arguments[0], arguments[1], rest);
                    }
                    let args = Array(startIndex + 1);
                    for (index = 0; index < startIndex; index++) {
                        args[index] = arguments[index];
                    }
                    args[startIndex] = rest;
                    return func.apply(this, args);
                };
            }
            ,
            /*#endregion*/

            /*#region Custom check functions*/
            isCheck(id) {
                if (this.isNull(id))
                    return;

                let checkbox = $("#" + id);
                if (checkbox.prop("checked")) {
                    checkbox.closest("div").addClass("check");
                    checkbox.closest("div").removeClass("uncheck");
                } else {
                    checkbox.closest("div").addClass("uncheck");
                    checkbox.closest("div").removeClass("check");
                }
            }
            ,
            /*#endregion*/
        },
        mounted() {
            const self = this;
            self.initFolder(this.arrobj_FolderPath[0]);
            self.loadWhitelist();

            /*#region Menu Functions*/
            $(document).on("click", ".create-item", () => {
                self.showCreateModal();
            });
            $(document).on("click", ".rename-item", () => {
                self.showRenameModal();
            });
            $(document).on("click", ".download-item", () => {
                self.downloadItem();
            });
            $(document).on("click", ".upload-item", () => {
                $("#fileUpload").click();
            });
            $(document).on("click", ".view-item", () => {
                self.showViewModal();
            });
            $(document).on("click", ".move-item", () => {
                self.showMoveModal();
            });
            $(document).on("click", ".remove-item", () => {
                self.showRemoveModal();
            });
            /*#endregion*/

            /*#region Custom Context Functions*/
            $(document).on("contextmenu", ".div_ItemContainer", (e) => {
                self.showContextMenu(e);
            });

            $(document).on("contextmenu", "#div_ContextMenu", (e) => {
                e.preventDefault();
            });

            $(window).click(() => {
                self.hideContextMenu();
            });
            /*#endregion*/

            $("#btn_Previous").click(() => {
                if (this.arrobj_FolderPath.length > 1)
                    self.goBack();
            });

            $("#btn_MoveModalPrevious").click(() => {
                if (this.arrobj_MoveModalFolderPath.length > 1)
                    self.MoveModalGoBack();
            });

            /*#region Upload Functions*/
            $(window).on("dragenter", () => {
                self.showDropZone();
            });

            $(window).on("dragover", (e) => {
                e.preventDefault();
                self.showDropZone();
            });

            $(window).on("dragleave", (e) => {
                self.hideDropZone();
            });

            $("#div_DropZone").on("drop", (e) => {
                e.preventDefault();
                self.showLoading();
                self.hideDropZone();

                self.uploadFiles(e.originalEvent.dataTransfer.files);
            });

            $("#fileUpload").on("change", (e) => {
                self.uploadFiles(e.target.files);
            });
            /*#endregion*/

            /*#region Scroll/Resize Loader Functions*/
            $(window).scroll(self.debounce(() => {
                if (self.getScrollPercent() >= 60) {

                    let obj_CurrentFolder = this.arrobj_FolderPath[this.arrobj_FolderPath.length - 1];
                    self.getFiles(obj_CurrentFolder).then((result) => {
                        this.arrobj_Files.push.apply(this.arrobj_Files, result);
                    }).then(() => {
                        this.hideLoading();
                    });
                }
            }, 250));
            $(window).resize(self.debounce(() => {
                let obj_CurrentFolder = this.arrobj_FolderPath[this.arrobj_FolderPath.length - 1];
                if (!self.isScrollable)
                    self.getFiles(obj_CurrentFolder).then((result) => {
                        this.arrobj_Files.push.apply(this.arrobj_Files, result);
                    }).then(() => {
                        this.hideLoading();
                    });
            }, 250));
            /*#endregion*/

            /*#region Select/Unselect All Functions*/
            $("#btn_SelectAll").click(() => {
                this.selectall = true;
                let cb_All = $("input[type='checkbox']");

                cb_All.each(function () {
                    $(this).prop("checked", true);

                    self.isCheck($(this).attr("id"));
                    $(this)[0].dispatchEvent(new Event('change'));
                });
            });

            $("#btn_UnselectAll").click(() => {
                this.selectall = false;
                let cb_All = $("input[type='checkbox']");

                cb_All.each(function () {
                    if ($(this).prop("checked"))
                        $(this).prop("checked", false);

                    self.isCheck($(this).attr("id"));
                    $(this)[0].dispatchEvent(new Event('change'));
                });
            });
            /*#endregion*/
        },
        updated() {
            const self = this;

            $("input[type='checkbox']").each(function () {
                self.isCheck($(this).attr("id"));
            });
        },
        computed: {
            filteredSelectedItem: function () {
                return this.arrobj_SelectedItem.filter(x => this.isImage(x));
            }
        },
        components: {
            portfolio,
            updates
        },
    };
</script>
<style scoped>
    /*#region Full page drop area */
    #div_DropZone {
        visibility: hidden;
        opacity: 0;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9999999999;
        /*background-color: rgba(0, 0, 0, 0.5);*/
        background: rgba(0, 0, 0, 0.45);
        transition: visibility 175ms, opacity 175ms;
        display: table;
        text-shadow: 1px 1px 2px #000;
        color: #fff;
        font: bold 42px Oswald, DejaVu Sans, Tahoma, sans-serif;
    }

    #div_DropZone h1 {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }

    /*#endregion*/

    input[type="file"] {
        visibility: hidden;
        position: fixed;
        display: none;
    }

    /*#region Custom context menu*/
    #div_ContextMenu {
        width: auto;
        -webkit-box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);
        box-shadow: 0 0px 10px -1px rgba(0, 0, 0, 0.2);
        position: fixed;
        display: none;
        border-color: #ccc0 !important;
        border-radius: 4px !important;
    }

    #div_ContextMenu #ul_ContextMenuOptions {
        padding: 0;
        list-style: none;
        margin: 0px;
    }

    #div_ContextMenu .li_MenuOption {
        font-weight: 500;
        font-size: 12px;
        padding: 10px 20px 10px 17px;
        cursor: pointer;
        border-bottom: 1px solid #eee;

    }

    #div_ContextMenu .li_MenuOption .menu-text {
        margin-left: 10px;
    }

    #div_ContextMenu .li_MenuOption:hover {
        background: rgb(237, 240, 244);
    }

    div#div_ContextMenu:before {
        content: "";
        background: transparent;
        width: 20px;
        height: 20px;
        width: 0;
        height: 0;
        border-top: 10px solid white;
        border-left: 10px solid transparent;
        position: absolute;
        left: -22px;
        top: 13px;
        /* box-shadow: 0 0px 11px -5px rgba(0, 0, 0, 0.9); */
        border-top: 8px solid transparent;
        border-right: 11px solid white;
        border-bottom: 8px solid transparent;
    }

    #div_ContextMenu .li_MenuOption:last-child {
        border: 0px;
    }

    /*#endregion*/

    /*#region Custom Tooltip */
    .custom-tooltip {
        position: relative;
        display: inline-block;
    }

    /* Tooltip text */
    .custom-tooltip .custom-tooltiptext {
        /*visibility: hidden;*/
        /*default width:120px*/
        width: auto;
        /*background-color: black;*/
        /*color: #fff;*/
        /*text-align: center;*/
        /*padding: 5px 12px;*/
        /*border-radius: 6px;*/
        /* Position the tooltip text */
        /*position: absolute;*/
        /*z-index: 1;*/
        /*top: 6px;*/
        /*right: 115%;*/
        /*opacity: 0;*/
        /*transition: opacity 0.5s;*/
    }

    /* Show the tooltip text when you mouse over the tooltip container */
    .custom-tooltip:hover .custom-tooltiptext {
        visibility: visible;
        opacity: 1;
        cursor: default;
    }

    .custom-tooltip .custom-tooltiptext::after {
        /*content: " ";*/
        position: absolute;
        top: 50%;
        left: 100%; /* point to the right of the tooltip */
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent black;
    }

    /*#endregion*/

    /*#region Menu*/
    /*.menu:hover .menu-item:not(.show-menu), .show-menu {
        margin-top: 10px;
        max-height: 232px;
        overflow: visible;
        opacity: 1;
        transition: max-height 1s, opacity 1s;
    }*/

    .menu .menu-item:not(.show-menu) {
        margin-top: 0px;
        /* max-height: 0px; */
        overflow: hidden;
        opacity: 1;
        -webkit-transition: max-height 1s, opacity 0.5s, margin-top 2.0s;
        transition: max-height 1s, opacity 0.5s, margin-top 2.0s;
        display: inline-block;
        float: right;
        margin: 0px;
    }

    .menu button {
        width: 35px;
        height: 35px;
        display: block;
        border-width: 1px 1px 1px 0px;
        border-style: solid;
        border-color: #cdd3d8;
        padding: 6px;
    }

    .menu i {
        font-size: 20px;
    }

    /*#endregion*/

    .row #carousel2 {
        margin: 0 auto !important;
        width: 100%;
    }

    .div_ItemContainer {
        padding: 0 15px;
    }

    .div_ItemContainer
        /*#region On checkbox check transition*/
    label {
        cursor: pointer;
    }

    .check {
        -webkit-transform: scale(0.8);
        -moz-transform: scale(0.8);
        -ms-transform: scale(0.8);
        -o-transform: scale(0.8);
        transform: scale(0.8);
        opacity: 0.5;
        background-color: lightgray;
        transition: all 0.3s;
        /*border: 2px solid black;*/
    }

    .uncheck {
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
        opacity: 1;
        background-color: revert;
        transition: all 0.3s;
    }

    /*#endregion*/
</style>
<style>
    #modal_PostComponents .modal-lg {
        /*max-width: 95% !important;*/
    }
</style>