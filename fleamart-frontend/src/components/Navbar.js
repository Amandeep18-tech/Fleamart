import { styled } from '@mui/system';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { ReactComponent as FleamartIcon } from '../fleamart.svg';
import { useNavigate } from 'react-router-dom';

const Container = styled('section')({
  height: 'auto',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
});

const Wrapper = styled('div')({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const LeftContainer = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

const CenterContainer = styled('div')({ flex: 1, textAlign: 'center' });

const RightContainer = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const MenuItem = styled('div')({
  fontSize: '18px',
  cursor: 'pointer',
  margin: '25px',
});

const Navbar = ({ name, logout }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        <LeftContainer>
          <MenuItem>
            <HomeOutlinedIcon
              sx={{
                width: '30px',
                height: '30px',
              }}
              onClick={() => navigate('/listings')}
            />
          </MenuItem>
        </LeftContainer>
        <CenterContainer>
          <FleamartIcon />
        </CenterContainer>
        <RightContainer>
          <MenuItem>{name}</MenuItem>
          <MenuItem>
            <PersonOutlineIcon
              sx={{
                width: '30px',
                height: '30px',
              }}
              onClick={() => navigate('/profile')}
            />
          </MenuItem>
          <MenuItem>
            <LogoutIcon
              sx={{
                width: '30px',
                height: '30px',
              }}
              onClick={() => {
                logout();
                navigate('/');
              }}
            />
          </MenuItem>
        </RightContainer>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
