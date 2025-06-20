import { describe, test, expect } from "vitest";
import { calendarApi } from "../../src/api/calendarApi";

describe("calendarApi test", () => {
  test("should have the default configuration", () => {
    const calendar = calendarApi.defaults.baseURL

    expect(calendar).toBe(process.env.VITE_API_URL);
    //   expect(calendarApi.defaults.headers["x-token"]).toBeUndefined();
  });

  // test("should have the x-token in all requests", async () => {
  //   const token = "ABC-123-XYZ";
  //   const resp = await calendarApi.get("/auth");
  //   expect(resp.config.headers["x-token"]).toBe(token);
  // });
})