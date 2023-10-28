import { environment } from "src/environments/environment.development"
const BASEAPI_PATH = environment.BASEAPI_PATH;

export const API_ROUTES = { 
        LOGIN: BASEAPI_PATH + "/users/login",
        VALIDATE_USERNAME: BASEAPI_PATH + "/users/isvalidusername",
        GENERATE_OTP: BASEAPI_PATH + "/otp/generate",
        VALIDATE_OTP: BASEAPI_PATH + "/otp/validate",
        SIGNUP: BASEAPI_PATH + "/users/signup"
}

export const USER_ALERTS = {
        
}