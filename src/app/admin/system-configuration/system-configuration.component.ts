import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SystemConfigurationService } from 'src/app/services/admin/SystemConfiguration/SystemConfiguration.service';
import { SystemConfigurationDTO } from 'src/app/models/admin/SystemConfiguration/SystemConfigurationDTO';

@Component({
  selector: 'system-configuration',
  templateUrl: './system-configuration.component.html',
  styleUrls: ['./system-configuration.component.css']
})
export class SystemConfigurationComponent implements OnInit {

  SystemSetting: SystemConfigurationDTO;
  systemForm: FormGroup;

  constructor(private SystemConfigurationService: SystemConfigurationService) { }

  ngOnInit(): void {

    // GetSystemSetting
    this.GetSystemSettingInit();

    // Init Form
    this.systemForm = new FormGroup({
      GeoLocationSetting: new FormGroup({
        IsActive: new FormControl(''),
        SystemSettingValue: new FormControl('')
      }),
      IPsRangeSetting: new FormGroup({
        IsActive: new FormControl(''),
        SystemSettingValue: new FormControl('')
      }),
      EmailSetting: new FormGroup({
        IsActive: new FormControl(''),
        SystemSettingValue: new FormControl('')
      }),
      ldapSettings: new FormGroup({
        IsActive: new FormControl(''),
        ServerURL: new FormControl(''),
        Port: new FormControl(''),
        UseSSL: new FormControl(''),
        DomainName: new FormControl(''),
        DomainDistinguishedName: new FormControl(''),
        DomainUserName: new FormControl(''),
        Password: new FormControl('')
      }),
      blackBoardSettings: new FormGroup({
        IsActive: new FormControl(''),
        ID: new FormControl(''),
        ServerURL: new FormControl(''),
        Key: new FormControl(''),
        SecretKey: new FormControl('')
      })
    });

  }

  // GetSystemSettingInit & Updating form value from api
  GetSystemSettingInit() {
    this.SystemConfigurationService.GetSystemSetting().subscribe(res => {
      this.systemForm.patchValue({
        GeoLocationSetting: {
          IsActive: res.GeoLocationSetting.IsActive,
          SystemSettingValue: res.GeoLocationSetting.SystemSettingValue
        },
        IPsRangeSetting: {
          IsActive: res.IPsRangeSetting.IsActive,
          SystemSettingValue: res.IPsRangeSetting.SystemSettingValue
        },
        EmailSetting: {
          IsActive: res.EmailSetting.IsActive,
          SystemSettingValue: res.EmailSetting.SystemSettingValue
        },
        ldapSettings: {
          IsActive: res.ldapSettings.IsActive,
          ServerURL: res.ldapSettings.ServerURL,
          Port: res.ldapSettings.Port,
          UseSSL: res.ldapSettings.UseSSL,
          DomainName: res.ldapSettings.DomainName,
          DomainDistinguishedName: res.ldapSettings.DomainDistinguishedName,
          DomainUserName: res.ldapSettings.DomainUserName,
          Password: res.ldapSettings.Password
        },
        blackBoardSettings: {
          IsActive: res.blackBoardSettings.IsActive,
          ID: res.blackBoardSettings.ID,
          ServerURL: res.blackBoardSettings.ServerURL,
          Key: res.blackBoardSettings.Key,
          SecretKey: res.blackBoardSettings.SecretKey
        },
      })
    });
  }

  // Save
  submit() {
    this.SystemConfigurationService.save(this.systemForm.value).subscribe(res => {
      console.log(res);
    })
  }

}
