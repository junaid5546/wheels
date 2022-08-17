import { Injectable } from '@angular/core';
import '@capacitor-community/sqlite';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // THIS IS DM DATABASE OBJECT
  private dm_db: SQLiteObject;
  constructor(private sqlite: SQLite) { }

  //CREATE DATABASE
  createDatabase = async () => {
  await this.sqlite.create({
    name:'dm-db',
    location:"default"
  })
  .then((db:SQLiteObject)=>{
    this.dm_db  = db;
    console.info('Connected to DB ', this.dm_db);
  })
  .catch(error=>{
    console.error('error connecting to db: ', JSON.stringify(error))
  })
 }

 // CREATE TABLE FOR VEHICLE
 createVehicleTable = async () =>{
  await this.dm_db.executeSql(
    'CREATE TABLE IF NOT EXISTS vehicles (vehicle TEXT)',[]
  )
  .then((sql)=>{
    console.log("Creating vehicles table: ", sql);
  })
  .catch(error=>{
    console.error('Error creating vehicles table: ', error);
  })
 }

 // ADD DATA INTO VEHICLE
 insertIntoVehicle(obj:string){
  return this.dm_db.executeSql(
    `INSERT INTO vehicles (vehicle) VALUES  ('${obj}')`,[]
  )
  .then((sql)=>{
    console.log("inserting into vehicles: ", sql);
  })
  .catch(error=>{
    console.error("inserting into vehicles: ", error);
  })
 }

 // GET ALL VEHICLE FEED
 getVehicles(){
  return this.dm_db.executeSql(
    'SELECT * FROM vehicles',[]
  )
  .then(vehicle=>{
    
    for (let index = 0; index < vehicle.rows.length; index++) {
      console.log("GOT VEHICLES: ", vehicle.rows.item(index));
      
      
    }
      

    
  })
  .catch(error=>{
    console.error('ERROR GETTING VEHICLE: ', error);
  })
 }

}
