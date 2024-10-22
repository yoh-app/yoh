import * as Yup from 'yup';
// import { useState } from 'react';
import { useSnackbar } from 'notistack';
// import { Link as RouterLink } from 'react-router-dom';
// import NextLink from 'next/link';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
// import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
// import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  // Link,
  Stack,
  Alert,
  // Checkbox,
  TextField,
  // IconButton,
  // InputAdornment,
  // FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@material-ui/lab';
// routes
// import { PATH_AUTH } from '../../../routes/paths';
// hooks
import { useAuth } from 'server/magic/components/AuthProvider';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
// import { useRouter } from 'next/router';
// ----------------------------------------------------------------------
type InitialValues = {
  email: string;
  // password: string;
  // remember: boolean;
  // afterSubmit?: string;
};
export default function LoginForm() {
  const { actions } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const [showPassword, setShowPassword] = useState(false);
  // const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    // password: Yup.string().required('Password is required'),
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      // password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await actions.login(values.email);
        enqueueSnackbar('Email Sent', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  // const handleShowPassword = () => {
  //   setShowPassword((show) => !show);
  // };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ my: 2 }}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          {/* <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          /> */}
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />
          <NextLink href={PATH_AUTH.resetPassword}>
            <Link variant="subtitle2">Forgot password?</Link>
          </NextLink>
        </Stack> */}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
