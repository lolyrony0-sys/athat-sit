const CATS=['جوالات','بطاقات','محافظ','سماعات','حقائب','مفاتيح','أخرى'];
const S=x=>`<svg viewBox='0 0 100 100' aria-hidden='true'>${x}</svg>`;
const ICON={
'جوالات':S("<rect x='28' y='6' width='44' height='88' rx='9' fill='#173D68'/><rect x='32' y='12' width='36' height='76' rx='5' fill='#EAF3FB'/><rect x='36' y='17' width='16' height='16' rx='4' fill='#24558A'/><circle cx='43' cy='25' r='3.5' fill='#A9C9E8'/>"),
'بطاقات':S("<path d='M50 0v14' stroke='#173D68' stroke-width='4'/><rect x='24' y='12' width='52' height='78' rx='7' fill='#fff' stroke='#24558A' stroke-width='3'/><circle cx='50' cy='38' r='11' fill='#A9C9E8'/><rect x='33' y='58' width='34' height='5' rx='2.5' fill='#24558A'/><rect x='39' y='69' width='22' height='4' rx='2' fill='#A9C9E8'/>"),
'محافظ':S("<rect x='10' y='24' width='80' height='56' rx='10' fill='#173D68'/><path d='M10 40h80' stroke='#24558A' stroke-width='3'/><rect x='60' y='48' width='30' height='18' rx='6' fill='#24558A'/><circle cx='70' cy='57' r='4' fill='#A9C9E8'/>"),
'سماعات':S("<rect x='22' y='42' width='56' height='46' rx='16' fill='#fff' stroke='#24558A' stroke-width='3'/><path d='M22 62h56' stroke='#A9C9E8' stroke-width='3'/><ellipse cx='38' cy='24' rx='7' ry='9' fill='#173D68'/><rect x='36' y='28' width='4' height='16' rx='2' fill='#173D68'/><ellipse cx='62' cy='24' rx='7' ry='9' fill='#24558A'/><rect x='60' y='28' width='4' height='16' rx='2' fill='#24558A'/>"),
'حقائب':S("<path d='M28 38a22 22 0 0 1 44 0v46a8 8 0 0 1-8 8H36a8 8 0 0 1-8-8z' fill='#24558A'/><path d='M43 18a7 7 0 0 1 14 0' stroke='#173D68' stroke-width='4' fill='none'/><rect x='36' y='56' width='28' height='22' rx='6' fill='#173D68'/><rect x='41' y='63' width='18' height='3' rx='1.5' fill='#A9C9E8'/><rect x='24' y='54' width='6' height='24' rx='3' fill='#173D68'/><rect x='70' y='54' width='6' height='24' rx='3' fill='#173D68'/>"),
'مفاتيح':S("<circle cx='32' cy='30' r='16' fill='none' stroke='#173D68' stroke-width='6'/><path d='M44 42l36 36' stroke='#24558A' stroke-width='8' stroke-linecap='round'/><path d='M66 64l8-8M76 74l8-8' stroke='#24558A' stroke-width='7' stroke-linecap='round'/><circle cx='28' cy='72' r='9' fill='#A9C9E8'/><path d='M34 66l24-20' stroke='#A9C9E8' stroke-width='0'/>"),
'أخرى':S("<path d='M50 12l36 18v40L50 88 14 70V30z' fill='#A9C9E8'/><path d='M50 12l36 18-36 18-36-18z' fill='#EAF3FB'/><path d='M50 48v40' stroke='#24558A' stroke-width='3'/><path d='M14 30l36 18 36-18' stroke='#24558A' stroke-width='3' fill='none'/>")};
const SAMPLE=[
{id:1,type:'found',name:'جوال آيفون',cat:'جوالات',desc:'جوال رمادي بغطاء شفاف.',loc:'قاعة الدراسة',date:'2026-11-22',contact:'0500000001'},
{id:2,type:'lost',name:'بطاقة طالبة',cat:'بطاقات',desc:'بطاقة جامعية بحمالة زرقاء.',loc:'المكتبة',date:'2026-11-22',contact:'0500000002'},
{id:3,type:'lost',name:'محفظة جلدية',cat:'محافظ',desc:'محفظة سوداء صغيرة.',loc:'المدخل الرئيسي',date:'2026-11-21',contact:'0500000003'},
{id:4,type:'found',name:'سماعات إيربودز',cat:'سماعات',desc:'سماعات بعلبة بيضاء.',loc:'مبنى 3',date:'2026-11-21',contact:'0500000004'},
{id:5,type:'lost',name:'حقيبة ظهر',cat:'حقائب',desc:'حقيبة كحلية بجيب أمامي.',loc:'المقصف',date:'2026-11-20',contact:'0500000005'},
{id:6,type:'found',name:'مفاتيح',cat:'مفاتيح',desc:'سلسلة مفاتيح فيها 3 مفاتيح.',loc:'موقف السيارات',date:'2026-11-19',contact:'0500000006'}];
let items;try{items=JSON.parse(localStorage.getItem('athar_items'))}catch(e){}
if(!Array.isArray(items))items=SAMPLE;
const save=()=>{try{localStorage.setItem('athar_items',JSON.stringify(items))}catch(e){toast('تعذر الحفظ (الصورة كبيرة)',1)}};
const cat={lost:'',found:''};
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const stat=t=>t==='lost'?'مفقود':'تم العثور عليه';

function toast(m,bad){const t=$('#toast');t.textContent=m;t.style.background=bad?'#c2334d':'#24558A';t.style.display='block';clearTimeout(t._t);t._t=setTimeout(()=>t.style.display='none',2800)}
function go(v,to){const cur=document.querySelector('.view.active');
 if(cur&&cur.id!==v){cur.classList.add('leaving');setTimeout(()=>{cur.classList.remove('leaving');_go(v,to)},160)}else _go(v,to)}
function _go(v,to){
 document.querySelectorAll('.view').forEach(s=>s.classList.toggle('active',s.id===v));
 document.querySelectorAll('.links button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));
 $('#links').classList.remove('open');history.replaceState(null,'','#'+v);
 render();window.scrollTo({top:0,behavior:'instant'});
 if(to==='form')setTimeout(()=>$('#'+v+'Form').scrollIntoView({behavior:'smooth'}),100);
}
document.querySelectorAll('.links button').forEach(b=>b.onclick=()=>go(b.dataset.v));

function cardHTML(i){
 const im=i.img?`<img src="${i.img}" alt="">`:ICON[i.cat]||'📦';
 return `<div class="card"><div class="img">${im}<span class="badge ${i.type}">${stat(i.type)}</span></div>
 <h3>${esc(i.name)}</h3><div class="meta">📍 ${esc(i.loc)}</div><div class="meta">📅 ${esc(i.date)}</div>
 </div>`}
function list(arr,el){$(el).innerHTML=arr.length?arr.map(cardHTML).join(''):'<div class="empty">لا توجد نتائج مطابقة.</div>'}
function chips(el,t){$(el).innerHTML=['الكل',...CATS].map(c=>`<button class="chip ${(cat[t]||'الكل')===c?'on':''}" onclick="cat['${t}']='${c==='الكل'?'':c}';render()">${c}</button>`).join('')}
function render(){
 const sorted=[...items].sort((a,b)=>b.id-a.id);
 list(sorted.slice(0,4),'#latest');
 const q=x=>($(x)?.value||'').trim();
 const m=(i,s)=>i.name.includes(s)||i.desc.includes(s);
 // lost page shows lost + found by status filter (default: lost reports)
 const st=q('#ls');
 list(sorted.filter(i=>(st?i.type===st:i.type==='lost')&&m(i,q('#lq'))&&(!cat.lost||i.cat===cat.lost)),'#lostGrid');
 list(sorted.filter(i=>i.type==='found'&&m(i,q('#fq'))&&(!cat.found||i.cat===cat.found)),'#foundGrid');
 chips('#lc','lost');chips('#fc','found');
}
function homeSearch(){const v=$('#hs').value;go('lost');$('#ls').value='';$('#lq').value=v;render()}

// Build the two report forms from one template
document.querySelectorAll('[data-f]').forEach(box=>{
 const lost=box.closest('form').dataset.type==='lost';
 box.innerHTML=`
 <div><label>اسم الغرض *</label><input class="f" name="name"><div class="err"></div></div>
 <div><label>التصنيف *</label><select class="f" name="cat"><option value="">اختاري</option>${CATS.map(c=>`<option>${c}</option>`).join('')}</select><div class="err"></div></div>
 <div class="full"><label>الوصف *</label><textarea class="f" name="desc" rows="3"></textarea><div class="err"></div></div>
 <div><label>${lost?'آخر مكان شوهد فيه':'مكان العثور عليه'} *</label><input class="f" name="loc"><div class="err"></div></div>
 <div><label>${lost?'تاريخ الفقدان':'تاريخ العثور'} *</label><input class="f" type="date" name="date"><div class="err"></div></div>
 <div><label>معلومات التواصل *</label><input class="f" name="contact" placeholder="رقم الجوال أو البريد"><div class="err"></div></div>
 <div><label>صورة (اختياري)</label><input class="f" type="file" name="img" accept="image/*"></div>
 <div class="full"><button class="btn">${lost?'إرسال البلاغ':'نشر الغرض'}</button></div>`;
});
function check(form,names){
 let ok=true;
 names.forEach(n=>{const f=form.elements[n],e=f.parentElement.querySelector('.err');
  const bad=!f.value.trim()||(f.type==='email'&&!/^\S+@\S+\.\S+$/.test(f.value));
  f.classList.toggle('bad',bad);e.textContent=bad?'هذا الحقل مطلوب'+(f.type==='email'?' (بريد صحيح)':''):'';if(bad)ok=false});
 return ok}
document.querySelectorAll('form[data-type]').forEach(form=>form.onsubmit=e=>{
 e.preventDefault();
 if(!check(form,['name','cat','desc','loc','date','contact']))return toast('يرجى تعبئة الحقول المطلوبة',1);
 const add=img=>{const f=form.elements;
  items.push({id:Date.now(),type:form.dataset.type,name:f.name.value.trim(),cat:f.cat.value,desc:f.desc.value.trim(),loc:f.loc.value.trim(),date:f.date.value,contact:f.contact.value.trim(),img});
  save();form.reset();render();toast('تم إرسال البلاغ بنجاح ✔');window.scrollTo({top:0,behavior:'smooth'})};
 const file=form.elements.img.files[0];
 if(!file)return add('');
 const r=new FileReader();r.onload=()=>{ // shrink image so storage stays small
  const im=new Image();im.onload=()=>{const c=document.createElement('canvas'),s=Math.min(1,400/im.width);
   c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);add(c.toDataURL('image/jpeg',.7))};
  im.src=r.result};r.readAsDataURL(file)});

$('#contactForm').onsubmit=e=>{e.preventDefault();const f=e.target;
 if(!check(f,['n','e','m']))return toast('تحقق من الحقول',1);f.reset();toast('تم إرسال رسالتك، شكرًا لتواصلك ✔')};
let reg=false;
function toggleReg(e){e.preventDefault();reg=!reg;$('#lt').textContent=reg?'إنشاء حساب':'تسجيل الدخول';$('#lb').textContent=reg?'إنشاء الحساب':'دخول';
 $('#sw').textContent=reg?'لديك حساب؟ تسجيل الدخول':'ليس لديك حساب؟ إنشاء حساب'}
$('#loginForm').onsubmit=e=>{e.preventDefault();const f=e.target;
 if(!check(f,['u','p']))return toast('أدخلي البيانات المطلوبة',1);
 if(f.p.value.length<4)return toast('كلمة المرور قصيرة جدًا',1);
 f.reset();toast(reg?'تم إنشاء الحساب (تجريبي) ✔':'تم تسجيل الدخول (تجريبي) ✔');go('home')};

go((location.hash||'#home').slice(1).replace(/[^a-z]/g,'')&&document.getElementById(location.hash.slice(1))?location.hash.slice(1):'home');
