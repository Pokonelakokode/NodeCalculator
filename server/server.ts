import express from "express";
import FileMem from "./fileMem";

const app = express();
app.use(express.json());
app.use(express.static("dist"));

const mem = new FileMem();
app.get("/mem", async (req, res) => {
    await mem.ready;
    res.json({mem: mem.content});
});

app.post("/mem", async (req, res) => {
    const content = req.body.mem && parseFloat(req.body.mem);
    if (!isNaN(content)) {
        await mem.setContent(content);
        res.json({mem: mem.content});
    } else {
        res.status(400).json({error: "COULDN'T SET MEMORY"});
    }
});

app.post("/mod_mem", async (req, res) => {
    console.log("MOD MEM");
    const value = req.body.value && parseFloat(req.body.value);
    if (!isNaN(value)) {
        await mem.setContent(req.body.method === "ADD" ? mem.content + value : mem.content - value);
        res.json({mem: mem.content});
    } else {
        res.status(400).json({error: "COULDN'T SET MEMORY"});
    }
});

export default app;
