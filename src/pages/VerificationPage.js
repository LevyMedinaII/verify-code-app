import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { VERIFY_ERRORS } from '../constants/errors';
import SegmentedInput from '../components/SegmentedInput';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const VerificationPage = () => {
    const MAX_CODE_LENGTH = 6;
    const classes = useStyles();

    const [code, setCode] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const history = useHistory();

    const handleSubmit = async () => {
        setSubmitting(true);

        try {
            const response = await fetch('/api/verify', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                throw new Error(response.json().message);
            }

            history.push('/success');
        } catch (error) {
            switch (error.message) {
                case(VERIFY_ERRORS.INVALID_CODE):
                    setError('Verification Error');
                    break;
                default:
                    setError('Unhandled Error Occured');
                    break;
            }
            
        }

        setSubmitting(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Verification Code
                </Typography>
                <form className={classes.form} noValidate>
                    <SegmentedInput value={code} onChange={setCode} maxLength={MAX_CODE_LENGTH} />
                    {error && <Typography variant="button" display="block" color="error">{error}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => handleSubmit()}
                        disabled={submitting}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </Container>
    );
}


export default VerificationPage;
