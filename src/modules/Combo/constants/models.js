import { DEFAULT_API_URL } from "../../../config";

export const MODULE_NAME = "combos";

export const ENDPOINTS = {
  getCombos: `${DEFAULT_API_URL}/${MODULE_NAME}`,
  getSingleCombo:(comboId) => `${DEFAULT_API_URL}/${MODULE_NAME}/${comboId}`,
};
