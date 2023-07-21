import {useForm} from 'effector-forms';
import {useUnit} from 'effector-react';

import {routes} from '~/shared/routes';
import {
  Button,
  Container,
  ContainerSize,
  Form,
  Input,
  Link,
  Page,
  Text,
  TextSize,
} from '~/shared/ui';

import {$form, $loading} from './model';
import cls from './page.module.scss';

export const SignInPage = () => {
  const {fields, submit, eachValid} = useForm($form);
  const loading = useUnit($loading);

  return (
    <Page>
      <Container size={ContainerSize.S} className={cls.container}>
        <Text center={true} size={TextSize.XL} className={cls.title} Component="h1">
          Sign In
        </Text>

        <Form onSubmit={submit} className={cls.list}>
          <Input
            autoFocus={true}
            disabled={loading}
            placeholder="Username or email"
            name="username_or_email"
            value={fields.username?.value}
            onChange={(e) => fields.username?.onChange(e.target.value)}
            isInvalid={fields.username?.hasError()}
            errorMessage={fields.username?.errorText()}
          />
          <Input
            disabled={loading}
            placeholder="Password"
            type="password"
            name="password"
            value={fields.password?.value}
            onChange={(e) => fields.password?.onChange(e.target.value)}
            isInvalid={fields.password?.hasError()}
            errorMessage={fields.password?.errorText()}
          />

          <Button disabled={loading || !eachValid} type="submit" center={true}>
            Sign in
          </Button>
        </Form>

        <div className={cls.list}>
          <Link center={true} to={routes.auth.resetPassword}>
            Reset password
          </Link>
          <Link center={true} to={routes.auth.signUp}>
            Sign up
          </Link>
        </div>
      </Container>
    </Page>
  );
};
