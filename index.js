async function chartIt() {
  const data = await getData();

  const ctx = document.getElementById('chart').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: data.xLabels,
          datasets: [{
              label: 'Combined Land-Surgace Air and Sea-Surface Water Temperature in Celsius',
              data: data.ytemps,
              fill: false,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          },
          {
            label: 'Northern Hemisphere Temperature in °C',
            data: data.northern,
            fill: false,
            borderColor: 'rgba(99, 132, 255, 1)',
            backgroundColor: 'rgba(99, 132, 255, 0.5)',
            borderWidth: 1
          },
          {
            label: 'Souther Hemisphere in °C',
            data: data.southern,
            fill: false,
            borderColor: 'rgba(99, 255, 132, 1)',
            backgroundColor: 'rgba(99, 255, 132, 0.5)',
            borderWidth: 1
          }]
      }
  });
}

chartIt();


async function getData() {
  const xLabels = []
  const ytemps = []
  const northern = []
  const southern = []

  const response = await fetch('ZonAnn.Ts+dSST.csv')
  const data = await response.text()

  // make a table and seperate from year and temp
  const table = data.split('\n').slice(1)

  table.forEach(row => {
    const columns = row.split(',')
    xLabels.push(columns[0])
    ytemps.push(parseFloat(columns[1]) + 14)
    northern.push(parseFloat(columns[2]) + 14)
    southern.push(parseFloat(columns[3]) + 14)
  })
  return { xLabels, ytemps, northern, southern }
  
}