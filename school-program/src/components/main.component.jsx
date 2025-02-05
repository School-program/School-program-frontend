import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from '../images/image.jpg';

function Main() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3005/auth/login", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
      setShowLoginForm(false);
    } catch (error) {
      console.error("Login failed:", error);
      alert("שם משתמש או סיסמה לא נכונים");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <div style={styles.container}>
      <div>
        {!isAuthenticated ? (
          <div>
            <button style={styles.button} onClick={() => setShowLoginForm(true)}>
              התחברות
            </button>

            {showLoginForm && (
              <div style={styles.popupContainer}>
                <div style={styles.popupBox}>
                  <div style={styles.popupTitle}>התחברות לאתר</div>

                  <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputContainer}>
                      <label style={styles.label}>שם משתמש 🙋</label>
                      <input
                        type="text"
                        placeholder="שם משתמש"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.inputContainer}>
                      <label style={styles.label}>סיסמה 🔐</label>
                      <input
                        type="password"
                        placeholder="סיסמה"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                      />
                    </div>

                    <button type="submit" style={styles.buttonLogin}>
                      התחבר
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={styles.userGreeting}>
            <span style={styles.user}>שלום מנהל</span>
            <button style={styles.button} onClick={handleLogout}>
              יציאה
            </button>
          </div>
        )}
      </div>

      <div style={styles.content}>
        <div style={styles.centeredText}>(: ברוכות הבאות לתוכנית הניקיון</div>

        <div style={styles.row}>
        
          <button
            style={styles.button}
            onClick={() => navigate("/year-groups")}
          >
            שנתונים
          </button>

          <button
            style={styles.button}
            onClick={() => navigate("/top-classes")}
          >
            כיתות מובילות
          </button>

          <button
            style={styles.button}
            onClick={() => navigate("/all-classes")}
          >
            כל הכיתות
          </button>
        </div>

        {isAuthenticated && (
          <div style={styles.row}>
            <button
              style={styles.button}
              onClick={() => navigate("/present-data")}
            >
              הצגת נתונים
            </button>
            <button
              style={styles.button}
              onClick={() => navigate("/score")}
            >
              ניקוד
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingLeft: "25%",
    paddingTop: "18%",
  },
  centeredText: {
    width: "100%",
    textAlign: "center",
    color: "black",
    fontSize: 40,
    fontFamily: "Assistant",
    fontWeight: "700",
    wordWrap: "break-word",
    marginBottom: "20px",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  button: {
    marginTop: "20px",
    marginLeft: "20px",
    width: "200px",
    height: "50px",
    paddingLeft: "37px",
    paddingRight: "37px",
    paddingTop: "4px",
    paddingBottom: "4px",
    borderRadius: "29px",
    border: "3.50px #C28AD4 solid",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    color: "black",
    fontSize: "20px",
    fontFamily: "Assistant",
    fontWeight: "700",
    textAlign: "center",
  },
  buttonLogin:{
    marginTop: "20px",
    width: "200px",
    height: "50px",
    paddingTop: "4px",
    paddingBottom: "4px",
    borderRadius: "29px",
    border: "3.50px #C28AD4 solid",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    color: "black",
    fontSize: "20px",
    fontFamily: "Assistant",
    fontWeight: "700",
    textAlign: "center",
  },
  popupContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Adding z-index to bring the popup on top
  },
  popupBox: {
    width: "300px",
    backgroundColor: "white",
    borderRadius: "33px",
    overflow: "hidden",
    position: "relative",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",  // Center the content inside the popup
    gap: "20px",
  },
  popupTitle: {
    textAlign: "center",
    color: "black",
    fontSize: "24px",
    fontFamily: "Assistant",
    fontWeight: "700",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%", // Ensure the form doesn't overflow the popup
    alignItems: "center", // Center the form elements
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    alignItems: "center",  // Center the input containers
  },
  label: {
    color: "black",
    fontSize: "20px",
    fontFamily: "Assistant",
    fontWeight: "600",
    textAlign: "center", // Center the label text
  },
  input: {
    padding: "10px",
    borderRadius: "29px",
    border: "2px solid black",
    fontSize: "18px",
    width: "80%", // Ensure the input fits within the popup
    textAlign: "center",  // Center the input text
  },
  userGreeting: {
    textAlign: "center",
    fontSize: "20px",
    fontFamily: "Assistant",
    fontWeight: "700",
    paddingTop : "20px",
  },
  user:{
    fontSize: "25px",
    color: " #AC6DC8",
  

  }
};


export default Main;
