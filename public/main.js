const form = document.getElementById('vote-form')

form.addEventListener('submit', (e)=>{
    const choice = document.querySelector('input[name=os]:checked').value
    const data = {os: choice}
    console.log(choice)
    //send post request
    fetch('http://localhost:3000/poll', {
        method:  'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    e.preventDefault()
});

let dataPoints = [
    {label: 'Windows', y:0},
    {label: 'Macos', y:0},
    {label: 'Linux', y:0},
    {label: 'Other', y:0},
]
const chartContainer = document.querySelector('#chartContainer')

if(chartContainer){
    const chart = new CanvasJS.Chart('chartContainer', {
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
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('12a4750b90a8d4561fc3', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data) {
      dataPoints = dataPoints.map(x=>{
          if(x.label == data.os){
              x.y += data.points;
              return x
          }else{
              return x
          }
      })
      chart.render()
    });
}