// Site interactivity: menu toggle, form handling, simple gallery interaction
document.addEventListener('DOMContentLoaded', ()=>{
	const toggle = document.querySelector('.nav-toggle');
	const links = document.querySelector('.nav-links');
	if(toggle && links){
		toggle.addEventListener('click', ()=> links.classList.toggle('show'))
	}

	// Smooth anchor scrolling
	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click', (e)=>{
			const href = a.getAttribute('href');
			if(href.length>1){
				e.preventDefault();
				document.querySelector(href)?.scrollIntoView({behavior:'smooth',block:'start'});
				links?.classList.remove('show');
			}
		})
	})

	// Quote form validation (client-side only)
	const form = document.getElementById('quoteForm');
	const msg = document.getElementById('formMsg');
	if(form){
		form.addEventListener('submit', (e)=>{
			e.preventDefault();
			const name = form.name.value.trim();
			const email = form.email.value.trim();
			const details = form.details.value.trim();
			if(!name || !email || !details){
				msg.textContent = 'Please fill name, email and details.';
				msg.style.color = '#f6c';
				return;
			}
			// Simulate successful submission
			msg.textContent = 'Thanks! Your request has been noted. We will contact you soon.';
			msg.style.color = '#aaf';
			form.reset();
			// small celebratory micro-animation
			msg.classList.add('pulse');
			setTimeout(()=> msg.classList.remove('pulse'), 1600);
		})
	}

	// Light gallery hover effect (expand)
	document.querySelectorAll('.gallery-item .thumb').forEach(t=>{
		t.addEventListener('mouseenter', ()=> t.style.transform='scale(1.03)');
		t.addEventListener('mouseleave', ()=> t.style.transform='');
	})
  
	// Scroll reveal
	const observer = new IntersectionObserver((entries)=>{
		entries.forEach(entry=>{
			if(entry.isIntersecting){
				entry.target.classList.add('show');
			}
		})
	},{threshold:0.12});
	document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

	// Sticky contact CTA behaviour
	const cta = document.getElementById('contactCTA');
	if(cta){
		// small bounce when scrolled past hero
		const hero = document.querySelector('.hero');
		const heroObs = new IntersectionObserver((entries)=>{
			entries.forEach(e=>{
				if(!e.isIntersecting) cta.classList.add('visible');
				else cta.classList.remove('visible');
			})
		}, {threshold:0.05});
		if(hero) heroObs.observe(hero);
	}

	// Attempt to load a site logo if provided in the project root (logo.png, logo.svg, logo.webp)
	(function loadHeroLogo(){
		const imgEl = document.getElementById('heroLogo');
		if(!imgEl) return;
		const candidates = ['logo.png','logo.svg','logo.webp','massevents-logo.png','massevents-logo.svg'];
		let loaded = false;
		candidates.forEach(src=>{
			if(loaded) return;
			const probe = new Image();
			probe.onload = ()=>{
				loaded = true;
				// set hero background using CSS variable so the logo blends into the hero
				const hero = document.querySelector('.hero');
				if(hero){
					hero.classList.add('has-logo');
					hero.style.setProperty('--hero-logo', `url(${src})`);
					// apply to pseudo-element via inline style --background image
					hero.style.backgroundImage = getComputedStyle(hero).backgroundImage; // preserve existing gradients
					// set the pseudo-element background by injecting the logo url into a style rule on the element
					hero.style.setProperty('--logo-url', `url(${src})`);
					// directly set the before background using CSS custom property via style attribute
					hero.style.setProperty('background-repeat','no-repeat');
					hero.style.setProperty('background-position','center 28%');
				}
				// hide the inline image to avoid square display; keep src for favicon already set
				imgEl.src = src;
				imgEl.classList.remove('show');
				imgEl.style.display = 'none';
				// also set the pseudo-element via inline stylesheet for broad support
				const beforeImage = `linear-gradient(transparent, transparent), url(${src})`;
				if(hero){ hero.style.setProperty('--hero-before-image', `url(${src})`); hero.style.setProperty('background-image', getComputedStyle(hero).backgroundImage); }
				// fallback: set documentElement CSS variable for use in CSS
				document.documentElement.style.setProperty('--site-hero-logo', `url(${src})`);
			}
			probe.onerror = ()=>{/* try next */}
			// start loading
			probe.src = src;
		})
	})();
})