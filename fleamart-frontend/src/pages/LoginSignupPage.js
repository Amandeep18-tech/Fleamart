// This file builds up the UI Page for Login and Registration of the User.
// This design was inspired by the following resource: https://codesandbox.io/s/5xdnb
import React from 'react';
import { styled } from '@mui/system';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as FleamartIcon } from '../fleamart.svg';
import { Snackbar } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { AccountContext } from '../Account';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  margin: '-20px 0 50px',
});

const FormContainer = styled('div')({
  borderRadius: '10px',
  boxShadow: '10px 10px 30px -5px rgba(57, 80, 87, 0.7)',
  position: 'relative',
  overflow: 'hidden',
  width: '1000px',
  maxWidth: '100%',
  minHeight: '650px',
});

const SignUpContainer = styled('div')((props) => ({
  position: 'absolute',
  top: '0',
  left: '0',
  height: '100%',
  transition: 'all 0.5s ease-in-out',
  width: '50%',
  transform: props.toggle !== true && 'translateX(100%)',
  opacity: props.toggle !== true ? '1' : '0',
  zIndex: props.toggle !== true ? '5' : '1',
}));

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

const SignInContainer = styled('div')((props) => ({
  position: 'absolute',
  top: '0',
  height: '100%',
  transition: 'all 0.5s ease-in-out',
  left: '0',
  width: '50%',
  zIndex: '2',
  transform: props.toggle !== true && 'translateX(100%)',
}));

const Form = styled('form')({
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '0 50px',
  height: '100%',
  textAlign: 'center',
});

const Title = styled('h1')({
  marginBottom: '20px',
});

const Input = styled(TextField)({
  margin: '8px 0px',
  width: '100%',
});

const SubmitButton = styled(Button)({
  border: '1px solid #00c6ff',
  backgroundColor: '#0072ff',
  color: '#ffffff',
  width: '100%',
  margin: '8px 0px',
});

const TransparentButton = styled(Button)({
  backgroundColor: 'transparent',
  borderColor: '#ffffff',
  color: '#ffffff',
  width: '100%',
  margin: '8px 0px',
});

const Anchor = styled('a')({
  color: '#333',
  fontSize: '14px',
  textDecoration: 'none',
  margin: '15px 0',
});

const PanelContainer = styled('div')((props) => ({
  position: 'absolute',
  top: '0',
  left: '50%',
  width: '50%',
  height: '100%',
  overflow: 'hidden',
  transition: 'transform 0.6s ease-in-out',
  zIndex: '100',
  transform: props.toggle !== true && 'translateX(-100%)',
}));

const Panels = styled('div')((props) => ({
  background: 'linear-gradient(to right, #0072ff, #00c6ff)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: '0 0',
  color: '#ffffff',
  position: 'relative',
  left: '-100%',
  height: '100%',
  width: '200%',
  transition: 'transform 0.6s ease-in-out',
  transform: props.toggle !== true ? 'translateX(50%)' : 'translateX(0)',
}));

const Panel = styled('div')({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '0 40px',
  textAlign: 'center',
  top: '0',
  height: '100%',
  width: '50%',
  transform: 'translateX(0)',
  transition: 'transform 0.6s ease-in-out',
});

const LeftPanel = styled(Panel)((props) => ({
  transform: props.toggle !== true ? 'translateX(0)' : 'translateX(-20%)',
}));

const RightPanel = styled(Panel)((props) => ({
  right: '0',
  transform: props.toggle !== true ? 'translateX(20%)' : 'translateX(0)',
}));

const LoginSignupPage = () => {
  const [toggle, setToggle] = useState(true);
  const [forgot, setForgot] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [city, setCity] = useState('');
  const [country] = useState('Canada');
  const [code, setCode] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const { authenticate, signup, sendVerificationCode, resetPassword } =
    useContext(AccountContext);
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    setForgot(false);
    setToggle(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  const onSignupSubmit = (e) => {
    e.preventDefault();

    signup(
      email,
      password,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      city,
      country
    )
      .then(() => {
        setMessage('Sign Up Successful! Please check your email & confirm it!');
        setToggle(true);
        setPassword('');
        setOpen(true);
      })
      .catch((err) => {
        setMessage(err.message);
        setOpen(true);
      });
  };

  const onSigninSubmit = (e) => {
    e.preventDefault();

    authenticate(email, password)
      .then((data) => {
        setMessage('Sign In Successful!');
        setOpen(true);
        setTimeout(() => {
          navigate('/listings');
        }, 1000);
      })
      .catch((err) => {
        setMessage(err.message);
        setOpen(true);
      });
  };

  const onVerificationSubmit = (e) => {
    e.preventDefault();
    sendVerificationCode(email);
    setToggle(true);
    setMessage('Verification Code Sent! Please Check your mail!');
    setOpen(true);
  };

  const onConfirmSubmit = (e) => {
    e.preventDefault();
    resetPassword(email, code, password);
    setForgot(true);
    setMessage('Password Changed!');
    setOpen(true);
    setPassword('');
  };
  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FleamartIcon />
        <FormContainer>
          <SignInContainer toggle={toggle}>
            {forgot && (
              <Form>
                <Title>Sign in</Title>
                <Input
                  type='email'
                  placeholder='Email'
                  label='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type='password'
                  placeholder='Password'
                  label='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Anchor onClick={handleForgotPassword}>Forgot password?</Anchor>
                <SubmitButton variant='contained' onClick={onSigninSubmit}>
                  Sign in
                </SubmitButton>
              </Form>
            )}
            {!forgot && (
              <Form>
                <Title>Enter Verification Code</Title>
                <Input
                  type='text'
                  placeholder='Verification code'
                  label='Verification code'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Input
                  type='password'
                  placeholder='New password'
                  label='New password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <SubmitButton variant='contained' onClick={onConfirmSubmit}>
                  Confirm
                </SubmitButton>

                <Anchor onClick={handleForgotPassword}>
                  Didn't recieve code?
                </Anchor>
              </Form>
            )}
          </SignInContainer>
          <SignUpContainer toggle={toggle}>
            {forgot && (
              <Form>
                <Title>Sign up</Title>
                <FlexContainer>
                  <Input
                    type='text'
                    placeholder='First name'
                    label='First name'
                    style={{ marginRight: '5px' }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <Input
                    type='text'
                    placeholder='Last name'
                    label='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </FlexContainer>
                <Input
                  type='email'
                  placeholder='Email'
                  label='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type='password'
                  placeholder='Password'
                  label='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Input
                  select
                  label='Gender'
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <MenuItem value='Male'>Male</MenuItem>
                  <MenuItem value='Female'>Female</MenuItem>
                  <MenuItem value='Other'>Other</MenuItem>
                </Input>
                <DesktopDatePicker
                  label='Birthday'
                  inputFormat='MM/dd/yyyy'
                  value={dateOfBirth}
                  onChange={(date) => setDateOfBirth(date)}
                  renderInput={(params) => <Input {...params} required />}
                />
                <Input
                  select
                  placeholder='City'
                  label='City'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                >
                  <MenuItem value='Toronto'>Toronto</MenuItem>
                  <MenuItem value='Vancouver'>Vancouver</MenuItem>
                  <MenuItem value='Montreal'>Montreal</MenuItem>
                  <MenuItem value='Halifax'>Halifax</MenuItem>
                </Input>
                <SubmitButton variant='contained' onClick={onSignupSubmit}>
                  Sign up
                </SubmitButton>
              </Form>
            )}
            {!forgot && (
              <Form>
                <Title>Forgot Password</Title>
                <Input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <SubmitButton
                  variant='contained'
                  onClick={onVerificationSubmit}
                >
                  Send Verification Code
                </SubmitButton>
              </Form>
            )}
          </SignUpContainer>
          <PanelContainer toggle={toggle}>
            <Panels toggle={toggle}>
              {forgot && (
                <LeftPanel toggle={toggle}>
                  <Title>Have an account ?</Title>
                  <TransparentButton
                    variant='outlined'
                    onClick={() => setToggle(true)}
                  >
                    Sign In
                  </TransparentButton>
                </LeftPanel>
              )}
              {!forgot && (
                <LeftPanel toggle={toggle}>
                  <Title> Cancel this Operation?</Title>
                  <TransparentButton
                    variant='outlined'
                    onClick={() => {
                      setToggle(true);
                      setForgot(true);
                    }}
                  >
                    Cancel
                  </TransparentButton>
                </LeftPanel>
              )}
              {forgot && (
                <RightPanel toggle={toggle}>
                  <Title>New user ?</Title>
                  <TransparentButton
                    variant='outlined'
                    onClick={() => setToggle(false)}
                  >
                    Sign Up
                  </TransparentButton>
                </RightPanel>
              )}
              {!forgot && (
                <RightPanel toggle={toggle}>
                  <Title> Cancel this Operation?</Title>
                  <TransparentButton
                    variant='outlined'
                    onClick={() => {
                      setToggle(true);
                      setForgot(true);
                    }}
                  >
                    Cancel
                  </TransparentButton>
                </RightPanel>
              )}
            </Panels>
          </PanelContainer>
        </FormContainer>
      </LocalizationProvider>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </Container>
  );
};

export default LoginSignupPage;
