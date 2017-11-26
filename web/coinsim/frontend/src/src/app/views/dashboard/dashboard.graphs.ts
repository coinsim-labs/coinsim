
const labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7'];
const legend = false;
const type = 'line';
const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
    }],
    yAxes: [{
      display: false,
    }]
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 0,
      hoverRadius: 0,
      hoverBorderWidth: 0,
    }
  },
  legend: {
    display: false
  }
};

export const sparklineCharts = [
  {
    label: 'Bitcoin',
    value: '$ 8,756.2',
    data: [{
        data: [35, 23, 56, 22, 97, 23, 64],
        label: 'Clients'
      }],
    colors: [{
        backgroundColor: 'transparent',
        borderColor: '#63c2de',
      }],
    labels: labels,
    legend: legend,
    type: type,
    options: options
  },
  {
    label: 'Bitcoin Cash',
    value: '$ 1,567.3',
    data: [{
        data: [65, 59, 84, 84, 51, 55, 40],
        label: 'Clients'
      }],
    colors: [{
        backgroundColor: 'transparent',
        borderColor: '#f86c6b',
      }],
    labels: labels,
    legend: legend,
    type: type,
    options: options
  },
  {
    label: 'Etherum',
    value: '$ 461.7',
    data: [{
        data: [35, 23, 56, 22, 97, 23, 64],
        label: 'Clients'
      }],
    colors: [{
        backgroundColor: 'transparent',
        borderColor: '#f8cb00',
      }],
    labels: labels,
    legend: legend,
    type: type,
    options: options
  },
  {
    label: 'Litecoin',
    value: '$ 88.4',
    data: [{
        data: [65, 59, 84, 84, 51, 55, 40],
        label: 'Clients'
      }],
    colors: [{
        backgroundColor: 'transparent',
        borderColor: '#4dbd74',
      }],
    labels: labels,
    legend: legend,
    type: type,
    options: options
  },{
    label: 'Dash',
    value: '$ 633.4',
    data: [{
        data: [35, 23, 56, 22, 97, 23, 64],
        label: 'Clients'
      }],
    colors: [{
        backgroundColor: 'transparent',
        borderColor: '#d1d4d7'
      }],
    labels: labels,
    legend: legend,
    type: type,
    options: options
  }
]



