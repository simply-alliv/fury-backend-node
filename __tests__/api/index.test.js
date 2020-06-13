// import { expect } from 'chai';
import app from "../../src/api";

const config = require("config");

const request = require("supertest");

describe("The express server", () => {
  describe("when request is made to /v1", () => {
    it("should respond with status code 200 and renders Swagger API documentation correctly", async () => {
      const res = await request(app).get("/v1");
      expect(res.status).toBe(301);
      expect(res.text).toMatchSnapshot();
    });
  });
  describe("when request is made to /", () => {
    it("should respond with status code 200 and renders Swagger API documentation correctly", async () => {
      const res = await request(app).get("/");
      expect(res.status).toBe(200);
      expect(res.text).toMatchSnapshot();
    });
  });
  describe("when request is made to an invalid route", () => {
    it('should respond with status code 404 and "Oops! Resource not found"', async () => {
      const res = await request(app).get("/cantseeme");
      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Oops! Resource not found");
    });
  });
});

describe("Test port configuration", () => {
  it("when undefined server port should be 3000", () => {
    process.env.PORT = undefined;
    const defaultPort = config.get("server.port");
    expect(defaultPort).toBe(3000);
  });
});
