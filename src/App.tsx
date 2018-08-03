import * as React from "react";
import "assets/scss/App.scss";

import store from "./store";
import {Provider} from "react-redux";
import EditorPage from "./views/Editor";

export default class App extends React.Component<undefined, undefined> {
    render(): JSX.Element {
        return (
            <Provider store={store}>
                <div className="app-component">
                    <EditorPage/>
                </div>
            </Provider>
        );
    }
}
