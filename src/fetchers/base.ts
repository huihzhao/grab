import { Fetcher, FetchResult } from "../types";

export abstract class BaseFetcher implements Fetcher {
  abstract fetch(query: string): Promise<FetchResult[]>;

  protected formatTimestamp(date: Date = new Date()): string {
    return date.toISOString();
  }
}