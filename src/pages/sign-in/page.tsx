import {useForm} from 'effector-forms';
import {useUnit} from 'effector-react';

import {routes} from '~/shared/routes';
import {Attention, Input, Page} from '~/shared/ui';
import {Button} from '~/shared/ui/button';
import {Link} from '~/shared/ui/link';

import GoogleIcon from './assets/google.svg';
import {$form, $formError, $loading, signInWithGoogleClicked} from './model';
import cls from './page.module.scss';

export const SignInPage = () => {
  const {fields, submit, eachValid} = useForm($form);
  const [loading, formError] = useUnit([$loading, $formError]);
  const [onSignInWithGoogleClicked] = useUnit([signInWithGoogleClicked]);

  return (
    <Page className="flex-1 py-16">
      <div className="w-full max-w-xs text-center space-y-3">
        <h1 className="text-5xl font-[Inter] font-bold mb-12">Sign in</h1>
        <form className={cls.list} onSubmit={() => submit()}>
          <Input
            autoFocus={true}
            disabled={loading}
            placeholder="Username or email"
            name="username_or_email"
            value={fields.username?.value}
            onChange={(e) => fields.username?.onChange(e.target.value)}
          />
          <Input
            disabled={loading}
            placeholder="Password"
            type="password"
            name="password"
            value={fields.password?.value}
            onChange={(e) => fields.password?.onChange(e.target.value)}
          />
          {formError && <Attention>{formError}</Attention>}
          <Button disabled={loading || !eachValid} type="submit">
            Proceed
          </Button>
        </form>
        <p className="text-muted-foreground">or</p>
        <div className={cls.list}>
          <Button onClick={onSignInWithGoogleClicked} variant="outline">
            <GoogleIcon />
            Sign in with Google
          </Button>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Link to={routes.auth.resetPassword}>Reset password</Link>
          <Link to={routes.auth.signUp}>Sign up</Link>
        </div>
      </div>
    </Page>
  );
};
