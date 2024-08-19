const loco = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};
loco();

const lerp = (x, y, a) => x * (1 - a) + y * a;
var tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#s3",
    scroller: "main",
    start: "top: 55%",
    end: "top: 65%",
    // markers: true,
    // scrub: 4
  },
});

const mouse_follower = () => {
  var mouse_follower = document.querySelector("#mouse_follower");
  var bt_hover = document.querySelector(".bt_hover");

  window.addEventListener("mousemove", (dets) => {
    gsap.to(mouse_follower, {
      x: dets.clientX,
      y: dets.clientY,
      scale: 1,
    });
  });
  window.addEventListener("mouseout", (dets) => {
    gsap.to(mouse_follower, {
      x: dets.clientX,
      y: dets.clientY,
      scale: 0,
    });
  });

  bt_hover.addEventListener("mousemove", (dets) => {
    var btHVal = bt_hover.getBoundingClientRect();
    var btHStartX = btHVal.left;
    var btHEndX = btHVal.left + btHVal.width;
    var btHStartY = btHVal.top;
    var btHEndY = btHVal.top + btHVal.height;
    var btHX = gsap.utils.mapRange(btHStartX, btHEndX, 0, 1, dets.clientX);
    var btHY = gsap.utils.mapRange(btHStartY, btHEndY, 0, 1, dets.clientY);
    gsap.to(mouse_follower, {
      width: "4rem",
      height: "4rem",
    });

    gsap.to("#menu-btn>span", {
      ease: Bounce.easeOut,
      yoyo: true,
    });

    gsap.to("#menu-btn>span", {
      color: "#fff",
      x: lerp(-35, 20, btHX),
    });

    gsap.to("#menu-btn>span", {
      y: lerp(-20, 20, btHY),
    });

    gsap.to(".bt_hover", {
      height: "13%",
    });
  });

  bt_hover.addEventListener("mouseout", (dets) => {
    gsap.to(mouse_follower, {
      width: "0.6rem",
      height: "0.6rem",
    });

    gsap.to("#menu-btn>span", {
      color: "#000",
      x: 0,
    });
    gsap.to("#menu-btn>span", {
      y: 0,
    });
  });
};
mouse_follower();

const stick_b2 = () => {
  var stick_b2 = document.querySelector(".stick_b2");
  gsap.to(".stick_b2>img", {
    duration: 15,
    ease: "",
    rotate: "+=360deg",
    modifiers: {
      rotate: gsap.utils.unitize((rotate) => parseFloat(rotate) % 100),
    },
    repeat: -1,
  });

  stick_b2.addEventListener("mousemove", (dets) => {
    var stb_value = stick_b2.getBoundingClientRect();
    var stb_startX = stb_value.left;
    var stb_endX = stb_value.left + stb_value.width;
    var stb_startY = stb_value.top;
    var stb_endY = stb_value.top + stb_value.width;
    var stb_diffX = gsap.utils.mapRange(
      stb_startX,
      stb_endX,
      0,
      1,
      dets.clientX
    );
    var stb_diffY = gsap.utils.mapRange(
      stb_startY,
      stb_endY,
      0,
      1,
      dets.clientY
    );

    gsap.to(".stick_b2", {
      scale: 1.1,
      duration: 0.5,
      ease: Power3,
    });

    gsap.to(".stick_b2>video", {
      x: lerp(-7, 7, stb_diffX),
    });

    gsap.to(".stick_b2>video", {
      y: lerp(-7, 7, stb_diffY),
    });
  });

  stick_b2.addEventListener("mouseleave", () => {
    gsap.to(".stick_b2", {
      scale: "1",
    });
    gsap.to(".stick_b2>video", {
      x: 0,
      ease: Power1.Out,
    });
    gsap.to(".stick_b2>video", {
      y: 0,
    });
  });
};

stick_b2();

const s1 = () => {
  var s1_nav = document.querySelectorAll(".s1_anm");
  var s1_anm2_elem = document.querySelectorAll(".s1_anm2_elem");
  var s1_anm2 = document.querySelectorAll(".s1_anm2");
  var sp_video = document.querySelector(".sp-video video");

  gsap.from(s1_nav, {
    opacity: 0,
    ease: Power4,
    duration: 2.5,
  });

  gsap.from(s1_anm2_elem, {
    y: "120%",
    ease: Power4,
    stagger: 0.2,
    duration: 1,
    onComplete: function () {
      gsap.set(s1_anm2, {
        overflow: "unset",
        ease: Power4,
        duration: 0.1,
      });
    },
  });

  gsap.from(sp_video, {
    // width: "0rem",
    height: "0rem",
  });
};

s1();

const s2 = () => {
  var s2_video = document.querySelector("#s2>video");
  gsap.from(s2_video, {
    height: "0%",
    duration: 0.9,
    ease: Power4,
  });
};
s2();

const s3 = () => {
  var s3_button = document.querySelector(".s3-r>.btn-div>button");
  var sp_h_span = document.querySelector(".sp-h>span");
  var btn_span = document.querySelectorAll(".btn-txt>span");
  var s3_anm = document.querySelectorAll(".s3_anm");
  var s3_r_p = document.querySelector(".s3-r>p");
  var cltr1 = "";

  s3_r_p.textContent.split("").forEach((elem) => {
    cltr1 += `<div class='split_anm1'><span>${elem}</span></div>`;
    s3_r_p.innerHTML = cltr1;
  });

  tl1.from(
    ".split_anm1>span",
    {
      y: "400%",
      ease: Power4,
      duration: 0.8,
      // stagger: 1
    },
    "s"
  );

  tl1.from(
    s3_anm,
    {
      width: "0%",
      height: "0%",
      ease: Power4,
      duration: 1,
    },
    "s"
  );

  s3_button.addEventListener("mouseenter", () => {
    gsap.from(s3_button, {
      padding: "5.5rem 15rem",
      ease: Power4,
      duration: 2,
    });

    gsap.to(btn_span, {
      y: "-100%",
      ease: Power4,
      duration: 0.5,
    });

    gsap.to(sp_h_span, {
      y: 0,
      ease: Power4,
      borderRadius: "0 0 0 0",
      duration: 0.4,
    });
  });
  s3_button.addEventListener("mouseleave", () => {
    gsap.to(btn_span, {
      y: "0%",
      ease: Power4,
      duration: 0.4,
    });
    gsap.to(sp_h_span, {
      borderRadius: "50% 50% 0 0",
      y: "101%",
    });
  });
};
s3();

const s4 = () => {
  var img = document.querySelectorAll(".img");

  // var hVideo = ()=>{
  //   <video src="video/cover-v0.mp4"></video>

  // }
  img.forEach((elem, nth) => {
    var vido = document.createElement("video");
    vido.classList.add("hVideo");
    elem.addEventListener("mouseenter", () => {
      elem.appendChild(vido);
      vido.src = `video/cover-v${nth}.mp4`;
      vido.muted = true;
      vido.autoplay = true;
      vido.loop = true;
    });

    elem.addEventListener("mouseleave", () => {
      gsap.from(elem.children[0], {
        scale: 1.1,
        ease: Power3,
        duration: 0.7,
      });
      elem.removeChild(vido);
      vido.muted = false;
      vido.autoplay = false;
      vido.loop = false;
    });
  });

  var cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    gsap.from(card, {
      y: "40%",
      ease: Power4,
      duration: 1,
      scrollTrigger: {
        trigger: card,
        scroller: "main",
        start: "top 125%",
        end: "top 132%",
        // scrub: 4,
        // markers: true
      },
    });
  });

  const s4_anm = document.querySelectorAll(".s4_anms4_anm");

  var s4 = document.querySelector("#s4");
  s4.addEventListener("mousemove", () => {
    gsap.to(mouse_follower, {
      backgroundColor: "#fff",
    });
  });
  s4.addEventListener("mouseleave", () => {
    gsap.to(mouse_follower, {
      backgroundColor: "#000",
    });
  });

  gsap.from(".s4_anm", {
    y: "110%",
    ease: Power4,
    duration: 0.5,
    scrollTrigger: {
      trigger: "#s4",
      scroller: "main",
      start: "top 65%",
      end: "top 70%",
      // scrub: 4,
      // markers: true
    },
  });
};
s4();

const s5 = () => {
  gsap.to("main", {
    backgroundColor: "#000",
    duration: 0.4,
    scrollTrigger: {
      trigger: "#s5",
      scroller: "main",
      start: "top 110%",
      end: "top 115%",
      scrub: 2,
      // markers: true
    },
  });

  gsap.from(".hedding_anm3>h1", {
    y: "110%",
    duration: 0.5,
    ease: Power4,
    scrollTrigger: {
      trigger: "#s5",
      scroller: "main",
      start: "top 50%",
      end: "top 55%",
      // scrub: 3,
      // markers: true
    },
  });

  var s5_p1 = document.querySelector(".s5_p1>p");
  var s5_p2 = document.querySelector(".s5_p2>p");
  var culter1 = "";
  var culter2 = "";

  document
    .querySelector("#s5p1>p")
    .textContent.split("")
    .forEach((elem) => {
      culter1 += `<div class='d1'><span>${elem}</span></div>`;
      document.querySelector("#s5p1>p").innerHTML = culter1;
    });
  document
    .querySelector("#s5p2>p")
    .textContent.split("")
    .forEach((elem) => {
      culter2 += `<div class='d1'><span>${elem}</span></div>`;
      document.querySelector("#s5p2>p").innerHTML = culter2;
    });

  gsap.from(".d1>span", {
    y: "110%",
    ease: Power4,
    duration: 0.7,
    scrollTrigger: {
      trigger: ".s5_btm_crd",
      scroller: "main",
      start: "top 85%",
      end: "top 90%",
      // scrub: 2,
      // markers: true
    },
  });
};
s5();

const s6 = () => {
  var s6 = document.querySelector("#s6");
  var hB1 = document.querySelectorAll(".hB1");
  var culter3 = "";

  document
    .querySelector(".s6_pera>p")
    .textContent.split("")
    .forEach((elem) => {
      culter3 += `<div class='d1'><span>${elem}</span></div>`;
      document.querySelector(".s6_pera>p").innerHTML = culter3;
    });

  gsap.to("main", {
    backgroundColor: "#fff",
    duration: 0.4,
    scrollTrigger: {
      trigger: "#s6",
      scroller: "main",
      start: "top 110%",
      end: "top 115%",
      scrub: 2,
      // markers: true
    },
  });

  gsap.from(".s6_h_elem", {
    y: "110%",
    duration: 0.8,
    ease: Power4,
    scrollTrigger: {
      trigger: "#s6",
      scroller: "main",
      start: "top 50%",
      end: "top 55%",
      // markers:  true,
    },
  });
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  s6.addEventListener("mouseenter", () => {
    gsap.to(mouse_follower, {
      backgroundColor: "#fff",
      ease: Power4,
    });
  });
  s6.addEventListener("mouseleave", () => {
    gsap.to(mouse_follower, {
      backgroundColor: "#000",
      ease: Power4,
    });
  });

  gsap.from(".s6_pera>p>.d1>span", {
    y: "200%",
    duration: 0.6,
    ease: Power4,
    scrollTrigger: {
      trigger: ".s6_botto_contant",
      scroller: "main",
      start: "top 90%",
      end: "top 95%",
      // markers: true
    },
  });

  hB1.forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      gsap.from(elem, {
        padding: "0.96rem 1.5rem",
      });
    });

    elem.addEventListener("mouseleave", () => {
      gsap.to(elem, {
        padding: "0.70rem 1.2rem",
      });
    });
  });
};
s6();

const s7 = () => {
  var tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#s7",
      scroller: "main",
      start: "top 110%",
      end: "top 115%",
      // scrub: 2,
      // markers: true
    },
  });

  tl2.to(".s7_top_reel", {
    duration: 10,
    ease: "none",
    x: "-=100%",
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % 100),
    },
    repeat: -1,
  });
};

s7();

const s8 = () => {
  gsap.to("main", {
    backgroundColor: "#000",
    duration: 0.4,
    scrollTrigger: {
      trigger: "#s8",
      scroller: "main",
      start: "top 110%",
      end: "top 115%",
      scrub: 2,
      // markers: true
    },
  });

  var social_div1 = document.querySelectorAll(".social_div1");

  var tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: "#s8",
      scroller: "main",
      start: "top 110%",
      end: "top 115%",
      // scrub: 2,
      // markers: true
    },
  });

  tl3.to(
    ".s8_reel",
    {
      duration: 10,
      ease: "none",
      x: "-=100%",
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % 100),
      },
      repeat: -1,
    },
    "tl3"
  );

  tl3.to(
    ".s8_reel_rotate>img",
    {
      duration: 10,
      ease: "none",
      rotate: "+=360deg",
      modifiers: {
        rotate: gsap.utils.unitize((rotate) => parseFloat(rotate) % "360deg"),
      },
      repeat: -1,
    },
    "tl3"
  );

  var aro_up = `<svg width="2.8rem" height="2.8rem" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" fill="#000" stroke="#000000" transform="rotate(0)" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"></path> </g> </g></svg>`;
  var socialName = [
    "Instagram",
    "LinkedIn",
    "Dribbble",
    "GitHub",
    "YouTube",
    "Behance",
    "Twitter",
  ];

  var socil_anm = document.querySelectorAll(".socil_anm");

  socil_anm.forEach((elem) => {
    var tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: elem,
        scroller: "main",
        start: "top 97%",
        end: "top 103%",
        // markers: true
      },
    });
    tl4.from(elem.children[0], {
      y: "200%",
      ease: Power3,
      duration: 0.4,
    });
    tl4.to(elem.children[1].children[0], {
      width: "100%",
      ease: Power3,
      duration: 0.4,
    });
  });

  var socil_div1_markey = document.querySelectorAll(".socil_div1_markey");
  socil_div1_markey.forEach(function (elem, nth) {
    for (let i = 0; i < 7; i++) {
      var mrk = `<div class='mrkey'><h2>${socialName[nth]}</h2><span>${aro_up}</span></div>`;
      elem.innerHTML += mrk;
    }
  });

  const markeyEffect = () => {
    gsap.to(".socil_div1_markey>.mrkey", {
      duration: 2.8,
      ease: "none",
      x: "-=100%",
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % 100),
      },
      repeat: -1,
    });
  };

  social_div1.forEach((d1) => {
    let socil_markey = d1.querySelector(".socil_div1_markey");

    d1.addEventListener("mouseenter", () => {
      if (MouseEvent) {
        gsap.to(socil_markey, {
          height: "100%",
        });
        markeyEffect();
      }
    });

    d1.addEventListener("mouseleave", () => {
      gsap.to(socil_markey, {
        height: "0%",
      });
    });
  });
};

s8();

const s9 = () => {
  var s9Spliter = () => {
    var s9_sp1 = "";
    var s9_sp2 = "";
    var s9_sp3 = "";
    var s9_sp4 = "";

    document
      .querySelector(".h2_d1")
      .textContent.split("")
      .forEach((elem) => {
        s9_sp1 += `<span>${elem}</span>`;
        document.querySelector(".h2_d1").innerHTML = s9_sp1;
      });
    document
      .querySelector(".h2_d2")
      .textContent.split("")
      .forEach((elem) => {
        s9_sp2 += `<span>${elem}</span>`;
        document.querySelector(".h2_d2").innerHTML = s9_sp2;
      });
    document
      .querySelector(".h2_d3")
      .textContent.split("")
      .forEach((elem) => {
        s9_sp3 += `<span>${elem}</span>`;
        document.querySelector(".h2_d3").innerHTML = s9_sp3;
      });
    document
      .querySelector(".h2_d4")
      .textContent.split("")
      .forEach((elem) => {
        s9_sp4 += `<span>${elem}</span>`;
        document.querySelector(".h2_d4").innerHTML = s9_sp4;
      });
  };

  s9Spliter();

  var tl5 = gsap.timeline({
    scrollTrigger: {
      trigger: "#s9",
      scroller: "main",
      stat: "top 80%",
      end: "top 85%",
      // scrub: 2,
      // markers: true,
    },
  });

  tl5.from(
    ".cb_elem>h2>span",
    {
      y: "200%",
      duration: 1,
      ease: Power3,
    },
    "tl5"
  );

  tl5.from(
    ".dSpan>span",
    {
      y: "140%",
      // duration: .1,
      stagger: 0.1,
      ease: Power3,
    },
    "tl5"
  );
  tl5.from(
    ".dSpan2>span",
    {
      y: "140%",
      // duration: .1,
      stagger: 0.1,
      ease: Power3,
    },
    "tl5"
  );
};
s9();

const s10 = () => {
  var s10_btn = document.querySelector("#s10_btn");
  var s10BC_sp = document.querySelector(".s10BC_sp");
  s10_btn.addEventListener("mouseenter", () => {
    gsap.from(s10_btn, {
      padding: "0.45rem 3.1rem",
    });
  });

  s10_btn.addEventListener("mouseleave", () => {
    gsap.to(s10_btn, {
      padding: "0.40rem 2rem",
    });
  });

  s10BC_sp.addEventListener("mouseenter", () => {
    s10BC_sp.style.setProperty("--scx", "1");
  });

  s10BC_sp.addEventListener("mouseleave", () => {
    s10BC_sp.style.setProperty("--scx", "0");
  });
};

s10();
