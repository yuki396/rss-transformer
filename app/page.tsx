"use client";

import { useState } from "react";
import { parseRss } from "@/lib/utils/RssParser";
import type { RssItem } from "@/lib/models/RssItem";

export default function HomePage() {
  const [items, setItems] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRss = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch RSS
      const res = await fetch("/api/rss");
      if (!res.ok) throw new Error("RSSの取得に失敗しました");

      // Parse RSS
      const xmlText = await res.text();
      const parsedItems = parseRss(xmlText);

      setItems(parsedItems);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("不明なエラーが発生しました");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">RSSフィード変換アプリ</h1>

      <button
        onClick={fetchRss}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        RSSを取得する
      </button>

      {loading && <p className="mt-4 text-gray-600">読み込み中...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <ul className="mt-6 space-y-3">
        {items.map((item, i) => (
          <li key={i} className="border p-3 rounded">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              {item.title}
            </a>
            <p className="text-sm text-gray-500">{item.pubDate}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
