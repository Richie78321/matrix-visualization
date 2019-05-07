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
    values[i - 1] = parseFloat(document.getElementById("m-" + i).value);
  }

  var latestPoints;
  if (pointFrames.length > 0)
  {
    latestPoints = pointFrames[pointFrames.length - 1];
  }
  else
  {
    latestPoints = points;
  }
  pointFrames.push(applyMult(values, latestPoints));
}

function applyMult(values, originalPoints)
{
  var newPoints = [];
  for (let i = 0; i < originalPoints.length; i++)
  {
    newPoints[i] = new PVector(originalPoints[i].x * values[0] + originalPoints[i].y * values[2], originalPoints[i].x * values[1] + originalPoints[i].y * values[3]);
  }

  return newPoints;
}

function addPoints()
{
  var values = [];
  for (let i = 1; i <= 2; i++)
  {
    values[i - 1] = parseFloat(document.getElementById("a-" + i).value);
  }

  var newPoints = [];
  var latestPoints;
  if (pointFrames.length > 0)
  {
    latestPoints = pointFrames[pointFrames.length - 1];
  }
  else
  {
    latestPoints = points;
  }

  for (let i = 0; i < latestPoints.length; i++)
  {
    newPoints[i] = new PVector(latestPoints[i].x + values[0], latestPoints[i].y + values[1]);
  }

  pointFrames.push(newPoints);
}

var ROUND_DECIMALS = 3;
function updateRotationMatrix()
{
  var angle = parseFloat(document.getElementById("r-angle").value) * (Math.PI / 180);
  var roundedCos = Math.round(Math.cos(angle) * Math.pow(10, ROUND_DECIMALS)) / Math.pow(10, ROUND_DECIMALS);
  var roundedSin = Math.round(Math.sin(angle) * Math.pow(10, ROUND_DECIMALS)) / Math.pow(10, ROUND_DECIMALS)
  document.getElementById("r-1").value = roundedCos;
  document.getElementById("r-2").value = -roundedSin;
  document.getElementById("r-3").value = roundedSin;
  document.getElementById("r-4").value = roundedCos;
}

var ROTATION_FRAMES = 150;
function rotatePoints()
{
  var angle = parseFloat(document.getElementById("r-angle").value) * (Math.PI / 180);
  var angleInc = angle / ROTATION_FRAMES;

  var latestPoints;
  if (pointFrames.length > 0)
  {
    latestPoints = pointFrames[pointFrames.length - 1];
  }
  else
  {
    latestPoints = points;
  }
  for (let i = 0; i < ROTATION_FRAMES; i++)
  {
    var cos = Math.cos(angleInc * i);
    var sin = Math.sin(angleInc * i);
    var values = [cos, -sin, sin, cos];

    pointFrames.push(applyMult(values, latestPoints));
  }
}
