const quotes = [
  "Watch how quickly fingers fly across the keys when your mind is calm and completely focused.",
  "Practice makes perfect if you keep going every day without giving up or losing your focus.",
  "Can you solve this puzzle faster than your friend using only your keyboard and sharp mind?",
  "Please type each word carefully without rushing so your brain and hands stay in perfect sync.",
  "Zebra jumped quickly from the box when Jack whistled and ran toward the bright yellow wall."
];

//جمله فعلی تایپ -نمایش متن تایپ
let currentQuote = "";
//زمان شروع تایپ-محاسبه زمان
let startTime = null;
//شناسه تایمر-متوقف کردن تایمر
let interval;
//تعداد اشتباه-محاسبه دقت
let errorCount = 0;

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");
const modal = document.getElementById("resultModal");
const modalTime = document.getElementById("modalTime");
const modalAccuracy = document.getElementById("modalAccuracy");
const modalErrors = document.getElementById("modalErrors");
const closeModal = document.getElementById("closeModal");
const darkToggle = document.getElementById("darkModeToggle");

//بارگذاری جمله جدید
//انتخاب یک جمله تصادفی-نمایش آن-پاک کردن ورودی کاربر-ریست کردن تایمر خطاها
function loadQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = currentQuote;
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.classList.remove("error");
  resetStats();
  clearInterval(interval);
  startTime = null;
  errorCount = 0;
}

//تایمر

function startTimer() {
  startTime = Date.now();
  interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timeEl.textContent = elapsed;
  }, 1000);
}
//بررسی تایپ کاربر
// گرفتن متن تایپ شده توسط کاربر و تطبیق ان

inputEl.addEventListener("input", () => {
  const typed = inputEl.value;
  const expected = currentQuote.substring(0, typed.length);
// استارت تایم
  if (!startTime && typed.length > 0) {
    startTimer();
  }
//اگر درست تایپ شد:تایمر متوقف میشود- ورودی غیر فعال میشود-نمایش نتایج
  if (typed === currentQuote) {
    clearInterval(interval);
    inputEl.disabled = true;
    calculateResults();
    showModal();
    return;
  }
//اگر تایپ اشتباه  باشد:کلاس ارور اضافه میشود-شمارش خط بالا میرود- حرف اشتباه حذف میشود و مجبور به اصلاح میشود
  if (typed !== expected) {
    inputEl.classList.add("error");
    errorCount++;
    inputEl.value = typed.slice(0, -1);
  } else {
    inputEl.classList.remove("error");
  }
});

//محاسبه نتایج
//زمان-تعداد حروف درست -دقت درصدی

function calculateResults() {
  const totalTime = Math.floor((Date.now() - startTime) / 1000);
  const typedChars = inputEl.value.length;
  const correctChars = typedChars - errorCount;
  const totalChars = currentQuote.length;
  const accuracy = Math.max(0, Math.round((correctChars / totalChars) * 100));

  timeEl.textContent = totalTime;
  accuracyEl.textContent = accuracy;
  modalTime.textContent = totalTime;
  modalAccuracy.textContent = accuracy;
  modalErrors.textContent = errorCount;
}

// ریست مقادیر 

function resetStats() {
  timeEl.textContent = "0";
  accuracyEl.textContent = "100";
}

//دکمه ریست

restartBtn.addEventListener("click", () => {
  loadQuote();
});

//بستن پنجره نمایش

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  loadQuote();
});

//نمایش نتایج

function showModal() {
  modal.style.display = "flex";
}

//تنظیمات اولیه هنگام بارگذاری صفحه

window.onload = () => {

  //یک جمله جدید لود شود
  loadQuote();

  //اگر حالت تاریک قبلا فعال شده بود دوباره فعالش میکنه

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    darkToggle.checked = true;
  }

//با تغییر کلید حالت تاریک کلاس اضافه و حذف میشود

  darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", darkToggle.checked);
  });
};