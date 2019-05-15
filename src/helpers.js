import axios from 'axios';
import ids from './ids'

const username= ids.ACCOUNT_SID;
const password= ids.AUTH_TOKEN;
const headers = {'Authorization': 'Basic ' + btoa(username + ':' + password)};

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
     },
     changeMode: function(){
         this.setState({
            gameMode: 'addAnswers'
         })
     }
}

function checkServer(state) {
    const getUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + username + '/Messages.json?DateSent=' + getTodayUTC();
    // const headers = {'Authorization': 'Basic ' + btoa(username + ':' + password)};
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
                getMessage(message.sid,state);
            } else {
                console.log('no messages within time limit');
            }

          }

        }
    })//END THEN
}

function getMessage(sid,state) {
    console.log('getMessage fired: ', sid);

    let getUrl = "https://api.twilio.com/2010-04-01/Accounts/" + username + "/Messages/" + sid + ".json";

    axios.get(getUrl, {headers: headers})
    .then(res => {
        
        console.log('MESSAGE RESPONSE: ',res.data.body) //TEXT MESSAGE
        console.log('MESSAGE RESPONSE NUMBER: ',res.data.from) //PHONE NUMBER
        console.log('MESSAGE RESPONSE RES: ',res) //ALL MESSAGE DATA

        //IF ADDPLAYER MODE THEN ADD NEW PLAYERS
        if (state.gameMode === "addPlayer") {
            console.log("data is being sorted for new players");
            //Player.add(data);
        }
    });

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
