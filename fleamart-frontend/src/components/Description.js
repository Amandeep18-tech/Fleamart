import { styled } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const SidebarContainer = styled('section')({
  boxShadow: '0 0 6px hsl(210 14% 90%)',
});

const SidebarLink = styled('h4')({
  fontWeight: 500,
  width: '20vh',
});

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '5vh 2vh',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
  borderRadius: '10px',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#dfe3ee',
  },
  width: '40vh',
  height: '8vh',
  cursor: 'pointer',
});

const Description = ({ listing }) => {
  const navigate = useNavigate();
  return (
    <SidebarContainer>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems='center'>
            <Grid item xs>
              <Typography gutterBottom variant='h4' component='div'>
                {listing.productName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant='h6' component='div'>
                {listing.price} {listing.currency}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            align='center'
            color='text.primary'
            variant='body1'
            sx={{ marginBottom: '2vh' }}
          >
            {listing.condition}
          </Typography>
          <Typography
            align='center'
            color='text.primary'
            variant='body1'
            sx={{ marginBottom: '2vh' }}
          >
            {listing.status}
          </Typography>
          <Typography
            align='justify'
            color='text.primary'
            variant='body2'
            sx={{ marginBottom: '2vh' }}
          >
            {listing.description}
          </Typography>
        </Box>
        <Divider variant='middle' />
        <Box sx={{ m: 2 }}>
          <Typography sx={{ marginBottom: '2vh' }} variant='h6'>
            Contact
          </Typography>
          <Typography
            align='center'
            color='text.primary'
            variant='body1'
            sx={{ marginBottom: '2vh' }}
          >
            {listing.userId}
          </Typography>
          <Typography
            align='center'
            color='text.primary'
            variant='body1'
            sx={{ marginBottom: '2vh' }}
          >
            {listing.sellerContact1}
          </Typography>
          <Typography
            align='center'
            color='text.primary'
            variant='body1'
            sx={{ marginBottom: '2vh' }}
          >
            {listing.sellerContact2}
          </Typography>
        </Box>
        <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
          <FlexContainer
            sx={{
              backgroundColor: '#3360ff',
              color: 'white',
              '&:hover': {
                backgroundColor: '#3360ff',
              },
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon
              sx={{
                width: '5vh',
                height: '5vh',
                marginRight: '2vh',
              }}
            />
            <SidebarLink>Back</SidebarLink>
          </FlexContainer>
        </Box>
      </Box>
    </SidebarContainer>
  );
};

export default Description;
