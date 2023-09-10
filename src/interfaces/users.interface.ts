import {IRequest} from './request.interface';

export interface IUser {
  _id?: string;
  email?: string;
  password?: string;
  name?: string;
  type?: USER_TYPE;
  studentId?: string;
  tutorId?: string;
}

export interface IAuth {
  _id?: string;
  token: string;
}

export enum USER_TYPE {
  ADMIN = 1,
  STUDENT = 2,
  TUTOR = 3,
}

export interface ITutor extends IUser {
  _id?: string;
  flexibility?: boolean;
  cities?: [string];
  country?: string;
  location?: string;
  phone?: string;
  rate?: number;
  subjectsTaught?: string[];
  qualifications?: string[];
  teachingStyle?: string[];
  teachLevel?: string[];
  userId?: string; // Reference to the User model
  user?: IUser;
  reviews?: IReview[]; // Array of embedded reviews
  requests?: IRequest[];
}

export interface IStudent extends IUser {
  _id?: string;
  flexibility?: boolean;
  studyLevel?: string;
  location?: string;
  userId?: string;
  user?: IUser;
  requests?: IRequest[];
  schoolName?: string;
}
export interface ICustomer {
  _id?: string;
  email: string;
  firstName: string;
  lastName?: string;
  country?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

export interface IReview {
  comment: string;
  tutor?: string;
  student?: IStudent;
  user?: IUser;

  rate: number;
  createdDate?: Date;
}
