import React, { useState, useEffect } from "react";
import SummaryApi from '../../../common';
import { useParams } from 'react-router-dom';
import { FaSmile, FaPaperclip, FaThumbsUp, FaTimes, FaComment } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadFile from '../../../helpers/uploadFile';

export default function CardDétailsServiceFront() {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [data, setData] = useState({ image: "", nom: "", description: "", prix: "" });
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user details
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setCurrentUser(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details.");
    }
  };
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "" && !selectedFile) return;

    const formData = {
      contenu: newComment,
      serviceId: id,
      fichierJoint: [],
    };

    if (selectedFile) {
      const fileUploadResponse = await uploadFile(selectedFile);
      formData.fichierJoint.push(fileUploadResponse.url); 
    }

    try {
      const response = await fetch(SummaryApi.addCommentaire.url, {
        method: SummaryApi.addCommentaire.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        const newCommentData = {
          contenu: newComment,
          fichierJoint: selectedFile ? [formData.fichierJoint[0]] : [],
          userId: {
            prenom: currentUser?.prenom,
            nom: currentUser?.nom,
            imageprofile: currentUser?.imageprofile,
          },
          createdAt: new Date().toISOString(),
        };
        setComments((prevComments) => [newCommentData, ...prevComments]);
        toast.success(result.message);
        setNewComment("");
        setSelectedFile(null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
      toast.error("Une erreur s'est produite lors de l'ajout du commentaire.");
    }
  };
 

  useEffect(() => {
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
    fetchCurrentUser();
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

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX files
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an image (JPEG, PNG, GIF, PDF, DOC, DOCX).");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size exceeds the limit of 5MB.");
      return;
    }

    setSelectedFile(file);
    toast.success("File selected successfully!");
  };

  const handleEmojiClick = (emojiObject) => {
    setNewComment(newComment + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <ToastContainer position='top-center' />
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-8/12">
        {loading ? (
          <p className="text-center text-gray-700">Chargement...</p>
        ) : (
          <>
            <div className="flex justify-center">
              <img
                src={require(`assets/img/${data.image}`)}
                alt={data.nom}
                className="w-6/12 h-32 p-4 object-cover rounded-md"
              />
              <div className="p-4 mt-24">
                <div className="mb-4">
                  <p className="text-xl font-semibold text-orange-dys flex justify-center">{data.nom}</p>
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400 flex justify-center">{data.description}</p>
                <div className="mt-10">
                  <p className="font-semibold text-gray-900 dark:text-white flex justify-center">Prix: {data.prix} TND</p>
                </div>
              </div>
            </div>

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

            {showComments && (
              <div className="mt-4">
                <hr className="mt-2 mb-2" />
                <p className="text-gray-800 font-semibold">Commentaires</p>
                <hr className="mt-2 mb-2" />
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-4">
                      <img
                        src={require(`assets/img/${comment.userId?.imageprofile}`)}
                        alt="User Avatar"
                        className="w-8 h-8 mr-2 rounded-full"
                      />
                      <div>
                        <p className="text-gray-800 font-semibold">{comment.userId?.prenom} {comment.userId?.nom}</p>
                        <p className="text-gray-500 text-sm">{comment.contenu}</p>
                        <img
                          src={comment.fichierJoint} 
                          alt="mageee"
                          width={80}
                          height={80}
                          className='bg-slate-100 border cursor-pointer'

                        />
                        <p className="text-gray-400 text-xs mt-1">{getTimeAgo(comment.createdAt)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 w-full">Aucun commentaire disponible.</p>
                )}

                <form onSubmit={handleAddComment}>
                  <label htmlFor="chat" className="sr-only">Your message</label>
                  <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <FaSmile className="w-5 h-5 mt-4 text-orange-dys" />
                      <span className="sr-only">Add emoji</span>
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute bottom-full mb-2 right-4 bg-white p-2 rounded-md shadow-lg z-50 w-64">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 font-semibold">Choisir un emoji</span>
                          <button onClick={() => setShowEmojiPicker(false)} className="text-red-500 hover:text-red-700">
                            <FaTimes className="w-5 h-5" />
                          </button>
                        </div>
                        <EmojiPicker width={300} height={400} onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="p-2 mt-4 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      <FaPaperclip className="w-5 h-5 text-orange-dys" />
                      <span className="sr-only">Upload file</span>
                    </label>
                    <textarea
                      id="chat"
                      rows="1"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="block mt-4 mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Votre commentaire..."
                    />
                    <button
                      type="submit"
                      className="mt-4 inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                    >
                      <i className="fas fa-paper-plane text-xl text-orange-dys transform rotate-45"></i>
                      <span className="sr-only">Send message</span>
                    </button>
                  </div>
                  {selectedFile && selectedFile.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="File Preview"
                      className="w-20 h-20 mt-2 object-cover rounded-md"
                    />
                  )}
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}