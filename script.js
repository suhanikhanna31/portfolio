
(function(){
  const samples = window.CODE_SAMPLES || {};
  let currentProject = "signal";
  let currentIndex = 0;

  const fileList = document.getElementById("file-list");
  const codeContent = document.getElementById("code-content");
  const codePath = document.getElementById("code-path");
  const copyButton = document.getElementById("copy-code");

  function renderFiles(project){
    currentProject = project;
    currentIndex = 0;
    const files = samples[project] || [];
    fileList.innerHTML = "";
    files.forEach((file, i) => {
      const button = document.createElement("button");
      button.className = "file-btn" + (i === 0 ? " active" : "");
      button.textContent = file.title;
      button.addEventListener("click", () => {
        currentIndex = i;
        [...fileList.children].forEach(x => x.classList.remove("active"));
        button.classList.add("active");
        renderCode();
      });
      fileList.appendChild(button);
    });
    renderCode();
  }

  function renderCode(){
    const file = (samples[currentProject] || [])[currentIndex];
    if(!file) return;
    codePath.textContent = file.path;
    codeContent.textContent = file.code;
  }

  document.querySelectorAll(".code-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".code-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderFiles(tab.dataset.tab);
      document.getElementById("code").scrollIntoView({behavior:"smooth", block:"start"});
    });
  });

  document.querySelectorAll("[data-code-project]").forEach(link => {
    link.addEventListener("click", () => {
      const project = link.dataset.codeProject;
      const tab = document.querySelector('.code-tab[data-tab="' + project + '"]');
      if(tab) tab.click();
    });
  });

  copyButton.addEventListener("click", async () => {
    const text = codeContent.textContent;
    try{
      await navigator.clipboard.writeText(text);
      copyButton.textContent = "Copied";
      setTimeout(() => copyButton.textContent = "Copy", 1000);
    }catch(e){
      copyButton.textContent = "Select + copy";
      setTimeout(() => copyButton.textContent = "Copy", 1200);
    }
  });

  renderFiles("signal");
})();
