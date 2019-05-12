import axios from 'axios';
import ids from './ids'

const helpers = {
    runEnterTimer: function() {
        this.myInterval = setInterval(() => {
         this.setState({
             count: this.state.count - 1
         })
         checkServer(this.state)
         }, 1000)
     },
     checkEnterTimer: function() {
        if (this.state.count <= -1){
            clearInterval(this.myInterval)
            this.setState({
                start: true
            })

       }
     }
}

function checkServer(state) {

    const username= ids.ACCOUNT_SID;
    const password= ids.AUTH_TOKEN;
    const getUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + username + '/Messages.json?DateSent=' + getTodayUTC();
    const headers = {'Authorization': 'Basic ' + btoa(username + ':' + password)};
    const smsInbound = [];

    axios.get(getUrl, {headers: headers})
    .then(res => {

        const messages = res.data.messages;
          //console.log('messages: ',messages)

        for (let i = 0; i < messages.length; i++) {
          const message = messages[i];

          //INBOUND ONLY
          if (message.direction === 'inbound' && message.status === 'received'){
            
            //DATE SET INTO DATE OBJ TO COMPARE
            const mDate = new Date(message.date_sent);

            console.log(message.sid, i);
            console.log(message.direction, i)
            console.log('mDate: ', mDate)
            console.log('smsInbound from checkServer(): ');
            console.log(smsInbound);

            //COMPARE DATE AND CHECK FOR EXISTING SID
            if (mDate > state.timeStamp && !smsInbound.hasOwnProperty(message.sid)) {
                console.log('incoming message after timestamp');
                smsInbound[message.sid] = false;
                //getMessage(message.sid);
                console.log(smsInbound)
            } else {
                console.log('no messages within time limit');
            }

          }

        }
    })//END THEN
}

//get UTC Time
function getTodayUTC() {
    let now = new Date();
    let today = now.getUTCFullYear().toString();
    today = today.concat("-");
    if (now.getUTCMonth() < 9) {
        today = today.concat("0");
    }
    today = today.concat((now.getUTCMonth() + 1).toString());
    today = today.concat("-");
    if (now.getUTCDate() < 10) {
        today = today.concat("0");
    }
    today = today.concat(now.getUTCDate());
    return today;
}



export default helpers;


/*
{sid: "SM6c219d043e6d5081239d61e97f869ed1", date_created: "Sun, 12 May 2019 19:24:48 +0000", date_updated: "Sun, 12 May 2019 19:24:48 +0000", date_sent: "Sun, 12 May 2019 19:24:48 +0000", account_sid: "AC0b3b1065617915c63b91e44d2b8f51b4", …}

*/