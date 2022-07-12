import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { app } from "@serve/main";
import { CREATED, OK } from "http-status";
import { fields } from "@serve/utils/system";

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
  if (fields["user"]) {
    const user = fields["user"];
    it("log in an accounts", async () => {
      await supertest(app.app)
        .post("/api/v1/user/login")
        .set("content-type", "application/json")
        .send({
          token: user.email,
          password: "password",
        })
        .expect(OK)
        .then((res) => {
          expect(res.body.token).not.toEqual(null);
        });
    });

    it("reset an accounts", async () => {
      await supertest(app.app)
        .post("/api/v1/user/reset")
        .set("content-type", "application/json")
        .send({
          email: user.email,
        })
        .expect(OK)
        .then((res) => {
          expect(res.body.message).toEqual(
            "Password has been reset, please check your email account."
          );
        });
    });
  }

  if (fields["token"]) {
    const user = fields["user"];
    const token = fields["token"];
    it("find all", async () => {
      await supertest(app.app)
        .get("/api/v1/user")
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .query({ email: user.email })
        .expect(OK)
        .then((res) => {
          expect(res.body).not.toEqual(null);
        });
    });

    it("find one", async () => {
      await supertest(app.app)
        .get("/api/v1/user/one")
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .query({
          public_id: user.public_id,
        })
        .expect(OK)
        .then((res) => {
          expect(res.body).not.toEqual(null);
        });
    });
  }
});
