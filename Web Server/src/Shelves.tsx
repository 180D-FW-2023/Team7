import React, { useEffect, useState }from 'react';
import { fetchData } from './firebaseService';
import { CollapseProps, Tooltip, Button, Input } from 'antd';
import { Collapse, Row, Col } from 'antd';
import { WarningTwoTone, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Containers from './Containers';
import './Shelves.css';
import Container from './Container';
import { sendShelfDataToFirebase } from './firebaseService';
// import { Button } from 'antd/es/radio';

interface PanelHeaderProps {
  initialTitle: string;
  currentLUX: string;
  currentUV: string;
  currentHumidity: string;
  currentTemp: string;
  outOfRangeLUX: boolean;
  outOfRangeUV: boolean;
  outOfRangeHumidityHigh: boolean;
  outOfRangeHumidityLow: boolean;
  outOfRangeTemperatureHigh: boolean;
  outOfRangeTemperatureLow: boolean;
  scaleTilted: boolean;
  inputTitle: (value: string) => void;
}

interface shelfData {
  shelfID: string;
  title: string;
}

// let scaleName: string = "";

function Shelves() {
  const [data, setData] = useState<any>(null);
  const [tempTitle, setTempTitle] = useState("");
  // let shelfTitle
  // const [shelfData, setShelfData] = useState<shelfData[]>([]);
  // const [collapseActiveKeys, setCollapseActiveKeys] = useState<string[]>(['1', '2']);
  // const [userData, setUserData] = useState<any>(null);

  // const handleCollapseChange = (keys: string | string[]) => {
  //   // Ensure keys is always an array
  //   const updatedKeys = Array.isArray(keys) ? keys : [keys];
  //   setCollapseActiveKeys(updatedKeys);
  // };
  const fetchDataFromFirebase = async () => {
    try {
    const fetchedData = await fetchData();
      setData(fetchedData);
      // setTempTitle(data["Scale_2"]["Scale Name"])
      // console.log("data:", tempTitle )
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchDataFromFirebase();

    // Fetch data every 1 second
    const interval = setInterval(fetchDataFromFirebase, 15000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     const scaleName = determineScaleName(data); // You need to define determineScaleName function based on your logic
  //     const updatedShelfData = [
  //       { shelfID: "Scale_1", title: scaleName || "" },
  //       { shelfID: "Scale_2", title: scaleName || "" },
  //     ];
  //     setShelfData(updatedShelfData);
  //     sendShelfDataToFirebase(updatedShelfData);
  //   }
  // }, [data]);



 //code below maybe semi worked
  // let scaleName: string = "am i reqritting?"

  let tempString: string = ""

  if(data)
  {
    tempString = data["Scale_1"]["Scale Name"]
    // let scaleName: string = data["Scale_1"]["Scale Name"];
    console.log("console log", tempString)
  }

  let scaleName = tempString;

  const [shelfData, setShelfData] = useState<shelfData[]>([
    { 
      shelfID: "Scale_1", title: scaleName
    },
    { 
      shelfID: "Scale_2", title: scaleName
    },
  ]);

  const handleInputTitle = (shelfID: string, title: string) => {
    setShelfData(prevData => {
      const updatedData = prevData.map(shelf => {
          if (shelf.shelfID === shelfID) {
              return { ...shelf, title: title };
          }
          return shelf;
      });
      return updatedData;
    });
  };
  // console.log("data1:", data )
  useEffect(() => {
    sendShelfDataToFirebase(shelfData);
  }, [shelfData]);
  
  if (!data) {
    return <div>Loading...</div>;
  }
  // console.log("data2:", data )
  // console.log(data);
  const determineScaleName = (data: any) => {
    return data["Scale Name"];
  }
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
  console.log("scale2Name:",  scale2Name);
  let scale2Temperature: string = data["Scale_2"]["Scale Temperature"];
  let scale2Tilted: boolean = data["Scale_2"]["Scale Tilted"];
  let scale2UV: string = data["Scale_2"]["Scale UV"];

  let scale2OutOfRangeLUX: boolean = false;
  let scale2OutOfRangeUV: boolean = false;
  let scale2OutOfRangeHumidLow: boolean = false;
  let scale2OutOfRangeHumidHigh: boolean = false;
  let scale2OutOfRangeTempLow: boolean = false;
  let scale2OutOfRangeTempHigh: boolean = false;

  // useEffect(() => {
  //   // Initialize shelfData after scaleName is defined
  //   if (data) {
  //     setShelfData([
  //       { shelfID: "Shelf_1", title: scaleName || "" },
  //       { shelfID: "Shelf_2", title: scaleName || "" },
  //     ]);
  //   }
  // }, [data]);

  // const shelfData = [
  //   { shelfID: "Shelf_1", title: scaleName || "" },
  //   { shelfID: "Shelf_2", title: scaleName || "" },
  // ];

  // const [shelfData, setShelfData] = useState<shelfData[]>([
  //   { 
  //     shelfID: "Scale_1", title: scaleName
  //   },
  //   { 
  //     shelfID: "Scale_2", title: scaleName
  //   },
  // ]);

  // const handleInputTitle = (shelfID: string, title: string) => {
  //   setShelfData(prevData => {
  //     const updatedData = prevData.map(shelf => {
  //         if (shelf.shelfID === shelfID) {
  //             return { ...shelf, title: title };
  //         }
  //         return shelf;
  //     });
  //     return updatedData;
  //   });
  // };

  // useEffect(() => {
  //   sendShelfDataToFirebase(shelfData);
  // }, [shelfData]);

  // let luxToggle: boolean = false;

  // const onLUXToggle = (toggle: boolean) =>
  // {
  //   console.log("toggle", toggle)
  //   luxToggle = toggle; //NEED TO BRING IN TOGGLE VALUE FROM CONTAINERINFO SO THAT I CAN ALSO CHECK HERE IF WARNING SHOULD BE DISPLAYED
  // }

  // console.log("What is thus value", luxToggle)
  // SCALE 1
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

  const items: CollapseProps['items'] = [
    {
    key: '1',
    label: <PanelHeader initialTitle={scale1Name} currentLUX={scale1LUX} currentUV={scale1UV} currentHumidity={scale1Humidity} currentTemp={scale1Temperature} 
            outOfRangeLUX={scale1OutOfRangeLUX} outOfRangeUV={scale1OutOfRangeUV} outOfRangeHumidityHigh={scale1OutOfRangeHumidHigh} outOfRangeHumidityLow={scale1OutOfRangeHumidLow} 
            outOfRangeTemperatureHigh={scale1OutOfRangeTempHigh} outOfRangeTemperatureLow={scale1OutOfRangeTempLow} scaleTilted={scale1Tilted} 
            inputTitle={(value) => handleInputTitle("Scale_1", value)}
            />,
    children: <Containers container1Percent={scale1Container1Percent} container2Percent={scale1Container2Percent} container3Percent={scale1Container3Percent} 
            container4Percent={scale1Container4Percent} container1Name={scale1Container1Name} container2Name={scale1Container2Name} container3Name={scale1Container3Name}
            container4Name={scale1Container4Name} container1CurrMass={scale1Container1CurrMass} container2CurrMass={scale1Container2CurrMass}  container3CurrMass={scale1Container3CurrMass} 
            container4CurrMass={scale1Container4CurrMass} container1InitMass={scale1Container1InitMass} container2InitMass={scale1Container2InitMass} container3InitMass={scale1Container3InitMass} 
            container4InitMass={scale1Container4InitMass} container1LUX={scale1Container1LUX} container2LUX={scale1Container2LUX} container3LUX={scale1Container3LUX}
            container4LUX={scale1Container4LUX} container1UV={scale1Container1UV} container2UV={scale1Container2UV} container3UV={scale1Container3UV} 
            container4UV={scale1Container4UV} container1MaxHumid={scale1Container1MaxHumid} container2MaxHumid={scale1Container2MaxHumid} 
            container3MaxHumid={scale1Container3MaxHumid} container4MaxHumid={scale1Container4MaxHumid} container1MinHumid={scale1Container1MinHumid}
            container2MinHumid={scale1Container2MinHumid} container3MinHumid={scale1Container3MinHumid} container4MinHumid={scale1Container4MinHumid}
            container1MaxTemp={scale1Container1MaxTemp} container2MaxTemp={scale1Container2MaxTemp} container3MaxTemp={scale1Container3MaxTemp} container4MaxTemp={scale1Container4MaxTemp}
            container1MinTemp={scale1Container1MinTemp} container2MinTemp={scale1Container2MinTemp} container3MinTemp={scale1Container3MinTemp} container4MinTemp={scale1Container4MinTemp}
            container1HumidBool={scale1Container1HumidBool} container2HumidBool={scale1Container2HumidBool} container3HumidBool={scale1Container3HumidBool} container4HumidBool={scale1Container4HumidBool}
            container1LUXBool={scale1Container1LUXBool} container2LUXBool={scale1Container2LUXBool} container3LUXBool={scale1Container3LUXBool} container4LUXBool={scale1Container4LUXBool}
            container1TempBool={scale1Container1TempBool} container2TempBool={scale1Container2TempBool} container3TempBool={scale1Container3TempBool} container4TempBool={scale1Container4TempBool}
            container1UVBool={scale1Container1UVBool} container2UVBool={scale1Container2UVBool} container3UVBool={scale1Container3UVBool} container4UVBool={scale1Container4UVBool}
            />,
    },
    {
    key: '2',
    label: <PanelHeader initialTitle={scale2Name} currentLUX={scale2LUX} currentUV={scale2UV} currentHumidity={scale2Humidity} currentTemp={scale2Temperature} 
            outOfRangeLUX={scale2OutOfRangeLUX} outOfRangeUV={scale2OutOfRangeUV} outOfRangeHumidityHigh={scale2OutOfRangeHumidHigh} outOfRangeHumidityLow={scale2OutOfRangeHumidLow} 
            outOfRangeTemperatureHigh={scale2OutOfRangeTempHigh} outOfRangeTemperatureLow={scale2OutOfRangeTempLow} scaleTilted={scale2Tilted} 
            inputTitle={(value) => handleInputTitle("Scale_2", value)}
            />,
    children: <Containers container1Percent={scale2Container1Percent} container2Percent={scale2Container2Percent} container3Percent={scale2Container3Percent} 
            container4Percent={scale2Container4Percent} container1Name={scale2Container1Name} container2Name={scale2Container2Name} container3Name={scale2Container3Name}
            container4Name={scale2Container4Name} container1CurrMass={scale2Container1CurrMass} container2CurrMass={scale2Container2CurrMass}  container3CurrMass={scale2Container3CurrMass} 
            container4CurrMass={scale2Container4CurrMass} container1InitMass={scale2Container1InitMass} container2InitMass={scale2Container2InitMass} container3InitMass={scale2Container3InitMass} 
            container4InitMass={scale2Container4InitMass} container1LUX={scale2Container1LUX} container2LUX={scale2Container2LUX} container3LUX={scale2Container3LUX}
            container4LUX={scale2Container4LUX} container1UV={scale2Container1UV} container2UV={scale2Container2UV} container3UV={scale2Container3UV} 
            container4UV={scale2Container4UV} container1MaxHumid={scale2Container1MaxHumid} container2MaxHumid={scale2Container2MaxHumid} 
            container3MaxHumid={scale2Container3MaxHumid} container4MaxHumid={scale2Container4MaxHumid} container1MinHumid={scale2Container1MinHumid}
            container2MinHumid={scale2Container2MinHumid} container3MinHumid={scale2Container3MinHumid} container4MinHumid={scale2Container4MinHumid}
            container1MaxTemp={scale2Container1MaxTemp} container2MaxTemp={scale2Container2MaxTemp} container3MaxTemp={scale2Container3MaxTemp} container4MaxTemp={scale2Container4MaxTemp}
            container1MinTemp={scale2Container1MinTemp} container2MinTemp={scale2Container2MinTemp} container3MinTemp={scale2Container3MinTemp} container4MinTemp={scale2Container4MinTemp}
            container1HumidBool={scale2Container1HumidBool} container2HumidBool={scale2Container2HumidBool} container3HumidBool={scale2Container3HumidBool} container4HumidBool={scale2Container4HumidBool}
            container1LUXBool={scale2Container1LUXBool} container2LUXBool={scale2Container2LUXBool} container3LUXBool={scale2Container3LUXBool} container4LUXBool={scale2Container4LUXBool}
            container1TempBool={scale2Container1TempBool} container2TempBool={scale2Container2TempBool} container3TempBool={scale2Container3TempBool} container4TempBool={scale2Container4TempBool}
            container1UVBool={scale2Container1UVBool} container2UVBool={scale2Container2UVBool} container3UVBool={scale2Container3UVBool} container4UVBool={scale2Container4UVBool}
            />,
    },
  ];
  // console.log("container1: ", container1MinHumid, container1MaxHumid)
  // console.log("container2: ", container2MinHumid, container2MaxHumid)
  // console.log("container3: ", container3MinHumid, container3MaxHumid)
  // console.log("container4: ", container4MinHumid, container4MaxHumid)
  return (
    <div>
      <Collapse items={items} defaultActiveKey={['1', '2']}/>
      {/* <Collapse
        items={items}
        activeKey={collapseActiveKeys} // Set activeKey based on state
        onChange={handleCollapseChange} // Handle collapse changes
      /> */}
    </div>
  );
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ initialTitle, currentLUX, currentUV, currentHumidity, currentTemp, outOfRangeLUX, outOfRangeUV,
  outOfRangeHumidityHigh, outOfRangeHumidityLow, outOfRangeTemperatureHigh, outOfRangeTemperatureLow, scaleTilted, inputTitle }) => {
  // let tooltipWarningMessage: string[] = [""];
  let tooltipWarningMessage: string = "";
  if (scaleTilted)
  {
    tooltipWarningMessage += "<li>Scale Tilted.</li>"
  }

  if (outOfRangeLUX)
  {
    tooltipWarningMessage += "<li>High LUX detected.</li>";
  }

  if(outOfRangeUV)
  {
    tooltipWarningMessage += "<li>High UV detected.</li>";
  }

  if(outOfRangeHumidityHigh)
  {
    tooltipWarningMessage += "<li>High humidity detected.</li>";
  }

  if(outOfRangeHumidityLow)
  {
    tooltipWarningMessage += "<li>Low humidity detected.</li>";
  }

  if(outOfRangeTemperatureHigh)
  {
    tooltipWarningMessage += "<li>High temperature detected.</li>";
  }

  if(outOfRangeTemperatureLow)
  {
    tooltipWarningMessage += "<li>Low temperature detected.</li>";
  }

  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  // const handleSave = () => {
  //   setTitle(newTitle);
  //   setIsEditing(false);
  // };

  // const handleCancel = () => {
  //   setNewTitle(title);
  //   setIsEditing(false);
  // };


  const onEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsEditing(true);
  }

  const onCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setNewTitle(title);
    setIsEditing(false);
  }

  const onSave = () => {
    setTitle(newTitle);
    inputTitle(newTitle);
    setIsEditing(false);

    // console.log("ttile", newTitle)
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.stopPropagation(); // Prevent the default behavior of form submission
      onSave(); // Call the onSave function when Enter key is pressed
    }
  };

  // const handleClickInput: MouseEventHandler<HTMLInputElement> = (event) => {
  //   // Handle the click event for the input
  // };

  const handleClickInput = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }


  // value={newTitle}
  // onChange={(e) => setNewTitle(e.target.value)}
  // onKeyDown={(e) => {
  //   if (e.key === 'Enter') handleSave();
  //   else if (e.key === 'Escape') handleCancel();
  // }}

  return(
  <div>
        <h3 className="collapseTitle"> 
          { isEditing ?
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input placeholder={title} size='large' style={{ width: '40%', marginRight: '5px' }} 
            value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
            onPressEnter={handleEnterPress} onClick={handleClickInput}
            />
            <Button type="text" style={{ padding: '0px' }} onClick={onCancel}>
              <CloseCircleOutlined />
            </Button>
          </div>
          :
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>{title}</span>
            <Button type="text" style={{ padding: '0px' }} onClick={onEdit}>
              <EditOutlined style={{ fontSize: '15px', paddingLeft: '0px' }} />
            </Button>
          </div>
          }
          {tooltipWarningMessage ? 
            <Tooltip 
              title={<span dangerouslySetInnerHTML={{__html: tooltipWarningMessage}} />}>
              <WarningTwoTone />
            </Tooltip> : ""
          }     
        </h3>

        <Row gutter={[16,16]}>
          <Col span={5}>
            <p>Current LUX: {currentLUX}</p>
          </Col>
          <Col span={5}>
            <p>Current UV: {currentUV}</p>
          </Col>
          <Col span={7}>
            <p>Current Humidity: {currentHumidity} </p>
          </Col>
          <Col span={7}>
            <p>Current Temperature: {currentTemp}</p>
          </Col>
        </Row>
    </div>
  );
}

export default Shelves;