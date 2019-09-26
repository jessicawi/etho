<template>
    <div id="portfoliomedia">
        <div class="container admin-wrap  mt-5">
            <div class="row header mb-3">
                <div class="col-lg-12 ">
                    <h3 class=" text-center">PORTFOLIO MEDIA</h3>
                    <span></span>
                </div>
            </div>
            <div class="pb-5 row">
                <div class="col-lg-12">
                    <div class="row portfolio-media_list">
                        <div v-if="mediaList.length < 1" class="empty-list_image">
                            <strong>{{startupText}}</strong>
                            <img src="../assets/notfound.png"/>
                        </div>
                        <div class="col-lg-12 mt-5" v-if="mediaList.length > 1">
                            <!--<b-carousel style="text-shadow: 1px 1px 2px #333;"-->
                                        <!--controls-->
                                        <!--indicators-->
                                        <!--:interval="0">-->
                                <!--<div v-for="media in mediaList">-->
                                    <!--<b-carousel-slide>-->
                                        <!--<img slot="img" class="card-img-top d-block img-fluid "-->
                                             <!--:src="convertToFile(media)"-->
                                        <!--/>-->
                                    <!--</b-carousel-slide>-->

                                <!--</div>-->
                            <!--</b-carousel>-->

                            <el-carousel :interval="4000" type="card" height="200px">
                                <el-carousel-item v-for="media in mediaList" :key="media.ID">
                                    <img :src="convertToFile(media)"/>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                        <div v-else class="col-lg-12 mt-5">
                            <div  v-for="media in mediaList">
                                <img :src="convertToFile(media)"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="portfolioMedia_bg" v-if="mediaList.length > 0">
                <img src="../assets/media_bg.jpg"/>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "PortfolioMedia",
        data() {
            return {
                startupText: 'No Media Found...',
                mediaList: [],
            };
        },
        async created() {
            if (this.$route.query.id === '' || this.$route.query.id === null || this.$route.query.id === undefined) {
                this.mediaList = [];
            } else {
                this.getMedia(this.$route.query.id.replace(' ', '+'));
            }
        },
        methods: {
            async getMedia(inputString) {
                try {
                    const response = await DataSource.shared.getPostFileWithoutTokenCheckByEncryptedPostID(inputString);
                    if (response) {
                        if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error Get Media - Please try again later...'
                            });
                        } else if (response.code === '2') {
                            this.$notify.error({
                                title: 'No Record',
                                message: 'No Media Found...'
                            });
                        } else {
                            this.mediaList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            convertToFile(file) {
                return "data:" + file.PostItemFileType + ";base64," + file.PostItemFile;
            },
        },
    }
</script>

<style scoped>

</style>