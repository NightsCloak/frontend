import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ModelPortalState = {
    recentColors: [],
    dockAnnotation: null,
};

const modelPortalSlice = createSlice({
    name: 'modelPortal',
    initialState,
    reducers: {
        addRecentColor: (state, action: PayloadAction<string>) => {
            const newColor = action.payload.toLowerCase();

            if (state.recentColors.length === 0) {
                state.recentColors = [newColor];
                return;
            }

            const exists = state.recentColors.find((item) => item === newColor);

            if (!exists) {
                state.recentColors = [newColor, ...state.recentColors];
            }

            if (state.recentColors.length > 21) {
                state.recentColors = state.recentColors.slice(0, 21);
            }
        },
        toggleDockAnnotation: (state, action: PayloadAction<ModelPortalState['dockAnnotation']>) => {
            state.dockAnnotation = action.payload;
        },
    },
});

export default modelPortalSlice;
 
export const { addRecentColor, toggleDockAnnotation } = modelPortalSlice.actions;
