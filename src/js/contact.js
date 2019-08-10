/**
 *
 * @param {HTMLElement} targetEl The success message element will be
 * inserted after this element
 * @returns {HTMLElement} Created success message element
 */
function createSuccessMessage(targetEl) {
  if (document.querySelector(".success-message")) {
    const success = document.querySelector(".success-message");
    success.parentNode.removeChild(success);
  }

  const successEl = document.createElement("div");
  successEl.className = "success-message";

  const successTextEl = document.createElement("span");
  successTextEl.textContent = "Thank you, your message has been sent!";

  const successBtnEl = document.createElement("button");
  successBtnEl.className = "success-message__btn";
  successBtnEl.textContent = "Close";

  successEl.appendChild(successTextEl);
  successEl.appendChild(successBtnEl);

  targetEl.insertAdjacentElement("afterend", successEl);

  return successEl;
}

/**
 * Adds a click event listener to the first <button> element inside the
 * successEl parameter, to remove the successEL element from the DOM
 * when the <button> is clicked.
 *
 * @param {HTMLElement} successEl
 */
function addSuccessButtonInteractivity(successEl) {
  successEl.querySelector("button").addEventListener("click", () => {
    successEl.parentNode.removeChild(successEl);
  });
}

const contactForm = document.getElementById("contact");

contactForm.addEventListener("submit", async event => {
  event.preventDefault();
  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Fetch POST request failed; submitting form manually");
    }

    const successEl = createSuccessMessage(contactForm);
    if (successEl) {
      addSuccessButtonInteractivity(successEl);
    } else {
      window.open("/thank-you");
    }

    contactForm.reset();
  } catch (error) {
    contactForm.submit();
    return new Error(error);
  }
});
