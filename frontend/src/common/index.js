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
    getUser: {
        url: `${backendDomin}/getUser`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomin}/update-user`,
        method: "post"
    },
    delete_user: {
        url: `${backendDomin}/delete-user`,
        method: 'DELETE'
    },
    allService: {
        url: `${backendDomin}/getAllService`,
        method: 'get'
    },
    serviceDetails: {
        url: `${backendDomin}/getServiceDetails`,
        method: "get"
    },
    AddReclamation: {
        url: `${backendDomin}/addReclamation`,
        method: "post"
    },
    allProduit: {
        url: `${backendDomin}/getAllProduit`,
        method: 'get'
    },
    productDetails: {
        url: `${backendDomin}/getProductDetails`,
        method: "get"
    },
    allReclamation: {
        url: `${backendDomin}/getAllReclamation`,
        method: 'get'
    },
    mesReclamations: {
        url: `${backendDomin}/mesReclamations`,
        method: 'get'
    },
    addCommentaire: {
        url: `${backendDomin}/addCommentaire`,
        method: 'post'
    },
    getAllCommentaire: {
        url: `${backendDomin}/getAllCommentaire`,
        method: 'get'
    }, 
    getCommentsByService: {
        url: `${backendDomin}/getCommentsByService`,
        method: 'get'
    },
    getCommentsByProduct: {
        url: `${backendDomin}/getCommentsByProduct`,
        method: 'get'
    },
    addLikeProduct: {
        url: `${backendDomin}/addLike`,
        method: 'post'
    },
    getLikeStatus: {
        url: `${backendDomin}/getLikeStatus`,
        method: 'get'
    },
    DeleteLikeProduct: {
        url: `${backendDomin}/DeleteLikeProduct`,
        method: 'put'
    },


}


export default SummaryApi