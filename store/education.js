export const state = () => ({
    changed: false
})
export const mutations = {
    dataChanged(state) {
        state.changed = true;
    },
    reset(state){
        state.changed=false;
    }

}