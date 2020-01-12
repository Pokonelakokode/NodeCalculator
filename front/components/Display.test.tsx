import { mount } from "enzyme";
import * as React from "react";
import { create } from "react-test-renderer";
import {IOperation} from "../store/pageState";
import Display from "./Display";

const tests: Array<[string, IOperation[], string, string]> = [
    ["0", [], "0", "0"],
    ["0", [{operator: "+", value: "22.5"}], "0 + 22.5", "22.5"],
    ["0", [
        {operator: "+", value: "22.5"},
        {operator: "-", value: "2.5"},
        {operator: "/", value: "4"},
        {operator: "*", value: "3"},
        ],
        "0 + 22.5 - 2.5 / 4 * 3",
        "15",
    ],
    ["0", [{operator: "/", value: "0"}], "0 / 0", "Not a number"],
    ["10", [{operator: "/", value: "0"}], "10 / 0", "Infinity"],
];

describe("Display Component", () => {
    it("should be able to render", () => {
        const component = create(
            <Display value={"666"} operations={[]}/>,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    it.each(tests)("%s with operations %j should be %s", (value, operations, display, calculation) => {
        const wrapper = mount(
            <Display value={value} operations={operations}/>,
        );
        const displayText = wrapper
            .find(".display")
            .text();
        const calculationText = wrapper
            .find(".calculation")
            .text();
        expect(displayText).toBe(display);
        expect(calculationText).toBe(calculation);
    })
    it("should render proper text from inputs", () => {
        const wrapper = mount(
            <Display value={"0"} operations={[{value: "100", operator: "+"}]}/>,
        );
        const text = wrapper
            .find(".display")
            .text();
        const calculations = wrapper
            .find(".calculation")
            .text();
        expect(text).toBe("0 + 100");
        expect(calculations).toBe("100");
    });
});
