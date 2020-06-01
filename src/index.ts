/**
 * Arrow object
 * element: HTML element to drag
 * xoffset: number - how far moved away in x axis
 * yOffset: number - how far moved away in y axis
 * toggled: boolean
 */

const RANGE = 300;
const STEP = 10;
const DELAY = 40;
const RATE = 200;

const originAxis = {
  x: 400,
  y: 500
};

const arrow = {
  element: null,
  xOffset: -RANGE,
  yOffset: 0,
  toggled: false
};

let standard = 180;

const move = event => {
  event.stopPropagation();
  event.preventDefault();
  arrow.element = event.target;
  arrow.element.style.position = "absolute";
  arrow.element.classList = "arrow down";

  arrow.element.style.transform = "";
  const run = setInterval(() => {
    if (!arrow.toggled && RANGE - arrow.xOffset > STEP) {
      arrow.xOffset += STEP;
    } else if (arrow.toggled && RANGE + arrow.xOffset > STEP) {
      arrow.xOffset -= STEP;
    } else {
      arrow.toggled ? (standard = 0) : (standard = 180);
      arrow.toggled = !arrow.toggled;
      arrow.element.style.transform = "";
      arrow.element.classList = "arrow up";
      clearInterval(run);
    }

    arrow.yOffset = (arrow.xOffset * arrow.xOffset) / RATE;
    const prevLeft = parseFloat(arrow.element.style.left.split("px")[0]);
    const prevTop = parseFloat(arrow.element.style.top.split("px")[0]);
    const left = originAxis.x + arrow.xOffset;
    const top = originAxis.y - arrow.yOffset;
    const distanceX = Math.abs(prevLeft - left);
    const distanceY = Math.abs(prevTop - top);
    const alpha = (Math.atan(distanceX / distanceY) * 180) / Math.PI;
    let angle = 0;

    if (arrow.toggled) {
      angle = standard ? 270 + alpha + standard : 270 - alpha - standard;
    } else {
      angle = standard ? 270 - alpha + standard : 270 + alpha - standard;
    }

    if (
      (arrow.toggled && arrow.xOffset < 0) ||
      (!arrow.toggled && arrow.xOffset > 0)
    ) {
      standard = 0;
    } else {
      standard = 180;
    }

    arrow.element.style.transform = `rotate(${angle}deg)`;
    arrow.element.style.left = `${left}px`;
    arrow.element.style.top = `${top}px`;
  }, DELAY);
};

document.querySelector(".arrow").addEventListener("click", move, false);
