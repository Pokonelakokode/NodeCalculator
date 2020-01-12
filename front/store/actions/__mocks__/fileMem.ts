import {createAction} from "@reduxjs/toolkit";

export const saveMem = jest.fn();
export const loadMem = jest.fn();
type IMemLoadType = "LOAD" | "ADD";
export const fetchMem = jest.fn();
