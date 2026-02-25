document.addEventListener("DOMContentLoaded", () => {
  // --- Element ฝั่งอัปโหลดและแสดงผลเดิม ---
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

  // --- Element ฝั่งกล้อง (ที่เพิ่มเข้ามาใหม่) ---
  const openCameraBtn = document.getElementById('openCameraBtn');
  const closeCameraBtn = document.getElementById('closeCameraBtn');
  const takePhotoBtn = document.getElementById('takePhotoBtn');
  const cameraUI = document.getElementById('cameraUI');
  const cameraVideo = document.getElementById('cameraVideo');

  let stream = null; // ตัวแปรเก็บสถานะกล้อง

  // --- ฟังก์ชันช่วยเหลือ (Helpers) ---
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

  // --- การจัดการโหมด (Fast / Slow) ---
  let selectedMode = modelModeInput?.value || "fast";
  setModeButtonStyles(selectedMode);

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedMode = btn.dataset.mode;
      modelModeInput.value = selectedMode;
      setModeButtonStyles(selectedMode);
    });
  });

  // ==========================================
  // --- Drag and Drop Logic (Global) ---
  // ==========================================
  const dropzone = document.getElementById("dropzone");

  if (dropzone) {
    let dragCounter = 0;

    // ป้องกัน browser เปิดไฟล์เอง
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      document.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    // ไฮไลท์กรอบเมื่อลากไฟล์เข้ามา
    document.addEventListener("dragenter", () => {
      dragCounter++;
      dropzone.classList.add("border-sky-500", "bg-sky-50/80");
      dropzone.classList.remove("border-slate-300", "dark:border-slate-700");
    }, false);

    // ลบไฮไลท์เมื่อลากไฟล์ออก
    document.addEventListener("dragleave", () => {
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        dropzone.classList.remove("border-sky-500", "bg-sky-50/80");
        dropzone.classList.add("border-slate-300", "dark:border-slate-700");
      }
    }, false);

    // เมื่อปล่อยไฟล์ลงมา
    document.addEventListener("drop", (e) => {
      dragCounter = 0;
      dropzone.classList.remove("border-sky-500", "bg-sky-50/80");
      dropzone.classList.add("border-slate-300", "dark:border-slate-700");

      const dt = e.dataTransfer;
      const files = dt.files;

      if (files && files.length > 0) {
        // เอาแค่ไฟล์แรกที่เป็นรูปภาพ
        const file = files[0];
        if (file.type.startsWith("image/")) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInput.files = dataTransfer.files;
          fileInput.dispatchEvent(new Event("change"));
        } else {
          alert("Please drop an image file (JPG/PNG).");
        }
      }
    }, false);
  }

  // ==========================================
  // --- Copy/Paste Logic (Global + Input) ---
  // ==========================================
  const pasteInputEl = document.getElementById("pasteInput");

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    if (!clipboardData) return;

    const items = clipboardData.items;
    let imageFile = null;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file" && item.type.startsWith("image/")) {
        imageFile = item.getAsFile();
        break;
      }
    }

    if (imageFile) {
      e.preventDefault();
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(imageFile);
      fileInput.files = dataTransfer.files;
      fileInput.dispatchEvent(new Event("change"));

      // แสดง feedback ที่ช่อง paste
      if (pasteInputEl) {
        pasteInputEl.value = "✅ Image pasted!";
        pasteInputEl.classList.add("border-emerald-500", "bg-emerald-50");
        setTimeout(() => {
          pasteInputEl.value = "";
          pasteInputEl.classList.remove("border-emerald-500", "bg-emerald-50");
        }, 2000);
      }
    }
  };

  // ฟังก์ชัน paste ทำงานได้ทั้งหน้าเว็บ
  document.addEventListener("paste", handlePaste);

  // คลิกที่กล่อง paste เพื่อ focus (ให้ Ctrl+V ทำงาน)
  if (pasteInputEl) {
    pasteInputEl.addEventListener("click", () => pasteInputEl.focus());
  }

  // --- จัดการเมื่อมีการเลือกไฟล์ภาพ (ทั้งจากการเลือกไฟล์ปกติ และจากการถ่ายรูป) ---
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    // อัปเดตข้อความชื่อไฟล์
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

    // สร้าง Preview รูปภาพ
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewImg.classList.remove("hidden");
      uploadIcon.classList.add("hidden");
      fileHint.classList.add("hidden");
    };
    reader.readAsDataURL(file);
  });

  // ==========================================
  // --- ส่วนจัดการระบบกล้อง (Camera Logic) ---
  // ==========================================

  // ฟังก์ชันปิดกล้อง
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
    }
    if (cameraUI) {
      cameraUI.classList.add('hidden');
      cameraUI.classList.remove('flex');
    }
    // ถ้ายกเลิกถ่ายกล้อง แล้วยังไม่มีไฟล์รูปเดิมอยู่ ให้แสดงไอคอนอัปโหลดกลับมา
    if (!fileInput.files || fileInput.files.length === 0) {
      uploadIcon.classList.remove('hidden');
      fileHint.classList.remove('hidden');
      previewImg.classList.add('hidden');
    } else {
      previewImg.classList.remove('hidden');
    }
  };

  if (openCameraBtn) {
    openCameraBtn.addEventListener('click', async () => {
      try {
        // ขอเปิดกล้องหลัง
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        cameraVideo.srcObject = stream;

        // สลับ UI
        cameraUI.classList.remove('hidden');
        cameraUI.classList.add('flex');
        previewImg.classList.add('hidden');
        uploadIcon.classList.add('hidden');
        fileHint.classList.add('hidden');
      } catch (err) {
        alert("ไม่สามารถเข้าถึงกล้องได้ กรุณาตรวจสอบการอนุญาตใช้งานกล้อง (Camera Permissions)");
        console.error("Camera error:", err);
      }
    });
  }

  if (closeCameraBtn) {
    closeCameraBtn.addEventListener('click', stopCamera);
  }

  if (takePhotoBtn) {
    takePhotoBtn.addEventListener('click', () => {
      // 1. วาดภาพลง Canvas
      const canvas = document.createElement('canvas');
      canvas.width = cameraVideo.videoWidth;
      canvas.height = cameraVideo.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);

      // 2. แปลง Canvas เป็นไฟล์ Blob (JPEG)
      canvas.toBlob((blob) => {
        const file = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });

        // 3. ยัดไฟล์ลงใน <input type="file"> ด้วย DataTransfer
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        // 4. สั่ง Trigger Event 'change' เพื่อให้ระบบพรีวิวเดิมทำงานอัตโนมัติ
        fileInput.dispatchEvent(new Event('change'));

        // 5. ปิดกล้อง
        stopCamera();
      }, 'image/jpeg', 0.9);
    });
  }

  // ==========================================
  // --- ส่วนส่งข้อมูลไป Backend (AJAX/XHR) ---
  // ==========================================

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
      alert("Please upload an image or take a photo first.");
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

      if (summaryTableBody) {
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
      }

      const modeLabel = data.mode === "slow" ? "Slow (Detailed)" : "Fast (Realtime)";
      resultDiv.textContent = `${modeLabel}: ${data.prediction}`;
    };

    xhr.send(formData);
  });
});