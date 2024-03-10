<template>
     <div>
    <h1>Usernames</h1>
    <div id="letters">
      <ul id="letters-container">
        <li v-on:click="applyFilter('A')">A</li>
        <li v-on:click="applyFilter('B')">B</li>
        <li v-on:click="applyFilter('C')">C</li>
        <li v-on:click="applyFilter('D')">D</li>
        <li v-on:click="applyFilter('E')">E</li>
        <li v-on:click="applyFilter('F')">F</li>
        <li v-on:click="applyFilter('G')">G</li>
        <li v-on:click="applyFilter('H')">H</li>
        <li v-on:click="applyFilter('I')">I</li>
        <li v-on:click="applyFilter('J')">J</li>
        <li v-on:click="applyFilter('K')">K</li>
        <li v-on:click="applyFilter('L')">L</li>
        <li v-on:click="applyFilter('M')">M</li>
        <li v-on:click="applyFilter('N')">N</li>
        <li v-on:click="applyFilter('O')">O</li>
        <li v-on:click="applyFilter('P')">P</li>
        <li v-on:click="applyFilter('Q')">Q</li>
        <li v-on:click="applyFilter('R')">R</li>
        <li v-on:click="applyFilter('S')">S</li>
        <li v-on:click="applyFilter('T')">T</li>
        <li v-on:click="applyFilter('U')">U</li>
        <li v-on:click="applyFilter('V')">V</li>
        <li v-on:click="applyFilter('W')">W</li>
        <li v-on:click="applyFilter('X')">X</li>
        <li v-on:click="applyFilter('Y')">Y</li>
        <li v-on:click="applyFilter('Z')">Z</li>
      </ul>
    </div>
    <div class="table-container">
    <div class="usernames-table">
      <table>
        <thead>
          <tr>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(username, index) in displayedUsernames" :key="index">
            <td>{{ username }}</td>
          </tr>
        </tbody>
      </table>
   
    </div>
    </div>
    <button @click="previousPage" :disabled="currentPage === 1">Previous Page</button>
    <span>Page {{ currentPage }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next Page</button>
  </div>

</template>
 
 
 
 <script> 
 
 export default {
   name: 'App',
 
 
   data() {
        return{
         usernames: [],
         filteredUsernames: [],
         filter: '',
         pageSize: 10,
         currentPage: 1,
         // Object to store filtered usernames for each letter of the alphabet
         filteredRes: {  
  a: ["!"],
  b: ["!"],
  c: ["!"],
  d: ["!"],
  e: ["!"],
  f: ["!"],
  g: ["!"],
  h: ["!"],
  i: ["!"],
  j: ["!"],
  k: ["!"],
  l: ["!"],
  m: ["!"],
  n: ["!"],
  o: ["!"],
  p: ["!"],
  q: ["!"],
  r: ["!"],
  s: ["!"],
  t: ["!"],
  u: ["!"],
  v: ["!"],
  w: ["!"],
  x: ["!"],
  y: ["!"],
  z: ["!"]
}
        }
       },
       computed: {
         displayedUsernames() {
           const start = (this.currentPage - 1) * this.pageSize;
           const end = start + this.pageSize;
           return this.filteredUsernames.slice(start, end);
         },
         totalPages() {
           return Math.ceil(this.filteredUsernames.length / this.pageSize);
         }
       },
       mounted() {
         this.loadUsernames();
        //  this.filterRes();
       },
       methods: {
         loadUsernames() {
           console.log("loadusernames")
           // Read the text file
           fetch('http://localhost:3000/usernames') 
             .then(response => response.text())
             .then(data => {
               // Parse the content into an array of usernames
               this.usernames = data.trim().split('\n');
               this.filteredUsernames = this.usernames;  
             })
             .catch(error => {
               console.error('Error:', error);
             });
         },
         applyFilter(letter) {
          this.filter = letter;  
            if(this.filteredRes[letter.toLowerCase()][0] === "!" ){
              const filteredUsernames = this.usernames.filter(username =>
                        username.toLowerCase().startsWith(letter.toLowerCase())
                      );
                       
                      this.filteredRes[letter.toLowerCase()] = filteredUsernames; 
            }

// Set the filteredUsernames to the array corresponding to the selected letter

          this.filteredUsernames =this.filteredRes[letter.toLowerCase()] ;
          
           this.currentPage = 1; // Reset to first page when filter changes
         },
         nextPage() {
           if (this.currentPage < this.totalPages) {
             this.currentPage++;
           }
         },
         previousPage() {
           if (this.currentPage > 1) {
             this.currentPage--;
           }
         }
       }
 
 }
 </script>
 
 

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
 #letters-container {
    display: flex;
    list-style-type: none;
    justify-content: center;
    padding: 0;
  }

  #letters-container li {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin: 5px;
    background-color: lightblue;
    cursor: pointer;
  }

  #letters-container li:hover {
    background-color: lightgreen;
  }

  .usernames-table {
    margin-top: 20px;
    
  }

  .table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
}

  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
  }
  

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: lightblue;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  button {
    margin-top: 10px;
  }
</style>
