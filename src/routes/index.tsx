import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Home from '../views/Home';

const RoutesWrapper: React.FC = (props: any) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
  </Router>
  );
};

export default RoutesWrapper;
