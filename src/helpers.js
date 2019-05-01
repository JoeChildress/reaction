import axios from 'axios';



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
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {console.log(res.data)})

}

export default helpers;