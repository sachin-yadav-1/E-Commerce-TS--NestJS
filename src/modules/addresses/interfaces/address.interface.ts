import IUser from "../../users/interfaces/user.interface";

export interface IAddress {
  user: string | IUser;
  label: string;
  recipientName: string;
  recipientMobile: string;
  recipientCC: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: number;
}
