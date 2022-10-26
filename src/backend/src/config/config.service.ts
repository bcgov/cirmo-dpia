// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { KeycloakConnectOptions } from 'nest-keycloak-connect';
class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): DataSourceOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      database: this.getValue('POSTGRES_DB'),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      migrationsTableName: 'migrations',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: this.getValue('API_ENV') !== 'local', // auto run migrations on dev, test and prod

      synchronize: false,
    };
  }

  public getKeycloakConfig(): KeycloakConnectOptions {
    return {
      authServerUrl: this.getValue('KEYCLOAK_AUTH_SERVER_URI'),
      secret: this.getValue('KEYCLOAK_CLIENT_SECRET'),
      realm: this.getValue('KEYCLOAK_REALM'),
      resource: this.getValue('KEYCLOAK_RESOURCE'),
      'ssl-required': this.getValue('KEYCLOAK_SSL_REQUIRED'),
      'confidential-port': this.getValue('KEYCLOAK_CONFIDENTIAL_PORT'),
      credentials: { secret: this.getValue('KEYCLOAK_CLIENT_SECRET') },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
  'KEYCLOAK_CONFIDENTIAL_PORT',
  'KEYCLOAK_AUTH_SERVER_URI',
  'KEYCLOAK_REALM',
  'KEYCLOAK_SSL_REQUIRED',
  'KEYCLOAK_RESOURCE',
  'KEYCLOAK_CLIENT_SECRET',
  'KEYCLOAK_CLIENT_ID',
  'KEYCLOAK_REDIRECT_URI',
  'KEYCLOAK_RESPONSE_TYPE',
  'KEYCLOAK_SCOPE',
  'KEYCLOAK_TOKEN_URI',
  'KEYCLOAK_LOGOUT_URI',
]);

export { configService };
