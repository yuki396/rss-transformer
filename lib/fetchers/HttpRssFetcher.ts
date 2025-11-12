import { IRssFetcher } from "../interfaces/IRssFetcher";

export class HttpRssFetcher implements IRssFetcher {
  constructor(private url: string) {}

  async fetch(): Promise<string> {
    try {
      const res = await fetch(this.url);
      if (!res.ok) {
        throw new Error(`RSS取得に失敗しました: ${res.status}`);
      }
      return await res.text();
    } catch (error) {
      console.error("HttpRssFetcherでエラー:", error);
      throw error;
    }
  }
}