export class UsernameInfo {
  constructor(public username: string) {}
}

export class LoginInfo {
  constructor(public username: string, public password: any) {}
}

export class SignupData {
  constructor(
    public loginInfo: LoginInfo,
    public conactInfo: ContactInfo,
    public transactionId: any
  ) {}
}

export class ContactInfo {
  constructor(public email: string) {}
}

export class OtpRequest {
  constructor(
    public contactInfo: ContactInfo,
    public requestType: string,
    public otp?: any
  ) {}
}
