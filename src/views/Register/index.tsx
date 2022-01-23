import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styles from "./index.module.scss";
import { register as registerUser } from "../../store/slices/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RegisterData } from "../../interfaces";
import { DATABASE_MODELS } from "../../utils/enums";
import { db } from "../../firebase";
import { ROLES } from "./../../utils/constants";

interface RegisterInput {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  deposit: number;
}

const Register: React.FC = () => {
  const { error } = useAppSelector((state) => state.auth);

  const { control, handleSubmit, register, formState } =
    useForm<RegisterInput>();
  const { errors } = formState;
  const dispatch = useAppDispatch();
  const registerUserHandler: SubmitHandler<RegisterInput> = (
    data: RegisterData
  ) => {
    dispatch(registerUser(data));
  };

  const emailIsUnique = async (email: string): Promise<boolean> => {
    const querySnapshot = await db
      .collection(DATABASE_MODELS.USERS)
      .where("email", "==", email)
      .get();
    const [user] = querySnapshot.docs.map((doc) => doc.data());

    return !user;
  };

  const getEmailErrorMessage = () => {
    if (errors?.email?.type === "required") {
      return "Email is required!";
    }
    if (errors?.email?.type === "validate") {
      return "Email is taken!";
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
      <form
        onSubmit={handleSubmit(registerUserHandler)}
        className={styles.form}
      >
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
                validate: emailIsUnique,
              })}
            />
          )}
        />
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              sx={{ mt: 2 }}
              type="text"
              error={!!errors?.firstName}
              helperText={!!errors?.firstName && "Field is Required"}
              label="First Name"
              {...field}
              {...register("firstName", {
                required: true,
              })}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              sx={{ mt: 2 }}
              type="text"
              error={!!errors?.lastName}
              helperText={!!errors?.lastName && "Field is Required"}
              label="Last Name"
              {...field}
              {...register("lastName", {
                required: true,
              })}
            />
          )}
        />
        <FormControl fullWidth variant="outlined" error={!!errors?.role}>
          <InputLabel sx={{ top: "16px" }} htmlFor="role_label">
            Role
          </InputLabel>
          <Controller
            name="role"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Box>
                <Select
                  sx={{ width: "100%", mt: 2 }}
                  value={value}
                  onChange={onChange}
                  label="Role"
                  labelId="role_label"
                  type="select"
                >
                  {ROLES.map((role) => (
                    <MenuItem value={role} key={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {!!errors?.role && "Field is Required"}
                </FormHelperText>
              </Box>
            )}
            defaultValue=""
          />
        </FormControl>

        <Controller
          name="deposit"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              sx={{ mt: 2 }}
              type="number"
              error={!!errors?.deposit}
              helperText={!!errors?.deposit && "Field is Required"}
              label="Deposit"
              {...field}
              {...register("deposit", {
                required: true,
              })}
            />
          )}
        />

        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
