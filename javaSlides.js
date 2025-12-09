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

let slides = [];
let slideIndex = 0;
let intervalId = null;

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


/* -------- LOADING CIRCLE ---------- */
const imgURLArr = [
    "project-images/blue-project.jpg",
    "project-images/example-project.jpg",
    "project-images/fashion-project.jpg",
    "project-images/design-project.jpg",
    "project-images/furniture-project.jpg",
    "project-images/restaurant-project.jpg"
];

const spinner = document.querySelector(".center");
const gallery = document.querySelector(".slides");

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = document.createElement("img");

        img.classList.add("hidden");
        img.src = url;

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to load: " + url));
    });
}

function loadGallery() {
    const promiseArr = imgURLArr.map(url => loadImage(url));

    Promise.all(promiseArr)
        .then(images => {
            spinner.style.display = "none";
            gallery.classList.remove("hidden-slides");

            images.forEach(img => {
                img.classList.remove("hidden");
                gallery.appendChild(img);

                slides = document.querySelectorAll(".slides img");

                initializeSlider();
            });
        })
        .catch(err => {
            spinner.style.display = "none";
            alert("Error loading images:\n" + err.message);
        });
}

loadGallery();


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



/* --------------- Color Palette Generator ------------- */

class ColorPaletteGenerator {
    constructor() {
        this.paletteGrid = document.getElementById("palette-grid");
        this.generateBtn = document.getElementById("generate-btn");
        this.colorModeSelect = document.getElementById("color-mode");
        this.baseColorInput = document.getElementById("base-color-input");
        this.colorCountInput = document.getElementById("color-count-input"); 

        this.generateBtn.addEventListener('click', () => this.generatePalette());
    }


    validateHex(hex) {
        const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
        return hexRegex.test(hex);
    }
    

    getRandomColor() {
        return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    }


    hexToHsl(hex) {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;

        // Determine the brightest and darkest channels.
        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);

        // Lightness is defined as the midpoint between black and white.
        let h, s;
        let l = (max + min) / 2;
        let d = max - min;

        // If d = 0, all RGB channels are equal -> color is gray.
        if (d === 0) {
            h = 0;
            s = 0;
        } else {
            // Saturation depends on how far max and min are from the midpoint (L)
            s = l > 0.5
                ? d / (2 - max - min)
                : d / (max + min);

            // The (difference / d) part tells us how far within that sector
            // the color lies. Offsetting by +0, +2, +4 selects the correct sector.
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;

                case g:
                    h = (b - r) / d + 2;
                    break;

                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return [
            Math.round(h * 360),
            Math.round(s * 100),
            Math.round(l * 100)
        ];
    }

    
    hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;

        let r, g, b;

        // If saturation is zero, the color is a shade of gray.
        if (s === 0) {
            r = g = b = l;
        } else {

            // - p  = minimum brightness that channel can take
            // - q  = maximum brightness that channel can take
            // - t  = how close this channel is to the target Hue on the color wheel
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;

                // its brightness rises linearly from p to q.
                if (t < 1/6) return p + (q - p) * 6 * t;

                // it should be at its maximum brightness.
                if (t < 1/2) return q;

                // its brightness smoothly falls back from q to p.
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;

                // it stays at the minimum brightness.
                return p;
            };

            // - q = how bright the closest channel to the Hue should be
            // - p = how dark the farthest channel should be
            const q = l < 0.5
                ? l * (1 + s)
                : l + s - l * s;

            const p = 2 * l - q;

            // - Red is 120° ahead (h + 1/3)
            // - Green uses h itself
            // - Blue is 120° behind (h - 1/3)
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        const toHex = x => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    generatePalette() {
        this.paletteGrid.innerHTML = '';
        let inputColor = this.baseColorInput.value.trim();
        let baseHex;
        let count = parseInt(this.colorCountInput.value);
        
        if (this.validateHex(inputColor)) {
            baseHex = inputColor.toUpperCase();
        } else if (inputColor == '') {
            baseHex = this.getRandomColor().toUpperCase();
        } else {
            alert('the hex color was not entered right')
        }

        if (count < 1 || count > 6) {
            alert('the algorithm cannot produce this amount of colors')
            return;
        }

        const baseHsl = this.hexToHsl(baseHex);
        const mode = this.colorModeSelect.value;
        let colorsHsl = [];

        switch(mode) {
            case 'monochromatic':
                colorsHsl = this.generateMonochromaticPalette(baseHsl, count); 
                break;
            case 'analogous':
                colorsHsl = this.generateAnalogousPalette(baseHsl, count); 
                break;
            case 'complementary':
                colorsHsl = this.generateComplementaryPalette(baseHsl, count); 
                break;
            case 'triadic':
                colorsHsl = this.generateTriadicPalette(baseHsl, count); 
                break;
        }

        colorsHsl.forEach(hslArray => {
            const color = this.hslToHex(hslArray[0], hslArray[1], hslArray[2]);
            
            const colorBox = document.createElement("div");
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = color;

            // If L < 50, the text is white, otherwise black
            const textColor = hslArray[2] < 50 ? 'white' : 'black';
            
            const colorCode = document.createElement('span');
            colorCode.className = 'color-code';
            colorCode.textContent = color.toUpperCase();
            colorCode.style.color = textColor;
            colorCode.style.backgroundColor = `rgba(${textColor === 'white' ? '0,0,0' : '255,255,255'}, 0.6)`;
            
            colorBox.appendChild(colorCode);
            
            // Copying the text 
            colorBox.addEventListener('click', () => {
                navigator.clipboard.writeText(color);
                colorBox.querySelector('.color-code').textContent = 'COPIED';
                setTimeout(() => {
                    colorBox.querySelector('.color-code').textContent = color.toUpperCase();
                }, 1000);
            })

            this.paletteGrid.appendChild(colorBox);
        });
    }

    generateMonochromaticPalette(hsl, count) {
        const palette = [];

        // Hue and saturation stay the same for a monochromatic palette
        let [hue, saturation, lightness] = hsl;

        // generate colors by varying only the lightness
        const lightnessStep = 60 / (count - 1); 

        for (let i = 0; i < count; i++) {

            let newLightness = i * lightnessStep;

            // Math.max(10, newLightness) -- the value never goes below 10
            // Math.min(90, ) --  the value never exceeds 90
            newLightness = Math.min(90, Math.max(10, newLightness));

            palette.push([hue, saturation, newLightness]);
        }

        return palette;
    }

    // Hue and saturation stay the same for a monochromatic palette
    generateAnalogousPalette(hsl, count) {
        const palette = [];
        console.log(hsl);

        // In an analogous palette, saturation and lightness stay the same
        // while the hue shifts slightly around the base color
        const [hue, saturation, lightness] = hsl;
        const totalAngle = 30 + (count - 5) * 5;
        const angleStep = totalAngle / (count - 1);
        const startAngle = -totalAngle / 2;

        for (let i = 0; i < count; i++) {
            let angle = startAngle + i * angleStep;
            let newHue = (hue + angle) % 360;
            if (newHue < 0) newHue += 360;

            palette.push([newHue, saturation, lightness]);
        }

        console.log(palette);

        return palette;
    }


    generateComplementaryPalette(hsl, count) {
        const [hue, saturation, lightness] = hsl;
        console.log(hsl);

        // The complementary hue is the hue on the opposite side of the color wheel
        const complementaryHue = (hue + 180) % 360;

        const palette = [];
        palette.push([hue, saturation, lightness]);

        // If more than 1 color is requested, include the complementary color
        if (count > 1) {
            palette.push([complementaryHue, saturation, lightness]);
        }

        // Generate additional variations until count colors are reached
        for (let i = palette.length; i < count; i++) {
            // Even index - base hue
            // Odd index - complementary hue
            let currentHue = (i % 2 === 0) ? hue : complementaryHue; 

            // Saturation decreases by 10% with every step
            // Minimum saturation is 15%
            let newSaturation = Math.max(15, saturation * (1 - 0.1 * i));

            // Shift lightness up for base colors and down for complementary ones
            let newLightness = lightness + (i % 2 === 0 ? 10 : -10);
            newLightness = Math.min(90, Math.max(10, newLightness));

            palette.push([currentHue, newSaturation, newLightness]);
        }
        console.log(palette);
        return palette;
    }


    generateTriadicPalette(hsl, count) {
        const palette = [];
        console.log(hsl);

        let [hue, saturation, lightness] = hsl;

        // Triadic colors are spaced 120° apart on the hue wheel
        // We compute the two additional hues by adding +120° and +240° 
        const h1 = hue;
        const h2 = (hue + 120) % 360;
        const h3 = (hue + 240) % 360;
        const hues = [h1, h2, h3];

        // If the palette size is smaller than 3, only add as many as needed
        for (let i = 0; i < Math.min(count, 3); i++) {
            palette.push([hues[i], saturation, lightness]);
        }

        // If more colors are required, generate additional variations
        for (let i = palette.length; i < count; i++) {
            let currentHue = hues[i % 3]; 

            // Reduce saturation for the additional colors to soften the contrast
            let newSaturation = Math.max(10, saturation * 0.8);

            // Alternate brightness adjustment:
            // even indices become lighter, odd indices become darker
            let newLightness = (i % 2 === 0) 
                ? lightness + 15 
                : lightness - 15;

            newLightness = Math.min(90, Math.max(10, newLightness));
            palette.push([currentHue, newSaturation, newLightness]);
        }
        console.log(palette);
        return palette;
}

}

new ColorPaletteGenerator();

