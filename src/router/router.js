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
import vuetour from "../pages/vuetour";

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
            path: '/vuetour',
            name: 'Vue Tour',
            component: vuetour
        },
    ]
});

export default router;