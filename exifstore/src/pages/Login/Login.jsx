import { Button, IconButton, TextField } from "@mui/material";
import styles from "./Login.module.css";
import { useContext, useState } from "react";
import UndoIcon from "@mui/icons-material/Undo";
import { AuthContext } from "../../context/AuthContext";
import axiosCall from "../../utils/axiosCall";
import { useNavigate } from "react-router-dom";

function Login() {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { login } = useContext(AuthContext);
  const navigation = useNavigate();

  function handleRegister() {
    setRegister(!register);
    setUsername("");
    setEmail("");
    setPassword("");
  }

  function handleExifStoreClick() {
    navigation("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: email,
      username: username,
      password: password,
    };
    if (register) {
      const response = await axiosCall(
        "post",
        "http://localhost:7200/register",
        credentials,
        { "Content-Type": "application/json" }
      );

      if (response.error) {
        alert("There seems to be an error which says:\n " + response.error);
      } else
        login(response.data.token, response.data.email, credentials.username);
    } else {
      const response = await axiosCall(
        "post",
        "http://localhost:7200/login",
        credentials,
        {
          "Content-Type": "application/json",
        }
      );

      if (response.error)
        alert("There seems to be an error which says:\n " + response.error);
      else
        login(response.data.token, response.data.email, credentials.username);
    }
  }

  return (
    <div className={styles.loginBox}>
      <h1 className={styles.heroHeading1} onClick={handleExifStoreClick}>
        ExifStore{" "}
      </h1>
      <div className={styles.loginBoxWrapper}>
        <div className={styles.formBox}>
          <div className={styles.loginTextBox}>
            <h2>
              {register ? "Welcome to exifstore app" : `Don't have an account?`}
            </h2>

            {register ? (
              <h4>
                <br></br>Please fill out the info
              </h4>
            ) : (
              <Button
                onClick={handleRegister}
                sx={{
                  color: "aliceblue",
                  padding: "0",
                  paddingLeft: "0.1rem",
                  marginTop: "0.5rem",
                }}
                className={styles.registerText}
              >
                Register here!
              </Button>
            )}
          </div>
          <form
            action={register ? "register" : "login"}
            method="post"
            onSubmit={handleSubmit}
            className={styles.form}
          >
            {register && (
              <IconButton
                onClick={handleRegister}
                sx={{
                  position: "absolute",
                  top: "2%",
                  left: "2%",
                  transition: "all 0.1s ease-in ",
                  ":hover": { color: "white" },
                }}
                aria-label="delete"
              >
                <UndoIcon />
              </IconButton>
            )}
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="username"
              type="username"
              variant="outlined"
              slotProps={{
                input: {
                  sx: {
                    color: "whitesmoke",
                    margin: "0.5rem 0",
                  },
                },
                htmlInput: {
                  maxLength: 16,
                },
              }}
              sx={{
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "whitesmoke",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "whitesmoke" },
                  "&:hover fieldset": { borderColor: "whitesmoke" },
                  "&.Mui-focused fieldset": { borderColor: "whitesmoke" },
                },
                "& .MuiInputLabel-root": { color: "whitesmoke" },
              }}
            />
            {register && (
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="email"
                type="email"
                variant="outlined"
                slotProps={{
                  input: {
                    sx: {
                      color: "whitesmoke",
                      margin: "0.5rem 0",
                    },
                  },
                  htmlInput: {
                    maxLength: 100,
                  },
                }}
                sx={{
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "whitesmoke",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke" },
                    "&:hover fieldset": { borderColor: "whitesmoke" },
                    "&.Mui-focused fieldset": { borderColor: "whitesmoke" },
                  },
                  "& .MuiInputLabel-root": { color: "whitesmoke" },
                }}
              />
            )}

            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="password"
              type="password"
              variant="outlined"
              slotProps={{
                input: {
                  sx: {
                    color: "whitesmoke",
                    margin: "0.5rem 0",
                  },
                },
                htmlInput: {
                  maxLength: 50,
                },
              }}
              sx={{
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "whitesmoke",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "whitesmoke" },
                  "&:hover fieldset": { borderColor: "whitesmoke" },
                  "&.Mui-focused fieldset": { borderColor: "whitesmoke" },
                },
                "& .MuiInputLabel-root": { color: "whitesmoke" },
              }}
            />
            <button onClick={handleSubmit} className={styles.loginButton}>
              {register ? "Register" : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
