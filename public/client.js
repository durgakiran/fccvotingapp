var pathName = window.location.pathname;
var pathArray = pathName.split('/');
var ourRequest = new XMLHttpRequest();
var ourData;

window.onload = getVoteForm();


function getVoteForm(){
  
  if(pathArray[1]==="vote"){
      
      ourRequest.open('GET', '/'+pathArray[2] +'/' +  pathArray[3], true);
      ourRequest.send();
      ourRequest.onload = function(){
      ourData = JSON.parse(ourRequest.responseText);
        document.getElementById('questionAsked').innerHTML = ourData[0]['Polls']['question'];
        var polloptions = ourData[0]['Polls']['polloptions'];
        var html = '';
        for(var i =0; i<polloptions.length;i++){
          html += '<div class="radio"><label><input type ="radio" name="option" value='+i+'>'+polloptions[i] + '</label></div>';
          
        }
        document.getElementById('options').innerHTML = html;
        getChart();
    
  }
}
}

function updatePoll(){
  
  var radios  = document.getElementsByName('option');
  var value;
  for(var i = 0; i<radios.length;i++){
    if (radios[i].type === 'radio' && radios[i].checked) {
        // get value, set checked flag or do whatever you need to
        value = radios[i].value;       
    }
  }
  ourRequest.open('POST', '/'+pathArray[2] +'/' +  pathArray[3], true);
  ourRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  ourRequest.send('option=' + encodeURIComponent(value));
  ourRequest.onload = function(){
      getVoteForm();
      
      console.log('reuest sent and recieved')
        }
    
  
  
}

//getMypolls
function viewMyPolls(){
  ourRequest.open('GET', '/get/mypolls', true);
      ourRequest.send();
      ourRequest.onload = function(){
        var data = JSON.parse(ourRequest.responseText);
        var html = '';
        for(var i = 0;i<data.length;i++){
          html += '<a href="'+ data[i]['Polls']['uri'] + '">'+ data[i]['Polls']['question'] + '</a>&nbsp;<button class="btn btn-danger">Del</button><br>';
        }
        document.getElementById('myPolls').innerHTML = html;
      }
}


//chartjs




 function getChart(){
   var ctx = document.getElementById("mycanvas");
   Chart.defaults.scale.ticks.beginAtZero = true;
   var mycanvas = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
  labels : ourData[0]['Polls']['polloptions'],
  
  
  datasets : [{
    label: 'poll results',
    borderColor: '#80acf2',
    backgroundColor: '#c4d5f2',
    borderWidth: 2,
    data: ourData[0]['Polls']['votecounts']
            }]

},

    // Configuration options go here
    options:  {
                    responsive: false,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                    }
                }
});
 }