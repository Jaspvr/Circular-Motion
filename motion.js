


//to connect with html, and set the canvas
var canvas = document.querySelector("#cm")
var c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight;

var radius = 2
var angle = 1 



var mouseMove = { x: innerWidth / 2, y: innerHeight / 2 }

//in case the window is resized
document.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight;
})

//to track the user's mouse
document.addEventListener('mousemove', function(e) {
    mouseMove.x = e.clientX
    mouseMove.y = e.clientY
})

//document.addEventListener('mouseclick', function(e) {
//    mouseClick.x = e.clientX
//    mouseClick.y = e.clientY
//})

class Circle {
    constructor(x, y, radius, color, ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color
        //this.angle = Math.random()*2*Math.PI();
        this.angle = 1;
        //difference velocity and acceleration for each circle makes for a better effect
        this.velocity = Math.random() * 80 + 200
        this.acceleration = Math.random() * .1
    }
    //draws the individual circles
    drawing(motion) {
        c.beginPath()
        // arc parameters: arc(x,y,r,sAngle,eAngle,counterclockwise);
        c.arc(motion.x, motion.y, this.radius, angle, Math.PI * 2)
        c.strokeStyle = this.color
        c.stroke()
        c.fillStyle = this.color 
        c.fill()
    }

    //each individual circle
    move() {
        let motion = {
             x: this.x, 
             y: this.y 
        }
        this.drawing(motion)
        this.angle += this.acceleration
        this.x = mouseMove.x + this.velocity * Math.cos(this.angle)
        this.y = mouseMove.y + this.velocity * Math.sin(this.angle)
    }

}
var circleArray = []
var colors = ["pink", "magenta"]

//this for loop creates 500 small circles
for (var i = 0; i < 500; i++) {
    var circleColor = Math.floor(Math.random() * colors.length)
    var x = window.innerWidth / 2
    var y = window.innerHeight / 2
    var circle = new Circle(x, y, 2.5, colors[circleColor])

    //actually create the circle
    circleArray.push(circle)
}

function animation() {
    requestAnimationFrame(animation)

    //rgba(red, green, blue, alpha), alpha is from 0 to 1, so .1 is very transparent
    //      and will give the fading effect
    // this will also fade the balls which is okay if we create a second angle to keep producing them
    c.fillStyle = 'rgba(100, 200, 300, 0.1)' 
    c.fillRect(0,0,innerWidth,innerHeight);
    
    //now move each circle in a circular motion; connects to each circle that was pushed
    circleArray.forEach(element => {
        element.move()
    });
}
animation()
