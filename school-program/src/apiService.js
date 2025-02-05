const API_BASE_URL = "http://localhost:3005"; // כתובת השרת שלך

export const addDailyDataAndUpdatePoints = async (data) => {
  try {
    // שליפת הטוקן מה-localStorage
    const token = localStorage.getItem("authToken"); 
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const response = await fetch(`${API_BASE_URL}/dailydata/addAndUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token, 
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding daily data:", error);
    throw error;
  }
};
