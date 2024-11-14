let x = 0;
let y = 0;

let p5lm;

let pixelSize = 0;

let participants = {
    me: {
        color: 'orangered',
        x: 0,
        y: 0,
    }
};

let palette = [
    'green',
    'orange',
    'blue',
    'yellow',
    'saddlebrown',
    'plum',
];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.id('p5bg');
  p5lm = new p5LiveMedia(this, "DATA", null, "web-on-a-dime");
  p5lm.on('data', gotData);
  p5lm.on('disconnect', gotDisconnect);
  pixelSize = width/30;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    pixelSize = width/30;
}

function draw() {
  background(255, 30);
  for(let x = 0; x < width; x += pixelSize) {
    for(let y = 0; y < height; y += pixelSize) {
        noStroke();
        let closestOne = {
            name: null,
            distance: Infinity,
            color: 'white',
        }
        for(let name in participants) {
            let distanceToMouse = dist(x+pixelSize/2, y+pixelSize/2, participants[name].x, participants[name].y);
            distanceToMouse = map(distanceToMouse, 10, width/4, 0, 1, true);

            if( distanceToMouse < closestOne.distance ){
                closestOne.distance = distanceToMouse;
                closestOne.color = participants[name].color;
            }
        }
        
        fill(lerpColor(color(closestOne.color), color(255,255,255,0), closestOne.distance));
        square(x,y,pixelSize);
    }
  }
}

function gotDisconnect(id) {
  print(id + ": disconnected");
  delete participants[id];
}

function gotData(data, id) {
  //print(id + ":" + data);
  let d = JSON.parse(data);

  if( typeof participants[id] == 'undefined' ){
    participants[id] = {
        x: 0,
        y: 0,
        color: random(palette),
    }

    // palette = removeItem(palette, participants[id].color);
    // if(palette.length == 0) {
    //     palette = [
    //         'green',
    //         'orange',
    //         'blue',
    //         'yellow',
    //         'brown',
    //         'plum',
    //     ];
    // }

  }

  participants[id].x = d.x;
  participants[id].y = d.y;
}

function mouseMoved() {
    participants.me.x = mouseX;
    participants.me.y = mouseY;

    let dataToSend = {x: mouseX, y: mouseY};
  
    // Have to send string
    p5lm.send(JSON.stringify(dataToSend));
}

function removeItem(arr, item){
    return arr.filter(f => f !== item)
}