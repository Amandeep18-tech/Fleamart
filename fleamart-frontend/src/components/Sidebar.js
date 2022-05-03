import { styled } from '@mui/system';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ViewListIcon from '@mui/icons-material/ViewList';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled('section')({
  boxShadow: '0 0 6px hsl(210 14% 90%)',
});

const SidebarLink = styled('h3')({
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

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <SidebarContainer>
      <FlexContainer
        onClick={() => {
          navigate('/listings');
        }}
      >
        <DynamicFeedIcon
          sx={{ width: '5vh', height: '5vh', marginRight: '2vh' }}
        />
        <SidebarLink>Browse Listings</SidebarLink>
      </FlexContainer>
      <FlexContainer
        onClick={() => {
          navigate('/listings/profile');
        }}
      >
        <ViewListIcon
          sx={{ width: '5vh', height: '5vh', marginRight: '2vh' }}
        />
        <SidebarLink>My Listings</SidebarLink>
      </FlexContainer>
      <FlexContainer
        onClick={() => {
          navigate('/listings/subscriptions');
        }}
      >
        <SubscriptionsIcon
          sx={{ width: '5vh', height: '5vh', marginRight: '2vh' }}
        />
        <SidebarLink>Subscriptions</SidebarLink>
      </FlexContainer>
      <FlexContainer
        sx={{
          backgroundColor: '#3360ff',
          color: 'white',
          '&:hover': {
            backgroundColor: '#3360ff',
          },
        }}
        onClick={() => {
          navigate('/listings/new');
        }}
      >
        <PostAddIcon
          sx={{
            width: '5vh',
            height: '5vh',
            marginRight: '2vh',
          }}
        />
        <SidebarLink>Create a New Listing</SidebarLink>
      </FlexContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
