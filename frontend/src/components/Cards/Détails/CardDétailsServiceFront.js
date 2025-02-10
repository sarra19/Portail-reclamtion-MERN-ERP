import React, { useState, useEffect } from "react";
import SummaryApi from '../../../common';
import { useParams } from 'react-router-dom';
import { FaStar, FaRegStar, FaSmile, FaPaperclip, FaPaperPlane, FaThumbsUp, FaShare, FaComment } from 'react-icons/fa';

export default function CardDétailsServiceFront() {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [data, setData] = useState({ image: "", nom: "", description: "", prix: "" });
  const [likes, setLikes] = useState(42); // État pour les likes
  const [isLiked, setIsLiked] = useState(false); // État pour vérifier si l'utilisateur a aimé
  const [showComments, setShowComments] = useState(false); // État pour afficher/masquer les commentaires
  const [newComment, setNewComment] = useState(""); // État pour stocker le nouveau commentaire

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${SummaryApi.serviceDetails.url}/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const dataResponse = await response.json();
        setData(dataResponse?.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`${SummaryApi.getCommentsByService.url}/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const commentsResponse = await response.json();
        setComments(commentsResponse?.data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires :", error);
      }
    };

    fetchServiceDetails();
    fetchComments();
  }, [id]);

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return `publié il y a ${diff} sec `;
    if (diff < 3600) return `publié il y a ${Math.floor(diff / 60)} min `;
    if (diff < 86400) return `publié il y a ${Math.floor(diff / 3600)} h `;
    return `publié il y a ${Math.floor(diff / 86400)} jours`;
  };

  // Fonction pour gérer les likes
  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  // Fonction pour gérer l'affichage des commentaires
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // Fonction pour ajouter un nouveau commentaire
  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return; // Ne pas ajouter de commentaire vide

    const comment = {
      id: comments.length + 1, // Générer un ID unique (à adapter selon votre backend)
      text: newComment,
      user: "Utilisateur Actuel", // Remplacez par le nom de l'utilisateur connecté
    };

    setComments([...comments, comment]); // Ajouter le nouveau commentaire à la liste
    setNewComment(""); // Réinitialiser le champ de saisie
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-8/12">
        {loading ? (
          <p className="text-center text-gray-700">Chargement...</p>
        ) : (
          <>


            <div className="flex justify-center ">

              <img
                src={require(`assets/img/${data.image}`)}
                alt={data.nom}
                className="w-6/12 h-32 p-4 object-cover rounded-md"
              />
              <div className=" p-4 mt-24  ">
                <div className="mb-4">
                  <p className="text-xl font-semibold text-orange-dys flex justify-center">{data.nom}</p>
                </div>
                <p className=" font-normal text-gray-700 dark:text-gray-400 flex justify-center">{data.description}</p>
                <div className="mt-10">

                  <p className="font-semibold text-gray-900 dark:text-white flex justify-center">Prix: {data.prix} TND</p>              </div>
              </div>
            </div>

            {/* Section J'aime, Commenter, Partager */}
            <div className="flex items-center justify-between text-gray-500 border-t border-b py-2">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${isLiked ? 'text-blue-600' : 'text-gray-500'}`}
              >
                <FaThumbsUp className="w-5 h-5 mr-2" />
                <span>J'aime ({likes})</span>
              </button>
              <button
                onClick={toggleComments}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                <FaComment className="w-5 h-5 mr-2" />
                <span>Commenter</span>
              </button>

            </div>

            {/* Section des commentaires (affichée uniquement si showComments est true) */}
            {showComments && (
              <div className="mt-4">
                <hr className="mt-2 mb-2" />
                <p className="text-gray-800 font-semibold">Commentaires</p>
                <hr className="mt-2 mb-2" />
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-4">
                      <img
                        src={require(`assets/img/${comment.userId?.imageprofile}`)} alt="User Avatar"
                        className="w-8 h-8 mr-2 rounded-full"
                      />
                      <div>
                        <p className="text-gray-800 font-semibold">{comment.userId?.prenom} {comment.userId?.nom}</p>
                        <p className="text-gray-500 text-sm">{comment.contenu}</p>
                        <p className="text-gray-500 text-sm">{comment.fichierJoint}</p>
                        <p className="text-gray-400 text-xs mt-1">{getTimeAgo(comment.createdAt)}</p>


                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 w-full">Aucun commentaire disponible.</p>
                )}



                <form>
                  <label for="chat" class="sr-only">Your message</label>
                  <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                      <svg class="w-5 h-5 text-orange-dys " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                      </svg>
                      <span class="sr-only">Upload image</span>
                    </button>
                    <button type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                      <svg class="w-5 h-5 text-orange-dys " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                      </svg>
                      <span class="sr-only">Add emoji</span>
                    </button>
                    <textarea id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                    <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                    <i class="fas fa-paper-plane text-xl text-orange-dys transform rotate-45"></i>
                    <span class="sr-only">Send message</span>
</button>

                  </div>
                </form>

              </div>
            )}
          </>
        )}
      </div>
    </div >
  );
}