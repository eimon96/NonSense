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
  device.getFeatureReport(0x05, 128);
  const prevState = {};
  device.on("data", (data) => {
    const inputs = mapInputs(data);
    Object.entries(inputs).map(([key, value]) => {
      const currentState = !!value;
      if (!!currentState && !prevState[key]) {
        inputHandler(key);
      }
      prevState[key] = currentState;
    });
  });
};

export const inputHandler = (key) => {
  switch (key) {
    case BUTTONS.CROSS:
      robot.mouseClick();
      break;
    default:
      break;
  }
};
