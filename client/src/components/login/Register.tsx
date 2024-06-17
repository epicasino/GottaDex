import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

function Register({
  setRegisterBtn,
}: {
  setRegisterBtn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser] = useMutation(REGISTER_USER);
  const [registerErr, setRegisterErr] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterErr(false);
    if (username && password) {
      try {
        const { data } = await registerUser({
          variables: { username, password },
        });

        if (!data) {
          throw `Error Logging In!`;
        }

        Auth.login(data.register.token);
      } catch (err) {
        setRegisterErr(true);
        console.error(err);
      }
    }
    return;
  };

  return (
    <div className="bg-zinc-950 w-2/4 h-1/4 tinyFont rounded-md p-5 text-slate-50">
      <h2 className="text-4xl pb-4">REGISTER</h2>
      <form
        className="flex flex-col gap-2 justify-center"
        onSubmit={handleRegisterSubmit}
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
            Register
          </button>
          <button
            className="text-xl login-register-button"
            type="button"
            onClick={() => {
              setRegisterBtn(false);
            }}
          >
            Need to Login?
          </button>
        </div>
      </form>
      {registerErr && <h5 className="text-lg">Username Already Taken!</h5>}
    </div>
  );
}

export default Register;
