import type { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer";

import { collectResponses } from "./utils";

const testPort = 3000;
const testServer = `http://localhost:${testPort}`;

describe("route headers", () => {
  let browser: Browser;
  let page: Page;
  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterEach(() => browser.close());

  describe("from a JavaScript route", () => {
    it("are correct", async () => {
      let responses = collectResponses(page, url => url.pathname === "/gists");

      await page.goto(`${testServer}/gists`);

      expect(responses).toHaveLength(1);
      expect(responses[0].headers()["cache-control"]).toEqual(
        "public, max-age=60"
      );
    });
  });

  describe("from a JavaScript child route", () => {
    it("overrides the parent header of the same name", async () => {
      let responses = collectResponses(
        page,
        url => url.pathname === "/gists/mjackson"
      );

      await page.goto(`${testServer}/gists/mjackson`);

      expect(responses).toHaveLength(1);
      expect(responses[0].headers()["cache-control"]).toEqual(
        "public, max-age=300"
      );
    });
  });

  describe("from a pathful route", () => {
    it("passes the correct loader result to the route's headers function", async () => {
      let responses = collectResponses(
        page,
        url => url.pathname === "/route-headers"
      );

      await page.goto(`${testServer}/route-headers`);

      expect(responses).toHaveLength(1);
      expect(responses[0].headers()["route"]).toEqual("/route-headers");
    });
  });

  describe("from a child of a pathless route", () => {
    it("passes the correct loader result to the route's headers function", async () => {
      let responses = collectResponses(
        page,
        url => url.pathname === "/with-layout"
      );

      await page.goto(`${testServer}/with-layout`);

      expect(responses).toHaveLength(1);
      expect(responses[0].headers()["route"]).toEqual("/__layout/with-layout");
    });
  });
});
