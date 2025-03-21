// List of Google Fonts to be used
const googleFonts = [
    "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway",
    "Nunito", "Oswald", "Merriweather", "Quicksand", "Playfair Display",
    "Dancing Script", "Pacifico", "Indie Flower", "Bangers", "Anton", "Concert One",
    "Cinzel", "Fredoka", "Caveat", "Carter One", "Courgette", "Julius Sans One", "Matemasie",
    "Kalam", "Lobster", "Lora", "Merriweather Sans", "Oxygen", "PT Sans", "Bungee Shade", "Silkscreen",
    "Righteous", "Shadows Into Light", "Satisfy", "Rock Salt", "Spicy Rice", "Alfa Slab One", "Cormorant"
  ];
  
  // Dynamically load Google Fonts into the document's head
  const googleFontLink = document.createElement('link');
  googleFontLink.rel = 'stylesheet';
  googleFontLink.href = `https://fonts.googleapis.com/css2?${googleFonts.map(font => `family=${font.replace(/ /g, "+")}`).join("&")}&display=swap`;
  document.head.appendChild(googleFontLink);
  
  // Retrieve sections from localStorage or initialize an empty object
  let sections = JSON.parse(localStorage.getItem("sectionsTest")) || {};
  const container = document.getElementById("sectionsContainer");
  let selectedSection = null;
  
  // Save sections to localStorage
  function saveSections() {
      localStorage.setItem("sectionsTest", JSON.stringify(sections));
  }
  
  // Render all sections
//   function renderSections() {
//     container.innerHTML = "";
//     Object.keys(sections).forEach(sectionName => {
//         const sectionData = sections[sectionName];

//         const sectionDiv = document.createElement("div");
//         sectionDiv.className = "section";

//         // Apply saved styles
//         sectionDiv.style.backgroundColor = sectionData.backgroundColor || "#ffffff";
//         sectionDiv.style.color = sectionData.color || "#000000";
//         sectionDiv.style.fontFamily = sectionData.fontFamily || "Arial";

//         // Section title
//         const title = document.createElement("h3");
//         title.textContent = sectionName;

//         // Delete section button
//         const deleteBtn = document.createElement("button");
//         deleteBtn.textContent = "🗑️ Delete Section";
//         deleteBtn.onclick = () => {
//             if (confirm(`Delete section "${sectionName}"?`)) {
//                 delete sections[sectionName];
//                 saveSections();
//                 renderSections();
//             }
//         };

//         // Style section button
//         const styleBtn = document.createElement("button");
//         styleBtn.textContent = "🎨 Style Section";
//         styleBtn.onclick = () => openStyleModal(sectionName);

//         // Task list
//         const taskList = document.createElement("ul");
//         sectionData.tasks.forEach((task, index) => {
//             const li = document.createElement("li");

//             const checkbox = document.createElement("input");
//             checkbox.type = "checkbox";
//             checkbox.checked = task.checked;
//             checkbox.onchange = () => {
//                 sections[sectionName].tasks[index].checked = checkbox.checked;
//                 saveSections();
//                 renderSections();
//             };

//             const label = document.createElement("span");
//             label.style.marginLeft = "0.5rem";

//             // Render task as clickable link if it's a valid URL
//             if (isValidURL(task.text)) {
//                 const link = document.createElement("a");
//                 link.href = task.text;
//                 link.textContent = task.text;
//                 link.target = "_blank";
//                 link.style.color = "#007bff";
//                 link.style.textDecoration = "underline";
//                 label.appendChild(link);
//             } else {
//                 label.textContent = task.text;
//             }

//             // Apply completed task styles
//             if (task.checked) {
//                 label.style.color = sectionData.completedColor || "#888888";
//                 label.style.backgroundColor = sectionData.completedBg || "#f0f0f0";
//                 label.style.fontStyle = sectionData.completedFontStyle === "italic" ? "italic" : "normal";
//                 label.style.fontWeight = sectionData.completedFontStyle === "bold" ? "bold" : "normal";
//                 label.style.fontFamily = sectionData.completedFontFamily || "Arial";
//             }

//             // Delete task button
//             const deleteTaskBtn = document.createElement("button");
//             deleteTaskBtn.textContent = "🗑️";
//             deleteTaskBtn.style.marginLeft = "0.5rem";
//             deleteTaskBtn.onclick = () => {
//                 if (confirm(`Delete task "${task.text}"?`)) {
//                     sections[sectionName].tasks.splice(index, 1);
//                     saveSections();
//                     renderSections();
//                 }
//             };

//             li.appendChild(checkbox);
//             li.appendChild(label);
//             li.appendChild(deleteTaskBtn);
//             taskList.appendChild(li);
//         });

//         // Add task input and button
//         const taskInput = document.createElement("input");
//         taskInput.type = "text";
//         taskInput.placeholder = "Add task...";

//         const addTaskBtn = document.createElement("button");
//         addTaskBtn.textContent = "Add Task";
//         addTaskBtn.onclick = () => {
//             const taskText = taskInput.value.trim();
//             if (taskText === "") return;
//             sectionData.tasks.push({ text: taskText, checked: false });
//             taskInput.value = "";
//             saveSections();
//             renderSections();
//         };

//         // Assemble section
//         sectionDiv.appendChild(title);
//         sectionDiv.appendChild(deleteBtn);
//         sectionDiv.appendChild(styleBtn);
//         sectionDiv.appendChild(taskList);
//         sectionDiv.appendChild(taskInput);
//         sectionDiv.appendChild(addTaskBtn);

//         container.appendChild(sectionDiv);
//     });
// }

  function renderSections() {
      container.innerHTML = "";
      Object.keys(sections).forEach(sectionName => {
          const sectionData = sections[sectionName];
  
          const sectionDiv = document.createElement("div");
          sectionDiv.className = "section";
  
          // Apply saved styles to the section
          sectionDiv.style.backgroundColor = sectionData.backgroundColor || "#ffffff";
          sectionDiv.style.color = sectionData.color || "#000000";
          sectionDiv.style.fontFamily = sectionData.fontFamily || "Arial";
  
          // Section title
          const title = document.createElement("h3");
          title.textContent = sectionName;
  
          // Delete section button
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "🗑 Delete Section";
          deleteBtn.onclick = () => {
              if (!confirm(`Delete "${sectionName}"?`)) return;
              delete sections[sectionName];
              saveSections();
              renderSections();
          };
  
          // Style section button
          const styleBtn = document.createElement("button");
          styleBtn.textContent = "🎨 Style Section";
          styleBtn.onclick = () => openStyleModal(sectionName);
  
          // Task list
          const taskList = document.createElement("ul");
          sectionData.tasks.forEach((task, index) => {
              const li = document.createElement("li");
  
              const checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              checkbox.checked = task.checked;
              checkbox.onchange = () => {
                  sections[sectionName].tasks[index].checked = checkbox.checked;
                  saveSections();
                  renderSections();
              };

            

  
              const label = document.createElement("span");
              label.textContent = task.text;
              label.style.marginLeft = "0.5rem";


            if (task.text.startsWith("http://") || task.text.startsWith("https://")) {
                const link = document.createElement("a");
                link.href = task.text;
                link.textContent = task.text;
                link.target = "_blank";
                link.style.color = "#007bff";
                link.style.textDecoration = "underline";
                label.appendChild(link);
            } else {
                label.textContent = task.text;
            }

            // ...existing code...

const deleteTaskBtn = document.createElement("button");
deleteTaskBtn.textContent = "🗑️";
deleteTaskBtn.onclick = () => {
    if (confirm(`Delete task "${task.text}"?`)) {
        sections[sectionName].tasks.splice(index, 1);
        saveSections();
        renderSections();
    }
};

li.appendChild(checkbox);
li.appendChild(label);
li.appendChild(deleteTaskBtn);
  


              // Apply styles to completed tasks
              if (task.checked) {
                  label.style.color = sectionData.completedColor || "#888888";
                  label.style.backgroundColor = sectionData.completedBg || "#f0f0f0";
                  label.style.fontStyle = sectionData.completedFontStyle === "italic" ? "italic" : "normal";
                  label.style.fontWeight = sectionData.completedFontStyle === "bold" ? "bold" : "normal";
                  label.style.fontFamily = sectionData.completedFontFamily || "Arial";
              }
  
              li.appendChild(checkbox);
              li.appendChild(label);
              taskList.appendChild(li);
          });
  
          // Input for adding new tasks
          const taskInput = document.createElement("input");
          taskInput.type = "text";
          taskInput.placeholder = "Add task...";
  
          // Button to add new tasks
          const addTaskBtn = document.createElement("button");
          addTaskBtn.textContent = "Add Task";
          addTaskBtn.onclick = () => {
              const taskText = taskInput.value.trim();
              if (taskText === "") return;
              sectionData.tasks.push({ text: taskText, checked: false });
              taskInput.value = "";
              saveSections();
              renderSections();
          };
  
          // Assemble the section
          sectionDiv.appendChild(title);
          sectionDiv.appendChild(deleteBtn);
          sectionDiv.appendChild(styleBtn);
          sectionDiv.appendChild(taskList);
          sectionDiv.appendChild(taskInput);
          sectionDiv.appendChild(addTaskBtn);
  
          container.appendChild(sectionDiv);
      });
  }
  
  // Add a new section
  function addSection() {
      const input = document.getElementById("newSection");
      const name = input.value.trim();
      if (!name || sections[name]) {
          alert("Invalid or duplicate section name!");
          return;
      }
      sections[name] = { 
          tasks: [], 
          backgroundColor: "#ffffff", 
          color: "#000000",
          completedColor: "#888888",
          completedBg: "#f0f0f0",
          completedFontStyle: "normal",
          fontFamily: "Arial",
          completedFontFamily: "Arial"
      };
      saveSections();
      renderSections();
      input.value = "";
  }
  
  // Open the style modal for a specific section
  function openStyleModal(sectionName) {
      selectedSection = sectionName;
      const data = sections[sectionName];
  
      // Populate modal fields with current section styles
      document.getElementById("sectionBgColor").value = data.backgroundColor || "#ffffff";
      document.getElementById("sectionTextColor").value = data.color || "#000000";
      document.getElementById("completedTextColor").value = data.completedColor || "#888888";
      document.getElementById("completedBgColor").value = data.completedBg || "#f0f0f0";
      document.getElementById("completedFontStyle").value = data.completedFontStyle || "normal";
      document.getElementById("fontSelect").value = data.fontFamily || "Arial";
      document.getElementById("completedFontSelect").value = data.completedFontFamily || "Arial";
  
      // Display the modal
      document.getElementById("modalOverlay").style.display = "block";
      document.getElementById("styleModal").style.display = "block";
  }
  
  // Close the style modal
  function closeStyleModal() {
      document.getElementById("modalOverlay").style.display = "none";
      document.getElementById("styleModal").style.display = "none";
  }
  
  // Apply styles from the modal to the selected section
// Apply styles from the modal to the selected section
function applyStyle() {
    if (!selectedSection) return;
    const sectionData = sections[selectedSection];

    // Update section styles
    sectionData.backgroundColor = document.getElementById("sectionBgColor").value;
    sectionData.color = document.getElementById("sectionTextColor").value;
    sectionData.fontFamily = document.getElementById("fontSelect").value;

    // Update completed task styles
    sectionData.completedColor = document.getElementById("completedTextColor").value;
    sectionData.completedBg = document.getElementById("completedBgColor").value;
    sectionData.completedFontStyle = document.getElementById("completedFontStyle").value;
    sectionData.completedFontFamily = document.getElementById("completedFontSelect").value;

    saveSections();
    renderSections();
    closeStyleModal();
}

// Populate font dropdowns with Google Fonts
function populateFontDropdowns() {
    const sectionFontSelect = document.getElementById("fontSelect");
    const completedFontSelect = document.getElementById("completedFontSelect");

    googleFonts.forEach(font => {
        // Create option for section font dropdown
        const sectionOption = document.createElement("option");
        sectionOption.value = font;
        sectionOption.textContent = font;
        sectionOption.style.fontFamily = font;
        sectionFontSelect.appendChild(sectionOption);

        // Create option for completed task font dropdown
        const completedOption = document.createElement("option");
        completedOption.value = font;
        completedOption.textContent = font;
        completedOption.style.fontFamily = font;
        completedFontSelect.appendChild(completedOption);
    });
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
    // Dynamically load Google Fonts into <head>
    const googleFontLink = document.createElement('link');
    googleFontLink.rel = 'stylesheet';
    googleFontLink.href = `https://fonts.googleapis.com/css2?${googleFonts.map(font => `family=${font.replace(/ /g, "+")}`).join("&")}&display=swap`;
    document.head.appendChild(googleFontLink);

    // Populate font dropdowns and render sections after fonts are loaded
    googleFontLink.onload = () => {
        populateFontDropdowns();
        renderSections();
    };
});