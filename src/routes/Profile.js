import { authService, dbService } from "fbase";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut()
  };

  const getMyNweets = async () => {
    const nweets = await query(collection(dbService, "nweets"), orderBy("createdAt"), where("creatorId", "==", userObj.uid));
    const querySnapshot = await getDocs(nweets);
    
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data());
    });
  }

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (event) => {
    const { target: {value} } = event;
    setNewDisplayName(value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if(userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {displayName: newDisplayName});
      refreshUser();
    }

  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={newDisplayName} type="text" placeholder="Display name" onChange={onChange} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;

