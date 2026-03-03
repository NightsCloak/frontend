import { FC, useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { TextField } from '@mui/material';

interface OtpInputProps {
    onComplete: (code: string) => void;
}

const OtpInput: FC<OtpInputProps> = ({ onComplete }) => {
    const [code, setCode] = useState<string[]>(Array(6).fill(''));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const isInputDisabled = (index: number) => {
        return index > 0 && code[index - 1] === '';
    };

    const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value.length > 1) {
            const firstChar = value[0];
            if (/^\d$/.test(firstChar)) {
                const newCode = [...code];
                newCode[index] = firstChar;
                setCode(newCode);
                if (index < 5) {
                    setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
                }
            }
        } else if (value === '' || /^\d$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value !== '' && index < 5) {
                setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
            }
        } else {
            event.target.value = code[index];
        }
    };

    const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (event.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        } else if (event.key === 'Backspace') {
            event.preventDefault();
            const newCode = [...code];
            if (newCode[index] !== '') {
                newCode[index] = '';
                setCode(newCode);
            } else if (index > 0) {
                newCode[index - 1] = '';
                setCode(newCode);
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    useEffect(() => {
        if (code.every((digit) => digit !== '')) {
            const fullCode = code.join('');
            onComplete(fullCode);
        }
    }, [code]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {[...Array(6)].map((_, index) => (
                <TextField
                    key={index}
                    variant={'outlined'}
                    type={'text'}
                    inputMode={'numeric'}
                    inputProps={{
                        maxLength: 1,
                        'aria-label': `Digit ${index + 1}`,
                        style: { textAlign: 'center' },
                    }}
                    value={code[index]}
                    onChange={handleChange(index)}
                    onKeyDown={handleKeyDown(index)}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    disabled={isInputDisabled(index)}
                    sx={{
                        width: '40px',
                        margin: '0 4px',
                    }}
                    autoFocus={index === 0}
                />
            ))}
        </div>
    );
};

export default OtpInput;
