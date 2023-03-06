<template>
  <div class="canvas">
    <canvas :id="`myChart${chartId}`"></canvas>
  </div>
</template>

<script>
/*eslint-disable*/
import Chart from 'chart.js/auto';

export default {
  name: 'ChartComponent',
  components: {

  },
  props: {
    chartId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    measurements: {
      type: Array,
      required: true
    },
  },
  mounted() {
    const myChart = new Chart(document.getElementById(`myChart${this.chartId}`), this.config);
  },
  data() {
    return {
      config: {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [{
            label: this.name,
            data: this.measurements,
            backgroundColor: 'rgb(37,102,177)',
            borderColor: 'rgb(37,102,177)',
            tension: 0.1
          }]
        }
      },
    }
  },
}
</script>

<style scoped>
  .canvas {
    width: 100%;
    height: 340px;
    min-width: 340px;
    max-width: 460px;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 0 8px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(199,213,231);
    box-shadow: rgba(35,55, 80, .3) 0 6px 12px;
  }
</style>
