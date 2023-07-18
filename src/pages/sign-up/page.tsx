import {useForm} from 'effector-forms';
import {useUnit} from 'effector-react';

import {ProfilePreview} from '~/widgets/profile-preview';

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

export const SignUpPage = () => {
  const {fields, submit, eachValid} = useForm($form);
  const loading = useUnit($loading);

  return (
    <Page>
      <Container size={ContainerSize.S} className={cls.container}>
        <Text center={true} size={TextSize.XL} className={cls.title} Component="h1">
          Sign Up
        </Text>

        <Form onSubmit={submit} className={cls.list}>
          <Input
            autoFocus={true}
            disabled={loading}
            placeholder="Email"
            type="email"
            name="email"
            value={fields.email?.value}
            onChange={(e) => fields.email?.onChange(e.target.value)}
            isInvalid={fields.email?.hasError()}
            errorMessage={fields.email?.errorText()}
          />
          <Input
            disabled={loading}
            placeholder="Username"
            value={fields.username?.value}
            onChange={(e) => fields.username?.onChange(e.target.value)}
            isInvalid={fields.username?.hasError()}
            errorMessage={fields.username?.errorText()}
          />
          <Input
            disabled={loading}
            placeholder="Display name"
            value={fields.displayName?.value}
            onChange={(e) => fields.displayName?.onChange(e.target.value)}
            isInvalid={fields.displayName?.hasError()}
            errorMessage={fields.displayName?.errorText()}
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
          <Input
            disabled={loading}
            placeholder="Confirm password"
            type="password"
            name="confirm_password"
            value={fields.confirm?.value}
            onChange={(e) => fields.confirm?.onChange(e.target.value)}
            isInvalid={fields.confirm?.hasError()}
            errorMessage={fields.confirm?.errorText()}
          />

          <ProfilePreview
            username={fields.username?.value}
            displayName={fields.displayName?.value}
          />

          <Button disabled={loading || !eachValid} type="submit" center={true}>
            Join
          </Button>
        </Form>

        <div className={cls.list}>
          <Link center={true} to={routes.auth.signIn}>
            I already have an account
          </Link>
        </div>
      </Container>
    </Page>
  );
};
