import '@mui/material/styles';

declare module '@mui/material/styles' {
    export interface Palette {
        nc: Palette['primary'] & {
            divider: string;
            dark: string;
            medium: string;
            button: string;
        };
    }

    export interface PaletteOptions {
        nc: PaletteOptions['primary'] & {
            divider: string;
            dark: string;
            medium?: string;
            button: string;
        };
    }
}

declare module '@mui/material/Button' {
    export interface ButtonPropsColorOverrides {
        nc: true;
    }
}

declare module '@mui/material/Link' {
    export interface LinkPropsColorOverrides {
        nc: true;
    }
}
