import {useForm} from 'effector-forms';
import {useUnit} from 'effector-react/effector-react.mjs';

import {ProfilePreview} from '~/widgets/profile-preview';

import {Button, Container, ContainerSize, Form, Input, Page, Text, TextSize} from '~/shared/ui';

import {$form, avatarFileChanged} from './model';
import cls from './page.module.scss';

export const ProfilePage = () => {
  const {fields, eachValid, submit} = useForm($form);
  const onAvatarFileChanged = useUnit(avatarFileChanged);

  return (
    <Page>
      <Container size={ContainerSize.M}>
        <Text center={true} size={TextSize.XL} className={cls.title} Component="h1">
          Profile
        </Text>

        <Form className={cls.grid} onSubmit={submit}>
          <Input
            top="Display name"
            placeholder="Display name"
            value={fields.displayName?.value}
            onChange={(e) => fields.displayName?.onChange(e.target.value)}
            isInvalid={fields.displayName?.hasError()}
            errorMessage={fields.displayName?.errorText()}
          />
          <Input
            top="Username"
            placeholder="Username"
            value={fields.username?.value}
            onChange={(e) => fields.username?.onChange(e.target.value)}
            isInvalid={fields.username?.hasError()}
            errorMessage={fields.username?.errorText()}
          />

          <Input
            top="Current password"
            placeholder="Current password"
            value={fields.password?.value}
            onChange={(e) => fields.password?.onChange(e.target.value)}
            isInvalid={fields.password?.hasError()}
            errorMessage={fields.password?.errorText()}
            type="password"
            name="password"
          />
          <Input
            top="New password"
            placeholder="New password"
            value={fields.newPassword?.value}
            onChange={(e) => fields.newPassword?.onChange(e.target.value)}
            isInvalid={fields.newPassword?.hasError()}
            errorMessage={fields.newPassword?.errorText()}
            type="password"
            name="new_password"
          />

          <Input
            top="Avatar URL"
            placeholder="Avatar URL"
            readOnly={true}
            value={fields.avatarUrl?.value}
            isInvalid={fields.avatarUrl?.hasError()}
            errorMessage={fields.avatarUrl?.errorText()}
            type="file"
            accept="image/png, image/jpeg"
            name="avatar_url"
            onFileChanged={(data) => onAvatarFileChanged(data)}
          />
          <div className={cls.row}>
            <ProfilePreview
              username={fields.username?.value}
              displayName={fields.displayName?.value}
              avatarUrl={fields.avatarUrl?.value}
              style={{maxWidth: 165}}
            />

            <Button type="submit" disabled={!eachValid} style={{whiteSpace: 'nowrap'}}>
              Apply changes
            </Button>
          </div>
        </Form>
      </Container>
    </Page>
  );
};
