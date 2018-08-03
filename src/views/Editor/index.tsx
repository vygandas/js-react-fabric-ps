import * as React from "react";
import {connect} from "react-redux";
import "./Editor.scss";
import { IEditorState } from "../../interfaces/IEditorState";
import Toolbar from "../../components/Toolbar";

export interface EditorPageProps {
    canvas: IEditorState["canvas"];
}

interface EditorPageState {
}

class EditorPage extends React.Component<EditorPageProps, EditorPageState> {
    constructor(props: EditorPageProps) {
        super(props);
    }
    render(): JSX.Element {
        return (
            <div className="editor-page">
                <Toolbar/>

                <div className="canvas-wrapper">
                    <canvas id="canvas" className={this.props.canvas ? "" : "hidden"}></canvas>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IEditorState) => {
    return {
        canvas: state.canvas
    };
};

export default connect(mapStateToProps)(EditorPage);
