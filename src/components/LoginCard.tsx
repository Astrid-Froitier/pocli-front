import axios from 'axios';
import React, { useContext, useState } from 'react';
import { NavigateFunction, NavLink, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUser';
import IUserInfos from '../interfaces/IUserInfos';
import Icon from './Icon';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';

const LoginCard = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [stayConnected, setStayConnected] = useState<boolean>(false);
  const [accountNoExists, setAccountNoExists] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { setUser } = useContext(CurrentUserContext);

  function redirectAdherentSpace() {
    navigate('/adherent-space');
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    try {
      e.preventDefault();
      const { data } = await axios.post<IUserInfos>(
        'http://localhost:3001/api/login',
        { email, password },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      localStorage.setItem('userInfos', JSON.stringify({ id: data.id, name: data.name }));
      setUser({ id: data.id, name: data.name });
      redirectAdherentSpace();
    } catch (err) {
      // err est renvoyé potentiellement par axios ou par le code, il peut avoir différents types
      if (axios.isAxiosError(err)) {
        // pour gérer les erreurs de type axios
        console.error(err);
        setAccountNoExists('');
        setErrorEmail('');
        setErrorPassword('');
        if (err.response?.status === 401) {
          setAccountNoExists("Ce compte n'existe pas");
        }
        if (err.response?.status === 422) {
          email && regexEmail.exec(email) === null
            ? setErrorEmail('Email invalide')
            : setErrorEmail('');
          password.length < 8
            ? setErrorPassword('Minimum de 8 caractères')
            : password.length > 15
            ? setErrorPassword('Maximum de 15 caractères')
            : setErrorPassword('');
        }
      } else {
        // pour gérer les erreurs non axios
        if (err instanceof Error) {
          console.error(err);
        }
      }
    }
  };

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
        borderWidth: '2px',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
        borderWidth: '2px',
      },
    },
  });

  console.log(email);

  return (
    <>
      <form
        className="loginCardContainer"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          login(e);
        }}>
        <h1>S&apos;identifier</h1>
        <div className="loginCardContainer__email">
          <TextField
            error={errorEmail ? true : false}
            required
            id="outlined-required"
            label="Email"
            value={email}
            sx={{ width: '350px' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            InputProps={{
              style: {
                fontFamily: 'Karla, sans-serif',
                fontSize: '20px',
                fontWeight: 800,
                color: 'white',
                borderColor: 'white',
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: 'Karla, sans-serif',
                fontSize: '20px',
                fontWeight: 800,
                color: 'white',
              },
            }}
            style={{ color: 'white' }}
          />
          {errorEmail && <p>{errorEmail}</p>}
        </div>
        <div className="loginCardContainer__password">
          <div className='loginCardContainer__password__input'>
          <FormControl sx={{ width: '350px' }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              required
              error={errorPassword ? true : false}
              defaultValue="Error"
              style={{ color: 'white' }}
              sx={{
                color: 'white',
                fontFamily: 'Karla, sans-serif',
                fontSize: '20px',
                fontWeight: 800,
              }}>
              Mot de passe
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              required
              error={errorPassword ? true : false}
              sx={{
                color: 'white',
                fontFamily: 'Karla, sans-serif',
                fontSize: '20px',
                fontWeight: 800,
              }}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    style={{ color: 'white' }}
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                      event.preventDefault()
                    }
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mot de passe"
            />
          </FormControl>
          {errorPassword && <p>{errorPassword}</p>}
          {accountNoExists && <p>{accountNoExists}</p>}
          </div>
          <div className="loginCardContainer__stayConnected">
            <input
              id="stayConnected"
              type="checkbox"
              onChange={(e) => setStayConnected(e.target.checked)}></input>
            <label
              htmlFor="stayConnected"
              className="loginCardContainer__stayConnected__title">
              Rester connecté
            </label>
          </div>
          <NavLink to="/contact">
        <span className="loginCardContainer__passwordForgot">Mot de passe oublié ?</span>
        </NavLink>
        <button type="submit" className="loginCardContainer__submit">
          <Icon name="arrow-right" width="40px" height="40px" color="white" />
        </button>
        </div>
      </form>
    </>
  );
};

export default LoginCard;
