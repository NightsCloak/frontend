import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState, SyntheticEvent } from 'react';
import { Card, CardHeader, CardMedia, Grid, Tab, Tabs } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { Domain, Person } from '@mui/icons-material';

type YoutubeVideo = { id: string; title: string };

const TutorialsScreen: FC = () => {
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const [value, setValue] = useState<string>('organization');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Tutorials' }]);
        updateTabTitle('Tutorials');
    }, []);

    return (
        <div className={classes.root}>
            <div>
                <Tabs indicatorColor={'secondary'} textColor={'inherit'} value={value} onChange={handleChange}>
                    <Tab icon={<Domain />} iconPosition={'start'} value={'organization'} label={'Organization'} />
                    <Tab icon={<Person />} iconPosition={'start'} value={'general'} label={'General'} />
                </Tabs>
            </div>
            <Grid className={classes.container} container columns={12} alignItems={'top'}>
                {(value === 'organization' ? orgTutorials : userTutorials).map((tutorial, i) => (
                    <Grid key={i} display={'flex'} item xs={12} md={6} xl={4} p={2} mb={2}>
                        <Card
                            elevation={0}
                            sx={{
                                flex: 1,
                                marginBottom: 2,
                            }}
                        >
                            <CardHeader titleTypographyProps={{ variant: 'h6' }} title={tutorial.title} />
                            <CardMedia
                                component={'iframe'}
                                height={400}
                                src={`https://www.youtube.com/embed/${tutorial.id}`}
                                title={'YouTube video player'}
                                style={{ border: 0 }}
                                allow={
                                    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                }
                                allowFullScreen
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

const userTutorials: YoutubeVideo[] = [
    { id: 'sXVFfoQB7KE', title: 'Create CS2 Weapon Skins' },
    { id: 'Xr1TgHgWbt4', title: 'Upload 3D Models' },
    { id: 'nq_WKeypxwg', title: 'Use The Edit Toolbar' },
    { id: 'OIe5mIrTGOQ', title: 'Use The Media and Settings Toolbar' },
    { id: 'uMt7teZa-iU', title: 'Create And Publish Collections' },
];

const orgTutorials: YoutubeVideo[] = [
    { id: 'DXCWQ4xjBMw', title: 'Free Trial/Organization Set Up' },
    { id: '9XXIeA3gr3s', title: 'Creating Projects/Rename/Add Icon' },
    { id: 'MP5TL-TRRqo', title: 'Creating A Discord Web Hook' },
    { id: 'K4LJaRo-tjs', title: 'Set Up Blender Add On' },
    { id: 'HfAps4unFSs', title: 'Exporting From Blender To INTRACT' },
    { id: 'M75He2cszDM', title: 'Model Renaming/Thumbnail Creation' },
    { id: 'NNIcxm63z0g', title: 'Sharing Models & Requesting Access' },
    { id: 'rH69ECJglIM', title: 'Comments And Annotations' },
    { id: 'vG-oV0E4cQ4', title: 'Using Blender To Upload New Versions' },
];

const useStyles = makeStyles()(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    container: {
        display: 'flex',
        justifyContent: 'start',
        overflowY: 'auto',
        transition: `max-height 300ms ease-in-out`,
        '&::-webkit-scrollbar': {
            width: 8,
        },
        scrollbarWidth: 'thin',
        height: 'auto',
    },
}));

export default TutorialsScreen;
