import { useUpdateChronicleMutation } from '@/redux/features/chronciles';
import { FC, useActionState } from 'react';
import { Button, TextField } from '@mui/material';

type UpdateChronicle = Partial<Chronicle> | FetchBaseQueryError | SerializedError | null;
const initialUpdateState: UpdateChronicle = { name: null };

const UpdateChronicleName: FC<{ handler: () => void; chronicleId: string }> = ({ handler, chronicleId }) => {
    const [submitName] = useUpdateChronicleMutation();

    const [state, submitUpdateAction, isPending] = useActionState(
        async (previousState: UpdateChronicle, formData: FormData): Promise<UpdateChronicle> => {
            const { data, error } = await submitName({
                chronicleId: chronicleId ?? '',
                name: formData.get('name') as string,
            });
            if (error) return error;
            if (data) return data;
            return previousState;
        },
        initialUpdateState
    );

    return (
        <form action={submitUpdateAction} style={{ display: 'flex', flexDirection: 'column', width: '50vw' }}>
            <TextField
                name={'name'}
                label={'Name'}
                error={state && state.data?.errors?.name}
                helperText={state && state.data?.errors?.name}
            />
            <Button type={'submit'} disabled={isPending}>
                Submit
            </Button>
        </form>
    );
};

export default UpdateChronicleName;
