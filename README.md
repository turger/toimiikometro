# Is metro working?

Shows alert messages if metro is not working.

### Set up 
* In project root set up firebase  
`yarn install -g firebase-tools`  
`firebase login`  
`firebase init` (hosting & functions, no overwrite)  

### Run locally
`firebase serve --only functions` //if needed  
`yarn start`

### Deploy to firebase
`yarn deploy`  
or  
`yarn build`  
`firebase deploy --only hosting`
