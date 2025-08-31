document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.querySelector('input[type="file"]');
    const analyzeBtn = document.getElementById("analyzeBtn");
    const summaryTableBody = document.querySelector("#summaryTable tbody");
    const previewImg = document.getElementById("previewImg");
    const uploadIcon = document.getElementById("uploadIcon");
    const fileHint = document.getElementById("fileHint");

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (!file) {
            previewImg.src = "";
            previewImg.classList.add("hidden");
            uploadIcon.classList.remove("hidden");
            fileHint.classList.remove("hidden");
            return;
        }

        const reader = new FileReader();
        reader.onload = e => {
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
        analyzeBtn.closest("form").appendChild(resultDiv);
    }

    analyzeBtn.addEventListener("click", async () => {
        const file = fileInput.files[0];
        if (!file) return alert("กรุณาเลือกไฟล์ก่อน");

        const formData = new FormData();
        formData.append("file", file);

        // ส่งไฟล์ไป Flask
        const res = await fetch("/predict", { method: "POST", body: formData });
        const data = await res.json();

        if (data.error) return alert(data.error);

        // ล้างตารางเก่า
        summaryTableBody.innerHTML = "";

        // เติมตารางใหม่
        for (const [cls, pct] of Object.entries(data.percentages)) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td class="p-2 border-b border-slate-200 dark:border-slate-700">${cls}</td>
        <td class="p-2 border-b border-slate-200 dark:border-slate-700">${pct.toFixed(2)}%</td>
      `;
            summaryTableBody.appendChild(tr);
        }

        // แสดงผลลัพธ์ทำนายบนเว็บ
        resultDiv.textContent = `ผลลัพธ์: ${data.prediction}`;
    });
});
