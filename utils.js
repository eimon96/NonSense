import HID from "node-hid";
import robot from "robotjs";
import {
  BUTTONS,
  LEFT_SENSE_PRODUCT_ID,
  RIGHT_SENSE_PRODUCT_ID,
  SONY_VENDOR_ID,
} from "./constants.js";
import { mapInputs } from "./mapper.js";

export const getSenseDevices = () => {
  const devices = HID.devices();
  const senseControllers = devices.filter(
    (device) =>
      (device.vendorId === SONY_VENDOR_ID &&
        device.productId === LEFT_SENSE_PRODUCT_ID) ||
      device.productId === RIGHT_SENSE_PRODUCT_ID
  );
  if (senseControllers.length !== 2) {
    throw new Error(
      "☠️  Could not detect Sense Controllers. Make sure to connect both controllers via Bluetooth."
    );
  }
  return true;
};

export const readRawInput = (device) => {
  let lastData = null;
  const interval = 24;
  device.getFeatureReport(0x05, 128);

  const prevState = {};
  device.on("data", (data) => {
    const inputs = mapInputs(data);
    Object.entries(inputs).map(([key, value]) => {
      lastData = data;
      const currentState = !!value;
      if (!!currentState && !prevState[key]) {
        inputHandler(key);
      }
      prevState[key] = currentState;
    });
  });

  setInterval(() => {
    if (lastData) {
      moveMouseWithStick(lastData);
    }
  }, interval);
};

export const inputHandler = (key) => {
  switch (key) {
    case BUTTONS.SQUARE:
    case BUTTONS.CROSS:
      robot.mouseClick();
      break;
    case BUTTONS.L2:
    case BUTTONS.R2:
      robot.mouseClick("right");
      break;
    default:
      break;
  }
};

export const normalizeStick = (value) => {
  return (value - 128) / 128;
};

export const moveMouseWithStick = (data) => {
  const xInput = normalizeStick(data[2]);
  const yInput = normalizeStick(data[3]);
  const deadzone = 0.15;
  const speed = 17;

  if (Math.abs(xInput) > deadzone || Math.abs(yInput) > deadzone) {
    const { x, y } = robot.getMousePos();
    robot.moveMouse(x + xInput * speed, y + yInput * speed);
  }
};
