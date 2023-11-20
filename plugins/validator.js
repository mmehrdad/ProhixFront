const validator = {

    numberRule: [
        (v) => !!v || 'مقدار این فیلد را وارد نمایید',
        (v) => /^\d+$/.test(v) || 'فقط اعداد مجاز است',
    ],
    normalRules: [
        v => {
            return v
                ? (typeof v === 'number' ? !!v : false) ||
                (typeof v === 'string' ? v.length > 0 : false) ||
                (typeof v === 'object' ? Object.entries(v).length > 0 : false) ||
                'Field required'
                : ' Field required'
        },
    ],
    justEnglish: [
        (v) =>
            /^[a-zA-Z0-9_^@~{}|?:/\\ -.*]+$/.test(v) || 'حروف فارسی مجاز نیست',
    ],

    emailRule: [
        (v) => !!v || ' Email required ',
        (v) => /.+@.+\..+/.test(v) || 'Email not valid',
    ],

}

export default ({ app }, inject) => {

    inject('validator', validator);

}