import { Line } from './BaseCharts'

export default {
    extends: Line,
    mounted () {
        this.renderChart({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Attendance',
                    backgroundColor: '#ff5c679c',
                    data: [40, 39, 10, 40, 39, 80, 40]
                }
            ]
        }, {responsive: true, maintainAspectRatio: false})
    }
}