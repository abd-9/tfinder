import {IStudent, ITutor} from './users.interface';

export enum REQUEST_STATUS {
  PENDING = 1,
  ACCEPTED = 2,
  REJECTED = 3,
  CANCELLED = 4,
  COMPLETED = 5,
}
export enum SESSION_STATUS {
  PENDING = 1,
  CANCELLED = 2,
  COMPLETED = 3,
}
export enum REQUEST_REPETITION {
  ONCE = 1,
  DAILY = 2,
  WEEKLY = 3,
}
export interface IRequest {
  _id?: string;

  tutor?: ITutor;
  student?: IStudent;
  rate?: number;
  startDateTime?: Date;
  endDateTime?: Date;
  note?: string;
  teachLevel?: string;
  subjectsTaught?: string[];
  status?: REQUEST_STATUS;
  sessions?: ISession[];
  repetition?: REQUEST_REPETITION;
}

export interface ISession {
  _id?: string;
  request?: string;
  note?: string;
  startDateTime?: Date;
  endDateTime?: Date;
  status?: SESSION_STATUS;
}
