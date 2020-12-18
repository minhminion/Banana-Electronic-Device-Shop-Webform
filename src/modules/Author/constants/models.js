import {DEFAULT_API_URL} from "../../../config"

export const MODULE_NAME = "auth"
export const ENDPOINTS = {
  loginUser: `${DEFAULT_API_URL}/${MODULE_NAME}/login`,
  registerUser: `${DEFAULT_API_URL}/${MODULE_NAME}/register`
}