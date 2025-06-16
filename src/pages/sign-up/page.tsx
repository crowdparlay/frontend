import {useForm} from 'effector-forms';
import {useUnit} from 'effector-react';

import {Profile} from '~/features/profile';

import {routes} from '~/shared/routes';
import {
  Attention,
  Container,
  ContainerSize,
  CustomButton,
  Form,
  Input,
  Link,
  Page,
  Text,
  TextSize,
} from '~/shared/ui';

import {$form, $formError, $loading, $provider} from './model';
import cls from './page.module.scss';

export const SignUpPage = () => {
  const {fields, submit, eachValid} = useForm($form);
  const [loading, formError] = useUnit([$loading, $formError]);

  const [provider] = useUnit([$provider]);

  return (
    <Page>
      <Container size={ContainerSize.S} className={cls.container}>
        <Text center={true} size={TextSize.XL} className={cls.title} Component="h1">
          Sign up
        </Text>

        <Form onSubmit={submit} className={cls.list}>
          {provider === null && (
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
          )}

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
            value={fields.display_name?.value}
            onChange={(e) => fields.display_name?.onChange(e.target.value)}
            isInvalid={fields.display_name?.hasError()}
            errorMessage={fields.display_name?.errorText()}
          />

          {provider === null && (
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
          )}
          {provider === null && (
            <Input
              disabled={loading}
              placeholder="Confirm password"
              type="password"
              name="confirm_password"
              value={fields.confirm_password?.value}
              onChange={(e) => fields.confirm_password?.onChange(e.target.value)}
              isInvalid={fields.confirm_password?.hasError()}
              errorMessage={fields.confirm_password?.errorText()}
            />
          )}

          <Profile
            variant="md"
            user={{
              username: fields.username?.value,
              displayName: fields.display_name?.value,
            }}
          />

          {formError && <Attention>{formError}</Attention>}

          <CustomButton disabled={loading || !eachValid} type="submit" center={true}>
            Join
          </CustomButton>
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
