import { dbService, storageService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React from 'react';
import { useState } from 'react/cjs/react.development';
import { v4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (nweet === "") {
      return;
    }

    let attachmentUrl = "";
    if(attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    }

    await addDoc((collection(dbService, "nweets")), nweetObj);
    setNweet("");
    setAttachment("");

    // await addDoc((collection(dbService, "nweets")),{
    //   text: nweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setNweet("");
  }

  const onChange = (event) => {
    const {target: {value}} = event;  // event.target.value;
    setNweet(value);
  }

  const onFileChange = (event) => {
    const { target: {files} } = event;
    const theFile = files[0];
    const reader = new FileReader(); // File Reader API

    reader.onloadend = (finishedEvent) => {
      const { currentTarget: {result} } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onClearAttachment = () => {
    setAttachment("");
  }

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input className="factoryInput__input" value={nweet} type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange} />
        {/* <input type="file" accept="image/*" onChange={onFileChange} /> */}
        <input type="submit" value="Nweet" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img src={attachment} style={{ backgroundImage: attachment }} alt="thumbnailImg" />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          {/* <button onClick={onClearAttachment}>Clear</button> */}
        </div>
      )}
    </form>
  );
}

export default NweetFactory;
