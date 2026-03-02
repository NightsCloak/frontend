import { useAddChronicleMutation, useGetChroniclesSearchQuery } from '@/redux/features/chronciles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useActionState, useState } from 'react';
import { Spinner } from 'react-activity';
import Autocomplete from '@mui/material/Autocomplete';
import  Checkbox  from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type NewChronicleFormState = AddChronicleResponse | null;

const initialState: NewChronicleFormState = { name: null, email: null, parent_id: null };

const AddChronicleForm = ({ handler }: { handler: () => void }) => {
    const theme = useTheme();
    const [isSubChronicle, setIsSubChronicle] = useState<boolean>(false);
    const [parentId, setParentId] = useState<string | undefined>();
    const [submit] = useAddChronicleMutation();
    const { data: chroniclesList } = useGetChroniclesSearchQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [state, submitAction, isPending] = useActionState(
        async (previousState: NewChronicleFormState, formData: FormData): Promise<AddChronicleResponse> => {
            const { data, error } = await submit({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                location: formData.get('location') as string,
                parent_id: parentId,
            });
            if (error) return error;
            handler();
            if (data) return [{ name: data.name ?? '', email: data.email ?? '' }];
            return previousState;
        },
        initialState
    );

    return (
        <form action={submitAction} style={{ display: 'flex', flexDirection: 'column', width: 400 }}>
            <TextField
                variant={'filled'}
                label={'Name'}
                name={'name'}
                margin={'normal'}
                error={state.data?.errors?.name}
                helperText={state && state.data?.errors?.name}
            />
            <TextField
                variant={'filled'}
                label={'Email - Leave Empty to use User email'}
                name={'email'}
                margin={'normal'}
                error={state.data?.errors?.email}
                helperText={state && state.data?.errors?.email}
            />
            <TextField
                variant={'filled'}
                multiline={true}
                minRows={3}
                label={'Location'}
                name={'location'}
                margin={'normal'}
                error={state.data?.errors?.location}
                helperText={state && state.data?.errors?.location}
            />
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', minHeight: theme.spacing(7), }}>
                <FormControlLabel
                    control={<Checkbox />}
                    label={<Typography noWrap={true}>Sub-Chronicle?</Typography>}
                    onChange={() => setIsSubChronicle(!isSubChronicle)}
                />
                {isSubChronicle && (
                    <Autocomplete
                        fullWidth
                        multiple={false}
                        disableListWrap
                        options={chroniclesList ?? []}
                        clearOnBlur={false}
                        onChange={(event, value, reason) => setParentId(value?.id)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant={'filled'}
                                label={'Parent Chronicle Name'}
                                name={'parent_id'}
                            />
                        )}
                    />
                )}
            </div>
            <Button variant={'contained'} type={'submit'} disabled={isPending}>
                {isPending ? <Spinner /> : 'Submit'}
            </Button>
        </form>
    );
};

export default AddChronicleForm;
