import React from "react";
import {Provider} from "react-redux";
import {create} from "react-test-renderer";
import {store} from "../store";
import Numericals from "./Numericals";

describe("Numericals", () => {
    it("should be able to render", () => {
        const component = create(
            <Provider store={store}>
                <Numericals/>
            </Provider>,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});
