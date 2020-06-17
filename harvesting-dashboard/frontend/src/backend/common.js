import moment from "moment";
//const base = "http://192.168.99.100:7081"
//const base = "http://localhost:7081"
const base = "http://51.210.10.251:7081"


function parseDate(date) {
    return `${moment(date).format('Wo')} ${moment(date).startOf('isoWeek').format("DD")}-${moment(date).endOf('isoWeek').format("DD")}/${moment(date).format("MM YYYY")}`;
}

function getWeekDays(date){
    const startOfWeek = moment(date).startOf('isoWeek');
    const endOfWeek = moment(date).endOf('isoWeek');

    const days = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
        days.push(day.toDate());
        day = day.clone().add(1, 'd');
    }
    return days

}

async function doGet(path, params, callback){
    const url = new URL(path, base)
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    //console.log("###doGet###")
    try{
        let response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
        })
        let data = await response.json()
        callback(data)
    }catch(err){
        //console.log("Error doGet", err)
    }

}
async function doPost(path, params, body, callback){
    const url = new URL(path, base)
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    //console.log("###doPost###",url)
    try{
        let response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        })
        let data = await response.json()
        callback(data)
    }catch(err){
        //console.log("error doPost", err)
    }
}

async function doDelete(path, params, callback){
    const url = new URL(path, base)
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    //console.log("###doDELETE###",url)
    try{
        let response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
        })
        let data = await response.json()
        //console.log("Response ", data)
        callback(data);
    }catch (err) {
        //console.log("error doDelete", err)
    }


}

export {parseDate, doGet, doPost, doDelete, getWeekDays}