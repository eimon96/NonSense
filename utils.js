import HID from "node-hid";
import {
  LEFT_SENSE_PRODUCT_ID,
  RIGHT_SENSE_PRODUCT_ID,
  SONY_VENDOR_ID,
} from "./constants.js";

export const getSenseDevices = () => {
  const devices = HID.devices();
  const senseControllers = devices.filter(
    (device) =>
      (device.vendorId === SONY_VENDOR_ID &&
        device.productId === LEFT_SENSE_PRODUCT_ID) ||
      device.productId === RIGHT_SENSE_PRODUCT_ID
  );
  return senseControllers;
};

export const readRawInput = (device) => {
  device.getFeatureReport(0x05, 64);
  device.on("data", (data) => {
    console.log(device.getDeviceInfo().product, [...data]);
  });
};
