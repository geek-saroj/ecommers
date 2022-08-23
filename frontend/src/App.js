import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import { ToastContainer } from 'react-toastify';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from './Store';
import { useContext } from 'react';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import SignupScreen from './screen/SignupScreen';
import PaymentMethodScreen from './screen/PaymentMethodScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import OrderHistoryScreen from './screen/OrderHistoryScreen';
import ProfileScreen from './screen/ProfileScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
      <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg ="dark" variant =" light" expand="lg" >
            <Container>
              <LinkContainer to ="/">
              <Navbar.Brand >amazona</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto  w-100  justify-content-end">
                <Link to="/cart" className="nav-link ">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a , c)=> a+c.quantity,0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
              </Navbar.Collapse>
                
            </Container>
          </Navbar>
     
       
        </header>
        <main>
          <Container>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen/>} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/signin' element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path='/shipping' element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen/>} />
            <Route path="/profile" element={<ProfileScreen/>} />

            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>
           <Route path='/' element={<HomeScreen />} />



          </Routes>
          </Container>
        
        </main>
        <footer>
          <div className='text-center'>All right reserved

          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;