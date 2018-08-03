import * as React from "react";
import {newCanvas} from "../../actions/editor.actions"; 
import {connect} from "react-redux";
import "./Toolbar.scss";

interface IToolbarProps {
    newCanvas: typeof newCanvas;
}

class Toolbar extends React.Component<IToolbarProps, {}> {
    render() {
        return (
            <div className="tool-bar">
                <ul className="tool-bar-items">
                    <li>
                        <button onClick={() => this.props.newCanvas(200, 1400)}>New</button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default connect(undefined, {newCanvas})(Toolbar);