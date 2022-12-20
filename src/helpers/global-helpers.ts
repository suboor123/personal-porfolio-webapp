export class GlobalHelpers {
    public static openContactForm = () => {
        const formBtn = document.getElementById('contact-btn');
        formBtn.click()
    }

    public static toggleSidebar = () => {
        const navEl = document.getElementById("myWebNav");
        const navModalEl = document.getElementById("modalContent");
        if (navEl.classList.contains("active-overlay-content-otr")) {
            navEl.classList.remove("active-overlay-content-otr");
            navModalEl.classList.remove("active");
          } else {
            navEl.classList.add("active-overlay-content-otr");
            navModalEl.classList.add("active");
          }
    }

    public static closeSidebar = () => {
        const navEl = document.getElementById("myWebNav");
        const navModalEl = document.getElementById("modalContent");
        navEl.classList.remove("active-overlay-content-otr");
        navModalEl.classList.remove("active");
    }
}