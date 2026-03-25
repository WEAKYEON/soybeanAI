// --- คำอธิบายผลลัพธ์แต่ละประเภทเมล็ด ---
const seedDescriptions = {
  "Broken": {
    emoji: "💔",
    title: { th: "Broken — เมล็ดแตกหัก (Broken Seeds)", en: "Broken — (Broken Seeds)" },
    text: {
      th: "เมล็ดถั่วเหลืองที่มีการแตกหัก บิ่น หรือสูญเสียรูปทรงดั้งเดิม มักเกิดจากการปฏิบัติงานในขั้นตอนการเก็บเกี่ยว การสี หรือการขนส่งที่ไม่ระมัดระวังเพียงพอ เมล็ดในกลุ่มนี้จะมีการเสื่อมคุณภาพอย่างรวดเร็วเนื่องจากเนื้อเยื่อภายในสัมผัสกับอากาศ ส่งผลให้เกิดปฏิกิริยาออกซิเดชันและลดอายุการเก็บรักษา แม้ไม่เหมาะสมสำหรับใช้เป็นเมล็ดพันธุ์หรือการบริโภคโดยตรง แต่ยังคงสามารถนำไปใช้ในอุตสาหกรรมสกัดน้ำมันหรือแปรรูปเป็นวัตถุดิบอาหารสัตว์ได้",
      en: "Soybean seeds that are broken, chipped, or have lost their original shape. Usually caused by rough handling during harvesting, milling, or transport. These seeds deteriorate quickly due to exposed internal tissues, leading to oxidation and reduced shelf life. While not suitable for seed use or direct consumption, they can be used in oil extraction or as animal feed."
    }
  },
  "Immature": {
    emoji: "🌱",
    title: { th: "Immature — เมล็ดยังไม่สุก (Immature Seeds)", en: "Immature — (Immature Seeds)" },
    text: {
      th: "เมล็ดถั่วเหลืองที่ถูกเก็บเกี่ยวก่อนที่จะเจริญเติบโตเต็มที่ ลักษณะทางกายภาพมักมีขนาดเล็ก น้ำหนักเบา และมีสีเขียวหรือสีซีดกว่าเมล็ดที่สมบูรณ์ โครงสร้างทางเคมีของเมล็ดในกลุ่มนี้จะมีสัดส่วนของโปรตีนและไขมันต่ำกว่าเกณฑ์มาตรฐาน ซึ่งส่งผลโดยตรงต่อคุณภาพและอัตราผลผลิตในการนำไปแปรรูป และมักไม่ผ่านเกณฑ์มาตรฐานสำหรับการส่งออกหรือการใช้เป็นเมล็ดพันธุ์",
      en: "Soybean seeds harvested before full maturity. They are physically small, light, and green or paler than mature seeds. The chemical structure has a lower proportion of protein and fat compared to standards, directly affecting quality and yield. They usually fail export or seed quality standards."
    }
  },
  "Intact": {
    emoji: "✅",
    title: { th: "Intact — เมล็ดสมบูรณ์ (Intact Seeds)", en: "Intact — (Intact Seeds)" },
    text: {
      th: "เมล็ดถั่วเหลืองที่มีความสมบูรณ์สูงทั้งทางกายภาพและคุณภาพ ไม่มีร่องรอยการแตกหัก ความเสียหายจากการกระแทก หรือการติดเชื้อ มีสีสันสม่ำเสมอและรูปทรงตามลักษณะสายพันธุ์ เมล็ดในกลุ่มนี้จัดอยู่ในระดับคุณภาพสูงสุด (Premium Quality) ซึ่งมีความเหมาะสมอย่างยิ่งสำหรับการเพาะปลูก การส่งออกเชิงพาณิชย์ รวมถึงการแปรรูปเป็นผลิตภัณฑ์อาหารสำหรับมนุษย์ระดับพรีเมียม (เต้าหู้, นมถั่วเหลือง)",
      en: "Soybean seeds with high physical and quality integrity. They show no signs of breakage, impact damage, or infection. They have consistent color and typical variety shapes. These seeds represent premium quality, highly suitable for cultivation, commercial export, and premium human food products like tofu and soy milk."
    }
  },
  "Skin-damaged": {
    emoji: "🧴",
    title: { th: "Skin-damaged — เมล็ดเปลือกเสียหาย (Skin-damaged Seeds)", en: "Skin-damaged — (Skin-damaged Seeds)" },
    text: {
      th: "เมล็ดถั่วเหลืองที่มีร่องรอยความเสียหายบริเวณเปลือกหุ้มเมล็ด เช่น รอยขีดข่วน ถลอก หรือหลุดลอก ซึ่งอาจเป็นผลกระทบจากการเข้าทำลายของแมลง การขัดสีในระบบสายพานลำเลียง หรือการจัดเก็บในสภาวะความชื้นที่ไม่เหมาะสม การสูญเสียเปลือกป้องกันตามธรรมชาติทำให้เมล็ดมีความเสี่ยงสูงต่อการเข้าทำลายของเชื้อราและแบคทีเรีย รวมทั้งทำให้คุณภาพเสื่อมสภาพในอัตราที่เร่งขึ้น",
      en: "Soybean seeds showing damage on the seed coat, such as scratches, abrasions, or peeling. This can result from insects, abrasion in conveyors, or improper storage humidity. The loss of the natural protective coat makes them highly vulnerable to fungal and bacterial infections and accelerates degradation."
    }
  },
  "Spotted": {
    emoji: "🔴",
    title: { th: "Spotted — เมล็ดมีรอยด่างจุด (Spotted Seeds)", en: "Spotted — (Spotted Seeds)" },
    text: {
      th: "เมล็ดถั่วเหลืองที่ปรากฏรอยด่าง จุดสีดำ จุดสีน้ำตาล หรือความผิดปกติของเม็ดสีบนเปลือกเมล็ด สาเหตุหลักมักเกิดจากการติดเชื้อทางพยาธิวิทยา เช่น เชื้อรากลุ่ม Cercospora หรือ Phomopsis รวมถึงการเข้าทำลายของแมลงกัดเจาะ การปรากฏของจุดเหล่านี้บ่งชี้ถึงการปนเปื้อนทางชีวภาพซึ่งส่งผลกระทบโดยตรงต่อมาตรฐานความปลอดภัยด้านอาหาร ลดมูลค่าเชิงพาณิชย์ของผลผลิต และจำเป็นต้องถูกคัดแยกออก",
      en: "Soybean seeds with spots, black dots, brown spots, or color abnormalities on the seed coat. Usually caused by pathological infections like Cercospora or Phomopsis fungi, or insect damage. The presence of these spots indicates biological contamination, affecting food safety standards and necessitates removal."
    }
  }
};

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
      // 1. สั่งลบสีที่อาจจะตีกันออกให้หมดก่อน (เพิ่ม text-slate-600 เข้าไปลบด้วย)
      btn.classList.remove(
        "bg-white", "text-sky-600", "shadow-sm", "dark:bg-slate-800", "dark:text-white",
        "text-slate-500", "text-slate-600", "hover:text-slate-700", "dark:text-slate-400", "dark:hover:text-slate-200"
      );

      if (isActive) {
        // 2. ถ้าถูกเลือก: เติมสีฟ้าสว่างๆ และเงา
        btn.classList.add("bg-white", "text-sky-600", "shadow-sm", "dark:bg-slate-800", "dark:text-white");
      } else {
        // 3. ถ้าไม่ได้เลือก: เติมสีเทาจางๆ
        btn.classList.add("text-slate-500", "hover:text-slate-700", "dark:text-slate-400", "dark:hover:text-slate-200");
      }
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
          alert(i18n.t("Please drop an image file (JPG/PNG)."));
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
        pasteInputEl.value = i18n.t("✅ Image pasted!");
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
      fileNameSpan.textContent = i18n.t("No file chosen");
      fileNameSpan._origText = "No file chosen"; // Store original to help tree walker if needed
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
        alert(i18n.t("ไม่สามารถเข้าถึงกล้องได้ กรุณาตรวจสอบการอนุญาตใช้งานกล้อง (Camera Permissions)"));
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
      alert(i18n.t("Please upload an image or take a photo first."));
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", selectedMode);

    setProgress(uploadBar, uploadPercent, 0);
    setProgress(analysisBar, analysisPercent, 0);
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = i18n.t("Processing...");
    analyzeBtn._origText = "Processing...";

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
      analyzeBtn.textContent = i18n.t("Analyze");
      analyzeBtn._origText = "Analyze";
      alert(i18n.t("An error occurred during upload. Please try again."));
    };

    xhr.onload = () => {
      stopAnalysisInterval();
      setProgress(analysisBar, analysisPercent, 100);
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = i18n.t("Analyze");
      analyzeBtn._origText = "Analyze";

      const data = xhr.response;
      if (!data || data.error) {
        alert(data?.error ? i18n.t(data.error) : i18n.t("An error occurred on the server. Please try again."));
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

      let modeLabel = "";
      if (data.mode === "swin") {
        modeLabel = "Swin Transformer";
      } else if (data.mode === "slow") {
        modeLabel = i18n.t("Slow (Detailed)");
      } else {
        modeLabel = i18n.t("Fast (Realtime)");
      }

      resultDiv.textContent = `${modeLabel}: ${data.prediction}`;

      // --- แสดงคำอธิบายผลลัพธ์ ---
      const descContainer = document.getElementById("resultDescription");
      const descEmoji = document.getElementById("descEmoji");
      const descTitle = document.getElementById("descTitle");
      const descText = document.getElementById("descText");

      if (descContainer && descEmoji && descTitle && descText) {
        const info = seedDescriptions[data.prediction];
        if (info) {
          descEmoji.textContent = info.emoji;
          descTitle.textContent = info.title[i18n.currentLang] || info.title.en;
          descText.textContent = info.text[i18n.currentLang] || info.text.en;
          descContainer.classList.remove("hidden");
          descContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } else {
          descContainer.classList.add("hidden");
        }
      }
    };

    xhr.send(formData);
  });
});

// ==========================================
// --- ส่วนสลับภาษาและแปลภาษา (i18n) ---
// ==========================================
const i18n = {
  currentLang: localStorage.getItem("lang") || "en",
  dict: {
    "Demo version • No user data stored": "เวอร์ชันสาธิต • ไม่เก็บข้อมูลผู้ใช้",
    "Select": "คัดแยก",
    "soybean seeds": "เมล็ดถั่วเหลือง",
    "with AI": "ด้วย AI",
    "Upload images of seeds or trays, the system will simulate quality classification and defect detection results, show confidence scores and next-step recommendations.": "อัปโหลดรูปภาพเมล็ดหรือถาด ระบบจะจำลองผลการจำแนกคุณภาพและการตรวจจับข้อบกพร่อง แสดงคะแนนความมั่นใจและคำแนะนำขั้นตอนต่อไป",
    "Try Now": "ลองเลย",
    "See How it Works": "ดูวิธีการทำงาน",
    "Simulated Latency": "ความหน่วงจำลอง",
    "Supported Files": "ไฟล์ที่รองรับ",
    "Recommended Resolution": "ความละเอียดที่แนะนำ",
    "Features": "ฟีเจอร์",
    "How it works": "วิธีการทำงาน",
    "Performance": "ประสิทธิภาพ",
    "FAQ": "คำถามที่พบบ่อย",
    "Designed for": "ออกแบบมาเพื่อ",
    "High Performance": "ประสิทธิภาพสูง",
    "Focus on speed, ease of use, and readiness for real-world sorting lines.": "เน้นความเร็ว ใช้งานง่าย และพร้อมสำหรับสายพานคัดแยกจริง",
    "Optimized for Fast Loading": "โหลดเร็ว",
    "Uses SVG/system fonts, lazy-loading, and minimal JS to reduce TTI and CLS.": "ใช้ SVG/ฟอนต์ระบบโหลดอย่างล่าช้า และ JS น้อยที่สุดเพื่อลด TTI และ CLS",
    "Ready-to-use Insights": "ข้อมูลเชิงลึกพร้อมใช้",
    "Summary tables, confidence statistics, pass/reject rates for QC.": "ตารางสรุป สถิติความมั่นใจ อัตราผ่าน/ตกสำหรับ QC",
    "Factory-ready Design": "ดีไซน์พร้อมใช้งานอุตสาหกรรม",
    "Large buttons, touch-friendly, suitable for sorting lines or factories.": "ปุ่มใหญ่ รองรับการสัมผัส เหมาะสำหรับสายพานคัดแยกหรือโรงงาน",
    "Privacy First": "ความเป็นส่วนตัวต้องมาก่อน",
    "All processing is done client-side in this demo. No files are uploaded to the server.": "การประมวลผลทั้งหมดทำในเบราว์เซอร์ ไม่มีการอัปโหลดไฟล์ไปที่เซิร์ฟเวอร์",
    "API Ready": "พร้อมสำหรับเชื่อมต่อ API",
    "Frontend is clearly separated, ready to connect to inference APIs in the future.": "ส่วนหน้ามีการแยกส่วนชัดเจน พร้อมเชื่อมต่อกับ API ประมวลผลในอนาคต",
    "Accessible (A11y)": "เข้าถึงง่าย (A11y)",
    "Uses semantic HTML, clear labels, keyboard and screen reader support.": "เขียน HTML ตามมาตรฐาน มีป้ายกำกับชัดเจน รองรับคีย์บอร์ดและโปรแกรมอ่านจอภาพ",
    "In real production, a conveyor + camera + CNN/Transformer model is used to detect defects (fungus, cracks, abnormal color), then sort using pneumatic solenoids/robotic arms.": "ในการผลิตจริง ใช้สายพาน + กล้อง + โมเดล CNN/Transformer เพื่อตรวจจับข้อบกพร่อง (เชื้อรา รอยแตก สีผิดปกติ) แล้วคัดแยกด้วยลมพ่น/แขนกล",
    "1) Take a photo": "1) ถ่ายรูปภาพ",
    "Even lighting, contrasting background (e.g. black/white), reduce shadows and reflections.": "ใช้แสงคงที่ พื้นหลังตัดสีกัน (ช่น ดำ/ขาว) ลดเงาและแสงสะท้อนให้มากที่สุด",
    "2) Analyze with AI": "2) ประมวลผลด้วย AI",
    "Classify pass/fail, defect locations, and confidence scores.": "ตัดสินผ่าน/ตก, ตำแหน่งที่มีตำหนิ, และความมั่นใจในผลลัพธ์",
    "3) Automatic sorting": "3) คัดแยกอัตโนมัติ",
    "Connect PLC/robot to eject failed seeds from the conveyor.": "ส่งสัญญาณเชื่อม PLC/หุ่นยนต์ เพื่อดีดเป่าเมล็ดที่เสียออกจากสายพาน",
    "Try uploading seed images": "ลองอัปโหลดรูปภาพ",
    "The system will process with real AI.": "ระบบจะดำเนินการตรวจสอบด้วย AI จำลอง",
    "Choose, Drag & Drop, or Paste an image": "เลือก ลากและวาง หรือวางรูปภาพ",
    "Choose File": "เลือกไฟล์",
    "Open Camera": "เปิดกล้อง",
    "No file chosen": "ยังไม่ได้เลือกไฟล์",
    "📋 Click here and press Ctrl+V to paste image": "📋 คลิกที่นี่แล้วกด Ctrl+V เพื่อวางรูปภาพ",
    "Capture Photo": "ถ่ายรูป",
    "Cancel": "ยกเลิก",
    "Supports JPG/PNG up to ~10MB": "รองรับไฟล์ JPG/PNG ขนาดสูงสุด ~10MB",
    "Model speed": "ความเร็วโมเดล",
    "Select your desired analysis mode": "เลือกโหมดการประมวลผล",
    "Upload": "อัปโหลด",
    "Analysis": "วิเคราะห์",
    "Analyze": "วิเคราะห์ผล",
    "Processing...": "กำลังประมวลผล...",
    "Result": "ผลลัพธ์",
    "Seed Type": "ประเภทเมล็ด",
    "Percentage": "เปอร์เซ็นต์",
    "Frequently Asked Questions": "คำถามที่พบบ่อย",
    "Does this demo use real AI?": "เว็บเดโมนี้ใช้ AI ของจริงหรือไม่?",
    "This is a frontend simulation for UI/UX demonstration only. For real systems, connect to a model API (e.g. ONNX/TensorRT/TF Serving) via HTTPS.": "นี่เป็นการจำลองส่วนหน้าเพื่อให้เห็นภาพ UI/UX เท่านั้น ในระบบจริงจะต้องเชื่อมต่อ API (ONNX/TensorRT) ผ่านคลาวด์หรือเซิร์ฟเวอร์",
    "How is it suitable for factory use?": "ทำไมถึงเหมาะใช้ที่โรงงาน?",
    "UI is optimized for high contrast, large buttons, and includes offline mode + PWA to reduce network dependency.": "UI ถูกปรับคอนทราสต์ให้สูง ปุ่มกดขนาดใหญ่ และมีระบบรับไฟล์ที่ต่อออฟไลน์แอปผ่าน PWA ลดการพึ่งเน็ตได้",
    "What about image privacy?": "เรื่องความเป็นส่วนตัวรูปภาพล่ะ?",
    "This demo processes everything in the browser, does not send files to the server, and you can click “Clear All” to remove data from this page instantly.": "เดโมนี้ประมวลผลเบื้องต้นในเบราว์เซอร์ ไฟล์ต่างๆ ไม่ถูกอัปโหลดขึ้นเซิร์ฟเวอร์",
    "Terms of Use": "ข้อตกลงและเงื่อนไข",
    "Privacy Policy": "นโยบายความเป็นส่วนตัว",
    "Mode": "โหมด",
    "Try Upload": "ทดลองอัปโหลด",
    "Demo": "เดโม",
    "Please drop an image file (JPG/PNG).": "กรุณาวางไฟล์รูปภาพ (JPG/PNG)",
    "✅ Image pasted!": "✅ วางรูปภาพแล้ว!",
    "ไม่สามารถเข้าถึงกล้องได้ กรุณาตรวจสอบการอนุญาตใช้งานกล้อง (Camera Permissions)": "ไม่สามารถเข้าถึงกล้องได้ กรุณาตรวจสอบการตั้งค่าเบราว์เซอร์",
    "Please upload an image or take a photo first.": "กรุณาเลือกไฟล์หรือถ่ายภาพก่อน",
    "An error occurred during upload. Please try again.": "เกิดข้อผิดพลาดในการอัปโหลด กรุณาลองใหม่อีกครั้ง",
    "An error occurred on the server. Please try again.": "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง",
    "Slow (Detailed)": "ช้า (ละเอียด)",
    "Fast (Realtime)": "เร็ว (เรียลไทม์)"
  },
  t: function (text) {
    if (this.currentLang === "th") {
      // Find translated text, or fallback to English
      return this.dict[text] || this.dict[text.replace(/\s+/g, ' ')] || text;
    }
    return text;
  },
  apply: function (lang) {
    this.currentLang = lang;
    localStorage.setItem("lang", lang);
    const langLabel = document.getElementById("langText");
    if (langLabel) langLabel.textContent = lang.toUpperCase();

    // 1. Walk through DOM Text Nodes and translate
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let n;
    while ((n = walk.nextNode())) {
      // Ignore text within scripts and styles
      if (['SCRIPT', 'STYLE'].includes(n.parentNode.nodeName)) continue;

      let originalText = n._origText;
      if (!originalText) {
        originalText = n.nodeValue;
        if (originalText.trim()) {
          n._origText = originalText;
        }
      }

      if (originalText && originalText.trim()) {
        const normalized = originalText.replace(/\s+/g, ' ').trim();
        if (this.dict[normalized]) {
          const leading = originalText.match(/^\s*/)[0];
          const trailing = originalText.match(/\s*$/)[0];
          n.nodeValue = leading + (lang === "th" ? this.dict[normalized] : normalized) + trailing;
        } else if (this.dict[originalText]) {
          n.nodeValue = lang === "th" ? this.dict[originalText] : originalText;
        }
      }
    }

    // 2. Attributes and Placeholders
    const pasteInput = document.getElementById("pasteInput");
    if (pasteInput) {
      if (lang === "th") {
        pasteInput.placeholder = "📋 คลิกที่นี่แล้วกด Ctrl+V เพื่อวางรูปภาพ";
      } else {
        pasteInput.placeholder = "📋 Click here and press Ctrl+V to paste image";
      }
    }

    // 3. Document language attribute
    document.documentElement.lang = lang;

    // 4. Update dynamically visible result titles if there is a prediction
    const descResultEl = document.getElementById("resultDescription");
    if (descResultEl && !descResultEl.classList.contains("hidden")) {
      const titleEl = document.getElementById("descTitle");
      const textEl = document.getElementById("descText");
      if (titleEl && textEl) {
        // Try to infer current seed type from title
        for (const [key, info] of Object.entries(seedDescriptions)) {
          if (titleEl.textContent.includes(key)) {
            titleEl.textContent = info.title[lang] || info.title.en;
            textEl.textContent = info.text[lang] || info.text.en;
            break;
          }
        }
      }
    }
  }
};

// Init script
const langToggleBtn = document.getElementById("langToggle");
if (langToggleBtn) {
  langToggleBtn.addEventListener("click", () => {
    i18n.apply(i18n.currentLang === "en" ? "th" : "en");
  });
}

// Ensure initial run applies translations on startup if 'th' is default
if (i18n.currentLang === "th") {
  setTimeout(() => i18n.apply("th"), 100);
}
