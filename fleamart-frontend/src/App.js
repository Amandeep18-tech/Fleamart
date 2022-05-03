// Base component of front-end application. It has routing configuration.
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginSignupPage from './pages/LoginSignupPage';
import ListingsPage from './pages/ListingsPage';
import { Account } from './Account';
import PostPage from './pages/PostPage';
import ProtectedRoute from './routes/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import MyListingsPage from './pages/MyListingsPage';
import ListingPage from './pages/ListingPage';
import MyPostPage from './pages/MyPostPage';
import SubscriptionsPage from './pages/SubscriptionsPage';

function App() {
  return (
    <div className='App'>
      <Account>
        <Routes>
          <Route path='/' element={<LoginSignupPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/listings' element={<ListingsPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/listings/profile' element={<MyListingsPage />} />
            <Route path='/listings/:id' element={<ListingPage />} />
            <Route path='/listings/new' element={<PostPage />} />
            <Route path='/listings/profile/:id' element={<MyPostPage />} />
            <Route
              path='/listings/subscriptions'
              element={<SubscriptionsPage />}
            />
          </Route>
        </Routes>
      </Account>
    </div>
  );
}

export default App;
