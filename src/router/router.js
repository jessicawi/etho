import Vue from 'vue';
import VueRouter from 'vue-router';
import loginPage from "../pages/LoginPage";
import homePage from "../pages/HomePage";
import forgotPassword from "../pages/ForgotPassword";
import resetEmail from "../pages/ResetEmail";
import resetPassword from "../pages/ResetPassword";
import studentList from "../pages/StudentList";
import student from "../pages/Student";
import studentEditLevel from "../pages/StudentEditLevel";
import studentEditClass from "../pages/StudentEditClass";
import parentList from "../pages/ParentList";
import parent from "../pages/Parent";
import manageRelationship from "../pages/ManageRelationship";
import staffNewsfeed from "../pages/StaffPost";
import pendingPost from "../pages/PendingPost";
import parentRegister from "../pages/ParentRegister";
import attendanceList from "../pages/AttendanceList";
import portfolio from "../pages/Portfolio";
import gallery from "../pages/Gallery";
import promotion from "../pages/Promotion";
import report from "../pages/Report";
import notFound from "../pages/NotFound";
import portfolioPreview from "../pages/PortfolioPreview";
import dailyRoutine from "../pages/DailyRoutine";
import pendingApprover from "../pages/PendingApprover";
import postapprove from "../pages/PostApprove";
import myAccount from "../pages/MyAccount";
import myChild from "../pages/MyChild";
import approvermaster from "../pages/ApproverMaster";
import transferIn from "../pages/TransferIn";
import studentgraduation from "../pages/StudentGraduation";
import classManagement from "../pages/ClassManagement";
import studentPaymentPlan from "../pages/StudentPaymentPlan";
import event from "../pages/Event";
import eventEmail from "../pages/EventBlastEmail";
import busMaster from "../pages/BusMaster";
import dailyRoutineMassUpdate from "../pages/DailyRoutineMassUpdate";
import busAttendance from "../pages/BusAttendance";
import ecaMaster from "../pages/EcaMaster";
import ecaAttendance from "../pages/EcaAttendance";
import attendanceReport from "../pages/AttendanceReport";
import studentReceiptDetail from "../pages/StudentReceiptDetail";
import studentListPayment from "../pages/StudentListPayment";
import studentCourseList from "../pages/StudentCourseList";
import batchPaymentList from "../pages/BatchPaymentList";
import cancelSchedule from "../pages/CancelSchedule";
import classAttendanceReport from "../pages/ClassAttendanceReport";
import invoiceList from "../pages/InvoiceList";
import attendanceMaster from "../pages/AttendanceMaster";
import classOverview from "../pages/ClassOverview";
import portfolioMedia from "../pages/PortfolioMedia";
import printClassStudent from "../pages/PrintClassStudent";
import plannerMaster from "../pages/PlannerMaster";
import plannerAssignSchool from "../pages/PlannerAssignSchool";
import plannerAssignStudent from "../pages/PlannerAssignStudent";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: homePage
        },
        {
            path: '/login',
            name: 'Login',
            component: loginPage,
            meta: {bodyClass: 'login'}
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: forgotPassword
        },
        {
            path: '/reset-email',
            name: 'resetEmail',
            component: resetEmail,
            meta: {bodyClass: 'resetEmail'}
        },
        {
            path: '/reset-password',
            name: 'ResetPassword',
            component: resetPassword,
            meta: {bodyClass: 'resetPassword'}
        },
        {
            path: '/student-list',
            name: 'Student List',
            component: studentList
        },
        {
            path: '/student-list-payment',
            name: 'Student List Payment',
            component: studentListPayment
        },
        {
            path: '/studentCourse-List',
            name: 'Student Course List',
            component: studentCourseList
        },
        {
            path: '/student',
            name: 'Student',
            component: student
        },
        {
            path: '/student-edit-level',
            name: 'Student Edit Level',
            component: studentEditLevel
        },
        {
            path: '/student-edit-class',
            name: 'Student Edit Class',
            component: studentEditClass
        },
        {
            path: '/parent-list',
            name: 'Parent List',
            component: parentList
        },
        {
            path: '/parent',
            name: 'Parent',
            component: parent
        },
        {
            path: '/manage-relationship',
            name: 'Manage Relationship',
            component: manageRelationship
        },
        {
            path: '/register/parent',
            name: 'Parent Registration',
            component: parentRegister,
            meta: {bodyClass: 'parent-register'}
        },
        {
            path: '/feed',
            name: 'Latest Update',
            component: staffNewsfeed,
        },
        {
            path: '/post/pending',
            name: 'Pending Post',
            component: pendingPost,
        },
        {
            path: '/attendancelist',
            name: 'Attendance List',
            component: attendanceList,
        }, {
            path: '/Portfolio',
            name: 'Portfolio',
            component: portfolio
        }, {
            path: '/PortfolioPreview',
            name: 'Portfolio Preview',
            component: portfolioPreview
        },{
            path: '/Gallery',
            name: 'Gallery',
            component: gallery
        }, {
            path: '/promotion',
            name: 'promotion',
            component: promotion
        }, {
            path: '/report',
            name: 'report',
            component: report
        },{
            path: '*',
            name: 'Not Found',
            component: notFound
        },
        {
            path: '/DailyRoutine',
            name: 'Daily Routine',
            component: dailyRoutine
        },
        {
            path: '/DailyRoutineMassUpdate',
            name: 'Daily Routine Mass Update',
            component: dailyRoutineMassUpdate
        },
        {
            path: '/PendingApprover',
            name: 'Pending Approver',
            component: pendingApprover
        },
        {
            path: '/PostApprove',
            name: 'Post Approve',
            component: postapprove
        },
        {
            path: '/MyAccount',
            name: 'My Account',
            component: myAccount
        },
        {
            path: '/MyChild',
            name: 'My Child',
            component: myChild
        },
        {
            path: '/ApproverMaster',
            name: 'Approver Master',
            component: approvermaster
        },
        {
            path: '/TransferIn',
            name: 'Transfer In',
            component: transferIn
        },
        {
            path: '/StudentGraduation',
            name: 'Student Graduation',
            component: studentgraduation
        },
        {
            path: '/ClassManagement',
            name: 'Class Management',
            component: classManagement
        },
        {
            path: '/StudentPaymentPlan',
            name: 'Student Payment Plan',
            component: studentPaymentPlan
        },
        {
            path: '/Event',
            name: 'Event',
            component: event
        },
        {
            path: '/EventEmail',
            name: 'EventEmail',
            component: eventEmail
        },
        {
            path: '/BusMaster',
            name: 'Bus Master',
            component: busMaster
        },
        {
            path: '/BusAttendance',
            name: 'Bus Attendance',
            component: busAttendance
        },
        {
            path: '/EcaMaster',
            name: 'ECA Master',
            component: ecaMaster
        },
        {
            path: '/EcaAttendance',
            name: 'ECA Attendance',
            component: ecaAttendance
        },
        {
            path: '/AttendanceReport',
            name: 'Attendance Report',
            component: attendanceReport
        },
        {
            path: '/StudentReceiptDetail',
            name: 'StudentReceiptDetail',
            component: studentReceiptDetail
        },
        {
            path:'/BatchPaymentList',
            name:'BatchPaymentList',
            component: batchPaymentList,
        },
        {
            path:'/CancelSchedule',
            name:'CancelSchedule',
            component: cancelSchedule,
        },
        {
            path:'/ClassAttendanceReport',
            name:'ClassAttendanceReport',
            component: classAttendanceReport,
        },
        {
            path:'/InvoiceList',
            name:'InvoiceLIst',
            component: invoiceList,
        },
        {
            path:'/AttendanceMaster',
            name:'AttendanceMaster',
            component: attendanceMaster,
        },
        {
            path:'/ClassOverview',
            name:'ClassOverview',
            component: classOverview,
        },
        {
            path:'/PortfolioMedia',
            name:'PortfolioMedia',
            component: portfolioMedia,
            meta: {bodyClass: 'portfolioMedia'}
        },
        {
            path:'/PrintClassStudent',
            name:'PrintClassStudent',
            component: printClassStudent,
        },
        {
            path:'/PlannerMaster',
            name:'Planner Master',
            component: plannerMaster,
        },
        {
            path:'/PlannerAssignSchool',
            name:'Planner Assign School',
            component: plannerAssignSchool,
        },
        {
            path:'/PlannerAssignStudent',
            name:'Planner Assign Student',
            component: plannerAssignStudent,
        },
    ]
});

export default router;