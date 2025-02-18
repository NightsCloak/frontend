type SvgElementProps =
    // | {
    //       id: string | number;
    //       type: 'image' | 'triangle' | 'ellipse' | 'rect' | 'path' | 'text' | string;
    //       attr: {
    //           cx?: number;
    //           cy?: number;
    //           cx2?: number;
    //           cy2?: number;
    //           r?: number;
    //           rx?: number;
    //           ry?: number;
    //           fill?: Color | undefined;
    //           stroke?: Color | undefined;
    //           strokeWidth?: number;
    //           preserveAspectRatio?: boolean;
    //           crossOrigin?: boolean;
    //           points?: { x: number; y: number }[];
    //           flipX?: boolean; //degrees
    //           flipY?: boolean; //degrees
    //           rotation?: number;
    //       };
    //   }
    EllipseProps | TriangleProps | ImageProps;

type EllipseProps = {
    id: string;
    type: 'ellipse';
    attr: {
        cx: number;
        cy: number;
        cx2?: number;
        cy2?: number;
        rx: number;
        ry: number;
        fill: Color | undefined;
        flipX: boolean;
        flipY: boolean;
        rotation: number; //degrees
    };
};

type TriangleProps = {
    id: string;
    type: 'triangle';
    attr: {
        fill: Color | undefined;
        points: { x: number; y: number }[];
        flipX: boolean;
        flipY: boolean;
    };
};

type ImageProps = {
    id: string;
    type: 'image';
    attr: {
        height: number;
        width: number;
        x: number;
        y: number;
        href: string;
        flipX: boolean; //degrees
        flipY: boolean; //degrees
    };
};
