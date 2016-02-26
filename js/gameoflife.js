
/*
**Initialise global variables, set up canvas
*/

var pixelSize = 15;
var cellCount = 40;
var speed = 1000;
var canvas = document.getElementById('background');
canvas.width = pixelSize*cellCount;
canvas.height = pixelSize*cellCount;
var ctx = canvas.getContext('2d');
var life = build2DArray();

/*
**This determines how often the window should redraw, allows for speed change
*/
var intervalFunction = function() {
    clearInterval(interval);
    var nextStepArray = evolution(life);
    display(nextStepArray);
    life = nextStepArray;
    interval = setInterval(intervalFunction, speed);
    console.log('using: ', speed);
}
var interval = setInterval(intervalFunction, speed);

/*
**Build a two dimensional array, fill with 0s
*/
function build2DArray() {
    var life = [];
    for(var i = 0; i<cellCount; i++) {
        var innerArr = [];
        for(var j = 0; j<cellCount; j++) {
            innerArr.push(0);
        }
        life.push(innerArr);
    }
    return life;
}

/*
**Iterate through life array drawing each cell in turn
*/
function display(life) {
    for(var x = 0; x < life.length; x++) {
        for(var y = 0; y < life[x].length; y++) {
            drawCell(x,y,life[x][y]);
        }
    }
}


/*
**Draw a rectangle from each point, with pixelSize as offset
*/
function drawCell(x,y,alive) {
    ctx.beginPath();
    ctx.rect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
    ctx.fillStyle = alive ? 'black' : 'white';
    ctx.fill();
}


/*
**Random seed (for a session) filling a proportion of the grid
*/
function randomlyPopulate() {
    resetLife(life);
    for(var x = 0; x < life.length; x++) {
        for(y = 0; y < life[x].length; y++) {
            if(Math.random() < 0.4) {
                life[x][y]=1;
            }
        }
    }
}

/*
**Reset all cells to 0 (dead)
*/
function resetLife(life) {
    for(var x = 0; x < life.length; x++) {
        for(y = 0; y < life[x].length; y++) {
            life[x][y] = 0;
        }
    }
}

/*
**Pre determined patterns
*/
function glider() {
    resetLife(life);
    life[1][2] = 1;
    life[2][3] = 1;
    life[3][1] = 1;
    life[3][2] = 1;
    life[3][3] = 1;
    display(life);
}


function pulsar() {
    resetLife(life);

    life[4][6] = 1;
    life[4][7] = 1;
    life[4][8] = 1;
    life[4][12] = 1;
    life[4][13] = 1;
    life[4][14] = 1;
    life[6][4] = 1;
    life[6][9] = 1;
    life[6][11] = 1;
    life[6][16] = 1;
    life[7][4] = 1;
    life[7][9] = 1;
    life[7][11] = 1;
    life[7][16] = 1;
    life[8][4] = 1;
    life[8][9] = 1;
    life[8][11] = 1;
    life[8][16] = 1;
    life[9][6] = 1;
    life[9][7] = 1;
    life[9][8] = 1;
    life[9][12] = 1;
    life[9][13] = 1;
    life[9][14] = 1;
    life[11][6] = 1;
    life[11][7] = 1;
    life[11][8] = 1;
    life[11][12] = 1;
    life[11][13] = 1;
    life[11][14] = 1;
    life[12][4] = 1;
    life[12][9] = 1;
    life[12][11] = 1;
    life[12][16] = 1;
    life[13][4] = 1;
    life[13][9] = 1;
    life[13][11] = 1;
    life[13][16] = 1;
    life[14][4] = 1;
    life[14][9] = 1;
    life[14][11] = 1;
    life[14][16] = 1;
    life[16][6] = 1;
    life[16][7] = 1;
    life[16][8] = 1;
    life[16][12] = 1;
    life[16][13] = 1;
    life[16][14] = 1;
    display(life);

}

/*
**Count the number of neighbouring living cells
*/
function livingNeighbours(life, x, y) {
    if(x > 0 && y > 0 && x < cellCount-1 && y < cellCount-1) {
        var totalAlive = life[x-1][y-1]   +
                         life[x][y-1]     +
                         life[x+1][y-1]   +
                         life[x-1][y]     +
                         life[x+1][y]     +
                         life[x-1][y+1]   +
                         life[x][y+1]     +
                         life[x+1][y+1];
        return totalAlive;
    } else {
        return 0;
    }
}


/*
**Perform scenario checks
*/
function evolution(life) {
    var nextStepArray = build2DArray();
    for(var x = 0; x < life.length; x++) {
        for(var y = 0; y < life[x].length; y++) {
            var cell = life[x][y];
            var living = livingNeighbours(life, x,y);

            //Consider living cells first
            if(cell == 1) {

                //Check for Underpopulation
                if(living < 2) {
                    nextStepArray[x][y] = 0;
                } 

                //Check for Survival
                else if(living == 2 || living == 3) {
                    nextStepArray[x][y] = 1;
                } 

                //Check for Overpopulation
                else if(living > 3) {
                    nextStepArray[x][y] = 0;
                }
            } 

            //If the cell is empty and has 3 living neighbours, 
            //create life
            else if(cell == 0 && living == 3) {
                nextStepArray[x][y] = 1;
            }
        }
    }
    return nextStepArray;
}

//Default start - random population, then display
randomlyPopulate();
display(life);

/*
**Update speed when slider changed
*/
function updateSpeed(newSpeed) {
    document.getElementById("speed").innerHTML=newSpeed;
    speed = newSpeed;
}



