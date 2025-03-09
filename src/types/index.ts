export interface FetchResult {
    content: string;
    source: string;
    timestamp: string; // ISO date string
  }
  
  export interface Fetcher {
    fetch(query: string): Promise<FetchResult[]>;
  }