let server;
const request = require("supertest");
let Genre;
const mongoose = require('mongoose');
describe("/api/genre", () => {
  beforeEach(() => {
    server = require("../..").server;
  });
  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });
  it("should return genres", async () => {
    Genre = require("../../models/genre").Genre;
    await Genre.collection.insertMany([
      { name: "genre1" },
      { name: "genre2" },
      { name: "genre3" },
    ]);
    const res = await request(server).get("/api/genres");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
  });

  describe("GET /:id", () => {
    beforeEach(() => {
      server = require("../..").server;
    });
    afterEach(async () => {
      server.close();
      await Genre.remove({});
    });
    it("should return genre with ID", async () => {
      Genre = require("../../models/genre").Genre;
      const genre = new Genre({
        name: "genre1",
      });
      await genre.save();
      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.body.name).toMatch(/genre1/);
    });
    it("should return null for ID", async () => {
        Genre = require("../../models/genre").Genre;
        let id =1;
        const res = await request(server).get("/api/genres/" + id);
        expect(res.status).toBe(404);
      });
  });
});
