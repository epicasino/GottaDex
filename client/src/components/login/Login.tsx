import { useState } from 'react';
import Register from './Register';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

function LoginCard({
  setRegisterBtn,
}: {
  setRegisterBtn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser] = useMutation(LOGIN_USER);
  const [loginErr, setLoginErr] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginErr(false);
    if (username && password) {
      try {
        const { data } = await loginUser({ variables: { username, password } });

        if (!data) {
          throw `Error Logging In!`;
        }

        Auth.login(data.login.token);
      } catch (err) {
        setLoginErr(true);
        console.error(err);
      }
    }
    return;
  };

  return (
    <div className="bg-zinc-950 w-2/4 h-1/4 tinyFont rounded-md p-5 text-slate-50">
      <h2 className="text-4xl pb-4">LOGIN</h2>
      <form
        className="flex flex-col gap-2 justify-center"
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="username">Username</label>
        <input
          className="text-2xl px-2 rounded text-zinc-950"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
        />
        <label htmlFor="password">Password</label>
        <input
          className="text-2xl px-2 rounded text-zinc-950"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between gap-4">
          <button className="text-2xl login-register-button" type="submit">
            Login
          </button>
          <button
            className="text-xl login-register-button"
            type="button"
            onClick={() => {
              setRegisterBtn(true);
            }}
          >
            Need to Register?
          </button>
        </div>
      </form>
      {loginErr && <h5 className="text-lg">Wrong Password or Username!</h5>}
    </div>
  );
}

function Login({
  setLoginBtn,
}: {
  setLoginBtn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [registerBtn, setRegisterBtn] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.target === e.currentTarget && setLoginBtn(false);
      }}
      className="bg-zinc-950/75 absolute h-screen w-full flex justify-center items-center"
    >
      {!registerBtn ? (
        <LoginCard setRegisterBtn={setRegisterBtn} />
      ) : (
        <Register setRegisterBtn={setRegisterBtn} />
      )}
    </div>
  );
}

export default Login;
