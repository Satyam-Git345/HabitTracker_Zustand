import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Paper,
    Box
  } from '@mui/material';
  
  const ReviewInfo = ({ formik }) => {
    const { values } = formik;
  
    return (
      <Paper
        sx={{
          padding: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        {/* Account Details Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Account Details
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Email"
                secondary={values.email}
                sx={{ marginBottom: 1 }}
              />
            </ListItem>
          </List>
          <Divider />
        </Box>
  
        {/* Personal Information Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Personal Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="First Name"
                secondary={values.firstName}
                sx={{ marginBottom: 1 }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Last Name"
                secondary={values.lastName}
                sx={{ marginBottom: 1 }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Phone Number"
                secondary={values.phone}
                sx={{ marginBottom: 1 }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Residence"
                secondary={values.residence}
                sx={{ marginBottom: 1 }}
              />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Paper>
    );
  };
  
  export default ReviewInfo;
  