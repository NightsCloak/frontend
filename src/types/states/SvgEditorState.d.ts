interface SvgEditorState {
    elements: SvgElementProps[];
    isMoving: boolean;
    isResizing: string | boolean;
    isRotating: boolean;
    activeElement: SvgElementProps | null;
    canvasSize: { height: number; width: number };
}
