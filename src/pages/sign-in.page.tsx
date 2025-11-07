import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/store.auth';
import { apiAuth } from '@/net/api';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/common/ui/Button';
import Input from '@/components/common/ui/Input';
import { ErrorText, Helper, Title, Wrap } from '@/styles/sign-in.page';
import { RegExps } from '@/utils/regexps';

const schema = z.object({
  email: z.string().min(1, 'required').regex(RegExps.email, 'invalid_email'),
  password: z.string().min(1, 'required').regex(RegExps.password, 'invalid_password'),
});
type FormValues = z.infer<typeof schema>;

const SignInPage = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/home';
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const { mutate } = useMutation({
    mutationFn: ({ email, password }: FormValues) => apiAuth.postAuthLogin(email, password),
    onSuccess: data => {
      setAuth({ token: data.token, user: data.user });
      navigate(redirect, { replace: true });
    },
    onError: () => {
      setError('password', { type: 'server', message: 'invalid_credentials' });
    },
  });

  const onSubmit = (values: FormValues) => mutate(values);

  const tErr = (key?: string) => (key ? t(`errors.${key}` as const, { defaultValue: key }) : undefined);

  const serverInvalid = errors.password?.message === 'invalid_credentials';

  return (
    <Wrap onSubmit={handleSubmit(onSubmit)} noValidate>
      <Title>{t('title')}</Title>
      <Helper>{t('helper')}</Helper>

      <Input placeholder={t('emailPlaceholder')} type="email" autoComplete="email" {...register('email')} />

      {errors.email && errors.email.message !== 'invalid_credentials' && (
        <ErrorText>{tErr(errors.email.message)}</ErrorText>
      )}

      <Input
        placeholder={t('passwordPlaceholder')}
        type="password"
        autoComplete="current-password"
        {...register('password')}
      />

      {errors.password && errors.password.message !== 'invalid_credentials' && (
        <ErrorText>{tErr(errors.password.message)}</ErrorText>
      )}

      {serverInvalid && <ErrorText>{t('errors.invalid_credentials')}</ErrorText>}

      <Button size="lg" variant="primary" type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? t('submitting') : t('login')}
      </Button>
    </Wrap>
  );
};

export default SignInPage;
