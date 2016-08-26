function scrollTo(className) {
    "use strict";
    document.getElementById(className).scrollIntoView(true);
}
function makeContact() {
    "use strict";
    document.body.style.overflow = 'hidden';
    document.getElementById('section-contact').style.display = "block";
}
function closeContactForm() {
    "use strict";
    document.body.style.overflow = '';
    document.getElementById('section-contact').style.display = "none";
}
function submitForm() {
    "use strict";
    closeContactForm();
}
