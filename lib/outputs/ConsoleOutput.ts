import { IRssOutput } from "../interfaces/IRssOutput";

export class ConsoleOutput implements IRssOutput {
  async output(data: string): Promise<void> {
    try {
      console.log("=== RSS変換結果 ===");
      console.log(data);
    } catch (error) {
      console.error("ConsoleOutputでエラー:", error);
      throw error;
    }
  }
}