<template>
    <div class="centered-text">
    <h1>Create another application?</h1>
    </div> 
    <div class="pre-application">
        
    <button @click="showForm" class="big-button">{{ buttonText }}</button>
    <button @click="goToCollab" class="big-button">To Collab page</button>
      <div v-if="showOverlay" class="overlay">
        <div class="form-container">
          <h3>Project Application</h3>
          <form @submit.prevent="submitForm">
            <div class ="form-dropdown">
                <label for="selectOption">Choose a supervisor </label>
                <select v-model="selectedOption" id="selectOption">
                    <option disabled value="">Please select one</option>
                    <option value="option1">To be replaced with supervisors</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
            </div>
            <input v-model="input1" type="text" placeholder="Project Name">
            <textarea v-model="textInput" rows="5" cols="50" placeholder="Project Description"></textarea>
           
            <!-- Add more inputs as needed -->
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Application',
    props: {
      title: {
        type: String,
        required: true
      },
      buttonText: {
        type: String,
        default: 'Click here!'
      }
    },
    data() {
      return {
        showOverlay: false,
        input1: '',
        input2: '',
        // Add more data properties for additional inputs
      }
    },
    methods: {
      showForm() {
        this.showOverlay = true;
      },
      goToCollab() {
        window.location.href = 'collabw';
      },
      submitForm() {
        // Add your form submission logic here
        console.log('Form submitted with inputs:', this.input1, this.input2);
        // Reset input fields and hide overlay
        this.input1 = '';
        this.input2 = '';
        this.showOverlay = false;
      }
    }
  }
  </script>
  
  <style scoped>
  .pre_application {
    text-align: center;
    margin-top: 50px;
  }
  
  .big-button {
    font-size: 20px;
    padding: 15px 30px;
    border-radius: 10px;
    margin-left: 45%;
    background-color: #215f29;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .big-button:hover {
    background-color: #32a852;
  }
  
  .form-dropdown {
    padding-bottom: 10px; 
    font-family: Arial, Helvetica, sans-serif; 
  }

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
  
  .form-container {
    background-color: #fff;
    width: 60%;
    padding: 20px;
    border-radius: 10px;
  }
  
  .form-container h3 {
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

  .form-container button {
    background-color: #215f29;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .form-container button:hover {
    background-color: #32a852;
  }
  .centered-text {
    
    padding-top: 15%;
    color: #006400; 
    font-size: 48px; 
    font-weight: bold; 
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
}
  </style>

