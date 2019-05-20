// Rover Object Goes Here
var rover = {
	direction : "N",
	x : 0,
	y : 0,
	travelLog : [],
  grid: [[0,0,0,1,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,1,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0]]
};
// ======================

// ======================
function turnLeft(rover){
  console.log("turnLeft was called!");
  switch (rover.direction) {
  	case "N":
  		rover.direction = "W";
  		break;
  	case "W":
  		rover.direction = "S";
  		break;
  	case "S":
  		rover.direction = "E";
  		break;
  	case "E":
  		rover.direction = "N";
  		break;
  }
  console.log("The rover direction is now: " + rover.direction);
}

function turnRight(rover){
  console.log("turnRight was called!");
  switch (rover.direction) {
  	case "N":
  		rover.direction = "E";
  		break;
  	case "E":
  		rover.direction = "S";
  		break;
  	case "S":
  		rover.direction = "W";
  		break;
  	case "W":
  		rover.direction = "N";
  		break;
  }
  console.log("The rover direction is now: " + rover.direction);
}

function isInBorder (rover, movement){
  var inBorder= false;

  if (rover.direction === "N" && 
      (
        (movement === "f" && rover.y <= 0) ||
        (movement === "b" && rover.y >= 9)
      )
     ) {

      inBorder=true;

  } else if (rover.direction === "W" && 
              (
                (movement === "f" && rover.x <= 0) ||
                (movement === "b" && rover.x >= 9)
              )
            ) {

    inBorder=true;

  } else if (rover.direction === "S" && 
              (
                (movement === "f" && rover.y >= 9) ||
                (movement === "b" && rover.x <= 0)
              )
            ) {

    inBorder=true;

  } else if (rover.direction === "E" && 
              (
                (movement === "f" && rover.y >= 9) ||
                (movement === "b" && rover.x <= 0)
              )
            ) {

    inBorder=true;

  }
  if (inBorder===true){
    console.log("The rover is in the limit and cannot move");
  }
return inBorder;
}

function findObstacle (rover, movement){
  var obstacle = false;

  if (rover.direction === "N" && 
      (
        (movement === "f" && rover.y > 0 && rover.grid[rover.y - 1][rover.x] != 0) ||
        (movement === "b" && rover.y < 9 && rover.grid[rover.y + 1][rover.x] != 0)
      )
     ) {

    obstacle=true;

  } else if (rover.direction === "W" && 
              (
                (movement === "f" && rover.x > 0 && rover.grid[rover.y][rover.x - 1] != 0) ||
                (movement === "b" && rover.x < 9 && rover.grid[rover.y][rover.x + 1] != 0)
              )
            ) {

    obstacle=true;

  } else if (rover.direction === "S" && 
              (
                (movement === "f" && rover.y < 9 && rover.grid[rover.y + 1][rover.x] != 0) ||
                (movement === "b" && rover.y > 0 && rover.grid[rover.y - 1][rover.x] != 0)
              )
            ) {

    obstacle=true;

  } else if (rover.direction === "E" && 
              (
                (movement === "f" && rover.x < 9 && rover.grid[rover.y][rover.x + 1] != 0) ||
                (movement === "b" && rover.x > 0 && rover.grid[rover.y][rover.x - 1] != 0)
              )
            ) {

    obstacle=true;

  }
  if (obstacle===true){
    console.log("The rover has found an obstacle and cannot move");
  }
return obstacle;
}


function moveForward(rover){
  console.log("moveForward was called");

  var inBorder = isInBorder(rover,"f");
  var frontObstacle = findObstacle(rover,"f");
 
  if (rover.direction === "N" && !inBorder && !frontObstacle) {

      rover.travelLog.push([rover.x, rover.y]);
      rover.y = rover.y - 1;

  } else if (rover.direction === "W" && !inBorder && !frontObstacle) {

  	rover.travelLog.push([rover.x, rover.y]);
    rover.x = rover.x - 1;

  } else if (rover.direction === "S" && !inBorder && !frontObstacle) {

  	rover.travelLog.push([rover.x, rover.y]);
    rover.y = rover.y + 1;

  } else if (rover.direction === "E" && !inBorder && !frontObstacle) {

  	rover.travelLog.push([rover.x, rover.y]);
    rover.x = rover.x + 1;

  }

  console.log (rover.travelLog);
  console.log("The rover position is now: x-" + rover.x + ", y-" + rover.y);
}

function moveBackward (rover){
  console.log("moveBackward was called");

  var inBorder = isInBorder(rover,"b");
  var backObstacle = findObstacle(rover,"b");

  if (rover.direction === "N" && !inBorder && !backObstacle) {
    
    rover.travelLog.push([rover.x, rover.y]);
    rover.y = rover.y + 1;

  } else if (rover.direction === "W" && !inBorder && !backObstacle) {
    
    rover.travelLog.push([rover.x, rover.y]);
    rover.x = rover.x + 1;

  } else if (rover.direction === "S" && !inBorder && !backObstacle) {
    
    rover.travelLog.push([rover.x, rover.y]);
    rover.y = rover.y - 1;

  } else if (rover.direction === "E" && !inBorder && !backObstacle) {
    
    rover.travelLog.push([rover.x, rover.y]);
    rover.x = rover.x - 1;

  }

  console.log (rover.travelLog);
  console.log("The rover position is now: x-" + rover.x + ", y-" + rover.y);  
}

function moveByCommands(rover, commands) {
  var i=0; 
  var noError = true;

  while (i < commands.length && noError){
    if (commands.charAt(i) != "f" && commands.charAt(i) !="r" && commands.charAt(i) !="l"  && commands.charAt(i) !="b"){
      console.log(" El carácter " + commands.charAt(i) + " No es valido ");
      noError = false;
    }
    i++;
  }

  if (noError){
  	for (var i = 0; i < commands.length; i++) {

  		if (commands.charAt(i) === "f") {

  			moveForward(rover);

  		} else if (commands.charAt(i) === "r") {

  			turnRight(rover);

  		} else if (commands.charAt(i) === "l") {

  			turnLeft(rover);
      
  		}else if (commands.charAt(i) ==="b"){

        moveBackward(rover);
      }
  	}
  }
}
