import {pathExistsSync, readFile, unlink} from "fs-extra";
import FileMem from "./fileMem";

describe("File Mem", () => {
    let mem: FileMem;
    beforeAll(async (cb) => {
        mem = new FileMem("test.txt");
        await mem.ready;
        cb();
    });
    afterAll(async (cb) => {
        await unlink("test.txt");
        cb();
    });
    it("should create an empty mem file if not existed", async () => {
        expect(pathExistsSync("test.txt")).toBe(true);
    });
    it("should return null for empty content",  async () => {
        expect(mem.content).toBe(0);
    });
    it("should be able to set content", async () => {
        await mem.setContent(666);
        expect(mem.content).toBe(666);
        const fileContent = await readFile("test.txt", "utf8");
        expect(fileContent).toBe("666");
    });
});
