import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === "register" ? "register" : "login";
    const { data } = await axios.post(url, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <div className="bg-gray-900 h-screen  flex flex-col items-center font-mono justify-center">
        <div className= "pb-1 text-gray-400 text-3xl font-bold 	">
          EasyChat
        </div>
        <div className="text-gray-400 pb-4 text-sm font-semibold">Where conversations come to life, effortlessly.</div>
        <form className="w-96 mx-auto mb-12 " onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            type="text"
            placeholder="username"
            className="block w-full text-center rounded-md p-2 mb-2 border border-gray-700 bg-gray-700 text-gray-300"
          />
          <input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
            placeholder="password"
            className="block w-full text-center rounded-md p-2 mb-3 border border-gray-700 bg-gray-700 text-gray-300"
          />
          <button className="bg-blue-500 text-gray-100 hover:bg-blue-600 block w-full rounded-md p-2">
            {isLoginOrRegister === "register" ? "Register" : "Login"}
          </button>
          <div className="text-center mt-2 font-bold text-gray-400 ">
            {isLoginOrRegister === "register" && (
              <div>
                Already a member?
                <button
                  className="ml-1 hover:text-gray-100"
                  onClick={() => setIsLoginOrRegister("login")}
                >
                  Login here
                </button>
              </div>
            )}
            {isLoginOrRegister === "login" && (
              <div>
                Don&apos;t have an account?
                <button
                  className="ml-1 hover:text-gray-100"
                  onClick={() => setIsLoginOrRegister("register")}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </form>
    </div>
    
  );
}
