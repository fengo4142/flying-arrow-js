var RANGE = 300;
var STEP = 10;
var DELAY = 40;
var RATE = 200;
var originAxis = {
    x: 400,
    y: 500
};
var arrow = {
    element: null,
    xOffset: -RANGE,
    yOffset: 0,
    toggled: false
};
var standard = 180;
var move = function (event) {
    event.stopPropagation();
    event.preventDefault();
    arrow.element = event.target;
    arrow.element.style.position = "absolute";
    arrow.element.classList = "arrow down";
    arrow.element.style.transform = "";
    var run = setInterval(function () {
        if (!arrow.toggled && RANGE - arrow.xOffset > STEP) {
            arrow.xOffset += STEP;
        }
        else if (arrow.toggled && RANGE + arrow.xOffset > STEP) {
            arrow.xOffset -= STEP;
        }
        else {
            arrow.toggled ? (standard = 0) : (standard = 180);
            arrow.toggled = !arrow.toggled;
            arrow.element.style.transform = "";
            arrow.element.classList = "arrow up";
            clearInterval(run);
        }
        arrow.yOffset = (arrow.xOffset * arrow.xOffset) / RATE;
        var prevLeft = parseFloat(arrow.element.style.left.split("px")[0]);
        var prevTop = parseFloat(arrow.element.style.top.split("px")[0]);
        var left = originAxis.x + arrow.xOffset;
        var top = originAxis.y - arrow.yOffset;
        var distanceX = Math.abs(prevLeft - left);
        var distanceY = Math.abs(prevTop - top);
        var alpha = (Math.atan(distanceX / distanceY) * 180) / Math.PI;
        var angle = 0;
        if (arrow.toggled) {
            angle = standard ? 270 + alpha + standard : 270 - alpha - standard;
        }
        else {
            angle = standard ? 270 - alpha + standard : 270 + alpha - standard;
        }
        if ((arrow.toggled && arrow.xOffset < 0) ||
            (!arrow.toggled && arrow.xOffset > 0)) {
            standard = 0;
        }
        else {
            standard = 180;
        }
        arrow.element.style.transform = "rotate(" + angle + "deg)";
        arrow.element.style.left = left + "px";
        arrow.element.style.top = top + "px";
    }, DELAY);
};
document.querySelector(".arrow").addEventListener("click", move, false);
