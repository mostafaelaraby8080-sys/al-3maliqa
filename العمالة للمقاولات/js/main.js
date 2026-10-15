/* شركة العمالقة — JavaScript */
document.addEventListener("DOMContentLoaded", function () {
  /* الهيدر عند السكرول */
  var header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 40);
  });

  /* منيو الموبايل */
  var burger = document.getElementById("burger");
  var links = document.getElementById("links");
  if (burger)
    burger.addEventListener("click", function () {
      links.classList.toggle("open");
    });

  /* سلايدر الهيرو */
  var slides = document.querySelectorAll(".slide");
  var dotsBox = document.getElementById("dots");
  if (slides.length && dotsBox) {
    var cur = 0,
      timer;
    slides.forEach(function (_, i) {
      var d = document.createElement("i");
      if (i === 0) d.classList.add("on");
      d.addEventListener("click", function () {
        go(i);
        reset();
      });
      dotsBox.appendChild(d);
    });
    var dots = dotsBox.querySelectorAll("i");
    function go(n) {
      slides[cur].classList.remove("on");
      dots[cur].classList.remove("on");
      cur = n;
      slides[cur].classList.add("on");
      dots[cur].classList.add("on");
    }
    function reset() {
      clearInterval(timer);
      timer = setInterval(function () {
        go((cur + 1) % slides.length);
      }, 5000);
    }
    reset();
  }

  /* عدّادات الأرقام */
  var nums = document.querySelectorAll(".count");
  if (nums.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target,
            target = +el.dataset.n,
            start = null;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / 1600, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    nums.forEach(function (n) {
      io.observe(n);
    });
  }

  /* ظهور العناصر عند السكرول */
  var rev = document.querySelectorAll(".reveal");
  var io2 = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("vis");
          io2.unobserve(en.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  rev.forEach(function (el) {
    io2.observe(el);
  });

  /* سنة الفوتر */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ===== صفحة العقارات ===== */
  var propsBox = document.getElementById("props");
  if (propsBox) {
    var LOCAL = [
      {
        t: "شقة سوبر لوكس 180م",
        loc: "شاطئ النيل — دمياط",
        price: "1,850,000 ج.م",
        cat: "شقق",
        img: "images/interior-living.jpg",
        beds: 3,
        baths: 2,
        area: 180,
        type: "للبيع",
      },
      {
        t: "فيلا مستقلة بحديقة وحمام سباحة",
        loc: "اللاتيني — دمياط",
        price: "6,900,000 ج.م",
        cat: "فلل",
        img: "images/villa-garden.jpg",
        beds: 5,
        baths: 4,
        area: 420,
        type: "للبيع",
      },
      {
        t: "دوبلكس تشطيب حديث",
        loc: "الحي الثامن — دمياط الجديدة",
        price: "3,200,000 ج.م",
        cat: "دوبلكس",
        img: "images/duplex-1.jpg",
        beds: 4,
        baths: 3,
        area: 260,
        type: "للبيع",
      },
      {
        t: "محل تجاري واجهة رئيسية",
        loc: "شارع الجمهورية — دمياط",
        price: "35,000 ج.م/شهر",
        cat: "تجاري",
        img: "images/mall-1.jpg",
        beds: 0,
        baths: 1,
        area: 85,
        type: "للإيجار",
      },
      {
        t: "شقة 120م تشطيب كامل",
        loc: "الحي الجامعي — دمياط",
        price: "1,150,000 ج.م",
        cat: "شقق",
        img: "images/interior-bedroom.jpg",
        beds: 2,
        baths: 1,
        area: 120,
        type: "للبيع",
      },
      {
        t: "دوبلكس واجهة زجاجية عصرية",
        loc: "كفر سعد — دمياط",
        price: "2,750,000 ج.م",
        cat: "دوبلكس",
        img: "images/duplex-2.jpg",
        beds: 4,
        baths: 3,
        area: 240,
        type: "للبيع",
      },
      {
        t: "مكتب إداري بالممر التجاري",
        loc: "ميناء دمياط الجديدة",
        price: "18,000 ج.م/شهر",
        cat: "تجاري",
        img: "images/office.jpg",
        beds: 0,
        baths: 1,
        area: 60,
        type: "للإيجار",
      },
      {
        t: "فيلا صف ثاني على البحر",
        loc: "عزبة البرج — دمياط",
        price: "5,400,000 ج.م",
        cat: "فلل",
        img: "images/villa-night.jpg",
        beds: 4,
        baths: 3,
        area: 350,
        type: "للبيع",
      },
      {
        t: "شقة ديلوكس إطلالة نيل",
        loc: "كورنيش النيل — دمياط",
        price: "95,000 ج.م/شهر",
        cat: "شقق",
        img: "images/interior-bedroom2.jpg",
        beds: 3,
        baths: 2,
        area: 160,
        type: "للإيجار",
      },
    ];

    function render(list) {
      propsBox.innerHTML = list
        .map(function (p) {
          return (
            '<article class="prop reveal vis">' +
            '<div class="ph"><img src="' +
            p.img +
            '" alt="' +
            p.t +
            '" loading="lazy">' +
            '<span class="badge">' +
            p.type +
            '</span><span class="price">' +
            p.price +
            "</span></div>" +
            '<div class="body"><h3>' +
            p.t +
            '</h3><p class="loc">📍 ' +
            p.loc +
            "</p>" +
            '<div class="meta">' +
            (p.beds ? "<span>🛏 " + p.beds + " غرف</span>" : "") +
            (p.baths ? "<span>🛁 " + p.baths + " حمام</span>" : "") +
            "<span>📐 " +
            p.area +
            " م²</span></div></div></article>"
          );
        })
        .join("");
    }

    function bindFilters(data) {
      document.querySelectorAll(".chip").forEach(function (c) {
        c.addEventListener("click", function () {
          document.querySelector(".chip.on").classList.remove("on");
          c.classList.add("on");
          var f = c.dataset.f;
          render(
            f === "الكل"
              ? data
              : data.filter(function (p) {
                  return p.cat === f;
                }),
          );
        });
      });
    }

    /* جرّب الباك إند أولاً، وإن لم يكن يعمل استخدم البيانات المحلية */
    fetch("/api/properties")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (Array.isArray(data) && data.length) {
          render(data);
          bindFilters(data);
        } else {
          render(LOCAL);
          bindFilters(LOCAL);
        }
      })
      .catch(function () {
        render(LOCAL);
        bindFilters(LOCAL);
      });
  }

  /* ===== نموذج التواصل ===== */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.getElementById("formMsg");
      var payload = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        service: form.service.value,
        message: form.message.value.trim(),
      };
      if (!payload.name || !payload.phone) {
        show("يرجى إدخال الاسم ورقم الجوال", false);
        return;
      }
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          if (!r.ok) throw 0;
          show("تم إرسال طلبك بنجاح، سنتواصل معك خلال 24 ساعة.", true);
          form.reset();
        })
        .catch(function () {
          show(
            "تعذّر الاتصال بالسيرفر — شغّل الباك إند أولاً (node server.js) أو راسلنا واتساب.",
            false,
          );
        });
      function show(t, ok) {
        msg.textContent = t;
        msg.className = "form-msg " + (ok ? "ok" : "err");
      }
    });
  }
});
