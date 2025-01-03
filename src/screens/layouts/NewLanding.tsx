import { makeStyles } from 'tss-react/mui';

const Landing = () => {
    const { classes } = useStyles();

    return (
        <>
            <div className={classes.root}>
                <div className={classes.navBar}></div>
                <div className={classes.content}>
                    <div className={classes.leftWrapper}>
                        <div className={classes.leftSection}>
                            <div className={classes.leftArrowSectionLargeBorder} />
                            <div className={classes.leftArrowSectionSmallBorder} />
                        </div>
                    </div>
                    <div className={classes.main}>
                        test
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        Test
                    </div>
                </div>
            </div>
        </>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        height: '100%',
        width: '100%',
        // msOverflowStyle: 'none',
    },
    navBar: {
        top: 0,
        position: 'fixed',
        display: 'flex',
        height: theme.spacing(9),
        marginTop: theme.spacing(3),
        width: '100%',
        border: '1px solid red',
        // margin: theme.spacing(2),
        overflow: 'hidden',
    },
    content: {
        position: 'absolute',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        marginTop: theme.spacing(6),
        overflow: 'hidden',
    },
    leftWrapper: {
        // marginTop: theme.spacing(6),
        position: 'absolute',
        height: 1180,
        width: 1387,
        left: -1110,
        top: -240,
        overflow: 'hidden',
    },
    leftSection: {
        position: 'relative',
        height: '100%',
        width: '100%',
        // border: '1px solid yellow',
        overflow: 'hidden',
    },
    leftArrowSectionLargeBorder: {
        position: 'absolute',
        height: 830,
        width: 830,
        top: 590,
        left: 380,
        border: '1px solid green',
        transform: 'translateY(-50%) rotate(135deg) translateZ(0px)',
    },
    leftArrowSectionSmallBorder: {
        position: 'absolute',
        height: 830,
        width: 830,
        top: 590,
        right: 385,
        border: '1px solid red',
        transform: 'translateY(-50%) rotate(135deg) translateZ(0px)',
    },
    rightArrowSection: {
        position: 'absolute',
        display: 'flex',
        height: '100%',
        width: '100%',
        right: -450,
        top: 575,
    },
    rightArrowSectionLargeBorder: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        border: '1px solid blue',
        transform: 'translateY(-50%) rotate(0deg) translateZ(0px)',
        // overflowX: 'clip',
    },
    main: {
        position: 'relative',
        flexDirection: 'column',
        // border: '1px solid blue',
        width: '100%',
        minHeight: '100%',
        height: 'auto',
        marginTop: theme.spacing(15),
        // overflowY: 'scroll',overflow: 'hidden',
        // overflow: 'scroll',
    },
}));
export default Landing;
