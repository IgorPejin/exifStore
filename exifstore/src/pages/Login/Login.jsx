import { Button, IconButton, TextField } from "@mui/material";
import styles from "./Login.module.css";
import { useState } from "react";
import UndoIcon from "@mui/icons-material/Undo";

function Login() {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleRegister() {
    setRegister(!register);
    setUsername("");
    setEmail("");
    setPassword("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password, email);
  }

  return (
    <div className={styles.loginBox}>
      <div className={styles.loginBoxWrapper}>
        <div className={styles.formBox}>
          <form onSubmit={handleSubmit} className={styles.form}>
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
            &nbsp;
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
            )}
            &nbsp;
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
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "whitesmoke",
                color: "#55b",
                marginTop: "2rem",
              }}
            >
              {register ? "Register" : "Log in"}
            </Button>
          </form>
        </div>
        <div className={styles.loginTextBox}>
          <h1>
            {register ? "Welcome to exifstore app" : `Don't have an account?`}
          </h1>

          {register ? (
            <h3>The place to store all your images</h3>
          ) : (
            <Button
              onClick={handleRegister}
              sx={{ color: "#222" }}
              className={styles.registerText}
            >
              Register here!
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
