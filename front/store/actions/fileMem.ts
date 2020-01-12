import {createAction} from "@reduxjs/toolkit";
import {baseUrl} from "../../utils";

type IMemLoadType = "LOAD" | "ADD";
export const fetchMem = createAction<{ type: IMemLoadType }, "FETCH_MEM">("FETCH_MEM");

export const loadMem = async (): Promise<number> => {
    const req = await fetch("/mem");
    const data = await req.json();
    return data.mem || null;
};

export const saveMem = async (mem: string): Promise<string> => {
    const req = await fetch(`${baseUrl}mem/`, {
        body: JSON.stringify({mem}),
        headers: {"Content-Type": "application/json"},
        method: "POST",

    });
    return await req.json();
};

export const modMem = async (value: string, method: "ADD" | "SUB" = "ADD"): Promise<number> => {
    const req = await fetch(`${baseUrl}mod_mem/`, {
        body: JSON.stringify({value, method}),
        headers: {"Content-Type": "application/json"},
        method: "POST",
    });
    return (await req.json()).mem;
};
