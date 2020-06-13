export class GetPlayListResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
}

export class PageInfo {    
    totalResults: number;
    resultsPerPage: number;      
}

export class Item {
    kind: string;
    etag: string;
    id: any;    
    snippet: Snippet;

}

export class ItemId {
    kind: string;
    videoId: string;
}

export class Snippet {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: Date;
    playlistId: string;
    position: number;
    resourceId: ItemId;
}

export class Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
}

export class Thumbnail {
    url: string;
    width: number;
    height: number;
}