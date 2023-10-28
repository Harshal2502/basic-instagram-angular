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
        PASSWORD_UPPATED: "Password udapted successfully!",
        USER_NOT_EXISTS: "User does not exist",
        WRONG_PASSWORD: "Wrong Password",
        INVALID_USERNAME: "Invalid username",
        USERNAME_NOT_AVAILABLE: "Username not available",
        UNMATCHING_PASSWORDS: "Passwords do not match",
        MAX_LENGTH: "Max length of fullname should be 50",
        NO_SPECIAL_CHAR: "Full Name can only contain letters and spaces",
        PHONE_EMAIL_REQUIRED: "Phone numer or Email is required",
        ERROR: "An Error Occured :(",
        ENTER_OTP: "Enter OTP to Proceed",
        LOGIN: "Please login to continue",
        REGISTERED: "Registered Successfully!",
        PASSWORD: "Password must contain",
        
}