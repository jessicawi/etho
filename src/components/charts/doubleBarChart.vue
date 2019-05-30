<script>
    import {Bar} from 'vue-chartjs';

    export default {
        extends: Bar,
        props: {
            chartdata2: {
                type: Object,
                default: null
            },
            // options: {
            //     type: Object,
            //     default: null
            // }
        },
        mounted () {
            // Overwriting base render method with actual data.
            this.renderChart(
                this.chartdata2,
                {
                    title: {
                        display: false,
                        text: ''
                    },
                    scales: {
                        yAxes: [{
                            stacked: true
                        }],
                        xAxes: [ {
                            stacked: true,
                            categoryPercentage: 0.5,
                            barPercentage: 1
                        }]
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            )
        }
    }
</script>