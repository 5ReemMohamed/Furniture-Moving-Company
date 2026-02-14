document.addEventListener("DOMContentLoaded", function () {


    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse).hide();
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

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

    if (!form) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const serviceInput = document.getElementById("service");
    const messageInput = document.getElementById("message");
    const transferFromInput = document.getElementById("transferFrom");
    const transferToInput = document.getElementById("transferTo");
    const dateInput = document.getElementById("date");

    if (dateInput) {
        dateInput.min = new Date().toISOString().split("T")[0];
    }

    const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{8,15}$/;

    function validateInput(input, regex, errorId, emptyMessage, invalidMessage) {
        if (!input) return true;

        const errorElement = document.getElementById(errorId);

        if (input.value.trim() === "") {
            errorElement.innerText = emptyMessage;
            return false;
        }

        if (regex && !regex.test(input.value.trim())) {
            errorElement.innerText = invalidMessage;
            return false;
        }

        errorElement.innerText = "";
        return true;
    }

    function validateSelect() {
        const errorElement = document.getElementById("serviceError");

        if (!serviceInput || serviceInput.selectedIndex === 0) {
            errorElement.innerText = "يجب اختيار خدمة";
            return false;
        }

        errorElement.innerText = "";
        return true;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const isNameValid = validateInput(
            nameInput,
            nameRegex,
            "nameError",
            "الاسم مطلوب",
            "الاسم غير صحيح"
        );

        const isEmailValid = validateInput(
            emailInput,
            emailRegex,
            "emailError",
            "الايميل مطلوب",
            "الايميل غير صحيح"
        );

        const isPhoneValid = validateInput(
            phoneInput,
            phoneRegex,
            "phoneError",
            "رقم الهاتف مطلوب",
            "رقم الهاتف غير صحيح"
        );

        const isTransferFromValid = validateInput(
            transferFromInput,
            null,
            "transferFromError",
            "مكان النقل مطلوب",
            ""
        );

        const isTransferToValid = validateInput(
            transferToInput,
            null,
            "transferToError",
            "مكان الوصول مطلوب",
            ""
        );

        const isDateValid = validateInput(
            dateInput,
            null,
            "dateError",
            "تاريخ النقل مطلوب",
            ""
        );

        const isMessageValid = validateInput(
            messageInput,
            null,
            "messageError",
            "الرسالة مطلوبة",
            ""
        );

        const isServiceValid = validateSelect();

        if (
            isNameValid &&
            isEmailValid &&
            isPhoneValid &&
            isTransferFromValid &&
            isTransferToValid &&
            isDateValid &&
            isMessageValid &&
            isServiceValid
        ) {

            const whatsappMessage =
`الاسم: ${nameInput.value}
الايميل: ${emailInput.value}
رقم الهاتف: ${phoneInput.value}
النقل من: ${transferFromInput.value}
النقل إلى: ${transferToInput.value}
تاريخ النقل: ${dateInput.value}
الخدمة: ${serviceInput.value}
الرسالة: ${messageInput.value}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);

            window.open(`https://wa.me/962790463354?text=${encodedMessage}`, "_blank");

            form.reset();
        }
    });
});
  AOS.init({
            duration: 1000,
            once: false
        });