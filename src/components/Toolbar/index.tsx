import * as React from "react";
import {newCanvas} from "../../actions/editor.actions";
import {connect} from "react-redux";
import "./Toolbar.scss";
import { setBgColor } from "../../handlers/canvas";
import { IEditorState } from "../../interfaces/IEditorState";

interface IToolbarProps {
    canvas: IEditorState["canvas"];
    newCanvas: typeof newCanvas;
}

class Toolbar extends React.Component<IToolbarProps, {}> {
    getCanvasSizeParamsDialog = () => {
        return {
            w: parseInt(prompt("Width in px (only number)", "600")),
            h: parseInt(prompt("Height in px (only number)", "400"))
        };
    }
    render() {
        return (
            <div className="tool-bar">
                <ul className="tool-bar-items">
                    <li>
                        <button onClick={() => { const d = this.getCanvasSizeParamsDialog(); this.props.newCanvas(d.w, d.h); }}>New</button>
                    </li>
                    <li>
                        <button onClick={() => {
                            this.props.canvas.setBackgroundColor(prompt("Enter color code", "#FFFFFF"), undefined);
                            this.props.canvas.renderAll();
                        }}>BG color</button>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state: { editor: IEditorState }) => {
    return {
        canvas: state.editor.canvas
    };
};

export default connect(mapStateToProps, {newCanvas, setBgColor})(Toolbar);