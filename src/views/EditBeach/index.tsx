import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  styled,
} from "@mui/material";
import * as React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import { fetchSelectedBeach } from "../../store/slices/beaches";
import { useEffect } from "react";
import { BeachModel } from "../../interfaces";
import { Beach } from "../../models/beaches";
import { BEACH_FLAGS } from "../../utils/enums";
import Loading from "../../components/common/Loading";

const EditBeach: any = () => {
  const { beachId }: { beachId: any } = useParams();
  const { selectedBeach } = useAppSelector((state) => state.beaches);

  const { control, handleSubmit, register, formState } = useForm<BeachModel>();
  const { errors } = formState;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSelectedBeach(beachId));
  }, []);

  const updateBeach: SubmitHandler<BeachModel> = async (
    data: Record<string, unknown>
  ): Promise<void> => {
    console.log(data);
    if (selectedBeach) {
      await new Beach(selectedBeach).update(beachId, data);
      dispatch(fetchSelectedBeach(beachId));
    }
  };

  const WrapperDiv = styled("div")({
    border: "1px solid #c50000",
    borderRadius: "5px",
    margin: "10px 0 0 0",
    boxShadow: "0px 5px 11px 0px rgb(0 0 0 / 43%)",
    padding: "10px",
    background: "rgb(255 255 255 / 68%)",
  });

  if (selectedBeach) {
    return (
      <Box
        sx={{
          py: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* {error && (
          <Alert sx={{ mb: 2, width: "30%" }} severity="error">
            {error}
          </Alert>
        )} */}
        <Typography variant="h4">Edit {selectedBeach.name}</Typography>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <form onSubmit={handleSubmit(updateBeach)} className={styles.form}>
            <WrapperDiv>
              <Controller
                name="name"
                control={control}
                defaultValue={selectedBeach?.name}
                render={({ field }) => (
                  <TextField
                    sx={{ mt: 2, width: "100%" }}
                    type="text"
                    error={!!errors?.name}
                    helperText={!!errors?.name && "Field is Required"}
                    label="Beach Name"
                    {...field}
                    {...register("name", {
                      required: true,
                    })}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                defaultValue={selectedBeach?.description}
                render={({ field }) => (
                  <TextField
                    multiline
                    minRows={4}
                    sx={{ mt: 2, width: "100%" }}
                    type="text"
                    error={!!errors?.description}
                    helperText={!!errors?.description && "Field is Required"}
                    label="Description"
                    {...field}
                    {...register("description", {
                      required: true,
                    })}
                  />
                )}
              />
              <FormControl fullWidth variant="outlined" error={!!errors?.flag}>
                <InputLabel sx={{ top: "16px" }} htmlFor="flag_label">
                  Flag
                </InputLabel>
                <Controller
                  name="flag"
                  control={control}
                  defaultValue={selectedBeach?.flag}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <Box>
                      <Select
                        sx={{ width: "100%", mt: 2 }}
                        value={selectedBeach.flag}
                        onChange={onChange}
                        label="Flag"
                        labelId="flag_label"
                        type="select"
                      >
                        <MenuItem value={BEACH_FLAGS.GREEN}>
                          {BEACH_FLAGS.GREEN}
                        </MenuItem>
                        <MenuItem value={BEACH_FLAGS.YELLOW}>
                          {BEACH_FLAGS.YELLOW}
                        </MenuItem>
                        <MenuItem value={BEACH_FLAGS.RED}>
                          {BEACH_FLAGS.RED}
                        </MenuItem>
                      </Select>
                      <FormHelperText>
                        {!!errors?.flag && "Field is Required"}
                      </FormHelperText>
                    </Box>
                  )}
                />
              </FormControl>
            </WrapperDiv>
            <WrapperDiv>
              <Controller
                name="available"
                control={control}
                defaultValue={selectedBeach?.available}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "100%" }}
                    type="number"
                    error={!!errors?.available}
                    helperText={!!errors?.available && "Field is Required"}
                    label="Available"
                    {...field}
                    {...register("available", {
                      required: true,
                    })}
                  />
                )}
              />
              <Controller
                name="capacity"
                control={control}
                defaultValue={selectedBeach?.capacity}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "100%", mt: 2 }}
                    type="number"
                    error={!!errors?.capacity}
                    helperText={!!errors?.capacity && "Field is Required"}
                    label="Capacity"
                    {...field}
                    {...register("capacity", {
                      required: true,
                    })}
                  />
                )}
              />
            </WrapperDiv>
            <WrapperDiv>
              <Controller
                name="prices.seat"
                control={control}
                defaultValue={selectedBeach?.prices.seat}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "100%", mt: 2 }}
                    type="number"
                    error={!!errors?.prices?.seat}
                    helperText={!!errors?.prices?.seat && "Field is Required"}
                    label="Price per seat"
                    {...field}
                    {...register("prices.seat", {
                      required: true,
                    })}
                  />
                )}
              />
              <Controller
                name="prices.umbrella"
                control={control}
                defaultValue={selectedBeach?.prices.umbrella}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "100%", mt: 2 }}
                    type="number"
                    error={!!errors?.prices?.umbrella}
                    helperText={
                      !!errors?.prices?.umbrella && "Field is Required"
                    }
                    label="price per umbrella"
                    {...field}
                    {...register("prices.umbrella", {
                      required: true,
                    })}
                  />
                )}
              />
            </WrapperDiv>
            <WrapperDiv>
              <Controller
                name="coordinates.lat"
                control={control}
                defaultValue={selectedBeach?.coordinates.lat}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "100%", mt: 2 }}
                    type="number"
                    error={!!errors?.coordinates?.lat}
                    helperText={
                      !!errors?.coordinates?.lat && "Field is Required"
                    }
                    label="Latitude"
                    {...field}
                    {...register("coordinates.lat", {
                      required: true,
                    })}
                  />
                )}
              />
              <Controller
                name="coordinates.lng"
                control={control}
                defaultValue={selectedBeach?.coordinates.lng}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "100%", mt: 2 }}
                    type="number"
                    error={!!errors?.coordinates?.lng}
                    helperText={
                      !!errors?.coordinates?.lng && "Field is Required"
                    }
                    label="Longitude"
                    {...field}
                    {...register("coordinates.lng", {
                      required: true,
                    })}
                  />
                )}
              />
            </WrapperDiv>

            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
              Update Beach
            </Button>
          </form>
        </Box>
      </Box>
    );
  }

  return <Loading />;
};

export default EditBeach;
