import axios from 'axios';
import React, { useContext, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUser';
import IUser from '../interfaces/IUser';
import Icon from './Icon';

const LoginCard = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate: NavigateFunction = useNavigate();

  const { setId, setAdmin, setFirstname } = useContext(CurrentUserContext);

  function redirectHome() {
    navigate('/');
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    // indispensable quand on veut utiliser async/await dans un useEffect
    try {
      e.preventDefault();
      const { data } = await axios.post<IUser>(
        'http://localhost:8000/api/login',
        { email, password },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      setErrorMessage('');
      setId(data.id);
      setFirstname(data.firstname);
      setAdmin(data.admin === 1);
      redirectHome();
    } catch (err) {
      // err est renvoyé potentiellement par axios ou par le code, il peut avoir différents types
      if (axios.isAxiosError(err)) {
        // pour gérer les erreurs de type axios
        if (err.response?.status === 401) {
          setErrorMessage('Email ou mot de passe incorrect');
        }
      } else {
        // pour gérer les erreurs non axios
        if (err instanceof Error) setErrorMessage(err.message);
      }
    }
  };

  return (
    <>
      <form
        className="loginCardContainer"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => login(e)}
      >
        <h1>S&apos;identifier</h1>
        <div className="loginCardContainer__email">
          <label htmlFor="email" className="loginCardContainer__email__title">
            Email
          </label>
          <input
            className="loginCardContainer__email__input"
            type="text"
            id="email"
            placeholder="Email"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
            value={email}
          />
        </div>
        <div className="loginCardContainer__password">
          <label htmlFor="password" className="loginCardContainer__password__title">
            Mot de passe
          </label>
          <input
            className="loginCardContainer__password__input"
            type="password"
            id="password"
            placeholder="Mot de passe"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
            value={password}
          />
        </div>
        <div className="loginCardContainer__stayConnected">
          <input id="stayConnected" type="checkbox"></input>
          <label
            htmlFor="stayConnected"
            className="loginCardContainer__stayConnected__title"
          >
            Rester connecté
          </label>
        </div>
        <p className="loginCardContainer__passwordForgot">Mot de passe oublié</p>
        <NavLink to="/welcome" className="loginCardContainer__submit">
          <Icon name="arrow-right" width="40px" height="40px" color="white" />
          {errorMessage && (
            <span className="loginCardContainer__message">{errorMessage}</span>
          )}
        </NavLink>
      </form>
    </>
  );
};

export default LoginCard;
