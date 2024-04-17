<template>
  <!-- Navbar -->
  <nav class="navbar">
        <h3>Student Proposal Requests</h3>
      <div class="buttons">
        <button  @click="logout">Logout</button>
      </div>
  </nav>
  <div class="centered-text">
    <h1>{{ title }}</h1>
  </div> 
  <div class="pre-application">
    <button @click="showForm" class="big-button"  v-if="hasProject == false">{{ buttonText }}</button>
   
    <div v-if="showOverlay" class="overlay">
      <div class="form-container">
        <h3>FYP Proposal</h3>
        <form @submit.prevent="submitForm">
          <div class ="form-dropdown">
            <label for="selectOption">Choose a supervisor </label>
            <select v-model="applicationData.supervisor_id" id="selectOption">
              <option disabled value=''>Please select one</option>
              <option v-for="(option, index) in dropdownOptions" :key="index" :value='option.value'>{{ option.label }}</option>
            </select>
          </div>
          <input v-model="input1" type="text" v.model="applicationData.heading" placeholder="Project Name" required>
          <textarea v-model="textInput" rows="5" cols="50" v.model="applicationData.description" placeholder="Project Description" required></textarea>
          <!-- Add more inputs as needed -->
          <button :class="isButtonDisabled()" type="submit">Submit</button>
          <button type="button" @click="cancelForm()">Cancel</button>
        </form>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <!--Load current proposals-->
  <div class="button-container">
    <button @click="goToCollab" v-if="hasProject" class="smaller-button">Go to Project</button>
    <button @click="this.fetchItems();" v-else class="smaller-button">Load Proposals</button>
  </div>
 
  <div class="list">
    <div v-for="(item, index) in items" :key="index" class="list-item">
      <div class="item-name">{{ item.name }}</div>
        <button class="item-button" @click="showProposalOverlay(item)">View</button>
      </div>
    </div>
  <!-- Overlay -->
  <div class="overlay" v-if="showOverlayFlag">
      <div class="overlay-content">
        <h2>Project Details</h2>
         <p>Project Name: {{ selectedProposal.name }}</p>
        <p>Supervisor Name: {{ selectedProposal.supervisor }}</p>
        <p>Project Description: {{ selectedProposal.description }}</p>
        <div class="overlay-buttons">
          <button class="cancel-button" @click="closeOverlay">Cancel</button>
        </div>
      </div>
    </div>
</template>

<script>
import { useConfigStore } from "../store/config";
import axios from "axios";

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
      title: "Create another FYP Proposal?",
      items: [], 
      selectedProposal: null,
      showOverlay: false,
      showOverlayFlag: false,
      input1: '',
      input2: '',
      textInput: '',
      selectedOption: '',

      applicationData: {
        student_id: '',
        supervisor_id: '',
        heading: '',
        description: ''
      },

      dropdownOptions: [],
      hasProject: false
    }
  },
  methods: {
    async goToCollab() {
      const end = await this.fetchProjectId();
      
      this.$router.push(`/collab/${end}`);
    },
    isButtonDisabled() {
      console.log(this.applicationData.supervisor_id)
      return this.applicationData.supervisor_id ? '' : 'button-disabled';
    },
    async fetchItems() {
      const config = useConfigStore();
      try {
        const url = `${config.config.backend_url}/getApplicationsForStudent`;
        const response = await axios.get(url, {
          headers: {
            authorization: `Bearer ${config.accessToken}`,
          },
        });
        console.log("Response data fetched successfully");
        this.items = await Promise.all(response.data.map(async item => {
          return {
            id: item.id,
            name: item.heading,
            supervisor: item.student_name, 
            description: item.description,
            student_id: item.student_id
          };
        }));

        console.log("Processed items:", this.items);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
  },

    submitForm() {
      // Add your form submission logic here
      console.log('Form submitted with inputs:', this.input1, this.textInput, this.applicationData.supervisor_id);
      // Reset input fields and hide overlay
      
      
      this.applicationData.heading = this.input1
      this.applicationData.description = this.textInput;
     
      this.submitApplication();
      this.showOverlay = false;
    },

    cancelForm() {
      this.showOverlay = false;
      this.input1 = "";
      this.textInput = "";
    },

    fetchSupervisors() {
      const config = useConfigStore();
      const url = `${config.config.backend_url}/getSupervisors`;
  
      axios.get(url, {
        headers: {
         authorization: `Bearer ${config.accessToken}`,
        },
      }).then(response => {
        console.log('Supervisor options:', response.data);
        this.dropdownOptions = response.data.map(supervisor => {
          return {
            label: supervisor.name,
            value: supervisor.id
          }
        });
      }).catch(error => {
        console.error(error);
      });
    },



    async fetchProjectId() {
      const config = useConfigStore();
      const url = `${config.config.backend_url}/getProjectID`;
      try {  
      const response = await axios.get(url, {
        headers: {
          authorization: `Bearer ${config.accessToken}`,
        },
      });

        console.log(response.data.id);
        return response.data.id;

      } catch(e) {
        console.error("failed to get fetch project id");
        console.log(e);
      }
    },

    async getProjectStatus() {
      const config = useConfigStore();
      const url = `${config.config.backend_url}/getProjectStatus`;
      try {  
      const response = await axios.get(url, {
        headers: {
          authorization: `Bearer ${config.accessToken}`,
        },
      });
        this.hasProject = response.data;
        

      } catch(e) {
        console.error("failed to get Project status from user");
        console.log(e);
      }
    },

    showProposalOverlay(item) {
      this.selectedProposal = item;
      this.showOverlayFlag = true;
    },

    closeOverlay() {
      this.showOverlayFlag = false;
    },

    showForm() {
      this.fetchSupervisors();
      this.showOverlay = true;
      
    },
    logout() {
      this.$router.push('/logout');
    },
    async submitApplication() {
      const config = useConfigStore();
      console.log(this.applicationData.supervisor_id)
      await axios.post(`${config.config.backend_url}/createApplication`, this.applicationData, { 
        headers: {
         authorization: `Bearer ${config.accessToken}`,
        }
      })
        .then(response => {
          console.log(response.data);
          this.input1 = "";
          this.textInput = "";
        })
        .catch(error => {
          console.error(error);
        });
    },

    changeTitle() {
      if(this.hasProject) {
        this.title = "Project Created";
      }
    }
  },
  async mounted() {
    await this.getProjectStatus();
    this.changeTitle();
    console.log(this.hasProject);
  }
  
}

</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: sans-serif;
  padding: 10px;
  background-color: #333;
  color: white;
}

.buttons button {
  margin-left: 10px;
  background-color: #228049; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.buttons button:hover {
  background-color: rgba(0, 255, 0, 0.651); 
}

.pre_application {
  text-align: center;
  
}

.big-button {
  font-size: 20px;
  padding: 15px 30px;
  border-radius: 5px;
  border-radius: 10px;
  margin-left: 45%;
  background-color: #215f29;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.big-button:hover {
  background-color: #32a852;
}

.button-disabled {
  pointer-events: none;
  background-color: #ccc !important;
}

.smaller-button {
  font-size: 15px;
  border-radius: 5px;
  padding: 15px 30px;
  border-radius: 10px;
  margin-left: 45%;
  background-color: #215f29;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.smaller-button:hover {
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
  margin-right: 2px;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.form-container button:hover {
  background-color: #32a852;
}

.centered-text {
  padding-top: 60px;
  color: #006400; 
  font-size: 48px; 
  font-weight: bold; 
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}

.button-container {
  display: flex;
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
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.item-button:hover {
  background-color: rgba(0, 255, 0, 0.651); /* Change button color on hover */
  cursor: pointer;
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

.overlay-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.cancel-button {
  background-color: #414141; /* Red */
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;

}
.cancel-button:hover {
  opacity: 0.8;
}

.divider {
  border-top: 1px solid #ccc; /* Thin grey line */
  margin-top: 20px; /* Adjust margin as needed */
  margin-bottom: 20px; /* Adjust margin as needed */
}
.overlay-buttons {
  margin-top: 20px;
}
</style>
