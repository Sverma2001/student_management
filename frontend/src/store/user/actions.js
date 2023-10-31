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
            return response;
        }
        catch (error) {
            console.error(error);
        }
    },

    //checking if the user is authorized
    async checkAuth(context, payload) {
        try {
            const response = await axios.post('http://localhost:3000/login', payload);
            const token = response.data.token;
            localStorage.setItem('token', token);
            if (response.data.token) {
                //setting login status to true
                context.commit('LoggedIn');
            }
            else
                //setting error message
                context.commit('displayError', response.data.error);
        }

        catch (error) {
            context.commit('displayError', error.response.data.errMessage);
        }
    }
}