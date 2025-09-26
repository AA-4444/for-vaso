// /components/footer-component.js
class SiteFooter extends HTMLElement {
  connectedCallback() {
	this.innerHTML = `
	  <style>
		:root{
		  --bg-dark:#0a0a0a;
		  --ink:#fff;
		  --muted:#b9b9b9;
		  --brand:#1E48C1;
		}
		footer{
		  background:var(--bg-dark);
		  color:#ddd;
		  overflow:hidden;
		}
		.footer-cta{
		  text-align:center;
		  padding:80px 20px 40px;
		}
		.footer-cta h2{
		  font-size:28px;
		  font-weight:700;
		  margin:0 0 24px;
		  color:#fff;
		}
		.footer-cta .cta-btn{
		  padding:14px 32px;
		  border-radius:999px;
		  background:var(--brand);
		  color:#fff;
		  font-weight:700;
		  border:none;
		  cursor:pointer;
		  font-size:16px;
		  text-decoration:none;
		  display:inline-block;
		}
		.footer-wrap{ padding:46px 0 }
		.container{ max-width:1200px; margin:0 auto; padding:0 16px }
		.foot-grid{ 
		  display:grid; 
		  grid-template-columns:repeat(5,1fr); 
		  gap:28px;
		}
		.foot h4{ margin:0 0 10px; color:#fff; font-size:16px; font-weight:700 }
		.foot a{ color:var(--brand); text-decoration:none }
		.foot a:hover{ text-decoration:underline }
		.brand{ display:flex; align-items:center; gap:14px }
		.logotype{ font-weight:800; font-size:28px; font-family:"Zing Rust Base","Montserrat",sans-serif }
		.logo-underline{ width:36px; height:5px; border-radius:4px; background:#fff }
		.legal{ text-align:center; padding:18px 0; color:#aaa; font-size:14px }

		/* ====== АДАПТАЦИЯ ====== */
		@media (max-width: 1024px){
		  .foot-grid{ grid-template-columns:repeat(3,1fr); }
		}
		@media (max-width: 768px){
		  .foot-grid{ grid-template-columns:repeat(2,1fr); }
		}
		@media (max-width: 480px){
		  .foot-grid{ grid-template-columns:1fr; }
		  .footer-cta{ padding:60px 16px 30px; }
		  .footer-cta h2{ font-size:22px; }
		  .footer-cta .cta-btn{ width:100%; text-align:center; }
		  .foot{ text-align:center; }
		  .brand{ justify-content:center; }
		}
	  </style>

	  <footer>
		<div class="footer-cta">
		  <h2>Ready to discuss your project?</h2>
		  <a href="#" class="cta-btn">WORK WITH US</a>
		</div>

		<div class="container footer-wrap">
		  <div class="foot-grid">
			<div class="foot">
			  <div class="brand">
				<div class="logo-underline"></div>
				<div class="logotype">Wengy</div>
			  </div>
			  <p style="color:#bbb;max-width:240px;margin:12px auto 14px">Product marketing leaders in B2B SaaS.</p>
			  <p>
				<a href="https://wa.me/995555774992">What's App</a> · 
				<a href="https://www.instagram.com/wengy.marketing?igsh=YWs1Y2JqNGR6emZ2&utm_source=qr">Instagram</a>
			  </p>
			  <p><a href="mailto:info@wengy.co">info@wengy.co</a></p>
			</div>
			<div class="foot">
			  <h4>Agency</h4>
			  <p><a href="#">Our Services</a><br><a href="#">Contact Us</a></p>
			</div>
			<div class="foot">
			  <h4>Marketplace</h4>
			  <p><a href="#">Hire a Consultant</a></p>
			</div>
			<div class="foot">
			  <h4>Playbooks</h4>
			  <p><a href="#">Marketing Program</a><br><a href="#">How Playbooks Works</a><br><a href="#">Member Stories</a><br><a href="#">Pricing for Playbooks</a></p>
			  <h4 style="margin-top:14px">Members</h4>
			  <p><a href="#">Playbooks Home</a><br><a href="#">Your Account</a></p>
			</div>
			<div class="foot">
			  <h4>Company</h4>
			  <p><a href="#">About Us</a><br><a href="#">Affiliates</a><br><a href="#">Careers</a><br><a href="#">Client Portfolio</a><br><a href="#">Guest writing</a><br><a href="#">Privacy Policy</a></p>
			  <h4 style="margin-top:14px">Resources</h4>
			  <p><a href="#">Blog</a><br><a href="#">Newsletter</a><br><a href="#">PMM Launch Accelerator</a><br><a href="#">Free Video Course</a><br><a href="#">Job Posting Board</a><br><a href="#">Free Resources</a></p>
			</div>
		  </div>
		</div>
		<div class="legal">© Wengy</div>
	  </footer>
	`;
  }
}

customElements.define('site-footer', SiteFooter);