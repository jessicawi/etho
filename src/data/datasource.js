import {URLForEndpoint, NewRequest, parseResponseAndHandleErrors, parseObject} from "../data/requests";
import {ERROR_SERVER_UNREACHABLE} from "../data/datasourceConst";
import axios from "axios";
import jQuery from 'jquery';
import moment from "moment";
import Cookies from "js-cookie";

const API_HOST = process.env.VUE_APP_ROOT_API || "http://local.emsv2";
let GoogleGeocodeAPIKey = 'AIzaSyBSjzdBEO1Akg0aZfKpglWYBtdqLMHJLzM';

function getMs() {
    const d = new Date();
    return d.getTime();
}


// let alertExpireDate = new Date(new Date().getTime() + 1 * 60 * 1000);
function setToHappen(fn, d) {
    const t = d.getTime() - (new Date()).getTime();
    return setTimeout(fn, t);
}

function alertExpire() {
    alert("almost expire");
}


export default class DataSource {
    static get shared() {
        if (DataSource.instance == null || DataSource.instance === undefined) {
            DataSource.instance = new DataSource();
        }
        return DataSource.instance;
    }

    constructor() {
        this.loggedIn = false;
        this.isExpireAlerted = false;
    }

    async callAPI(endPoint, method = "GET", queryObject, requestBody, hasContentType = true) {
        const url = URLForEndpoint(endPoint, queryObject);
        const request = NewRequest(method, hasContentType);

        if (!hasContentType) {
            delete request.headers["Content-Type"];
            request.body = requestBody;
        } else if (method !== "GET" && requestBody) {
            request.body = JSON.stringify(requestBody);
        }
        let response;
        try {
            response = await fetch(url, request);
        } catch (err) {
            throw ERROR_SERVER_UNREACHABLE;
        }
        return await parseResponseAndHandleErrors(response);
    }

    // by default, withToken set to true
    callWebService(endPoint, data, method, withToken = true, withFormData = false) {
        const request = {
            dataType: "json",
            url: `${API_HOST}${endPoint}`,
            cache: false,
            success: function (response) {
                return response;
            }
        };
        if (method) {
            request.method = method;
        }

        if (data) {
            request.data = data;
        }

        if (withToken) {
            data.token = Cookies.get('authToken');
            data.UserSchool_Session = Cookies.get('schoolSession');
            data.UserID_Session = Cookies.get('userIDSession');
            data.UserType_Session = Cookies.get('userTypeSession');
            data.UserUniversity_Session = Cookies.get('userUniversitySession');
            data.UserEmail_Session = Cookies.get('userEmailSession');
            data.USRid_Session = Cookies.get('usRidSession');
            data.UserName_Session = Cookies.get('userNameSession');
            const extendTime = Cookies.get('extendTime');
            const expireTime = Cookies.get('expireTime');
            const nowMs = getMs();
            // const expireAlert = Cookies.get('alert');
            // if (expireAlert) {
            //     const date = Date.parse(expireAlert);
            //     const now = new Date();
            //     if (now.getTime() > date) {
            //         if (!this.isExpireAlerted) {
            //             // alert("token almost expire");
            //             this.isExpireAlerted = true;
            //         }
            //
            //     }
            // }

            // console.log(new Date(nowMs), "now");
            // console.log(new Date(Number(extendTime)), "extendTime");
            // console.log(new Date(Number(expireTime)), "expireTime");


            if (nowMs > extendTime && nowMs < expireTime) {
                const newExtendDate = new Date(Number(extendTime) + (120 * 60 * 1000));
                console.log('first extend check');
                console.log(newExtendDate, "new extend");
                console.log(newExtendDate.getTime() + " " + Number(expireTime));
                if (newExtendDate.getTime() >= Number(expireTime)) {
                    const newExpireDate = new Date(Number(expireTime) + (90 * 60 * 1000));
                    this.extendCookies(newExpireDate, newExtendDate);
                    // alert('extend!');
                    console.log(newExpireDate, "later");
                }
            }
        }

        // this is just testing, remove this if savePost not working
        // this might just use for upload file request only(formData), not for whole request
        if (withFormData) {
            request.processData = false;
            request.contentType = false;
        }

        // get token from session
        // const token = Cookies.get('authToken');

        // if token is available and withToken set as true, then pass request with headers
        // they not using header Authorization so disable this
        // if (token && withToken === true) {
        //     request.headers = {"Authorization": token};
        // }

        return jQuery.ajax(request);
    }

    async uploadFile(files, postID) {
        console.log(postID);
        const formData = new FormData();
        formData.append('token', Cookies.get('authToken'));
        formData.append('UserID_Session', Cookies.get('userIDSession'));

        console.log(files);

        formData.append("file", files[0]);
        formData.append("postID", postID);
        // console.log(formData);
        // console.log(files);

        const request = {
            url: `${API_HOST}/controller/Upload_File.asmx/uploadFile`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        return jQuery.ajax(request);

        // const response = await this.callWebService("/controller/Upload_File.asmx/uploadFile", data, "POST", true, true);
        // return response;
    }

    async login(userId, password) {
        const data = {
            userID: userId,
            userPassword: password
        };

        try {
            // Cookies.set('alert', alertExpireDate, {expires: expireDate});
            let extendDate = new Date(new Date().getTime() + 120 * 60 * 1000);
            let expireDate = new Date(new Date().getTime() + 90 * 60 * 1000);
            const extendMs = extendDate.getTime();
            const expiredMs = expireDate.getTime();

            const response = await this.callWebService("/controller/Login.asmx/checkLogin", data, "POST", false);
            Cookies.set('authToken', response.token, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('schoolSession', response.UserSchool_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('userIDSession', response.UserID_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('userTypeSession', response.UserType_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('userUniversitySession', response.UserUniversity_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('usRidSession', response.USRid_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('userEmailSession', response.UserEmail_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('userNameSession', response.UserName_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('expireTime', expiredMs, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('extendTime', extendMs, {expires: expireDate}); //expire in 3 hour);
            return response;
        } catch (e) {
            throw e;
        }
    }

    extendCookies(expireDate, extendTime) {
        try {
            const token = Cookies.get('authToken');
            const UserSchool_Session = Cookies.get('schoolSession');
            const UserID_Session = Cookies.get('userIDSession');
            const UserType_Session = Cookies.get('userTypeSession');
            const UserUniversity_Session = Cookies.get('userUniversitySession');
            const UserEmail_Session = Cookies.get('userEmailSession');
            const USRid_Session = Cookies.get('usRidSession');
            const UserName_Session = Cookies.get('userNameSession');
            const expiredMs = expireDate.getTime();
            const extendMs = extendTime.getTime();


            Cookies.set('authToken', token, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('schoolSession', UserSchool_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('userIDSession', UserID_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('userTypeSession', UserType_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('userUniversitySession', UserUniversity_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('usRidSession', USRid_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('userEmailSession', UserEmail_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('userNameSession', UserName_Session, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('expireTime', expiredMs, {expires: expireDate}); //expire in 3 hour);
            Cookies.set('extendTime', extendMs, {expires: expireDate}); //expire in 3 hour);
        } catch (e) {
            console.log(e);
        }
    }


    async externalLogin(userId, tokenId) {
        const data = {
            userID: userId,
            externalLoginToken: tokenId
        };

        const response = await this.callWebService("/controller/Login.asmx/checkLogin", data, "POST", false);
        Cookies.set('authToken', response.token, {expires: 3 / 24}); //expire in 3 hour);
        Cookies.set('schoolSession', response.UserSchool_Session, {expires: 3 / 24}); //expire in 3 hour);
        Cookies.set('userIDSession', response.UserID_Session, {expires: 3 / 24}); //expire in 3 hour);
        Cookies.set('userTypeSession', response.UserType_Session, {expires: 3 / 24}); //expire in 3 hour);
        Cookies.set('userUniversitySession', response.UserUniversity_Session, {expires: 3 / 24}); //expire in 3 hour);
        Cookies.set('usRidSession', response.USRid_Session, {expires: 3 / 24}); //expire in 3 hour);
        Cookies.set('userEmailSession', response.UserEmail_Session, {expires: 3 / 24}); //expire in 3 hour);
        Cookies.set('userNameSession', response.UserName_Session, {expires: 3 / 24}); //expire in 3 hour);
        return response;
    }

    logout() {
        let $ = require("jquery");

        let internalSession = new Promise((resolve, reject) => {
            const data = {};

            this.callWebService("/controller/Login.asmx/logOut", data, "POST").then((result) => {
                resolve(result == "1");
            });
        });

        let sessionSignout = new Promise((resolve, reject) => {
            Cookies.remove('authToken');
            Cookies.remove('schoolSession');
            Cookies.remove('userIDSession');
            Cookies.remove('userTypeSession');
            Cookies.remove('userUniversitySession');
            Cookies.remove('usRidSession');
            Cookies.remove('userEmailSession');
            Cookies.remove('userNameSession');
            resolve(true);
        });

        let googleSignout = new Promise((resolve, reject) => {
            $.getScript('https://apis.google.com/js/platform.js', function () {
                gapi.load("auth2", () => {
                    gapi.auth2.init({
                        client_id: "646978523324-lcudp248dvuuk0rda4q6kf2bti9qkk3b.apps.googleusercontent.com"
                    }).then((auth2) => {
                        auth2.signOut();
                        resolve(true);
                    });
                });
            });
        });

        let fbSignout = new Promise((resolve, reject) => {
            $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
                FB.init({
                    // appId: '255792542012990',
                    appId: '1983777365262188',
                    version: 'v2.7' // or v2.1, v2.2, v2.3, ...
                });

                FB.getLoginStatus(() => {
                    FB.logout();
                    resolve(true);
                });
            });
        });

        Promise.all([internalSession, sessionSignout, googleSignout, fbSignout]).then((result) => {
            window.location.replace("/login");
        });
    }

    async resetEmailPassword(userEmail) {
        const data = {
            userEmail: userEmail
        };
        const response = await this.callWebService("/controller/Login.asmx/resetPasswordEmail", data, "POST", false);
        return response;
    }

    async resetPassword(userEmail, userPassword, otp) {
        const data = {
            userEmail: userEmail,
            userPassword: userPassword,
            otp: otp
        };
        const response = await this.callWebService("/controller/Login.asmx/resetPassword", data, "POST", false);
        return response;
    }

    async parentRegister(userEmail, userPassword, studentIDNo, studentID_Index, studentDOB, studentIDType, externalLoginType, externalLoginToken) {
        const date = moment(studentDOB).format('Y-MM-DD HH:mm:ss');
        console.log(date);
        const data = {
            userEmail: userEmail,
            userPassword: userPassword,
            studentID_Index: studentID_Index,
            studentDOB: date,
            studentIDType: studentIDType,
            studentIDNo: studentIDNo,
            externalLoginType: externalLoginType,
            externalLoginToken: externalLoginToken
        };
        let response = await this.callWebService("/controller/Register.asmx/parentRegistration", data, "POST", false);

        if (typeof response === "string") {
            response = JSON.parse(response);
        }

        return response;

    }

    async getStudent(studentID, studentID_Index, studentFirstName, studentLastName, parentName) {
        const data = {
            studentID: studentID,
            studentID_Index: studentID_Index,
            studentFirstName: studentFirstName,
            studentLastName: studentLastName,
            parentName: parentName,
            // token: Cookies.get('authToken'),
            //UserSchool_Session: Cookies.get('schoolSession'),
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudent", data, "POST");
        return response;
    }

    async getStudentParentView(studentID) {
        const data = {
            studentID: studentID,
            parentView: "YES"
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudent", data, "POST");
        return response;
    }

    async getStudentWithStatus(studentID, studentID_Index, studentFirstName, studentLastName, parentName, studentStatus) {
        const data = {
            studentID: studentID,
            studentID_Index: studentID_Index,
            studentFirstName: studentFirstName,
            studentLastName: studentLastName,
            parentName: parentName,
            studentStatus: studentStatus,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudent", data, "POST");
        return response;
    }

    async getStudentWithPendingCourse(studentID, studentID_Index, studentFirstName, studentLastName, parentName, studentStatus) {
        const data = {
            studentID: studentID,
            studentID_Index: studentID_Index,
            studentFirstName: studentFirstName,
            studentLastName: studentLastName,
            parentName: parentName,
            studentStatus: studentStatus,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentWithPendingCourse", data, "POST");
        return response;
    }

    async checkStudentDuplication(studentFirstName, studentLastName, studentDOB, finExpire, fin, birthCert, ic, passport, passportExpire) {
        const data = {
            studentFirstName: studentFirstName,
            studentLastName: studentLastName,
            studentDOB: studentDOB,
            finExpire: finExpire,
            fin: fin,
            birthCert: birthCert,
            ic: ic,
            passport: passport,
            passportExpire: passportExpire,
        };
        const response = await this.callWebService("/controller/Students.asmx/checkStudentDuplication", data, "POST");
        return response;
    }

    async getStudentProfilePicture(studentID) {
        const data = {
            studentID: studentID,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentProfilePicture", data, "POST");
        return response;
    }

    async getStudentAddressGoogleAPI(postcode, country) {
        let result = '';

        if (country === '' || country === 'Singapore') {
            country = 'Singapore';

            //to take out S in front of postcode
            if (postcode.substring(0, 1).toUpperCase() === 'S') {
                postcode = postcode.substring(1, postcode.length);
            }
            //to take out S in front of postcode
        }

        //search by address / postcode
        const request = {
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + postcode + '+' + country + '&result_type=street_address&key=' + GoogleGeocodeAPIKey,
            cache: false,
            type: 'POST',
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        //search by address / postcode

        //get lat lng
        let lat = '';
        let lng = '';

        this.resultResponse = response.results;
        this.resultResponse.forEach(m => {
            lat = m.geometry.location.lat;
            lng = m.geometry.location.lng;
        });
        //get lat lng

        //search by lat lng
        if (response.status === 'OK') {
            const request2 = {
                url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + GoogleGeocodeAPIKey,
                cache: false,
                type: 'POST',
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                async: false,
                json: false,
                success: function (response2) {
                    return response2;
                }
            };

            let response2 = await jQuery.ajax(request2);
            if (typeof response2 === "string") {
                response2 = JSON.parse(response2);
            }

            result = response2.results[0].formatted_address;

            // const resultResponse2 = response2.results[0].address_components;
            // resultResponse2.forEach(m => {
            //     console.log(m);
            // });
        }
        //search by lat lng

        return result;
    }

    async saveStudent(files, jsonString, jsonString2, familyID, parentID, allergiesList) {
        const data = new FormData();
        data.append('token', Cookies.get('authToken'));
        data.append('UserSchool_Session', Cookies.get('schoolSession'));
        data.append('UserID_Session', Cookies.get('userIDSession'));
        data.append('UserUniversity_Session', Cookies.get('userUniversitySession'));

        if (files && files.length > 1) {
            for (let key in files) {
                //console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        data.append(`upload_${key}`, files[key]);
                    } else {
                        data.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            data.append("upload", files[0]);
        }

        data.append("jsonString", jsonString);
        data.append("jsonString2", jsonString2);
        data.append("familyID", familyID);
        data.append("parentID", parentID);
        data.append("allergiesList", allergiesList);

        const request = {
            url: `${API_HOST}/controller/Students.asmx/saveStudent`,
            cache: false,
            type: 'POST',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async updateStudent(files, studentID, jsonString, allergiesList) {
        const data = new FormData();
        data.append('token', Cookies.get('authToken'));
        data.append('UserID_Session', Cookies.get('userIDSession'));

        if (files && files.length > 1) {
            for (let key in files) {
                //console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        data.append(`upload_${key}`, files[key]);
                    } else {
                        data.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            data.append("upload", files[0]);
        }

        data.append("studentID", studentID);
        data.append("jsonString", jsonString);
        data.append("allergiesList", allergiesList);

        const request = {
            url: `${API_HOST}/controller/Students.asmx/updateStudent`,
            cache: false,
            type: 'POST',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async activeStudent(studentID) {
        const data = {
            studentID: studentID,
        };
        const response = await this.callWebService("/controller/Students.asmx/activeStudent", data, "POST");
        return response;
    }

    async getStudentAvailableStatusAction(currentStatus) {
        const data = {
            currentStatus: currentStatus,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentAvailableStatusAction", data, "POST");
        return response;
    }

    async updateStudentStatus(studentID, newStatus) {
        const data = {
            studentID: studentID,
            newStatus: newStatus,
        };
        const response = await this.callWebService("/controller/Students.asmx/updateStudentStatus", data, "POST");
        return response;
    }

    async getParentList(familyId, parentLastName, parentFirstName) {
        const data = {
            familyID: familyId,
            parentFirstName: parentFirstName,
            parentLastName: parentLastName,
            // token: Cookies.get('authToken'),
            // UserSchool_Session: Cookies.get('schoolSession'),
        };
        const response = await this.callWebService("/controller/Parents.asmx/getParentList", data, "POST");
        return response;
    }

    async getParent(parentID, familyID) {
        const data = {
            parentID: parentID,
            familyID: familyID,
        };
        const response = await this.callWebService("/controller/Parents.asmx/getParent", data, "POST");
        return response;
    }

    async getParent(parentID) {
        const data = {
            parentID: parentID
        };
        const response = await this.callWebService("/controller/Parents.asmx/getParentStudentsInfo", data, "POST");
        return response;
    }

    async getRelationship(familyID, studentID, parentFirstName, parentLastName, studentName) {
        const data = {
            familyID: familyID,
            studentID: studentID,
            parentFirstName: parentFirstName,
            parentLastName: parentLastName,
            studentName: studentName,
        };
        const response = await this.callWebService("/controller/Parents.asmx/getRelationship", data, "POST");
        return response;
    }

    async getRelationshipByParentID(parentID) {
        const data = {
            parentID: parentID,
        };
        const response = await this.callWebService("/controller/Parents.asmx/getRelationship", data, "POST");
        return response;
    }

    async getStudentSiblingReligionLanguages(parentID) {
        const data = {
            parentID: parentID,
        };
        const response = await this.callWebService("/controller/Parents.asmx/getStudentSiblingReligionLanguages", data, "POST");
        return response;
    }

    async updateRelationship(familyID, studentID) {
        const data = {
            familyID: familyID,
            studentID: studentID,
        };
        const response = await this.callWebService("/controller/Parents.asmx/updateRelationship", data, "POST");
        return response;
    }

    async getStudentLevel(studentID) {
        const data = {
            studentID: studentID,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentLevel", data, "POST");
        return response;
    }

    async getStudentLevelActiveOnly(studentID) {
        const data = {
            studentID: studentID,
            onlyActive: 'Yes',
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentLevel", data, "POST");
        return response;
    }

    async getEditClass(semID, subjectcourseID, customClassNotEqual) {
        const data = {
            semID: semID,
            subjectcourseID: subjectcourseID,
            customClassNotEqual: customClassNotEqual,
        };
        const response = await this.callWebService("/controller/Course.asmx/getEditClass", data, "POST");
        return response;
    }

    async getStudentClass(studentID, courseID) {
        const data = {
            studentID: studentID,
            courseID: courseID,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentClass", data, "POST");
        return response;
    }

    async setClass(studentID, classID, studentCourseID) {
        const data = {
            studentID: studentID,
            classID: classID,
            studentCourseID: studentCourseID,
        };
        const response = await this.callWebService("/controller/Students.asmx/setClass", data, "POST");
        return response;
    }

    async massSetClass(classID, jsonString) {
        const data = {
            classID: classID,
            jsonString: jsonString,
        };
        const response = await this.callWebService("/controller/Students.asmx/massSetClass", data, "POST");
        return response;
    }

    async updateLevel(studentID, studentCourseID, actionMode) {
        const data = {
            studentID: studentID,
            studentCourseID: studentCourseID,
            actionMode: actionMode,
        };
        const response = await this.callWebService("/controller/Students.asmx/updateLevel", data, "POST");
        return response;
    }

    async getSibling(studentID_Index, studentID) {
        const data = {
            studentID_Index: studentID_Index,
            studentID: studentID,
        };
        const response = await this.callWebService("/controller/Students.asmx/getSibling", data, "POST");
        return response;
    }

    async updateParent(parentID, jsonString) {
        const data = {
            parentID: parentID,
            jsonString: jsonString,
        };
        const response = await this.callWebService("/controller/Parents.asmx/updateParent", data, "POST");
        return response;
    }

    async getAcademicYearDateRange(academicYearID) {
        const data = {
            academicYearID: academicYearID,
        };
        const response = await this.callWebService("/controller/Course.asmx/getAcademicYearDateRange", data, "POST");
        return response;
    }

    async setLevel(studentID, levelID, fromDate, toDate, academicYearID, intakeYear) {
        const data = {
            studentID: studentID,
            levelID: levelID,
            fromDate: fromDate,
            toDate: toDate,
            academicYearID: academicYearID,
            intakeYear: intakeYear,
        };
        const response = await this.callWebService("/controller/Students.asmx/setLevel", data, "POST");
        return response;
    }

    async setLevelForAcceptScool(studentID, levelID, fromDate, toDate, academicYearID, intakeYear, acceptTransferStudent, studentSchoolID, effectiveDate) {
        const data = {
            studentID: studentID,
            levelID: levelID,
            fromDate: fromDate,
            toDate: toDate,
            academicYearID: academicYearID,
            intakeYear: intakeYear,
            acceptTransferStudent: acceptTransferStudent,
            studentSchoolID: studentSchoolID,
            effectiveDate: effectiveDate
        };
        const response = await this.callWebService("/controller/Students.asmx/setLevel", data, "POST");
        return response;
    }

    async checkParentDuplication(firstName, lastName, checkMode) {
        const data = {
            firstName: firstName,
            lastName: lastName,
            checkMode: checkMode,
        };
        const response = await this.callWebService("/controller/Parents.asmx/checkParentDuplication", data, "POST");
        return response;
    }

    async getUserMenu() {
        const data = {};

        const userType = Cookies.get('userTypeSession');
        if (userType !== "Parent") {
            data.USRid_Session = Cookies.get('usRidSession');
        }

        const response = await this.callWebService("/controller/User.asmx/getUserMenu", data, "POST");
        return response;
    }

    async getUserSch() {
        const data = {};

        const userEmail = Cookies.get('userEmailSession');
        if (userEmail !== "" || userEmail !== null) {
            data.UserEmail_Session = Cookies.get('userEmailSession');
        }

        const response = await this.callWebService("/controller/User.asmx/getUserSch", data, "POST");
        return response;
    }

    async getAllStaffListBySchool() {
        const data = {};

        const response = await this.callWebService("/controller/User.asmx/getAllStaffListBySchool", data, "POST");
        return response;
    }

    async getAllStaffList() {
        const data = {};

        const response = await this.callWebService("/controller/User.asmx/getAllStaffList", data, "POST");
        return response;
    }

    async getStaffPost(int_NumberOfPost, str_LastPostID, postType) {
        const data = {
            UserID_Session: Cookies.get('userIDSession'),
            numberOfPost: int_NumberOfPost,
            lastPostID: str_LastPostID,
            postType: postType,
        };

        const response = await this.callWebService("/controller/Posting.asmx/getPostStaff", data, "POST");
        return response;
    }

    async getStaffPostFeedPage(int_NumberOfPost, str_LastPostID, postType, notEqualPostType) {
        const data = {
            UserID_Session: Cookies.get('userIDSession'),
            numberOfPost: int_NumberOfPost,
            lastPostID: str_LastPostID,
            postType: postType,
            notEqualPostType: notEqualPostType,
        };

        const response = await this.callWebService("/controller/Posting.asmx/getPostStaff", data, "POST");
        return response;
    }

    async getParentPost(int_NumberOfPost, str_LastPostID, postType) {
        const data = {
            UserID_Session: Cookies.get('userIDSession'),
            numberOfPost: int_NumberOfPost,
            lastPostID: str_LastPostID,
            postType: postType,
        };
        const response = await this.callWebService("/controller/Posting.asmx/getPostParent", data, "POST");
        return response;
    }

    async getParentPostFeedPage(int_NumberOfPost, str_LastPostID, postType, notEqualPostType) {
        const data = {
            UserID_Session: Cookies.get('userIDSession'),
            numberOfPost: int_NumberOfPost,
            lastPostID: str_LastPostID,
            postType: postType,
            notEqualPostType: notEqualPostType,
        };
        const response = await this.callWebService("/controller/Posting.asmx/getPostParent", data, "POST");
        return response;
    }

    async getPostDropdown() {
        const data = {};
        const response = await this.callWebService("/controller/Posting.asmx/getPostDropDown", data, "POST");
        return response;
    }

    async getStaffPostHome() {
        const data = {};

        data.UserID_Session = Cookies.get('userIDSession');
        data.numberOfPost = 5;

        const response = await this.callWebService("/controller/Posting.asmx/getPostStaff", data, "POST");
        return response;
    }

    async savePostUpdate(files, postContent, tagUserID, tagClassID, tagLevelID, postLinkID) {
        const postType = "UPDATE";
        const formData = new FormData();
        formData.append('token', Cookies.get('authToken'));
        formData.append('UserID_Session', Cookies.get('userIDSession'));
        formData.append('UserSchool_Session', Cookies.get('schoolSession'));
        formData.append("postLinkID", postLinkID);

        if (files && files.length > 1) {
            for (let key in files) {
                // console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        formData.append(`upload_${key}`, files[key]);
                    } else {
                        formData.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            formData.append("upload", files[0]);
        }

        formData.append("updateContent", postContent);
        // formData.append("tagAcademicYearID", tagAcademicYearID);
        formData.append("postType", postType);

        if (tagUserID && tagUserID.length > 0) {
            formData.append("tagUserID", tagUserID);
        } else if (tagLevelID) {
            formData.append("tagLevelID", tagLevelID);
        } else if (tagClassID) {
            formData.append("tagClassID", tagClassID);
        }

        const request = {
            url: `${API_HOST}/controller/Posting.asmx/savePost`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async savePortfolioPost(files, porTitle, porObservation, porAnalysisReflection, porDevelopmentGoals, tagUserID, tagClassID, tagLevelID, postLinkID) {
        const postType = "PORTFOLIO";
        const formData = new FormData();
        formData.append('token', Cookies.get('authToken'));
        formData.append('UserID_Session', Cookies.get('userIDSession'));
        formData.append('UserSchool_Session', Cookies.get('schoolSession'));
        formData.append("porTitle", porTitle);
        formData.append("porObservation", porObservation);
        formData.append("porAnalysisReflection", porAnalysisReflection);
        formData.append("porDevelopmentGoals", porDevelopmentGoals);
        formData.append("postLinkID", postLinkID);

        if (files && files.length > 1) {
            for (let key in files) {
                // console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        formData.append(`upload_${key}`, files[key]);
                    } else {
                        formData.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            formData.append("upload", files[0]);
        }

        // formData.append("tagAcademicYearID", tagAcademicYearID);
        formData.append("postType", postType);

        if (tagUserID && tagUserID.length > 0) {
            formData.append("tagUserID", tagUserID);
        } else if (tagLevelID) {
            formData.append("tagLevelID", tagLevelID);
        } else if (tagClassID) {
            formData.append("tagClassID", tagClassID);
        }

        const request = {
            url: `${API_HOST}/controller/Posting.asmx/savePost`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async saveReportPost(files, repTitle, repObservation, tagUserID, tagClassID, tagLevelID, postLinkID) {
        const postType = "REPORT";
        const formData = new FormData();
        formData.append('token', Cookies.get('authToken'));
        formData.append('UserID_Session', Cookies.get('userIDSession'));
        formData.append('UserSchool_Session', Cookies.get('schoolSession'));
        formData.append("repTitle", repTitle);
        formData.append("repObservation", repObservation);
        formData.append("postLinkID", postLinkID);

        if (files && files.length > 1) {
            for (let key in files) {
                // console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        formData.append(`upload_${key}`, files[key]);
                    } else {
                        formData.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            formData.append("upload", files[0]);
        }

        // formData.append("tagAcademicYearID", tagAcademicYearID);
        formData.append("postType", postType);

        if (tagUserID && tagUserID.length > 0) {
            formData.append("tagUserID", tagUserID);
        } else if (tagLevelID) {
            formData.append("tagLevelID", tagLevelID);
        } else if (tagClassID) {
            formData.append("tagClassID", tagClassID);
        }

        const request = {
            url: `${API_HOST}/controller/Posting.asmx/savePost`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async saveDocumentPost(files, docContent, postLinkID) {
        const postType = "DOCUMENTATION";
        const formData = new FormData();
        formData.append('token', Cookies.get('authToken'));
        formData.append('UserID_Session', Cookies.get('userIDSession'));
        formData.append('UserSchool_Session', Cookies.get('schoolSession'));
        formData.append("docContent", docContent);
        formData.append("postLinkID", postLinkID);

        if (files && files.length > 1) {
            for (let key in files) {
                // console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        formData.append(`upload_${key}`, files[key]);
                    } else {
                        formData.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            formData.append("upload", files[0]);
        }

        // formData.append("tagAcademicYearID", tagAcademicYearID);
        formData.append("postType", postType);

        if (tagUserID && tagUserID.length > 0) {
            formData.append("tagUserID", "");
        } else if (tagLevelID) {
            formData.append("tagLevelID", "");
        } else if (tagClassID) {
            formData.append("tagClassID", "");
        }

        const request = {
            url: `${API_HOST}/controller/Posting.asmx/savePost`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async saveBroadcastPost(files, broadContent, tagUserID, tagClassID, tagLevelID, postLinkID) {
        const postType = "BROADCAST";
        const formData = new FormData();
        formData.append('token', Cookies.get('authToken'));
        formData.append('UserID_Session', Cookies.get('userIDSession'));
        formData.append('UserSchool_Session', Cookies.get('schoolSession'));
        formData.append("broadContent", broadContent);
        formData.append("postLinkID", postLinkID);

        if (files && files.length > 1) {
            for (let key in files) {
                // console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        formData.append(`upload_${key}`, files[key]);
                    } else {
                        formData.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            formData.append("upload", files[0]);
        }

        // formData.append("tagAcademicYearID", tagAcademicYearID);
        formData.append("postType", postType);

        if (tagUserID && tagUserID.length > 0) {
            formData.append("tagUserID", tagUserID);
        } else if (tagLevelID) {
            formData.append("tagLevelID", tagLevelID);
        } else if (tagClassID) {
            formData.append("tagClassID", tagClassID);
        }

        const request = {
            url: `${API_HOST}/controller/Posting.asmx/savePost`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async getPostFile(postID) {
        const data = {
            postID: postID
        };
        const response = await this.callWebService("/controller/Posting.asmx/getPostFile", data, "POST");
        return response;
    }

    async getPostAllTaggingStudentsByPostID(postID) {
        const data = {
            postID: postID
        };
        const response = await this.callWebService("/controller/Posting.asmx/getPostAllTaggingStudentsByPostID", data, "POST");
        return response;
    }

    async saveComment(PostID, postContent) {
        const data = {
            postID: PostID,
            postContent: postContent,
        };
        const response = await this.callWebService("/controller/Posting.asmx/savePostComment", data, "POST");
        return response;
    }

    async getComment(PostID) {
        const data = {
            postId: PostID
        };
        const response = await this.callWebService("/controller/Posting.asmx/getPostComment", data, "POST");
        return response;
    }

    async editComment(commentPostID, postContent, actionMode) {
        const data = {
            commentPostID: commentPostID,
            postContent: postContent,
            actionMode: actionMode
        };
        const response = await this.callWebService("/controller/Posting.asmx/updatePostComment", data, "POST");
        return response;
    }

    async deleteComment(commentPostID, postContent, actionMode) {
        const data = {
            commentPostID: commentPostID,
            postContent: postContent,
            actionMode: actionMode
        };
        const response = await this.callWebService("/controller/Posting.asmx/updatePostComment", data, "POST");
        return response;
    }

    async saveGallery(files, fileType, galFolderID, folderName) {

        const formData = new FormData();
        formData.append('token', Cookies.get('authToken'));
        formData.append('UserID_Session', Cookies.get('userIDSession'));

        if (files && files.length > 1) {
            for (let key in files) {
                // console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        formData.append(`upload_${key}`, files[key]);
                    } else {
                        formData.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            formData.append("upload", files[0]);
        }

        formData.append("fileType", fileType);
        formData.append("galFolderID", galFolderID);
        formData.append("folderName", folderName);

        const request = {
            url: `${API_HOST}/controller/Gallery.asmx/saveFile`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;

    }

    async pendingPost(ID, PostID, PostContent, PostStatus, PostCreatedDate, PostApproverID) {
        const data = {
            ID: ID,
            PostID: PostID,
            PostContent: PostContent,
            PostStatus: PostStatus,
            PostCreatedDate: PostCreatedDate,
            PostApproverID: PostApproverID
        };
        data.UserID_Session = Cookies.get('userIDSession');
        const response = await this.callWebService("/controller/Approver.asmx/getPendingApproverPost", data, "POST");
        return response;
    }

    async approvePost(postID, postType, actionStatus, postComment) {

        const data = {
            postID: postID,
            postType: postType,
            actionStatus: actionStatus,
            postComment: postComment
        };

        const response = await this.callWebService("/controller/Posting.asmx/approvePost", data, "POST");
        return response;
    }

    async updatePost(currentFiles, actionStatus, postID, UpdateContent, profolio, tagUserID, tagClassID, tagLevelID) {
        const formData = new FormData();
        formData.append('token', Cookies.get('authToken'));
        formData.append('UserID_Session', Cookies.get('userIDSession'));
        console.log(currentFiles);
        if (currentFiles && currentFiles.length > 1) {
            for (let key in currentFiles) {
                // console.log(key);
                if (currentFiles.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        formData.append(`upload_${key}`, currentFiles[key]);
                    } else {
                        formData.append("upload", currentFiles[key]);
                    }
                }
            }
        } else if (currentFiles) {
            formData.append("upload", currentFiles[0]);
        }

        formData.append("actionStatus", actionStatus);
        formData.append("postID", postID);
        formData.append("UpdateContent", UpdateContent);
        formData.append("profolio", profolio);
        formData.append("tagUserID", tagUserID);
        formData.append("tagClassID", tagClassID);
        formData.append("tagLevelID", tagLevelID);

        const request = {
            url: `${API_HOST}/controller/Posting.asmx/updatePost`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async softDeletePost(postId, profolio) {
        const data = {
            postID: postId,
            profolio,
            actionStatus: "Void"
        };

        const response = await this.callWebService("/controller/Posting.asmx/updatePost", data, "POST");
        return response;
    }

    async getApproverMaster() {
        const data = {};

        const response = await this.callWebService("/controller/Approver.asmx/getApproverMaster", data, "POST");
        return response;
    }

    async saveApproverMaster(approverLevel, approverUserID, approverType) {
        const data = {
            approverLevel: approverLevel,
            approverUserID: approverUserID,
            approverType: approverType
        };

        const response = await this.callWebService("/controller/Approver.asmx/saveApproverMaster", data, "POST");
        return response;
    }

    async updateApproverMaster(approverMasterID, actionStatus) {
        const data = {
            approverMasterID: approverMasterID,
            actionStatus: actionStatus,
        };

        const response = await this.callWebService("/controller/Approver.asmx/updateApproverMaster", data, "POST");
        return response;
    }

    async getApproverMasterSpecificUser() {
        const data = {};

        const response = await this.callWebService("/controller/Approver.asmx/getApproverMasterSpecificUser", data, "POST");
        return response;
    }

    async updateApproverMasterSpecificUser(approverMasterSpecificID, actionStatus) {
        const data = {
            approverMasterSpecificID: approverMasterSpecificID,
            actionStatus: actionStatus
        };

        const response = await this.callWebService("/controller/Approver.asmx/updateApproverMasterSpecificUser", data, "POST");
        return response;
    }

    async saveApproverMasterSpecificUser(neededApproveSpecificUserID, approverType) {
        const data = {
            neededApproveSpecificUserID: neededApproveSpecificUserID,
            approverType: approverType
        };

        const response = await this.callWebService("/controller/Approver.asmx/saveApproverMasterSpecificUser", data, "POST");
        return response;
    }

    async getPendingApprover() {
        const data = {};

        const response = await this.callWebService("/controller/Approver.asmx/getPendingApprover", data, "POST");
        return response;
    }

    async checkApproveStatusByUser(itemID, mode) {
        const data = {
            itemID: itemID,
            mode: mode
        };

        let result = await this.callWebService("/controller/Approver.asmx/checkApproveStatusByUser", data, "POST");
        return result;
    }

    async login2(userId, password) {
        const data = {
            username: userId,
            password: password
        };
        const response = await this.callAPI("/login", "POST", null, data);
        Cookies.set('authToken', response.token, {expires: 3 / 24}); //expire in 3 hour);
        return response;
    }

    async getCountryList() {
        // let response;
        // try {
        //     response = await fetch("http://local.emsv2/controller/Students.asmx/getCountryList");
        // } catch (err) {
        //     console.log(err);
        //     throw ERROR_SERVER_UNREACHABLE;
        // }
        // return await parseResponseAndHandleErrors(response);

        const data = {};

        const response = await this.callWebService("/controller/Students.asmx/getCountryList", data, "POST");
        return response;
    }

    async getLevel(customLevelNotEqual) {
        const data = {
            customLevelNotEqual: customLevelNotEqual,
        };
        const response = await this.callWebService("/controller/Course.asmx/getLevel", data, "POST");
        return response;
    }

    async getLevelSpecificSchool(speificSchoolID) {
        const data = {
            speificSchoolID: speificSchoolID,
        };
        const response = await this.callWebService("/controller/Course.asmx/getLevel", data, "POST");
        return response;
    }

    async getStudentDropDownList(jsonString) {
        const data = {
            jsonString: jsonString,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentDropDownList", data, "POST");
        return response;
    }

    async getStudentEnrollment() {
        const data = {
            UserSchool_Session: Cookies.get('schoolSession'),
            passHowManyDaysStudentCreated: "30"
        };
        const response = await this.callWebService("/controller/Students.asmx/getAllWithdrawStudentsCurrentActiveYearBySchool", data, "POST");
        return response;
    }

    async getWithdrawStudent() {
        const data = {
            UserSchool_Session: Cookies.get('schoolSession'),
        };
        const response = await this.callWebService("/controller/Students.asmx/getAllWithdrawStudentsCurrentActiveYearBySchool", data, "POST");
        return response;
    }

    async getTransferStudent() {
        const data = {
            UserSchool_Session: Cookies.get('schoolSession'),
            passHowManyDaysStudentTransffered: "30"
        };
        const response = await this.callWebService("/controller/Students.asmx/getAllTransferredStudentsBySchoolDay", data, "POST");
        return response;
    }

    async getAcademicYear() {
        const data = {};
        const response = await this.callWebService("/controller/Course.asmx/getAcademicYear", data, "POST");
        return response;
    }

    async getAcademicYearBySchoolID(customSchoolID) {
        const data = {
            customSchoolID : customSchoolID
        };
        const response = await this.callWebService("/controller/Course.asmx/getAcademicYear", data, "POST");
        return response;
    }

    async getIntakeYear() {
        const data = {};
        const response = await this.callWebService("/controller/Students.asmx/getIntakeYear", data, "POST");
        return response;
    }

    async getUserList() {
        const data = {};
        const response = await this.callWebService("/controller/UserMagt.asmx/getUserList", data, "POST");
        return response;
    }

// SAMPLE 2 using axios
    async PostToGetDataWEIRD() {
        const options = {
            countryID: "",
        };

        let response;
        try {
            response = await axios.post("http://local.emsv2/controller/Students.asmx/getCountryList?countryID=", options);
        } catch (err) {
            console.log(err);
            throw ERROR_SERVER_UNREACHABLE;
        }
        return response.data;
    }

// POST SAMPLE
    async createStudent() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const request = {
            method: "POST",
            headers: headers,
        };
        const requestBody = {
            countryID: "",
        };
        request.body = JSON.stringify(rquestBody);

        let response;
        try {
            response = await fetch("URL", request);
        } catch (err) {
            console.log(err);
            getApproverMaster;
            throw ERROR_SERVER_UNREACHABLE;
        }
        return await parseResponseAndHandleErrors(response);
    }

    async getAttendanceClass() {
        const data = {};
        const response = await this.callWebService("/controller/Attendance.asmx/getAttendanceClass", data, "POST");
        return response;
    }

    async LoadAttendanceList(classValue) {

        const data = {
            classValue: classValue,
        };
        const response = await this.callWebService("/controller/Attendance.asmx/LoadAttendanceList", data, "POST");
        return response;
    }

    async updateAttendanceList(jsonString) {
        const data = {
            jsonString: jsonString,
        };
        const response = await this.callWebService("/controller/Attendance.asmx/updateAttendanceList", data, "POST");
        return response;
    }

    //#region Gallery
    async getFiles(galFolderID, startRowNo, endRowNo) {
        const data = {
            galFolderID: galFolderID,
            startRowNo: startRowNo,
            endRowNo: endRowNo,
            fileRetrieveMode: "File"
        };

        const response = await this.callWebService("/controller/Gallery.asmx/getFile", data, "POST");
        return response;
    }

    async getFolders(galFolderID) {
        const data = {
            galFolderID: galFolderID,
            fileRetrieveMode: "Folder"
        };

        const response = await this.callWebService("/controller/Gallery.asmx/getFile", data, "POST");
        return response;
    }

    async downloadFile(galID) {
        const data = {
            galID: galID
        };

        const response = await this.callWebService("/controller/Gallery.asmx/downloadFile", data, "POST");
        return response;
    }

    async saveFile(files, galFolderID) {
        const formData = new FormData();

        formData.append('fileType', "File");
        formData.append('galFolderID', galFolderID);
        formData.append('token', Cookies.get('authToken'));
        formData.append('UserID_Session', Cookies.get('userIDSession'));
        formData.append('folderName', "");

        if (files && files.length > 1) {
            for (let i = 0; i < files.length; i++) {
                formData.append("files" + i, files[i]);
                console.log(files[i]);
            }
        } else if (files) {
            formData.append("files", files[0]);
        }

        const request = {
            url: `${API_HOST}/controller/Gallery.asmx/saveFile`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async createFolder(galFolderID, folderName) {
        const formData = new FormData();

        formData.append('fileType', "Folder");
        formData.append('galFolderID', galFolderID);
        formData.append('token', Cookies.get('authToken'));
        formData.append('UserID_Session', Cookies.get('userIDSession'));
        formData.append('folderName', folderName);
        formData.append("files", null);

        const request = {
            url: `${API_HOST}/controller/Gallery.asmx/saveFile`,
            cache: false,
            type: 'POST',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async removeFile(galID) {
        const data = {
            galID: galID,
            updateFileMode: "Delete"
        };

        const response = await this.callWebService("/controller/Gallery.asmx/updateFile", data, "POST");
        return response;
    }

    async renameFile(galID, folderRename) {
        const data = {
            galID: galID,
            folderRename: folderRename,
            updateFileMode: "Rename"
        };

        const response = await this.callWebService("/controller/Gallery.asmx/updateFile", data, "POST");
        return response;
    }

    async moveFile(galID, galFolderID) {
        const data = {
            galID: galID,
            galFolderID: galFolderID,
            updateFileMode: "Move"
        };

        const response = await this.callWebService("/controller/Gallery.asmx/updateFile", data, "POST");
        return response;
    }

    async getWhitelist() {
        const data = {};
        const response = await this.callWebService("/controller/Gallery.asmx/getWhitelistFileExt", data, "POST");

        return response;
    }

//#endregion

    /*#region Portfolio*/
    async softDeletePortfolio(portfolioID) {
        const data = {
            jsonStringPortfolioID: portfolioID,
            actionStatus: "VOID"
        };

        const response = await this.callWebService("/controller/Portfolio.asmx/updatePortfolio", data, "POST");
        return response;
    }

    async getPortfolioListByStudentID(str_StudentID) {
        const data = {studentID: str_StudentID};

        return await this.callWebService("/controller/Portfolio.asmx/getPortfolioList", data, "POST");
    }

    async getPostByPortfolioID(str_PortfolioID) {
        const data = {portfolioID: str_PortfolioID};

        return await this.callWebService("/controller/Portfolio.asmx/getPortfolioPostingPost", data, "POST");
    }

    async getPortfolioHeaderDetails(portfolioID) {
        const data = {portfolioID: portfolioID};

        return await this.callWebService("/controller/Portfolio.asmx/getPortfolioHeaderDetails", data, "POST");
    }

    async getStudentPostByType(str_StudentID, str_PostType, numberOfPost, lastPostID) {
        const data = {
            studentID: str_StudentID,
            postType: str_PostType,
            numberOfPost: numberOfPost,
            lastPostID: lastPostID
        };
        return await this.callWebService("/controller/Posting.asmx/getPostStudent", data, "POST");
    }

    async savePortfolio(str_PortfolioDesc, str_StudentID, PortfolioLinkPortfolioID, portfolioTitle, portfolioEnduringThemes, portfolioResearchQuestion, jsonStringPostDetails) {
        const data = {
            portfolioDesc: str_PortfolioDesc,
            studentID: str_StudentID,
            PortfolioLinkPortfolioID: PortfolioLinkPortfolioID,
            portfolioTitle: portfolioTitle,
            portfolioEnduringThemes: portfolioEnduringThemes,
            portfolioResearchQuestion: portfolioResearchQuestion,
            jsonStringPostDetails: jsonStringPostDetails
        };

        return await this.callWebService("/controller/Portfolio.asmx/savePortfolio", data, "POST");
    }

    async approvePortfolio(portfolioID, actionStatus, portfolioEnduringThemesComment, portfolioResearchQuestionComment, jsonStringCommentValue) {
        const data = {
            portfolioID: portfolioID,
            actionStatus: actionStatus,
            portfolioEnduringThemesComment: portfolioEnduringThemesComment,
            portfolioResearchQuestionComment: portfolioResearchQuestionComment,
            jsonStringCommentValue: jsonStringCommentValue,
        };

        let result = await this.callWebService("/controller/Portfolio.asmx/approvePortfolio", data, "POST");
        return result;
    }

    async getApproverComment(itemID) {
        const data = {
            itemID: itemID,
        };

        let result = await this.callWebService("/controller/Approver.asmx/getApproverComment", data, "POST");
        return result;
    }

    /*#endregion*/

    /*#region Promotion*/
    async getPromotionAcademicYear() {
        const data = {};

        const response = await this.callWebService("/controller/Operations.asmx/getMassPromotionsAcademicYear", data, "POST");
        return response;
    }

    async getPromotionLevel() {
        const data = {};

        const response = await this.callWebService("/controller/Operations.asmx/getMassPromotionsLevel", data, "POST");
        return response;
    }

    async getClassByLevelClassID(str_LevelID, str_ClassID) {
        const data = {levelID: str_LevelID, classID: str_ClassID};

        const response = await this.callWebService("/controller/Operations.asmx/getMassPromotionsStudentListByClassLevel", data, "POST");
        return response;
    }

    async getClassByAcademicYear(str_AcademicYearID) {
        const data = {academicYearID: str_AcademicYearID};

        const response = await this.callWebService("/controller/Operations.asmx/getMassPromotionsClassLevelByAcademicYear", data, "POST");
        return response;
    }

    async getClassByAcademicYearBySchoolID(str_AcademicYearID, customSchoolID) {
        const data = {
            academicYearID: str_AcademicYearID,
            customSchoolID: customSchoolID
        };

        const response = await this.callWebService("/controller/Operations.asmx/getMassPromotionsClassLevelByAcademicYear", data, "POST");
        return response;
    }

    async getNextLevel(str_LevelID) {
        const data = {levelID: str_LevelID};

        const response = await this.callWebService("/controller/Operations.asmx/getMassPromotionsNextLevel", data, "POST");
        return response;
    }

    // studentIDArray (student id split by comma ",") & levelID & academicYearID & classID
    async saveStudentPromotions(arrstr_StudentID, str_AcademicYearID, str_LevelID, str_ClassID) {
        const data = {
            studentIDArray: arrstr_StudentID,
            academicYearID: str_AcademicYearID,
            levelID: str_LevelID,
            classID: str_ClassID
        };

        const response = await this.callWebService("/controller/Operations.asmx/saveMassPromotions", data, "POST");
        return response;
    }

    async getAllActiveStudentsBySchool() {
        const data = {};

        const response = await this.callWebService("/controller/Students.asmx/getAllActiveStudentsBySchool", data, "POST");
        return response;
    }

    /*#endregion*/

    /*#region Report*/

    async getReportListByStudentID(str_StudentID) {
        const data = {studentID: str_StudentID};

        return await this.callWebService("/controller/Report.asmx/getReportList", data, "POST");
    }

    async saveReport(str_ReportDesc, str_StudentID, arrstr_PostID, ReportLinkReportID) {
        const data = {
            reportDesc: str_ReportDesc,
            studentID: str_StudentID,
            jsonStringPostID: arrstr_PostID,
            ReportLinkReportID: ReportLinkReportID,
        };

        return await this.callWebService("/controller/Report.asmx/saveReport", data, "POST");
    }

    async getPostByReportID(str_ReportID) {
        const data = {reportID: str_ReportID};

        return await this.callWebService("/controller/Report.asmx/getReport", data, "POST");
    }

    async softDeleteReport(arrstr_ReportID) {
        const data = {
            jsonStringReportID: arrstr_ReportID,
            actionStatus: "VOID"
        };

        const response = await this.callWebService("/controller/Report.asmx/updateReport", data, "POST");
        return response;
    }

    /*#endregion*/

    /*#region Reactions*/
    async getPostReaction(relatedPostID) {
        const data = {relatedPostID: relatedPostID};

        return await this.callWebService("/controller/Posting.asmx/getPostReaction", data, "POST");
    }

    async savePostReaction(relatedPostID, postReaction, postType) {
        const data = {
            relatedPostID: relatedPostID,
            postReaction: postReaction,
            postType: postType,
        };

        return await this.callWebService("/controller/Posting.asmx/savePostReaction", data, "POST");
    }

    async updatePostReaction(relatedPostID, actionMode) {
        const data = {
            relatedPostID: relatedPostID,
            actionMode: actionMode,
        };

        return await this.callWebService("/controller/Posting.asmx/updatePostReaction", data, "POST");
    }

    async getPostByPostID(jsonStringPostID) {
        const data = {
            jsonStringPostID: jsonStringPostID,
        };

        return await this.callWebService("/controller/Posting.asmx/getPostByPostID", data, "POST");
    }

    async getPostByPostIDByStatus(jsonStringPostID, postStatus) {
        const data = {
            jsonStringPostID: jsonStringPostID,
            postStatus: postStatus,
        };

        return await this.callWebService("/controller/Posting.asmx/getPostByPostID", data, "POST");
    }

    /*#endregion*/

    async getAllActiveStudentsByClass(classID) {
        const data = {classID: classID};

        const response = await this.callWebService("/controller/Students.asmx/getAllActiveStudentsByClassSchool", data, "POST");
        return response;
    }

    async getDailyRoutineByStudentID(studentID) {
        const data = {studentID: studentID};

        const response = await this.callWebService("/controller/Daily_Routine.asmx/getKgm_DailyRoutine", data, "POST");
        return response;
    }

    async updateDailyRoutine(btnUpdateObject) {
        const data = {
            studentID: btnUpdateObject.studentID,
            DrID: btnUpdateObject.drID,
            drRemark: btnUpdateObject.drRemark
        };
        const response = await this.callWebService("/controller/Daily_Routine.asmx/updateDailyRoutine", data, "POST");
        return response;
    }

    async addDailyRoutine(btnAddObject) {
        const data = {
            studentIDArray: btnAddObject.studentIDArray,
            drRemark: btnAddObject.DrRemark,
            drStartTime: btnAddObject.DrStartTime,
            drEndTime: btnAddObject.DrEndTime,
            drReferenceType: btnAddObject.DrReferenceType
        };

        const response = await this.callWebService("/controller/Daily_Routine.asmx/addDailyRoutine", data, "POST");
        return response;
    }

    async deleteDailyRoutine(btnDelObject) {
        const data = {
            studentID: btnDelObject.DrStudentID,
            DrID: btnDelObject.drID
        };
        const response = await this.callWebService("/controller/Daily_Routine.asmx/deleteDailyRoutine", data, "POST");
        return response;
    }

    async deString(inputString) {
        const data = {
            inputString: inputString
        };
        const response = await this.callWebService("/controller/Login.asmx/deString", data, "POST");
        return response;
    }

    async getStaffProfileImage() {
        const data = {};
        const response = await this.callWebService("/controller/User.asmx/getStaffProfileImage", data, "POST");
        return response;
    }

    async saveStaffProfileImage(files) {
        const data = new FormData();
        data.append('token', Cookies.get('authToken'));
        data.append('UserSchool_Session', Cookies.get('schoolSession'));
        data.append('UserID_Session', Cookies.get('userIDSession'));
        data.append('UserUniversity_Session', Cookies.get('userUniversitySession'));

        if (files && files.length > 1) {
            for (let key in files) {
                //console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        data.append(`upload_${key}`, files[key]);
                    } else {
                        data.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            data.append("upload", files[0]);
        }

        const request = {
            url: `${API_HOST}/controller/User.asmx/saveStaffProfileImage`,
            cache: false,
            type: 'POST',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async resetPasswordByPassword(userCurrentPassword, userNewPassword) {
        const data = {
            userCurrentPassword: userCurrentPassword,
            userNewPassword: userNewPassword
        };
        const response = await this.callWebService("/controller/Login.asmx/resetPasswordByPassword", data, "POST");
        return response;
    }

    async getAllActiveSchool(schoolCountry, universityCode) {
        const data = {
            schoolCountry: schoolCountry,
            universityCode: universityCode,
        };
        const response = await this.callWebService("/controller/Operations.asmx/getAllActiveSchool", data, "POST");
        return response;
    }

    async saveTransferSchool(studentID, toTransferSchoolID, remark, effectiveDate) {
        const data = {
            studentID: studentID,
            toTransferSchoolID: toTransferSchoolID,
            remark: remark,
            effectiveDate: effectiveDate
        };
        const response = await this.callWebService("/controller/Students.asmx/saveTransferSchool", data, "POST");
        return response;
    }

    async getPendingAcceptTransferSchoolBySchool() {
        const data = {};
        const response = await this.callWebService("/controller/Students.asmx/getPendingAcceptTransferSchoolBySchool", data, "POST");
        return response;
    }

    async saveStudentWithdraw(obj) {
        const data = {
            obj: obj
        };
        const response = await this.callWebService("/controller/Students.asmx/saveStudentWithdraw", data, "POST");
        return response;
    }

    async getClassType() {
        const data = {};
        const response = await this.callWebService("/controller/Class.asmx/getClassType", data, "POST");
        return response;
    }

    async getTeacherListBySchool() {
        const data = {};
        const response = await this.callWebService("/controller/User.asmx/getTeacherListBySchool", data, "POST");
        return response;
    }

    async saveClass(levelID, semesterID, batch, className, maxStudents, classTeacher, saveType) {
        const data = {
            levelID: levelID,
            semesterID: semesterID,
            batch: batch,
            className: className,
            maxStudents: maxStudents,
            classTeacher: classTeacher,
            saveType: saveType,
        };
        const response = await this.callWebService("/controller/Class.asmx/saveClass", data, "POST");
        return response;
    }

    async getClass(academicYear) {
        const data = {
            academicYear: academicYear,
        };
        const response = await this.callWebService("/controller/Course.asmx/getClass", data, "POST");
        return response;
    }

    async getParentClassList(academicYear, modeType) {
        const data = {
            academicYear: academicYear,
            modeType: modeType,
        };
        const response = await this.callWebService("/controller/Course.asmx/getClass", data, "POST");
        return response;
    }

    async updateClass(classStatus, newClassName, maxStudents, currentClassName, levelID, semesterID, classTeacherID) {
        const data = {
            classStatus: classStatus,
            newClassName: newClassName,
            maxStudents: maxStudents,
            currentClassName: currentClassName,
            levelID: levelID,
            semesterID: semesterID,
            classTeacherID: classTeacherID,
        };
        const response = await this.callWebService("/controller/Class.asmx/updateClass", data, "POST");
        return response;
    }

    async updateClassProgramme(classID, classStatus) {
        const data = {
            classID: classID,
            classStatus: classStatus,
        };
        const response = await this.callWebService("/controller/Class.asmx/updateClassProgramme", data, "POST");
        return response;
    }

    async getActiveStudentsByLevelSchool(levelID, classID, semID) {
        const data = {
            levelID: levelID,
            classID: classID,
            semID: semID,
        };
        const response = await this.callWebService("/controller/Students.asmx/getActiveStudentsByLevelSchool", data, "POST");
        return response;
    }

    async saveStudentGraduation(obj) {
        const data = {
            obj: obj
        };
        const response = await this.callWebService("/controller/Students.asmx/saveStudentGraduation", data, "POST");
        return response;
    }

    async saveStudentDocument(files, studentID, fileDescription, uploadMode) {
        const data = new FormData();
        data.append('token', Cookies.get('authToken'));
        data.append('UserSchool_Session', Cookies.get('schoolSession'));
        data.append('UserID_Session', Cookies.get('userIDSession'));
        data.append('UserUniversity_Session', Cookies.get('userUniversitySession'));

        if (files && files.length > 1) {
            for (let key in files) {
                //console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        data.append(`upload_${key}`, files[key]);
                    } else {
                        data.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            data.append("upload", files[0]);
        }

        data.append('studentID', studentID);
        data.append('fileDescription', fileDescription);
        data.append('uploadMode', uploadMode);

        const request = {
            url: `${API_HOST}/controller/Students.asmx/saveStudentDocument`,
            cache: false,
            type: 'POST',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async getStudentDocument(studentID, docuType) {
        const data = {
            studentID: studentID,
            docuType: docuType,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentDocument", data, "POST");
        return response;
    }

    async updateStudentDocument(studentFilesID, actionStatus) {
        const data = {
            studentFilesID: studentFilesID,
            actionStatus: actionStatus,
        };
        const response = await this.callWebService("/controller/Students.asmx/updateStudentDocument", data, "POST");
        return response;
    }

    async getSchoolInfoBySchoolID(schoolID) {
        const data = {
            schoolID: schoolID,
        };
        const response = await this.callWebService("/controller/User.asmx/getSchoolInfoBySchoolID", data, "POST");
        return response;
    }

    async getStudentAllergies(studentID, allergiesType) {
        const data = {
            studentID: studentID,
            allergiesType: allergiesType,
        };
        const response = await this.callWebService("/controller/Students.asmx/getStudentAllergies", data, "POST");
        return response;
    }

    async getPaymentList(studentCourseID,studentID) {
        const data = {
            studentCourseID: studentCourseID,
            studentID:studentID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getPaymentList", data, "POST");
        return response;
    }

    async getItemTransDetailsList(SPDID) {
        const data = {
            SPDID: SPDID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getItemTransDetailsList", data, "POST");
        return response;
    }

    async saveEvent(obj, participantObj) {
        const data = {
            obj: obj,
            participantObj: participantObj,
        };
        const response = await this.callWebService("/controller/Event.asmx/saveEvent", data, "POST");
        return response;
    }

    async getEvent(eventID) {
        const data = {
            eventID: eventID,
        };
        const response = await this.callWebService("/controller/Event.asmx/getEvent", data, "POST");
        return response;
    }
    async getUpComingEvent(){
        const data = {
        };
        const response = await this.callWebService("/controller/Event.asmx/getUpComingEvent", data, "POST");
        return response;
    }
    async getUpComingEventDetail(obj){
        const data = {
            obj:obj,
        };
        const response = await this.callWebService("/controller/Event.asmx/getUpComingEventDetail", data, "POST");
        return response;
    }

    async getEventParticipant(eventParticipantID) {
        const data = {
            eventParticipantID: eventParticipantID,
        };
        const response = await this.callWebService("/controller/Event.asmx/getEventParticipant", data, "POST");
        return response;
    }

    async getEventParticipantByEventID(eventID) {
        const data = {
            eventID: eventID,
        };
        const response = await this.callWebService("/controller/Event.asmx/getEventParticipant", data, "POST");
        return response;
    }

    async updateEvent(obj, participantObj) {
        const data = {
            obj: obj,
            participantObj: participantObj,
        };
        const response = await this.callWebService("/controller/Event.asmx/updateEvent", data, "POST");
        return response;
    }

    async deleteEvent(eventID) {
        const data = {
            eventID: eventID,
        };
        const response = await this.callWebService("/controller/Event.asmx/deleteEvent", data, "POST");
        return response;
    }

    async getStudentGraduationListByClassLevel(str_LevelID, str_ClassID) {
        const data = {levelID: str_LevelID, classID: str_ClassID};

        const response = await this.callWebService("/controller/Students.asmx/getStudentGraduationListByClassLevel", data, "POST");
        return response;
    }

    async getClassStudentList(academicYearID, levelID, className) {
        const data = {
            academicYearID: academicYearID,
            levelID: levelID,
            className: className
        };

        const response = await this.callWebService("/controller/Course.asmx/getClassStudentList", data, "POST");
        return response;
    }

    async getStudentForecastByBranchMonthly() {
        try {
            const data={}
            const response = await this.callWebService("/controller/Students.asmx/getStudentForecastByBranch_Monthly", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async getStudentMovementDetailNewEnroll() {
        try {
            const data={}
            const response = await this.callWebService("/controller/Students.asmx/getStudentMovementDetail_NewEnroll", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async getBusMasterList() {
        try {
            const data={}
            const response = await this.callWebService("/controller/Attendance.asmx/getBusMasterList", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async saveBusMasterList(busNo) {
        try {
            const data={
                busNo: busNo,
            }
            const response = await this.callWebService("/controller/Attendance.asmx/saveBusMasterList", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async updateBusMasterList(busID, busStatus) {
        try {
            const data={
                busID: busID,
                busStatus: busStatus,
            }
            const response = await this.callWebService("/controller/Attendance.asmx/updateBusMasterList", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async getActiveStudentListBySchoolIDOfBusNo(busNo) {
        try {
            const data={
                busNo: busNo,
            }

            const response = await this.callWebService("/controller/Attendance.asmx/getActiveStudentListBySchoolIDOfBusNo", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async updateStudentBusNo(jsonString, status) {
        try {
            const data={
                jsonString: jsonString,
                status: status,
            }

            const response = await this.callWebService("/controller/Attendance.asmx/updateStudentBusNo", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async LoadBusAttendanceList(busNo) {
        try {
            const data={
                busNo: busNo,
            }

            const response = await this.callWebService("/controller/Attendance.asmx/LoadBusAttendanceList", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async updateBusAttendanceList(jsonString) {
        try {
            const data={
                jsonString: jsonString,
            }

            const response = await this.callWebService("/controller/Attendance.asmx/updateBusAttendanceList", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async deletePaymentItem(SPDID,paymentPlanDetailID,studentCourseID){
        const data = {
            SPDID:SPDID,
            paymentPlanDetailID:paymentPlanDetailID,
            studentCourseID:studentCourseID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/deletePaymentItem", data, "POST");
        return response;
    }

    async getCurrencyValueDropdownlist(){
        const data = {
        };
        const response = await this.callWebService("/controller/Billing.asmx/getCurrencyValueDropdownlist", data, "POST");
        return response;
    }

    async saveItem(btnAddItemObject){
        const data={
            SPPD_FK_Student_Course_ID:btnAddItemObject.SPPD_FK_Student_Course_ID,
            SPPD_PayerName:btnAddItemObject.SPPD_PayerName,
            SPPD_PaymentSchedule: btnAddItemObject.SPPD_PaymentSchedule,
            SPPD_PaymentItemType: btnAddItemObject.SPPD_PaymentItemType,
            SPPD_Currency:btnAddItemObject.SPPD_Currency,
            SPPD_PaymentAmount:btnAddItemObject.SPPD_PaymentAmount,
            SPPD_PaymentDate:btnAddItemObject.SPPD_PaymentDate,
            noOfRecurring:btnAddItemObject.noOfRecurring,
            itemDescription:btnAddItemObject.itemDescription,
            itemFromDate:btnAddItemObject.itemFromDate,
            itemToDate:btnAddItemObject.itemToDate,
        };
        const response = await this.callWebService("/controller/Billing.asmx/saveItem", data, "POST");
        return response;
    }

    async getPaymentPlanMasterList(studentCourseID){
        const data= {
            studentCourseID:studentCourseID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getPaymentPlanMasterList", data, "POST");
        return response;
    }

    async getPaymentPlanRules(studentCourseID, jsonString){
        const data= {
            studentCourseID:studentCourseID,
            jsonString: jsonString,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getPaymentPlanRules", data, "POST");
        return response;
    }

    async checkRateFeeEligible(studentID, studentCourseID, rateFeeMode){
        const data= {
            studentID:studentID,
            studentCourseID:studentCourseID,
            rateFeeMode:rateFeeMode,
        };
        const response = await this.callWebService("/controller/Billing.asmx/checkRateFeeEligible", data, "POST");
        return response;
    }

    async getPaymentPlanLevelStartDate(studentCourseID){
        const data= {
            studentCourseID:studentCourseID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getPaymentPlanLevelStartDate", data, "POST");
        return response;
    }

    async getPaymentPlanRuleDetails(paymentPlanRuleID){
        const data= {
            paymentPlanRuleID:paymentPlanRuleID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getPaymentPlanRuleDetails", data, "POST");
        return response;
    }

    async checkSiblingDiscountEligible(studentID){
        const data= {
            studentID:studentID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/checkSiblingDiscountEligible", data, "POST");
        return response;
    }

    async getSiblingList(studentID)
    {
        const data= {
            studentID:studentID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getSiblingList", data, "POST");
        return response;
    }

    async getPaymentPlanMasterDetails(courseFeeSchemeID)
    {
        const data= {
            courseFeeSchemeID:courseFeeSchemeID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getPaymentPlanMasterDetails", data, "POST");
        return response;
    }

    async getPaymentPlanMasterDetailsList(courseFeeSchemeID)
    {
        const data= {
            courseFeeSchemeID:courseFeeSchemeID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getPaymentPlanMasterDetailsList", data, "POST");
        return response;
    }

    async getStudentCourseSemesterInfo(studentID,studentCourseID)
    {
        const data= {
            studentID:studentID,
            studentCourseID:studentCourseID
        };
        const response = await this.callWebService("/controller/Course.asmx/getStudentCourseSemesterInfo", data, "POST");
        return response;
    }

    async savePaymentPlan(btnAddPaymentPlanObject)
    {
        const data= {
            btnAddPaymentPlanObject:btnAddPaymentPlanObject,
        };
        const response = await this.callWebService("/controller/Billing.asmx/savePaymentPlan", data, "POST");
        return response;
    }

    async checkStaffDiscountEligible(studentID)
    {
        const data= {
            studentID:studentID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/checkStaffDiscountEligible", data, "POST");
        return response;
    }

    async getPaymentPlanStaffRules(studentID)
    {
        const data= {
            studentID:studentID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getPaymentPlanStaffRules", data, "POST");
        return response;
    }

    async getUserDetails(conID)
    {
        const data= {
            conID:conID,
        };
        const response = await this.callWebService("/controller/User.asmx/getUserDetails", data, "POST");
        return response;
    }

    async checkStudentPaymentPlan(studentCourseID)
    {
        const data= {
            studentCourseID:studentCourseID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/checkStudentPaymentPlan", data, "POST");
        return response;
    }

    async savePaymentPlanDiscount(obj)
    {
        const data= {
            obj:obj,
        };
        const response = await this.callWebService("/controller/Billing.asmx/savePaymentPlanDiscount", data, "POST");
        return response;
    }

    async generateInvoice(obj, studentID, studentCourseID, inputPaymentDueDate, inputRemarks, action, invoiceName)
    {
        const data= {
            obj:obj,
            studentID:studentID,
            studentCourseID:studentCourseID,
            inputPaymentDueDate:inputPaymentDueDate,
            inputRemarks:inputRemarks,
            action:action,
            invoiceName:invoiceName,
        };
        const response = await this.callWebService("/controller/Billing.asmx/generateInvoice", data, "POST");
        return response;
    }

    async getReInvoice(studentID, studentCourseID, invoiceName)
    {
        const data= {
            studentID:studentID,
            studentCourseID:studentCourseID,
            invoiceName:invoiceName,

        };
        const response = await this.callWebService("/controller/Billing.asmx/getReinvoiceActiveList", data, "POST");
        return response;
    }

    async generateReceipt(obj, studentID, studentCourseID, action)
    {
        const data= {
            obj:obj,
            studentID:studentID,
            studentCourseID:studentCourseID,
            action:action,
        };
        const response = await this.callWebService("/controller/Billing.asmx/generateReceipt", data, "POST");
        return response;
    }

    async getReceiptWithTransactionHistory(Obj,studentID,invoiceName)
    {
        const data= {
            receiptNameListObj:Obj,
            studentID:studentID,
            invoiceName:invoiceName,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getTransactionHistoryList", data, "POST");
        return response;
    }

    async getLeftOverPaymentReceipt(Obj,studentID,invoiceName,studentCourseID)
    {
        const data= {
            receiptNameListObj:Obj,
            studentID:studentID,
            invoiceName:invoiceName,
            studentCourseID:studentCourseID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getLeftoverPayment", data, "POST");
        return response;
    }

    async getActivePaymentNoTransactionHistoryList(studentCourseID, value)
    {
        const data= {
            studentCourseID:studentCourseID,
            transType:value,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getActivePaymentNoTransactionHistoryList", data, "POST");
        return response;
    }

    async getInvoiceDetails(InvHeaderID)
    {
        const data= {
            InvHeaderID:InvHeaderID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getInvoiceDetails", data, "POST");
        return response;
    }

    async getInvoiceDetailsList(InvHeaderID)
    {
        const data= {
            InvHeaderID:InvHeaderID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getInvoiceDetailsList", data, "POST");
        return response;
    }

    async generateCN(obj)
    {
        const data= {
            obj:obj,
        };
        const response = await this.callWebService("/controller/Billing.asmx/generateCN", data, "POST");
        return response;
    }

    async getTransactionDocumentPdf(documentType,invRecID)
    {
        const data= {
            DocumentType:documentType,
            InvRecID:invRecID,
        };
        const response = await this.callWebService("/controller/Billing.asmx/getTransactionDocument", data, "POST");
        return response;
    }

    async updateAttendanceListWithTemperature(deviceOutput) {
        try {
            const data={
                deviceOutput: deviceOutput,
            };

            const response = await this.callWebService("/controller/Attendance.asmx/updateAttendanceListWithTemperature", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async getNumberOfAttendanceAllClassBySchool() {
        try {
            const data={
            };

            const response = await this.callWebService("/controller/Attendance.asmx/getNumberOfAttendanceAllClassBySchool", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async getEcaMasterList() {
        try {
            const data={
            };

            const response = await this.callWebService("/controller/Attendance.asmx/getEcaMasterList", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async saveEcaMasterList(ecaName) {
        try {
            const data={
                ecaName: ecaName,
            };

            const response = await this.callWebService("/controller/Attendance.asmx/saveEcaMasterList", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async updateEcaMasterList(ecaID, ecaStatus) {
        try {
            const data={
                ecaID: ecaID,
                ecaStatus: ecaStatus,
            };

            const response = await this.callWebService("/controller/Attendance.asmx/updateEcaMasterList", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async getEcaDetails(ecaID, EcaDtlDateAttend) {
        try {
            const data={
                ecaID: ecaID,
                EcaDtlDateAttend: EcaDtlDateAttend,
            };

            const response = await this.callWebService("/controller/Attendance.asmx/getEcaDetails", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async getEcaDetailsUnAssignStudent(ecaID, ecaDtlDateAttend) {
        try {
            const data={
                ecaID: ecaID,
                ecaDtlDateAttend: ecaDtlDateAttend,
            };

            const response = await this.callWebService("/controller/Attendance.asmx/getEcaDetailsUnAssignStudent", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async getEcaSummaryGroupByEcaID(ecaID) {
        try {
            const data={
                ecaID: ecaID
            };

            const response = await this.callWebService("/controller/Attendance.asmx/getEcaSummaryGroupByEcaID", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async saveEcaDetails(jsonString, mode) {
        try {
            const data={
                jsonString: jsonString,
                mode: mode
            };

            const response = await this.callWebService("/controller/Attendance.asmx/saveEcaDetails", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async updateEcaDetails(ecaDtlID, ecaDtlStatus) {
        try {
            const data={
                ecaDtlID: ecaDtlID,
                ecaDtlStatus: ecaDtlStatus
            };

            const response = await this.callWebService("/controller/Attendance.asmx/updateEcaDetails", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async getEcaBySchoolIDDate(dateAttend) {
        try {
            const data={
                dateAttend: dateAttend
            };

            const response = await this.callWebService("/controller/Attendance.asmx/getEcaBySchoolIDDate", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async LoadEcaAttendanceList(ecaID) {
        try {
            const data={
                ecaID: ecaID
            };

            const response = await this.callWebService("/controller/Attendance.asmx/LoadEcaAttendanceList", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async updateEcaAttendanceList(jsonString) {
        try {
            const data={
                jsonString: jsonString
            };

            const response = await this.callWebService("/controller/Attendance.asmx/updateEcaAttendanceList", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async generateEcaAttendanceReport(jsonString) {
        try {
            const data={
                jsonString: jsonString
            };

            const response = await this.callWebService("/controller/Attendance.asmx/generateEcaAttendanceReport", data, "POST");
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async getReceiptList(invoiceName,receiptName){
        try{
            const data={
                receiptName:receiptName,
                invoiceName:invoiceName,
            };
            const response = await this.callWebService("/controller/Billing.asmx/getReceiptList", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async getPayee(studentID_Index){
        try{
            const data={
                studentID_Index:studentID_Index,
            };
            const response = await this.callWebService("/controller/Students.asmx/getPayee", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async getReceiptDetails(receiptID){
        try{
            const data={
                receiptID:receiptID,
            };
            const response = await this.callWebService("/controller/Billing.asmx/getReceiptDetails", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async getUnbilledBatchPaymentList(schoolID,courseID,classID,fromDate,toDate){
        try{
            const data={
                schoolID:schoolID,
                // academicYearID:academicYearID,
                courseID:courseID,
                classID:classID,
                fromDate:fromDate,
                toDate:toDate,
            };
            const response = await this.callWebService("/controller/Billing.asmx/getUnbilledBatchPaymentList", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async cancelReceipt(receiptID){
        try{
            const data={
                receiptID:receiptID,
            };
            const response = await this.callWebService("/controller/Billing.asmx/cancelReceipt", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async importECADetailsByCSVExcel(files, ecaID) {
        const data = new FormData();
        data.append('token', Cookies.get('authToken'));
        data.append('UserSchool_Session', Cookies.get('schoolSession'));
        data.append('UserID_Session', Cookies.get('userIDSession'));
        data.append('UserUniversity_Session', Cookies.get('userUniversitySession'));

        if (files && files.length > 1) {
            for (let key in files) {
                //console.log(key);
                if (files.hasOwnProperty(key)) {
                    // console.log(files[key]);
                    if (key > 0) {
                        data.append(`upload_${key}`, files[key]);
                    } else {
                        data.append("upload", files[key]);
                    }
                }
            }
        } else if (files) {
            data.append("upload", files[0]);
        }

        data.append('ecaID', ecaID);

        const request = {
            url: `${API_HOST}/controller/Attendance.asmx/importECADetailsByCSVExcel`,
            cache: false,
            type: 'POST',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            async: false,
            json: false,
            success: function (response) {
                return response;
            }
        };

        let response = await jQuery.ajax(request);
        if (typeof response === "string") {
            response = JSON.parse(response);
        }
        return response;
    }

    async getValueFromGeneralSearch(searchValueInput){
        try{
            const data={
                searchValueInput:searchValueInput,
            };
            const response = await this.callWebService("/controller/General.asmx/getValueFromGeneralSearch", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async generatePortfolioPDF(portfolioID){
        try{
            const data={
                portfolioID: portfolioID,
            };
            const response = await this.callWebService("/controller/Portfolio.asmx/generatePortfolioPDF", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async getTransferPendingScheduleList(){
        try{
            const data={

            };
            const response = await this.callWebService("/controller/Operations.asmx/getTransferPendingScheduleList", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async updateTransferPendingScheduleList(studentSchoolID, status){
        try{
            const data={
                studentSchoolID: studentSchoolID,
                status: status
            };
            const response = await this.callWebService("/controller/Operations.asmx/updateTransferPendingScheduleList", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async getWithdrawGraduatePendingScheduleList(changeType){
        try{
            const data={
                changeType: changeType
            };
            const response = await this.callWebService("/controller/Operations.asmx/getWithdrawGraduatePendingScheduleList", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async updateWithdrawGraduatePendingScheduleList(studentGraduationDatesID, status){
        try{
            const data={
                studentGraduationDatesID: studentGraduationDatesID,
                status: status
            };
            const response = await this.callWebService("/controller/Operations.asmx/updateWithdrawGraduatePendingScheduleList", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async getReminderEmail(noOfReminder,invoiceNo,studentCourseID,studentID){
        try{
            const data={
                noOfReminder: noOfReminder,
                invoiceNo: invoiceNo,
                studentCourseID:studentCourseID,
                studentID:studentID
            };
            const response = await this.callWebService("/controller/Billing.asmx/getReminderEmail", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    async sendReminderEmail(emailTo,emailSubject,emailMessage,invoiceNo){
        try{
            const data={
                emailTo: emailTo,
                emailSubject: emailSubject,
                emailMessage:emailMessage,
                invoiceNo:invoiceNo
            };
            const response = await this.callWebService("/controller/Billing.asmx/sendReminderEmail", data, "POST");
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }
}

