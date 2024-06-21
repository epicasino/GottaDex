import Auth from '../../utils/auth';

function Navbar({
  setLoginBtn,
}: {
  setLoginBtn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <nav className="fixed top-0 h-[5vh] w-full flex justify-between items-center px-3 z-50 bg-zinc-900">
      <div className="flex flex-row gap-2 items-center">
        <img src="pokeball.svg" className="h-[1.5rem] w-auto invert"></img>
        <p className="navbar-hover-interact">GottaDex</p>
      </div>
      <div className="navbar-links flex gap-5">
        {Auth.loggedIn() ? (
          <button
            className="navbar-hover-interact"
            type="button"
            onClick={Auth.logout}
          >
            Logout
          </button>
        ) : (
          <button
            className="navbar-hover-interact"
            type="button"
            onClick={() => {
              setLoginBtn(true);
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
