import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { ReactComponent as FleamartIcon } from '../fleamart.svg';

const Container = styled('div')({
  display: 'flex',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
});

const Left = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
});

const Center = styled('div')({
  flex: 1,
  padding: '20px',
});

const SocialContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Icon = styled('div')({
  display: 'flex',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  margin: '20px',
  alignItems: 'center',
  justifyContent: 'center',
});

const ListContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-evenly',
});

const List = styled('ul')({
  margin: '10px',
  padding: '0px',
  listStyle: 'none',
});

const ListItem = styled('li')({ width: '100%', marginBottom: '10px' });

const Footer = () => {
  return (
    <Container>
      <Left>
        <FleamartIcon />
        <SocialContainer>
          <Icon>
            <FacebookIcon
              sx={{
                width: '30px',
                height: '30px',
              }}
            />
          </Icon>
          <Icon>
            <InstagramIcon
              sx={{
                width: '30px',
                height: '30px',
              }}
            />
          </Icon>
          <Icon>
            <TwitterIcon
              sx={{
                width: '30px',
                height: '30px',
              }}
            />
          </Icon>
        </SocialContainer>
      </Left>
      <Center>
        <ListContainer>
          <List>
            <ListItem style={{ fontWeight: 700, margin: '25px 0px' }}>
              Support Links
            </ListItem>
            <ListItem>FAQ</ListItem>
            <ListItem>COVID-19 Updates</ListItem>
          </List>
          <List>
            <ListItem style={{ fontWeight: 700, margin: '25px 0px' }}>
              About Us
            </ListItem>
            <ListItem>Privacy</ListItem>
            <ListItem>Careers</ListItem>
            <ListItem>Terms of Use</ListItem>
          </List>
        </ListContainer>
      </Center>
    </Container>
  );
};

export default Footer;
