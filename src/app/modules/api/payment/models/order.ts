/* tslint:disable */
/* eslint-disable */
import { Ticket } from './ticket';
export interface Order {
  amount?: number;
  appId?: number;
  email?: string;
  externalId?: number;
  id?: string;
  msg?: string;
  name?: string;
  state?: number;
  tikets?: Array<Ticket>;
  tmId?: string;
  userId?: string;
}
