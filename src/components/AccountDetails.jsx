import {
  Box,
  TextField,
  FormHelperText
} from "@mui/material";

const AccountDetails = (props) => {
  const { formik } = props;
  return (
    <Box
      container
      spacing={2}
    >
      <Box
        item
        xs={12}
      >
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          size="small"
          error={Boolean(formik.touched.email && formik.errors.email)}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Box>
      <Box
        item
        xs={12}
        mt={3}
      >
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          size='small'
          type="password"
          fullWidth
          error={Boolean(formik.touched.password && formik.errors.password)}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </Box>
      <Box
        item
        xs={12}
        mt={3}
      >
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          size="small"
          type="password"
          fullWidth
          error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
      </Box>
      {formik.errors.submit && (
        <Box
          item
          xs={12}
        >
          <FormHelperText error>
            {formik.errors.submit}
          </FormHelperText>
        </Box>
      )}
    </Box>
  )
}

export default AccountDetails