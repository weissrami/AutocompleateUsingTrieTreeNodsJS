let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/index");

chai.use(chaiHttp);

describe("Prefix", () => {
  describe("/GET prefix", () => {
    it("Trivial should GET all the prefix of AAH", (done) => {
      chai
        .request(server)
        .get("/dictionary?prefix=AAH")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(4);
          res.body.should.be.eql(["AAH", "AAHS", "AAHED", "AAHING"]);
          done();
        });
    });
  });

  describe("/GET prefix", () => {
    it("No results", (done) => {
      chai
        .request(server)
        .get("/dictionary?prefix=AAHAAHAAHAAHAAHAAHAAHAAHAAHAAHAAH")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          res.body.should.be.eql([]);
          done();
        });
    });
  });

  describe("/GET prefix", () => {
    it("Empty prefix error", (done) => {
      chai
        .request(server)
        .get("/dictionary?prefix=")
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});
