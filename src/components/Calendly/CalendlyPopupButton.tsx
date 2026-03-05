import { styled } from '@mui/material/styles';
import { PopupButton } from 'react-calendly';

const StyledPopupButton = styled(PopupButton)(({ theme }) => ({
    height: 42,
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: 'inherit',
    fontWeight: 500,
    fontFamily: theme.typography.fontFamily,
    textTransform: 'uppercase',
    padding: '6px 16px',
    borderRadius: theme.shape.borderRadius,
    border: 'none',
    cursor: 'pointer',
    boxShadow: theme.shadows[2],
    transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        boxShadow: theme.shadows[4],
    },
    '&:disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
        cursor: 'not-allowed',
    },
}));

const CalendlyPopupButton = () => (
    <StyledPopupButton
        url="https://calendly.com/intractinc/intract-learn-more-call"
        rootElement={document.getElementById('root')!}
        text="Schedule a Demo!"
    />
);

export default CalendlyPopupButton;
