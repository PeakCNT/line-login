import logo from "./logo.svg";
import "./App.css";
import liff from "@line/liff";
import { useEffect, useState } from "react";

function App() {
  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

  const logout = () => {
    liff.logout();
    window.location.reload();
  };

  const initLine = () => {
    liff.init(
      { liffId: "1657145186-RoQ69aKB" },
      () => {
        if (liff.isLoggedIn()) {
          runApp();
        } else {
          liff.login();
        }
      },
      (err) => console.error(err)
    );
  };

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff
      .getProfile()
      .then((profile) => {
        console.log(profile);
        setDisplayName(profile.displayName);
        setPictureUrl(profile.pictureUrl);
        setStatusMessage(profile.statusMessage);
        setUserId(profile.userId);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    initLine();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ textalign: "center" }}>
          <h1>React with LINE Login</h1>
          <hr />
          <img src={pictureUrl} width="300px" height="300px" />
          <p
            style={{ textalign: "left", marginleft: "20%", marginright: "20%" }}
          >
            <b>id token: </b> {idToken}
          </p>
          <p
            style={{ textalign: "left", marginleft: "20%", marginright: "20%" }}
          >
            <b>display name: </b> {displayName}
          </p>
          <p
            style={{ textalign: "left", marginleft: "20%", marginright: "20%" }}
          >
            <b>status message: </b> {statusMessage}
          </p>
          <p
            style={{ textalign: "left", marginleft: "20%", marginright: "20%" }}
          >
            <b>user id: </b> {userId}
          </p>

          <button
            onClick={() => logout()}
            style={{ width: "100%", height: "30px" }}
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
