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
function animate() {
    if (fields.length < 4) {
        randDirection = Math.random()*2*Math.PI
        fields.push([0.5, 0.5, Math.cos(randDirection)*0.005, Math.sin(randDirection)*0.005, 0])
    }
    fields.forEach((field, index) => {
        field[0] += field[2]
        field[1] += field[3]
        field[4]++
        if (field[0] < -0.5 || field[0] > 1.5 || field[1] < -0.5 || field[1] > 1.5) {
            fields.splice(index, 1)
        }
    })
    requestAnimationFrame(animate)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    xDivisions = 200
    yDivisions = canvas.height/canvas.width*xDivisions
    for (x=0;x<xDivisions;x++) {
        for (y=0;y<yDivisions;y++) {
            let charge = 0
            xPosition = x*canvas.width/xDivisions
            yPosition = y*canvas.height/yDivisions
            fields.forEach((field) => {
                charge += field[4]*20/((xPosition - field[0]*canvas.width)**2 + (yPosition - field[1]*canvas.height)**2)
            })
            charge = charge > 0.1
            ctx.fillStyle = `rgb(${charge*150}, ${charge*40}, ${charge*150})`
            ctx.fillRect(xPosition, yPosition, canvas.width/xDivisions + 1, canvas.height/yDivisions + 1)
        }
    }
    frame++
}
animate()