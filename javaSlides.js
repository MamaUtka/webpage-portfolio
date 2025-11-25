document.addEventListener("DOMContentLoaded", () => {
    const showMenu = document.querySelector(".show-menu");
    const hiddenMenu = document.querySelector(".hidden-menu");
    const closeButton = document.querySelector(".hidden-menu .close");

    showMenu.addEventListener("click", () => {
        hiddenMenu.style.right = "0";
    });

    closeButton.addEventListener("click", () => {
        hiddenMenu.style.right = "-300px";
        showMenu.style.display = "block";
    });
});


/* --------- PROJECT SLIDES ------------- */

const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let indervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 5000);
    }
}

function showSlide(index) {

    if (index >= slides.length) {
        slideIndex = 0;
    }
    else if (index < 0) {
        slideIndex = slides.length - 1;
    }


    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}


/* --------- VALIDATION FORM ------------- */

document.getElementById("submission-form").addEventListener("submit", function (event) {
  event.preventDefault();
  // Input elements
  const first_name = document.getElementById('first_name');
  const last_name = document.getElementById('last_name');
  const email = document.getElementById('email');
  const phone_number = document.getElementById('phone_number');
  const discussion = document.getElementById('discussion');
  const check = document.getElementById('check');

  // Containers
  const first_name_box = document.querySelector('.box-1');
  const last_name_box = document.querySelector('.box-2');
  const email_box = document.querySelector('.box-3');
  const phone_number_box = document.querySelector('.box-4');
  const discussion_box = document.querySelector('.box-5');

  // Errors elements
  const f_name_error = document.getElementById("f_name_error");
  const l_name_error = document.getElementById("l_name_error");
  const email_error = document.getElementById("email_error");
  const phone_error = document.getElementById("phone_error");
  const discussion_error = document.getElementById("discussion_error");
  const check_error = document.getElementById("check_error");

  // Clearing of the errors
  [first_name_box, last_name_box, email_box, phone_number_box, discussion_box].forEach(box => {
    box.classList.remove("error", "shake");
  });
  [f_name_error, l_name_error, email_error, phone_error, discussion_error, check_error]
    .forEach(e => e.textContent = "");

  // Regular expressions
  const nameSurnameRegex = /^[A-Za-zА-Яа-яІіЇїЄє'-]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  const phoneRegex = /^(?:\+380|0)\d{9}$/;

  // Shake animation
  function triggerShake(element) {
    element.classList.add("error", "shake");
    setTimeout(() => element.classList.remove("shake"), 400);
  }

  // Validation flag
  let isValid = true;

  // Valition of name
  if (first_name.value.trim() === "") {
    f_name_error.textContent = "Please enter your first name";
    triggerShake(first_name_box);
    isValid = false;
  } else if (!nameSurnameRegex.test(first_name.value.trim())) {
    f_name_error.textContent = "Please enter a valid first name";
    triggerShake(first_name_box);
    isValid = false;
  }

  // Valition of surname
  if (last_name.value.trim() === "") {
    l_name_error.textContent = "Please enter your last name";
    triggerShake(last_name_box);
    isValid = false;
  } else if (!nameSurnameRegex.test(last_name.value.trim())) {
    l_name_error.textContent = "Please enter a valid last name";
    triggerShake(last_name_box);
    isValid = false;
  }

  // Valition of email
  if (email.value.trim() === "") {
    email_error.textContent = "Please enter your email";
    triggerShake(email_box);
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    email_error.textContent = "Please enter a valid email";
    triggerShake(email_box);
    isValid = false;
  }

  // Valition of phone number
  if (phone_number.value.trim() === "") {
    phone_error.textContent = "Please enter your phone number";
    triggerShake(phone_number_box);
    isValid = false;
  } else if (!phoneRegex.test(phone_number.value.trim())) {
    phone_error.textContent = "Please enter a valid phone number";
    triggerShake(phone_number_box);
    isValid = false;
  }

  // Valition of discussion
  if (discussion.value.trim() === "") {
    discussion_error.textContent = "Please tell me what you'd like to discuss";
    triggerShake(discussion_box);
    isValid = false;
  } else if (discussion.value.trim().length < 10) {
    discussion_error.textContent = "Message should be at least 10 characters long";
    triggerShake(discussion_box);
    isValid = false;
  }

  // Valition of checkbox
  if (!check.checked) {
    check_error.textContent = "You must agree before submitting";
    isValid = false;
  }

  // If there are any errors - cancel the submission
  if (!isValid) {
    event.preventDefault();
  } else {
    this.reset();
  }
});


/* --------- POP UP WINDOW ------------- */

let openBtn = document.getElementById('open-btn');
let modalContainer = document.getElementById('modal-container');
let closeBtn = document.getElementById('close-btn');
let original = document.querySelector('.full-img');

slides.forEach((slide) => {
  slide.addEventListener("click", () => {
    modalContainer.style.display = 'block';
    const originalSrc = slide.getAttribute("data-original");
    original.src = `./project-images/${originalSrc}.jpg`;
  });
});

openBtn.addEventListener('click', function() {
    modalContainer.style.display = 'block';
})


closeBtn.addEventListener('click', function() {
    modalContainer.style.display = 'none';
})

window.addEventListener('click', function(e) {
    if (e.target === modalContainer) {
        modalContainer.style.display = 'none';
    }
})