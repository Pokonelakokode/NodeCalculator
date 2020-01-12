import React from "react";
import {Provider} from "react-redux";
import {create} from "react-test-renderer";
import {store} from "../store";

import Memory from "./Memory";

describe("Memory component", () => {
    it("should be able to render", () => {
        const component = create(
            <Provider store={store}>
                <Memory/>
            </Provider>,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});
