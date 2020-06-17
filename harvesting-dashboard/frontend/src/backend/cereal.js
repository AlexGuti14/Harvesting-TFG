import {doGet} from "./common";

function getCerealData(params, callback){
  //console.log("### GetHistoryData", params);
  doGet("/cereal/aggregate", params, callback)
}


function getCerealMarkets(params, callback){
  doGet("/cereal/markets", params, callback)
}



export  {getCerealData,getCerealMarkets}
