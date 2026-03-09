import {
    useAddChronicleMutation,
    useGetChronicleGenresListQuery,
    useGetChronicleRegionsListQuery,
    useGetChroniclesSearchQuery,
    useGetChronicleTypesListQuery,
} from '@/redux/features/chronciles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useActionState, useEffect, useState } from 'react';
import { Spinner } from 'react-activity';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type NewChronicleFormState = AddChronicleResponse | null;

const initialState: NewChronicleFormState = import.meta.env.DEV
    ? {
          data: {
              name: 'Bradenton Chaos and Entropy',
              email: 'bce-side-scenes@owbn.net',
              parent_id: null,
              genres: ['anarch'],
              region: 'mid-atlantic',
              state: 'FL',
              city: 'Tampa',
              type: 'virtual',
          },
      }
    : {
          data: {
              name: null,
              email: null,
              parent_id: null,
              genres: [],
              region: 'mid-atlantic',
              state: null,
              city: null,
              type: null,
          },
      };

const AddChronicleForm = ({ handler }: { handler: () => void }) => {
    const theme = useTheme();
    const [genres, setGenres] = useState<ChronicleGenreValue[]>([]);
    // const [region, setRegion] = useState<ChronicleRegionList['value']>('');
    const [type, setType] = useState<ChronicleTypesList['value']>();
    const [isSubChronicle, setIsSubChronicle] = useState<boolean>(false);
    const [parentId, setParentId] = useState<string | undefined>();
    const [submit] = useAddChronicleMutation();
    const { data: genresList } = useGetChronicleGenresListQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const { data: regionsList } = useGetChronicleRegionsListQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const { data: typesList } = useGetChronicleTypesListQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const { data: chroniclesList } = useGetChroniclesSearchQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const handleGenreSelect = (e: ChronicleGenreSelected) => {
        const check = genres.includes(e.target.value);

        if (!check) {
            setGenres(e.target.value);
        }
    };

    const [state, submitAction, isPending] = useActionState(
        async (previousState: NewChronicleFormState, formData: FormData): Promise<AddChronicleResponse> => {
            const values = {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                location: formData.get('location') as string,
                genres: genres,
                region: formData.get('region') as string,
                state: formData.get('state') as string,
                city: formData.get('city') as string,
                type: formData.get('type') as string,
                parent_id: parentId,
            };

            const response = await submit(values);
            console.log(response);
            if (response?.error)
                return {
                    ...response,
                    data: {
                        ...values,
                        error: response.error,
                    },
                };
            if (response.data.id) handler();
            // if (data) return [{ name: data.name ?? '', email: data.email ?? '' }];
            return previousState;
        },
        initialState
    );

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <form
            action={submitAction}
            style={{ display: 'flex', flexDirection: 'column', width: 400, scrollbarWidth: 'thin' }}
        >
            <TextField
                variant={'filled'}
                label={'Name'}
                name={'name'}
                margin={'normal'}
                error={state.data?.errors?.name}
                helperText={state && state.data?.errors?.name}
                defaultValue={state.data.name}
            />
            <FormControl>
                <InputLabel htmlFor={'email'}>Email - Leave Empty to use User email</InputLabel>
                <Input id={'email'} name={'email'} error={state.data?.errors?.email} defaultValue={state.data.email} />
                {state.data?.errors?.email && <FormHelperText error>{state.data?.errors?.email}</FormHelperText>}
            </FormControl>
            <FormControl sx={{ mt: 2, mb: 2 }}>
                <InputLabel id={'genres-label'}>Genres</InputLabel>
                <Select
                    labelId={'genres-label'}
                    label={'Genres'}
                    variant={'filled'}
                    multiple
                    name={'genres'}
                    value={genres ?? initialState.data.genres}
                    onChange={handleGenreSelect}
                    renderValue={(selected) => {
                        const names = [];

                        for (const genre of selected) {
                            const genreName = genresList?.find((item) => genre === item.value)?.name;
                            if (genreName) names.push(genreName);
                        }

                        return names.join(', ');
                    }}
                >
                    {genresList?.map((genre) => {
                        const selected = genres.includes(genre.value);
                        const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

                        return (
                            <MenuItem key={genre.name} value={genre.value}>
                                <SelectionIcon
                                    fontSize={'small'}
                                    style={{ marginRight: 8, padding: 9, boxSizing: 'content-box' }}
                                />
                                <ListItemText primary={genre.name}>{genre.name}</ListItemText>
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id={'region-label'}>Region</InputLabel>
                <Select
                    label={'Region'}
                    name={'region'}
                    error={state.data?.error?.region}
                    value={state.data?.region?.value ?? initialState.data.region}
                >
                    {regionsList?.map((region) => (
                        <MenuItem key={region.name} value={region.value}>
                            {region.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <TextField
                    variant={'filled'}
                    label={'State'}
                    name={'state'}
                    margin={'normal'}
                    error={state.data?.errors?.state}
                    helperText={state && state.data?.errors?.state}
                    defaultValue={initialState.data?.state}
                />
            </FormControl>
            <TextField
                variant={'filled'}
                label={'City'}
                name={'city'}
                margin={'normal'}
                error={state.data?.errors?.city}
                helperText={state && state.data?.errors?.city}
                defaultValue={initialState.data?.city}
            />
            <InputLabel id={'type-select-helper-label'}>Type</InputLabel>
            <Select
                labelId={'type-select-helper-label'}
                label={'Type'}
                name={'type'}
                value={type ?? initialState.data.type}
                onChange={(e) => setType(e.target.value)}
            >
                {typesList?.map((type) => (
                    <MenuItem key={type.name} value={type.value}>
                        {type.name}
                    </MenuItem>
                ))}
            </Select>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    minHeight: theme.spacing(7),
                }}
            >
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
