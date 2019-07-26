
import logo from './logo.svg';
import './App.css';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { CouchbaseLite } from '@ionic-native/couchbase-lite';
import axios from 'axios';
import { Observable } from 'rxjs';
import { fetchApplicationAccessToken, fetchConfigurations } from './configurations'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
//import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';



import {
  IonApp, 
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonFabButton,
  IonCard,
  IonLabel,
  IonButton,
  IonFab,
  IonIcon
} from '@ionic/react';
import React, { Component } from 'react';
import { tsExpressionWithTypeArguments } from '@babel/types';
import { string } from 'prop-types';

const { Modals } = Plugins;



class App extends Component {
 
  constructor(props) {
    super(props);
    console.log("Nikunjconstructor ");
    this.state = {
      photo: null,
    };
   // this.sanitizer = DomSanitizer;
    this.callNumber = CallNumber;
    //this.photo = safeImageUrl;
    this.showConfirm = this.showConfirm.bind(this);
    this.couchbase = CouchbaseLite;
    this.document = {
      _id:'You can either specify the document ID (must be string) else couchbase generates one for your doc',
      data:{name:'sandman',age:25,city:'pune'}
      };
    //this.platform = Platform;
    //this.http = Http;  
    this.url = "";  
    
    this.initMethod = this.initMethod.bind(this);
    this.getUrl = this.getUrl.bind(this);

    this.createDatabase = this.createDatabase.bind(this);
    this.deleteDatabase = this.deleteDatabase.bind(this);
    this.getAllDbs = this.getAllDbs.bind(this);
    this.getAllDocuments = this.getAllDocuments.bind(this);

    this.createDocument = this.createDocument.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.fetchConfigurations = this.fetchConfigurations.bind(this);
    this.setUserNamePassword = this.setUserNamePassword.bind(this);
    this.initReplicate = this.initReplicate.bind(this);
    
    this.initMethod();
  }
  
  

 initMethod() {
  //console.log("Nikunjinitmethod ");
    this.couchbase.getURL().then((url)=> {
        this.url = url;
        console.log("Nikunju " + url);
    })
 }
 getUrl() {
      return this.url;
 }


 // DATABASES //
createDatabase(database_name) {
  let url = this.getUrl();
  url = url+database_name;
  return axios.put(url)
    .then(
      
      (response) => { this.results = response['results'];console.log("Nikunjr " + JSON.stringify(response))  },
	    (error) => { console.log(error) }
      )
    
}
deleteDatabase(database_name) {
  let url = this.getUrl();
  url = url+database_name;
  return axios
    .delete(url)
    .then(
      
      (response) => { this.results = response['results'] },
	    (error) => { console.log(error) }
      )
}
getAllDbs() {
  let url = this.getUrl();
  url = url+'_all_dbs';
  return axios
    .get(url)
    .then(
      
      (response) => { this.results = response['results'] },
	    (error) => { console.log(error) }
      )
}

setUserNamePassword(database_name,username,password,channels){
  let url = this.getUrl();
  // include_docs=true will include a doc inside response, it is false by default
  url = url + database_name + '/_user/'+username;
  let document = {"name": username,
  "password": password,
  admin_channels : channels
};
  return axios
    .put(url,document)
    .then(
      
      (response) => { this.results = response['results']; console.log("Nikunjsetuser " + JSON.stringify(response)) },
	    (error) => { console.log(error) }
      )       
}

initReplicate(database_name,targetdabaseurl){
  let url = this.getUrl();
  // include_docs=true will include a doc inside response, it is false by default
  url = url  + '_replicate';
  let databaseUrl = this.getUrl();
  // include_docs=true will include a doc inside response, it is false by default
  databaseUrl = databaseUrl + database_name
  let document = {"continuous": false,
  "create_target": false,
  "source": {
    "url": databaseUrl
  },
  "target": targetdabaseurl,
};
  return axios
    .put(url,document)
    .then(
      
      (response) => { this.results = response['results']; console.log("Nikunjreplicate " + JSON.stringify(response)) },
	    (error) => { console.log(error) }
      )       
}

// DOCUMENTS //
getAllDocuments(database_name){
  let url = this.getUrl();
  // include_docs=true will include a doc inside response, it is false by default
  url = url + database_name + '/_all_docs?include_docs=true';
  return axios
    .get(url)
    .then(
      
      (response) => { this.results = response['results'] },
	    (error) => { console.log(error) }
      )       
}
createDocument(database_name,document){
  let url = this.getUrl();
  url = url + database_name;
  return axios
    .post(url,document)
    .then(
      
      (response) => { this.results = response['results']},
	    (error) => { console.log("Nikunje " +error) }
      )        
}

updateDocument(database_name ,document){
  let url = this.getUrl();
  url = url + database_name + '/' + document._id;
  return axios
    .put(url,document)
    .map(data => { this.results = data['results'] })
    .then(
      
      (response) => { this.results = response['results'] },
	    (error) => { console.log(error) }
      )
}
// for updation of document your document must contain most recent rev(revision) id.
// for each updation of document new rev id is get generated
// successful response { "id": "string","rev": "string(new revision id)","ok": true }
deleteDocument(database_name,document){
  let url = this.getUrl();
  url = url + database_name + '/' + document._id ;//+'?rev='+doc._rev;
  return axios
    .delete(url)
    .then(
      
      (response) => { this.results = response['results'] },
	    (error) => { console.log(error) }
      )
}

async showConfirm() {
  let confirmRet = await Modals.confirm({
    title: 'Confirm',
    message: 'call '+ '9711069325'
  });
  console.log('Confirm ret', confirmRet);
  if(confirmRet)
  {
    console.log('Nikunj1');
    try{
    this.callNumber.callNumber("9711069325", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}catch(e){
  console.log('Nikunjerror', e);        
}
  console.log('Nikunj2');
  }
}

/*
  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    console.log(image);
    //this.setState({photo: image});
    this.state.photo = image.dataUrl;//this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    const img = document.createElement('img')
    img.src = image.dataUrl;
  }

  */
  
 async fetchConfigurations () {
  let applicationAccessToken = await fetchApplicationAccessToken()
  let configurations = await fetchConfigurations(applicationAccessToken)
  
  let urls = {}
  
  let modulesURL = {}
  let globalConfigurations = {}
  let couchbaseConfigurations = {}
  let themeConfigurations = {}
  let pinConfigurations = {}
  
  if (configurations != null) {
    configurations.forEach(c => {
      if (c.Name.startsWith('url.path.')) {
        urls[c.Name.replace('url.path.', '')] = c.Value
      }
     
      if (c.Name.startsWith('globals.')) {
        globalConfigurations[c.Name.replace('globals.', '')] = c.Value
      }
      if (c.Name.startsWith('url.module.')) {
        const moduleCode = c.Name.replace('url.module.', '').toUpperCase()
        if (!modulesURL[moduleCode]) {
          modulesURL[moduleCode] = c.Value
        }
      }
      if (c.Name.startsWith('couchbase.')) {
        couchbaseConfigurations[c.Name.replace('couchbase.', '')] = c.Value
      }
      if (c.Name.startsWith('theme.')) {
        themeConfigurations[c.Name.replace('theme.', '')] = c.Value
      }
      if (c.Name.startsWith('pin.')) {
        pinConfigurations[c.Name.replace('pin.', '')] = c.Value
      }
    })
    if (couchbaseConfigurations.channels) {
      couchbaseConfigurations.channels = couchbaseConfigurations.channels.split(', ')
    } else {
      console.error('couchbaseConfigurations is empty')
    }
  }
  console.error('nikunj couchbaseConfigurations is ' + JSON.stringify(couchbaseConfigurations))
  
}

  render() {
    console.log("Nikunjrender1 ");
      //this.createDocument('justbe', document);
        this.createDatabase('GOT');

       this.fetchConfigurations();
      
      console.log("Nikunjrender2 ");
      // successful response { "id": "string","rev": "string","ok": true }
  return (
   
<div className='button__container'>
        <button className='button' onClick={this.showConfirm}>
          Click Me
        </button>
      </div>
  );
  }
}

export default App;
