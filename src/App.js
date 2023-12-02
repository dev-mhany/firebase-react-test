import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; // Added updateDoc
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid"; // Make sure to install the 'uuid' library
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import "./App.css";

// Function to write data with a unique field key
export const writeUniqueFieldData = async (data) => {
  const dataPath = "cookies/latest";
  const uniqueKey = uuidv4(); // Generates a unique UUID

  // Create an object with the unique field
  const dataToUpdate = {
    [uniqueKey]: data,
  };

  // Get a reference to the Firestore document
  const docRef = doc(db, dataPath);

  // Update the document with the new unique field
  await updateDoc(docRef, dataToUpdate);
};

function App() {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const dataPath = "cookies/latest";

  // Function to fetch data from Firestore
  const fetchData = async () => {
    const docRef = doc(db, dataPath);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [dataPath]);

  const handleWriteData = async () => {
    const docRef = doc(db, dataPath);

    // Create a date string without milliseconds
    const now = new Date();
    const uniqueKey = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")}`;

    await setDoc(docRef, { [uniqueKey]: inputValue }, { merge: true });
    setInputValue("");
    fetchData(); // Fetch the updated data after writing
  };

  return (
    <div className="App">
      <TextField
        required
        id="outlined-required"
        label="Required"
        placeholder="Type something 😊"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleWriteData();
          }
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        className="button"
        onClick={handleWriteData}
        disabled={!inputValue}
        type="submit"
      >
        Write to Firestore
      </Button>

      {data && (
        <table className="table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
