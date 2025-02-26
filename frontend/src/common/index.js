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
        url: `${backendDomin}/getAllUser`,
        method: 'get'
    },
    getUser: {
        url: `${backendDomin}/getUser`,
        method: 'get'
    },

    getUserByReclamationId: {
        url: `${backendDomin}/getUserByReclamationId`,
        method: 'get'
    },
    updateUserRole: {
        url: `${backendDomin}/updateUserRole`,
        method: "put"
    },
    deleteUser: {
        url: `${backendDomin}/deleteUser`,  // Ensure this is correct
        method: 'DELETE'
      },
    
 
    serviceDetails: {
        url: `${backendDomin}/getServiceDetails`,
        method: "get"
    },
    AddReclamation: {
        url: `${backendDomin}/addReclamation`,
        method: "post"
    },
    getAllReclamation: {
        url: `${backendDomin}/getAllReclamation`,
        method: "get"
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
    addLikeService: {
        url: `${backendDomin}/addLikeService`,
        method: 'post'
    },
    getLikeStatus: {
        url: `${backendDomin}/getLikeStatus`,
        method: 'get'
    },
    getLikeStatusService: {
        url: `${backendDomin}/getLikeStatusService`,
        method: 'get'
    },
    DeleteLikeProduct: {
        url: `${backendDomin}/DeleteLikeProduct`,
        method: 'put'
    },
    deleteComment: {
        url: `${backendDomin}/deleteComment`,
        method: 'delete'
    },

    //réponse

    addReponse: {
        url: `${backendDomin}/addReponse`,
        method: 'post'
    },
    detailsReclamation: {
        url: `${backendDomin}/detailsReclamation`,
        method: 'get'
    },
    allService: {
        url: `${backendDomin}/getAllService`,
        method: 'get'
    },

    //reset
    sendRecoveryEmail: {
        url: `${backendDomin}/password-reset/send_recovery_email`,
        method: 'post'
    },
    resetPassword: {
        url: `${backendDomin}/password-reset/change`,
        method: 'post'
    },

}


export default SummaryApi