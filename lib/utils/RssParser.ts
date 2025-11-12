import { RssItem } from "../models/RssItem";

export function parseRss(xmlText: string): RssItem[] {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");

  const items = Array.from(xml.querySelectorAll("item")).map((item) => ({
    title: item.querySelector("title")?.textContent ?? "",
    link: item.querySelector("link")?.textContent ?? "",
    pubDate: item.querySelector("pubDate")?.textContent ?? "",
  }));

  return items;
}
