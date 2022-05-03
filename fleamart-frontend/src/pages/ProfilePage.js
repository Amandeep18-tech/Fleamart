// This file builds up the UI Page for Profile Management and Password Change for the signed in user.
// This design was inspired by the following resource: https://codesandbox.io/s/5xdnb
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { styled } from '@mui/system';
import { useState, useContext, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import { AccountContext } from '../Account';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  margin: '-20px 0',
});

const FormContainer = styled('div')({
  borderRadius: '10px',
  boxShadow: '10px 10px 30px -5px rgba(57, 80, 87, 0.7)',
  position: 'relative',
  overflow: 'hidden',
  width: '1000px',
  maxWidth: '100%',
  minHeight: '600px',
});

const PasswordContainer = styled('div')((props) => ({
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

const ProfileContainer = styled('div')((props) => ({
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
  marginBottom: '30px',
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

const ProfilePage = () => {
  const [toggle, setToggle] = useState(true);
  const [disabledProfile, setDisabledProfile] = useState(false);
  const [disabledPassword, setDisabledPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const [newPassword, setNewPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Canada');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const { fetchSession, updateProfile, updatePassword, logout } =
    useContext(AccountContext);

  useEffect(() => {
    fetchSession()
      .then((data) => {
        setDisabledProfile(true);
        setDisabledPassword(true);
        setFirstName(data['custom:firstname']);
        setLastName(data['custom:lastname']);
        setName(data['custom:firstname'] + ' ' + data['custom:lastname']);
        setGender(data.gender);
        setDateOfBirth(new Date(data.birthdate));
        setEmail(data.email);
        setCity(data['custom:city']);
        setCountry(data['custom:country']);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onEditProfileSubmit = (e) => {
    e.preventDefault();
    setDisabledProfile(false);
  };

  const onUpdateProfileSubmit = (e) => {
    e.preventDefault();
    try {
      updateProfile(firstName, lastName, gender, dateOfBirth, city, country);
      setMessage('Profile Updated');
    } catch (e) {
      setMessage('Some Error Occured');
    }
    setDisabledProfile(true);
    setOpen(true);
  };

  const onCancelProfileSubmit = (e) => {
    e.preventDefault();
    setDisabledProfile(true);
  };

  const onEditPasswordSubmit = (e) => {
    e.preventDefault();
    setPassword('');
    setDisabledPassword(false);
  };

  const onUpdatePasswordSubmit = (e) => {
    e.preventDefault();
    try {
      updatePassword(password, newPassword);
      setMessage('Password Updated');
    } catch (e) {
      setMessage('Some Error Occured');
    }
    setDisabledPassword(true);
    setOpen(true);
  };

  const onCancelPasswordSubmit = (e) => {
    e.preventDefault();
    setPassword('password');
    setDisabledPassword(true);
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

  return (
    <React.Fragment>
      <Navbar name={name} logout={logout} />
      <Container>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormContainer>
            <ProfileContainer toggle={toggle}>
              <Form>
                <Title>Profile</Title>
                <FlexContainer>
                  <Input
                    type='text'
                    placeholder='First name'
                    label='First name'
                    style={{ marginRight: '5px' }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={disabledProfile}
                    required
                  />
                  <Input
                    type='text'
                    placeholder='Last name'
                    label='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={disabledProfile}
                    required
                  />
                </FlexContainer>
                <Input
                  select
                  label='Gender'
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={disabledProfile}
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
                  disabled={disabledProfile}
                  onChange={(date) => setDateOfBirth(date)}
                  renderInput={(params) => <Input {...params} required />}
                />
                <Input
                  select
                  placeholder='City'
                  label='City'
                  value={city}
                  disabled={disabledProfile}
                  onChange={(e) => setCity(e.target.value)}
                  required
                >
                  <MenuItem value='Toronto'>Toronto</MenuItem>
                  <MenuItem value='Vancouver'>Vancouver</MenuItem>
                  <MenuItem value='Montreal'>Montreal</MenuItem>
                  <MenuItem value='Halifax'>Halifax</MenuItem>
                </Input>
                <FlexContainer>
                  {disabledProfile && (
                    <SubmitButton
                      variant='contained'
                      onClick={onEditProfileSubmit}
                    >
                      Edit
                    </SubmitButton>
                  )}
                  {!disabledProfile && (
                    <SubmitButton
                      variant='contained'
                      onClick={onUpdateProfileSubmit}
                    >
                      Update
                    </SubmitButton>
                  )}
                  {!disabledProfile && (
                    <SubmitButton
                      variant='contained'
                      onClick={onCancelProfileSubmit}
                    >
                      Cancel
                    </SubmitButton>
                  )}
                </FlexContainer>
              </Form>
            </ProfileContainer>
            <PasswordContainer toggle={toggle}>
              <Form>
                <Title>Change Password</Title>
                <Input
                  type='email'
                  placeholder='Email'
                  label='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={true}
                />
                <Input
                  type='password'
                  placeholder='Old password'
                  label='Old password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={disabledPassword}
                  required
                />
                {!disabledPassword && (
                  <Input
                    type='password'
                    placeholder='New password'
                    label='New password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={disabledPassword}
                    required
                  />
                )}
                <FlexContainer>
                  {disabledPassword && (
                    <SubmitButton
                      variant='contained'
                      onClick={onEditPasswordSubmit}
                    >
                      Edit
                    </SubmitButton>
                  )}
                  {!disabledPassword && (
                    <SubmitButton
                      variant='contained'
                      onClick={onUpdatePasswordSubmit}
                    >
                      Update
                    </SubmitButton>
                  )}
                  {!disabledPassword && (
                    <SubmitButton
                      variant='contained'
                      onClick={onCancelPasswordSubmit}
                    >
                      Cancel
                    </SubmitButton>
                  )}
                </FlexContainer>
              </Form>
            </PasswordContainer>
            <PanelContainer toggle={toggle}>
              <Panels toggle={toggle}>
                <LeftPanel toggle={toggle}>
                  <Title>Change Profile ?</Title>
                  <TransparentButton
                    variant='outlined'
                    onClick={() => {
                      setToggle(true);
                      setDisabledPassword(true);
                    }}
                  >
                    Profile
                  </TransparentButton>
                </LeftPanel>
                <RightPanel toggle={toggle}>
                  <Title>Change Password ?</Title>
                  <TransparentButton
                    variant='outlined'
                    onClick={() => {
                      setToggle(false);
                      setDisabledProfile(true);
                    }}
                  >
                    Change Password
                  </TransparentButton>
                </RightPanel>
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
      <Footer />
    </React.Fragment>
  );
};

export default ProfilePage;
