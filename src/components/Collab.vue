<template>
    <div >
      <!-- Navbar -->
      <nav class="navbar">
        <h3>{{ projectName }}</h3>
        <div >
          <button class="navbar-buttons" @click="goToHome">Home</button>
          <button class="navbar-buttons" @click="logout">Logout</button>
        </div>
      </nav>

   

      <!-- Chart Container -->
      <div class="chart-container">
        <g-gantt-chart class="chart"
          chart-start="2024-09-01 00:00"
          chart-end="2025-05-30 23:59"
          precision="month"
          bar-start="myBeginDate"
          bar-end="myEndDate"
          style="border: 2px solid #ccc; border-radius: 5px;"
          font="sans-serif"
        >

          
          <template v-for="(row, index) in myBarList" :key="index">
            <g-gantt-row :label="row[0].ganttBarConfig.label" :bars="row" @click="showOverlay(row)"  />
          </template>
        </g-gantt-chart>
      </div>

    
      <!-- Overlay -->
      <div class="overlay" :class="{ 'visible': overlayVisible }" >
        <div class="overlay-content">
          <h3>Gantt Item</h3>
          <p>{{ selectedLabel }}</p>
          <p>{{ selectedDescription }}</p>
          <p>Start: {{ start }}</p>
          <p>End: {{ end }}</p>
          <div class="link-container">
            <p style="display: inline;">Link: </p>
            <a style="display: inline;" :href="selectedLinks">{{ selectedLinks }}</a>
          </div>
          <br><br>
          <button class="submit-button" @click="goToFeedback(selectedID)">Feedback</button>
          <button class="cancel-button" @click="hideOverlay">Exit</button>
          <button class="delete-button" @click="deleteGanttItem(selectedID)">Delete</button>
          <button class="complete-button" @click="completeGanttItem(selectedID)">Complete</button>
          
        </div>
      </div>

      <!-- Add Item Button -->
      <div class="add-item-button">
        <button class="submit-button" @click="toggleAddItemForm">Create New Milestone</button>
      </div>

    

      <!-- Add Item Form Overlay -->
      <div class="overlay" :class="{ 'visible': addItemFormVisible }">
        <div class="overlay-content add-item-form">
          <h3>Add New Item</h3>
          <form @submit.prevent="submitForm">
            <div>
              <label for="name">Name:</label>
              <input type="text" id="name" v-model="newItem.ganttName" required>
            </div>
            <div>
              <label for="description">Description:</label>
              <textarea id="description" v-model="newItem.description" rows="4" required></textarea>
            </div>
            <div>
              <label for="startDate">Start Date:</label>
              <input type="date" id="startDate" v-model="newItem.startDate" required>
            </div>
            <div>
              <label for="endDate">End Date:</label>
              <input type="date" id="endDate" v-model="newItem.endDate" required>
            </div>
            <div>
              <label for="links">Additional Links:</label>
              <input type="text" id="links" v-model="newItem.links">
            </div>
            <div class="form-buttons">
              <button class="submit-button" type="submit">Submit</button>
              <button class="cancel-button" type="button" @click="hideAddItemForm">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>

</template>

<script>
import axios from "axios"; 
import { useConfigStore } from "../store/config";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router';
import { mapState } from "pinia";

export default {


  data() {
    return {
      myBarList: [],
      newItem: {
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        links: ""
      },
      complete: {
          id: "",
      },
      deleted: {
        id: ""
      },

      isSlideLeft: false,

      items: [],
      projectName: null,
      overlayVisible: false,
      addItemFormVisible: false,
      selectedID: null,
      selectedLabel: null,
      selectedDescription: null,
      selectedLinks: null,
      start: null,
      end: null,
    };
  },
  methods: {
    async fetchData() {
      const config = useConfigStore();
      console.log(this.$route.params.id);
      const currentUrl = window.location.href;
      const urlSegments = currentUrl.split('/');
      const lastSegment = urlSegments[urlSegments.length - 1];
      try {
        const url = `${config.config.backend_url}/getGantt/${this.$route.params.id}`;
        const response = await axios.get(url, {
          headers: {
            authorization: `Bearer ${config.accessToken}`
          }
        })
        this.myBarList = response.data.map((item) => {
            return item.content.map(i => {
              return {
                myBeginDate: new Date(i.startDate),
                myEndDate: new Date(i.endDate),
                ganttBarConfig: {
                  id: i.id,
                  label: i.ganttName,
                  description: i.description,
                  links: i.links,
                  colour: i.colour,
                  style: {
                    background: i.colour,
                    cursor: "pointer",
                    borderRadius: "10px"
                  },
                }
              }
            });
          });
          console.log(this.colour);
          await this.fetchProjectName();
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async fetchProjectName() {
      const config = useConfigStore();
      const url = `${config.config.backend_url}/getProjectName/${this.$route.params.id}`;
        console.log(url);
      try{
        
        const response = await axios.get(url, {
          headers: {
            authorization: `Bearer ${config.accessToken}`
          }
        })
        
        this.projectName = response.data.name;
      } catch (error) {
        console.error("error getting project name")
        console.log(error);
      
      }
    },

    showOverlay(row) {
      this.overlayVisible = true;
      this.selectedID = row[0].ganttBarConfig.id;
      this.selectedLabel = row[0].ganttBarConfig.label;
      this.selectedDescription = row[0].ganttBarConfig.description;
      this.selectedLinks = row[0].ganttBarConfig.links;
      this.start = row[0].myBeginDate;
      this.end = row[0].myEndDate;    
    },
    hideOverlay() {
      this.overlayVisible = false;
    },
    toggleAddItemForm() {
      this.addItemFormVisible = !this.addItemFormVisible;
    },
    hideAddItemForm() {
      this.addItemFormVisible = false;
    },
    goToFeedback(id) {
      this.$router.push(`/collab/${this.$route.params.id}/feedback/${id}`);
    },
    goToHome() {
      this.$router.push('/backHome');
    },
    logout() {
      this.$router.push('/logout');
    },
    submitForm() {
      this.submitNewItem();
    },
    async completeGanttItem(selectedID) {
      const config = useConfigStore();
      try {
        this.complete.id = selectedID;
        console.log(this.complete.id);
        await axios.patch(`${config.config.backend_url}/completeGanttItem`, this.complete, { 
          headers: {
          authorization: `Bearer ${config.accessToken}`,
          }
        })
          console.log("Milestone Completed");
          this.hideOverlay();
          this.fetchData();
      } catch (error) {
        console.error("Error submitting new Item:", error);
      }
       
    },
    async submitNewItem() {
      const config = useConfigStore();
      try {
      this.newItem.projectID = this.$route.params.id;
      console.log(this.newItem.projectID);
      await axios.post(`${config.config.backend_url}/createGanttItem`, this.newItem, { 
        headers: {
         authorization: `Bearer ${config.accessToken}`,
        }
      })
        console.log("newItem Submited");
        this.newItem.ganttName = "";
        this.newItem.description = "";
        this.newItem.startDate = "";
        this.newItem.endDate = "";
        this.newItem.links = "";
        this.hideAddItemForm();
        this.fetchData();
      } catch (error) {
        console.error("Error submitting new Item:", error);
      }
  },

  async deleteGanttItem(id) {
    const config = useConfigStore();
    console.log(`${config.config.backend_url}/deleteGanttItem/${id}`);
    try {
      await axios.delete(`${config.config.backend_url}/deleteGanttItem/${id}`, this.deleted, { 
        headers: {
         authorization: `Bearer ${config.accessToken}`,
        }
      })
      this.hideOverlay();
      this.fetchData();
    
    } catch(error) {
        console.error("");
        console.log(error);
    }
  },

  getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const rgbColor = `rgb(${red}, ${green}, ${blue})`;

  return rgbColor;
  }
  
  },

  computed: {
   // ...mapState(useConfigStore)
  },  

  mounted() {
    this.fetchData();
    
  }
}
</script>


<style scoped>

.navbar {
  display: flex;
  justify-content: space-between;
  font-family: sans-serif;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: white;
  margin-bottom: 10px;
}

.navbar-buttons {
  margin-left: 10px;
  background-color: #228049; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.navbar-buttons:hover {
  background-color: rgba(0, 255, 0, 0.651); 
}
.custom-background {
      background-color: #3D403E; 
      width: 100%; 
      height: 100vh;
      margin: 0; 
      padding: 0; 
    }

.chart-container .chart .gantt-row {
  border-radius: 5px;
}

.chart-container{
  width: 95%;
  margin-left: auto; 
  margin-right: auto; 
}


.add-item-button {
  position: fixed;
  border-radius: 5px;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;
}

.overlay.visible {
  display: block;
}

.overlay-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  font-family: sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.add-item-form label {
  display: block;
  margin-bottom: 5px;
}

.add-item-form input,
.add-item-form textarea {
  width: 100%;
  margin-bottom: 10px;
}

.link-container {
  display: inline-block;
}

.arrow {
  position: fixed;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: black;
  cursor: pointer;
  z-index: 9999;
}

.content {
  font-family: sans-serif;
}

.content.slide-left {
  transition: margin-right 0.5s ease;
  margin-right: 100px;
}

.form-buttons button {
  margin-right: 10px;
}

.submit-button {
  background-color: #228049; 
  border: none;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button {
  background-color: #474747;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button {
  background-color: #720101;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.complete-button {
  background-color: #0000ff;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button:hover, .submit-button:hover, .delete-button:hover, .complete-button:hover {
  opacity: 0.8;
}
</style>
 