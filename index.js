import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase,
         ref,
         push,
        onValue,
        remove
       } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-62e3d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// Challenge: Log out a snapshot of your database when a new value is added to it
onValue(referenceInDB, function(snapshot) {
  // Challenge: Only run the code below if a snapshot exists
  const snapshotExists = snapshot.exists()

  if (snapshotExists) {
    const snapshotValues = snapshot.val()
  // Challenge: Create a const called 'leads' which is an array containing the values inside of the snapshotValues 
  //we use object.values to transform an object into an array 
  const leads = Object.values(snapshotValues)
  render(leads)
  }
  
})


deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML =""
})

inputBtn.addEventListener("click", function() {
  //pushing to database
    push(referenceInDB, inputEl.value)
    // Challenge: Import the 'push' function and modify the line above to push inputEl.value to the referenceInDB in the database
    inputEl.value = ""
})