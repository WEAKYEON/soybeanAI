document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.querySelector('input[type="file"]');
  const fileNameSpan = document.getElementById("fileName");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const summaryTableBody = document.querySelector("#summaryTable tbody");
  const previewImg = document.getElementById("previewImg");
  const uploadIcon = document.getElementById("uploadIcon");
  const fileHint = document.getElementById("fileHint");
  const uploadBar = document.getElementById("uploadBar");
  const analysisBar = document.getElementById("analysisBar");
  const uploadPercent = document.getElementById("uploadPercent");
  const analysisPercent = document.getElementById("analysisPercent");
  const modeButtons = document.querySelectorAll(".mode-btn");
  const modelModeInput = document.getElementById("modelModeInput");

  const setProgress = (barEl, percentEl, value) => {
    const clamped = Math.min(100, Math.max(0, value));
    barEl.style.width = `${clamped}%`;
    percentEl.textContent = `${Math.round(clamped)}%`;
  };

  const setModeButtonStyles = (activeMode) => {
    modeButtons.forEach((btn) => {
      const isActive = btn.dataset.mode === activeMode;
      btn.classList.toggle("bg-white", isActive);
      btn.classList.toggle("text-sky-600", isActive);
      btn.classList.toggle("dark:bg-slate-800", isActive);
      btn.classList.toggle("dark:text-white", isActive);
    });
  };

  let selectedMode = modelModeInput?.value || "fast";
  setModeButtonStyles(selectedMode);

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedMode = btn.dataset.mode;
      modelModeInput.value = selectedMode;
      setModeButtonStyles(selectedMode);
    });
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    // --- 🌟 เริ่มส่วนที่เพิ่ม ---
    // อัปเดตข้อความ "No file chosen"
    if (file) {
      fileNameSpan.textContent = file.name;
    } else {
      fileNameSpan.textContent = "No file chosen";
    }

    if (!file) {
      previewImg.src = "";
      previewImg.classList.add("hidden");
      uploadIcon.classList.remove("hidden");
      fileHint.classList.remove("hidden");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewImg.classList.remove("hidden");
      uploadIcon.classList.add("hidden");
      fileHint.classList.add("hidden");
    };
    reader.readAsDataURL(file);
  });

  // สร้าง element สำหรับผลลัพธ์
  let resultDiv = document.getElementById("predictionResult");
  if (!resultDiv) {
    resultDiv = document.createElement("div");
    resultDiv.id = "predictionResult";
    resultDiv.className = "mt-4 text-lg font-bold text-sky-600";
    resultDiv.setAttribute("aria-live", "polite");
    analyzeBtn.closest("form").appendChild(resultDiv);
  }

  analyzeBtn.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", selectedMode);

    setProgress(uploadBar, uploadPercent, 0);
    setProgress(analysisBar, analysisPercent, 0);
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "Processing...";

    const xhr = new XMLHttpRequest();
    let analysisInterval = null;
    let analysisProgress = 0;

    const stopAnalysisInterval = () => {
      if (analysisInterval) {
        clearInterval(analysisInterval);
        analysisInterval = null;
      }
    };

    xhr.open("POST", "/predict");
    xhr.responseType = "json";

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      const percent = (event.loaded / event.total) * 100;
      setProgress(uploadBar, uploadPercent, percent);
    };

    xhr.upload.onload = () => {
      setProgress(uploadBar, uploadPercent, 100);
      analysisInterval = setInterval(() => {
        analysisProgress = Math.min(analysisProgress + Math.random() * 10, 95);
        setProgress(analysisBar, analysisPercent, analysisProgress);
      }, 200);
    };

    xhr.onerror = () => {
      stopAnalysisInterval();
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = "Analyze";
      alert("An error occurred during upload. Please try again.");
    };

    xhr.onload = () => {
      stopAnalysisInterval();
      setProgress(analysisBar, analysisPercent, 100);
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = "Analyze";

      const data = xhr.response;
      if (!data || data.error) {
        alert(data?.error || "An error occurred on the server. Please try again.");
        return;
      }

      summaryTableBody.innerHTML = "";

      Object.entries(data.percentages).forEach(([cls, pct]) => {
        const width = Math.min(100, Math.max(0, pct));
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="p-2 border-b border-slate-200 dark:border-slate-700">${cls}</td>
          <td class="p-2 border-b border-slate-200 dark:border-slate-700">
            <div class="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>${pct.toFixed(2)}%</span>
            </div>
            <div class="mt-1 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
              <div class="h-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-500" style="width:${width}%"></div>
            </div>
          </td>
        `;
        summaryTableBody.appendChild(tr);
      });

      const modeLabel = data.mode === "slow" ? "Slow (Detailed)" : "Fast (Realtime)";
      resultDiv.textContent = `${modeLabel}: ${data.prediction}`;
    };

    xhr.send(formData);
  });
});
