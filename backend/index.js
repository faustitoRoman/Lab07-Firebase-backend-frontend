import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyAFA5yv1K8OuZlwg1rKHypKIQs9-NETfnk",
    authDomain: "studentproject-1e030.firebaseapp.com",
    projectId: "studentproject-1e030",
    storageBucket: "studentproject-1e030.appspot.com",
    messagingSenderId: "744173918795",
    appId: "1:744173918795:web:ff1728c03dea8738fd4bce"
};

const fb = initializeApp(firebaseConfig);

const db = getFirestore(fb);

// Get a list of students from your database
async function getStudents(db) {
  const studentsCollection = collection(db, 'students');
  const studentsSnapshot = await getDocs(studentsCollection);
  const studentsList = studentsSnapshot.docs.map(doc => doc.data());
  return studentsList;
}

console.log(await getStudents(db));

import cors from 'cors';
import express from 'express';
//const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
  res.send('EPN FIS')
})

app.use(cors({ origin: 'http://127.0.0.1:5500'}));



//read all students
app.get("/api/read", (req, res) => {
  (async () => {
    try {
      let response = [];
      //await query.get().then(querySnapshot => {
      const querySnapshot = await getDocs(collection(db, "students"));
      //let docs = querySnapshot.docs;
      //for (let doc of docs) {
      querySnapshot.forEach((doc) => {
        const selectedItem = {
          id: doc.id,
          student: doc.data(),
        };
        response.push(selectedItem);
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// read one student
app.get("/api/read/:item_id", (req, res) => {
    (async () => {
      try {
        let response = [];
        const q = query(
          collection(db, "students"),
          where("ID", "==", parseInt(req.params.item_id))
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const selectedItem = {
            id: doc.id,
            student: doc.data(),
          };
          response.push(selectedItem);
        });
        return res.status(200).send(response);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

  // create student
app.post("/api/create", (req, res) => {
    (async () => {
      try {
        console.log(req);
        const docRef = await addDoc(collection(db, "students"), req.body);
        return res.status(200).send(`Document written with ID:  ${docRef.id}`);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });


// update
app.put("/api/update/:item_id", (req, res) => {
    (async () => {
      try {
        const studentDocumentId = doc(db, "students", req.params.item_id);
        await updateDoc(studentDocumentId, req.body);
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

  //delete
  app.delete("/api/delete/:item_id", (req, res) => {
    (async () => {
      try {
        await deleteDoc(doc(db, "students", req.params.item_id));
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

app.listen(port, () => {
    console.log(`WEB API LISTENING ON ${port}`);
})
