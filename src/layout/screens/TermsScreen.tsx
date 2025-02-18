import { FC, useEffect } from 'react';
import { Card, CardContent, Divider, Link, Paper, Typography } from '@mui/material';
import { FactCheck } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';
import { Link as NavLink } from 'react-router-dom';
import { useTools } from '@/contexts/ToolsContext';
import { useAppSelector } from '@/redux/hooks';

const TermsScreen: FC = () => {
    const auth = useAppSelector((state) => state.auth.status);
    const { classes } = useStyles({ auth });
    const { updateTabTitle, updateBreadcrumbs } = useTools();

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Terms of use' }]);
        updateTabTitle('Terms of use');
    }, []);

    return (
        <Paper className={classes.paper}>
            {!auth && (
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant={'h4'}>
                        <FactCheck sx={{ fontSize: 26 }} /> Terms of Use
                    </Typography>
                </div>
            )}
            <Typography sx={{ marginY: 1, fontWeight: 'bold' }} variant={'h6'}>
                These Terms of Use are effective as of: November 10, 2023
            </Typography>
            <Typography sx={{ marginY: 1 }} variant={'body1'}>
                Welcome to Intract! These Terms of Use (“Terms”) apply to your (“you” or “your”) use of Intract’s
                digital design platform and INTRACT 3D Web-Based Collaborative Asset Management Software (the
                “Service”). By using the Service, you agree that these terms will become a legally binding agreement
                between you and the Intract, Inc. (“Intract”).
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        1. Overview
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Intract is a digital design platform that empowers people to create certain digital content
                        (each a “Design”). When you use the Service, you’ll have access to a variety of 3D assets and
                        other content provided by Intract and other content providers to use in your Designs (“Licensed
                        Content”). You also have the option to upload your own content (“User Content”) which you have
                        full control and responsibility over. You can use Licensed Content, your User Content, and tools
                        available in Intract to create your Designs.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        The Service is made available on intract.com and in other forms provided or made available by
                        Intract. Your use of the Service is subject to these Terms and, to the extent you are
                        contributing Licensed Content, the Contributor Agreement. By using the Service you acknowledge
                        Intract’s{' '}
                        <NavLink to={'/privacy'} className={classes.mailLink}>
                            Privacy Policy
                        </NavLink>
                        .
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        You may use the Service only if you can enter into a binding contract with Intract and are
                        legally permitted to do so. By using the Service, you represent and warrant that you have the
                        full right, power and authority to agree to and be bound by these Terms and to fully perform all
                        of your obligations hereunder.
                    </Typography>
                    <Typography variant={'body1'}>
                        If you sign up for the Service on behalf of an organization using an email address provided by
                        your employer or another organization, (i) you represent and warrant that you are an authorized
                        representative of that entity with authority to bind that entity to these Terms; (ii) your use
                        of the Service will bind that entity to these Terms; and (iii) “you” and “your” in these Terms
                        will refer to both you and that entity.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        2. Using the Service
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>a. Age Requirement.</span> Children may not access or use the
                        Service unless their use is directly authorized by their parent, guardian or another authorized
                        adult (such as a teacher) who agrees to be bound by these Terms. For purposes of these Terms, a
                        child is a person under the age of 13 (or the minimum legal age required to provide consent for
                        processing of personal data in the country where the child resides).
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>b. Access to the Service.</span> Subject to your compliance with
                        these Terms, you are granted a non-exclusive, limited, non-transferable, freely revocable
                        license to access and use the Service for business or personal use. Intract reserves all rights
                        not expressly granted under these Terms. Each person must have a unique account and you are
                        responsible for any activity conducted on your account.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>c. Anti-discrimination.</span> Intract does not support and will
                        not tolerate its Service being used to discriminate against others, especially when based on
                        race, religion, sex, sexual orientation, age, disability, ancestry or national origin. You are
                        not permitted to use the Service in a manner which would or would likely incite, promote or
                        support such discrimination and you must not use the Service to incite or promote hostility or
                        violence.
                    </Typography>
                    <Typography variant={'body1'}>
                        <span className={classes.bold}>d. Restrictions on Use of the Service.</span> You shall not
                        yourself or through any third party (i) rent, sell, distribute, sublicense, or otherwise make
                        available the Service or the Licensed Content to any third party (except as permitted under
                        these Terms); (ii) copy, replicate, decompile, reverse-engineer, attempt to derive the source
                        code of, modify, or create derivative works of the Service, or any part thereof; (iii) access
                        the Service for purposes of performance benchmarking; (iv) access the Service for purposes of
                        building or marketing a competitive product; (v) use the Service to store or transmit a virus or
                        malicious code; (vi) use any form of data mining, extraction, or scraping on the Service and/or
                        the contents available therein for machine learning or other purposes; or (vii) bypass the
                        measures we may use to prevent or restrict access to the Service, including without limitation
                        features that prevent or restrict use or copying of any content or enforce limitations on use of
                        the Service or the Licensed Content.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        3. Content and Designs
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>a. User Content.</span> You represent and warrant that you own
                        all right, title, and interest in and to your User Content or that you have otherwise secured
                        all necessary rights in your User Content as may be necessary to permit the access, use and
                        distribution thereof as contemplated by these Terms. As between you and Intract, you own all
                        right, title and interest in and to your User Content. You grant Intract a royalty-free and
                        sublicensable license to display, host, copy, store and use your User Content solely to the
                        extent necessary to provide the Service to you. To the extent you include User Content in a
                        Design that you’ve shared with others, you grant Intract a perpetual, royalty-free,
                        sublicensable, license to display, host, copy, store and use your User Content to the extent
                        necessary to continue to make that Design available.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>b. Licensed Content.</span> You may use Licensed Content in
                        connection with the Service. Contributors provide the Licensed Content in accordance with the
                        terms of a separate Contributor Agreement between Intract and the Contributor. Under the terms
                        of this Agreement, we grant you a perpetual, non-exclusive, non-transferable, worldwide license
                        to use Licensed Content available on Intract. Licensed Content is only made available for the
                        permitted purpose of integration into the design of your User Content. You may not copy,
                        download or distribute the Licensed Content as a standalone item. The use of Licensed Content
                        may be subject to additional license rights and restrictions determined by the Contributor of
                        such Licensed Content and disclosed in writing on the website.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>c. Designs.</span> Your Designs may include a combination of User
                        Content and Licensed Content. While you retain ownership of your User Content, you may not use
                        the Licensed Content in any of the following ways:
                    </Typography>
                    <ul>
                        <li>
                            Sub-license, re-sell, lend, assign, gift or otherwise transfer or distribute the Licensed
                            Content or the rights granted under this Agreement;
                        </li>
                        <li>
                            Use any of the Licensed Content as part of a trademark, design-mark, trade-name, business
                            name or service mark;
                        </li>
                        <li>
                            Use Licensed Content as “Editorial Use Only,” for any commercial, promotional, endorsement,
                            advertising or merchandising use. In this agreement, “Editorial Use Only” content means
                            relating to events that are newsworthy or of general interest and expressly excludes any
                            advertorial use (i.e. sections or supplements featuring brand and/or product names or
                            sections or supplements in relation to which you receive a fee from a third-party advertiser
                            or sponsor);
                        </li>
                        <li>
                            Remove any notice of copyright, trademark, or other proprietary right from any Licensed
                            Content;
                        </li>
                        <li>Use or display the Licensed Content on a standalone basis on websites or other venues;</li>
                        <li>
                            Use the Licensed Content in a way that is pornographic, obscene, immoral, infringing,
                            defamatory or libelous in nature, or that would be reasonably likely to bring any person or
                            property reflected in the Licensed Content into disrepute;
                        </li>
                        <li>
                            To the extent source code is contained within the Licensed Content, reverse engineer,
                            decompile, or disassemble any part of such source code;
                        </li>
                        <li>
                            Use or display Licensed Content in a manner that gives the impression that the Licensed
                            Content was created by you or a person other than the copyright holder of the Licensed
                            Content (including without limitation, by claiming ownership of, or exclusive rights to, the
                            Licensed Content).
                        </li>
                    </ul>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>d. Sharing and Publishing Your Designs.</span> You may publish or
                        share Designs with others within the Service, via a Third Party Service, or via a link. Intract
                        maintains no responsibility in relation to such sharing of Designs and Intract’s enablement of
                        such activity or the Service’s performance of actions to publicly share Designs at your
                        instruction shall not be considered a violation of any of Intract’s obligations under these
                        Terms.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        4. Billing
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>a.</span> Intract may use a third-party payment processor (the
                        “Payment Processor”) to bill you through a payment account linked to your account on the
                        Services (your “Billing Account”) for use of the Services. The processing of payments through a
                        Payment Processor will be subject to the terms, conditions, and privacy policies of the Payment
                        Processor. By choosing to use the Services, you agree to pay Intract all charges at the prices
                        then in effect for any use of the Services in accordance with the applicable payment terms, and
                        you authorize Intract, through the Payment Processor, to charge your chosen payment provider
                        (your “Payment Method”). You agree to may payment using the selected Payment Method. Intract
                        reserves the right to correct any errors or mistakes that the Payment Processor makes even if it
                        had already requested or received payment.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>b. Subscriptions and Renewals.</span> If you are subscribing to
                        Intract, you can sign up for either a monthly or annual subscription. Your subscription will
                        automatically renew on a monthly or annual basis as applicable. You can cancel your subscription
                        at any time. If you cancel your subscription, you will not receive a refund or credit for any
                        amounts that have already been billed.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>c. Taxes.</span> Your fees are inclusive of all taxes unless
                        otherwise specified in an agreement with Intract, within the Service or on an applicable
                        invoice. Tax rates are calculated based on the billing information you provide and the
                        applicable tax rate at the time of your subscription charge.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>d. Cancellation.</span> You can stop using the Service and/or
                        cancel your subscription at any time via your account settings. If you cancel your subscription
                        you will not be entitled to a refund of any fees already paid and any outstanding fees will
                        become immediately due and payable.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>e. Free Trials and Pilots.</span> Intract may offer you a free
                        trial or pilot to allow you to try our Service. Intract reserves the right to set eligibility
                        requirements and the duration for free trials and pilots.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        At the end of your free trial, Intract will charge the relevant fees for the next billing cycle
                        to your nominated Payment Method, unless you cancel your subscription prior to the end of the
                        free trial. If you have access to a pilot, your access to the Service will cease if you do not
                        enter into a pay the applicable fees at the end of the pilot period.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>f. Changes to Pricing.</span> Intract reserves the right to
                        change its prices at any time. If you are on a subscription plan, changes to pricing will not
                        apply until your next renewal or thirty (30) days after notice, whichever is later.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        5. Intract’s Intellectual Property
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Except as expressly set out in these Terms, all intellectual property rights in and to the
                        Service and Licensed Content remain the sole property of Intract and its licensors. You assign
                        to Intract any suggestions, ideas, enhancement requests, or other feedback you provide to
                        Intract relating to the Service or Intract’s products. Intract owns all content, data, software,
                        inventions, ideas and other technology and intellectual property that it develops in connection
                        with the Service and its products.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        6. Warranty Disclaimer
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>
                            The Service is provided on an “as-is” and “as-available” basis. To the maximum extent
                            permitted by applicable law and subject to any non-excludable rights and remedies you may
                            have under applicable law, Intract, its licensors, and its suppliers, expressly disclaim any
                            and all warranties of any kind, whether express or implied, including, but not limited to,
                            warranties of merchantability, fitness for a particular purpose, or non-infringement.
                            Intract does not warrant that your use of the Service will be uninterrupted or error-free.
                            Intract does not warrant that it will review your data for accuracy or that it will preserve
                            or maintain your data without loss. You understand that use of the Service necessarily
                            involves transmission of your data over networks that Intract does not own, operate, or
                            control, and that Intract is not responsible for any of your data lost, altered, intercepted
                            or stored across such networks. Intract will not be liable for delays, interruptions,
                            service failures, or other problems inherent in use of the internet and electronic
                            communications or other systems outside Intract’s reasonable control.
                        </span>
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        7. Third Party Services
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        You may elect to use the Service in conjunction with third-party websites, platforms or apps
                        (“Third Party Service(s)”). Your use of a Third Party Service is subject to the terms and
                        conditions applicable to that Third Party Service. Intract makes no representations or
                        warranties in relation to Third Party Services and expressly disclaims all liability arising
                        from your use of Third Party Services.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        8. Your Indemnity Obligations
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        You agree, to the extent permitted by law, to defend, indemnify and hold harmless Intract and
                        its affiliates, officers, directors, agents, licensors and employees from and against any and
                        all claims, costs, damages, losses, liabilities and expenses (including reasonable attorneys’
                        fees and costs) resulting from or related to (i) your violation of these Terms or (ii) your User
                        Content.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        9. Limitation of Liability
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>
                            In no event shall either party’s aggregate cumulative liability hereunder (whether in
                            contract, tort, negligence, strict liability in tort or by statute or otherwise) exceed the
                            greater of (i) $100 USD or (ii) the fees paid by you to Intract during the twelve-month
                            period preceding the event or occurrence giving rise to such liability. The foregoing
                            limitations shall not apply to liabilities arising out of your indemnification obligations
                            or your breach of the section entitled ‘restrictions on use of the service.’
                        </span>
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>
                            In no event shall either party be liable for any consequential, incidental, indirect,
                            special, exemplary or punitive damages, losses, or expenses (including but not limited to
                            business interruption, lost business or lost profits) even if it has been advised of their
                            possible existence and notwithstanding the failure of essential purpose of any remedy. The
                            foregoing limitations shall not apply to liabilities arising out of your indemnification
                            obligations or your breach of the section entitled ‘restrictions on use of the service.’
                        </span>
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>
                            Intract is not responsible for, and assumes no liability for, the contents of User Content.
                        </span>
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>
                            These terms do not affect consumer rights that cannot by law be waived or limited. These
                            terms do not exclude or limit liability arising out of either party’s gross negligence,
                            fraud or willful misconduct.
                        </span>
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        10. Term and Termination
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>a. Term.</span> These Terms shall take effect the first time you
                        access the Service and shall continue in full force and effect until i) if you are a paid
                        subscriber, the expiration or termination of your subscription; or ii) if you are using
                        Intract’s free offering, when your account is deleted or terminated.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>b. Violations.</span> If Intract, in its sole discretion,
                        determines that you or your use of the Service, your User Content, or your Designs violate these
                        Terms, the Section entitled “Restrictions on Use of the Service,” or the Section entitled
                        “Anti-discrimination,” (any of which is considered a “Violation”) Intract may take one or more
                        of the following actions in its sole discretion: (i) delete the prohibited User Content or
                        Designs; (ii) suspend your access to the Service; (iii) terminate and delete your account along
                        with all Designs and User Content associated with that account (iv) permanently ban you from
                        using the Service; and/or (v) disclose the prohibited User Content or Designs to appropriate
                        government authorities.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>c. Effect of Termination.</span> In the event of termination of
                        your account and/or subscription for cause due to default by Intract, Intract shall refund, on a
                        prorated basis, any prepaid fees for the Service for the period beginning on the effective date
                        of termination through the end of your then-current subscription. In the event of a termination
                        of your subscription to a violation by you, you will not receive any refund and shall
                        immediately pay any outstanding fees for the remaining period of your subscription.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        Upon any expiration or termination of your Subscription, you must cease using the Service. You
                        will lose access to your Designs, User Content, and any other information uploaded to the
                        Service (and we may delete all such data unless legally prohibited) after expiration or
                        termination of Your Subscription. User Content included in any shared Design will continue to
                        available within that Design even after the expiration of your Subscription. Unless your account
                        was terminated due to a Violation, you can download or export your User Content and Designs
                        using the functionality of the Service prior to the expiration or termination of your
                        subscription. If your account has been terminated due to a Violation, you may not create a new
                        account on any Intract Service unless you receive Intract’s written permission.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>d. Survival of Terms.</span> Sections titled “Term and
                        Termination,” “Billing,” “Intract’s Intellectual Property,” “Limitation of Liability,”
                        “Indemnification,” and “Miscellaneous” inclusive, shall survive any expiration or termination of
                        these Terms.
                    </Typography>
                </CardContent>
            </Card>
            <Divider className={classes.divider} />
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography className={classes.header} variant={'h5'}>
                        11. Miscellaneous
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>a. Compliance with Applicable Law.</span> You agree to abide by
                        all applicable local, state, national and foreign laws, treaties and regulations, in connection
                        with your use of the Service. Intract agrees to abide by all applicable local, state, national
                        and foreign laws, treaties and regulations, in connection with its provision of the Service.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>b. Governing Law and Jurisdiction.</span> These Terms will be
                        governed by and construed in accordance with the laws of the State of Washington, without regard
                        to its conflict of laws provisions. Any legal action or proceeding arising under these Terms
                        shall be brought exclusively in the federal or state courts located in King County, Washington
                        and the parties consent to exclusive jurisdiction of such courts. The United Nations Convention
                        on Contracts for the International Sale of Goods is expressly excluded in its entirety from
                        application to these Terms.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>c. Dispute Resolution.</span> If you have a dispute arising out
                        of these Terms, contact at{' '}
                        <Link className={classes.mailLink} href="mailto:support@intract.com">
                            support@intract.com
                        </Link>{' '}
                        and we’ll attempt to work with you to resolve the dispute. If we’re unable to resolve a dispute,
                        you and Intract each agree to resolve any claim, dispute, or controversy (excluding any Intract
                        claims for injunctive or other equitable relief) arising out of or in connection with these
                        Terms (collectively, “Claims”), by binding arbitration by the American Arbitration Association
                        (“AAA”) under the Commercial Arbitration Rules and Supplementary Procedures for Consumer Related
                        Disputes then in effect for the AAA, except as provided herein. The arbitration will be
                        conducted in King County, Washington, unless you and Intract agree otherwise. Each party will be
                        responsible for paying any AAA filing, administrative and arbitrator fees in accordance with AAA
                        rules. The award rendered by the arbitrator shall include costs of arbitration, reasonable
                        attorneys’ fees and reasonable costs for expert and other witnesses, and any judgment on the
                        award rendered by the arbitrator may be entered in any court of competent jurisdiction. Nothing
                        in this Section shall prevent either party from seeking injunctive or other equitable relief
                        from the courts as necessary to prevent the actual or threatened infringement, misappropriation,
                        or violation of that party’s data security, Intellectual Property Rights, or other proprietary
                        rights. All claims must be brought in the parties’ individual capacity, and not as a plaintiff
                        or class member in any purported class or representative proceeding, and, unless we agree
                        otherwise, the arbitrator may not consolidate more than one person’s claims. You agree that, by
                        entering into this agreement, you and Intract are each waiving the right to a trial by jury or
                        to participate in a class action.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>d. Assignment.</span> You may not assign these Terms or any of
                        your rights under these Terms without Intract’s consent except to any successor by way of a
                        merger, acquisition, or change of control. Intract may transfer or assign any of its rights and
                        obligations under these Terms, in whole or in part, at any time with or without notice.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>e. Headings and Explanations.</span> Headings used in these Terms
                        and the explanatory boxes are provided for convenience only and will not in any way affect the
                        meaning or interpretation of the Terms or any portion thereof.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>f. Severability.</span> If a particular provision of these Terms
                        is found to be invalid or unenforceable, it shall not affect the other provisions and the Terms
                        shall be construed in all respects as if that invalid or unenforceable provision had been
                        limited or omitted to the minimum extent necessary.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>g. Waiver.</span> Intract’s express waiver or failure to enforce
                        any provision of these Terms shall in no way be construed to be a present or future waiver of
                        such provision nor affect Intract’s ability to enforce any provision thereafter.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>h. Notices.</span> All required notices to you will be sent to
                        the email address associated with your account or through other legally permissible means.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>i. DMCA.</span> We respect the intellectual property rights of
                        artists and content owners. We will respond to notices of alleged copyright infringement that
                        comply with the Digital Millennium Copyright Act of 1998 (“DMCA”).
                    </Typography>
                    <div className={classes.paragraphIndented}>
                        <Typography className={classes.paragraph} variant={'body1'}>
                            <span className={classes.bold}>1. Notice of Claims.</span> If you believe any Licensed
                            Content of information on the Service infringes your copyright or trademark rights, you may
                            request such content be removed by following the notice and take down procedures of the
                            DMCA. To follow those procedures, contact Intract at{' '}
                            <Link className={classes.mailLink} href="mailto:support@intract.com">
                                support@intract.com
                            </Link>{' '}
                            and provide the following information:
                        </Typography>
                        <ul>
                            <li>
                                A clear statement identifying the works, or other materials believed to be infringed;
                            </li>
                            <li>
                                A statement from the copyright holder or authorized representative that the content is
                                believed to be infringing;
                            </li>
                            <li>
                                Sufficient information about the location of the allegedly infringing content so that
                                Intract can find and verify its existence;
                            </li>
                            <li>Your name, telephone number and email address;</li>
                            <li>
                                A statement from you under penalty of perjury that the information supplied is accurate,
                                and that you are authorized to act on the copyright owner’s behalf; and
                            </li>
                            <li>
                                A signature or the electronic equivalent from the copyright holder or authorized
                                representative.
                            </li>
                        </ul>
                    </div>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        You acknowledge that if you fail to comply with all of the requirements of this section your
                        DMCA notice may be invalid.
                    </Typography>
                    <div className={classes.paragraphIndented}>
                        <Typography className={classes.paragraph} variant={'body1'}>
                            <span className={classes.bold}>2. Counter-Notice.</span> If you believe that your removed
                            content (or content to which access was disabled) is not infringing, or that you have the
                            authorization from the copyright owner, the copyright owner’s agent, or pursuant to the law,
                            to post and use the material in your content, you may send a counter-notice containing the
                            following information to Intract:
                        </Typography>
                        <ul>
                            <li>Your physical or electronic signature;</li>
                            <li>
                                Identification of the content that has been removed or to which access has been disabled
                                and the location at which the content appeared before it was removed or disabled;
                            </li>
                            <li>
                                Sufficient information about the location of the allegedly infringing content so that
                                Intract can find and verify its existence;
                            </li>
                            <li>Your name, telephone number and email address;</li>
                            <li>
                                A statement that you have a good faith belief that the content was removed or disabled
                                as a result of mistake or a misidentification of the content; and
                            </li>
                            <li>
                                Your name, address, telephone number, email address, a statement that you consent to the
                                jurisdiction of the state or federal courts of the State of Washington, and a statement
                                that you will accept service of process from the person who provided notification of the
                                alleged infringement.
                            </li>
                        </ul>
                    </div>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        If a counter-notice is received by Intract, we may send a copy of the counter-notice to the
                        original complaining party informing that person that we may replace the removed content or
                        cease disabling it in 10 business days. Unless the copyright owner files an action seeking a
                        court order against the content provider, member or user, the removed content may be replaced,
                        or access to it restored in 10 business days or more after receipt of the counter-notice, at our
                        sole discretion.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>j. Changes to these Terms.</span> We may modify these Terms (and
                        any policies or agreements referenced in these Terms) at any time. We will post the most current
                        version of these Terms on intract.com. We will provide you with reasonable advance notice of any
                        change to the Terms that, in our sole determination, materially adversely affect your rights or
                        your use of the Service. We may provide you this notice via the Service and/or by email to the
                        email address associated with your account. By continuing to use the Service after any revised
                        Terms become effective, you agree to be bound by the new Terms.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>k. Changes to the Service.</span> Intract may add, change or
                        remove features or functionality to the Service; modify or introduce limitations to storage or
                        other features; or discontinue the Service altogether at any time. If you are on a paid
                        subscription and Intract discontinues the Service you are using during your subscription,
                        Intract will migrate or make available to you a substantially similar service provided by
                        Intract (if available) and if it’s unable to do so, Intract will provide you a pro-rata refund
                        of fees prepaid for the remaining period of your subscription.
                    </Typography>
                    <Typography className={classes.paragraph} variant={'body1'}>
                        <span className={classes.bold}>l. Entire Agreement.</span> These Terms and the terms and
                        policies referenced herein constitute the entire agreement between you and Intract with respect
                        to the Service. These Terms supersede any prior representations, agreements, or understandings
                        between you and Intract, whether written or oral, with respect to the Service including previous
                        versions of the Terms. All terms, conditions or provisions on a purchase order shall be of no
                        force and effect notwithstanding any acceptance of such purchase order.
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

export default TermsScreen;
