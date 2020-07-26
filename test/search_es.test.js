// const axios_es = require('./axios_es');
// const expect = require('chai').expect;
// import "core-js/stable";
// import "regenerator-runtime/runtime"; // moach -r esm OK

// jest.setTimeout(30000);

import consola from "consola";

// const consola = require("consola");
consola.level = process.env.CONSOLA_DEBUG || 3;
// consola.level = process.env.CONSOLA_DEBUG || 5; //show debug

// -r esm
import search_es from "../search_es";
// const search_es = require("../search_es");

import { expect } from "chai";
// expect = require("chai").expect;

describe("@1 search_es: AND returns results ", () => {
  it("#1 search_es(''): 'empty'", async () => {
    var result = await search_es("");
    consola.debug("consola.debug #1", result);
    expect(result.length).to.equal(0);
  });

  it("#2 search_es('test') ", async () => {
    var result = await search_es("test");
    consola.debug("consola.debug>>>#2:", result);
    // expect(result.length).to.equal(10);
    expect(result.length).to.equal(11); // took time
  });

  let query = "developing countries jointly 国";
  it("#3 search_es: " + query, async () => {
    var result = await search_es(query, "dictcor");
    consola.debug("#3 consola.debug ", result);
    // expect(result.length).to.equal(10);
    expect(result.length).to.equal(0);
  });
});

describe("@2 search_es OR", () => {
  let query = "developing countries jointl 国";
  it("#1 search_es: " + query, async () => {
    let result = await search_es(query, "", "OR");
    consola.debug("#1", result);
    // expect(result.length).to.equal(0);
    expect(result.length).to.equal(11);
  });
});
