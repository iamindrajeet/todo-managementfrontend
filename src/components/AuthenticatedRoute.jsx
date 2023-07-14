import PropTypes from 'prop-types';
import { isUserLoggedIn } from "../services/AuthService";
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ children }) => {
  console.log(children)
  const isAuth = isUserLoggedIn();

  if (isAuth) {
    return children;
  }

  return <Navigate to="/" />;
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticatedRoute;