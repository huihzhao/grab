import axios from "axios";
import * as cheerio from "cheerio";
import { BaseFetcher } from "./base";
import { FetchResult } from "../types";

export class WebFetcher extends BaseFetcher {
  private baseUrl = "https://duckduckgo.com/html/?q="; // DuckDuckGo HTML version (public)

  async fetch(query: string): Promise<FetchResult[]> {
    try {
      const response = await axios.get(`${this.baseUrl}${encodeURIComponent(query)}`);
      const $ = cheerio.load(response.data);
      const results: FetchResult[] = [];

      $(".result__snippet").each((_, element) => {
        const content = $(element).text().trim();
        if (content) {
          results.push({
            content,
            source: $(element).prev(".result__title").find("a").attr("href") || "DuckDuckGo",
            timestamp: this.formatTimestamp(),
          });
        }
      });

      return results.slice(0, 5); // Limit to 5
    } catch (error) {
      console.error("Web fetch failed:", error);
      return [];
    }
  }
}