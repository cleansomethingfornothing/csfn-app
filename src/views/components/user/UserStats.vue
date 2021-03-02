<template>
    <canvas ref="user-stats" :width="width" height="250"></canvas>
</template>
<script lang=ts>
import Vue from 'vue'
import Component from 'vue-class-component'
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Prop} from 'vue-property-decorator'
import UserProfileStats from '@/types/UserProfileStats'
import {userModule} from '@/store/userModule'

@Component({
    name: "user-stats"
})
export default class UserStats extends Vue {

    @Prop(Array)
    stats: UserProfileStats[]
    width = window.innerWidth

    get groupBy() {
        return userModule.statsGroupBy
    }

    mounted() {
        const ctx = (this.$refs['user-stats'] as any).getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, '#59B14A');
        gradient.addColorStop(1, 'rgba(158, 211, 98, 0)');


        new Chart(ctx, {
            type: 'line',
            plugins: [ChartDataLabels],
            data: {
                labels: this.stats.map(({date}) => date),
                datasets: [{
                    label: 'Liters',
                    borderColor: '#59B14A',
                    backgroundColor: gradient,
                    pointBackgroundColor: '#fff',
                    fill: true,
                    data: this.stats.map(({volume}) => volume)
                }]
            } as any,
            options: {
                elements: {
                    point: {
                        radius: 2
                    }
                },
                layout: {
                    padding: {
                        top: 30,
                        right: 20,
                        bottom: 10,
                        left: 20
                    }
                },
                legend: {
                    display: false
                },
                responsive: true,
                tooltips: {
                    enabled: false
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: this.groupBy === 'month'
                            ? {
                                unit: 'month',
                                parser: 'YYYY-MM',
                                displayFormats: {
                                    month: 'MMM'
                                }
                            } : {
                                unit: 'day',
                                parser: 'YYYY-MM-DD',
                                displayFormats: {
                                    day: 'DD/MM/YYYY'
                                }
                            },
                        gridLines: {
                            offsetGridLines: false,
                            zeroLineColor: '#ddd'
                        },
                        ticks: {
                            fontFamily: 'Montserrat',
                            fontSize: 8,
                            fontColor: 'rgba(0,0,0,0.6)'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            display: false,
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        }
                    }]
                },
                plugins: {
                    datalabels: {
                        align: 'top',
                        font: {
                            family: 'Montserrat',
                            size: 10
                        },
                        formatter: (label) => label + ' ' + this.$t('Lt')
                    }
                }
            }
        });
    }

}
</script>
<style scoped>

</style>
