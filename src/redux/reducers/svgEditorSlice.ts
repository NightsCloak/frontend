import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SvgEditorState = {
    elements: [
        {
            id: '1',
            type: 'triangle',
            attr: {
                fill: '#989898',
                points: [
                    { x: 0.25, y: 0.33 },
                    { x: 0.125, y: 0.6667 },
                    { x: 0.375, y: 0.5 },
                ],
                flipX: false,
                flipY: false,
            },
        },
        {
            attr: {
                cx: 0.4333,
                cy: 0.1667,
                rx: 0.08333,
                ry: 0.08333,
                fill: '#FF00FF',
                flipX: false,
                flipY: false,
                rotation: 0,
            },
            id: '2',
            type: 'ellipse',
        },
    ],
    isMoving: false,
    isResizing: false,
    isRotating: false,
    activeElement: null!,
    canvasSize: { height: 0, width: 0 },
};

const svgEditorSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (_state) => initialState,
        updateCanvasSize: (state, action: PayloadAction<{ height: number; width: number }>) => {
            state.canvasSize = action.payload;
        },
        addElement: (state, action: PayloadAction<SvgElementProps>) => {
            state.elements = [...state.elements, action.payload];
            state.activeElement = action.payload;
        },
        //Move element around
        moveElement: (state, action: PayloadAction<{ id: SvgElementProps['id']; event: { x: number; y: number } }>) => {
            state.elements = state.elements.map((element) => {
                if (element.id === action.payload.id) {
                    if (element.type === 'triangle' && element?.attr?.points) {
                        element.attr.points = element.attr.points.map((point) => {
                            return {
                                x: point.x + action.payload.event.x / state.canvasSize.width,
                                y: point.y + action.payload.event.y / state.canvasSize.height,
                            };
                        });
                    }
                    if (element.type === 'ellipse' && element.attr?.cx && element.attr?.cy) {
                        element.attr.cx += action.payload.event.x / state.canvasSize.width;
                        element.attr.cy += action.payload.event.y / state.canvasSize.height;
                    }
                    state.activeElement = element;
                }
                return element;
            });
        },
        resizeElement: (
            state,
            action: PayloadAction<{
                id: SvgElementProps['id'];
                event: { x: number; y: number; scrollX?: boolean; scrollY?: boolean };
            }>
        ) => {
            state.elements = state.elements.map((element) => {
                if (element.id === action.payload.id) {
                    if (element.type === 'triangle') {
                        element.attr.points = element.attr.points.map((point, index) => {
                            if (`${index}` === state.isResizing) {
                                return {
                                    x: !element.attr.flipX
                                        ? point.x + action.payload.event.x / state.canvasSize.width
                                        : point.x - action.payload.event.x / state.canvasSize.width,
                                    y: !element.attr.flipY
                                        ? point.y + action.payload.event.y / state.canvasSize.height
                                        : point.y + action.payload.event.y / state.canvasSize.height,
                                };
                            }
                            return point;
                        });
                    }

                    if (element.type === 'ellipse') {
                        if (element.attr.ry && state.isResizing === '0') {
                            element.attr.ry = (element.attr.ry ?? 0) - action.payload.event.y / state.canvasSize.height;
                            if (element.attr.ry <= 0) element.attr.ry = 1 / state.canvasSize.height;
                        }
                        if (state.isResizing === '1') {
                            element.attr.rx = element.attr.rx + action.payload.event.x / state.canvasSize.height;
                            element.attr.ry = element.attr.ry + action.payload.event.x / state.canvasSize.width;
                            if (element.attr.rx <= 0) element.attr.rx = 1 / state.canvasSize.width;
                            if (element.attr.ry <= 0) element.attr.ry = 1 / state.canvasSize.height;
                        }

                        if (element.attr.rx && state.isResizing === '2') {
                            element.attr.rx = (element.attr.rx ?? 0) + action.payload.event.x / state.canvasSize.width;
                            if (element.attr.rx <= 0) element.attr.rx = 1 / state.canvasSize.width;
                        }
                        if (!state.isResizing && (action.payload.event.scrollX || action.payload.event.scrollY)) {
                            if (action.payload.event.scrollX)
                                element.attr.rx = element.attr.rx + action.payload.event.x / state.canvasSize.width;
                            if (action.payload.event.scrollY)
                                element.attr.ry = element.attr.ry + action.payload.event.y / state.canvasSize.width;
                            if (element.attr.rx <= 0) element.attr.rx = 1 / state.canvasSize.width;
                            if (element.attr.ry <= 0) element.attr.ry = 1 / state.canvasSize.height;
                        }
                    }
                    state.activeElement = element;
                }
                return element;
            });
        },
        rotateElement: (
            state,
            action: PayloadAction<{ id: SvgElementProps['id']; event: number; input?: boolean }>
        ) => {
            state.elements = state.elements.map((element) => {
                if (element.id === action.payload.id && element.type === 'ellipse') {
                    if (element.attr.rotation && !action.payload.input) element.attr.rotation -= action.payload.event;
                    else if (element.attr.rotation && action.payload.input)
                        element.attr.rotation = action.payload.event;
                    else {
                        element.attr.rotation = action.payload.event;
                    }
                    state.activeElement = element;
                    return element;
                }
                return element;
            });
        },
        flipElement: (state, action: PayloadAction<{ id: SvgElementProps['id']; axis: 'x' | 'y' }>) => {
            state.elements = state.elements.map((element) => {
                if (element.id === action.payload.id)
                    if (action.payload.axis === 'x') {
                        element.attr.flipX = !element.attr.flipX;
                        return element;
                    }

                if (action.payload.axis === 'y') {
                    element.attr.flipY = !element.attr.flipY;
                    return element;
                }
                return element;
            });
        },
        setIsMoving: (state, action: PayloadAction<boolean>) => {
            state.isMoving = action.payload;
        },
        setIsResizing: (state, action: PayloadAction<SvgEditorState['isResizing']>) => {
            state.isResizing = action.payload;
        },
        setIsRotating: (state, action: PayloadAction<SvgEditorState['isRotating']>) => {
            state.isRotating = action.payload;
        },
        setActiveElement: (state, action: PayloadAction<SvgElementProps | null>) => {
            state.activeElement = action.payload;
        },
        updateColor: (state, action: PayloadAction<{ id: SvgElementProps['id']; color: Color }>) => {
            state.elements = state.elements.map((element) => {
                if (element.id === action.payload.id && element.type !== 'image') {
                    element.attr.fill = action.payload.color;
                    state.activeElement = element;
                    return element;
                }
                return element;
            });
        },
    },
});

export default svgEditorSlice;
 
export const {
    addElement,
    moveElement,
    resizeElement,
    rotateElement,
    flipElement,
    setIsMoving,
    setIsResizing,
    setIsRotating,
    setActiveElement,
    updateCanvasSize,
    updateColor,
} = svgEditorSlice.actions;
