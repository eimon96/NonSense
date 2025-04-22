import { BUTTONS } from "./constants.js";

export const mapInputs = (data) => ({
  [BUTTONS.SQUARE]: data[9] & 0x01,
  [BUTTONS.CROSS]: data[9] & 0x02,
  [BUTTONS.CIRCLE]: data[9] & 0x04,
  [BUTTONS.TRIANGLE]: data[9] & 0x08,
  [BUTTONS.L1]: data[9] & 0x10,
  [BUTTONS.R1]: data[9] & 0x20,
  [BUTTONS.L2]: data[9] & 0x40,
  [BUTTONS.R2]: data[9] & 0x80,
  [BUTTONS.L3]: data[10] & 0x04,
  [BUTTONS.R3]: data[10] & 0x08,
  [BUTTONS.PS]: data[10] & 0x10,
  [BUTTONS.SHARE]: data[10] & 0x01,
  [BUTTONS.OPTIONS]: data[10] & 0x02,
});
