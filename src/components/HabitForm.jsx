import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Box,
  Typography
} from "@mui/material";
import useHabbitStore from "../store/useStore";

const HabitForm = () => {
  const { addHabit, habbit } = useHabbitStore();
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("");

  console.log(habbit);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.length > 1) {
      addHabit(habitName, frequency);
    }

    setHabitName("");
    setFrequency("");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ padding: 2, height: "100vh" }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: { xs: "100%", sm: "80%", md: "50%" },
          maxWidth: 500,
          margin: "auto",
        }}
      >
           <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#3f51b5' }}>
        Habit Tracker
      </Typography>
        <TextField
          label="Habit Name"
          variant="outlined"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          fullWidth
          //   required
        />

        <FormControl fullWidth required>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            label="Frequency"
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={()=>addHabit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default HabitForm;
