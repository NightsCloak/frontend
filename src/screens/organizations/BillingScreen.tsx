import { makeStyles } from 'tss-react/mui';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import OrganizationSubscription from '@intractinc/base/components/Billing/Organization/OrganizationSubscription';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import { CreditCard, ExpandMore, Payments, Receipt } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import OrganizationNavigation from '@intractinc/base/components/Organizations/OrganizationNavigation';
import OrganizationInvoices from '@intractinc/base/components/Billing/Organization/OrganizationInvoices';
import OrganizationSubscriptionChip from '@intractinc/base/components/Billing/Organization/OrganizationSubscriptionChip';
import PaymentMethod from '@intractinc/base/components/Billing/Organization/PaymentMethod';

const BillingScreen: FC = () => {
    const { organization, organizationSocket, organizationErrorMsg, refetchOrganization } = useWorkspace();
    const [expanded, setExpanded] = useState<string | false>('subscription');
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const [searchParams, setSearchParams] = useSearchParams();
    const action = searchParams.get('action');

    const menuChanged = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        if (!expanded) {
            if (action && (action === 'subscribed' || action === 'subscription')) {
                setExpanded('subscription');
            }
        }
    }, []);

    useEffect(() => {
        if (action === 'subscribed') {
            setSearchParams({}, { replace: true });
        }
    }, [expanded]);

    useEffect(() => {
        updateBreadcrumbs([
            {
                skeleton: !organization,
                type: 'organization',
                name: organization?.name,
                avatar: organization?.avatar_route,
                uri: `/organizations/${organization?.id}`,
                chip: <OrganizationTierChip {...{ organization }} />,
            },
            { name: 'Billing' },
        ]);

        if (!organization) {
            return;
        }

        updateTabTitle(`${organization.name} - Billing`);
    }, [organization]);

    if (organizationErrorMsg) {
        return (
            <ErrorScreen
                {...{
                    message: organizationErrorMsg,
                    navigateTo: `/home`,
                }}
            />
        );
    }

    if (!organization) {
        return <Holding />;
    }

    if (!organization.member || !organization.member.organizationGates.owner) {
        return (
            <ErrorScreen
                {...{
                    message: 'Invalid permissions.',
                    navigateTo: `/organizations/${organization.id}`,
                }}
            />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.nav}>
                <OrganizationNavigation {...{ organization, refetch: refetchOrganization }} />
            </div>
            <Grid className={classes.container} container>
                <Grid item xs={12} md={12} xl={10}>
                    <Accordion
                        slotProps={{
                            transition: { unmountOnExit: true },
                        }}
                        expanded={expanded === 'subscription'}
                        onChange={menuChanged('subscription')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="subscription-content"
                            id="subscription-header"
                        >
                            <Payments sx={{ fontSize: 30, marginRight: (theme) => theme.spacing(1) }} />
                            <Typography sx={{ marginRight: (theme) => theme.spacing(1) }} variant={'h5'}>
                                Subscription:
                            </Typography>
                            <Stack
                                sx={{
                                    width: '100%',
                                    alignItems: 'center',
                                    marginRight: 2,
                                }}
                                direction={'row'}
                                spacing={2}
                            >
                                <OrganizationSubscriptionChip
                                    {...{ subscription: organization.current_subscription, medium: true }}
                                />
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ marginBottom: (theme) => theme.spacing(2) }}>
                                <Chip label="Manage the subscription" />
                            </Divider>
                            <OrganizationSubscription {...{ organization, socket: organizationSocket }} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        slotProps={{
                            transition: { unmountOnExit: true },
                        }}
                        expanded={expanded === 'payment'}
                        onChange={menuChanged('payment')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="payment-content"
                            id="payment-header"
                        >
                            <CreditCard sx={{ fontSize: 30, marginRight: (theme) => theme.spacing(1) }} />
                            <Typography sx={{ marginRight: (theme) => theme.spacing(1) }} variant={'h5'}>
                                Payment Method (Stripe):
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ marginBottom: (theme) => theme.spacing(2) }}>
                                <Chip label="Payment Method" />
                            </Divider>
                            <PaymentMethod />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        slotProps={{
                            transition: { unmountOnExit: true },
                        }}
                        expanded={expanded === 'invoices'}
                        onChange={menuChanged('invoices')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="invoices-content"
                            id="invoices-header"
                        >
                            <Receipt sx={{ fontSize: 30, marginRight: (theme) => theme.spacing(1) }} />
                            <Typography sx={{ marginRight: (theme) => theme.spacing(1) }} variant={'h5'}>
                                Invoices:
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <OrganizationInvoices {...{ organization }} />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        '& .MuiPaper-root': {
            flex: 1,
            padding: theme.spacing(1),
        },
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'auto',
        transition: `max-height 300ms ease-in-out`,
        '&::-webkit-scrollbar': {
            width: 8,
        },
        scrollbarWidth: 'thin',
        height: 'auto',
        marginTop: theme.spacing(3),
        paddingRight: theme.spacing(2.125),
    },
    leftNav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
    nav: {
        height: 32,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
        marginRight: theme.spacing(2.125),
    },
}));

export default BillingScreen;
