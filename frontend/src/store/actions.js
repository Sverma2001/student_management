export default {
    changeFormStatus(context){
        context.commit('changeFormStatus');
    },

    changeEditStatus(context, payload){
        context.commit('changeEditStatus', payload);
    },

    disableEdit(context){
        context.commit('disableEdit');
    }
}