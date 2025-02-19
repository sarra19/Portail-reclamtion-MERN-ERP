import React, { useState, useEffect } from "react";
import SummaryApi from '../../../common';
import { useParams } from 'react-router-dom';
import { FaSmile, FaPaperclip, FaThumbsUp, FaTimes, FaComment } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import uploadFile from '../../../helpers/uploadFile';

export default function CardDétailsProduitFront() {
  const [showForm, setShowForm] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [data, setData] = useState({
    Image: "",
    Name: "",
    Description: "",
    Price: "",
    Vendor: "",
    AttachedFile: [],
  });
  function timeAgo(createdAt) {
    const now = new Date();
    const past = new Date(createdAt);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
      return `envoyé il y a ${diffInSeconds} s`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `envoyé il y a ${diffInMinutes} min`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `envoyé il y a ${diffInHours} h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `envoyé il y a ${diffInDays} j`;
  }
  function timeAgo(createdAt) {
    const now = new Date();
    const past = new Date(createdAt);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
      return `envoyé il y a ${diffInSeconds} s`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `envoyé il y a ${diffInMinutes} min`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `envoyé il y a ${diffInHours} h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `envoyé il y a ${diffInDays} j`;
  }

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

  const handleEmojiClick = (emojiObject) => {
    setNewComment(newComment + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = async (e) => {
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

    setData((prev) => ({
      ...prev,
      AttachedFile: [...(prev.AttachedFile || []), file],
    }));
    toast.success("File selected successfully!");
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    // Vérifier si le commentaire est vide
    if (newComment.trim() === "") {
      toast.error("Le commentaire ne peut pas être vide.");
      return;
    }

    if (!currentUser) {
      toast.error("Vous devez être connecté pour ajouter un commentaire.");
      return;
    }

    const formData = {
      Content: newComment,
      ProductId: id,
      AttachedFile: "",
    };

    if (data.AttachedFile && data.AttachedFile.length > 0) {
      const fileUrls = [];
      for (const file of data.AttachedFile) {
        const fileUploadResponse = await uploadFile(file);
        fileUrls.push(fileUploadResponse.url);
      }
      formData.AttachedFile = fileUrls.join(",");
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
          Content: newComment,
          AttachedFile: formData.AttachedFile,
          UserId: currentUser?.No_,
          user: {
            FirstName: currentUser?.FirstName,
            LastName: currentUser?.LastName,
            ProfileImage: currentUser?.ProfileImage,
          },
          CreatedAt: result.data.CreatedAt, 
        };
        setComments((prevComments) => [newCommentData, ...prevComments]);
        toast.success(result.message);
        setNewComment("");
        setData((prev) => ({ ...prev, AttachedFile: [] }));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
      toast.error("Une erreur s'est produite lors de l'ajout du commentaire.");
    }
  };

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const [rating, setRating] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${SummaryApi.getCommentsByProduct.url}/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const commentsResponse = await response.json();
        setComments(commentsResponse?.data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires :", error);
      }
    };

    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${SummaryApi.productDetails.url}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const dataResponse = await response.json();
        setData(dataResponse?.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
    fetchCurrentUser();
    fetchComments();
  }, [id]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded w-11/12 md:w-11/12 lg:w-11/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
        <ToastContainer position="top-center" />

        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Détails de Produit
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {loading ? (
            <p className="text-center text-blueGray-700">Chargement...</p>
          ) : (
            <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-bleu-dys ease-linear transition-all duration-150">
              <blockquote className="relative p-8 mb-4 flex items-center">
                <div className="text-section w-1/2">
                  <h2 className="mt-2 font-bold text-white">{data.Name}</h2>
                  <p className="mt-2 text-white">{data.Description}</p>
                  <p className="mt-2 text-white">{data.Vendor}</p>
                  <p className="mt-12 text-white">Prix: {data.Price} TND</p>
                </div>

                <div className="Image-section ml-4 w-1/2">
                  <img
                    alt={data.Name}
                    src={require(`assets/img/${data.Image}`)}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </blockquote>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between text-gray-500 border-t border-b py-2">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${isLiked ? "text-blue-600" : "text-gray-500"
              }`}
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
                    src={comment.user?.ProfileImage}
                    alt="User Avatar"
                    className="w-8 h-8 mr-2 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {comment.user?.FirstName} {comment.user?.LastName}
                    </p>
                    <p className="text-gray-500 text-sm">{comment.Content}</p>
                    {comment.AttachedFile && comment.AttachedFile.trim() !== "" && (
                      <img
                        src={comment.AttachedFile}
                        alt="Attached File"
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                      />
                    )}
                    <p className="text-gray-400 text-xs mt-1">{timeAgo(comment.CreatedAt)}</p>

                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">
                Aucun commentaire disponible.
              </p>
            )}

            <form onSubmit={handleAddComment}>
              <label htmlFor="chat" className="sr-only">
                Your message
              </label>
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
                      <span className="text-gray-700 font-semibold">
                        Choisir un emoji
                      </span>
                      <button
                        onClick={() => setShowEmojiPicker(false)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    </div>
                    <EmojiPicker
                      width={300}
                      height={400}
                      onEmojiClick={handleEmojiClick}
                    />
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
              {data.AttachedFile && data.AttachedFile.length > 0 && (
                <div className="mt-2">
                  {data.AttachedFile.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt="File Preview"
                      className="w-20 h-20 mt-2 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
}