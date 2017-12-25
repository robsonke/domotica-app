export interface Device {
  /*
  {
    "AddjMulti":1,
    "AddjMulti2":1,
    "AddjValue":0,
    "AddjValue2":0,
    "BatteryLevel":255,
    "CustomImage":0,
    "Data":"Off",
    "Description":"Fibaro Wall Plug",
    "Favorite":0,
    "HardwareID":2,
    "HardwareName":"ZWave",
    "HardwareType":"OpenZWave USB",
    "HardwareTypeVal":21,
    "HaveDimmer":true,
    "HaveGroupCmd":true,
    "HaveTimeout":false,
    "ID":"00000401",
    "Image":"Light",
    "IsSubDevice":false,
    "LastUpdate":"2017-10-22 11:59:11",
    "Level":0,
    "LevelInt":0,
    "MaxDimLevel":100,
    "Name":"Lamp stoel",
    "Notifications":"false",
    "PlanID":"2",
    "PlanIDs":[
        2
    ],
    "Protected":false,
    "ShowNotifications":true,
    "SignalLevel":"-",
    "Status":"Off",
    "StrParam1":"",
    "StrParam2":"",
    "SubType":"Switch",
    "SwitchType":"On/Off",
    "SwitchTypeVal":0,
    "Timers":"false",
    "Type":"Light/Switch",
    "TypeImg":"lightbulb",
    "Unit":1,
    "Used":1,
    "UsedByCamera":false,
    "XOffset":"0",
    "YOffset":"0",
    "idx":"11"
  }
  */

  AddjMulti: number;
  AddjMulti2: number;
  AddjValue: number;
  AddjValue2: number;
  BatteryLevel: number;
  CustomImage: number;
  Data: string;
  Description: string;
  Favorite: number;
  ForecastStr: string;
  HardwareID: number;
  HardwareName: string;
  HardwareType: string;
  HardwareTypeVal: number;
  HaveDimmer: boolean;
  HaveGroupCmd: boolean;
  HaveTimeout: boolean;
  ID: string;
  Image: string;
  IsSubDevice: boolean;
  LastUpdate: string;
  Level: number;
  LevelInt: number;
  MaxDimLevel: number;
  Name: string;
  Notifications: string;
  PlanID: string;
  PlanIDs: number[];
  Protected: boolean;
  ShowNotifications: boolean;
  SignalLevel: string;
  Status: string;
  StrParam1: string;
  StrParam2: string;
  SubType: string;
  SwitchType: string;
  SwitchTypeVal: number;
  Timers: string;
  Type: string;
  TypeImg: string;
  Unit: number;
  Used: number;
  UsedByCamera: boolean;
  XOffset: string;
  YOffset: string;
  idx: string;
}
