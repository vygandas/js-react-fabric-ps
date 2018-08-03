import {fabric} from "fabric";
import {NEW_CANVAS} from "./types";
import { IEditorState } from "../interfaces/IEditorState";

export const newCanvas = (width: number = 400, height: number = 800, color: string = "rgba(255, 255, 255, 1)") => dispatch => {
    const canvas: fabric.Canvas = new fabric.Canvas("canvas");
    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.setBackgroundColor(color, undefined);
    return dispatch({
        type: NEW_CANVAS,
        payload: {
            canvas,
            width,
            height
        }
    });
};
