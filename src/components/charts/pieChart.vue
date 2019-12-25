<script>
    import {Pie} from 'vue-chartjs';

    export default {
        name: "pieChart",
        extends: Pie,
        data: () => ({
            // labels: [ 'Red', 'Yellow', 'Blue' ],
            // datasets: [
            //     {
            //         data: [10, 20, 30],
            //         backgroundColor: ['red', 'blue', 'yellow'],
            //     }
            // ]
            option: {
                responsive: true, maintainAspectRatio: false
            },
        }),
        props: {
            chartdata: {
                type: Object,
                default: null
            },
        },
        mounted() {
            this.renderChart(this.chartdata, this.option);
        }
    }
</script>