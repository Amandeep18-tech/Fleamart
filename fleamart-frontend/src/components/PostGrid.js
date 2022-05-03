import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const PostGrid = ({ listings }) => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={5} justify='center' sx={{ padding: '3vh' }}>
      {listings.map((listing) => {
        return (
          <Grid
            key={listing.id}
            item
            xs={12}
            sm={6}
            md={4}
            onClick={() => navigate(`/listings/${listing.id}`)}
          >
            <Card sx={{ maxWidth: '40vh' }}>
              <CardMedia
                component='img'
                sx={{ height: '40vh', width: '40vh' }}
                image={listing.imageUrls[0].url}
              />
              <CardContent>
                <Typography
                  sx={{ fontFamily: 'Open Sans' }}
                  gutterBottom
                  variant='h5'
                  component='div'
                ></Typography>
                <Typography variant='h6' color='text.primary'>
                  {listing.productName}
                </Typography>
                <Typography variant='h6' color='text.secondary'>
                  {listing.price} {listing.currency}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PostGrid;
