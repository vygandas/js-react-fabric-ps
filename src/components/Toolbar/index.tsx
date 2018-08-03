import * as React from "react";
import {newCanvas} from "../../actions/editor.actions"; 
import {connect} from "react-redux";
import "./Toolbar.scss";

interface IToolbarProps {
    newCanvas: typeof newCanvas;
}

class Toolbar extends React.Component<IToolbarProps, {}> {
    getCanvasSizeParamsDialog = () => {
        const w = parseInt(prompt("Width in px (only number)", "600"));
        const h = parseInt(prompt("Height in px (only number)", "400"));
        return {
            w, h
        };
    }
    render() {
        return (
            <div className="tool-bar">
                <ul className="tool-bar-items">
                    <li>
                        <button onClick={() => { const d = this.getCanvasSizeParamsDialog(); this.props.newCanvas(d.w, d.h); }}>New</button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default connect(undefined, {newCanvas})(Toolbar);