import { IRssTransformer } from "../interfaces/IRssTransformer";

export class RemoveWordTransformer implements IRssTransformer {
  constructor(private word: string = "NewsPicks") {}

  transform(data: string): string {
    try {
      return data.replace(new RegExp(this.word, "g"), "");
    } catch (error) {
      console.error("RemoveWordTransformerでエラー:", error);
      throw error;
    }
  }
}