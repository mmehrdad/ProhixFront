export default async function ({ redirect, store }) {

    const isAuthen = localStorage.getItem("userToken");
    if (!isAuthen)
        return redirect('/Applicant/Account/login');
    else {
        const userinfo = await store.dispatch("getUserInfo", '', { root: true });
        if (userinfo.role !== 'Teacher')
            return redirect('/Supervisor/Account/login');

    }
}