import { ConfigServiceClass } from 'src/config/config.service';

/**
 * @Description
 * This file tests the contents of common/config/config.service.ts
 * It validates all the methods associated to the class
 */
describe('ConfigServiceClass', () => {
  /**
   * @method getValue
   *
   * @description
   * This test suite validates that the method returns the expected env value
   */
  describe('`getValue` method', () => {
    const mockEnv = {
      test_key_1: 'test_value_1',
      test_key_2: 'test_value_2',
    };

    const configServiceMock = new ConfigServiceClass(mockEnv);

    // Scenario 1: Test succeeds if the key is available
    it('succeeds if the key is available', () => {
      const result = configServiceMock.getValue('test_key_1');
      expect(result).toBe('test_value_1');
    });

    // Scenario 2: Test succeeds if the key is unavailable, but throwOnMissing is false
    it('succeeds if the key is unavailable, but throwOnMissing is false', () => {
      const result = configServiceMock.getValue('random_key', false);
      expect(result).toBe(undefined);
    });

    // Scenario 3: Test fails if the key is unavailable, but throwOnMissing is true
    it('fails if the key is unavailable, but throwOnMissing is true', () => {
      try {
        configServiceMock.getValue('random_key');
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  /**
   * @method ensureValues
   *
   * @description
   * This test suite validates that all the specified keys are available in the env
   */
  describe('`ensureValues` method', () => {
    const mockEnv = {
      test_key_1: 'test_value_1',
      test_key_2: 'test_value_2',
    };

    const configServiceMock = new ConfigServiceClass(mockEnv);

    // Scenario 1: Test succeeds if all keys are present
    it('succeeds if all keys are present', () => {
      const result = configServiceMock.ensureValues([
        'test_key_1',
        'test_key_2',
      ]);

      expect(result).toBe(configServiceMock);
    });

    // Scenario 2: Test fails if any ket is missing
    it('fails if any ket is missing', () => {
      try {
        configServiceMock.ensureValues([
          'test_key_1',
          'test_key_2',
          'random_key',
        ]);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  /**
   * @method getTypeOrmConfig
   *
   * @description
   * This test suite validates that the config is returned and no error is thrown
   */
  describe('`getTypeOrmConfig` method', () => {
    // Scenario 1: The test succeeds when one of the keys are available in the config
    it('succeeds when one of the keys are available in the config', () => {
      const mockEnv = {
        API_ENV: 'local',
        POSTGRES_HOST: 'test_host',
        POSTGRES_PORT: '5432',
        POSTGRES_DB: 'test_value',
        POSTGRES_USER: 'test_value',
        POSTGRES_PASSWORD: 'test_value',
      };

      const configServiceMock = new ConfigServiceClass(mockEnv);

      expect(configServiceMock.getTypeOrmConfig()).toBeInstanceOf(Object);
    });

    // Scenario 2: The test fails when one of the keys are not available
    it('fails when one of the keys are not available', () => {
      const mockEnv = {
        // POSTGRES_HOST: 'test_host', --> Removing explicitly for getTypeOrmConfig method to fail
        POSTGRES_PORT: '5432',
        POSTGRES_DB: 'test_value',
        POSTGRES_USER: 'test_value',
        POSTGRES_PASSWORD: 'test_value',
      };

      const configServiceMock = new ConfigServiceClass(mockEnv);

      try {
        configServiceMock.getTypeOrmConfig();
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  /**
   * @method getKeycloakConfig
   *
   * @description
   * This test suite validates that the config is returned and no error is thrown
   */
  describe('`getKeycloakConfig` method', () => {
    // Scenario 1: The test succeeds when one of the keys are available in the config
    it('succeeds when one of the keys are available in the config', () => {
      const mockEnv = {
        KEYCLOAK_AUTH_SERVER_URI: 'test_value',
        KEYCLOAK_CLIENT_SECRET: 'test_value',
        KEYCLOAK_REALM: 'test_value',
        KEYCLOAK_RESOURCE: 'test_value',
        KEYCLOAK_SSL_REQUIRED: 'test_value',
        KEYCLOAK_CONFIDENTIAL_PORT: 'test_value',
      };

      const configServiceMock = new ConfigServiceClass(mockEnv);

      expect(configServiceMock.getKeycloakConfig()).toBeInstanceOf(Object);
    });

    // Scenario 2: The test fails when one of the keys are not available
    it('fails when one of the keys are not available', () => {
      const mockEnv = {
        // KEYCLOAK_AUTH_SERVER_URI: 'test_value', --> Removing explicitly for getTypeOrmConfig method to fail
        KEYCLOAK_CLIENT_SECRET: 'test_value',
        KEYCLOAK_REALM: 'test_value',
        KEYCLOAK_RESOURCE: 'test_value',
        KEYCLOAK_SSL_REQUIRED: 'test_value',
        KEYCLOAK_CONFIDENTIAL_PORT: 'test_value',
      };

      const configServiceMock = new ConfigServiceClass(mockEnv);

      try {
        configServiceMock.getKeycloakConfig();
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
});
