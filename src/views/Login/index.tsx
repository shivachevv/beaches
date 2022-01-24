import { Alert, Box, Button, TextField } from "@mui/material";
import * as React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styles from "./index.module.scss";
import { login } from "../../store/slices/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LoginData } from "../../interfaces";
import { PAGE_TITLES } from "../../utils/enums";
import { setPageTitle } from "../../utils/helpers";
import { useEffect } from "react";
interface LoginInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setPageTitle(PAGE_TITLES.LOGIN);
  }, []);

  const { control, handleSubmit, register, formState } = useForm<LoginInput>();
  const { errors } = formState;
  const dispatch = useAppDispatch();
  const loginUser: SubmitHandler<LoginInput> = (data: LoginData) => {
    dispatch(login(data));
  };

  const getEmailErrorMessage = () => {
    if (errors?.email?.type === "required") {
      return "Email is required!";
    }
    return "";
  };

  return (
    <Box
      sx={{
        mt: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {error && (
        <Alert sx={{ mb: 2, width: "30%" }} severity="error">
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(loginUser)} className={styles.form}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              type="email"
              error={!!errors?.email}
              helperText={getEmailErrorMessage()}
              label="Email"
              {...field}
              {...register("email", {
                required: true,
              })}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              sx={{ mt: 2 }}
              type="password"
              error={!!errors?.password}
              helperText={!!errors?.password && "Password is Required"}
              label="Password"
              {...field}
              {...register("password", {
                required: true,
              })}
            />
          )}
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
