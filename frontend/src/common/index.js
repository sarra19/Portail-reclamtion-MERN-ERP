const backendDomin = process.env.REACT_APP_BACKEND_URL//"http://localhost:8080"

const SummaryApi = {
    signUP: {
        url: `${backendDomin}/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomin}/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomin}/userLogout`,
        method: 'get'
    },
    allUser: {
        url: `${backendDomin}/all-user`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomin}/update-user`,
        method: "post"
    },
    delete_user: {
        url: `${backendDomin}/delete-user`,
        method: 'DELETE'
    }
}


export default SummaryApi