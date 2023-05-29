import axios from "axios";
import "dotenv/config";

class RandomStringGenerationUseCase {
  constructor() {}

  private endpoint = "https://api.random.org/json-rpc/2/invoke";

  async execute(): Promise<string> {
    try {
      const response = await axios.post(this.endpoint, {
        jsonrpc: "2.0",
        method: "generateStrings",
        params: {
          apiKey: process.env.RANDOM_API_KEY,
          n: process.env.RANDOM_STRING_AMOUNT || 1,
          length: process.env.RANDOM_STRING_LENGTH,
          characters:
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        },
        id: 1,
      });

      const randomString = response.data.result.random.data[0];
      return randomString;
    } catch (error) {
      throw error;
    }
  }
}
export { RandomStringGenerationUseCase };
