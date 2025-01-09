import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormHelperText,
  Button,
  Paper,
  Container,
  Typography,
  Divider
} from '@mui/material';
import PersonalInfo from './PersonalInfo';
import AccountDetails from './AccountDetails';
import ReviewInfo from './ReviewInfo';

const steps = ['Account Details', 'Personal Info', 'Review and Submit'];

const Form = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Handle the "Back" button
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Formik setup with validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      residence: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required').email('Invalid email format'),
      password: Yup.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required')
    }),
    onSubmit: (values) => {
        console.log("Values",values)
      if (activeStep === steps.length - 1) {
        console.log('Form Submitted', values);
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  });
  
  const formContent = (step) => {
    switch (step) {
      case 0:
        return <AccountDetails formik={formik} />;
      case 1:
        return <PersonalInfo formik={formik} />;
      case 2:
        return <ReviewInfo formik={formik} />;
      default:
        return <div>404: Not Found</div>;
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={4} sx={{ padding: 4, marginTop: 5, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Multi-Step Form
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ paddingY: 4 }}>
          {formContent(activeStep)}
        </Box>

        {formik.errors.submit && (
          <Box sx={{ marginBottom: 2 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}

        <Grid container spacing={2}>
          {/* Back Button */}
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
          </Grid>

          {/* Next / Submit Button */}
          <Grid item xs={6}>
            {activeStep === steps.length - 1 ? (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={formik.handleSubmit}
              >
                Submit
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {

                  console.log("Next clicked")
                    const isValid =formik.validateForm(); 
                    if (isValid) { 
                      setActiveStep((prevStep) => prevStep + 1); 
                    }
                  }}
              >
                Next
              </Button>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: 4 }} />
        <Typography variant="body2" align="center" sx={{ marginTop: 2, color: 'text.secondary' }}>
          Step {activeStep + 1} of {steps.length}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Form;
