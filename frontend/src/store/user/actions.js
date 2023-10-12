import axios from 'axios'

export default {
    //calling to mutation to update login status
    LoggedIn(context) {
        context.commit('LoggedIn')
    },

    //calling to mutation to update loggedout status
    disableLogin(context) {
        context.commit('disableLogin')
    },

    //calling to mutation to update error message
    displayError(context, payload) {
        context.commit('displayError', payload)
    },


    //checking if the user is authorized
    async checkAuth(context, payload) {
        try {
            await axios.post('http://localhost:3000/login', payload)   //passing login details to the database
            .then(response=> {
                console.log(response.data)
                if(response.data === 'authorized'){
                    context.commit('LoggedIn')   //setting login status to true
                }
                    context.commit('displayError', "Please Enter Valid Details")   //setting error message
            })
        }

        catch (e) {
            console.log(e)
        }
    }

}