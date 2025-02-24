import NCModal from '@/components/NCModal';
import { Box, Button, TextField } from '@mui/material';
import { useActionState, useEffect, useState } from 'react';
import { Spinner } from 'react-activity';
import { useAddChronicleMutation } from '@/redux/features/chronciles';

type NewChronicleFormState = AddChronicleResponse | null;

const initialState: NewChronicleFormState = { name: null, email: null, parent_id: null };

const NewChronicleModal = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => {
        setModalOpen(!modalOpen);
    };

    const [submit] = useAddChronicleMutation();
    const [state, submitAction, isPending] = useActionState(
        async (previousState: NewChronicleFormState, formData: FormData): Promise<AddChronicleResponse> => {
            const { data, error } = await submit({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
            });
            console.log('test', data, error);
            if (error) return error;
            handleOpen();
            if (data) return [{ name: data.name ?? '', email: data.email ?? '' }];
            return previousState;
        },
        initialState
    );

    useEffect(() => {
        console.log('state', state);
    }, [state]);

    return (
        <Box p={1} justifyContent={'center'} alignItems={'center'} display={'flex'}>
            <NCModal
                open={modalOpen}
                handler={handleOpen}
                title={'Add Chronicle'}
                iconLabel={'Add Chronicle'}
                sx={{
                    root: { height: '50vh', marginTop: 'calc(20%)' },
                    box: { display: 'flex', alignSelf: 'center', height: 250 },
                }}
            >
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
            </NCModal>
        </Box>
    );
};

export default NewChronicleModal;
