document.addEventListener("DOMContentLoaded", function() {
  const nav = document.querySelector('nav');
  const navItems = nav.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');

  // Function to display a given section based on its name
  function showSection(sectionName) {
    sections.forEach(section => {
      section.classList.remove('active');
    });
    const target = document.getElementById('section-' + sectionName);
    if (target) {
      target.classList.add('active');
    }
  }

  // Add click and drag-and-drop event listeners to each nav item
  navItems.forEach(item => {
    // CLICK handling for tab navigation
    item.addEventListener('click', function() {
      navItems.forEach(navItem => navItem.classList.remove('active'));
      this.classList.add('active');
      showSection(this.dataset.section);
    });
    
    // DRAG handling
    item.setAttribute('draggable', 'true');
    addDnDHandlers(item);
  });

  /**************** Drag and Drop Handlers ****************/
  let dragSrcEl = null;
  
  function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    // Some browsers require a setData for dragging to work
    e.dataTransfer.setData('text/plain', '');
    this.classList.add('dragging');
  }

  function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();
    // If dropping on a different element, swap positions in the nav container
    if (dragSrcEl !== this) {
      const parent = this.parentNode;
      const children = Array.from(parent.children);
      const draggedIndex = children.indexOf(dragSrcEl);
      const targetIndex = children.indexOf(this);
      if (draggedIndex < targetIndex) {
        parent.insertBefore(dragSrcEl, this.nextSibling);
      } else {
        parent.insertBefore(dragSrcEl, this);
      }
    }
    return false;
  }

  function handleDragEnd(e) {
    this.classList.remove('dragging');
    navItems.forEach(item => item.classList.remove('over'));
  }

  function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false);
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);
  }
  
  /**************** Example Interactive Functions ****************/
  // Increment Life Score
  window.incrementLifeScore = function() {
    const scoreEl = document.getElementById('lifeScore');
    let currentScore = parseInt(scoreEl.textContent, 10);
    if (currentScore < 100) {
      scoreEl.textContent = currentScore + 1;
    }
  };

  // Log an Exercise
  window.logExercise = function() {
    const exerciseTypeEl = document.getElementById('exerciseType');
    const durationEl = document.getElementById('duration');
    const messageEl = document.getElementById('activityMessage');
    
    if (!exerciseTypeEl.value || !durationEl.value) {
      messageEl.style.color = 'red';
      messageEl.textContent = 'Please enter both exercise type and duration.';
      return;
    }
    messageEl.style.color = 'green';
    messageEl.textContent = `Added: ${exerciseTypeEl.value} for ${durationEl.value} minutes.`;
    exerciseTypeEl.value = '';
    durationEl.value = '';
  };

  // Update Weight
  window.submitWeight = function() {
    const currentWeightEl = document.getElementById('currentWeight');
    const weightMessageEl = document.getElementById('weightMessage');
    
    if (!currentWeightEl.value) {
      weightMessageEl.style.color = 'red';
      weightMessageEl.textContent = 'Please enter your weight.';
      return;
    }
    weightMessageEl.style.color = 'green';
    weightMessageEl.textContent = `Weight updated to ${currentWeightEl.value} lbs.`;
    currentWeightEl.value = '';
  };
});

// functionality to enable and disable the button based on if inputs are complete in sign up form.
//NOT WORKING RIGHT NOW. CHAT CODE NEED TO FIX/CHANGE. 
// document.addEventListener("DOMContentLoaded", function() {
//     // Reference to the form and the Sign Up button.
//     const form = document.getElementById('signUp_form');
//     const signUpButton = document.getElementById('signUp_button');
    
//     // Select all input fields inside the form.
//     const inputs = form.querySelectorAll('input');
    
//     // Function to check if all fields have a value.
//     function checkInputs() {
//       let allFilled = true;
      
//       inputs.forEach((input) => {
//         // If any input is empty, set allFilled to false.
//         if (input.value.trim() === "") {
//           allFilled = false;
//         }
//       });
      
//       // Enable the button if all fields are filled; otherwise disable it.
//       signUpButton.disabled = !allFilled;
//     }
    
//     // Attach the checkInputs function to the input event of every field.
//     inputs.forEach((input) => {
//       input.addEventListener('input', checkInputs);
//     });
//   });
  