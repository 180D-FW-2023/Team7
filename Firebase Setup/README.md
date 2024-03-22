The Code 

Contains the ```firebaseSetup.py``` setup script and ```scale_info.json``` which contains the structure of the Firebase real time database. The ```firebaseSetup.py``` must be run once per scale to set up the real time database prior to use, be sure to follow the comments in the file to ensure the database is configured correctly. Please note you will need to provide a json file with your real time database API keys in this folder.

Replace the following: 
``` 
ece-180-project-firebase-adminsdk-7eg04-74b6c29e0b.json

https://ece-180-project-default-rtdb.firebaseio.com/
``` 
with the proper information for your realtime database. 

Additional help can be found at the following links:
```
https://www.freecodecamp.org/news/how-to-get-started-with-firebase-using-python/

https://firebase.google.com/docs/database 
```

Credit

The creation of this code was made possible with the help of Free Code Camp's online resoruces. 

```
https://www.freecodecamp.org/news/how-to-get-started-with-firebase-using-python/
```


Future

In the future this code should prompt the user for the number of systems they wish to setup the database for and automatically update the database accordingly. 
