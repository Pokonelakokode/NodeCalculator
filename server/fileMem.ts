import {closeSync, openSync, readFile, writeFile} from "fs-extra";

class FileMem {
    public content: number = 0;
    public ready: Promise<boolean>;
    private readonly fileName: string;
    constructor(fileName: string = "mem.txt") {
        this.fileName = fileName;
        this.ready = new Promise(async (resolve) => {
            await this.readMem();
            resolve(true);
        });
    }
    public async setContent(content: number) {
        this.content = content;
        await this.writeMem();
        return this.content;
    }
    private async readMem() {
        try {
            const data = await readFile(this.fileName, "utf8");
            this.content = parseInt(data, 10) || 0;
            return this.content;
        } catch (e) {
            await writeFile(this.fileName, "0");
            // closeSync(openSync(this.fileName, "w"));
            this.content = 0;
            return 0;
        }
    }
    private async writeMem() {
        return await writeFile(this.fileName, this.content);
    }
}

export default FileMem;
