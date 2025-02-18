import { Grid } from '@mui/material';
import { Levels, Spinner } from 'react-activity';
import { FC } from 'react';

type HoldingProps = {
    spinner?: boolean;
};

const Holding: FC<HoldingProps> = ({ spinner }) => {
    return (
        <Grid display={'flex'} flexGrow={1} container justifyContent={'center'} alignItems={'center'} height={'100%'}>
            {spinner ? <Spinner /> : <Levels style={{ fontSize: 75 }} />}
        </Grid>
    );
};

export default Holding;
