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
    name?: string | null;
    size?: number;
    disableClickable?: boolean;
};

type AvatarType = 'organization' | 'project' | 'asset' | 'collection' | 'user' | 'texture' | 'icon';

type OrgMenu = {
    [key: Organization['id']]: Organization & { projects: Project[]; open: boolean; openProject: Project['id'] | null };
};

interface BaseProps {
    config: Config;
    routeConfig: RouteObject[];
}

type Config = {
    routes?: RouteObject[];
    app?: 'frontend' | 'admin';
    env?: 'prod' | 'development';
    version?: `v${number}.${number}.${number}`;
    gitCommit?: string;
    configTheme?: (prefersDarkMode: boolean) => ThemeOptions;
    theme?: ThemeOptions;
};

type styleKeys = 'root' | 'box' | 'title' | 'children';

interface NCModalProps {
    title?: string;
    children?: React.ReactNode;
    sx?: { [key in styleKeys]?: CSSProperties };
    override?: { [key in styleKeys]?: string };
    open?: boolean;
    handler?: React.MouseEventHandler<SVGSVGElement | HTMLElement>;
    icon?: React.ReactNode;
}
