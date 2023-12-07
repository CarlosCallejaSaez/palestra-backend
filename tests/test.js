import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/server.js"; 

const { expect } = chai;
chai.use(chaiHttp);

describe("API Tests", () => {
 
    describe("GET /api/exercises", () => {
        it("should return a list of exercises", (done) => {
          chai
            .request(app)
            .get("/api/exercises")
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("array");
              done();
            });
        });
      });

      describe("GET /api/users", () => {
        it("should return 404", (done) => {
          chai
            .request(app)
            .get("/api/users")
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
        });
      });

      describe("GET /api/classes", () => {
        it("should return a list of classes", (done) => {
          chai
            .request(app)
            .get("/api/classes")
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("array");
              done();
            });
        });
      });

  describe("Invalid Endpoint", () => {
    it("should return a 404 for invalid endpoints", (done) => {
      chai
        .request(app)
        .get("/invalid-endpoint")
        .end((err, res) => {
          expect(res).to.have.status(404);
   
          done();
        });
    });
  });
});

