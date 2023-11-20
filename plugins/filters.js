import Vue from 'vue'
import { gender } from '@/static/Enums'
export default ({ app }, inject) => {

    Vue.filter('dateWithoutTime', (value) => {
        if (value) {
            return value.substring(0, value.indexOf('T'));
        } else {
            return '';
        }
    });
    
    
    

    Vue.filter('dateWithTime', (value) => {
        return value.substring(0, value.concat('T', '00:00:00'));
    });

    Vue.filter('gender', (value) => {
        const item = gender.find((item) => item.id === value);
        return item.title;
    });

}