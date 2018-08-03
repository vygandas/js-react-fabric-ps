import * as React from "react";
import {newCanvas} from "../../actions/editor.actions";
import {connect} from "react-redux";
import "./Toolbar.scss";
import { IEditorState } from "../../interfaces/IEditorState";
import {fabric} from "fabric";

const FontFaceObserver = require("fontfaceobserver");

interface IToolbarProps {
    canvas: IEditorState["canvas"];
    newCanvas: typeof newCanvas;
}

interface IToolbarState {
    active_element: any;
}

const fonts = ["Pacifico", "VT323", "Quicksand", "Inconsolata"];

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
              clipTo: function (ctx) {
                ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
              }
            });
            this.props.canvas.add(img).renderAll();
          });
    }
    addText = () => {
        const textbox = new (fabric as any).Textbox(prompt("Enter text", "Lorum ipsum dolor sit amet"), {
            left: 50,
            top: 50,
            width: 150,
            fontSize: 20
        });
        this.props.canvas.add(textbox);
    }
    handleActiveElement = (e) => {
        this.setState({ active_element: e });
    }
    loadAndUse = (font) => {
        const myfont = new FontFaceObserver(font);
        myfont.load()
            .then(() => {
                this.props.canvas.getActiveObject().set("fontFamily" as any, font);
                this.props.canvas.requestRenderAll();
            }).catch((e) => {
                console.log(e);
                alert("font loading failed " + font);
            });
    }
    downloadImage = () => {
        const dataURL = this.props.canvas.toDataURL({
            format: "png",
            left: 0,
            top: 0,
            width: this.props.canvas.getWidth(),
            height: this.props.canvas.getHeight(),
        });
        console.log("dataURL", dataURL);
    }
    render() {
        return (
            <div className="tool-bar">
                <ul className="tool-bar-items">
                    <li>
                        <button onClick={() => {
                            const d = this.getCanvasSizeParamsDialog();
                            this.props.newCanvas(d.w, d.h, "white", this.handleActiveElement);
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
                            this.props.canvas.remove(this.props.canvas.getActiveObject());
                            this.props.canvas.renderAll();
                        }}>remove selected</button>
                    </li>,
                    <li>
                        <button onClick={() => this.addText()}>add text</button>
                    </li>,
                    <li>
                        <select onChange={(e) => {
                             if (e.target.value !== "Times New Roman") {
                                this.loadAndUse(e.target.value);
                              } else {
                                this.props.canvas.getActiveObject().set("fontFamily" as any, e.target.value);
                                this.props.canvas.requestRenderAll();
                              }
                        }}>
                            <option value=""></option>
                            {fonts.map(f => <option value={f}>{f}</option>)}
                        </select>
                    </li>,
                    <li>
                        <button onClick={() => this.addText()}>download png</button>
                    </li>,
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