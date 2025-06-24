import {useForm} from 'effector-forms';
import {useUnit} from 'effector-react';

import GoogleIcon from '~/pages/sign-in/assets/google.svg';

import {Profile} from '~/features/profile';

import {UserEntity} from '~/entities/types';

import {routes} from '~/shared/routes';
import {Attention, Input, Page} from '~/shared/ui';
import {Button} from '~/shared/ui/button';
import {Link} from '~/shared/ui/link';

import {$form, $formError, $loading, $provider} from './model';
import cls from './page.module.scss';

export const SignUpPage = () => {
  const {fields, submit, eachValid} = useForm($form);
  const [loading, formError] = useUnit([$loading, $formError]);

  const [provider] = useUnit([$provider]);

  return (
    <Page className="flex-1 py-16">
      <div className="w-full max-w-xs text-center space-y-3">
        <h1 className="text-5xl font-[Inter] font-bold mb-12">Sign up</h1>
        <form className={cls.list} onSubmit={() => submit()}>
          {provider === null && (
            <Input
              autoFocus={true}
              disabled={loading}
              placeholder="Email"
              type="email"
              name="email"
              value={fields.email?.value}
              onChange={(e) => fields.email?.onChange(e.target.value)}
            />
          )}
          <Input
            disabled={loading}
            placeholder="Username"
            value={fields.username?.value}
            onChange={(e) => fields.username?.onChange(e.target.value)}
          />
          <Input
            disabled={loading}
            placeholder="Display name"
            value={fields.display_name?.value}
            onChange={(e) => fields.display_name?.onChange(e.target.value)}
          />
          {provider === null && (
            <Input
              disabled={loading}
              placeholder="Password"
              type="password"
              name="password"
              value={fields.password?.value}
              onChange={(e) => fields.password?.onChange(e.target.value)}
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
            />
          )}
          <Profile
            className="text-start pointer-events-none"
            variant="md"
            user={
              new UserEntity({
                id: '',
                username: fields.username.value === '' ? 'username' : fields.username.value,
                displayName:
                  fields.display_name.value === '' ? 'Display name' : fields.display_name.value,
              })
            }
          />
          {formError && <Attention>{formError}</Attention>}
          <Button disabled={loading || !eachValid} type="submit">
            Join
          </Button>
        </form>
        <p className="text-muted-foreground">or</p>
        <div className={cls.list}>
          <Button variant="outline">
            <GoogleIcon />
            Sign up with Google
          </Button>
        </div>
        <Link to={routes.auth.signIn}>I already have an account</Link>
      </div>
    </Page>
  );
};
