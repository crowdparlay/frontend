import * as typed from 'typed-contracts';
import {hash} from '~/lib/utils';

import {apiV1DiscussionsDiscussionIdGetOk} from '~/shared/api/client';

export interface JwtPayload {
  sub: string;
}

export class UserEntity {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;

  constructor(params: {id: string; username: string; displayName: string; avatarUrl?: string}) {
    this.id = params.id;
    this.username = params.username;
    this.displayName = params.displayName;
    this.avatarUrl = params.avatarUrl;
  }

  static fromResponse(
    response: typed.Get<typeof apiV1DiscussionsDiscussionIdGetOk>['author'],
  ): UserEntity | undefined {
    return response
      ? new UserEntity({
          id: response.id,
          username: response.username,
          displayName: response.display_name,
          avatarUrl: response.avatar_url ?? undefined,
        })
      : undefined;
  }

  getPersonalStyle() {
    const hue = hash(this.displayName + ' ' + this.username);
    const color = `hsl(${hue}deg 90% 40%)`;
    return {hue, color};
  }
}
