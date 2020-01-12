import React from "react";
import {Provider} from "react-redux";
import {create} from "react-test-renderer";
import {store} from "../store";
import Operators from "./Operators";

describe("Operators component", () => {
    it("should be able to render", () => {
        const component = create(
            <Provider store={store}>
                <Operators />
            </Provider>,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});
