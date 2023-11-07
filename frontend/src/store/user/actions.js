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
    loginError(context, payload) {
        context.commit('loginError', payload);
    },

    clearSignupError(context) {
        context.commit('clearSignupError');
    },

    //signup user
    async addUser(context, formdata) {
        try {
            const response = await axios.post('http://localhost:3000/signup', formdata);
            return response;
        }
        catch (error) {
            const data = error.response?.data;
            if (data && (data.includes('username already exists') || data.includes('should not contain'))) {
                context.commit('signupError', data);
            }
            return error.response;
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
                context.commit('loginError', response.data.error);
        }
        catch (error) {
            context.commit('loginError', error.response.data.errMessage);
        }
    }
}