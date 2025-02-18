import { makeStyles } from 'tss-react/mui';
import { Button, Card, CardContent, CardHeader, Theme, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import useInterval from '@/hooks/useInterval';
import { useNavigate } from 'react-router-dom';

const UpdatedLanding = () => {
    const [section3, setSection3] = useState<number>(0);
    const [section3delay, setSection3delay] = useState(false);
    const { classes } = useStyles();
    const navigate = useNavigate();
    const theme = useTheme();

    const section3messages = [
        'Keep everyone on the same page - in 3D - in realtime.',
        'Ensure that you have the information needed to manage scope changes.',
        'Include project collaborators from your client, your internal team and even yourfreelancers.',
        'Instantly share 3D files globally with uncompromised data integrity and fidelity.',
    ];

    const partners = [
        'Atlas_Creative.png',
        '404_Creative.png',
        'cc_tech.png',
        'Beyond_Creative.png',
        'y255.png',
        'VYSENA_STUDIOS.png',
        'SquatinDog.png',
        'Realtime_Squad.png',
        'moonrock.png',
        'zoned.png',
    ];

    useInterval(
        () => {
            const update = section3 < 3 ? section3 + 1 : 0;
            setSection3(update);
        },
        section3delay ? null : 5000
    );

    const handleSection3Click = (section: number) => {
        setSection3(section);
        setSection3delay(true);
        setTimeout(() => setSection3delay(false), 30000);
    };

    return (
        <div className={classes.root} data-testid={'landingRoot'}>
            <div className={classes.header}>
                <img className={classes.icon} src={'./images/iconLogo.png'} alt={'NC Logo'} />
                <Button className={classes.loginButton} variant={'contained'} onClick={() => navigate('/login')}>
                    Login
                </Button>
            </div>

            <div className={classes.section1}>
                <img src={'./images/logo.png'} height={40} alt={'Nightscloak'} />
                <div style={{ color: theme.palette.primary.main, fontWeight: 'bold', marginBottom: theme.spacing(3) }}>
                    Next Generation 3D Creative Collaboration
                </div>
                One central hub that lets you share 3D files, track feedback, and streamline your workflow so you
                can&nbsp;
                <span style={{ color: theme.palette.primary.main }}>
                    focus on creating your best digital experiences
                </span>{' '}
                - anywhere in the world.
            </div>
            <Button
                size={'small'}
                className={classes.freeTrialButton}
                variant={'contained'}
                onClick={() => navigate('/waitList')}
            >
                Waitlist Signup
            </Button>
            <div className={classes.section2}>
                <Typography variant={'h5'}>
                    <span
                        style={{
                            color: theme.palette.primary.main,
                            textDecoration: 'underline',
                        }}
                    >
                        Accelerate
                    </span>{' '}
                    high-quality 3D development
                </Typography>
                <div className={classes.section2cards}>
                    <Card className={classes.section2card}>
                        <CardHeader avatar={<img src={'./images/landing/bolt.png'} />} />
                        <CardContent sx={{ color: '#FFFFFF' }}>
                            Reduce <span style={{ color: '#999999' }}>review cycles and</span> speed up approvals.
                        </CardContent>
                    </Card>
                    <Card className={classes.section2card}>
                        <CardHeader avatar={<img src={'./images/landing/database.png'} />} />
                        <CardContent>
                            <span style={{ color: '#999999' }}>Keep all your feedback and revision cycles in a</span>{' '}
                            centralized, organized system.
                        </CardContent>
                    </Card>
                    <Card className={classes.section2card}>
                        <CardHeader avatar={<img src={'./images/landing/schedule.png'} />} />
                        <CardContent>
                            <span style={{ color: '#999999' }}>Review on your own time, collaboratively in</span> 3D via
                            the web with the ability to do text and visual annotation.
                        </CardContent>
                    </Card>
                    <Card className={classes.section2card}>
                        <CardHeader avatar={<img src={'./images/landing/encrypted.png'} />} />
                        <CardContent>
                            Private, secure organizations and projects{' '}
                            <span style={{ color: '#999999' }}>ensures your IP remains secure and controlled.</span>
                        </CardContent>
                    </Card>
                    <Card className={classes.section2card}>
                        <CardHeader avatar={<img src={'./images/landing/join_left.png'} />} />
                        <CardContent>
                            <span style={{ color: '#999999' }}>Use the</span> material-matcher{' '}
                            <span style={{ color: '#999999' }}>
                                to achieve fidelity on any 3D model, regardless of texture/shader complexity.
                            </span>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className={classes.section3}>
                <img className={classes.section3image} src={'./images/landing/editor.png'} />
                <div className={classes.section3right}>
                    <Typography className={classes.section3rh}>
                        <span style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>
                            Centralized portal
                        </span>{' '}
                        that is easily accessible to each stakeholder.
                    </Typography>
                    <div
                        className={classes.section3Messages}
                        style={{
                            borderImage: `linear-gradient(
                            ${section3 === 0 ? '#c25400' : '#383838'} 24%, 
                            ${section3 === 1 ? '#c25400' : '#383838'} 25%, 
                            ${section3 === 1 ? '#c25400' : '#383838'} 49%, 
                            ${section3 === 2 ? '#c25400' : '#383838'} 50%, 
                            ${section3 === 2 ? '#c25400' : '#383838'} 74%, 
                            ${section3 === 3 ? '#c25400' : '#383838'} 75%, 
                            ${section3 === 3 ? '#c25400' : '#383838'}
                            ) 0 100%`,
                            borderWidth: 0,
                            borderLeft: '4px solid',
                        }}
                    >
                        {section3messages.map((message, index) => (
                            <div
                                key={`section_3_message_${index}`}
                                onClick={() => handleSection3Click(index)}
                                style={{
                                    color: section3 === index ? 'white' : '#999999',
                                    cursor: 'pointer',
                                    flex: 0.25,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {message}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={classes.demos}></div>
            <div className={classes.partners}>
                <Typography className={classes.partnersHeader}>
                    Studios & creators{' '}
                    <span style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>working</span> with
                    us
                </Typography>
                {partners.map((partner, index) => (
                    <div key={`partner_${index}`} className={classes.partner}>
                        <img src={`./images/landing/partners/${partner}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        background: 'linear-gradient(rgba(0,0,0,0) 0%, #1B1B1B80 40%, #1B1B1BFF 100%), url("./images/dashboard1.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '80%',
        backgroundPosition: 'center top',
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundAttachment: 'scroll, scroll',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        [theme.breakpoints.up('lg')]: {
            backgroundSize: '60%',
        },
        [theme.breakpoints.down('sm')]: {
            backgroundSize: '100%',
        },
    },
    header: {
        display: 'flex',
        marginTop: 30,
        paddingLeft: 35,
        paddingRight: 30,
        height: 64,
        width: '80vw',
        marginRight: 'auto',
        marginLeft: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.up('lg')]: {
            width: '60vw',
        },
    },
    icon: {
        height: 64,
    },
    loginButton: {
        height: 30,
    },
    section1: {
        paddingRight: theme.spacing(1),
        marginRight: '10vw',
        marginLeft: '45vw',
        marginTop: '10vw',
        height: 'auto',
        minWidth: 400,
        [theme.breakpoints.up('lg')]: {
            marginRight: '20vw',
            minWidth: '20vw',
        },
    },
    freeTrialButton: {
        marginTop: theme.spacing(8),
        width: 170,
    },
    section2: {
        minHeight: 350,
        height: 'auto',
        display: 'flex',
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(2),

        [theme.breakpoints.up('lg')]: {
            width: '60vw',
            minHeight: 550,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    section2cards: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        minHeight: 250,
        height: 'auto',
        width: '100%',
        marginTop: theme.spacing(6),
        '& :not(:first-child):not(:last-child)': {
            marginLeft: theme.spacing(1),
        },
        '& .MuiCard-root': {
            padding: 0,
            borderRadius: 20,
            '& .MuiCardContent-root': {
                padding: 0,
                margin: 0,
                textAlign: 'left',
                width: 'auto',
                marginLeft: theme.spacing(2),
                marginRight: theme.spacing(2),
                // display: 'flex',
                // flexDirection: 'column',
            },
            '& .MuiCardHeader-root': { padding: 0, paddingTop: 16 },
            '& .MuiCardHeader-avatar': {
                width: '100%',
                display: 'flex',
                '> img': {
                    height: 45,
                    marginLeft: theme.spacing(1),
                },
                borderLeft: `2px solid ${theme.palette.primary.main}`,
                // paddingLeft: 16,
                justifyContent: 'left',
                alignItems: 'center',
                marginLeft: 0,
                marginBottom: theme.spacing(1),
                marginTop: 8,
            },
        },
    },
    section2card: {
        width: 120,
        height: 250,
        fontSize: 12,
        [theme.breakpoints.up('xl')]: {
            fontSize: 18,
            width: 200,
            height: 315,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
            width: 100,
            '& img': {
                width: 30,
                height: 20,
            },
        },
    },
    section3: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 400,
        height: 'auto',
        marginTop: theme.spacing(3),
        [theme.breakpoints.up('lg')]: {
            width: '60%',
            minHeight: 600,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    section3image: {
        display: 'flex',
        width: '50%',
        [theme.breakpoints.up('lg')]: {
            width: '55%',
        },
    },
    section3right: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '50%',
        justifyContent: 'flex-start',
        marginLeft: theme.spacing(2),
    },
    section3rh: {
        fontSize: 30,
        [theme.breakpoints.down('lg')]: {
            fontSize: 25,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 15,
        },
    },
    section3Messages: {
        display: 'flex',
        flexGrow: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: theme.spacing(3),
        paddingTop: 0,
        paddingBottom: 0,
        margin: theme.spacing(2),
        '& > *': {
            fontSize: theme.typography.body2.fontSize,
            [theme.breakpoints.up('lg')]: {
                fontSize: theme.typography.subtitle1.fontSize,
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
        },
    },
    demos: {
        display: 'none',
        // background: '#212121',
        minHeight: 300,
        width: '81%',
        marginLeft: '11.5%',
        marginRight: '10%',
        [theme.breakpoints.up('lg')]: {
            width: '60%',
            marginLeft: '20.75%',
            marginRight: '20%',
        },
    },
    partners: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 1000,
        width: '80%',
        flexWrap: 'wrap',
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            width: '45%',
        },
    },
    partnersHeader: {
        width: '100%',
        fontSize: theme.typography.h5.fontSize,
        textAlign: 'center',
        fontWeight: theme.typography.fontWeightBold,
    },
    partner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        width: 180,
        margin: theme.spacing(1),
        '& > img': {
            margin: theme.spacing(4),
            height: 'auto',
            width: 115,
        },
    },
}));

export default UpdatedLanding;
