'use strict';
(() => {
  const grid = document.querySelector('#project-grid');
  const search = document.querySelector('#project-search');
  const count = document.querySelector('#result-count');
  const showAll = document.querySelector('#show-all');
  const reset = document.querySelector('#reset-filters');
  const dialog = document.querySelector('#project-dialog');
  const content = document.querySelector('#dialog-content');
  const close = document.querySelector('#dialog-close');
  const state = { category: 'all', query: '', expanded: false };
  let returnFocus = null;
  let projectOpen = false;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const source = project => project.notion ? `https://www.notion.so/${project.notion}` : project.source || PORTFOLIO_SOURCE;
  const external = (label, url, className = '') => `<a class="${className}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} <span aria-hidden="true">↗</span></a>`;
  const line = (points, extra = '') => `<polyline points="${points.map(p=>p.map(v=>Number(v).toFixed(1)).join(',')).join(' ')}" fill="none" stroke="currentColor" ${extra}/>`;

  // Illustrations are conceptual diagrams, never presented as captured results.
  function terrain(large = false) {
    const n = large ? 26 : 18;
    const scale = large ? 12 : 12;
    const px = (x,y) => {
      const z = 4.5 * Math.exp(-((x-2)**2+(y+1)**2)/25) + 2.7 * Math.exp(-((x+5)**2+(y-3)**2)/12) + .35*Math.sin(x*.8)*Math.cos(y*.65);
      return [(large ? 290:240)+(x-y)*scale, (large ? 245:133)+(x+y)*scale*.37-z*(large?22:13)];
    };
    let paths = '';
    for(let row=-n/2;row<=n/2;row++) {
      const a=[], b=[];
      for(let col=-n/2;col<=n/2;col++){a.push(px(row,col));b.push(px(col,row));}
      paths+=line(a,`stroke-width="${large?.75:.65}" opacity=".58"`)+line(b,`stroke-width="${large?.75:.65}" opacity=".58"`);
    }
    const peak = px(2,-1);
    paths+=`<circle cx="${peak[0]}" cy="${peak[1]}" r="4" fill="currentColor"/><path d="M${peak[0]} ${peak[1]}v-35h55" stroke="currentColor" fill="none" stroke-width=".7"/><text x="${peak[0]+59}" y="${peak[1]-32}" fill="currentColor" font-size="9">SDF → MESH</text>`;
    return paths;
  }
  function diagram(kind) {
    let body='';
    if(kind==='terrain') body=terrain();
    else if(kind==='mirror') body=`<path d="M95 159H392M255 28V166" stroke="currentColor" stroke-width="1" opacity=".35"/><path d="M244 28h22v138h-22z" fill="currentColor" opacity=".08"/><path d="M112 141 254 71 367 139M112 141 254 121 367 139" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M254 71 367 139M254 121 367 139" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 4"/><circle cx="112" cy="141" r="5" fill="currentColor"/><circle cx="367" cy="139" r="5" stroke="currentColor" fill="none"/><path d="M255 92h25" stroke="currentColor"/><text x="96" y="180" fill="currentColor" font-size="10">CAMERA</text><text x="321" y="180" fill="currentColor" font-size="10">VIRTUAL POINT</text><text x="273" y="44" fill="currentColor" font-size="10">MIRROR</text>`;
    else if(kind==='snow') {
      for(let y=0;y<8;y++)for(let x=0;x<17;x++) {const clear=Math.abs(y-(3+Math.sin(x*.5)*1.7))<1.3;body+=`<rect x="${90+x*18}" y="${29+y*16}" width="14" height="12" rx="1" fill="currentColor" opacity="${clear?.1:.25+(x+y)%3*.2}"/>`;}
      body+=`<path d="M95 93C160 150 195 38 270 82S347 133 386 72" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="386" cy="72" r="5" fill="currentColor"/>`;
    } else if(kind==='pool') {
      for(let i=0;i<4;i++)body+=`<rect x="${105+i*73}" y="65" width="55" height="46" rx="4" fill="none" stroke="currentColor"/><text x="${118+i*73}" y="94" fill="currentColor" font-size="12">GE</text>`;
      body+=`<path d="M131 121v22h219v-22m-5 7 5-7 5 7M350 56V38H131v18m-5-7 5 7 5-7" fill="none" stroke="currentColor"/><text x="210" y="166" fill="currentColor" font-size="10">REUSE / RESET</text>`;
    } else if(kind==='audio') {
      for(let i=0;i<60;i++){const h=8+Math.abs(Math.sin(i*.36)*Math.cos(i*.13))*76;body+=`<path d="M${60+i*6} ${95-h/2}v${h}" stroke="currentColor" stroke-width="2" opacity="${i<30?.35:.85}"/>`;}
      body+=`<path d="M240 32V152" stroke="currentColor" stroke-dasharray="3 4" opacity=".4"/><text x="190" y="178" fill="currentColor" font-size="11">음성 → 전문용어</text>`;
    } else if(kind==='series') {
      body=`<path d="M55 43V153h370M55 99h370" stroke="currentColor" fill="none" opacity=".2"/>`;
      for(let j=0;j<3;j++){const pts=[];for(let x=0;x<70;x++)pts.push([60+x*5.2,99+Math.sin(x*.14+j)*22+Math.cos(x*.47+j)*12+j*5]);body+=line(pts,`stroke-width="1.5" opacity="${.25+j*.3}"`);}
      body+=`<text x="60" y="177" fill="currentColor" font-size="10">SHARED TREND → RESIDUALS</text>`;
    } else if(kind==='database') {
      body=`<g fill="none" stroke="currentColor"><rect x="65" y="56" width="122" height="90" rx="4"/><path d="M65 76h122m-107 17h90m-90 17h64m-64 17h79M204 101h70m-7-6 7 6-7 6"/><ellipse cx="348" cy="65" rx="48" ry="15"/><path d="M300 65v67c0 20 96 20 96 0V65m-96 33c0 20 96 20 96 0"/></g><text x="106" y="42" fill="currentColor" font-size="10">PORTAL</text><text x="337" y="42" fill="currentColor" font-size="10">DB</text>`;
    } else if(kind==='engine') {
      body=`<g fill="none" stroke="currentColor"><path d="m120 45 53 28v56l-53 28-53-28V73zM67 73l53 28 53-28m-53 28v56"/><path d="M205 101h42m-7-6 7 6-7 6"/><rect x="272" y="49" width="135" height="102" rx="4"/><path d="M272 72h135m-119 19h55m-55 15h98m-98 15h73m-73 15h88"/></g><text x="93" y="181" fill="currentColor" font-size="10">SCENE</text><text x="303" y="181" fill="currentColor" font-size="10">RENDER</text>`;
    } else {
      body=`<g fill="none" stroke="currentColor"><path d="m195 49 46-24 46 24v53l-46 25-46-25zM195 49l46 26 46-26m-46 26v52"/><path d="M146 130h-30v28h30m174-28h30v28h-30M170 144h140" stroke-width="1.5"/><circle cx="181" cy="145" r="5"/><circle cx="301" cy="145" r="5"/></g>`;
    }
    return `<svg viewBox="0 0 480 205" aria-hidden="true" focusable="false" font-family="Space Grotesk, sans-serif">${body}</svg>`;
  }
  const study=document.querySelector('#terrain-study');
  study.insertAdjacentHTML('beforeend',`<g color="currentColor">${terrain(true)}</g>`);

  function card(project) {
    return `<article class="project-card${project.featured?'':' archive-card'}" data-project="${project.id}">
      <div class="project-visual" data-art="${project.art}" aria-hidden="true"><span class="visual-label">${escape(CATEGORY_LABELS[project.category])}</span>${diagram(project.art)}<span class="visual-foot">CONCEPT SKETCH</span></div>
      <div class="card-copy"><div class="card-meta"><span class="domain">${escape(project.team)}</span><span>${escape(project.period)}</span></div>
      <h3><button type="button" data-open="${project.id}">${escape(project.title)}</button></h3><p class="card-description">${escape(project.description)}</p>
      ${project.evidence?`<p class="card-evidence">${escape(project.evidence)}<small>${escape(project.condition)}</small></p>`:''}
      <div class="tags" aria-label="사용 기술">${project.tags.map(tag=>`<span class="tag">${escape(tag)}</span>`).join('')}</div>
      <div class="card-bottom"><button type="button" class="detail-button" data-open="${project.id}" aria-label="${escape(project.title)} 상세 보기">${project.featured?'역할과 과정 보기':'프로젝트 요약 보기'} <span aria-hidden="true">↗</span></button>${external(project.report?'보고서 · 노션':'기록 · 노션',source(project))}</div></div></article>`;
  }
  function render() {
    const filtering=state.category!=='all'||Boolean(state.query);
    const query=state.query.toLocaleLowerCase().trim();
    const items=PROJECTS.filter(p=>(state.category==='all'||p.category===state.category)&&(!query||[p.title,p.description,p.team,...p.tags].join(' ').toLocaleLowerCase().includes(query))&&(filtering||state.expanded||p.featured));
    grid.innerHTML=items.map(card).join('');
    count.textContent=filtering?`${items.length}개 프로젝트` : state.expanded?`전체 ${PROJECTS.length}개 프로젝트`:`주요 ${items.length}개 프로젝트 · 전체 ${PROJECTS.length}개`;
    document.querySelector('#empty-state').hidden=items.length>0;
    showAll.hidden=filtering;
    showAll.setAttribute('aria-expanded',String(state.expanded));
    showAll.innerHTML=state.expanded?'주요 프로젝트만 보기 <span aria-hidden="true">−</span>':`이전 프로젝트 ${PROJECTS.filter(p=>!p.featured).length}개도 보기 <span aria-hidden="true">+</span>`;
    reset.hidden=!filtering;
    document.querySelectorAll('[data-filter]').forEach(button=>{const active=button.dataset.filter===state.category;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  }
  function resetFilters(expand=false){state.category='all';state.query='';state.expanded=expand;search.value='';render();}
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{state.category=button.dataset.filter;render();}));
  document.querySelectorAll('[data-shortcut]').forEach(link=>link.addEventListener('click',()=>{state.category=link.dataset.shortcut;state.query='';search.value='';render();}));
  search.addEventListener('input',()=>{state.query=search.value;render();});
  reset.addEventListener('click',()=>resetFilters());
  document.querySelector('#empty-reset').addEventListener('click',()=>{resetFilters(true);document.querySelector('[data-filter="all"]').focus();});
  showAll.addEventListener('click',()=>{state.expanded=!state.expanded;render();if(!state.expanded)document.querySelector('#work').scrollIntoView({block:'start'});});
  const section=(heading,text,className='')=>text?`<section class="detail-section ${className}"><h3>${escape(heading)}</h3><p>${escape(text)}</p></section>`:'';
  function openProject(id,trigger=null){
    const p=PROJECTS.find(project=>project.id===id);
    if(!p)return;
    returnFocus=trigger||document.activeElement;
    content.innerHTML=`<p class="dialog-meta">${escape(p.team)} · ${escape(p.period)}</p><h2 id="dialog-title">${escape(p.title)}</h2><p class="dialog-summary">${escape(p.description)}</p><div class="tags">${p.tags.map(t=>`<span class="tag">${escape(t)}</span>`).join('')}</div>${section('내가 맡은 일',p.role)}${p.approach?`<section class="detail-section"><h3>${p.id==='whisper-tcpgen'?'팀에서 진행한 과정':'설계와 구현 과정'}</h3><ul>${p.approach.map(t=>`<li>${escape(t)}</li>`).join('')}</ul></section>`:''}${section('확인한 결과',p.result)}${section('평가 범위와 남은 과제',p.limit,'limit')}${!p.featured?section('개발 기록','구현 내용과 작업 과정은 아래 노션 프로젝트 페이지에서 확인할 수 있습니다.'):''}<div class="dialog-links">${external(p.report?'보고서·결과물 보기':'노션 개발 기록',source(p),'button primary')}${(p.links||[]).map(l=>external(l.label,l.url,'button')).join('')}</div><p class="dialog-source">노션 프로젝트 기록을 바탕으로 정리했습니다. ${p.report?'학부 보고서·포스터이며, 학회·학술지 투고 실적이 아닙니다.':''}</p>`;
    if(!dialog.open)dialog.showModal();
    projectOpen=true;
    dialog.scrollTop=0;
    document.body.classList.add('modal-open');
    close.focus();
  }
  function syncHash(){const match=location.hash.match(/^#project-([a-z0-9-]+)$/);if(match)openProject(match[1]);else if(dialog.open)dialog.close();}
  grid.addEventListener('click',event=>{const button=event.target.closest('[data-open]');if(!button)return;history.replaceState(null,'',`#project-${button.dataset.open}`);openProject(button.dataset.open,button);});
  close.addEventListener('click',()=>dialog.close());
  let backdropDown=false;
  dialog.addEventListener('pointerdown',event=>{const r=dialog.getBoundingClientRect();backdropDown=event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom;});
  dialog.addEventListener('click',event=>{if(event.target===dialog&&backdropDown)dialog.close();backdropDown=false;});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(projectOpen&&location.hash.startsWith('#project-'))history.replaceState(null,'','#work');projectOpen=false;if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
  window.addEventListener('hashchange',syncHash);
  render();
  syncHash();
})();
