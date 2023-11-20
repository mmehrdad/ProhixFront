export default async function ({ redirect, store }) {
    
    const isAuthen = localStorage.getItem("userToken");
    if (!isAuthen)
        return redirect('/Applicant/account/login');
    else {
        const userinfo =await store.dispatch("getUserInfo", '', { root: true });
        if(userinfo.role!=='Student')
            return redirect('/Applicant/account/login');
        
    }
}