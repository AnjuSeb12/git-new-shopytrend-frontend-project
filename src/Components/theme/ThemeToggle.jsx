import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/themeSlice';
import { BsSun, BsMoon } from 'react-icons/bs';
import { Button } from 'react-bootstrap';


const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button onClick={handleToggle} variant="outline-light" className="ms-3">
      {theme === 'dark' ? <BsSun /> : <BsMoon />}
    </Button>
  );
};

export default ThemeToggle;
