import Nweet from "components/Nweet";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  // const getNweets = async () => {
  //   const dbNweets = await getDocs(collection(dbService, "nweets"));
  //   dbNweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     }
  //     setNweets((prev) => [document.data(), ...prev]);
  //   });
  // }

  useEffect(() => {
    // getNweets();

    onSnapshot(query(collection(dbService, "nweets"), orderBy("createdAt", "desc")), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNweets(nweetArray);

      console.log(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    await addDoc((collection(dbService, "nweets")),{
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  }

  const onChange = (event) => {
    const {target: {value}} = event;  // event.target.value;
    setNweet(value);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange} />
        <input type="submit" vlaue="Nweet" />
      </form>

      <div>
        {nweets.map(nweet => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
}

export default Home;

