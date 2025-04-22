import { HID } from "node-hid";
import { getSenseDevices, readRawInput } from "./utils.js";
import {
  LEFT_SENSE_PRODUCT_ID,
  RIGHT_SENSE_PRODUCT_ID,
  SONY_VENDOR_ID,
} from "./constants.js";

const senseDevices = getSenseDevices();
if (senseDevices.length !== 2) {
  console.error(
    "❌ Could not detect Sense Controllers. Make sure to connect both controllers via Bluetooth."
  );
  process.exit(1);
}

const leftController = new HID(SONY_VENDOR_ID, LEFT_SENSE_PRODUCT_ID);
const rightController = new HID(SONY_VENDOR_ID, RIGHT_SENSE_PRODUCT_ID);
readRawInput(leftController);
readRawInput(rightController);
