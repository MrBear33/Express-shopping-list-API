const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

beforeEach(() => {
  items.length = 0; // Clear the items array
  items.push({ name: "popsicle", price: 1.45 });
});

afterEach(() => {
  items.length = 0; // Clear the items array
});

describe("GET /items", () => {
  it("should return a list of items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ name: "popsicle", price: 1.45 }]);
  });
});

describe("POST /items", () => {
  it("should add a new item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "cheerios", price: 3.4 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      added: { name: "cheerios", price: 3.4 },
    });
    expect(items).toContainEqual({ name: "cheerios", price: 3.4 });
  });

  it("should return 400 if name or price is missing", async () => {
    const res = await request(app).post("/items").send({ name: "cheerios" });
    expect(res.statusCode).toBe(400);
  });
});

describe("GET /items/:name", () => {
  it("should return a single item", async () => {
    const res = await request(app).get("/items/popsicle");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: "popsicle", price: 1.45 });
  });

  it("should return 404 if item not found", async () => {
    const res = await request(app).get("/items/notfound");
    expect(res.statusCode).toBe(404);
  });
});

describe("PATCH /items/:name", () => {
  it("should update an item", async () => {
    const res = await request(app)
      .patch("/items/popsicle")
      .send({ name: "new popsicle", price: 2.45 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      updated: { name: "new popsicle", price: 2.45 },
    });
    expect(items).toContainEqual({ name: "new popsicle", price: 2.45 });
  });

  it("should return 404 if item not found", async () => {
    const res = await request(app)
      .patch("/items/notfound")
      .send({ name: "new popsicle" });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", () => {
  it("should delete an item", async () => {
    const res = await request(app).delete("/items/popsicle");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
    expect(items).not.toContainEqual({ name: "popsicle", price: 1.45 });
  });

  it("should return 404 if item not found", async () => {
    const res = await request(app).delete("/items/notfound");
    expect(res.statusCode).toBe(404);
  });
});
