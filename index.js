const xLabels = []
const ytemps = []

async function chartIt() {
  await getData();

  const ctx = document.getElementById('chart').getContext('2d');
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: xLabels,
          datasets: [{
              label: 'Global Average Temperature',
              data: ytemps,
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
          }]
      }
  });
}

chartIt();



async function getData() {
  const response = await fetch('ZonAnn.Ts+dSST.csv')
  const data = await response.text()

  // make a table and seperate from year and temp
  const table = data.split('\n').slice(1);
  table.forEach(row => {
    const columns = row.split(',')
    const year = columns[0]
    xLabels.push(year)
    const temp = columns[1]
    ytemps.push(temp);
    console.log(year, temp)
  })
  
  
}