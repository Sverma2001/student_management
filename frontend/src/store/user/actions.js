import axios from 'axios';

export default {
    //calling to mutation to update login status
    LoggedIn(context) {
        context.commit('LoggedIn');
    },

    //calling to mutation to update loggedout status
    disableLogin(context) {
        context.commit('disableLogin');
    },

    //calling to mutation to update error message
    displayError(context, payload) {
        context.commit('displayError', payload);
    },

    //signup user
    async addUser(context, formdata) {
        try {
            const response = await axios.post('http://localhost:3000/signup', formdata);
            console.log("Response",response);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    },

    //checking if the user is authorized
    async checkAuth(context, payload) {
        console.log("payload",payload);
        try {
            const response = await axios.post('http://localhost:3000/login', payload);

            const token = response.data.token;
            localStorage.setItem('token', token);
            if (response.data.token) {
                context.commit('LoggedIn');   //setting login status to true
            }
            else
                context.commit('displayError', "Please Enter Valid Details") ;  //setting error message
        }

        catch (error) {
            console.log("An error occurred:", error);
            context.commit('displayError', "An error occurred during login");
        }
    }
}