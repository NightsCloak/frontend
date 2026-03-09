type ToolItem = {
    icon: ReactNode;
    id: EditorMenuSections;
    title: string;
    tool: ReactNode | ReactNode[];
    keepMounted: boolean;
    width?: number;
}[];

type ImageAvatarProps = {
    type?: AvatarType;
    avatar?: string | null;
    icon?: ReactNode;
    iconLabel?: ReactNode;
    name?: string | null;
    size?: number;
    disableClickable?: boolean;
};

type AvatarType = 'user' | 'icon';

type Config = {
    routes?: RouteObject[];
    app?: 'frontend' | 'admin';
    env?: 'prod' | 'development';
    version?: `v${number}.${number}.${number}`;
    gitCommit?: string;
    configTheme?: (prefersDarkMode: boolean) => ThemeOptions;
    theme?: ThemeOptions;
};

interface NCModalProps extends ModalOwnProps {
    title?: string;
    children?: React.ReactNode;
    sx?: SxProps;
    override?: { [key in styleKeys]?: string };
    open?: boolean;
    handler?: React.MouseEventHandler<SVGSVGElement | HTMLElement>;
    icon?: React.ReactNode;
    iconLabel?: string;
}
