import {fabric} from "fabric";
import {NEW_CANVAS, SET_SELECTED_ELEMENT} from "./types";
import { IEditorState } from "../interfaces/IEditorState";

export const newCanvas = (
    width: number = 400,
    height: number = 800,
    color: string = "rgba(255, 255, 255, 1)",
    callback: (e) => void
) => dispatch => {
    const canvas: fabric.Canvas = new fabric.Canvas("canvas");
    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.setBackgroundColor(color, undefined);

    canvas.on({
        "object:selected": callback
    });

    // canvas.on("mouse:down", event => {
    //     if (canvas.getActiveObject()) {
    //         // alert(event.target);
    //         console.log("event.target", event.target);
    //         // setActiveElement(event.target);
    //         callback(event.target);
    //     }
    // });

    return dispatch({
        type: NEW_CANVAS,
        payload: {
            canvas,
            width,
            height
        }
    });
};

export const setActiveElement = (element) => dispatch => {
    return dispatch({
        type: SET_SELECTED_ELEMENT,
        payload: { active_element: element }
    });
};
