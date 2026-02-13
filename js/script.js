document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarToggler = document.querySelector('.navbar-collapse');
        if (navbarToggler.classList.contains('show')) {
            new bootstrap.Collapse(navbarToggler).hide();
        }
    });
});
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
    });
});

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const serviceInput = document.getElementById("service");
const messageInput = document.getElementById("message");

const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{8,15}$/;

function validateInput(input, regex, errorElement, emptyMessage, invalidMessage) {
    if (input.value.trim() === "") {
        errorElement.innerText = emptyMessage;
        return false;
    } else if (regex && !regex.test(input.value.trim())) {
        errorElement.innerText = invalidMessage;
        return false;
    } else {
        errorElement.innerText = "";
        return true;
    }
}

function validateSelect() {
    if (serviceInput.value === "" || serviceInput.selectedIndex === 0) {
        document.getElementById("serviceError").innerText = "يجب اختيار خدمة";
        return false;
    } else {
        document.getElementById("serviceError").innerText = "";
        return true;
    }
}

[nameInput, emailInput, phoneInput, messageInput].forEach(input => {
    input.addEventListener("input", () => {
        if (input.value.trim() !== "") {
            input.nextElementSibling.innerText = "";
        }
    });
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isNameValid = validateInput(
        nameInput,
        nameRegex,
        document.getElementById("nameError"),
        "الاسم مطلوب",
        "الاسم غير صحيح"
    );

    let isEmailValid = validateInput(
        emailInput,
        emailRegex,
        document.getElementById("emailError"),
        "الايميل مطلوب",
        "الايميل غير صحيح"
    );

    let isPhoneValid = validateInput(
        phoneInput,
        phoneRegex,
        document.getElementById("phoneError"),
        "رقم الهاتف مطلوب",
        "رقم الهاتف غير صحيح"
    );

    let isMessageValid = validateInput(
        messageInput,
        null,
        document.getElementById("messageError"),
        "الرسالة مطلوبة",
        ""
    );

    let isServiceValid = validateSelect();

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid && isServiceValid) {

        let whatsappMessage =
            `الاسم: ${nameInput.value}
الايميل: ${emailInput.value}
رقم الهاتف: ${phoneInput.value}
الخدمة: ${serviceInput.value}
الرسالة: ${messageInput.value}`;

        let encodedMessage = encodeURIComponent(whatsappMessage);

        window.open(`https://wa.me/962790463354?text=${encodedMessage}`, "_blank");

        Swal.fire({
            icon: 'success',
            title: 'تم الإرسال بنجاح',
            text: 'سيتم تحويلك إلى واتساب',
            confirmButtonText: 'حسناً'
        });

        form.reset();
    }
});
AOS.init({
    duration: 1000,
    once: false,
});
