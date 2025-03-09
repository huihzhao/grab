import { Fetcher, FetchResult } from "./types";
import { WebFetcher } from "./fetchers/web";
import { XFetcher } from "./fetchers/x";

export class Grab {
  private fetchers: Map<string, Fetcher>;

  constructor() {
    this.fetchers = new Map();
    this.fetchers.set("web", new WebFetcher());
    this.fetchers.set("x", new XFetcher());
  }

  async fetch(source: "web" | "x", query: string): Promise<FetchResult[]> {
    const fetcher = this.fetchers.get(source);
    if (!fetcher) throw new Error(`Unknown source: ${source}`);
    return fetcher.fetch(query);
  }

  addFetcher(name: string, fetcher: Fetcher) {
    this.fetchers.set(name, fetcher);
  }
}

export default Grab;