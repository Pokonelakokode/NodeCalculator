import React from "react";
import {create} from "react-test-renderer";
import Button from "./Button";
import { mount } from "enzyme";

describe("Button", () => {
    it("should be able to render", () => {
        const mockFn = jest.fn();
        const component = create(
            <Button col={2} label={"TEST"} onClick={mockFn}/>,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("should run a function when clicked", () => {
        const fn = jest.fn();
        const wrapper = mount(
            <Button onClick={fn} label="TEST" col={2}/>,
        );
        wrapper
            .find(".numeric")
            .simulate("click");
        expect(fn).toBeCalled();
    });
});
