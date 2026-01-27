export interface User {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  profileUrl?: string;
}

export interface EmailUpdateBody {
  oldEmail: string;
  newEmail: string;
  password: string;
}

export interface ProfileUpdateBody {
  name: string;
  phoneNo?: string;
  profileImage?: File;
  profileUrl?: string;
}

export interface PasswordUpdateBody {
  oldPassword: string;
  newPassword: string;
}
