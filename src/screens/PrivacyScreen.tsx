import { FC } from 'react';
import { Card, CardContent, Divider, Link, Paper, Typography } from '@mui/material';
import { Security } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';
import { useAppSelector } from '@intractinc/base/redux/hooks';

const PrivacyScreen: FC = () => {
    const auth = useAppSelector((state) => state.auth.status);
    const { classes } = useStyles({ auth });
    // const { updateTabTitle, updateBreadcrumbs } = useTools();

    // useEffect(() => {
    //     updateBreadcrumbs([{ name: 'Privacy Policy' }]);
    //     updateTabTitle('Privacy Policy');
    // }, []);

    return (
        <Paper className={classes.paper}>
            {!auth && (
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant={'h4'}>
                        <Security sx={{ fontSize: 26 }} /> Privacy Policy
                    </Typography>
                </div>
            )}
            <Typography sx={{ marginY: 1, fontWeight: 'bold' }} variant={'h6'}>
                Last updated: November 10, 2023
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        What does this policy cover?
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Welcome to Intract (“Intract,” “we,” or “us”). Our Privacy Policy explains how we collect, use,
                        disclose, and protect information that applies to Intract’s digital design platform and INTRACT
                        3D Web-Based Collaborative Asset Management Software (the “Service”), and your choices about the
                        collection and use of your information. Capitalized terms that are not defined in this Privacy
                        Policy have the meaning given to them in our Terms of Use If you do not want your information
                        processed in accordance with this Privacy Policy in general or any part of it, you should not
                        use our Service. This policy applies to all users of the Service.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        Information we collect
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        We collect the following types of information about you:
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        (a) Information you provide us directly
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        We may ask for certain information when you register for an Intract account or correspond with
                        us, such as a username, your first and last names, and e-mail address.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        We also collect any messages you send us through the Service, and may collect information you
                        provide in User Content you post to the Service (such as text and photos you upload to use in
                        your designs). We use this information to operate, maintain, and provide the features and
                        functionality of the Service to you, to correspond with you, and to address any issues you raise
                        about the Service.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        If you don’t provide your personal information to us, you may not be able to access or use our
                        Service or your experience of using our Service may not be as enjoyable.
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        (b) Information we receive from third-party applications
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        We may receive information about you from third parties. This information could include, but is
                        not limited to, the user ID associated with your account (for example, a third party sign-on
                        ID), an access token necessary to access that service, any information that you have permitted
                        the third party to share with us, and any information you have made public in connection with
                        that service. You should always review, and if necessary, adjust your privacy settings on
                        third-party websites and services before linking or connecting them to the Service. You may also
                        unlink your third party account from the Service by adjusting your settings on the third party
                        service. If you unlink your third party account, we will no longer receive information collected
                        about you in connection with that service.
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        (c) Information we collect from you automatically
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        We will directly collect analytics data, or use third-party analytics tools, to help us measure
                        traffic and usage trends for the Service. These tools collect information sent by your browser
                        or mobile device, including the pages you visit and other information (please see the paragraph
                        on log file information below) that assists us in improving the Service.
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        (d) Log file information
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Log file information is automatically reported by your browser or mobile device each time you
                        access the Service. When you use our Service, our servers automatically record certain log file
                        information. These server logs may include anonymous information such as your web request,
                        browser type, referring / exit pages and URLs, number of clicks and how you interact with links
                        on the Service, domain names, landing pages, pages viewed, and other such information.
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        (e) Content within your account
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        We receive content that you create within your Intract account and media you upload for use
                        within it, such as designs, images, documents, videos, and metadata about your content.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        How we use your information
                    </Typography>
                    <Typography sx={{ marginY: 1 }} variant={'body1'}>
                        We use the information we collect about you for the purposes set out below:
                    </Typography>
                    <ul>
                        <li>
                            Providing you with the Service: We use the information that you directly give us to provide
                            the Service to you. This includes allowing you to log in to Intract, operating and
                            maintaining the Service, giving you access to your designs and billing you for transactions
                            that you make via the Service.
                        </li>
                        <li>
                            For data analytics: We use information about you to help us improve the Intract Service and
                            our users’ experience, including by monitoring aggregate metrics such as total number of
                            visitors, traffic, and demographic patterns.
                        </li>
                        <li>
                            Customizing the Service for you: We use and combine the information you provide us and
                            information about you that we collect automatically and receive from other sources
                            (including information we receive on and off our Service) and combine it with information
                            about the behavior of other users to make sure that your use of the Service is customized to
                            your needs.
                        </li>
                        <li>
                            To communicate with you about the Service: We use your contact information to get in touch
                            with you and to send communications about critical elements of the Service. For example, we
                            may send you emails about technical issues, security alerts or administrative matters.
                        </li>
                        <li>
                            To promote and drive engagement with the Intract Service: We use your contact information to
                            get in touch with you about taking part in our surveys or about features and offers relating
                            to the Service that we think you would be interested in. We also use information we collect
                            about you to make sure that you get the most relevant offers and promotions based on your
                            use of the Service, and your preferences. You can opt-out of these communications as
                            described below.
                        </li>
                        <li>
                            To improve the Service: We analyze information about your use of the Service and your
                            content to better understand how users are engaging with our Service and measure the
                            effectiveness of the Service so we can make improvements and develop our services for users.
                        </li>
                        <li>
                            Customer happiness: We use information about you, information that we collect or and from
                            within your account, information that you provide to our customer happiness team, and
                            information about your interactions with the Service to resolve technical issues you
                            experience with the Service, and to ensure that we can repair and improve the Service for
                            all Intract users.
                        </li>
                        <li>
                            For security measures: We use information about you and from within your account to monitor
                            activity that we think is suspicious or potentially fraudulent, and to identify violations
                            of this Privacy Policy and our Terms of Use.
                        </li>
                        <li>
                            For matters that you have specifically consented to: From time to time Intract may seek your
                            consent to use your information for a particular purpose. Where you consent to our doing so,
                            we will use it for that purpose. Where you no longer want us to use your information for
                            that purpose you may withdraw your consent to this use.
                        </li>
                        <li>
                            For troubleshooting, error resolution and service improvement: We may need to review your
                            designs to support your request for help, correct general errors with the Intract Service or
                            improve our services.
                        </li>
                        <li>
                            For matters that we are required to use your information by law: Intract will use or
                            disclose your information where we reasonably believe that such action is necessary to (a)
                            comply with the law and the reasonable requests of law enforcement; (b) to enforce our Terms
                            of Use or to protect the security or integrity of our Service; and/or (c) to exercise or
                            protect the rights, property, or personal safety of Intract, our users or others.
                        </li>
                    </ul>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        Sharing your information
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        (a) How we share your information
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        We share your information with third-party service providers for the purpose of providing the
                        Service to you and to facilitate Intract’s legitimate interests. Those service providers will
                        only be provided with access to your information as is reasonably necessary for the purpose that
                        Intract has engaged the service provider, and we will require that such third parties comply
                        with this Privacy Policy, appropriate data processing terms and any applicable laws.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Some of the third parties with whom Intract may share your personal information are service
                        providers who assist Intract with functions such as:
                    </Typography>
                    <ul>
                        <li>Billing;</li>
                        <li>Customer support and customer management;</li>
                        <li>Email services;</li>
                        <li>Hosting and storage;</li>
                        <li>Data analytics and predictive analytics; and</li>
                        <li>Security.</li>
                    </ul>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        (b) How you can share your User Content
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Any information or content that you voluntarily disclose for posting to the Service, such as
                        public User Content, becomes available to be read, collected and used by the other Users. When
                        you set your profile to public, or make User Content public, your information becomes searchable
                        by other users. If you or Intract remove information that you posted to the Service, copies may
                        remain viewable in cached and archived pages of the Service, or if other users have copied or
                        saved that information.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        You may share your Intract designs to certain third party social media accounts. You should
                        ensure that you familiarize yourself with the privacy policies of each of these services and any
                        privacy settings that may apply to the designs you choose to share on those accounts.
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        (c) Sharing in connection with a merger, acquisition or reorganization
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Intract may also share, sell or transfer your information to third parties in connection with or
                        contemplation of (including as part of the due diligence process) any merger, acquisition,
                        reorganization, financing, sale of assets, bankruptcy or insolvency event involving Intract or
                        any portion of our assets, services or businesses. Information such as customer names and email
                        addresses, User Content and other user information related to the Service may be among the items
                        shared, sold or otherwise transferred in these types of transactions. You will be notified via
                        email and/or a notice on the Service if such a transaction takes place and be given notice of
                        any material changes to the way we handle your data under this policy.
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        (d) Your employer
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        If you access Intract with an email address issued to you by your employer, and your employer
                        has established an account with Intract (or is considering doing so), you acknowledge that
                        Intract may share your name, email, and the existence of your Intract account with your
                        employer. If you do not use Intract in connection with your employment and do not wish for this
                        information to be shared with your employer you can opt out at any time by emailing us at{' '}
                        <Link className={classes.mailLink} href="mailto:support@intract.com">
                            support@intract.com
                        </Link>
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        (e) Sharing with other third parties
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Intract will also share your information with third parties in certain circumstances, such as
                        where you consent to our sharing it with a third party for a particular purpose. Integrating
                        with third party applications could involve importing data from that third party to Intract
                        and/or exporting data from Intract to that third party. If this requires connecting your Intract
                        account to your account on the third party application, you will be asked for permission. These
                        third-party apps are not controlled by us, and this privacy policy does not cover how
                        third-party apps use your information. You should review the terms and conditions of any third
                        party apps before connecting them to the Service.
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        (f) Sharing aggregate data
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        We may also aggregate or otherwise strip data of all personally identifying characteristics and
                        may share that aggregated such anonymized data with third parties.
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        (g) Sharing with authorities
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        We access, preserve and share your information with regulators, law enforcement, police,
                        intelligence sharing and take down services or where we have a good-faith belief that it is
                        necessary to detect, prevent or address fraud, breaches of our Terms of Use, harmful or illegal
                        activity, to protect Intract (our rights, property or intellectual property), you or others,
                        including as part of investigations or regulatory enquiries or to prevent death or imminent
                        bodily harm.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        Keeping your information safe
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Intract cares about the security of your information, and uses appropriate safeguards to
                        preserve the integrity and security of all information collected through the Service. To protect
                        your privacy and security, we take reasonable steps (such as requesting a unique password) to
                        verify your identity before granting you access to your account. You are responsible for
                        maintaining the secrecy of your unique password and account information, and for controlling
                        access to your email communications from Intract, at all times. However, Intract cannot ensure
                        or warrant the security of any information you transmit to Intract or guarantee that information
                        on the Service may not be accessed, disclosed, altered, or destroyed. Your privacy settings may
                        also be affected by changes to the functionality of third party sites and services that you add
                        to the Intract Service. Intract is not responsible for the functionality or security measures of
                        any third party.
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        Your choices about your information
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        You control your account information and settings
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        We provide choices about how we process your account information:
                    </Typography>
                    <ul>
                        <li>
                            You can correct, download or delete the data in your account in Your Account settings; and
                        </li>
                        <li>
                            You can request access, correction or deletion of the data Intract holds on you by
                            contacting{' '}
                            <Link className={classes.mailLink} href="mailto:support@intract.com">
                                support@intract.com
                            </Link>
                            .
                        </li>
                    </ul>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        How long we keep your information
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Following termination or deactivation of your user account, Intract will retain your profile
                        information and User Content for a commercially reasonable time, and for as long as we have a
                        valid purpose to do so. In particular, Intract will retain your information for the purpose of
                        complying with its legal and audit obligations, and for backup and archival purposes.
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        User access and control requests
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Intract extends to users various rights with respect to the personal information we collect,
                        including the right to (subject to certain limitations):
                    </Typography>
                    <ul>
                        <li>Request to access the personal information Intract has about you;</li>
                        <li>Request that Intract delete all of your personal information; and</li>
                        <li>Request that Intract correct inaccurate personal information;</li>
                    </ul>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        Categories of personal information collected by Intract
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        For more details about the personal information Intract has collected in the past year, please
                        see “Information we collect”. For details on how we use that information, who we share it with,
                        and how long we keep it, please see the sections titled: “How we use your information”, “Sharing
                        your information”, and “How long we keep your information.”
                    </Typography>
                    <Typography className={classes.paragraphBold} variant={'body1'}>
                        Exercising your rights
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Users may make a request by contacting us at{' '}
                        <Link className={classes.mailLink} href="mailto:support@intract.com">
                            support@intract.com
                        </Link>
                        . We will authenticate your request using the email address associated with your Intract account
                        and if necessary, proof of residency.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        In some circumstances Intract will not be able to comply with your request regarding your
                        personal data. If we are unable to remove any of your information, we will explain why. For
                        example, we may not be able to provide a copy of your information where it infringes on the
                        rights of another user. In some cases, you may have shared your information with third parties,
                        such as by publishing a design on a third party’s website. In that case Intract will not be able
                        to delete the information, and you will need to contact that third party directly.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        If we are unable to resolve your request, or if you are concerned about a potential violation,
                        you also have the option to report the issue or make a complaint to the data protection
                        authority in your jurisdiction. Where you have provided your consent to certain processing and
                        no longer want us to use your information for that purpose, you may withdraw your consent to
                        this use, although this will not affect the lawfulness of processing based on consent before its
                        withdrawal.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        Changes to this Policy
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        We may update this policy from time to time to reflect our current practice and ensure
                        compliance with applicable laws. When we post changes to this policy, we will revise the “Last
                        Updated” date at the top of this policy. If we make any material changes to the way we collect,
                        use, store and/or share your personal information, we will notify you on our website or by
                        sending an email to the email address associated with your Intract account. We recommend that
                        you check this page from time to time to inform yourself of any changes.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        How to contact us
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        If you have any questions about this Privacy Policy or the Service, or wish to make a complaint
                        please contact us at:{' '}
                        <Link className={classes.mailLink} href="mailto:support@intract.com">
                            support@intract.com
                        </Link>
                        .
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    );
};

const useStyles = makeStyles<{ auth: boolean }>()((theme, { auth }) => ({
    paragraph: {
        marginBottom: theme.spacing(1.5),
    },
    paragraphBold: {
        marginBottom: theme.spacing(1.5),
        fontWeight: 'bold',
    },
    paragraphIndented: {
        marginLeft: theme.spacing(2),
    },
    header: {
        marginBottom: theme.spacing(1),
        fontWeight: 'bold',
    },
    divider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    bold: {
        fontWeight: 'bold',
    },
    mailLink: {
        fontWeight: 'bold',
        color: theme.palette.info.main,
    },
    paper: {
        paddingTop: theme.spacing(auth ? 0 : 3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
}));

export default PrivacyScreen;
