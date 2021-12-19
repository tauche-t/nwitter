import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <li style={{ marginRight: 10 }}>
        <Link to="/">
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
        </Link>
      </li>
      <li style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
      >
        {/* <Link to="/profile">{userObj?.displayName?.length ? `${userObj.displayName} 님의 Profile` : "Profile"}</Link> */}
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <span style={{ marginTop: 10 }}>
            {/* {userObj.displayName
              ? `${userObj.displayName}님의 Profile`
              : "Profile"} */}
              {userObj?.displayName?.length ? `${userObj.displayName} 님의 Profile` : "Profile"}
          </span>
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;
