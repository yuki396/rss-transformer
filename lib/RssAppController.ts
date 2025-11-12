import { IRssFetcher } from "./interfaces/IRssFetcher";
import { IRssTransformer } from "./interfaces/IRssTransformer";
import { IRssOutput } from "./interfaces/IRssOutput";

export class RssAppController {
  constructor(
    private fetcher: IRssFetcher,
    private transformer: IRssTransformer,
    private outputs: IRssOutput[] = [],
  ) {}

  async run(): Promise<string> {
    try {
      // Get RSS
      const data = await this.fetcher.fetch();

      // Output RSS
      await Promise.all(this.outputs.map((o) => o.output(data)));

      // Transform RSS
      const transformed = this.transformer.transform(data);

      return transformed;
    } catch (error) {
      console.error("RssAppControllerでエラー:", error);
      throw error;
    }
  }
}
