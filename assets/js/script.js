'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// ====== نظام الفلترة المعدل ====== //
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// دالة الفلترة المعدلة
const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    const itemCategory = item.getAttribute('data-category').toLowerCase();
    
    if (selectedValue === "all" || itemCategory === selectedValue.toLowerCase()) {
      item.style.display = "block";
      item.classList.add("active");
    } else {
      item.style.display = "none";
      item.classList.remove("active");
    }
  });
}

// أحداث الفلترة للأزرار الكبيرة
filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const selectedValue = this.textContent.toLowerCase();
    selectValue.textContent = this.textContent;
    filterFunc(selectedValue);
    
    // تحديث الحالة النشطة للأزرار
    filterBtn.forEach(b => b.classList.remove("active"));
    this.classList.add("active");
  });
});

// أحداث القائمة المنسدلة للجوال
select.addEventListener("click", function () { elementToggleFunc(this); });

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedValue = this.textContent.toLowerCase();
    selectValue.textContent = this.textContent;
    elementToggleFunc(select);
    filterFunc(selectedValue);
    
    // مزامنة الحالة النشطة مع الأزرار الكبيرة
    filterBtn.forEach(btn => {
      btn.classList.remove("active");
      if(btn.textContent.toLowerCase() === selectedValue) {
        btn.classList.add("active");
      }
    });
  });
});

// ====== باقي الكود ====== //
// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    form.checkValidity() ? formBtn.removeAttribute("disabled") : formBtn.setAttribute("disabled", "");
  });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    pages.forEach(page => {
      if (this.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
      }
    });
    
    navigationLinks.forEach(navLink => {
      navLink.classList.toggle("active", navLink === this);
    });
  });
});