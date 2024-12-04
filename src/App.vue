<template>
  <div id="app">
    <header>
      <h1>Clicker Challenge</h1>
      <nav>
        <ul>
          <li>
            <a
              href="https://www.facebook.com/Stratoviks"
              target="_blank"
              rel="noopener noreferrer"
            >
              About Us
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <!-- Start Section -->
      <div v-if="!isTimerRunning && !showScoreInput" class="start-section">
        <button class="btn start" @click="startTimer">Start Game</button>
      </div>

      <!-- Clicking Section -->
      <div v-else-if="isTimerRunning" class="game-section">
        <p class="counter">Time Left: {{ timeLeft }}s</p>
        <button class="btn clicker" @click="incrementScore">Click Me!</button>
        <p class="score-display">Score: {{ score }}</p>
      </div>

      <!-- Score Input Section -->
      <div v-else-if="showScoreInput" class="score-input-section">
        <input
          type="text"
          v-model="playerName"
          placeholder="Enter your name"
          class="input"
        />
        <button class="btn save" @click="saveScore">Save Score</button>
      </div>

      <!-- Leaderboard -->
      <div class="records-section">
        <h2>Leaderboard</h2>
        <ul>
          <li v-for="(record, index) in records" :key="record.id">
            {{ record.name }} - {{ record.score }}
            <button class="btn edit" @click="editRecord(index)">Edit</button>
            <button class="btn delete" @click="deleteRecord(index)">
              Delete
            </button>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/index";




export default {
  name: "App",
  data() {
    return {
      timeLeft: 60,
      isTimerRunning: false,
      showScoreInput: false,
      playerName: "",
      score: 0,
      records: [],
    };
  },
  methods: {
    startTimer() {
      this.timeLeft = 60;
      this.isTimerRunning = true;
      this.showScoreInput = false;
      this.score = 0;
      const timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(timer);
          this.isTimerRunning = false;
          this.showScoreInput = true;
        }
      }, 1000);
    },
    incrementScore() {
      this.score++;
    },
    async saveScore() {
      if (this.playerName.trim() !== "") {
        try {
          await addDoc(collection(db, "records"), {
            name: this.playerName,
            score: this.score,
          });
          this.playerName = "";
          this.showScoreInput = false;
        } catch (error) {
          console.error("Error saving record:", error);
        }
      } else {
        alert("Please enter a name to save the record.");
      }
    },
    async loadRecords() {
      try {
        const recordsRef = collection(db, "records");
        onSnapshot(recordsRef, (snapshot) => {
          this.records = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        });
      } catch (error) {
        console.error("Error loading records:", error);
      }
    },
    async deleteRecord(index) {
      if (confirm("Are you sure you want to delete this record?")) {
        try {
          const recordId = this.records[index].id;
          await deleteDoc(doc(db, "records", recordId));
        } catch (error) {
          console.error("Error deleting record:", error);
        }
      }
    },
    async editRecord(index) {
      const newName = prompt(
        `Edit name for ${this.records[index].name}:`,
        this.records[index].name
      );
      if (newName) {
        try {
          const recordId = this.records[index].id;
          await updateDoc(doc(db, "records", recordId), { name: newName });
        } catch (error) {
          console.error("Error updating record:", error);
        }
      }
    },
  },
  mounted() {
    this.loadRecords();
  },
};
</script>

<style scoped>
/* Global Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Root Variables for Colors & Dimensions */
:root {
  --primary-color: #ff6b81; /* Vibrant pinkish-red */
  --primary-gradient: linear-gradient(135deg, #ff6b81, #ff9ff3);
  --secondary-color: #54a0ff; /* Cool blue */
  --secondary-gradient: linear-gradient(135deg, #54a0ff, #00d2d3);
  --text-color: #ffffff;
  --background-color: #fdf8ff; /* Light pastel background */
  --accent-color: #feca57; /* Bright yellow-orange */
  --accent-gradient: linear-gradient(135deg, #feca57, #ff9f43);
  --border-radius: 16px; /* More rounded corners */
  --transition: 0.3s ease;
}

/* Body */
body {
  font-family: "Roboto", sans-serif;
  background: var(--background-color);
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  line-height: 1.6;
}

/* Header */
header {
  background: var(--primary-gradient);
  color: var(--text-color);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

header h1 {
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

header nav ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 20px;
}

header nav ul li a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: bold;
  transition: color var(--transition);
}

header nav ul li a:hover {
  color: var(--accent-color);
}

/* Main Section */
main {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.start-section,
.game-section,
.score-input-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  background: var(--secondary-gradient);
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  text-align: center;
  color: var(--text-color);
}

.records-section {
  margin-top: 40px;
  width: 100%;
}

.records-section h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  color: var(--primary-color);
}

.records-section ul {
  list-style: none;
  padding: 0;
}

.records-section li {
  background: var(--accent-gradient);
  margin: 10px 0;
  padding: 15px 20px;
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform var(--transition);
  color: #2c3e50;
  font-weight: bold;
}

.records-section li:hover {
  transform: scale(1.05);
}

.records-section .btn {
  margin-left: 10px;
}

/* Buttons */
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background var(--transition), transform var(--transition);
  color: var(--text-color);
}

.btn.start {
  background: var(--secondary-gradient);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn.clicker {
  background: var(--primary-gradient);
  border: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn.clicker:hover {
  transform: scale(1.1);
}

.btn.clicker:active {
  transform: scale(0.95);
}

.btn.save,
.btn.edit,
.btn.delete {
  background: var(--accent-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}

/* Input */
.input {
  padding: 12px;
  border: 2px solid var(--secondary-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  width: 80%;
  max-width: 300px;
  text-align: center;
  transition: border-color var(--transition);
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
}

/* Counter and Score Display */
.counter,
.score-display {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--primary-color);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Footer */
footer {
  height: 60px;
  background: var(--secondary-gradient);
  color: var(--text-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

footer a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: bold;
}

footer a:hover {
  color: var(--accent-color);
}

/* Responsive Design */
@media (max-width: 600px) {
  header h1 {
    font-size: 1.5rem;
  }

  .btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

</style>
