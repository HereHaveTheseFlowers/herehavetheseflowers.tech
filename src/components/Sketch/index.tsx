import { P5CanvasInstance } from '@p5-wrapper/react';
import { hexToRgb, rgbToHex } from '../../utils/helpers';

function sketch(p5: P5CanvasInstance) {
  const htmlElem = document.querySelector('html');

  const palette = {
    main: { color: '' },
    bg: { color: '' }
  };

  if (htmlElem) {
    palette.bg.color = htmlElem.style.getPropertyValue('--color-bg');
    palette.main.color = htmlElem.style.getPropertyValue('--color-main');
  }
  setTimeout(() => {
    const htmlElem = document.querySelector('html');
    if (htmlElem) {
      graduallyChangeColor(htmlElem.style.getPropertyValue('--color-bg'), palette.bg);
      graduallyChangeColor(htmlElem.style.getPropertyValue('--color-main'), palette.main);
    }
  }, 800);

  window.addEventListener('colorchange', function () {
    setTimeout(() => {
      const htmlElem = document.querySelector('html');
      if (htmlElem) {
        graduallyChangeColor(htmlElem.style.getPropertyValue('--color-bg'), palette.bg);
        graduallyChangeColor(htmlElem.style.getPropertyValue('--color-main'), palette.main);
      }
    }, 800);
  });

  async function graduallyChangeColor(newColor: string, colorToChange: { color: string }) {
    const currentRgb = hexToRgb(colorToChange.color);
    const newRgb = hexToRgb(newColor);
    const newInterval = setInterval(() => {
      if (colorToChange.color === newColor) clearInterval(newInterval);

      const colorChangeSpeed = 4;

      if (currentRgb.r - newRgb.r > colorChangeSpeed) {
        currentRgb.r = currentRgb.r - colorChangeSpeed;
      } else if (currentRgb.r - newRgb.r < -colorChangeSpeed) {
        currentRgb.r = currentRgb.r + colorChangeSpeed;
      } else {
        currentRgb.r = newRgb.r;
      }
      if (currentRgb.b - newRgb.b > colorChangeSpeed) {
        currentRgb.b = currentRgb.b - colorChangeSpeed;
      } else if (currentRgb.b - newRgb.b < -colorChangeSpeed) {
        currentRgb.b = currentRgb.b + colorChangeSpeed;
      } else {
        currentRgb.b = newRgb.b;
      }
      if (currentRgb.g - newRgb.g > colorChangeSpeed) {
        currentRgb.g = currentRgb.g - colorChangeSpeed;
      } else if (currentRgb.g - newRgb.g < -colorChangeSpeed) {
        currentRgb.g = currentRgb.g + colorChangeSpeed;
      } else {
        currentRgb.g = newRgb.g;
      }

      colorToChange.color = rgbToHex(currentRgb.r, currentRgb.g, currentRgb.b);
      console.log(colorToChange.color);
    }, 5);
    setTimeout(() => {
      clearInterval(newInterval);
    }, 1000);
  }

  type point = { x: number; y: number };

  const points: point[] = [];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.strokeWeight(2);
    p5.noFill();

    // declare the points as an array
  };

  p5.draw = () => {
    p5.background(palette.bg.color);
    p5.stroke(palette.main.color);
    //p5.frameRate(10);
    const one_point: point = { x: 0, y: 0 };
    if (p5.mouseX && p5.mouseY) {
      one_point.x = p5.mouseX;
      one_point.y = p5.mouseY;
      points.push(one_point);
      /*       if (Math.random() < 0.01) {
        addLeaf(one_point);
      } */
    }
    p5.beginShape();
    for (var i = 0; i < points.length; i++) {
      if (!(i % 2)) {
        // grab the point by index

        if (!points[i].y || points[i].y < 0) {
          points[i] = null;
        } else {
          const point = points[i];
          p5.curveVertex(point.x, point.y);
          points[i] = { x: points[i].x, y: points[i].y + 2 };
        }
      }
    }
    if (p5.mouseX && p5.mouseY) {
      p5.curveVertex(one_point.x, one_point.y - 1);
      p5.curveVertex(one_point.x, one_point.y + 1);
      p5.curveVertex(one_point.x, one_point.y);
    }
    p5.endShape();
  };
}

export default sketch;
