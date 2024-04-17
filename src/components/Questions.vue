<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">
        <!-- Logo goes here -->
        <!-- <img src="logo.png" alt="Logo" /> -->
      </div>
      <div class="buttons">
        <!-- Navbar buttons go here -->
        <button @click="showQuestionForm">New Question</button>
        <button @click="goToCollab">Back to ColLab</button>
      </div>
    </nav>

    <!-- List -->
    <div class="list">
      <div v-for="(question, index) in questions" :key="index" class="list-item">
        <div class="item-name">{{ question.name }}</div>
        <button @click="showViewOverlay(index)" class="item-button">View</button>
      </div>
    </div>

    <!-- New Question Form Overlay -->
    <div v-if="showQuestionOverlay" class="overlay">
      <div class="form-container">
        <h3>New Question</h3>
        <form @submit.prevent="submitForm">
          <input v-model="input1" type="text" placeholder="Question Title">
          <textarea v-model="textInput" rows="5" cols="50" placeholder="Question Description"></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>

    <!-- View Question Overlay -->
    <div v-if="showViewOverlayIndex !== null" class="overlay">
      <div class="view-container">
        <h3>View Question</h3>
        <div>{{ questions[showViewOverlayIndex].name }}</div>
        <!-- Add further data from db here. -->
        <button @click="closeViewOverlay">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [], // Data fetched from the database
      input1: '',
      textInput: '',
      showQuestionOverlay: false,
      showViewOverlayIndex: null
    };
  },
  mounted() {
    // Fetch data from the database and assign it to 'questions'
    // For demonstration purpose, let's assume 'questions' is an array of objects
    this.questions = [
      { name: 'Question 1' },
      { name: 'Question 2' },
      { name: 'Question 3' },
    ];
  },
  methods: {
    showQuestionForm() {
      this.showQuestionOverlay = true;
    },
    goToCollab() {
      this.$router.push('/collab'); 
    },
    submitForm() {
      // Implement your form submission logic here
      this.showQuestionOverlay = false;
    },
    showViewOverlay(index) {
      this.showViewOverlayIndex = index;
    },
    closeViewOverlay() {
      this.showViewOverlayIndex = null;
    }
  }
};
</script>

<style scoped>
/* Styles for overlays */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container, .view-container {
  background-color: #fff;
  width: 60%;
  padding: 20px;
  border-radius: 10px;
}

.form-container h3, .view-container h3 {
  margin-bottom: 10px;
}

.form-container input {
  display: block;
  width: 100%;
  padding: 10px;
  padding-right: 0px;
  margin-bottom: 10px;
}

textarea {
  height: 100px; 
  width: 100%; 
  padding: 10px; 
  padding-right: 0px;
  resize: vertical; 
}

/* Other styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: white;
}

.logo img {
  max-height: 40px;
}

.buttons button {
  margin-left: 10px;
  background-color: #228049; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.buttons button:hover {
  background-color: rgba(0, 255, 0, 0.651); /* Change button color on hover */
}

.list {
  margin-top: 20px;
}

.list-item {
  display: flex;
  align-items: center;
  height: 80px;
  background-color: #f0f0f0;
  margin-bottom: 10px;
  padding: 0 20px;
}

.item-name {
  flex: 1;
  font-family: Arial, Helvetica, sans-serif;
}

.item-button {
  margin-left: 10px;
  background-color: #228049; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.item-button:hover {
  background-color: rgba(0, 255, 0, 0.651); /* Change button color on hover */
}
</style>
