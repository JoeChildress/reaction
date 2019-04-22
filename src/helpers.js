

const helpers = {
    runEnterTimer: function() {
        this.myInterval = setInterval(() => {
         this.setState({
             count: this.state.count - 1
         })
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



}

export default helpers;