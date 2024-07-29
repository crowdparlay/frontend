import {Link} from 'atomic-router-react';
import {useUnit} from 'effector-react';

import {routes} from '~/shared/routes';
import {Avatar, Container, Page, Text, TextSize} from '~/shared/ui';
import {Card, CardSize} from '~/shared/ui/card';

import {$discussions} from './model';

export const ExplorePage = () => {
  const [discussions] = useUnit([$discussions]);

  return (
    <Page>
      <Container>
        {discussions.map((d) => (
          <Card size={CardSize.L}>
            <div
              style={{
                display: 'flex',
                gap: '10px',
              }}
            >
              {d.author !== null && (
                <Avatar
                  username={d.author!.username}
                  displayName={d.author!.display_name}
                  avatarUrl={d.author!.avatar_url ?? undefined}
                />
              )}
              <Text size={TextSize.XL}>{d.title!}</Text>
            </div>
            <Text size={TextSize.M} style={{marginTop: 20}}>
              {d.description!}
            </Text>

            <Link to={routes.discussion} params={{discussionId: d.id}}>
              <Text
                size={TextSize.L}
                style={{
                  marginTop: 20,
                  textDecoration: 'underline',
                }}
              >
                Читать
              </Text>
            </Link>
          </Card>
        ))}
      </Container>
    </Page>
  );
};
