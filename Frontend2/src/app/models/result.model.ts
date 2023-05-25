import { Contacts } from "./contact.model";

export interface Result{
  status: number;
  data:Array<Contacts>
}
