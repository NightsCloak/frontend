import { Box, Button, TextField, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import userApi, { useUpdateUserNameMutation } from '@/redux/features/user';
import { PersonOutlined } from '@mui/icons-material';
import { Digital } from 'react-activity';
import { useAppDispatch } from '@/redux/hooks';
import { FC, useEffect, useState } from 'react';

interface ManageNameProps {
    user: User;
    expandedMenu: Dispatch<SetStateAction<string | false>>;
}

const ManageName: FC<ManageNameProps> = ({ user, expandedMenu }) => {
    const { classes } = useStyles();
    const dispatch = useAppDispatch();
    const [firstName, setFirstName] = useState<string>(user.first);
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastName, setLastName] = useState<string>(user.last);
    const [lastNameError, setLastNameError] = useState<string>('');
    const [updateName, { isLoading, isSuccess, error }] = useUpdateUserNameMutation();
    const handleNameForm = async (e: React.MouseEvent) => {
        e.preventDefault();
        setFirstNameError('');
        setLastNameError('');
        updateName({ first: firstName, last: lastName });
        // userApi.util.invalidateTags(['User']);
    };

    useEffect(() => {
        if (isSuccess) {
            expandedMenu(false);
            dispatch(userApi.util.invalidateTags(['User']));
        }
    }, [isSuccess, expandedMenu, dispatch]);

    useEffect(() => {
        if (error) {
            const response = 'data' in error ? error.data : JSON.stringify(error);
            const data = response as UpdateNameResponse;
            setFirstNameError(data.errors?.first ? data.errors.first[0] : '');
            setLastNameError(data.errors?.last ? data.errors.last[0] : '');
        }
    }, [error]);

    return (
        <div className={classes.formRoot}>
            <Box component={'form'} className={classes.sectionForm}>
                <TextField
                    disabled={isLoading}
                    error={!!firstNameError.length}
                    helperText={firstNameError.length ? firstNameError : ''}
                    required
                    id={'first'}
                    type={'text'}
                    label={'First Name'}
                    hiddenLabel
                    fullWidth
                    variant={'outlined'}
                    autoComplete={'given-name'}
                    color={'primary'}
                    size={'small'}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ marginBottom: 15 }}
                    InputProps={{
                        endAdornment: <PersonOutlined style={{ marginLeft: 10 }} />,
                    }}
                />
                <TextField
                    disabled={isLoading}
                    error={!!lastNameError.length}
                    helperText={lastNameError.length ? lastNameError : ''}
                    required
                    id={'last'}
                    type={'text'}
                    label={'Last Name'}
                    hiddenLabel
                    fullWidth
                    variant={'outlined'}
                    autoComplete={'family-name'}
                    color={'primary'}
                    size={'small'}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ marginBottom: 15 }}
                    InputProps={{
                        endAdornment: <PersonOutlined style={{ marginLeft: 10 }} />,
                    }}
                />
                <Button
                    fullWidth={true}
                    disabled={isLoading}
                    onClick={handleNameForm}
                    variant={'contained'}
                    color={'secondary'}
                >
                    Update
                    {isLoading && <Digital style={{ marginLeft: 5, marginBottom: 5, fontSize: 15 }} />}
                </Button>
            </Box>
        </div>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    spinnerRoot: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    formRoot: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    sectionForm: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            width: '75%',
        },
        '& .MuiFormControl-root': {
            borderRadius: 4,
        },
    },
}));

export default ManageName;
