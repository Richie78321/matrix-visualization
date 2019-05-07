var CANVAS_PADDING = .02;
var POINT_SIZE = 5;

var points;
var pointFrames = [];

function loadCanvas()
{
  var canvas = document.getElementById("coordinate-canvas");
  var processing = new Processing(canvas, processingFunction);
  processing.size((window.innerWidth / 2) * (1 - CANVAS_PADDING), window.innerHeight * (1 - CANVAS_PADDING));
}

function processingFunction(processing)
{
  points = [];

  processing.setup = function()
  {
    $(window).resize(() => {
      processing.size((window.innerWidth / 2) * (1 - CANVAS_PADDING), window.innerHeight * (1 - CANVAS_PADDING));
    });
  }

  processing.draw = function()
  {
    if (pointFrames.length > 0)
    {
      points = pointFrames.shift();
    }

    processing.background(255, 255, 255);
    drawCoordinatePlane(processing);
    drawPolygon(processing, points, [255, 0, 0, 255], [0, 0, 0]);
  };

  processing.mouseClicked = function()
  {
    //Add point
    points.push(new PVector(processing.mouseX - (processing.width / 2), processing.mouseY - (processing.height / 2)));
    console.log("Here");
  }
}

function drawCoordinatePlane(processing)
{
  processing.stroke(105, 105, 105);
  processing.line(processing.width / 2, 0, processing.width / 2, processing.height);
  processing.line(0, processing.height / 2, processing.width, processing.height / 2);
}

function drawPolygon(processing, vertices, fillColor, vertexColor)
{
  processing.beginShape();
  processing.fill(fillColor[0],fillColor[1],fillColor[2],fillColor[3]);
  for (let i = 0; i < vertices.length; i++) processing.vertex(vertices[i].x + (processing.width / 2), vertices[i].y + (processing.height / 2));
  if (vertices.length > 0) processing.vertex(vertices[0].x + (processing.width / 2), vertices[0].y + (processing.height / 2));
  processing.endShape();

  processing.stroke(vertexColor[0],vertexColor[1],vertexColor[2],vertexColor[3]);
  processing.fill(vertexColor[0],vertexColor[1],vertexColor[2],vertexColor[3]);
  for (let i = 0; i < vertices.length; i++) processing.ellipse(vertices[i].x + (processing.width / 2), vertices[i].y + (processing.height / 2), POINT_SIZE, POINT_SIZE);
}
