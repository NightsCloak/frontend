import { useAddChronicleMutation } from '@/redux/features/chronciles';
import { useActionState } from 'react';
import { Button, TextField } from '@mui/material';
import { Spinner } from 'react-activity';

type NewChronicleFormState = AddChronicleResponse | null;

const initialState: NewChronicleFormState = { name: null, email: null, parent_id: null };

const AddChronicleForm = ({ handler }: { handler: () => void }) => {
    const [submit] = useAddChronicleMutation();

    const [state, submitAction, isPending] = useActionState(
        async (previousState: NewChronicleFormState, formData: FormData): Promise<AddChronicleResponse> => {
            const { data, error } = await submit({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
            });
            if (error) return error;
            handler();
            if (data) return [{ name: data.name ?? '', email: data.email ?? '' }];
            return previousState;
        },
        initialState
    );

    return (
        <form action={submitAction} style={{ display: 'flex', flexDirection: 'column', width: '50vw' }}>
            <TextField
                label={'Name'}
                name={'name'}
                error={state && state.data?.errors?.name}
                helperText={state && state.data?.errors?.name}
            />
            <br />
            <TextField label={'Email'} name={'email'} />
            <Button variant={'contained'} type={'submit'} disabled={isPending}>
                {isPending ? <Spinner /> : 'Submit'}
            </Button>
        </form>
    );
};

export default AddChronicleForm;
