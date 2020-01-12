import request from "supertest";
import FileMem from "./fileMem";
import app from "./server";

describe("Express server", () => {
    it("should be able to get saved memory from './mem'", async () => {
        const res = await request(app)
            .get("/mem");
        expect(typeof res.body.mem).toBe("number");
    });
    it("should return error object if it couldn't set memory",async () => {
        const res = await request(app)
            .post("/mem")
            .send({mem: "ERROR TEST"});
        expect(res.status).toEqual(400);
        expect(res.body).toStrictEqual({error: "COULDN'T SET MEMORY"});
    });
    it("should return error if it couldn't add to memory", async () => {
        const res = await request(app)
            .post("/mod_mem")
            .send({value: "ERROR TEST", method: "ADD"});
        expect(res.status).toEqual(400);
        expect(res.body).toStrictEqual({error: "COULDN'T SET MEMORY"});
    });
    it("should be able to set memory with post to './mem'", async () => {
        const res = await request(app)
            .post("/mem")
            .send({mem: 666});
        expect(res.status).toEqual(200);
        expect(res.body).toStrictEqual({mem: 666});
    });
    it("should be able to add to memory", async () => {
        const res = await request(app)
            .post("/mod_mem")
            .send({value: 100, method: "ADD"});
        expect(res.status).toEqual(200);
        expect(res.body).toStrictEqual({mem: 766});
    });
});