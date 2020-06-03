import { Sermon } from './sermon';

export class SermonsResponse {
    Page: number;
    PageSize: number;
    Total: number;
    Sermons: Sermon[];
}