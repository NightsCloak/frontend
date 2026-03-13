import {
    Badge,
    Divider,
    InputAdornment,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {
    ColumnsPanelTrigger,
    FilterPanelTrigger,
    GridDensity,
    gridDensitySelector,
    GridToolbarProps,
    QuickFilter,
    QuickFilterClear,
    QuickFilterControl,
    QuickFilterTrigger,
    Toolbar,
    ToolbarButton,
    ToolbarPropsOverrides,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid-premium';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useState } from 'react';

type OwnerState = {
    expanded: boolean;
};

const DENISTY_OPTIONS: { label: string; value: GridDensity }[] = [
    { label: 'Compact density', value: 'compact' },
    { label: 'Standard density', value: 'standard' },
    { label: 'Comfortable density', value: 'comfortable' },
];

const StyledQuickFilter = styled(QuickFilter)({
    display: 'grid',
    alignItems: 'center',
});

const StyledToolbarButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    width: 'min-content',
    height: 'min-content',
    zIndex: 1,
    opacity: ownerState.expanded ? 0 : 1,
    pointerEvents: ownerState.expanded ? 'none' : 'auto',
    transition: theme.transitions.create(['opacity']),
}));

const StyledTextField = styled(TextField)<{
    ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    overflowX: 'clip',
    width: ownerState.expanded ? 260 : 'var(--trigger-width)',
    opacity: ownerState.expanded ? 1 : 0,
    transition: theme.transitions.create(['width', 'opacity']),
}));

type ToolbarProps = {
    title?: string | ReactNode;
    showTrashed?: boolean;
    setShowTrashed?: Dispatch<SetStateAction<boolean>>;
    disableSearch?: true;
} & GridToolbarProps &
    ToolbarPropsOverrides;

const CustomToolbar: FC<ToolbarProps> = ({ title, showTrashed, setShowTrashed, disableSearch }) => {
    // const [exportMenuOpen, setExportMenuOpen] = useState(false);
    // const [exportMenuTriggerRef, setExportMenuTriggerRef] = useState<HTMLButtonElement | null>(null);
    const apiRef = useGridApiContext();
    const density = useGridSelector(apiRef, gridDensitySelector);
    const [densityMenuOpen, setDensityMenuOpen] = useState(false);
    const [densityMenuTriggerRef, setDensityMenuTriggerRef] = useState<HTMLButtonElement | null>(null);

    return (
        <Toolbar>
            <Typography sx={{ flex: 1, mx: 0.5 }} variant={'h5'} color={'intract.main'} justifyContent={'flex-end'}>
                {title}
            </Typography>
            <Tooltip title="Columns">
                <ColumnsPanelTrigger render={<ToolbarButton />}>
                    <ViewColumnIcon fontSize="small" />
                </ColumnsPanelTrigger>
            </Tooltip>

            <Tooltip title="Filters">
                <FilterPanelTrigger
                    render={(props, state) => (
                        <ToolbarButton {...props} color="default">
                            <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                                <FilterListIcon fontSize="small" />
                            </Badge>
                        </ToolbarButton>
                    )}
                />
            </Tooltip>

            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />

            {showTrashed !== undefined && setShowTrashed !== undefined && (
                <Tooltip title={'Show Trashed'}>
                    <ToolbarButton id={'trashed-toggle'} onClick={() => setShowTrashed(!showTrashed)}>
                        <DeleteIcon fontSize="small" color={showTrashed ? 'error' : 'inherit'} sx={{ ml: 'auto' }} />
                    </ToolbarButton>
                </Tooltip>
            )}

            <Tooltip title="Settings">
                <ToolbarButton
                    ref={setDensityMenuTriggerRef}
                    id="density-menu-trigger"
                    aria-controls="density-menu"
                    aria-haspopup="true"
                    aria-expanded={densityMenuOpen ? 'true' : undefined}
                    onClick={() => setDensityMenuOpen(true)}
                >
                    <SettingsIcon fontSize="small" sx={{ ml: 'auto' }} />
                </ToolbarButton>
            </Tooltip>

            <Menu
                id="density-menu"
                anchorEl={densityMenuTriggerRef}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={densityMenuOpen}
                onClose={() => setDensityMenuOpen(false)}
                slotProps={{
                    list: {
                        'aria-labelledby': 'density-menu-trigger',
                    },
                }}
            >
                {DENISTY_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.value}
                        onClick={() => {
                            apiRef.current.setDensity(option.value);
                            setDensityMenuOpen(false);
                        }}
                    >
                        <ListItemIcon>{density === option.value && <CheckIcon fontSize="small" />}</ListItemIcon>
                        <ListItemText>{option.label}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>

            {!disableSearch && (
                <StyledQuickFilter>
                    <QuickFilterTrigger
                        render={(triggerProps, state) => (
                            <Tooltip title="Search" enterDelay={0}>
                                <StyledToolbarButton
                                    {...triggerProps}
                                    ownerState={{ expanded: state.expanded }}
                                    color="default"
                                    aria-disabled={state.expanded}
                                >
                                    <SearchIcon fontSize="small" />
                                </StyledToolbarButton>
                            </Tooltip>
                        )}
                    />
                    <QuickFilterControl
                        render={({ ref, ...controlProps }, state) => (
                            <StyledTextField
                                {...controlProps}
                                ownerState={{ expanded: state.expanded }}
                                inputRef={ref}
                                aria-label="Search"
                                placeholder="Search..."
                                size="small"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: state.value ? (
                                            <InputAdornment position="end">
                                                <QuickFilterClear edge="end" size="small" aria-label="Clear search">
                                                    <CancelIcon fontSize="small" />
                                                </QuickFilterClear>
                                            </InputAdornment>
                                        ) : null,
                                        ...controlProps.slotProps?.input,
                                    },
                                    ...controlProps.slotProps,
                                }}
                            />
                        )}
                    />
                </StyledQuickFilter>
            )}
        </Toolbar>
    );
};

export default CustomToolbar;
