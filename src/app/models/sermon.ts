import { Scripture } from './scripture';

export class Sermon {
    Date: string;
    PartNo: number;
    Preacher: string;
    Title: string;
    Text: Scripture[]; 
}