import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: '1@kamg',
}));
