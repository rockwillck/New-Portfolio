function scrollDown(id) {
    document.getElementById(id).scrollIntoView({behavior:"smooth", block:"start"})
}

for (img of document.getElementsByClassName("portfolioImg")) {
    img.addEventListener(("click"), (e) => {
        document.getElementById("expandedImage").src = e.srcElement.src
        document.getElementById("expandedImage").alt = e.srcElement.alt
        document.getElementById("expandedImageContainer").style.top = "50%"
    })
}

function hideImage() {
    document.getElementById("expandedImageContainer").style.top = "150%"
}

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
var fields = []
var frame = 0
var boids = []
for (i=0;i<50;i++) {
    randDirection = Math.random()*2*Math.PI
    boids.push([Math.random(), Math.random(), randDirection])
}

function addUntilPositive(x, multiple) {
    while (x < 0) {
        x += multiple
    }
    return x
}

function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}
resize()

var lookupMarchingSquares = []
// avg position, avg heading, avoidance
var weights = [1.03, 1.03, 0.99]
var detectionRadius = 0.001
function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    avgHeading = 0
    avgLocation = [0, 0]
    boids.forEach((boid) => {
        avgHeading += boid[2]
        avgLocation[0] += boid[0]
        avgLocation[1] += boid[1]
    })
    avgHeading /= boids.length
    avgLocation[0] /= boids.length
    avgLocation[1] /= boids.length

    boids.forEach((boid, thisIndex) => {
        boid[0] += Math.cos(boid[2])*0.005
        boid[1] += Math.sin(boid[2])*0.005
        locationHeading = Math.atan2(-(boid[1] - avgLocation[1]), -(boid[0] - avgLocation[0]))
        collisionDirection = [0, 0]
        boids.forEach((otrBoid, otrIndex) => {
            distance = Math.sqrt((otrBoid[0] - boid[0])**2 + (otrBoid[1] - boid[1])**2)
            if (otrIndex != thisIndex && distance <= detectionRadius) {
                collisionDirection[0] += (otrBoid[0] - boid[0])/distance
                collisionDirection[1] += (otrBoid[1] - boid[1])/distance
            }
        })
        avoidHeading = Math.atan2(-collisionDirection[1], -collisionDirection[0])
        boid[2] = (weights[0] * avgHeading + weights[1] * locationHeading + weights[2]*avoidHeading)/(weights[0] + weights[1] + weights[2])
        boid[2] += (Math.random() - 0.5)*Math.PI*0.2

        drawPosition = [addUntilPositive(boid[0]*canvas.width, canvas.width) % canvas.width, addUntilPositive(boid[1]*canvas.height, canvas.height) % canvas.height]
        ctx.fillStyle = `rgb(80, 0, 80)`
        ctx.beginPath()
        ctx.arc(drawPosition[0], drawPosition[1], 5, 0, 2*Math.PI)
        ctx.closePath()
        ctx.fill()
    })

    frame++
}
animate()