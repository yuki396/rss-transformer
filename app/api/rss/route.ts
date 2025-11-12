import { NextResponse } from "next/server";
import { HttpRssFetcher } from "@/lib/fetchers/HttpRssFetcher";
import { RemoveWordTransformer } from "@/lib/transformers/RemoveWordTransformer";
import { ConsoleOutput } from "@/lib/outputs/ConsoleOutput";
import { RssAppController } from "@/lib/RssAppController";

export async function GET() {
  try {
    const fetcher = new HttpRssFetcher("http://tech.uzabase.com/rss");
    const transformer = new RemoveWordTransformer("NewsPicks");
    const output = new ConsoleOutput();

    const app = new RssAppController(fetcher, transformer, [output]);
    const result = await app.run();

    return new NextResponse(result, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error: unknown) {
    console.error("RSS取得エラー:", error);
    return new NextResponse(`Error: RSSの取得に失敗しました`, { status: 500 });
  }
}