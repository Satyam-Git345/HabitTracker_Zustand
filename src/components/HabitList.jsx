import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Paper,
  Box,
  IconButton,
  LinearProgress,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import useHabbitStore from "../store/useStore";
import moment from "moment";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

function HabitList() {
  const [progress, setProgress] = useState(100);
  const { habbit, toggleHabbit, removeHabit } = useHabbitStore();
  const today = moment().format("DD/MM/YYYY");

  const localhabits = JSON.parse(localStorage.getItem("habits-local"));

  console.log("localhabits", localhabits.state.habbit);

  console.log(today);
  const handleMarkAsCompleted = (id) => {
    toggleHabbit(id, today);
  };

  const handleRemove = (id) => {
    console.log("id", id);
    removeHabit(id);
  };

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setProgress((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box sx={{ padding: 1 }}>
      <List>
        {habbit.map((habit) => (
          <ListItem
            key={habit.id}
            divider
            sx={{
              marginBottom: 2,
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "white",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.02)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <ListItemButton>
              <Paper
                sx={{
                  width: "100%",
                  padding: 2,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative", 
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#212121" }}
                    >
                      {habit.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        Frequency: {habit.frequency}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        Created At: {new Date(habit.createdAt).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        Completed Dates:{" "}
                        {habit.completedDates.length > 0
                          ? habit.completedDates.join(",")
                          : "No dates yet"}
                      </Typography>
                    </>
                  }
                />

                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Typography
                    sx={{ color: "#555", fontWeight: "bold", fontSize: "16px" }}
                  >
                    Current Streak:
                  </Typography>
                  <LinearProgress
                    sx={{
                      marginTop: 1,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#e0e0e0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#3f51b5",
                      },
                    }}
                    variant="determinate"
                    value={progress}
                  />
                </Box>

                <Box sx={{ position: "absolute", top: 8, right: 8 }}>
  
                  <IconButton
                    onClick={() => handleMarkAsCompleted(habit.id)}
                    sx={{ marginRight: 1 }}
                    color="success"
                  >
                    {habit?.completedDates?.includes(today) ? (
                      <CheckCircleIcon />
                    ) : (
                      <DoNotDisturbIcon />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => handleRemove(habit.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default HabitList;
