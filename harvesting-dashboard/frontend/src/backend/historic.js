import {doGet} from "./common";

function getHistoryData(params, callback){
  //console.log("### GetHistoryData", params);
  doGet("/historical/aggregate", params, callback)
}

function getEuropeData(params, callback){
  //console.log("### GetHistoryData", params);
  doGet("/historical/europe", params, callback)
}



export  {getHistoryData, getEuropeData}
