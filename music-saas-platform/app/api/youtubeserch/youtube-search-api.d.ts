declare module 'youtube-search-api' {
    export function GetVideoDetails(videoId: string): Promise<any>;
    export function GetListByKeyword(keyword: string, maxResults?: number): Promise<any>;
    // Add other functions from the module if needed
}