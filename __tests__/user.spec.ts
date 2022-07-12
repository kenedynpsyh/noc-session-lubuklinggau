import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { app } from "@serve/main";
import { CREATED } from "http-status";

describe("user::unittest", () => {
  it("create new accounts ", async () => {
    await supertest(app.app)
      .post("/api/v1/user/created")
      .set("content-type", "application/json")
      .send({
        fullname: `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        password: "password",
        confirmation: "password",
      })
      .expect(CREATED)
      .then((res) => {
        expect(res.body.message).toEqual("Accounts has been created");
      });
  });
});
