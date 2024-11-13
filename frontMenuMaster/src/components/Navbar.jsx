import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useMyContext } from "../store/ContextApi";

const Navbar = () => {
  const [headerToggle, setHeaderToggle] = useState(false);
  const { token, setToken, setCurrentUser, isAdmin, setIsAdmin } = useMyContext();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("CSRF_TOKEN");
    localStorage.removeItem("IS_ADMIN");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <header className="h-headerHeight z-50 text-textColor bg-headerColor shadow-sm flex items-center sticky top-0 mb-5">
      <nav className="sm:px-10 px-4 flex w-full h-full items-center justify-between">
        <Link to="/">
          <h3 className="font-dancingScript text-logoText">MenuMaster</h3>
        </Link>
        <ul
          className={`lg:static absolute left-0 top-16 w-full lg:w-fit lg:px-0 sm:px-10 px-4 lg:bg-transparent bg-headerColor ${
            headerToggle ? "max-h-navbarHeight lg:py-0 py-4 shadow-md shadow-slate-700 lg:shadow-none" : "h-0 overflow-hidden"
          } lg:h-auto transition-all duration-100 font-montserrat text-textColor flex lg:flex-row flex-col lg:gap-15 gap-4`}
        >
          {token && (
            <>
              <Link to="/recipe">
                <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathname === "/recipe" ? "font-semibold border-b-2 border-white" : ""}`}>
                  Minhas Receitas
                </li>
              </Link>
              <Link to="/recipe/create">
                <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathname === "/recipe/create" ? "font-semibold border-b-2 border-white" : ""}`}>
                  Criar Receita
                </li>
              </Link>
              <Link to="/shopping-lists">
                <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathname === "/shopping-lists" ? "font-semibold border-b-2 border-white" : ""}`}>
                  Listas de Compras
                </li>
              </Link>
            </>
          )}
          {token ? (
            <>
              {isAdmin && (
                <Link to="/admin/users">
                  <li className={`py-2 cursor-pointer uppercase hover:text-slate-300 ${pathname.startsWith("/admin") ? "font-semibold border-b-2 border-white" : ""}`}>
                    Admin
                  </li>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-24 text-center bg-customRed font-semibold px-4 py-2 rounded-sm cursor-pointer hover:text-slate-300 d-flex justify-content-center align-items-center"
              >
                LogOut
              </button>
            </>
          ) : (
            <Link to="/signup">
              <li className="w-24 text-center bg-btnColor font-semibold px-4 py-2 rounded-sm cursor-pointer hover:text-slate-300">
                SignUp
              </li>
            </Link>
          )}
        </ul>
        <span
          onClick={() => setHeaderToggle(!headerToggle)}
          className="lg:hidden block cursor-pointer text-textColor shadow-md hover:text-slate-400"
        >
          {headerToggle ? <RxCross2 className="text-2xl" /> : <IoMenu className="text-2xl" />}
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
