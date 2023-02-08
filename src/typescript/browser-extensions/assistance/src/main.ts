import brain from "./img/brain.svg";

declare global {
  interface Window {
    _gmailjs: Gmail;
    gmail: Gmail;
  }
}

const loaderId = setInterval(() => {
  if (!window._gmailjs) {
    return;
  }

  clearInterval(loaderId);
  startExtension(window._gmailjs);
}, 100);

function startExtension(gmail: Gmail) {
  console.log("Extension loading...");
  window.gmail = gmail;

  gmail.observe.on("load", () => {
    const userEmail = gmail.get.user_email();
    console.log("Hello, " + userEmail + ". This is your extension talking!");

    addIcon();

    gmail.observe.on("view_email", (domEmail) => {
      console.log("Looking at email:", domEmail);
      const emailData = gmail.new.get.email_data(domEmail);
      console.log("Email data:", emailData);
    });

    gmail.observe.on("compose", (compose) => {
      console.log("New compose window is opened!", compose);
    });
  });
}

const addIcon = () => {
  const googleBanner = document.getElementById("gb");
  const brainWrapper = document.createElement("img");
  brainWrapper.src = brain;

  googleBanner?.appendChild(brainWrapper);
};

export {};
