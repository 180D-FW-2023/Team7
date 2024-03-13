import React, { useEffect, useState }from 'react';
import { fetchData } from './firebaseService';
import { CollapseProps, Tooltip, Button, Input } from 'antd';
import { Collapse, Row, Col, Tag } from 'antd';
import { WarningTwoTone, EditOutlined, CloseCircleOutlined, BulbOutlined, SunOutlined, CloudOutlined } from '@ant-design/icons';
import { WiThermometer } from "react-icons/wi";
import { BsDroplet, BsThermometerHalf, BsSun, BsLightbulb } from "react-icons/bs";
import { PiLightbulb } from "react-icons/pi";

import Containers from './Containers';
import './Shelves.css';
import Container from './Container';
// import { sendShelfDataToFirebase } from './firebaseService';

interface ShelfHeaderProps {
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

const ShelfHeader: React.FC<ShelfHeaderProps> = ({ initialTitle, currentLUX, currentUV, currentHumidity, currentTemp, outOfRangeLUX, outOfRangeUV,
  outOfRangeHumidityHigh, outOfRangeHumidityLow, outOfRangeTemperatureHigh, outOfRangeTemperatureLow, scaleTilted, inputTitle }) => {

  let tooltipWarningMessage: string = "";
  if (scaleTilted)
  {
    tooltipWarningMessage += "<li>- Shelf Tilted. Please check shelf.</li>"
  }

  if (outOfRangeLUX)
  {
    tooltipWarningMessage += "<li>- High LUX detected. Please move shelf out of light.</li>";
  }

  if(outOfRangeUV)
  {
    tooltipWarningMessage += "<li>- High UV detected. Please move shelf out of UV light.</li>";
  }

  if(outOfRangeHumidityHigh)
  {
    tooltipWarningMessage += "<li>- High humidity detected. Please move shelf out of humidity.</li>";
  }

  if(outOfRangeHumidityLow)
  {
    tooltipWarningMessage += "<li>- Low humidity detected. Please increase humidity in shelf.</li>";
  }

  if(outOfRangeTemperatureHigh)
  {
    tooltipWarningMessage += "<li>- High temperature detected. Please move shelf to cooler location.</li>";
  }

  if(outOfRangeTemperatureLow)
  {
    tooltipWarningMessage += "<li>- Low temperature detected. Please move shelf to warmer location.</li>";
  }

  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

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
  console.log("header title:", title)
  const handleClickInput = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }

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
            {tooltipWarningMessage ? 
              <Tooltip 
                title={<span dangerouslySetInnerHTML={{__html: tooltipWarningMessage}}/>}
                color={"#FF2400"}>
                <WarningTwoTone style={{marginLeft: '20px'}} twoToneColor={"#FF2400"}/>
              </Tooltip> : ""
            }
          </div>
          :
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '5px' }}>{title}</span>
            <Button type="text" style={{ padding: '0px' }} onClick={onEdit}>
              <EditOutlined style={{ fontSize: '15px', paddingLeft: '0px' }} />
            </Button>
            {tooltipWarningMessage ? 
              <Tooltip 
                title={<span dangerouslySetInnerHTML={{__html: tooltipWarningMessage}}/>}
                color={"#FF2400"} 
                >
                <WarningTwoTone style={{marginLeft: '20px'}} twoToneColor={"#FF2400"}/>
              </Tooltip> : ""
            }  
          </div>
          }
          {/* {tooltipWarningMessage ? 
            <Tooltip 
              title={<span dangerouslySetInnerHTML={{__html: tooltipWarningMessage}} />}>
              <WarningTwoTone />
            </Tooltip> : ""
          }      */}
        </h3>
        <Row gutter={[16,16]} justify="center" align="middle" style={{paddingTop: '15px', paddingBottom: '10px'}}>
          <Col span={5}>
            <Tag icon={<BsLightbulb />} color={'geekblue'}> Current LUX: {currentLUX}</Tag>
          </Col>
          <Col span={5}>
            <Tag icon={<BsSun />} color={'volcano'}> Current UV: {currentUV}</Tag>
          </Col>
          <Col span={6}>
            <Tag icon={<BsDroplet/>} color={'blue'}> Current Humidity: {currentHumidity}%</Tag>
          </Col>
          <Col span={7}>
            <Tag icon={<BsThermometerHalf />} color={'purple'}> Current Temperature: {currentTemp} °C</Tag>
          </Col>
        </Row>
    </div>
  );
}

export default ShelfHeader;