import firebase from './firebase';

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

interface easterEggData {
  eggName: string;
  eggState: boolean;
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

export const sendDataToFirebase = (shelfData: ShelfData[]) => {
    shelfData.forEach(shelf => {
        const { shelfID, shelfTitle, containerID, containerName, inputLUXValue, inputUVValue , inputMaxHumid, inputMinHumid, inputMaxTemp, inputMinTemp, 
                inputLUXBool, inputUVBool, inputHumidBool, inputTempBool} = shelf;
        // console.log("Sent?", containerID, inputLUXValue, inputUVValue)
        // Depending on your container data structure, you can extract other relevant information here

        // Now you can push this data to your Firebase database
        database.ref(`${shelfID}`).update({
            [`${containerID}/Max Storage Lux`]: inputLUXValue,
            [`${containerID}/Max Storage UV`]: inputUVValue,
            [`${containerID}/Max Storage Humidity`]: inputMaxHumid,
            [`${containerID}/Min Storage Humidity`]: inputMinHumid,
            [`${containerID}/Max Storage Temperature`]: inputMaxTemp,
            [`${containerID}/Min Storage Temperature`]: inputMinTemp,
            [`${containerID}/Lux Bool`]: inputLUXBool,
            [`${containerID}/UV Bool`]: inputUVBool,
            [`${containerID}/Humidity Bool`]: inputHumidBool,
            [`${containerID}/Temperature Bool`]: inputTempBool,
            [`${containerID}/Container Name`]: containerName,
            ["Scale Name"]: shelfTitle,
            // Other relevant data fields for this container
        });
    });
};

export const sendEasterEggDataToFirebase = (eggData: easterEggData[]) => {
  eggData.forEach(egg => {
      const { eggName, eggState } = egg;
      // console.log("Sent?", containerID, inputLUXValue, inputUVValue)
      // Depending on your container data structure, you can extract other relevant information here

      // Now you can push this data to your Firebase database
      database.ref(`${eggName}`).update({
          ["Toggle"]: eggState,
          // Other relevant data fields for this container
      });
  });
};

// export const sendShelfDataToFirebase = (shelfData: shelfData[]) => {
//     shelfData.forEach(shelf => {
//         const { shelfID, title} = shelf;
//         // console.log("Sent?", containerID, inputLUXValue, inputUVValue)
//         // Depending on your container data structure, you can extract other relevant information here
//         console.log("title", title)
//         // Now you can push this data to your Firebase database
//         database.ref(`${shelfID}`).update({
            
//             ["Scale Name"]: title,
//             // Other relevant data fields for this container
//         });
//     });
// };
