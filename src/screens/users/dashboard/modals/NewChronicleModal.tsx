import NCModal from '@/components/NCModal';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useActionState } from 'react';
import { Spinner } from 'react-activity';
import { useAddChronicleMutation } from '@/redux/features/chronciles';

type NewChronicleFormState =
    | { name: string | null; email?: string | null; parent_id?: string | null; error?: string | null }
    | string
    | null
    | Partial<AddChronicleResponse>;

// const initialState: NewChronicleFormState = { name: null, email: null, parent_id: null };

const NewChronicleModal = () => {
    const [submit, data] = useAddChronicleMutation();
    const [error, submitAction, isPending] = useActionState(
        async (previousState: NewChronicleFormState, formData: FormData): Promise<Partial<AddChronicleResponse>> => {
            const test = submit({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
            });
            console.log(test);
            if (error) return error;
            return [{ name: data?.data?.name ?? '', email: data?.data?.email ?? '' }];
        },
        null
    );

    return (
        <Box p={1} justifyContent={'center'} alignItems={'center'} display={'flex'}>
            <NCModal
                title={'Add Chronicle'}
                iconLabel={'Add Chronicle'}
                sx={{
                    root: { height: '50vh', marginTop: 'calc(20%)' },
                    box: { display: 'flex', alignSelf: 'center', height: 250 },
                }}
            >
                <form action={submitAction} style={{ display: 'flex', flexDirection: 'column', width: '50vw' }}>
                    <TextField label={'Name'} name={'name'} />
                    <br />
                    <TextField label={'Email'} name={'email'} />
                    <Button variant={'contained'} type={'submit'}>
                        {isPending ? <Spinner /> : 'Submit'}
                    </Button>
                    {error && <Typography>{error?.errors?.message}</Typography>}
                </form>
            </NCModal>
        </Box>
    );
};

export default NewChronicleModal;
