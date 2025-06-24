import {useForm} from 'effector-forms';

import {Profile} from '~/features/profile';

import {UserEntity} from '~/entities/types';

import {Container, ContainerSize, CustomButton, Input, Page, Text, TextSize} from '~/shared/ui';

import {$form} from './model';
import cls from './page.module.scss';

export const EditProfilePage = () => {
  const {fields, eachValid, submit} = useForm($form);
  return (
    <Page>
      <Container size={ContainerSize.M}>
        <Text center={true} size={TextSize.XL} className={cls.title} Component="h1">
          Profile
        </Text>

        <form className={cls.grid} onSubmit={() => submit()}>
          <Input
            placeholder="Display name"
            value={fields.displayName?.value}
            onChange={(e) => fields.displayName?.onChange(e.target.value)}
          />
          <Input
            placeholder="Username"
            value={fields.username?.value}
            onChange={(e) => fields.username?.onChange(e.target.value)}
          />

          <Input
            placeholder="Current password"
            value={fields.password?.value}
            onChange={(e) => fields.password?.onChange(e.target.value)}
            type="password"
            name="password"
          />
          <Input
            placeholder="New password"
            value={fields.newPassword?.value}
            onChange={(e) => fields.newPassword?.onChange(e.target.value)}
            type="password"
            name="new_password"
          />

          <Input
            placeholder="Avatar URL"
            readOnly={true}
            value={fields.avatarUrl?.value}
            type="file"
            accept="image/png, image/jpeg"
            name="avatar_url"
          />
          <div className={cls.row}>
            <Profile
              variant="md"
              user={
                new UserEntity({
                  id: '',
                  username: fields.username.value,
                  displayName: fields.displayName.value,
                  avatarUrl: fields.avatarUrl.value,
                })
              }
            />

            <CustomButton type="submit" disabled={!eachValid} style={{whiteSpace: 'nowrap'}}>
              Apply changes
            </CustomButton>
          </div>
        </form>
      </Container>
    </Page>
  );
};
