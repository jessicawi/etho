<template>
    <div class="Content">
        <div class="homeBg"></div>
        <!--<Step/>-->
        <!--<div>-->
        <!--<b>session token:</b> {{token}}<br/><br/>{{userType}}<br/><br/>-->
        <!--<div v-for="object in list" :key="object.UserIDSession">-->
        <!--{{object.UserIDSession}}-->
        <!--</div>-->
        <!--<h4>USER MENU</h4>-->
        <!--<div style="height: 100px;overflow-y: scroll;width:80%;margin: auto;border:1px solid;">{{usermenu}}</div>-->
        <!--</div>-->
        <div class="container">
            <div class="dashboard-title"><h4 class="text-left" style="color: white;">Overview</h4></div>
            <div class="row mb-3">
                <div class="col-md-3 student">
                    <div class="overview__item">
                        <div class="overview__icon"><img src="../assets/home-student.png"/></div>
                        <div class="overview__desc"><span
                                class="large">{{activeStudent}}</span><span>Students</span></div>
                        <div class="quicklink" v-if="isParent !== 'Teacher'">
                            <a href="/student">NEW STUDENT</a>
                            <a href="/student-list?mode=Search">VIEW ALL</a>
                        </div>
                        <div class="quicklink" v-if="isParent === 'Teacher'">
                            <a href="#">CLASSES</a>
                            <a href="#">STUDENT LIST</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 teacher">
                    <div class="overview__item">
                        <div class="overview__icon"><img src="../assets/home-enroll.png"/></div>
                        <div class="overview__desc"><span
                                class="large">{{enrollment}}</span><span>New Enrollment</span></div>
                        <!--<div class="quicklink" v-if="isParent !== 'Teacher'">-->
                        <!--<a href="/parent-list">VIEW / EDIT PARENT</a>-->
                        <!--</div>-->
                    </div>
                </div>
                <div class="col-md-3 course">
                    <div class="overview__item">
                        <div class="overview__icon"><img src="../assets/home-withdraw.png"/></div>
                        <div class="overview__desc"><span class="large">{{withdraw}}</span><span>Withdraw</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 attendance">
                    <div class="overview__item">
                        <div class="overview__icon"><img src="../assets/home-school.png"/></div>
                        <div class="overview__desc"><span
                                class="large">{{transfer}}</span><span>Transferred</span></div>
                    </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-lg-12 ">
                    <div class="chartBox">
                        <div class="dashboard-title"><h4 class="text-left">Statistic</h4></div>
                        <div class="small">
                            <div class="chartbox-item" v-loading="loading">
                                <div class="empty-list_image " v-if="emptyImage===true">
                                    <strong class="text-left">No Record Yet...</strong>
                                    <img src="../assets/notfound.png"/>
                                </div>
                                <bar-chart
                                        v-if="isLoaded"
                                        :chartdata="chartdata"
                                        :options="options"/>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="col-md-3 custom-wrapper">-->
                <!--<div class="dashboard-title"><h5 class="text-left">Recent Feed</h5></div>-->
                <!--<div class="dashboard-subtitle">-->
                <!--<el-tooltip class="item" effect="dark" content="View All Activities" placement="top-start">-->
                <!--<a href="/feed">-->
                <!--<small>VIEW ALL</small>-->
                <!--</a>-->
                <!--</el-tooltip>-->
                <!--</div>-->
                <!--<hr/>-->
                <!--<div class="dashboard-studentList">-->
                <!--<div class="" v-for="object in post" :key="`${object.PostID}`">-->
                <!--<PostComponent-->
                <!--:parent-post="object"-->
                <!--:hideComment="true"-->
                <!--:isHome="true"-->
                <!--/>-->
                <!--<hr/>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
            </div>
            <div class="row mb-3">
                <div class="col-lg-12 ">
                    <div class="chartBox">
                        <div class="dashboard-title"><h4 class="text-left">Student Forecast</h4></div>
                        <div class="small">
                            <!--<line-chart></line-chart>-->
                            <div class="chartbox-item" v-loading="loading">
                                <div class="empty-list_image " v-if="emptyImage===true">
                                    <strong>No Record Yet...</strong>
                                    <img src="../assets/notfound.png"/>
                                </div>
                                <span class="d-block text-left" v-if="emptyImage!==true">Student</span>
                                <bar-chart
                                        :chartdata="chartdata2"
                                        v-if="isLoaded"/>
                                <span class="text-right" v-if="emptyImage!==true">Month</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-lg-12 ">
                    <div class="chartBox">
                        <div class="dashboard-title"><h4 class="text-left">Student Movement</h4></div>
                        <div class="small ">
                            <!--<line-chart></line-chart>-->
                            <div class="chartbox-item" v-loading="loading">
                                <div class="empty-list_image " v-if="emptyImage===true">
                                    <strong>No Record Yet...</strong>
                                    <img src="../assets/notfound.png"/>
                                </div>
                                <span class="d-block text-left" v-if="emptyImage!==true">Student</span>
                                <bar-chart
                                        v-if="isLoaded"
                                        :chartdata="chartdata3"
                                        :options="options"/>
                                <!--<double-bar-chart-->
                                <!--:chartdata2="chartdata3"-->
                                <!--v-if="isLoaded"/>-->
                                <span class="text-right" v-if="emptyImage!==true">Month</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class=" mb-3 home-news">-->
            <!--<div class="dashboard-title"><h4 class="text-left float-left">Upcoming</h4><a class="float-right"-->
            <!--href="#">MORE </a></div>-->
            <!--<div class="row">-->
            <!--<div class="col-md-4 mt-2">-->
            <!--<div class="home-news__item custom-wrapper">-->
            <!--<strong>Key facts about our school</strong>-->
            <!--<div class="thumbnail">-->
            <!--<img src="../assets/news1.jpg" title="News"/>-->
            <!--</div>-->
            <!--<div class="news-content">-->
            <!--we offer academic, social and personal success for every student. Through opportunities-->
            <!--to learn from the best, experiences beyond the ordinary, and the encouragement to-->
            <!--achieve-->
            <!--more than what they thought possible.-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="col-md-4 mt-2">-->
            <!--<div class="home-news__item custom-wrapper">-->
            <!--<strong>Key facts about our school</strong>-->
            <!--<div class="thumbnail">-->
            <!--<img src="../assets/news2.jpg" title="News"/>-->
            <!--</div>-->
            <!--<div class="news-content">-->
            <!--we offer academic, social and personal success for every student. Through opportunities-->
            <!--to learn from the best, experiences beyond the ordinary, and the encouragement to-->
            <!--achieve-->
            <!--more than what they thought possible.-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="col-md-4 mt-2">-->
            <!--<div class="home-news__item custom-wrapper">-->
            <!--<strong>Key facts about our school</strong>-->
            <!--<div class="thumbnail">-->
            <!--<img src="../assets/news3.jpg" title="News"/>-->
            <!--</div>-->
            <!--<div class="news-content">-->
            <!--we offer academic, social and personal success for every student. Through opportunities-->
            <!--to learn from the best, experiences beyond the ordinary, and the encouragement to-->
            <!--achieve-->
            <!--more than what they thought possible.-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>
<script>
    // import Step from "../components/Step";
    import DataSource from "../data/datasource";
    import PostComponent from "../components/postCompnent";
    import barChart from "../components/charts/barChart.vue";
    import {countDuplicates} from "../helper/utily";
    import Cookies from "js-cookie";
    import DoubleBarChart from "../components/charts/doubleBarChart";

    export default {
        name: 'homePage',
        data() {
            return {
                token: null,
                userType: null,
                list: [],
                results: "",
                usermenu: "",
                dataPoints: null,
                height: 200,
                isParent: "",
                activeStudent: "",
                enrollment: "",
                withdraw: "",
                transfer: "",
                post: [],
                isLoaded: false,
                countedCrs: {},
                loading: false,
                emptyImage: false,
                noresponse: false,
                chartdata: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Students by Crs',
                            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(0, 123, 255, 0.6)', 'rgba(23, 162, 184, 0.6)', 'rgba(255, 193, 7, 0.6)', 'rgba(237, 33, 124, 0.6)', 'rgba(0, 186, 255, 0.6)', 'rgba(18, 189, 215, 0.6)', 'rgba(255, 181, 0, 0.6)', 'rgba(154, 244, 23, 0.6)'],
                            hoverBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(0, 123, 255, 1)', 'rgba(23, 162, 184, 1)', 'rgba(255, 193, 7, 1)', 'rgba(237, 33, 124, 1)', 'rgba(0, 186, 255, 1)', 'rgba(18, 189, 215, 1)', 'rgba(255, 181, 0, 1)', 'rgba(154, 244, 23, 1)'],
                            borderColor: 'rgba(237, 240, 244, 1)',
                            borderWidth: 5,
                            data: []
                        }
                    ]
                },
                chartdata2: {
                    labels: [],
                    datasets: [
                        {
                            type: 'bar',
                            label: '',
                            backgroundColor: 'rgba(0, 123, 255, 0.6)',
                            fill: false,
                            data: []
                        },
                        {
                            type: 'bar',
                            label: '',
                            backgroundColor: 'rgba(255, 193, 7, 0.6)',
                            fill: false,
                            data: []
                        }
                    ]
                },
                chartdata3: {
                    labels: [],
                    datasets: [
                        {
                            label: "",
                            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(0, 123, 255, 0.6)', 'rgba(23, 162, 184, 0.6)', 'rgba(255, 193, 7, 0.6)', 'rgba(237, 33, 124, 0.6)', 'rgba(0, 186, 255, 0.6)', 'rgba(18, 189, 215, 0.6)', 'rgba(255, 181, 0, 0.6)', 'rgba(154, 244, 23, 0.6)'],
                            hoverBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(0, 123, 255, 1)', 'rgba(23, 162, 184, 1)', 'rgba(255, 193, 7, 1)', 'rgba(237, 33, 124, 1)', 'rgba(0, 186, 255, 1)', 'rgba(18, 189, 215, 1)', 'rgba(255, 181, 0, 1)', 'rgba(154, 244, 23, 1)'],
                            borderColor: 'rgba(237, 240, 244, 1)',
                            borderWidth: 5,
                            data: []
                        }
                    ]
                },
                chartdata3CustomLabel: [],
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            barPercentage: 0.8
                        }]
                    }
                },
                options3: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            barPercentage: 0.8
                        }]
                    }
                }
            };
        },
        components: {
            DoubleBarChart,
            PostComponent,
            barChart
            // Step,
            // LineChart
        },
        async mounted() {
            try {

                this.loading = true;
                this.isParent = Cookies.get('userTypeSession');
                this.showSession();
                // user menu
                if (this.isParent !== "Parent") {
                    this.results = response;

                    // window.location.replace("/");
                }
                let response = await DataSource.shared.getUserMenu();
                if (response) {
                    switch (response.code) {
                        case "2":
                            this.emptyImage = true;
                            break;
                        case "99":
                            this.noresponse = true;
                            this.loading = false;
                            break;
                    }
                    this.list = response.Table;
                    this.usermenu = response;
                }

                //login text

                const isLogin = Cookies.get('authToken');
                if (isLogin && isLogin !== "null") {
                    this.results = `You already logged in`;
                    // window.location.replace("/");
                }
                // Overwriting base render method with actual data.
                setInterval(() => {
                    this.fillData();
                }, 2000);


                // activeStudent
                let activeStudentResponse = await DataSource.shared.getAllActiveStudentsBySchool();
                if (activeStudentResponse) {
                    switch (activeStudentResponse.code) {
                        case "2":
                            this.activeStudent = `0`;
                            break;
                        case "99":
                            this.emptyImage = true;
                            this.loading = false;
                            break;

                    }
                    if (activeStudentResponse.Table) {
                        if (activeStudentResponse.Table && activeStudentResponse.Table.length > 0) {
                            this.activeStudent = activeStudentResponse.Table.length;
                        }
                        const crsNames = activeStudentResponse.Table.map(d => d.CRS_Course_Name);
                        this.chartdata.labels = [...new Set(crsNames)];
                        this.countedCrs = countDuplicates(crsNames);
                        this.chartdata.datasets[0].data = await this.chartdata.labels.map(d => {
                            for (let key in this.countedCrs) {
                                if (d === key) {
                                    return this.countedCrs[d];
                                }
                            }
                        });
                    }
                }

                //enrollment
                let enrollmentResponse = await DataSource.shared.getStudentEnrollment();
                if (enrollmentResponse) {
                    switch (enrollmentResponse.code) {
                        case "2":
                            this.enrollment = `0`;
                            break;
                    }
                    if (enrollmentResponse.Table) {
                        if (enrollmentResponse.Table && enrollmentResponse.Table.length > 0) {
                            this.enrollment = enrollmentResponse.Table.length;
                        }
                    }
                }

                //withdraw
                let withdrawResponse = await DataSource.shared.getWithdrawStudent();
                if (withdrawResponse) {
                    switch (withdrawResponse.code) {
                        case "2":
                            this.withdraw = `0`;
                            break;
                    }
                    if (withdrawResponse.Table) {
                        if (withdrawResponse.Table && withdrawResponse.Table.length > 0) {
                            this.withdraw = withdrawResponse.Table.length;
                        }
                    }
                }


                //transfer
                let transferResponse = await DataSource.shared.getTransferStudent();
                if (transferResponse) {
                    switch (transferResponse.code) {
                        case "2":
                            this.transfer = `0`;
                            break;
                    }
                    if (transferResponse.Table) {
                        if (transferResponse && transferResponse.Table && transferResponse.Table.length > 0) {
                            this.transfer = transferResponse.Table.length;
                        }
                    }
                }


                // graph

                //feed
                if (this.isParent === "Parent") {
                    let Parentresponse = await DataSource.shared.getParentPost();
                    if (Parentresponse.Table) {
                        for (let item of Parentresponse.Table) {
                            const fileRes = await DataSource.shared.getPostFile(item.PostID);
                            if (fileRes.Table) {
                                item.postFiles = fileRes.Table;
                            }
                        }
                        this.post = Parentresponse.Table;
                    }
                } else {
                    let Staffresponse = await DataSource.shared.getStaffPostHome();
                    if (Staffresponse.Table) {
                        for (let item of Staffresponse.Table) {
                            const fileRes = await DataSource.shared.getPostFile(item.PostID);
                            if (fileRes.Table) {
                                item.postFiles = fileRes.Table;
                            }
                        }
                        this.post = Staffresponse.Table;
                    }
                }

                //this.showCompareData();
                const forecastResponse = await DataSource.shared.getStudentForecastByBranchMonthly();
                if (forecastResponse) {
                    let compareData = forecastResponse.Table;

                    console.log("compareData", compareData);

                    let yearGroup = [];
                    for (const d of compareData) {
                        if (!yearGroup.includes(d.Year)) {
                            yearGroup.push(d.Year);
                        }
                    }

                    console.log("yearGroup", yearGroup);
                    yearGroup.forEach((d, i) => {
                        const data = compareData.filter(a => {
                            return a.Year === d;
                        });
                        console.log("data", data);
                        const firstDataMonth = Number(data[0].Month);
                        console.log("firstDataMonth", firstDataMonth);

                        let monthToPush = [];
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((d, index) => {
                            const startFromOne = index + 1;
                            if (firstDataMonth > startFromOne) {
                                monthToPush.push({
                                    Month: String(d),
                                    Value: "0",
                                    Year: data[0].Year
                                });
                            }
                        });

                        console.log("newData", monthToPush);

                        const finalData = [...monthToPush, ...data];
                        console.log("finalData", finalData);
                        console.log("=========");

                        if (this.chartdata2 && this.chartdata2.datasets && this.chartdata2.datasets[i]) {
                            console.log("this.chartdata2", this.chartdata2);
                            this.chartdata2.datasets[i].data = compareData.map((b, i) => {
                                if (b.Year === d) {
                                    return b.Value;
                                }
                            });
                            this.chartdata2.labels = compareData.map(c => c.Month);
                            this.chartdata2.datasets[i].label = yearGroup[i];
                        }
                    });


                    //CompareData2018
                    // let CompareData2018 = [];
                    // CompareData2018 = compareData.filter(d => {
                    //     return d.Year === "2018";
                    // });
                    // // if (this.chartdata2 && this.chartdata2.datasets && this.chartdata2.datasets.length > 0) {
                    // this.chartdata2.datasets[0].data = CompareData2018.map(d => d.Value);
                    // this.chartdata2.labels = CompareData2018.map(d => d.Month);
                    //
                    // //CompareData2019
                    // let CompareData2019 = [];
                    // CompareData2019 = compareData.filter(d => {
                    //     return d.Year === "2019";
                    // });
                    // this.chartdata2.datasets[1].data = CompareData2019.map(d => d.Value);
                    // }

                    switch (forecastResponse.code) {
                        case "2":
                            this.emptyImage = true;
                            break;
                        case "99":
                            this.emptyImage = true;
                            this.loading = false;
                            break;
                    }

                }

                //show new enroll graph
                const newEnrollResponse = await DataSource.shared.getStudentMovementDetailNewEnroll();


                // const newEnrollResponse = {
                //     "Table1": [
                //         {"Year": "2019", "Enroll": "1", "Month": "5"},
                //         {"Year": "2019", "Enroll": "1", "Month": "6"},
                //         {"Year": "2019", "Enroll": "1", "Month": "7"},
                //         {"Year": "2019", "Enroll": "1", "Month": "8"},
                //         {"Year": "2019", "Enroll": "1", "Month": "9"},
                //         {"Year": "2019", "Enroll": "1", "Month": "10"},
                //         {"Year": "2019", "Enroll": "1", "Month": "11"},
                //         {"Year": "2019", "Enroll": "1", "Month": "12"},
                //         {"Year": "2020", "Enroll": "1", "Month": "1"},
                //         {"Year": "2020", "Enroll": "1", "Month": "2"},
                //         {"Year": "2020", "Enroll": "1", "Month": "3"},
                //         {"Year": "2020", "Enroll": "1", "Month": "4"}
                //     ]
                // };
                if (newEnrollResponse) {
                    let enrollData = newEnrollResponse.Table;

                    console.log("enrollData", enrollData);

                    let yearGroup = [];
                    for (const d of enrollData) {
                        if (!yearGroup.includes(d.Year)) {
                            yearGroup.push(d.Year);
                        }
                    }

                    console.log("yearGroup", yearGroup);
                    yearGroup.forEach((d, i) => {
                        const data = enrollData.filter(a => {
                            console.log("d", a);
                            console.log();
                            return a.Year === d;
                        });
                        console.log("data", data);
                        if (this.chartdata3 && this.chartdata3.datasets && this.chartdata3.datasets[i]) {
                            console.log("this.chartdata3", this.chartdata3);
                            console.log("this.chartdata", this.chartdata);
                            this.chartdata3.datasets[i].data = data.map(b => b.Enroll);
                            this.chartdata3.datasets[i].label = yearGroup[i];
                            this.chartdata3.labels = data.map(c => c.Month);
                        }

                    });
                    switch (newEnrollResponse.code) {
                        case "2":
                            this.emptyImage = true;
                            break;
                        case "99":
                            this.emptyImage = true;
                            this.loading = false;
                            break;
                    }

                    this.loading = false;
                    this.isLoaded = true;
                }
                // if (newEnrollResponse) {
                //     console.log(newEnrollResponse);
                //
                //     const NewData = newEnrollResponse.Table;
                //     const NewDataMonth = NewData.map(d => d.Month);
                //
                //     this.chartdata3.labels = [...new Set(NewDataMonth)];
                //     this.chartdata3.datasets[0].data = NewData.map(d => d.Enroll);
                //
                //     console.log(this.chartdata3);


                //CompareData2019
                // let Enroll2019 = [];
                // Enroll2019 = NewData.filter(d => {
                //     return d.Year === "2019";
                // });
                // this.chartdata3.datasets[0].data = Enroll2019.map(d => d.Enroll);
                // this.chartdata3.labels = Enroll2019.map(d => d.Month);

                //CompareData2020
                // let Enroll2020 = [];
                // Enroll2020 = NewData.filter(d => {
                //     return d.Year === "2020";
                // });
                // this.chartdata3.datasets[1].data = Enroll2020.map(d => d.Enroll);

                // let uniqueMonths = [];
                // NewData.forEach(object => {
                //     const isExist = uniqueMonths.find(month => month.Month === object.Month);
                //     if (!isExist) {
                //         uniqueMonths.push(object);
                //     }
                // });
                // console.log(uniqueMonths, "uniqueMonths");
                // this.chartdata3.labels = uniqueMonths.map(d => d.Month);
                // console.log(this.chartdata3.labels, "uniqueMonths2");
                // console.log(this.chartdata3);


                // }
            } catch (e) {
                console.log(e);
            }
        },
        // mounted() {
        //     this.showSession()
        // },
        methods: {
            showSession: async function () {
                this.token = Cookies.get('authToken') || "no token";
                this.userType = Cookies.get('userTypeSession');
            },
            increaseHeight() {
                this.height += 10;
            },
            getRandomInt() {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
            },
            fillData() {
                this.dataPoints = {
                    labels: ['January' + this.getRandomInt(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                            label: 'Attendance',
                            backgroundColor: '#f87979',
                            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
                        }
                    ]
                };
            },
            async showCompareData() {
                console.log("aa");
                const response = await DataSource.shared.getStudentForecastByBranchMonthly();
                if (response) {
                    let compareData = response.Table1;
                    let allCompareData = [];
                    allCompareData = compareData && compareData.filter(d => {
                        return d.Year === "2019";
                    });

                    if (this.chartdata2 && this.chartdata2.datasets) {
                        this.chartdata2.datasets[0].data = allCompareData.map(d => d.Value);
                        console.log(this.chartdata2);
                    }

                }
            }
        },
        computed: {
            myStyles() {
                return {
                    height: `${this.height}px`,
                    position: 'relative'
                };
            }
        }
    };
</script>
<style scoped>
    .Content {
        padding: 30px 20px;
        position: relative;
        margin-top: 30px;
    }

    .overview__item {
        background: white;
        margin: 20px 10px;
        padding: 20px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-radius: 5px;
        align-items: center;
        position: relative;
        overflow: hidden;
    }

    .overview__item div {
        flex: 1;
    }

    .overview__icon i {
        background: #f5f6fa;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #f0f1f3;
        width: 50px;
        font-size: 22px;
        color: white;
    }

    .student, .teacher, .course, .attendance {
        padding: 0px;
    }

    .student .overview__icon i {
        background: #eb4052;
    }

    .teacher .overview__icon i {
        background: #00dcff;
    }

    .course .overview__icon i {
        background: #ffcb07;
    }

    .attendance .overview__icon i {
        background: #7b9fff;
    }

    .overview__desc .large {
        font-size: 29px;
        display: block;
        line-height: 29px;
    }

    .overview__item .overview__desc {
        flex: 2;
    }

    .custom-wrapper {
        background: #fff;
        padding: 20px;
    }

    .custom-btn {
        background-color: #f13b4a;
        border-color: #f13b4a;
    }

    .custom-btn:hover,
    .custom-btn:focus,
    .custom-btn:active {
        background-color: #828282 !important;
        border-color: #828282 !important;
        -webkit-box-shadow: 0 0 0 0.2rem rgb(204, 204, 204) !important;
        box-shadow: 0 0 0 0.2rem rgb(204, 204, 204) !important;
    }

    .thumbnail img {
        max-width: 100%;
    }

    .home-news__item {
        background: white !important;
    }

    .home-news__item strong {
        font-size: 16px;
        margin-bottom: 10px;
        display: block;
    }

    .thumbnail {
        width: 80%;
        margin: 20px auto;
    }

    .dashboard-title {
        display: table;
        width: 100%;
        position: relative;
    }
</style>
