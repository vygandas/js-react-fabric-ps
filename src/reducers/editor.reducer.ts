import {IEditorState} from "../interfaces/IEditorState";
import {NEW_CANVAS} from "../actions/types";
import { Reducer } from "../../node_modules/redux";
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
