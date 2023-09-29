import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions'; 
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

// Initialize functions and connect to emulator
const functions = getFunctions();
connectFunctionsEmulator(functions, 'localhost', 5001);

// Initialize the callable function
const generateText = httpsCallable(functions, 'generateText');

function FinalPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve virtualFriendId from location state
  const virtualFriendId = location.state ? location.state.virtualFriendId : null;

  const goBack = () => {
    navigate('/summary', { state: { virtualFriendId: virtualFriendId } });
  };

  const generateFriend = async () => {
    if (!virtualFriendId) {
      console.log("Virtual friend ID is missing.");
      return;
    }

    try {
      const result = await generateText({ virtualFriendId });  // Pass virtualFriendId here
      const generatedText = result.data.generatedText;
      console.log("Generated text: ", generatedText);
      alert("Generated text: " + generatedText);
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  return (
    <div className="final-page-container">
      <h2>Final Page</h2>
      <button onClick={goBack}>Go Back</button>
      <button onClick={generateFriend}>Generate Friend</button>
    </div>
  );
}

export default FinalPage;




