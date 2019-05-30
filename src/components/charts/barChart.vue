<script>
    import {Bar} from 'vue-chartjs';

    export default {
        extends: Bar,
        data: () => ({
            option: {
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 10,
                            beginAtZero: true,
                            // suggestedMax: 40
                        },
                        stacked: false,
                    }],
                    xAxes: [{
                        stacked: false,
                    }]
                },
                responsive: true, maintainAspectRatio: false
            },
        }),
        props: {
            chartdata: {
                type: Object,
                default: null
            },
            // options: {
            //     type: Object,
            //     default: null
            // }
        },
        mounted() {
            this.renderChart(this.chartdata, this.option);
        }
    };
</script>