import firebase from './firebase';

interface AllContainerData {
    containerID: string;
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

interface shelfData {
    shelfID: string;
    title: string;
  }

const database = firebase.database();

export const fetchData = async () => {
  try {
    const snapshot = await database.ref().once('value');
    return snapshot.val();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// export const sendDataToFirebase = (maxLUX: number, maxUV: number, maxHumidity: number, minHumidity: number, 
//     maxTemperature: number, minTemperature: number) => {
//     console.log("Sent?", maxUV, maxLUX, maxTemperature, maxHumidity, minTemperature, minHumidity)
//     database.ref('Scale_1').push().set({
//       ["Max Storage Humidity"]: maxHumidity,
//       ["Max Storage Lux"]: maxLUX,
//       ["Max Storage Temperature"]: maxTemperature,
//       ["Max Storage UV"]: maxUV,
//       ["Min Storage Humidity"]: minHumidity,
//       ["Min Storage Temperature"]: minTemperature
//     });
//   };

export const sendContainerDataToFirebase = (containerData: AllContainerData[]) => {
    containerData.forEach(container => {
        const { containerID, inputLUXValue, inputUVValue , inputMaxHumid, inputMinHumid, inputMaxTemp, inputMinTemp, 
                inputLUXBool, inputUVBool, inputHumidBool, inputTempBool} = container;
        // console.log("Sent?", containerID, inputLUXValue, inputUVValue)
        // Depending on your container data structure, you can extract other relevant information here

        // Now you can push this data to your Firebase database
        database.ref(`Scale_1/${containerID}`).update({
            ["Max Storage Lux"]: inputLUXValue,
            ["Max Storage UV"]: inputUVValue,
            ["Max Storage Humidity"]: inputMaxHumid,
            ["Min Storage Humidity"]: inputMinHumid,
            ["Max Storage Temperature"]: inputMaxTemp,
            ["Min Storage Temperature"]: inputMinTemp,
            ["Lux Bool"]: inputLUXBool,
            ["UV Bool"]: inputUVBool,
            ["Humidity Bool"]: inputHumidBool,
            ["Temperature Bool"]: inputTempBool,
            // Other relevant data fields for this container
        });
    });
};

export const sendShelfDataToFirebase = (shelfData: shelfData[]) => {
    shelfData.forEach(shelf => {
        const { shelfID, title} = shelf;
        // console.log("Sent?", containerID, inputLUXValue, inputUVValue)
        // Depending on your container data structure, you can extract other relevant information here
        console.log("title", title)
        // Now you can push this data to your Firebase database
        database.ref(`${shelfID}`).update({
            
            ["Scale Name"]: title,
            // Other relevant data fields for this container
        });
    });
};
