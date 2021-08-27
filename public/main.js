
const form = document.getElementById('vote-form')

form.addEventListener('submit', (e)=>{
    const choice = document.querySelector('input[name=os]:checked').value
    const data = {os: choice}
    console.log(choice)
    //send post request
    fetch('http://localhost:3000/poll', {
        method:  'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    e.preventDefault()
});

let dataPoints = [
    {label: 'Windows', y:1},
    {label: 'Macos', y:0},
    {label: 'Linux', y:0},
    {label: 'Other', y:0},
]
const chartContainer = document.querySelector('#chartContainer')

if(chartContainer){
    let chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title:{
            text: 'OS Results'
        },
        data:[
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    })
    chart.render()
    // // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('12a4750b90a8d4561fc3',{cluster: 'eu', forceTLS : true})
    var channel = pusher.subscribe('os-poll')
    channel.bind('pusher:subscription_succeeded', function(data) {
        console.log('data')
        console.log(data)

      dataPoints = dataPoints.map(x=>{
          if(x.label == data.os){
              console.log('datapoints')
              console.log(data.dataPoints)
              x.y += data.dataPoints;
              chart.render()
              return x
          }else{
              return x
          }
      });
      if(chart){
          chart.render()
      }
    });
    //end bind
}