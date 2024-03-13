import React, { useEffect, useState }from 'react';
import { fetchData } from './firebaseService';
import { CollapseProps, Tooltip, Button, Input } from 'antd';
import { Collapse, Row, Col } from 'antd';
import { WarningTwoTone, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Containers from './Containers';
import Shelves from './Shelves';
import './Shelves.css';
import './Inventory.css';
import Container from './Container';
// import { sendShelfDataToFirebase } from './firebaseService';
// import { Button } from 'antd/es/radio';


const Inventory: React.FC<any> = () => {
  const [data, setData] = useState<any>(null);

  const fetchDataFromFirebase = async () => {
    try {
    const fetchedData = await fetchData();
      setData(fetchedData);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchDataFromFirebase();

    // Fetch data every 1 second
    const interval = setInterval(fetchDataFromFirebase, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  let easterEgg: boolean = data["Easter Egg"]["Toggle"];

  //Scale 1
  let scale1Container1Name: string = data["Scale_1"]["Container_1"]["Container Name"];
  let scale1Container1CurrMass: number = data["Scale_1"]["Container_1"]["Current Container Mass"];
  let scale1Container1HumidBool: boolean = data["Scale_1"]["Container_1"]["Humidity Bool"];
  let scale1Container1InitMass: number = data["Scale_1"]["Container_1"]["Initial Container Mass"];
  let scale1Container1LUXBool: boolean = data["Scale_1"]["Container_1"]["Lux Bool"];
  let scale1Container1MaxHumid: number = data["Scale_1"]["Container_1"]["Max Storage Humidity"];
  let scale1Container1LUX: number = data["Scale_1"]["Container_1"]["Max Storage Lux"];
  let scale1Container1MaxTemp: number = data["Scale_1"]["Container_1"]["Max Storage Temperature"];
  let scale1Container1UV: number = data["Scale_1"]["Container_1"]["Max Storage UV"];
  let scale1Container1MinHumid: number = data["Scale_1"]["Container_1"]["Min Storage Humidity"];
  let scale1Container1MinTemp: number = data["Scale_1"]["Container_1"]["Min Storage Temperature"];
  let scale1Container1Percent: number = data["Scale_1"]["Container_1"]["Percentage Remaining"];
  let scale1Container1TempBool: boolean = data["Scale_1"]["Container_1"]["Temperature Bool"];
  let scale1Container1UVBool: boolean = data["Scale_1"]["Container_1"]["UV Bool"];

  let scale1Container2Name: string = data["Scale_1"]["Container_2"]["Container Name"];
  let scale1Container2CurrMass: number = data["Scale_1"]["Container_2"]["Current Container Mass"];
  let scale1Container2HumidBool: boolean = data["Scale_1"]["Container_2"]["Humidity Bool"];
  let scale1Container2InitMass: number = data["Scale_1"]["Container_2"]["Initial Container Mass"];
  let scale1Container2LUXBool: boolean = data["Scale_1"]["Container_2"]["Lux Bool"];
  let scale1Container2MaxHumid: number = data["Scale_1"]["Container_2"]["Max Storage Humidity"];
  let scale1Container2LUX: number = data["Scale_1"]["Container_2"]["Max Storage Lux"];
  let scale1Container2MaxTemp: number = data["Scale_1"]["Container_2"]["Max Storage Temperature"];
  let scale1Container2UV: number = data["Scale_1"]["Container_2"]["Max Storage UV"];
  let scale1Container2MinHumid: number = data["Scale_1"]["Container_2"]["Min Storage Humidity"];
  let scale1Container2MinTemp: number = data["Scale_1"]["Container_2"]["Min Storage Temperature"];
  let scale1Container2Percent: number = data["Scale_1"]["Container_2"]["Percentage Remaining"];
  let scale1Container2TempBool: boolean = data["Scale_1"]["Container_2"]["Temperature Bool"];
  let scale1Container2UVBool: boolean = data["Scale_1"]["Container_2"]["UV Bool"];

  let scale1Container3Name: string = data["Scale_1"]["Container_3"]["Container Name"];
  let scale1Container3CurrMass: number = data["Scale_1"]["Container_3"]["Current Container Mass"];
  let scale1Container3HumidBool: boolean = data["Scale_1"]["Container_3"]["Humidity Bool"];
  let scale1Container3InitMass: number = data["Scale_1"]["Container_3"]["Initial Container Mass"];
  let scale1Container3LUXBool: boolean = data["Scale_1"]["Container_3"]["Lux Bool"];
  let scale1Container3MaxHumid: number = data["Scale_1"]["Container_3"]["Max Storage Humidity"];
  let scale1Container3LUX: number = data["Scale_1"]["Container_3"]["Max Storage Lux"];
  let scale1Container3MaxTemp: number = data["Scale_1"]["Container_3"]["Max Storage Temperature"];
  let scale1Container3UV: number = data["Scale_1"]["Container_3"]["Max Storage UV"];
  let scale1Container3MinHumid: number = data["Scale_1"]["Container_3"]["Min Storage Humidity"];
  let scale1Container3MinTemp: number = data["Scale_1"]["Container_3"]["Min Storage Temperature"];
  let scale1Container3Percent: number = data["Scale_1"]["Container_3"]["Percentage Remaining"];
  let scale1Container3TempBool: boolean = data["Scale_1"]["Container_3"]["Temperature Bool"];
  let scale1Container3UVBool: boolean = data["Scale_1"]["Container_3"]["UV Bool"];

  let scale1Container4Name: string = data["Scale_1"]["Container_4"]["Container Name"];
  let scale1Container4CurrMass: number = data["Scale_1"]["Container_4"]["Current Container Mass"];
  let scale1Container4HumidBool: boolean = data["Scale_1"]["Container_4"]["Humidity Bool"];
  let scale1Container4InitMass: number = data["Scale_1"]["Container_4"]["Initial Container Mass"];
  let scale1Container4LUXBool: boolean = data["Scale_1"]["Container_4"]["Lux Bool"];
  let scale1Container4MaxHumid: number = data["Scale_1"]["Container_4"]["Max Storage Humidity"];
  let scale1Container4LUX: number = data["Scale_1"]["Container_4"]["Max Storage Lux"];
  let scale1Container4MaxTemp: number = data["Scale_1"]["Container_4"]["Max Storage Temperature"];
  let scale1Container4UV: number = data["Scale_1"]["Container_4"]["Max Storage UV"];
  let scale1Container4MinHumid: number = data["Scale_1"]["Container_4"]["Min Storage Humidity"];
  let scale1Container4MinTemp: number = data["Scale_1"]["Container_4"]["Min Storage Temperature"];
  let scale1Container4Percent: number = data["Scale_1"]["Container_4"]["Percentage Remaining"];
  let scale1Container4TempBool: boolean = data["Scale_1"]["Container_4"]["Temperature Bool"];
  let scale1Container4UVBool: boolean = data["Scale_1"]["Container_4"]["UV Bool"];

  let scale1Humidity: string = data["Scale_1"]["Scale Humidity"];
  let scale1LUX: string = data["Scale_1"]["Scale Lux"];
  let scale1Name: string = data["Scale_1"]["Scale Name"];
  let scale1Temperature: string = data["Scale_1"]["Scale Temperature"];
  let scale1Tilted: boolean = data["Scale_1"]["Scale Tilted"];
  let scale1UV: string = data["Scale_1"]["Scale UV"];

  let scale1OutOfRangeLUX: boolean = false;
  let scale1OutOfRangeUV: boolean = false;
  let scale1OutOfRangeHumidLow: boolean = false;
  let scale1OutOfRangeHumidHigh: boolean = false;
  let scale1OutOfRangeTempLow: boolean = false;
  let scale1OutOfRangeTempHigh: boolean = false;

  //Scale 2
  let scale2Container1Name: string = data["Scale_2"]["Container_1"]["Container Name"];
  let scale2Container1CurrMass: number = data["Scale_2"]["Container_1"]["Current Container Mass"];
  let scale2Container1HumidBool: boolean = data["Scale_2"]["Container_1"]["Humidity Bool"];
  let scale2Container1InitMass: number = data["Scale_2"]["Container_1"]["Initial Container Mass"];
  let scale2Container1LUXBool: boolean = data["Scale_2"]["Container_1"]["Lux Bool"];
  let scale2Container1MaxHumid: number = data["Scale_2"]["Container_1"]["Max Storage Humidity"];
  let scale2Container1LUX: number = data["Scale_2"]["Container_1"]["Max Storage Lux"];
  let scale2Container1MaxTemp: number = data["Scale_2"]["Container_1"]["Max Storage Temperature"];
  let scale2Container1UV: number = data["Scale_2"]["Container_1"]["Max Storage UV"];
  let scale2Container1MinHumid: number = data["Scale_2"]["Container_1"]["Min Storage Humidity"];
  let scale2Container1MinTemp: number = data["Scale_2"]["Container_1"]["Min Storage Temperature"];
  let scale2Container1Percent: number = data["Scale_2"]["Container_1"]["Percentage Remaining"];
  let scale2Container1TempBool: boolean = data["Scale_2"]["Container_1"]["Temperature Bool"];
  let scale2Container1UVBool: boolean = data["Scale_2"]["Container_1"]["UV Bool"];

  let scale2Container2Name: string = data["Scale_2"]["Container_2"]["Container Name"];
  let scale2Container2CurrMass: number = data["Scale_2"]["Container_2"]["Current Container Mass"];
  let scale2Container2HumidBool: boolean = data["Scale_2"]["Container_2"]["Humidity Bool"];
  let scale2Container2InitMass: number = data["Scale_2"]["Container_2"]["Initial Container Mass"];
  let scale2Container2LUXBool: boolean = data["Scale_2"]["Container_2"]["Lux Bool"];
  let scale2Container2MaxHumid: number = data["Scale_2"]["Container_2"]["Max Storage Humidity"];
  let scale2Container2LUX: number = data["Scale_2"]["Container_2"]["Max Storage Lux"];
  let scale2Container2MaxTemp: number = data["Scale_2"]["Container_2"]["Max Storage Temperature"];
  let scale2Container2UV: number = data["Scale_2"]["Container_2"]["Max Storage UV"];
  let scale2Container2MinHumid: number = data["Scale_2"]["Container_2"]["Min Storage Humidity"];
  let scale2Container2MinTemp: number = data["Scale_2"]["Container_2"]["Min Storage Temperature"];
  let scale2Container2Percent: number = data["Scale_2"]["Container_2"]["Percentage Remaining"];
  let scale2Container2TempBool: boolean = data["Scale_2"]["Container_2"]["Temperature Bool"];
  let scale2Container2UVBool: boolean = data["Scale_2"]["Container_2"]["UV Bool"];

  let scale2Container3Name: string = data["Scale_2"]["Container_3"]["Container Name"];
  let scale2Container3CurrMass: number = data["Scale_2"]["Container_3"]["Current Container Mass"];
  let scale2Container3HumidBool: boolean = data["Scale_2"]["Container_3"]["Humidity Bool"];
  let scale2Container3InitMass: number = data["Scale_2"]["Container_3"]["Initial Container Mass"];
  let scale2Container3LUXBool: boolean = data["Scale_2"]["Container_3"]["Lux Bool"];
  let scale2Container3MaxHumid: number = data["Scale_2"]["Container_3"]["Max Storage Humidity"];
  let scale2Container3LUX: number = data["Scale_2"]["Container_3"]["Max Storage Lux"];
  let scale2Container3MaxTemp: number = data["Scale_2"]["Container_3"]["Max Storage Temperature"];
  let scale2Container3UV: number = data["Scale_2"]["Container_3"]["Max Storage UV"];
  let scale2Container3MinHumid: number = data["Scale_2"]["Container_3"]["Min Storage Humidity"];
  let scale2Container3MinTemp: number = data["Scale_2"]["Container_3"]["Min Storage Temperature"];
  let scale2Container3Percent: number = data["Scale_2"]["Container_3"]["Percentage Remaining"];
  let scale2Container3TempBool: boolean = data["Scale_2"]["Container_3"]["Temperature Bool"];
  let scale2Container3UVBool: boolean = data["Scale_2"]["Container_3"]["UV Bool"];

  let scale2Container4Name: string = data["Scale_2"]["Container_4"]["Container Name"];
  let scale2Container4CurrMass: number = data["Scale_2"]["Container_4"]["Current Container Mass"];
  let scale2Container4HumidBool: boolean = data["Scale_2"]["Container_4"]["Humidity Bool"];
  let scale2Container4InitMass: number = data["Scale_2"]["Container_4"]["Initial Container Mass"];
  let scale2Container4LUXBool: boolean = data["Scale_2"]["Container_4"]["Lux Bool"];
  let scale2Container4MaxHumid: number = data["Scale_2"]["Container_4"]["Max Storage Humidity"];
  let scale2Container4LUX: number = data["Scale_2"]["Container_4"]["Max Storage Lux"];
  let scale2Container4MaxTemp: number = data["Scale_2"]["Container_4"]["Max Storage Temperature"];
  let scale2Container4UV: number = data["Scale_2"]["Container_4"]["Max Storage UV"];
  let scale2Container4MinHumid: number = data["Scale_2"]["Container_4"]["Min Storage Humidity"];
  let scale2Container4MinTemp: number = data["Scale_2"]["Container_4"]["Min Storage Temperature"];
  let scale2Container4Percent: number = data["Scale_2"]["Container_4"]["Percentage Remaining"];
  let scale2Container4TempBool: boolean = data["Scale_2"]["Container_4"]["Temperature Bool"];
  let scale2Container4UVBool: boolean = data["Scale_2"]["Container_4"]["UV Bool"];

  let scale2Humidity: string = data["Scale_2"]["Scale Humidity"];
  let scale2LUX: string = data["Scale_2"]["Scale Lux"];
  let scale2Name: string = data["Scale_2"]["Scale Name"];
  let scale2Temperature: string = data["Scale_2"]["Scale Temperature"];
  let scale2Tilted: boolean = data["Scale_2"]["Scale Tilted"];
  let scale2UV: string = data["Scale_2"]["Scale UV"];

  let scale2OutOfRangeLUX: boolean = false;
  let scale2OutOfRangeUV: boolean = false;
  let scale2OutOfRangeHumidLow: boolean = false;
  let scale2OutOfRangeHumidHigh: boolean = false;
  let scale2OutOfRangeTempLow: boolean = false;
  let scale2OutOfRangeTempHigh: boolean = false;

  if ((scale1Container1LUXBool && parseFloat(scale1LUX) > scale1Container1LUX) || (scale1Container2LUXBool && parseFloat(scale1LUX) > scale1Container2LUX) ||
      (scale1Container3LUXBool && parseFloat(scale1LUX) > scale1Container3LUX) || (scale1Container4LUXBool && parseFloat(scale1LUX) > scale1Container4LUX))
  {
    scale1OutOfRangeLUX = true;
  }

  if ((scale1Container1UVBool && parseFloat(scale1UV) > scale1Container1UV) || (scale1Container2UVBool && parseFloat(scale1UV) > scale1Container2UV) || 
      (scale1Container3UVBool && parseFloat(scale1UV) > scale1Container3UV) || (scale1Container4UVBool && parseFloat(scale1UV) > scale1Container4UV))
  {
    scale1OutOfRangeUV = true;
  }

  if ((scale1Container1HumidBool && parseFloat(scale1Humidity) > scale1Container1MaxHumid) || (scale1Container2HumidBool && parseFloat(scale1Humidity) > scale1Container2MaxHumid) ||
      (scale1Container3HumidBool && parseFloat(scale1Humidity) > scale1Container3MaxHumid) || (scale1Container4HumidBool && parseFloat(scale1Humidity) > scale1Container4MaxHumid))
  {
    scale1OutOfRangeHumidHigh = true;
  }

  if ((scale1Container1HumidBool && parseFloat(scale1Humidity) < scale1Container1MinHumid) || (scale1Container2HumidBool && parseFloat(scale1Humidity) < scale1Container2MinHumid) ||
      (scale1Container3HumidBool && parseFloat(scale1Humidity) < scale1Container3MinHumid) || (scale1Container4HumidBool && parseFloat(scale1Humidity) < scale1Container4MinHumid))
  {
    scale1OutOfRangeHumidLow = true;
  }

  if ((scale1Container1TempBool && parseFloat(scale1Temperature) > scale1Container1MaxTemp) || (scale1Container2TempBool && parseFloat(scale1Temperature) > scale1Container2MaxTemp) || 
      (scale1Container3TempBool && parseFloat(scale1Temperature) > scale1Container3MaxTemp) || (scale1Container4TempBool && parseFloat(scale1Temperature) > scale1Container4MaxTemp))
  {
    scale1OutOfRangeTempHigh = true;
  }

  if ((scale1Container1TempBool && parseFloat(scale1Temperature) < scale1Container1MinTemp) || (scale1Container2TempBool && parseFloat(scale1Temperature) < scale1Container2MinTemp) ||
      (scale1Container3TempBool && parseFloat(scale1Temperature) < scale1Container3MinTemp) || (scale1Container4TempBool && parseFloat(scale1Temperature) < scale1Container4MinTemp))
  {
    scale1OutOfRangeTempLow = true;
  }

  //SCALE 2
  if ((scale2Container1LUXBool && parseFloat(scale2LUX) > scale2Container1LUX) || (scale2Container2LUXBool && parseFloat(scale2LUX) > scale2Container2LUX) ||
      (scale2Container3LUXBool && parseFloat(scale2LUX) > scale2Container3LUX) || (scale2Container4LUXBool && parseFloat(scale2LUX) > scale2Container4LUX))
  {
    scale2OutOfRangeLUX = true;
  }

  if ((scale2Container1UVBool && parseFloat(scale2UV) > scale2Container1UV) || (scale2Container2UVBool && parseFloat(scale2UV) > scale2Container2UV) || 
      (scale2Container3UVBool && parseFloat(scale2UV) > scale2Container3UV) || (scale2Container4UVBool && parseFloat(scale2UV) > scale2Container4UV))
  {
    scale2OutOfRangeUV = true;
  }

  if ((scale2Container1HumidBool && parseFloat(scale2Humidity) > scale2Container1MaxHumid) || (scale2Container2HumidBool && parseFloat(scale2Humidity) > scale2Container2MaxHumid) ||
      (scale2Container3HumidBool && parseFloat(scale2Humidity) > scale2Container3MaxHumid) || (scale2Container4HumidBool && parseFloat(scale2Humidity) > scale2Container4MaxHumid))
  {
    scale2OutOfRangeHumidHigh = true;
  }

  if ((scale2Container1HumidBool && parseFloat(scale2Humidity) < scale2Container1MinHumid) || (scale2Container2HumidBool && parseFloat(scale2Humidity) < scale2Container2MinHumid) ||
      (scale2Container3HumidBool && parseFloat(scale2Humidity) < scale2Container3MinHumid) || (scale2Container4HumidBool && parseFloat(scale2Humidity) < scale2Container4MinHumid))
  {
    scale2OutOfRangeHumidLow = true;
  }

  if ((scale2Container1TempBool && parseFloat(scale2Temperature) > scale2Container1MaxTemp) || (scale2Container2TempBool && parseFloat(scale2Temperature) > scale2Container2MaxTemp) || 
      (scale2Container3TempBool && parseFloat(scale2Temperature) > scale2Container3MaxTemp) || (scale2Container4TempBool && parseFloat(scale2Temperature) > scale2Container4MaxTemp))
  {
    scale2OutOfRangeTempHigh = true;
  }

  if ((scale2Container1TempBool && parseFloat(scale2Temperature) < scale2Container1MinTemp) || (scale2Container2TempBool && parseFloat(scale2Temperature) < scale2Container2MinTemp) ||
      (scale2Container3TempBool && parseFloat(scale2Temperature) < scale2Container3MinTemp) || (scale2Container4TempBool && parseFloat(scale2Temperature) < scale2Container4MinTemp))
  {
    scale2OutOfRangeTempLow = true;
  }



  return (
        <Shelves 
        easterEgg={easterEgg}
        scale1Container1Name={scale1Container1Name} scale1Container1CurrMass={scale1Container1CurrMass} scale1Container1HumidBool={scale1Container1HumidBool}
        scale1Container1InitMass={scale1Container1InitMass} scale1Container1LUXBool={scale1Container1LUXBool} scale1Container1MaxHumid={scale1Container1MaxHumid} 
        scale1Container1LUX={scale1Container1LUX} scale1Container1MaxTemp={scale1Container1MaxTemp} scale1Container1UV={scale1Container1UV} scale1Container1MinHumid={scale1Container1MinHumid}
        scale1Container1MinTemp={scale1Container1MinTemp} scale1Container1Percent={scale1Container1Percent} scale1Container1TempBool={scale1Container1TempBool} 
        scale1Container1UVBool={scale1Container1UVBool} scale1Container2Name={scale1Container2Name} scale1Container2CurrMass={scale1Container2CurrMass} 
        scale1Container2HumidBool={scale1Container2HumidBool} scale1Container2InitMass={scale1Container2InitMass} scale1Container2LUXBool={scale1Container2LUXBool} 
        scale1Container2MaxHumid={scale1Container2MaxHumid} scale1Container2LUX={scale1Container2LUX} scale1Container2MaxTemp={scale1Container2MaxTemp} scale1Container2UV={scale1Container2UV} 
        scale1Container2MinHumid={scale1Container2MinHumid} scale1Container2MinTemp={scale1Container2MinTemp} scale1Container2Percent={scale1Container2Percent}
        scale1Container2TempBool={scale1Container2TempBool} scale1Container2UVBool={scale1Container2UVBool} scale1Container3Name={scale1Container3Name} 
        scale1Container3CurrMass={scale1Container3CurrMass} scale1Container3HumidBool={scale1Container3HumidBool} scale1Container3InitMass={scale1Container3InitMass}
        scale1Container3LUXBool={scale1Container3LUXBool} scale1Container3MaxHumid={scale1Container3MaxHumid} scale1Container3LUX={scale1Container3LUX}
        scale1Container3MaxTemp={scale1Container3MaxTemp} scale1Container3UV={scale1Container3UV} scale1Container3MinHumid={scale1Container3MinHumid} 
        scale1Container3MinTemp={scale1Container3MinTemp} scale1Container3Percent={scale1Container3Percent} scale1Container3TempBool={scale1Container3TempBool} 
        scale1Container3UVBool={scale1Container3UVBool} scale1Container4Name={scale1Container4Name} scale1Container4CurrMass={scale1Container4CurrMass}
        scale1Container4HumidBool={scale1Container4HumidBool} scale1Container4InitMass={scale1Container4InitMass} scale1Container4LUXBool={scale1Container4LUXBool} 
        scale1Container4MaxHumid={scale1Container4MaxHumid} scale1Container4LUX={scale1Container4LUX} scale1Container4MaxTemp={scale1Container4MaxTemp} 
        scale1Container4UV={scale1Container4UV} scale1Container4MinHumid={scale1Container4MinHumid} scale1Container4MinTemp={scale1Container4MinTemp}
        scale1Container4Percent={scale1Container4Percent} scale1Container4TempBool={scale1Container4TempBool} scale1Container4UVBool={scale1Container4UVBool}
        scale1Humidity={scale1Humidity} scale1LUX={scale1LUX} scale1Name={scale1Name} scale1Temperature={scale1Temperature} scale1Tilted={scale1Tilted} scale1UV={scale1UV}
        scale1OutOfRangeLUX={scale1OutOfRangeLUX} scale1OutOfRangeUV={scale1OutOfRangeUV} scale1OutOfRangeHumidLow={scale1OutOfRangeHumidLow}
        scale1OutOfRangeHumidHigh={scale1OutOfRangeHumidHigh} scale1OutOfRangeTempLow={scale1OutOfRangeTempLow} scale1OutOfRangeTempHigh={scale1OutOfRangeTempHigh}
        scale2Container1Name={scale2Container1Name} scale2Container1CurrMass={scale2Container1CurrMass} scale2Container1HumidBool={scale2Container1HumidBool}
        scale2Container1InitMass={scale2Container1InitMass} scale2Container1LUXBool={scale2Container1LUXBool} scale2Container1MaxHumid={scale2Container1MaxHumid}
        scale2Container1LUX={scale2Container1LUX} scale2Container1MaxTemp={scale2Container1MaxTemp} scale2Container1UV={scale2Container1UV} 
        scale2Container1MinHumid={scale2Container1MinHumid} scale2Container1MinTemp={scale2Container1MinTemp}
        scale2Container1Percent={scale2Container1Percent} scale2Container1TempBool={scale2Container1TempBool} scale2Container1UVBool={scale2Container1UVBool} 
        scale2Container2Name={scale2Container2Name} scale2Container2CurrMass={scale2Container2CurrMass} scale2Container2HumidBool={scale2Container2HumidBool} 
        scale2Container2InitMass={scale2Container2InitMass} scale2Container2LUXBool={scale2Container2LUXBool} scale2Container2MaxHumid={scale2Container2MaxHumid}
        scale2Container2LUX={scale2Container2LUX} scale2Container2MaxTemp={scale2Container2MaxTemp} scale2Container2UV={scale2Container2UV} 
        scale2Container2MinHumid={scale2Container2MinHumid} scale2Container2MinTemp={scale2Container2MinTemp}
        scale2Container2Percent={scale2Container2Percent} scale2Container2TempBool={scale2Container2TempBool} scale2Container2UVBool={scale2Container2UVBool} 
        scale2Container3Name={scale2Container3Name} scale2Container3CurrMass={scale2Container3CurrMass} scale2Container3HumidBool={scale2Container3HumidBool}
        scale2Container3InitMass={scale2Container3InitMass} scale2Container3LUXBool={scale2Container3LUXBool} scale2Container3MaxHumid={scale2Container3MaxHumid} 
        scale2Container3LUX={scale2Container3LUX} scale2Container3MaxTemp={scale2Container3MaxTemp} scale2Container3UV={scale2Container3UV} 
        scale2Container3MinHumid={scale2Container3MinHumid} scale2Container3MinTemp={scale2Container3MinTemp} scale2Container3Percent={scale2Container3Percent} 
        scale2Container3TempBool={scale2Container3TempBool} scale2Container3UVBool={scale2Container3UVBool} scale2Container4Name={scale2Container4Name} 
        scale2Container4CurrMass={scale2Container4CurrMass} scale2Container4HumidBool={scale2Container4HumidBool} scale2Container4InitMass={scale2Container4InitMass}
        scale2Container4LUXBool={scale2Container4LUXBool} scale2Container4MaxHumid={scale2Container4MaxHumid} scale2Container4LUX={scale2Container4LUX}
        scale2Container4MaxTemp={scale2Container4MaxTemp} scale2Container4UV={scale2Container4UV} scale2Container4MinHumid={scale2Container4MinHumid} 
        scale2Container4MinTemp={scale2Container4MinTemp} scale2Container4Percent={scale2Container4Percent} scale2Container4TempBool={scale2Container4TempBool} 
        scale2Container4UVBool={scale2Container4UVBool} scale2Humidity={scale2Humidity} scale2LUX={scale2LUX} scale2Name={scale2Name} 
        scale2Temperature={scale2Temperature} scale2Tilted={scale2Tilted} scale2UV={scale2UV} scale2OutOfRangeLUX={scale2OutOfRangeLUX}
        scale2OutOfRangeUV={scale2OutOfRangeUV} scale2OutOfRangeHumidLow={scale2OutOfRangeHumidLow} scale2OutOfRangeHumidHigh={scale2OutOfRangeHumidHigh} 
        scale2OutOfRangeTempLow={scale2OutOfRangeTempLow} scale2OutOfRangeTempHigh={scale2OutOfRangeTempHigh}
        />
  )

}

export default Inventory;