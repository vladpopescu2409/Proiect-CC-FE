
import { User } from "./user";

export interface Feedback {
     id: number;
     title: string;
     type: string;
     body: string;
     rating: boolean;
     createdBy?:User;

          
   
 
 }
 