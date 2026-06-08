/* ============================================================
   +wonder LP  -  main.js
   ============================================================ */
(function () {
  "use strict";

  /* ---- モバイルメニュー開閉 ---- */
  var menuBtn = document.getElementById("menu-btn");
  var nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    });

    // メニュー内リンクをクリックしたら閉じる
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuBtn.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- スクロールで要素をふわっと表示 ---- */
  var targets = document.querySelectorAll(
    ".feature__card, .menu__card, .price__card, .flow__step, .voice__card, .flow__photos figure, .section__title, .section__lead"
  );
  targets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- フォームの簡易バリデーション ---- */
  var form = document.getElementById("reserve-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ["name", "tel"].forEach(function (id) {
        var field = document.getElementById(id);
        if (!field) return;
        if (!field.value.trim()) {
          field.classList.add("is-error");
          ok = false;
        } else {
          field.classList.remove("is-error");
        }
      });

      if (!ok) {
        alert("お名前と電話番号を入力してください。");
        return;
      }

      // TODO: ここで送信先（メール送信API / LINE / 予約システム）に接続する
      alert("送信ありがとうございます。\n※現在はデモ表示です。送信先の設定後に本送信されます。");
      form.reset();
    });

    // 入力したらエラー表示を解除
    form.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("input", function () {
        input.classList.remove("is-error");
      });
    });
  }

  /* ---- ヘッダー：スクロール量に応じて影を強調 ---- */
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,.08)";
      } else {
        header.style.boxShadow = "none";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
