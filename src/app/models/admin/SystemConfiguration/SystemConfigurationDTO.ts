export interface SystemConfigurationDTO {
  GeoLocationSetting: GeoLocationSetting;
  IPsRangeSetting: GeoLocationSetting;
  EmailSetting: GeoLocationSetting;
  ldapSettings: LdapSettings;
  blackBoardSettings: BlackBoardSettings;
}

interface BlackBoardSettings {
  ID: string;
  ServerURL: string;
  Key: string;
  SecretKey: string;
  IsActive: boolean;
}

interface LdapSettings {
  ServerURL: string;
  Port: string;
  UseSSL: boolean;
  DomainName: string;
  DomainDistinguishedName: string;
  DomainUserName: string;
  Password: string;
  IsActive: boolean;
}

interface GeoLocationSetting {
  SystemSettingValue: string;
  IsActive: boolean;
}
