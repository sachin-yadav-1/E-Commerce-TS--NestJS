import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { connection } from "mongoose";
import * as request from "supertest";
import { capitaliseString } from "../src/helpers/stringHelpers";
import { AppModule } from "./../src/app.module";

describe("Authentication System E2E", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await connection.close();
  });

  const userEmail = "chunky.pandey@gmail.com";
  const userFirstName = "chunky";
  const userLastName = "pandey";
  const userpassword = "Sac#192";
  let userToken: string;

  it("(POST) /auth/signup", async () => {
    const res = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ firstName: userFirstName, lastName: userLastName, email: userEmail, password: userpassword })
      .expect(201);

    const { _id, firstName, lastName, email, mobile, cc, token, role } = res.body;

    expect(_id).toBeDefined();
    expect(token).toBeDefined();
    expect(firstName).toEqual(capitaliseString(userFirstName));
    expect(lastName).toEqual(capitaliseString(userLastName));
    expect(email).toEqual(userEmail.toLowerCase());
    expect(mobile).toEqual("");
    expect(cc).toEqual("");
    expect(role).toEqual("USER");
  });

  it("(POST) /auth/login", async () => {
    const res = await request(app.getHttpServer()).post("/auth/login").send({ email: userEmail, password: userpassword }).expect(201);

    const { _id, firstName, lastName, email, mobile, cc, token, role } = res.body;
    userToken = token;

    expect(_id).toBeDefined();
    expect(token).toBeDefined();
    expect(mobile).toBeDefined();
    expect(cc).toBeDefined();
    expect(firstName).toEqual(capitaliseString(userFirstName));
    expect(lastName).toEqual(capitaliseString(userLastName));
    expect(email).toEqual(userEmail.toLowerCase());
    expect(role).toEqual("USER");
  });

  it("(GET) /auth/profile", async () => {
    const res = await request(app.getHttpServer()).get("/auth/profile").auth(userToken, { type: "bearer" }).expect(200);

    const { _id, firstName, lastName, email, mobile, cc, role } = res.body;

    expect(_id).toBeDefined();
    expect(mobile).toBeDefined();
    expect(cc).toBeDefined();
    expect(firstName).toEqual(capitaliseString(userFirstName));
    expect(lastName).toEqual(capitaliseString(userLastName));
    expect(email).toEqual(userEmail.toLowerCase());
    expect(role).toEqual("USER");
  });
});
