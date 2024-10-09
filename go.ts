// import { SessionsWave } from "./waves/wave";
import FOG from "vanta/src/vanta.fog";
// import TRUNK from "vanta/src/vanta.trunk";
import TRUNK from "./vanta/trunk";
// const x = new SessionsWave();
// x.connect();

// import svg from './icons/bun.svg?raw'

// Get colors from body
const body = document.querySelector("body");
const color1 = getComputedStyle(document.documentElement).getPropertyValue(
  "--fogColor1"
);
const color3 = getComputedStyle(document.documentElement).getPropertyValue(
  "--fogColor3"
);
const color5 = getComputedStyle(document.documentElement).getPropertyValue(
  "--fogColor5"
);

const computedStyle = getComputedStyle(document.documentElement);
const cssVariables = Object.fromEntries(
  Object.values(computedStyle)
    .filter((key) => key.startsWith(`--`))
    .map((key) => {
      return [key.replace(`--`, ''), computedStyle.getPropertyValue(key)];
    })
);

function hexToNumber(hex = '#ffc600') {
  return `0x${parseInt(hex.replace("#", ""), 16).toString(16)}`;
}

// FOG({
//   el: "#fog",
//   mouseControls: true,
//   touchControls: true,
//   gyroControls: false,
//   minHeight: 200.0,
//   minWidth: 200.0,
//   blurFactor: 0.8,
//   highlightColor: 0x6900ff,
//   midtoneColor: 0xff7ee9,
//   // lowlightColor: 0xbada55,
//   lowlightColor: 0xffc600,
//   baseColor: 0x2f52d9,
//   speed: 2.5,
// });


TRUNK({
  el: "#trunk",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 500.0,
  minWidth: 500.0,
  scale: 2.0,
  scaleMobile: 1.0,
  // color: 0xff009e,
  color: 0x67655a,
  backgroundColor: `transparent`,
  spacing: 8.0,
  chaos: 1,
});

// Convert the canvas to an image
async function waitForSelector<T extends Element>(selector) {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  return document.querySelector<T>(selector);
}

async function go() {
  const canvas = await waitForSelector<HTMLCanvasElement>("#trunk canvas.p5Canvas");
  // In firefox we use blob, in chrome we use dataURL
  if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    document.body.classList.add('firefox');
    paintBlob(canvas);
  } else {
    paint(canvas);
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function paint(canvas) {
  const image = canvas.toDataURL();
  document.documentElement.style.setProperty(
    "--image",
    `url(${image})`
  );
  requestAnimationFrame(() => paint(canvas));
}


async function paintBlob(canvas) {
  // const image = canvas.toDataURL();
  canvas.toBlob(async (blob) => {
    // console.count(blob);
    const image = URL.createObjectURL(blob);
    document.documentElement.style.setProperty(
      "--image",
      `url(${image})`
    );
    requestAnimationFrame(() => paintBlob(canvas));
  });
}
go();
