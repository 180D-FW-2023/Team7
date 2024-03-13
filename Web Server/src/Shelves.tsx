import React, { useEffect, useState }from 'react';
import { fetchData } from './firebaseService';
import { CollapseProps, Tooltip, Button, Input } from 'antd';
import { Collapse, Row, Col } from 'antd';
import { WarningTwoTone, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Containers from './Containers';
import './Shelves.css';
import ShelfHeader from './ShelfHeader';
import Container from './Container';
import { sendDataToFirebase, sendEasterEggDataToFirebase } from './firebaseService';
import blackAndWhiteR2D2 from './blackAndWhiteR2D2.png';
import coloredR2D2 from './coloredR2D2.png';
import darkR2D2 from './darkR2D2.png';
// import { Button } from 'antd/es/radio';

interface ShelvesProps { // stuff when youre like calling that needs to be passed in. so like in this case. I think its like everything. eg. when I call shelves -> <Shelves (imma put stuff in here so like everything that shelves needs to display)/>
  easterEgg: boolean;
  scale1Container1Name: string;
  scale1Container1CurrMass: number;
  scale1Container1HumidBool: boolean;
  scale1Container1InitMass: number;
  scale1Container1LUXBool: boolean;
  scale1Container1MaxHumid: number;
  scale1Container1LUX: number;
  scale1Container1MaxTemp: number;
  scale1Container1UV: number;
  scale1Container1MinHumid: number;
  scale1Container1MinTemp: number;
  scale1Container1Percent: number;
  scale1Container1TempBool: boolean;
  scale1Container1UVBool: boolean;

  scale1Container2Name: string;
  scale1Container2CurrMass: number;
  scale1Container2HumidBool: boolean;
  scale1Container2InitMass: number;
  scale1Container2LUXBool: boolean;
  scale1Container2MaxHumid: number;
  scale1Container2LUX: number;
  scale1Container2MaxTemp: number;
  scale1Container2UV: number;
  scale1Container2MinHumid: number;
  scale1Container2MinTemp: number;
  scale1Container2Percent: number;
  scale1Container2TempBool: boolean;
  scale1Container2UVBool: boolean;

  scale1Container3Name: string;
  scale1Container3CurrMass: number;
  scale1Container3HumidBool: boolean;
  scale1Container3InitMass: number;
  scale1Container3LUXBool: boolean;
  scale1Container3MaxHumid: number;
  scale1Container3LUX: number;
  scale1Container3MaxTemp: number;
  scale1Container3UV: number;
  scale1Container3MinHumid: number;
  scale1Container3MinTemp: number;
  scale1Container3Percent: number;
  scale1Container3TempBool: boolean;
  scale1Container3UVBool: boolean;

  scale1Container4Name: string;
  scale1Container4CurrMass: number;
  scale1Container4HumidBool: boolean;
  scale1Container4InitMass: number;
  scale1Container4LUXBool: boolean;
  scale1Container4MaxHumid: number;
  scale1Container4LUX: number;
  scale1Container4MaxTemp: number;
  scale1Container4UV: number;
  scale1Container4MinHumid: number;
  scale1Container4MinTemp: number;
  scale1Container4Percent: number;
  scale1Container4TempBool: boolean;
  scale1Container4UVBool: boolean;

  scale1Humidity: string;
  scale1LUX: string;
  scale1Name: string;
  scale1Temperature: string;
  scale1Tilted: boolean;
  scale1UV: string;

  scale1OutOfRangeLUX: boolean;
  scale1OutOfRangeUV: boolean;
  scale1OutOfRangeHumidLow: boolean;
  scale1OutOfRangeHumidHigh: boolean;
  scale1OutOfRangeTempLow: boolean;
  scale1OutOfRangeTempHigh: boolean;

  scale2Container1Name: string;
  scale2Container1CurrMass: number;
  scale2Container1HumidBool: boolean;
  scale2Container1InitMass: number;
  scale2Container1LUXBool: boolean;
  scale2Container1MaxHumid: number;
  scale2Container1LUX: number;
  scale2Container1MaxTemp: number;
  scale2Container1UV: number;
  scale2Container1MinHumid: number;
  scale2Container1MinTemp: number;
  scale2Container1Percent: number;
  scale2Container1TempBool: boolean;
  scale2Container1UVBool: boolean;

  scale2Container2Name: string;
  scale2Container2CurrMass: number;
  scale2Container2HumidBool: boolean;
  scale2Container2InitMass: number;
  scale2Container2LUXBool: boolean;
  scale2Container2MaxHumid: number;
  scale2Container2LUX: number;
  scale2Container2MaxTemp: number;
  scale2Container2UV: number;
  scale2Container2MinHumid: number;
  scale2Container2MinTemp: number;
  scale2Container2Percent: number;
  scale2Container2TempBool: boolean;
  scale2Container2UVBool: boolean;

  scale2Container3Name: string;
  scale2Container3CurrMass: number;
  scale2Container3HumidBool: boolean;
  scale2Container3InitMass: number;
  scale2Container3LUXBool: boolean;
  scale2Container3MaxHumid: number;
  scale2Container3LUX: number;
  scale2Container3MaxTemp: number;
  scale2Container3UV: number;
  scale2Container3MinHumid: number;
  scale2Container3MinTemp: number;
  scale2Container3Percent: number;
  scale2Container3TempBool: boolean;
  scale2Container3UVBool: boolean;

  scale2Container4Name: string;
  scale2Container4CurrMass: number;
  scale2Container4HumidBool: boolean;
  scale2Container4InitMass: number;
  scale2Container4LUXBool: boolean;
  scale2Container4MaxHumid: number;
  scale2Container4LUX: number;
  scale2Container4MaxTemp: number;
  scale2Container4UV: number;
  scale2Container4MinHumid: number;
  scale2Container4MinTemp: number;
  scale2Container4Percent: number;
  scale2Container4TempBool: boolean;
  scale2Container4UVBool: boolean;

  scale2Humidity: string;
  scale2LUX: string;
  scale2Name: string;
  scale2Temperature: string;
  scale2Tilted: boolean;
  scale2UV: string;

  scale2OutOfRangeLUX: boolean;
  scale2OutOfRangeUV: boolean;
  scale2OutOfRangeHumidLow: boolean;
  scale2OutOfRangeHumidHigh: boolean;
  scale2OutOfRangeTempLow: boolean;
  scale2OutOfRangeTempHigh: boolean;
}
interface ShelfData {
  shelfID: string;
  shelfTitle: string;
  containerID: string;
  containerName: string;
  inputLUXValue: number;
  inputUVValue: number;
  inputMaxHumid: number;
  inputMinHumid: number;
  inputMaxTemp: number;
  inputMinTemp: number;
  inputLUXBool: boolean;
  inputUVBool: boolean;
  inputHumidBool: boolean;
  inputTempBool: boolean;
}

interface EggData {
  eggName: string;
  eggState: boolean;
}

const Shelves: React.FC<ShelvesProps> = ({
  easterEgg, 
  scale1Container1Name, scale1Container1CurrMass, scale1Container1HumidBool, scale1Container1InitMass, scale1Container1LUXBool, scale1Container1MaxHumid, scale1Container1LUX,
  scale1Container1MaxTemp, scale1Container1UV, scale1Container1MinHumid, scale1Container1MinTemp, scale1Container1Percent, scale1Container1TempBool, scale1Container1UVBool,
  scale1Container2Name, scale1Container2CurrMass, scale1Container2HumidBool, scale1Container2InitMass, scale1Container2LUXBool, scale1Container2MaxHumid, scale1Container2LUX,
  scale1Container2MaxTemp, scale1Container2UV, scale1Container2MinHumid, scale1Container2MinTemp, scale1Container2Percent, scale1Container2TempBool, scale1Container2UVBool,
  scale1Container3Name, scale1Container3CurrMass, scale1Container3HumidBool, scale1Container3InitMass, scale1Container3LUXBool, scale1Container3MaxHumid, scale1Container3LUX,
  scale1Container3MaxTemp, scale1Container3UV, scale1Container3MinHumid, scale1Container3MinTemp, scale1Container3Percent, scale1Container3TempBool, scale1Container3UVBool,
  scale1Container4Name, scale1Container4CurrMass, scale1Container4HumidBool, scale1Container4InitMass, scale1Container4LUXBool, scale1Container4MaxHumid, scale1Container4LUX,
  scale1Container4MaxTemp, scale1Container4UV, scale1Container4MinHumid, scale1Container4MinTemp, scale1Container4Percent, scale1Container4TempBool, scale1Container4UVBool,
  scale1Humidity, scale1LUX, scale1Name, scale1Temperature, scale1Tilted, scale1UV, scale1OutOfRangeLUX, scale1OutOfRangeUV, scale1OutOfRangeHumidLow,
  scale1OutOfRangeHumidHigh, scale1OutOfRangeTempLow, scale1OutOfRangeTempHigh, scale2Container1Name, scale2Container1CurrMass, scale2Container1HumidBool, scale2Container1InitMass,
  scale2Container1LUXBool, scale2Container1MaxHumid, scale2Container1LUX, scale2Container1MaxTemp, scale2Container1UV, scale2Container1MinHumid, scale2Container1MinTemp,
  scale2Container1Percent, scale2Container1TempBool, scale2Container1UVBool, scale2Container2Name, scale2Container2CurrMass, scale2Container2HumidBool, scale2Container2InitMass,
  scale2Container2LUXBool, scale2Container2MaxHumid, scale2Container2LUX, scale2Container2MaxTemp, scale2Container2UV, scale2Container2MinHumid, scale2Container2MinTemp,
  scale2Container2Percent, scale2Container2TempBool, scale2Container2UVBool, scale2Container3Name, scale2Container3CurrMass, scale2Container3HumidBool, scale2Container3InitMass,
  scale2Container3LUXBool, scale2Container3MaxHumid, scale2Container3LUX, scale2Container3MaxTemp, scale2Container3UV, scale2Container3MinHumid, scale2Container3MinTemp,
  scale2Container3Percent, scale2Container3TempBool, scale2Container3UVBool, scale2Container4Name, scale2Container4CurrMass, scale2Container4HumidBool, scale2Container4InitMass,
  scale2Container4LUXBool, scale2Container4MaxHumid, scale2Container4LUX, scale2Container4MaxTemp, scale2Container4UV, scale2Container4MinHumid, scale2Container4MinTemp,
  scale2Container4Percent, scale2Container4TempBool, scale2Container4UVBool, scale2Humidity, scale2LUX, scale2Name, scale2Temperature, scale2Tilted, scale2UV, scale2OutOfRangeLUX,
  scale2OutOfRangeUV, scale2OutOfRangeHumidLow, scale2OutOfRangeHumidHigh, scale2OutOfRangeTempLow, scale2OutOfRangeTempHigh
  }) => {
  const [shelfData, setShelfData] = useState<ShelfData[]>([
    { 
      shelfID: "Scale_1", shelfTitle: scale1Name, containerID: "Container_1", containerName: scale1Container1Name, inputLUXValue: scale1Container1LUX, inputUVValue: scale1Container1UV, 
      inputMaxHumid: scale1Container1MaxHumid, inputMinHumid: scale1Container1MinHumid, inputMaxTemp: scale1Container1MaxTemp, inputMinTemp: scale1Container1MinTemp,
      inputLUXBool: scale1Container1LUXBool, inputUVBool: scale1Container1UVBool, inputHumidBool: scale1Container1HumidBool, inputTempBool: scale1Container1TempBool
    },
    { 
      shelfID: "Scale_1", shelfTitle: scale1Name, containerID: "Container_2", containerName: scale1Container2Name, inputLUXValue: scale1Container2LUX, inputUVValue: scale1Container2UV, inputMaxHumid: scale1Container2MaxHumid, 
      inputMinHumid: scale1Container2MinHumid, inputMaxTemp: scale1Container2MaxTemp, inputMinTemp: scale1Container2MinTemp,
      inputLUXBool: scale1Container2LUXBool, inputUVBool: scale1Container2UVBool, inputHumidBool: scale1Container2HumidBool, inputTempBool: scale1Container2TempBool
    },
    { 
      shelfID: "Scale_1", shelfTitle: scale1Name, containerID: "Container_3", containerName: scale1Container3Name, inputLUXValue: scale1Container3LUX, inputUVValue: scale1Container3UV, inputMaxHumid: scale1Container3MaxHumid, 
      inputMinHumid: scale1Container3MinHumid, inputMaxTemp: scale1Container3MaxTemp, inputMinTemp: scale1Container3MinTemp,
      inputLUXBool: scale1Container3LUXBool, inputUVBool: scale1Container3UVBool, inputHumidBool: scale1Container3HumidBool, inputTempBool: scale1Container3TempBool
    },
    { 
      shelfID: "Scale_1", shelfTitle: scale1Name, containerID: "Container_4", containerName: scale1Container4Name, inputLUXValue: scale1Container4LUX, inputUVValue: scale1Container4UV, inputMaxHumid: scale1Container4MaxHumid, 
      inputMinHumid: scale1Container4MinHumid, inputMaxTemp: scale1Container4MaxTemp, inputMinTemp: scale1Container4MinTemp,
      inputLUXBool: scale1Container4LUXBool, inputUVBool: scale1Container4UVBool, inputHumidBool: scale1Container4HumidBool, inputTempBool: scale1Container4TempBool
    },
    { //Scale 2
      shelfID: "Scale_2", shelfTitle: scale2Name, containerID: "Container_1", containerName: scale2Container1Name, inputLUXValue: scale2Container1LUX, inputUVValue: scale2Container1UV, 
      inputMaxHumid: scale2Container1MaxHumid, inputMinHumid: scale2Container1MinHumid, inputMaxTemp: scale2Container1MaxTemp, inputMinTemp: scale2Container1MinTemp,
      inputLUXBool: scale2Container1LUXBool, inputUVBool: scale2Container1UVBool, inputHumidBool: scale2Container1HumidBool, inputTempBool: scale2Container1TempBool
    },
    { 
      shelfID: "Scale_2", shelfTitle: scale2Name, containerID: "Container_2", containerName: scale2Container2Name, inputLUXValue: scale2Container2LUX, inputUVValue: scale2Container2UV, inputMaxHumid: scale2Container2MaxHumid, 
      inputMinHumid: scale2Container2MinHumid, inputMaxTemp: scale2Container2MaxTemp, inputMinTemp: scale2Container2MinTemp,
      inputLUXBool: scale2Container2LUXBool, inputUVBool: scale2Container2UVBool, inputHumidBool: scale2Container2HumidBool, inputTempBool: scale2Container2TempBool
    },
    { 
      shelfID: "Scale_2", shelfTitle: scale2Name, containerID: "Container_3", containerName: scale2Container3Name, inputLUXValue: scale2Container3LUX, inputUVValue: scale2Container3UV, inputMaxHumid: scale2Container3MaxHumid, 
      inputMinHumid: scale2Container3MinHumid, inputMaxTemp: scale2Container3MaxTemp, inputMinTemp: scale2Container3MinTemp,
      inputLUXBool: scale2Container3LUXBool, inputUVBool: scale2Container3UVBool, inputHumidBool: scale2Container3HumidBool, inputTempBool: scale2Container3TempBool
    },
    { 
      shelfID: "Scale_2", shelfTitle: scale2Name, containerID: "Container_4", containerName: scale2Container4Name, inputLUXValue: scale2Container4LUX, inputUVValue: scale2Container4UV, inputMaxHumid: scale2Container4MaxHumid, 
      inputMinHumid: scale2Container4MinHumid, inputMaxTemp: scale2Container4MaxTemp, inputMinTemp: scale2Container4MinTemp,
      inputLUXBool: scale2Container4LUXBool, inputUVBool: scale2Container4UVBool, inputHumidBool: scale2Container4HumidBool, inputTempBool: scale2Container4TempBool
    },
  ]);
  const [eggData, setEggData] = useState<EggData[]>([
    {
      eggName: "Easter Egg", eggState: easterEgg
    }

  ]);
  const [r2d2, setR2D2] = useState<boolean>(easterEgg);

  const triggerR2D2Change = (eggName: string, newState:boolean) => {
    setR2D2(newState)
    setEggData(prevData => {
      const updatedData = prevData.map(egg => {
          if (egg.eggName === eggName) {
              return { ...egg, eggName: eggName, eggState: newState};
          }
          return egg;
      });
      return updatedData;
  });
  }

  const handleInputLUXChange = (shelfID: string, containerID: string, luxValue: number) => {
    setShelfData(prevData => {
        const updatedData = prevData.map(shelf => {
            if (shelf.shelfID === shelfID && shelf.containerID === containerID) {
                return { ...shelf, containerID: containerID, inputLUXValue: luxValue};
            }
            return shelf;
        });
        return updatedData;
    });
  };

  const handleInputUVChange = (shelfID: string, containerID: string, uvValue: number) => {
    setShelfData(prevData => {
        const updatedData = prevData.map(shelf => {
            if (shelf.shelfID === shelfID && shelf.containerID === containerID) {
                return { ...shelf, containerID: containerID, inputUVValue: uvValue };
            }
            return shelf;
        });
        return updatedData;
    });
  };

  const handleInputHumidChange = (shelfID: string, containerID: string, minHumid: number, maxHumid: number) => {
    setShelfData(prevData => {
      const updatedData = prevData.map(shelf => {
          if (shelf.shelfID === shelfID && shelf.containerID === containerID) {
              return { ...shelf, containerID: containerID, inputMaxHumid: maxHumid, inputMinHumid: minHumid };
          }
          return shelf;
      });
      return updatedData;
    });
  };

  const handleInputTempChange = (shelfID: string, containerID: string, minTemp: number, maxTemp: number) => {
    setShelfData(prevData => {
      const updatedData = prevData.map(shelf => {
          if (shelf.shelfID === shelfID && shelf.containerID === containerID) {
              return { ...shelf, containerID: containerID, inputMaxTemp: maxTemp, inputMinTemp: minTemp };
          }
          return shelf;
      });
      return updatedData;
    });
  };

  const handleLUXToggle = (shelfID: string, containerID: string, luxBool: boolean) => {
    setShelfData(prevData => {
      const updatedData = prevData.map(shelf => {
          if (shelf.shelfID === shelfID && shelf.containerID === containerID) {
              return { ...shelf, containerID: containerID, inputLUXBool: luxBool };
          }
          return shelf;
      });
      return updatedData;
    });
  };
  
  const handleUVToggle = (shelfID: string, containerID: string, uvBool: boolean) => {
    setShelfData(prevData => {
      const updatedData = prevData.map(shelf => {
          if (shelf.shelfID === shelfID && shelf.containerID === containerID) {
              return { ...shelf, containerID: containerID, inputUVBool: uvBool };
          }
          return shelf;
      });
      return updatedData;
    });
  };

  const handleHumidToggle = (shelfID: string, containerID: string, humidBool: boolean) => {
    setShelfData(prevData => {
      const updatedData = prevData.map(shelf => {
          if (shelf.shelfID === shelfID && shelf.containerID === containerID) {
              return { ...shelf, containerID: containerID, inputHumidBool: humidBool };
          }
          return shelf;
      });
      return updatedData;
    });
  };

  const handleTempToggle = (shelfID: string, containerID: string, tempBool: boolean) => {
    setShelfData(prevData => {
      const updatedData = prevData.map(shelf => {
          if (shelf.shelfID === shelfID && shelf.containerID === containerID) {
              return { ...shelf, containerID: containerID, inputTempBool: tempBool };
          }
          return shelf;
      });
      return updatedData;
    });
  };

  const handleInputTitle = (shelfID: string, shelfTitle: string) => {
    setShelfData(prevData => {
    const updatedData = prevData.map(shelf => {
        if (shelf.shelfID === shelfID) {
            return { ...shelf, shelfTitle: shelfTitle };
        }
        return shelf;
    });
    return updatedData;
    });
  };

  const handleInputModalTitle = (shelfID: string, containerID: string, containerName: string) => {
    setShelfData(prevData => {
    const updatedData = prevData.map(shelf => {
        if (shelf.shelfID === shelfID && shelf.containerID === containerID) {
            return { ...shelf, containerID: containerID, containerName: containerName };
        }
        return shelf;
    });
    return updatedData;
    });
  };


  useEffect(() => {
    sendDataToFirebase(shelfData);
  }, [shelfData]);

  useEffect(() => {
    sendEasterEggDataToFirebase(eggData);
  }, [eggData]);

  const items: CollapseProps['items'] = [
    {
    key: '1',
    label: <ShelfHeader initialTitle={scale1Name} currentLUX={scale1LUX} currentUV={scale1UV} currentHumidity={scale1Humidity} currentTemp={scale1Temperature} 
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
            container1OnInputLUXChange={(value) => handleInputLUXChange("Scale_1", "Container_1", value)}
            container1OnInputUVChange={(value) => handleInputUVChange("Scale_1", "Container_1", value)}
            container1OnInputHumidChange={([value1, value2]) => handleInputHumidChange("Scale_1", "Container_1", value1, value2)} container1OnInputTempChange={([value1, value2]) => handleInputTempChange("Scale_1", "Container_1", value1, value2)}
            container1OnLUXToggle={(value) => handleLUXToggle("Scale_1", "Container_1", value)}  container1OnUVToggle={(value) => handleUVToggle("Scale_1", "Container_1", value)}
            container1OnHumidToggle={(value) => handleHumidToggle("Scale_1", "Container_1", value)} 
            container1OnTempToggle={(value) => handleTempToggle("Scale_1", "Container_1", value)} 
            container2OnInputLUXChange={(value) => handleInputLUXChange("Scale_1", "Container_2", value)} container2OnInputUVChange={(value) => handleInputUVChange("Scale_1", "Container_2", value)}
            container2OnInputHumidChange={([value1, value2]) => handleInputHumidChange("Scale_1", "Container_2", value1, value2)}
            container2OnInputTempChange={([value1, value2]) => handleInputTempChange("Scale_1", "Container_2", value1, value2)}
            container2OnLUXToggle={(value) => handleLUXToggle("Scale_1", "Container_2", value)}  container2OnUVToggle={(value) => handleUVToggle("Scale_1", "Container_2", value)} 
            container2OnHumidToggle={(value) => handleHumidToggle("Scale_1", "Container_2", value)} container2OnTempToggle={(value) => handleTempToggle("Scale_1", "Container_2", value)} 
            container3OnInputLUXChange={(value) => handleInputLUXChange("Scale_1", "Container_3", value)}
            container3OnInputUVChange={(value) => handleInputUVChange("Scale_1", "Container_3", value)} container3OnInputHumidChange={([value1, value2]) => handleInputHumidChange("Scale_1", "Container_3", value1, value2)} 
            container3OnInputTempChange={([value1, value2]) => handleInputTempChange("Scale_1", "Container_3", value1, value2)} container3OnLUXToggle={(value) => handleLUXToggle("Scale_1", "Container_3", value)} 
            container3OnUVToggle={(value) => handleUVToggle("Scale_1", "Container_3", value)} 
            container3OnHumidToggle={(value) => handleHumidToggle("Scale_1", "Container_3", value)}  container3OnTempToggle={(value) => handleTempToggle("Scale_1", "Container_3", value)} 
            container4OnInputLUXChange={(value) => handleInputLUXChange("Scale_1", "Container_4", value)} container4OnInputUVChange={(value) => handleInputUVChange("Scale_1", "Container_4", value)}
            container4OnInputHumidChange={([value1, value2]) => handleInputHumidChange("Scale_1", "Container_4", value1, value2)}
            container4OnInputTempChange={([value1, value2]) => handleInputTempChange("Scale_1", "Container_4", value1, value2)} container4OnLUXToggle={(value) => handleLUXToggle("Scale_1", "Container_4", value)} 
            container4OnUVToggle={(value) => handleUVToggle("Scale_1", "Container_4", value)} container4OnHumidToggle={(value) => handleHumidToggle("Scale_1", "Container_4", value)} 
            container4OnTempToggle={(value) => handleTempToggle("Scale_1", "Container_4", value)} container1InputModalTitle={(value) => handleInputModalTitle("Scale_1", "Container_1", value)}
            container2InputModalTitle={(value) => handleInputModalTitle("Scale_1", "Container_2", value)} container3InputModalTitle={(value) => handleInputModalTitle("Scale_1", "Container_3", value)}
            container4InputModalTitle={(value) => handleInputModalTitle("Scale_1", "Container_4", value)}
            />,
    },
    {
    key: '2',
    label: <ShelfHeader initialTitle={scale2Name} currentLUX={scale2LUX} currentUV={scale2UV} currentHumidity={scale2Humidity} currentTemp={scale2Temperature} 
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
            container1OnInputLUXChange={(value) => handleInputLUXChange("Scale_2", "Container_1", value)}
            container1OnInputUVChange={(value) => handleInputUVChange("Scale_2", "Container_1", value)}
            container1OnInputHumidChange={([value1, value2]) => handleInputHumidChange("Scale_2", "Container_1", value1, value2)} container1OnInputTempChange={([value1, value2]) => handleInputTempChange("Scale_2", "Container_1", value1, value2)}
            container1OnLUXToggle={(value) => handleLUXToggle("Scale_2", "Container_1", value)}  container1OnUVToggle={(value) => handleUVToggle("Scale_2", "Container_1", value)}
            container1OnHumidToggle={(value) => handleHumidToggle("Scale_2", "Container_1", value)} 
            container1OnTempToggle={(value) => handleTempToggle("Scale_2", "Container_1", value)} 
            container2OnInputLUXChange={(value) => handleInputLUXChange("Scale_2", "Container_2", value)} container2OnInputUVChange={(value) => handleInputUVChange("Scale_2", "Container_2", value)}
            container2OnInputHumidChange={([value1, value2]) => handleInputHumidChange("Scale_2", "Container_2", value1, value2)}
            container2OnInputTempChange={([value1, value2]) => handleInputTempChange("Scale_2", "Container_2", value1, value2)}
            container2OnLUXToggle={(value) => handleLUXToggle("Scale_2", "Container_2", value)}  container2OnUVToggle={(value) => handleUVToggle("Scale_2", "Container_2", value)} 
            container2OnHumidToggle={(value) => handleHumidToggle("Scale_2", "Container_2", value)} container2OnTempToggle={(value) => handleTempToggle("Scale_2", "Container_2", value)} 
            container3OnInputLUXChange={(value) => handleInputLUXChange("Scale_2", "Container_3", value)}
            container3OnInputUVChange={(value) => handleInputUVChange("Scale_2", "Container_3", value)} container3OnInputHumidChange={([value1, value2]) => handleInputHumidChange("Scale_2", "Container_3", value1, value2)} 
            container3OnInputTempChange={([value1, value2]) => handleInputTempChange("Scale_2", "Container_3", value1, value2)} container3OnLUXToggle={(value) => handleLUXToggle("Scale_2", "Container_3", value)} 
            container3OnUVToggle={(value) => handleUVToggle("Scale_2", "Container_3", value)} 
            container3OnHumidToggle={(value) => handleHumidToggle("Scale_2", "Container_3", value)}  container3OnTempToggle={(value) => handleTempToggle("Scale_2", "Container_3", value)} 
            container4OnInputLUXChange={(value) => handleInputLUXChange("Scale_2", "Container_4", value)} container4OnInputUVChange={(value) => handleInputUVChange("Scale_2", "Container_4", value)}
            container4OnInputHumidChange={([value1, value2]) => handleInputHumidChange("Scale_2", "Container_4", value1, value2)}
            container4OnInputTempChange={([value1, value2]) => handleInputTempChange("Scale_2", "Container_4", value1, value2)} container4OnLUXToggle={(value) => handleLUXToggle("Scale_2", "Container_4", value)} 
            container4OnUVToggle={(value) => handleUVToggle("Scale_2", "Container_4", value)} container4OnHumidToggle={(value) => handleHumidToggle("Scale_2", "Container_4", value)} 
            container4OnTempToggle={(value) => handleTempToggle("Scale_2", "Container_4", value)} container1InputModalTitle={(value) => handleInputModalTitle("Scale_2", "Container_1", value)}
            container2InputModalTitle={(value) => handleInputModalTitle("Scale_2", "Container_2", value)} container3InputModalTitle={(value) => handleInputModalTitle("Scale_2", "Container_3", value)}
            container4InputModalTitle={(value) => handleInputModalTitle("Scale_2", "Container_4", value)}
            />,
    },
  ];
  return (
    <div>
      <Collapse items={items} defaultActiveKey={['1', '2']}/>
      { r2d2 ? 
        <Button className="bottom-left-button" type="text" >
          {/* wellp */}
          <img src={coloredR2D2} onClick={() => triggerR2D2Change("Easter Egg", false)}/>
        </Button>
        :
        <Button className="bottom-left-button" type="text">
          {/* hello */}
          <img src={darkR2D2} onClick={() => triggerR2D2Change("Easter Egg", true)}/>
        </Button>
      }

    </div>
  );

}

export default Shelves;