import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import Holding from '@intractinc/base/layout/Holding';

const Engine: FC = () => {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <Suspense fallback={<Holding {...{ spinner: true }} />}>
                <Outlet />
            </Suspense>
        </div>
    );
};

const useStyles = makeStyles()((theme) => {
    return {
        root: {
            display: 'flex',
            flex: 1,
            backgroundColor: theme.palette.background.default,
        },
    };
});

export default Engine;
