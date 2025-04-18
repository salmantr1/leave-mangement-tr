class EnvConfig {
  private readonly envConfig: { [key: string]: string };

  get JWT_SECRET(): string {
    return 'jwt-secret-leave-mangement-system';
  }

  get JWT_TOKEN_EXPIRATION_IN_HOURS(): number {
    return 2;
  }

  get JWT_REFRESH_TOKEN_SECRET(): string {
    return 'jwt-secret-leave-mangement-system';
  }

  get JWT_REFRESH_TOKEN_EXPIRATION_IN_HOURS(): number {
    return 24;
  }
}

export const ENV = new EnvConfig();
