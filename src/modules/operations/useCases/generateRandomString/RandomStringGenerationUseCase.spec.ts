import "reflect-metadata";
import axios from "axios";
import { RandomStringGenerationUseCase } from "./RandomStringGenerationUseCase";

jest.mock("axios");

describe("RandomStringGenerationUseCase", () => {
  let randomStringGenerationUseCase: RandomStringGenerationUseCase;

  beforeEach(() => {
    randomStringGenerationUseCase = new RandomStringGenerationUseCase();
  });

  it("should generate a random string", async () => {
    const randomString = "random-string";
    const mockResponse = {
      data: {
        result: {
          random: {
            data: [randomString],
          },
        },
      },
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await randomStringGenerationUseCase.execute();

    expect(result).toEqual(randomString);
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object)
    );
  });

  it("should throw an error if random string generation fails", async () => {
    const errorMessage = "Failed to generate random string";
    const mockError = new Error(errorMessage);

    (axios.post as jest.Mock).mockRejectedValue(mockError);

    await expect(randomStringGenerationUseCase.execute()).rejects.toThrow(
      errorMessage
    );
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object)
    );
  });
});
