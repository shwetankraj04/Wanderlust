(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//edit.ejs(navbar)

document.addEventListener("DOMContentLoaded", () => {
  const navbarCollapse = document.getElementById("navbarNavAltMarkup");
  const pageContent = document.getElementById("pageContent");

  function updateContentPadding() {
    const isExpanded = navbarCollapse.classList.contains("show");
    if (isExpanded && pageContent) {
      pageContent.style.paddingTop = navbarCollapse.offsetHeight + "px";
    } else if (pageContent) {
      pageContent.style.paddingTop = "0";
    }
  }

  const observer = new MutationObserver(() => {
    updateContentPadding();
  });

  observer.observe(navbarCollapse, {
    attributes: true,
    attributeFilter: ["class"],
  });

  document.querySelector(".navbar-toggler").addEventListener("click", () => {
    setTimeout(updateContentPadding, 350);
  });

  window.addEventListener("resize", updateContentPadding);

  updateContentPadding();
});

//edit.ejs(logic for filters)
// Tax toggle logic
let taxSwitch = document.getElementById("switchCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (info of taxInfo) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});

// Scroll filters logic
function scrollFilters(direction) {
  const filterWrapper = document.getElementById("filters");
  const scrollAmount = 200;

  if (direction === "left") {
    filterWrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else {
    filterWrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}

function updateScrollButtons() {
  const container = document.getElementById("filters");
  const leftBtn = document.querySelector(".scroll-btn.left");
  const rightBtn = document.querySelector(".scroll-btn.right");

  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  if (container.scrollLeft <= 0) {
    leftBtn.classList.add("hidden");
  } else {
    leftBtn.classList.remove("hidden");
  }

  if (container.scrollLeft >= maxScrollLeft - 1) {
    rightBtn.classList.add("hidden");
  } else {
    rightBtn.classList.remove("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("filters");

  updateScrollButtons();

  container.addEventListener("scroll", updateScrollButtons);
  window.addEventListener("resize", updateScrollButtons);
});
