import React, { useEffect, useState }from 'react';
import { fetchData } from './firebaseService';
import type { CollapseProps } from 'antd';
import { Collapse, Row, Col } from 'antd';
import Containers from './Containers';
import './Shelves.css';
import Container from './Container';

interface PanelHeaderProps {
  title: string;
  currentLUX: string;
  currentUV: string;
  currentHumidity: string;
  currentTemp: string;
}

function Shelves() {
  const [data, setData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Fetch data initially
    fetchDataFromFirebase();

    // Fetch data every 1 second
    const interval = setInterval(fetchDataFromFirebase, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchDataFromFirebase = async () => {
    try {
    const fetchedData = await fetchData();
      setData(fetchedData);
    } catch (error) {
      // Handle error
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  // console.log(data);

  let container1Name: string = data["Container_1"]["Container Name"];
  let container1CurrMass: number = data["Container_1"]["Current Container Mass"];
  let container1InitMass: number = data["Container_1"]["Initial Container Mass"];
  let container1Percent: number = data["Container_1"]["Percentage Remaining"];

  let container2Name: string = data["Container_2"]["Container Name"];
  let container2CurrMass: number = data["Container_2"]["Current Container Mass"];
  let container2InitMass: number = data["Container_2"]["Initial Container Mass"];
  let container2Percent: number = data["Container_2"]["Percentage Remaining"];

  let container3Name: string = data["Container_3"]["Container Name"];
  let container3CurrMass: number = data["Container_3"]["Current Container Mass"];
  let container3InitMass: number = data["Container_3"]["Initial Container Mass"];
  let container3Percent: number = data["Container_3"]["Percentage Remaining"];

  let container4Name: string = data["Container_4"]["Container Name"];
  let container4CurrMass: number = data["Container_4"]["Current Container Mass"];
  let container4InitMass: number = data["Container_4"]["Initial Container Mass"];
  let container4Percent: number = data["Container_4"]["Percentage Remaining"];

  let scaleHumidity: string = data["Scale Humidity"];
  let scaleLUX: string = data["Scale Lux"];
  let scaleName: string = data["Scale Name"];
  let scaleTemperature: string = data["Scale Temperature"];
  let scaleUV: string = data["Scale UV"];

  const items: CollapseProps['items'] = [
    {
    key: '1',
    label: <PanelHeader title={scaleName} currentLUX={scaleLUX} currentUV={scaleUV} currentHumidity={scaleHumidity} currentTemp={scaleTemperature} />,
    children: <Containers container1Percent={container1Percent} container2Percent={container2Percent} container3Percent={container3Percent} 
            container4Percent={container4Percent} container1Name={container1Name} container2Name={container2Name} container3Name={container3Name}
            container4Name={container4Name} container1CurrMass={container1CurrMass} container2CurrMass={container2CurrMass}  container3CurrMass={container3CurrMass} 
            container4CurrMass={container4CurrMass} container1InitMass={container1InitMass} container2InitMass={container2InitMass} container3InitMass={container3InitMass} 
            container4InitMass={container4InitMass}/>,
    },
    {
    key: '2',
    label: <PanelHeader title="Shelf 2" currentLUX="23" currentUV="4" currentHumidity="65" currentTemp="24" />,
    children: <Containers container1Percent={34} container2Percent={65} container3Percent={89} 
            container4Percent={100} container1Name={'Container 1'} container2Name={'Container 2'} container3Name={'Container 3'}
            container4Name={'Container 4'} container1CurrMass={3} container2CurrMass={44}  container3CurrMass={78} container4CurrMass={75}
            container1InitMass={23} container2InitMass={34} container3InitMass={45} container4InitMass={87}/>,
    },
  ];

  return (
    <div>
      <Collapse items={items} defaultActiveKey={['1', '2']}/>
    </div>
  );
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ title, currentLUX, currentUV, currentHumidity, currentTemp }) => (
    <div>
        <h3 className="collapseTitle"> {title} </h3>
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

export default Shelves;