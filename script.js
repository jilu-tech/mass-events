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
		})
	}

	// Light gallery hover effect (expand)
	document.querySelectorAll('.gallery-item .thumb').forEach(t=>{
		t.addEventListener('mouseenter', ()=> t.style.transform='scale(1.03)');
		t.addEventListener('mouseleave', ()=> t.style.transform='');
	})
})