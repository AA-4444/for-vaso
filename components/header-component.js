// /components/header-component.js
class SiteHeader extends HTMLElement {
  constructor() {
	super();
	this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
	this.root.innerHTML = `
	  <style>
		:host { display:block }
		.container { width:100%; margin:0 auto; padding:0 20px; box-sizing:border-box; }

		/* ===== Desktop header (как было) ===== */
		header{
		  position:absolute; top:0; left:0; right:0; z-index:1000;
		  background:transparent; border:none; box-shadow:none;
		  padding-top: env(safe-area-inset-top, 0px);
		}
		.nav{
		  height:74px; display:flex; align-items:center; justify-content:space-between; gap:12px;
		  background:transparent;
		}
		.brand-link{
		  display:inline-block; line-height:1;
		  font-weight:800; font-size:28px; font-family:"Zing Rust Base","Montserrat",sans-serif;
		  color:#fff; text-decoration:none;
		}
		.brand-link:hover{ text-decoration:underline }

		.menu{ display:flex; align-items:center; gap:18px; position:relative; background:transparent; }
		.menu a{ font-weight:600; opacity:.95; color:#fff; text-decoration:none; white-space:nowrap; }
		.menu a:hover{ opacity:1; text-decoration:underline }

		.cta{
		  padding:10px 16px; border-radius:999px;
		  background:var(--brand, #1E48C1); color:#fff; font-weight:700;
		}

		.dropdown{ position:relative }
		.menu .menu-link.has-sub{ cursor:pointer }
		.submenu{
		  position:absolute; top:100%; left:0; min-width:220px; margin-top:10px; padding:8px; list-style:none;
		  background:rgba(10,10,10,.92); border:1px solid var(--line, #1f1f1f);
		  border-radius:12px; display:none; z-index:1001; backdrop-filter:saturate(150%) blur(8px);
		}
		.submenu a{ display:block; padding:10px 14px; color:#fff; opacity:.95; border-radius:8px; white-space:nowrap }
		.submenu a:hover{ background:rgba(255,255,255,.06); opacity:1 }
		.dropdown.open>.submenu, .dropdown:hover>.submenu{ display:block }

		/* Burger (desktop hidden) */
		.burger{
		  display:none; flex-direction:column; justify-content:center;
		  width:28px; height:22px; cursor:pointer; gap:5px;
		}
		.burger span{ height:3px; background:#fff; border-radius:2px; display:block }

		/* Кнопка закрытия — по умолчанию скрыта на десктопе */
		.close-btn{
		  display:none;
		  position:absolute; top: calc(env(safe-area-inset-top, 0px) + 12px); right: max(16px, env(safe-area-inset-right, 0px));
		  width:36px; height:36px; border:0; background:transparent; color:#fff; cursor:pointer;
		  align-items:center; justify-content:center; border-radius:10px;
		}
		.close-btn svg{ width:22px; height:22px }

		/* ===== Mobile overlay ===== */
		@media (max-width: 768px){
		  .nav{ height:64px }
		  .container{ padding:0 16px }
		  .burger{ display:flex }

		  /* Прячем горизонтальный ряд и используем тот же .menu как оверлей */
		  .menu{
			display:none;
		  }
		  .menu.open{
			display:flex;
			flex-direction:column;
			position:fixed; inset:0; z-index:1100;
			padding:
			  calc(env(safe-area-inset-top, 0px) + 56px) /* сверху место под кнопку закрытия */
			  max(env(safe-area-inset-right, 0px), 16px)
			  max(env(safe-area-inset-bottom, 0px), 20px)
			  max(env(safe-area-inset-left, 0px), 16px);
			gap:12px;
			background:rgba(10,10,10,.98);
			-webkit-backdrop-filter:saturate(140%) blur(6px);
			backdrop-filter:saturate(140%) blur(6px);
			overflow:auto;

			/* анимация появления */
			animation: menuIn .22s ease-out both;
		  }

		  /* показываем крестик */
		  .menu.open .close-btn{ display:inline-flex; }

		  /* ссылки — колонкой, слева */
		  .menu.open > a,
		  .menu.open > .dropdown{
			align-self:flex-start;
			width:100%;
		  }
		  .menu.open > a{
			display:block;
			padding:12px 0;
			font-size:18px;
			border-bottom:1px solid rgba(255,255,255,.08);
			text-decoration:none;
			opacity:.95;
		  }
		  .menu.open > a:last-of-type{ border-bottom:none } /* на всякий случай */

		  /* dropdown внутри оверлея — упрощённый */
		  .menu.open .dropdown .menu-link.has-sub{
			display:block; width:100%; padding:12px 0; font-size:18px; border-bottom:1px solid rgba(255,255,255,.08);
		  }
		  .menu.open .submenu{
			position:static; margin:6px 0 10px; padding:0; border:none; background:transparent; display:none;
		  }
		  .menu.open .dropdown.open > .submenu{ display:block }
		  .menu.open .submenu a{ padding:10px 0; opacity:.9; display:block }

		  /* CONTACT US — прижат в самый низ слева */
		  .menu.open .cta{
			margin-top:auto;                 /* уводим кнопку в низ контейнера */
			align-self:flex-start;          /* выравнивание по левому краю */
			width:auto;                     /* не во всю ширину */
			padding:14px 18px;
			font-size:16px;
		  }

		  @keyframes menuIn{
			from{ opacity:0; transform:translateY(-6px) }
			to{ opacity:1; transform:translateY(0) }
		  }
		}
	  </style>

	  <header>
		<div class="container nav">
		  <a class="brand-link" href="index.html" aria-label="Wengy — home">WENGY</a>

		  <div class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="primaryMenu">
			<span></span><span></span><span></span>
		  </div>

		  <!-- Один набор ссылок: десктоп — как раньше; мобильный — full-screen overlay -->
		  <nav class="menu" id="primaryMenu" aria-label="Primary">
			<!-- Кнопка закрытия (видна только на мобильном оверлее) -->
			<button class="close-btn" id="closeMenu" aria-label="Close menu" title="Close">
			  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 6L6 18M6 6l12 12"/>
			  </svg>
			</button>

			<a href="agency.html">Agency</a>
			<a href="#">Marketplace</a>
			<a href="#">Playbooks</a>

			<div class="dropdown">
			  <a href="#" class="menu-link has-sub" id="aboutToggle" aria-haspopup="true" aria-expanded="false">About</a>
			  <ul class="submenu" aria-label="About submenu">
				<li><a href="about.html">About us</a></li>
				<li><a href="wework.html">How we work</a></li>
				<li><a href="#">Career</a></li>
			  </ul>
			</div>

			<a href="#">Resources</a>
			<a class="cta" href="contact.html">CONTACT US</a>
		  </nav>
		</div>
	  </header>
	`;

	// ===== JS =====
	const burger = this.root.getElementById("burger");
	const closeBtn = this.root.getElementById("closeMenu");
	const menu = this.root.getElementById("primaryMenu");
	const aboutToggle = this.root.getElementById("aboutToggle");
	const dd = aboutToggle?.closest(".dropdown");

	const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

	const lockScroll = (on) => {
	  try {
		document.documentElement.style.overflow = on ? "hidden" : "";
		document.body.style.overflow = on ? "hidden" : "";
		document.body.style.touchAction = on ? "none" : "";
	  } catch {}
	};

	const openMenu = () => {
	  menu.classList.add("open");
	  burger.setAttribute("aria-expanded", "true");
	  if (isMobile()) lockScroll(true);
	};
	const closeMenu = () => {
	  menu.classList.remove("open");
	  burger.setAttribute("aria-expanded", "false");
	  if (isMobile()) lockScroll(false);
	};

	burger?.addEventListener("click", openMenu);
	closeBtn?.addEventListener("click", closeMenu);

	// Toggle dropdown (и на десктопе, и на мобилке)
	if (aboutToggle && dd) {
	  const toggleDD = (state) => {
		dd.classList.toggle("open", state);
		aboutToggle.setAttribute("aria-expanded", state ? "true" : "false");
	  };
	  aboutToggle.addEventListener("click", (e) => {
		e.preventDefault();
		toggleDD(!dd.classList.contains("open"));
	  });
	}

	// ESC закрывает оверлей
	this.root.addEventListener("keydown", (e) => {
	  if (e.key === "Escape") closeMenu();
	});

	// Клик вне компонента — закрыть (только на мобилке, когда открыт)
	document.addEventListener(
	  "click",
	  (e) => {
		if (!isMobile()) return;
		if (!menu.classList.contains("open")) return;
		const path = e.composedPath();
		if (!path.includes(this)) closeMenu();
	  },
	  true
	);

	// На ресайз — вернуть нормальное состояние
	const handleResize = () => {
	  if (!isMobile()) closeMenu();
	};
	window.addEventListener("resize", handleResize);
  }
}

customElements.define("site-header", SiteHeader);