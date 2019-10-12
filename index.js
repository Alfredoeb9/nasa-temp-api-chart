async function getData() {
  const response = await fetch('test.csv')
  const data = await response.text()
  console.log(data)

  console.log(response);
  
}

getData()