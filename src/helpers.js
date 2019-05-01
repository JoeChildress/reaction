import axios from 'axios';
import ids from './ids'

const helpers = {
    runEnterTimer: function() {
        this.myInterval = setInterval(() => {
         this.setState({
             count: this.state.count - 1
         })
         checkServer()
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

function checkServer() {
    console.log('_checkServer firing');
    
    // axios.get('https://jsonplaceholder.typicode.com/users')
    // .then(res => {console.log(res.data)})
    // console.log(ids.ACCOUNT_SID);

    let username= ids.ACCOUNT_SID;
    let password= ids.AUTH_TOKEN;
    let getUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + username + '/Messages.json?DateSent=' + getTodayUTC();
    let headers = {'Authorization': 'Basic ' + btoa(username + ':' + password)};

    //let getUrl = 'https://jsonplaceholder.typicode.com/users';

    axios.get(getUrl, {headers: headers})
    .then(res => {console.log(res.data)})

}

//get UTC Time
function getTodayUTC() {
    var now = new Date();
    var today = now.getUTCFullYear().toString();
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