// This file builds up the UI Page for showing the details of a particular listing created by the signed in user.
import React, { useState } from 'react';
import axios from '../AxiosConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useContext } from 'react';
import { AccountContext } from '../Account';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Sidebar from '../components/Sidebar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

const Form = styled('form')({
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '0 50px',
  textAlign: 'center',
  height: 'auto',
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
  margin: '5vh 0vh',
});

const Container = styled('div')({
  display: 'grid',
  height: 'auto',
  gridTemplateColumns: '1fr 3fr',
  textAlign: 'center',
  gridGap: '0.25rem',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
  minHeight: '100vh',
});

const Main = styled('main')({
  gridColumn: '2 / span 1',
  backgroundColor: '#f7f7f7',
});

const MyPostPage = () => {
  const { logout, fetchSession } = useContext(AccountContext);
  const [name, setName] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [currency] = useState('CAD');
  const [condition, setCondition] = useState('');
  const [status, setStatus] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [contact, setContact] = useState('');
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [disabledPost, setDisabledPost] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

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

  useEffect(() => {
    fetchSession()
      .then(async (data) => {
        setName(data['custom:firstname'] + ' ' + data['custom:lastname']);
        setCity(data['custom:city']);
        setCountry(data['custom:country']);
        setContact(data.email);

        try {
          const response = await axios.get(`listing/${params.id}`);
          setProductName(response.data.bodyObject.productName);
          setDescription(response.data.bodyObject.description);
          setPrice(response.data.bodyObject.price);
          setContact(response.data.bodyObject.sellerContact1);
          setCategory(response.data.bodyObject.productCategory);
          setStatus(response.data.bodyObject.status);
          setCondition(response.data.bodyObject.condition);
          setFiles(response.data.bodyObject.imageUrls);
        } catch (error) {
          console.error(error.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', name);
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('currency', currency);
    formData.append('city', city);
    formData.append('country', country);
    formData.append('sellerContact1', contact);
    formData.append('productCategory', category);
    formData.append('condition', condition);
    formData.append('status', status);

    axios
      .put(`listing/${params.id}`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((data) => {
        setMessage('Listing Updated!');
        setOpen(true);
        setTimeout(() => {
          navigate('/listings/profile');
        }, 1500);
      })
      .catch((error) => console.log(error.message));
  };

  const handleEdit = () => {
    setDisabledPost(false);
  };

  return (
    <React.Fragment>
      <Navbar name={name} logout={logout} />
      <Container>
        <Sidebar sx={{ gridColumn: '1 / span 1' }} />
        <Main>
          {loading && <div>Loading</div>}
          {!loading && (
            <Form encType='multipart/form'>
              <Input
                type='text'
                placeholder='Product Name'
                label='Product Name'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                disabled={disabledPost}
                required
              />
              <Input
                select
                label='Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={disabledPost}
                required
              >
                <MenuItem value='Furniture'>Furniture</MenuItem>
                <MenuItem value='Electronics'>Electronics</MenuItem>
                <MenuItem value='Others'>Others</MenuItem>
              </Input>
              <Input
                type='text'
                placeholder='Product Description'
                label='Product Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                disabled={disabledPost}
                required
              />
              <FlexContainer>
                <Input
                  type='text'
                  placeholder='Price'
                  label='Price'
                  style={{ marginRight: '5px' }}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={disabledPost}
                  required
                />
                <Input
                  type='text'
                  placeholder='Currency'
                  label='Currency'
                  value={currency}
                  disabled
                  required
                />
              </FlexContainer>
              <Input
                select
                label='Condition'
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                disabled={disabledPost}
                required
              >
                <MenuItem value='New'>New</MenuItem>
                <MenuItem value='Used - Fair'>Used - Fair</MenuItem>
                <MenuItem value='Factory Refurbished'>
                  Factory Refurbished
                </MenuItem>
              </Input>
              <Input
                select
                label='Status'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={disabledPost}
                required
              >
                <MenuItem value='Available'>Available</MenuItem>
                <MenuItem value='Sold'>Sold</MenuItem>
              </Input>
              <FlexContainer>
                <Input
                  type='text'
                  placeholder='City'
                  label='City'
                  style={{ marginRight: '5px' }}
                  value={city}
                  disabled
                  required
                />
                <Input
                  type='text'
                  placeholder='Country'
                  label='Country'
                  value={country}
                  disabled
                  required
                />
              </FlexContainer>
              <section
                style={{
                  marginTop: '2vh',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '2vh',
                }}
              >
                {files.map((file) => (
                  <div
                    key={file.name}
                    style={{
                      marginRight: '1vh',
                      borderRadius: '10px',
                      border: '2px solid blue',
                    }}
                  >
                    <img
                      src={file.url}
                      alt={file.name}
                      width='200vh'
                      height='200vh'
                      style={{ padding: '1vh' }}
                    />
                  </div>
                ))}
              </section>
              {disabledPost && (
                <SubmitButton variant='contained' onClick={handleEdit}>
                  EDIT
                </SubmitButton>
              )}
              {!disabledPost && (
                <SubmitButton variant='contained' onClick={handleUpdate}>
                  UPDATE LISTING
                </SubmitButton>
              )}
            </Form>
          )}
        </Main>
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

export default MyPostPage;
