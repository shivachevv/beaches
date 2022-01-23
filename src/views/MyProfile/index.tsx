import {
  Alert,
  Box,
  Button,
  Avatar,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import * as React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styles from "./index.module.scss";
import { setCurrentUser } from "../../store/slices/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { User } from "./../../models/users";
import { getUserLetters } from "../../utils/helpers";
interface ProfileInput {
  firstName: string;
  lastName: string;
  deposit: number;
}

const MyProfile: any = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  const { error } = useAppSelector((state) => state.auth);

  const { control, handleSubmit, register, formState } =
    useForm<ProfileInput>();
  const { errors } = formState;
  const dispatch = useAppDispatch();
  const updateUserProfile: SubmitHandler<ProfileInput> = (
    data: ProfileInput
  ) => {
    if (currentUser) {
      const updated = data.deposit
        ? { ...data, deposit: +currentUser.deposit + +data.deposit }
        : data;
      new User(currentUser).update(updated);
      dispatch(setCurrentUser());
    }
  };

  if (currentUser) {
    return (
      <Box
        sx={{
          pt: 2,
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
        {currentUser && (
          <Typography variant="h4">
            Welcome {`${currentUser?.firstName} ${currentUser?.lastName}`}
          </Typography>
        )}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {currentUser && (
            <Avatar sx={{ bgcolor: "orange", mr: 5, width: 100, height: 100 }}>
              {getUserLetters(currentUser)}
            </Avatar>
          )}
          <form
            onSubmit={handleSubmit(updateUserProfile)}
            className={styles.form}
          >
            <TextField
              sx={{ mt: 2 }}
              label="Email"
              type="text"
              disabled
              value={currentUser?.email}
            />
            <Controller
              name="firstName"
              control={control}
              defaultValue={currentUser?.firstName}
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
              defaultValue={currentUser?.lastName}
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

            <Controller
              name="deposit"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  sx={{ mt: 2 }}
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 1,
                    },
                  }}
                  error={!!errors?.deposit}
                  helperText={!!errors?.deposit && "Field is Required"}
                  label={`Deposit (Available: ${currentUser.deposit} lv.)`}
                  {...field}
                  {...register("deposit", {
                    required: true,
                  })}
                />
              )}
            />
            <TextField
              label="Role"
              sx={{ mt: 2 }}
              type="text"
              disabled
              value={currentUser?.role}
            />

            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
              Update My Profile
            </Button>
          </form>
        </Box>
      </Box>
    );
  }

  // TODO: Loading
  return "<Loading />";
};

export default MyProfile;
