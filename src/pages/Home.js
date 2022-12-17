import React, { useState } from "react";
import { auth, db } from "../firebase-config";
import { signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

function Home() {
  const [eventid, seteventid] = useState("");
  const logout = async () => {
    await signOut(auth)
      .then(() => {
        console.log("sign out successful");
        localStorage.removeItem("token");
      })
      .catch((err) => console.log(err));
  };

  const add = async () => {
    await addDoc(collection(db, "events"), {
      name: "New Event",
      description: "New Event Description",
      date: "2021-09-01",
      time: "12:00",
      location: "New Event Location",
      attendees: [],
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    });
  };

  const deleteEvent = async () => {
    await deleteDoc(doc(db, "events", eventid))
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {" "}
      <button onClick={logout}> Sign Out </button>
      <button onClick={add}>Add New Event</button>
      <input
        placeholder="event id..."
        value={eventid}
        onChange={(event) => seteventid(event.target.value)}
      />
      <button onClick={deleteEvent}>Delete Event</button>
    </div>
  );
}

export default Home;
