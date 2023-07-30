const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const slider = document.getElementById('myRange');
var inputValue = 600;
var v = 0;
var I = 0;

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
const lens = {
    xo: canvas.width / 2,
    yo: canvas.height / 2,
    radius: 200,
    xc1: (canvas.width / 2) - 210,
    yc1: canvas.height / 2,
    xc2: (canvas.width / 2) + 210,
    yc2: canvas.height / 2,
};
function convexLens() {

    ctx.beginPath();
    ctx.arc(lens.xc1, lens.yc1, lens.radius, Math.PI / 6, (Math.PI * 11) / 6, true);
    ctx.arc(lens.xc2, lens.yc2, lens.radius, (Math.PI * 7) / 6, (Math.PI * 5) / 6, true);
    ctx.closePath();
    ctx.fillStyle = '#50cdf39e';
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
function principalAxis() {
    ctx.beginPath();
    ctx.moveTo(0, lens.yo);
    ctx.lineTo(canvas.width, lens.yo);
    ctx.stroke();
    ctx.closePath();
}

function points() {
    ctx.fillStyle = '#000';
    ctx.font = "20px serif";
    ctx.beginPath();
    ctx.arc(lens.xo - lens.radius, lens.yo, 3, 0, Math.PI * 2, true);
    ctx.fillText('F₁', lens.xo - lens.radius - 10, lens.yo + 25);
    ctx.arc(lens.xo + lens.radius, lens.yo, 3, 0, Math.PI * 2, true);
    ctx.fillText('F₂', lens.xo + lens.radius - 10, lens.yo + 25);
    ctx.arc(lens.xo - (2 * lens.radius), lens.yo, 3, 0, Math.PI * 2, true);
    ctx.fillText('2F₁', lens.xo - (2 * lens.radius) - 20, lens.yo + 25);
    ctx.arc(lens.xo + (2 * lens.radius), lens.yo, 3, 0, Math.PI * 2, true);
    ctx.fillText('2F₂', lens.xo + (2 * lens.radius) - 20, lens.yo + 25);
    ctx.arc(lens.xo, lens.yo, 3, 0, Math.PI * 2, true);
    ctx.fillText('O', lens.xo - 30, lens.yo + 20);
    ctx.fill();
    ctx.closePath();
}
function imaginaryLine() {
    ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
    ctx.beginPath();
    ctx.moveTo(lens.xo, lens.yo - 100);
    ctx.lineTo(lens.xo, lens.yo + 100);
    ctx.stroke();
    ctx.closePath();
    ctx.setLineDash([0]);
}
function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color) {
    //variables to be used when creating the arrow
    var headlen = 10;
    var angle = Math.atan2(toy - fromy, tox - fromx);

    ctx.save();
    ctx.strokeStyle = color;

    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();

    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7),
        toy - headlen * Math.sin(angle - Math.PI / 7));

    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7),
        toy - headlen * Math.sin(angle + Math.PI / 7));

    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7),
        toy - headlen * Math.sin(angle - Math.PI / 7));

    //draws the paths created above
    ctx.stroke();
    ctx.restore();
}
function objects(u) {
    ctx.beginPath();
    ctx.setLineDash([0]);
    drawArrow(ctx, (canvas.width / 2) - u, lens.yo, (canvas.width / 2) - u, lens.yo - 66, 3, 'black');
    ctx.closePath();
}
function image(v, I) {
    ctx.beginPath();
    ctx.setLineDash([5, 3]);
    drawArrow(ctx, lens.xo - v, lens.yo, lens.xo - v, lens.yo - I, 3, 'black');
    ctx.setLineDash([0]);
    ctx.closePath();
}
function rays(u) {
    ctx.setLineDash([0]);
    drawArrow(ctx, (lens.xo - u), lens.yo - 66, lens.xo, lens.yo, 2, 'black');
    drawArrow(ctx, lens.xo, lens.yo, (lens.xo + (10 * u)), (lens.yo + 660), 2, 'black');
    drawArrow(ctx, (lens.xo - u), lens.yo - 66, lens.xo, lens.yo - 66, 2, 'black');
    drawArrow(ctx, lens.xo, lens.yo - 66, (lens.xo + 300), (lens.yo - 198), 2, 'black');
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(lens.xo - 200, lens.yo);
    ctx.lineTo(lens.xo, lens.yo - 66);
    ctx.stroke();
    ctx.closePath();

}
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    slider.oninput = function () {
        inputValue = this.value;
        objects(this.value);
        v = (this.value * 200) / (parseInt(this.value) + 200);
        I = (66 * v) / this.value;
        console.log(v + " " + I);
        image(v, I);
        rays(this.value);
    };
    objects(inputValue);
    convexLens();
    principalAxis();
    points();
    imaginaryLine();
    image(v, I);
    rays(inputValue);
    requestAnimationFrame(update);
}
update();

