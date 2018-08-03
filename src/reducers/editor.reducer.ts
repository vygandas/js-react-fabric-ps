import {IEditorState} from "../interfaces/IEditorState";
import {NEW_CANVAS, SET_SELECTED_ELEMENT} from "../actions/types";
import { Reducer } from "redux";
import { IAction } from "../interfaces/IAction";

export const initialState: IEditorState = {
    canvas: null,
    width: null,
    height: null
};

export const editor: Reducer<IEditorState> = (state: IEditorState = initialState, action: IAction): IEditorState => {
    switch (action.type) {
    case NEW_CANVAS:
        return <IEditorState>{ ...state, ...action.payload };
    default:
        return state;
    }
};
