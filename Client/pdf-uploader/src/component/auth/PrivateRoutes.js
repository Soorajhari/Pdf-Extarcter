import React,{useEffect} from 'react';
import { useNavigate} from 'react-router-dom';

const PrivateRoutes = ({ component: Component, ...rest }) => {  // user cannot acccess specific routes without login
  const firstLogin = JSON.parse(localStorage.getItem('userDetails'));

  const navigate = useNavigate();

  useEffect(() => {
    if (!firstLogin) {
      navigate('/login');
    }
  }, [firstLogin]);

  if (!firstLogin?.accesstoken) {
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoutes;

