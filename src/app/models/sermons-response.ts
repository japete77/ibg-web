import { Item } from './youtube.models';

export class SermonsResponse {
    page: number;
    total: number;
    items: Item[];
}

export class LiveResponse {
    live: Item;
}
