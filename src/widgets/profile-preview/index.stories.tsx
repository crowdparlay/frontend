import {Meta, StoryObj} from '@storybook/react';

import {ProfilePreview} from '.';

const meta: Meta<typeof ProfilePreview> = {
  title: 'widgets/ProfilePreview',
  component: ProfilePreview,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProfilePreview>;

export const SignUp: Story = {
  args: {},
};

export const User: Story = {
  args: {
    username: 'mere1y',
    displayName: 'devyoursite',
    avatarUrl:
      'https://cdn4.telegram-cdn.org/file/MZ89aopnxyFxM2m6QP96m68D_W9ETr0t6U08FMLpqYVxwNWLQOxhp7UeKPWxMgGs089yKYECrUgDKKCWxJer8bnD9POUM1CcrkR-gZUlnsiNTlEIyFcXlguKDHd_MRisbWCrljJ99BhxK1YYNw2OLAfAIIDEiUNGaP0Z8KU9obtuSnynTGFZAkBr_WR0loiqPcPO3CAadtv7udDpybuL2x9ppl0aAWDASdLF_G-NJGxWpjopnyR1YoxDJGykKRLhhhMkmemLgE4kl1K2gGX3PQMwxM0VuK0IVKXP-XyJWuaXXHvNxzkrfQjSeVyxkvr7wYFzkAPhB2YnjN5OXUBwEg.jpg',
  },
};

export const WithDate: Story = {
  args: {
    username: 'xIMRANx',
    displayName: 'Imran Akhmedov',
    avatarUrl:
      'https://cdn4.telegram-cdn.org/file/UZGzmRvd_-U7wp_-AYysaViEBDzJTNtzzdsXTrJ5AUuIKyK3UMqVfbQGL6iwQQB8AcHjMxDerXsNah5VIYAIzy-TpzK4G9RqVbjjfokQbyL_B7uf0Jo-vSVMURCkuQXm3ctbgo4Cw7klhkt2qFZEpymmgxZ6_4Q2IelQOF5bugNA96Z2jHiRY3D7XM9vO3pIn2ndTC2E7Xi5XqEd_I8LoxJh-vkATCL9Qj5J-JwSJNcbZ2A8O3e6yrFSjmMv86bvUF4L2Ni0eXpxhsRn771ftXpwAUvFFD1ZFq8yawMbvOIv5QdmYrQvL78OCRuClvqW0_FV7Rw5i9X1wCGu8AiF4g.jpg',
    date: new Date(),
    showDate: true,
  },
};

export const Verified: Story = {
  args: {
    username: 'crowdparlay',
    displayName: 'Crowd Parlay',
    avatarUrl:
      'https://gitlab.otter.su/uploads/-/system/group/avatar/6/crowdparlay_fill.png?width=64',
    verified: true,
  },
};
