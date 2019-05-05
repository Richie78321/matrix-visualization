function changeTab(evt, operationName)
{
  //Hide all tab content
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++)
  {
    tabcontent[i].style.display = "none";
  }

  //Remove tablinks of active
  tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++)
  {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(operationName).style.display = "block";
  evt.currentTarget.className += " active";
}

function multiplyPoints()
{
  var values = [];
  for (let i = 1; i <= 4; i++)
  {
    values[i - 1] = document.getElementById("m-" + i).value;
  }

  var newPoints = [];
  for (let i = 0; i < points.length; i++)
  {
    newPoints[i] = new PVector(points[i].x * values[0] + points[i].y * values[2], points[i].x * values[1] + points[i].y * values[3]);
  }

  prevPoints.push(points);
  points = newPoints;
}

function addPoints()
{
  var values = [];
  for (let i = 1; i <= 2; i++)
  {
    values[i - 1] = document.getElementById("a-" + i).value;
  }

  var newPoints = [];
  for (let i = 0; i < points.length; i++)
  {
    newPoints[i] = new PVector(points[i].x + values[0], points[i].y + values[1]);
  }

  //prevPoints.push(points);
  points = newPoints;
}
