import { makeStyles } from 'tss-react/mui';
import { Pagination as MUIPagination } from '@mui/material';
import { ChangeEvent, FC } from 'react';

const Pagination: FC<{ pageLimit: number; page: number; updatePage: Dispatch<SetStateAction<number>> }> = ({
    pageLimit,
    page,
    updatePage,
}) => {
    const { classes } = useStyles();

    const handlePage = (_e: ChangeEvent<unknown>, page: number) => {
        updatePage(page);
    };

    return (
        <div className={classes.numbers}>
            <MUIPagination
                style={{ display: 'flex', justifyContent: 'center' }}
                count={pageLimit}
                page={page}
                onChange={handlePage}
            />
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    numbers: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        '& > *': {},
    },
    number: {
        width: 'auto',
        marginRight: theme.spacing(2),
    },
}));

export default Pagination;
