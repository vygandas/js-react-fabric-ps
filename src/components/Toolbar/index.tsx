import * as React from "react";
import {newCanvas} from "../../actions/editor.actions";
import {connect} from "react-redux";
import "./Toolbar.scss";
import { IEditorState } from "../../interfaces/IEditorState";
import {fabric} from "fabric";

interface IToolbarProps {
    canvas: IEditorState["canvas"];
    newCanvas: typeof newCanvas;
}

interface IToolbarState {
    active_element: any;
}

class Toolbar extends React.Component<IToolbarProps, IToolbarState> {
    constructor(props) {
        super(props);
        this.state = {
            active_element: null
        };
    }
    getCanvasSizeParamsDialog = () => {
        return {
            w: parseInt(prompt("Width in px (only number)", "600")),
            h: parseInt(prompt("Height in px (only number)", "400"))
        };
    }
    addImage = () => {
        const imgUrl = prompt("Enter URL of Image", "https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg");
        const radius = 6000;
        fabric.Image.fromURL(imgUrl, img => {
            img.set({
              left: 10,
              top: 10,
              angle: -15,
            //   width: 150,
            //   height: 150,
              clipTo: function (ctx) {
                ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
              }
            });
            this.props.canvas.add(img).renderAll();
            // this.props.canvas.renderAll();
          });
    }
    handleActiveElement = (e) => {
        this.setState({ active_element: e });
    }
    render() {
        return (
            <div className="tool-bar">
                <ul className="tool-bar-items">
                    <li>
                        <button onClick={() => {
                            const d = this.getCanvasSizeParamsDialog();
                            this.props.newCanvas(d.w, d.h, "white", this.handleActiveElement);
                            // this.initHandlers();
                        }}>New</button>
                    </li>
                    {this.props.canvas && [
                    <li>
                        <button onClick={() => {
                            this.props.canvas.setBackgroundColor(prompt("Enter color code", "#FFFFFF"), undefined);
                            this.props.canvas.renderAll();
                        }}>set BG color</button>
                    </li>,
                    <li>
                        <button onClick={() => this.addImage()}>add Image from url</button>
                    </li>,
                    <li>
                        <button onClick={() => {
                            console.log("this.state.active_element", this.state.active_element.selected);
                            // this.props.canvas.getActiveObject().remove();
                            this.props.canvas.remove(this.props.canvas.getActiveObject());
                            this.props.canvas.renderAll();
                        }}>remove selected</button>
                    </li>
                    ]}
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

export default connect(mapStateToProps, {newCanvas})(Toolbar);