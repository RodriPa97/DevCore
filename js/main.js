// Terminal typing effect
const lines = [
  {t:"$ devcore init retail-negocio", cls:"prompt"},
  {t:"> Analizando objetivo del negocio...", cls:""},
  {t:"> Diseño UX/UI            [ok]", cls:"ok"},
  {t:"> Backend & API           [ok]", cls:"ok"},
  {t:"> Integración de pagos    [ok]", cls:"ok"},
  {t:"> Deploy a producción     [ok]", cls:"ok"},
  {t:"$ listo — negocio en producción", cls:"prompt"},
];
const termBody = document.getElementById('termBody');
let li = 0, ci = 0;
function typeNext(){
  if(li >= lines.length){
    // restart after pause
    setTimeout(()=>{ termBody.innerHTML=''; li=0; ci=0; typeNext(); }, 2400);
    return;
  }
  const line = lines[li];
  if(ci === 0){
    const div = document.createElement('div');
    div.className = 'term-line' + (line.cls ? ' '+line.cls : '');
    div.innerHTML = '<span class="caretline"></span><span class="term-caret"></span>';
    termBody.appendChild(div);
  }
  const div = termBody.lastElementChild;
  const caretSpan = div.querySelector('.term-caret');
  ci++;
  div.querySelector('.caretline').textContent = line.t.slice(0, ci);
  if(ci >= line.t.length){
    caretSpan.remove();
    li++; ci = 0;
    setTimeout(typeNext, 260);
  } else {
    setTimeout(typeNext, 18 + Math.random()*22);
  }
}
typeNext();

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Plan tabs
document.querySelectorAll('.plan-tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.plan-tab').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.plan-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  if(item.classList.contains('open')){ a.style.maxHeight = a.scrollHeight + 'px'; }
  q.addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// Industry chips (visual only)
document.querySelectorAll('.chip').forEach(chip=>{
  chip.addEventListener('click', ()=>{
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
  });
});

// Contact links: open Gmail directly instead of the Windows default mail app.
const gmailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=devcore97%40gmail.com&su=Consulta%20desde%20DevCore';

document.querySelectorAll('a[href^="mailto:devcore97@gmail.com"]').forEach(link => {
  link.href = gmailComposeUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});
