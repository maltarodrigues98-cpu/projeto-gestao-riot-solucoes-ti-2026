/*
 * TAUSTE ROUPAS — PROTÓTIPO ACADÊMICO
 * Riot Soluções de TI / UNINOVE (2026)
 * Sem autenticação ou servidor: perfil selecionável apenas para simular a interface.
 * O cenário inicial reproduz exatamente os dados de setembro do notebook da Disciplina 2.
 */
(() => {
'use strict';
const STORE_KEY = 'tauste_estoque_prototipo_v1';
const $ = selector => document.querySelector(selector);
const escapeHtml = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtNum = n => Number(n).toLocaleString('pt-BR');
const fmtMoney = n => Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const dateTime = s => new Date(s).toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'});
const iconFor = c => c === 'Camisetas' ? '👕' : c === 'Calças' ? '👖' : '🧦';
let route='dashboard', role='gerente', filterSearch='', filterCategory='Todos', filterStatus='Todos';
let canPersist = true;
const clone = a => JSON.parse(JSON.stringify(a));
function baseline(){return {schema:1,products:clone(SEED_PRODUCTS),variants:clone(SEED_VARIANTS),movements:[]};}
function load(){try{const v=localStorage.getItem(STORE_KEY);if(v){const p=JSON.parse(v);if(p.schema===1&&Array.isArray(p.products)&&Array.isArray(p.variants)&&Array.isArray(p.movements))return p;}}catch(e){canPersist=false;}return baseline();}
let db=load();
function save(){try{localStorage.setItem(STORE_KEY,JSON.stringify(db));canPersist=true;}catch(e){canPersist=false;}}
function getProduct(id){return db.products.find(p=>p.id===id);}
function stockOf(id){return db.variants.filter(v=>v.productId===id).reduce((a,v)=>a+v.stock,0);}
function minOf(id){return Math.ceil(getProduct(id).initial*0.1);}
function variantStatus(v){return v.stock===0?'empty':v.stock<=v.min?'low':'normal';}
function productStatus(p){const s=stockOf(p.id);return s===0?'empty':s<=minOf(p.id)?'low':'normal';}
function labelStatus(s){return s==='empty'?'Esgotado':s==='low'?'Estoque baixo':'Normal';}
function pill(s){return `<span class="pill ${s}">${labelStatus(s)}</span>`;}
function variantDesc(v){return `${v.color} · ${v.size}`;}
const stats=()=>({products:db.products.length,variants:db.variants.length,units:db.variants.reduce((a,v)=>a+v.stock,0),low:db.variants.filter(v=>variantStatus(v)==='low').length,empty:db.variants.filter(v=>variantStatus(v)==='empty').length});
function toast(message){let t=$('#toast');t.textContent=message;t.classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('visible'),3500);}
function viewHead(kicker,title,desc,buttons=''){return `<div class="page-head"><div><p class="eyebrow">${kicker}</p><h1>${title}</h1><p>${desc}</p></div>${buttons?`<div class="button-group">${buttons}</div>`:''}</div>`;}
function resetBtn(){return `<button type="button" class="btn" data-action="reset">↺ Restaurar cenário</button>`;}
function pageDashboard(){
 const s=stats();
 const categories=['Camisetas','Calças','Meias'].map(cat=>({name:cat,qty:db.products.filter(p=>p.category===cat).reduce((a,p)=>a+stockOf(p.id),0)}));
 const max=Math.max(1,...categories.map(c=>c.qty));
 const critical=db.variants.filter(v=>variantStatus(v)!=='normal').sort((a,b)=>a.stock-b.stock).slice(0,5);
 return viewHead('PAINEL DE CONTROLE','Visão geral do estoque','Acompanhe o saldo por produto, tamanho e cor no cenário simulado de setembro de 2026.',`<button type="button" data-action="open-move" class="btn btn-primary">＋ Nova movimentação</button>${resetBtn()}`)+
 `<div class="notice"><strong>Cenário importado do notebook:</strong> 10 modelos, 68 variações e saldo de 97 peças em setembro/2026. O estoque inicial antes das simulações era de 532 peças. Movimentações feitas aqui alteram apenas esta demonstração.</div>`+
 `${!canPersist?'<div class="notice"><strong>Atenção:</strong> o navegador não permitiu salvar localmente. Os dados podem desaparecer ao fechar a página.</div>':''}`+
 `<div class="stats">
  <div class="stat-card"><span class="stat-label">Modelos cadastrados</span><span class="stat-number">${fmtNum(s.products)}</span><span class="stat-foot">Tipos de produtos</span><span class="stat-icon">▤</span></div>
  <div class="stat-card"><span class="stat-label">Peças em estoque</span><span class="stat-number">${fmtNum(s.units)}</span><span class="stat-foot">Saldo atual de todas as variações</span><span class="stat-icon">◫</span></div>
  <div class="stat-card warn"><span class="stat-label">Variações com estoque baixo</span><span class="stat-number">${fmtNum(s.low)}</span><span class="stat-foot">Limite mínimo: 10% do estoque inicial</span><span class="stat-icon">⚑</span></div>
  <div class="stat-card danger"><span class="stat-label">Variações esgotadas</span><span class="stat-number">${fmtNum(s.empty)}</span><span class="stat-foot">Sem unidades disponíveis</span><span class="stat-icon">!</span></div>
 </div>`+
 `<div class="cols-2">
  <section class="card"><div class="card-header"><div><h2>Estoque por categoria</h2><p>Saldo disponível no cenário atual</p></div><span class="screen-hint">${s.variants} variações</span></div><div class="card-content">
  ${categories.map(c=>`<div class="category-line"><strong>${iconFor(c.name)} &nbsp; ${c.name}</strong><span>${c.qty} peças</span></div><div class="progress-track"><div class="progress-fill" style="width:${c.qty/max*100}%"></div></div>`).join('')}
  <div class="helper">Os dados iniciais foram reproduzidos do código de análise da Disciplina 2. A quantidade de cada modelo é a soma de suas variações.</div></div></section>
  <section class="card"><div class="card-header"><div><h2>Precisam de atenção</h2><p>Primeiras variações com alerta</p></div><button class="mini-link" data-nav="alerts">Ver todos →</button></div><div class="card-content">
   ${critical.length?critical.map(v=>{const p=getProduct(v.productId);return `<div class="alert-item"><span class="alert-pict ${v.stock===0?'red':''}">${v.stock===0?'!':'⚑'}</span><div class="alert-details"><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(v.color)} · Tam. ${escapeHtml(v.size)} · ${v.stock} unidade(s)</small></div>${pill(variantStatus(v))}</div>`;}).join(''):'<div class="empty-state">Nenhum alerta no momento.</div>'}
  </div></section>
 </div><div class="section-spacer"></div><section class="card"><div class="card-header"><div><h2>Atalhos para demonstrar</h2><p>Principais funções previstas no Termo de Abertura</p></div></div><div class="card-content"><div class="button-group"><button class="btn" data-nav="products">▤ Consultar produtos</button><button class="btn" data-action="open-move">⇄ Registrar entrada ou saída</button><button class="btn" data-nav="alerts">⚑ Ver alertas</button>${role==='gerente'?'<button class="btn" data-action="open-product">＋ Cadastrar produto</button>':''}</div></div></section>`;
}
function pageProducts(){
 const count=db.products.length;
 const options=['Todos','Camisetas','Calças','Meias'];
 const filtered=db.products.filter(p=>{const status=productStatus(p);return (filterCategory==='Todos'||p.category===filterCategory)&&(filterStatus==='Todos'||status===filterStatus)&&`${p.name} ${p.id} ${p.category}`.toLocaleLowerCase('pt-BR').includes(filterSearch.toLocaleLowerCase('pt-BR'));});
 return viewHead('CATÁLOGO','Produtos cadastrados','Consulte modelos, saldos, tamanhos e cores. O cadastro é demonstrado com o perfil Gerente.',`<button class="btn" data-action="export-stock">↓ Exportar CSV</button>${role==='gerente'?'<button class="btn btn-primary" data-action="open-product">＋ Novo produto</button>':''}`)+
 `<div class="card"><div class="filters"><input id="search-products" class="search-input" type="search" placeholder="Buscar produto ou código..." aria-label="Buscar produtos" value="${escapeHtml(filterSearch)}" />
 <select id="category-filter" class="select-input" aria-label="Filtrar categoria">${options.map(c=>`<option ${c===filterCategory?'selected':''}>${c}</option>`).join('')}</select>
 <select id="status-filter" class="select-input" aria-label="Filtrar situação"><option value="Todos">Todos os status</option><option value="normal" ${filterStatus==='normal'?'selected':''}>Normal</option><option value="low" ${filterStatus==='low'?'selected':''}>Estoque baixo</option><option value="empty" ${filterStatus==='empty'?'selected':''}>Esgotado</option></select></div>
 <div class="table-wrap"><table><thead><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Saldo atual</th><th>Situação do modelo</th><th>Ação</th></tr></thead><tbody>${filtered.map(p=>`<tr><td><div class="table-product"><span class="product-icon">${iconFor(p.category)}</span><div><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.id)} · ${db.variants.filter(v=>v.productId===p.id).length} variações</small></div></div></td><td>${p.category}</td><td>${fmtMoney(p.price)}</td><td><div class="stock-count">${fmtNum(stockOf(p.id))}</div><div class="secondary-line">Mínimo do modelo: ${fmtNum(minOf(p.id))}</div></td><td>${pill(productStatus(p))}</td><td class="actions-cell"><button class="mini-link" data-action="details" data-id="${escapeHtml(p.id)}">Ver variações →</button></td></tr>`).join('')}</tbody></table>${filtered.length?'':`<div class="empty-state"><strong>Nenhum produto encontrado.</strong> Altere os filtros para continuar.</div>`}</div><div class="table-meta">${filtered.length} de ${count} modelos · O alerta por variação considera tamanho e cor individualmente.</div></div>`;
}
function pageMovements(){
 const inCount=db.movements.filter(m=>m.type==='entrada').reduce((n,m)=>n+m.qty,0);
 const outCount=db.movements.filter(m=>m.type==='saida').reduce((n,m)=>n+m.qty,0);
 return viewHead('CONTROLE OPERACIONAL','Entradas e saídas','Registre movimentações por cor e tamanho, com validação para impedir estoque negativo.',`<button class="btn" data-action="export-movements">↓ Exportar CSV</button><button class="btn btn-primary" data-action="open-move">＋ Nova movimentação</button>`)+
 `<div class="alert-grid"><div class="alert-stats"><b>+${inCount}</b><span>Entradas registradas neste protótipo</span></div><div class="alert-stats"><b>−${outCount}</b><span>Saídas registradas neste protótipo</span></div><div class="alert-stats"><b>${db.movements.length}</b><span>Operações desde que abriu a demonstração</span></div></div>`+
 `<div class="card"><div class="card-header"><div><h2>Histórico de movimentações</h2><p>Histórico gerado neste protótipo, não a simulação histórica do notebook</p></div></div><div class="table-wrap"><table><thead><tr><th>Data e hora</th><th>Produto</th><th>Variação</th><th>Tipo</th><th>Quantidade</th><th>Observação</th></tr></thead><tbody>${db.movements.slice().reverse().map(m=>`<tr><td>${dateTime(m.at)}</td><td>${escapeHtml(getProduct(m.productId)?.name||m.productId)}</td><td>${escapeHtml(m.color)} · ${escapeHtml(m.size)}</td><td>${m.type==='entrada'?'<span class="pill normal">Entrada</span>':'<span class="pill low">Saída</span>'}</td><td><strong>${m.type==='entrada'?'+':'−'}${m.qty}</strong></td><td>${escapeHtml(m.note||'—')}</td></tr>`).join('')}</tbody></table>${db.movements.length?'':'<div class="empty-state"><strong>Sem movimentações novas.</strong> Clique em “Nova movimentação” para testar uma entrada ou saída.</div>'}</div></div>`;
}
function pageAlerts(){
 const s=stats();
 const critical=db.variants.filter(v=>variantStatus(v)!=='normal').sort((a,b)=>a.stock-b.stock||a.productId.localeCompare(b.productId));
 return viewHead('MONITORAMENTO','Alertas de estoque','Critérios: esgotado quando a quantidade é zero; estoque baixo quando o saldo é menor ou igual a 10% do estoque inicial por variação.',`<button class="btn" data-action="export-stock">↓ Exportar estoque</button>`)+
 `<div class="alert-grid"><div class="alert-stats"><b class="danger-text">${s.empty}</b><span>Variações esgotadas</span></div><div class="alert-stats"><b style="color:#bf8529">${s.low}</b><span>Variações com estoque baixo</span></div><div class="alert-stats"><b style="color:#188362">${s.variants-s.empty-s.low}</b><span>Variações normais</span></div></div>`+
 `<div class="card"><div class="card-header"><div><h2>Variações que precisam de reposição</h2><p>Ordenadas pelo saldo disponível</p></div><span class="pill low">${critical.length} alerta(s)</span></div><div class="table-wrap"><table><thead><tr><th>Produto</th><th>Cor</th><th>Tamanho</th><th>Saldo</th><th>Estoque mínimo</th><th>Situação</th><th>Ação</th></tr></thead><tbody>${critical.map(v=>{const p=getProduct(v.productId);return `<tr><td><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.id)}</small></td><td>${escapeHtml(v.color)}</td><td>${escapeHtml(v.size)}</td><td><strong>${v.stock}</strong></td><td>${v.min}</td><td>${pill(variantStatus(v))}</td><td><button class="mini-link" data-action="move-variant" data-id="${escapeHtml(v.id)}">Repor →</button></td></tr>`;}).join('')}</tbody></table>${critical.length?'':'<div class="empty-state"><strong>Estoque saudável!</strong> Nenhuma variação requer reposição.</div>'}</div></div>`;
}
function render(){
 const pages={dashboard:['Visão geral',pageDashboard],products:['Produtos',pageProducts],movements:['Movimentações',pageMovements],alerts:['Alertas',pageAlerts]};
 $('#content').innerHTML=pages[route][1]();
 $('#breadcrumb-page').textContent=pages[route][0];
 document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.nav===route));
 $('#nav-alerts').textContent=stats().low+stats().empty;
 $('#role-select').value=role;
}
function openModal(title,subtitle,body){
 $('#modal-body').innerHTML=`<div class="modal-head"><div><h2>${title}</h2><p>${subtitle}</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="Fechar">×</button></div><div class="modal-body-content">${body}</div>`;
 $('#modal').showModal();
}
function closeModal(){if($('#modal').open)$('#modal').close();}
function openProduct(){
 if(role!=='gerente'){toast('O cadastro é permitido apenas no perfil Gerente (simulação).');return;}
 openModal('Cadastrar produto','Novo modelo e suas variações de tamanho e cor.',`<form id="product-form"><div class="form-grid">
 <div class="form-group wide"><label for="p-name">Nome do produto</label><input id="p-name" name="name" class="field" required maxlength="80" placeholder="Ex.: Jaqueta jeans" /></div>
 <div class="form-group"><label for="p-cat">Categoria</label><select id="p-cat" name="category" class="field"><option>Camisetas</option><option>Calças</option><option>Meias</option></select></div>
 <div class="form-group"><label for="p-price">Preço (R$)</label><input id="p-price" name="price" class="field" required inputmode="decimal" type="number" step="0.01" min="0.01" placeholder="89.90" /></div>
 <div class="form-group"><label for="p-sizes">Tamanhos (separados por vírgula)</label><input id="p-sizes" name="sizes" class="field" required value="P, M, G, GG" /></div>
 <div class="form-group"><label for="p-colors">Cores (separadas por vírgula)</label><input id="p-colors" name="colors" class="field" required value="Preta, Branca" /></div>
 <div class="form-group wide"><label for="p-initial">Quantidade inicial total</label><input id="p-initial" name="initial" class="field" required type="number" min="0" max="999999" step="1" value="20" /><span class="hint">O saldo será distribuído entre as combinações de cor × tamanho.</span></div>
 </div><div class="callout">Somente o perfil <b>Gerente</b> pode cadastrar na interface demonstrativa. Não há login ou controle de acesso real nesta versão.</div><div class="form-actions"><button type="button" class="btn" data-action="close-modal">Cancelar</button><button type="submit" class="btn btn-primary">Salvar produto</button></div></form>`);
}
function openMovement(preselect){
 const products=db.products.slice().sort((a,b)=>a.id.localeCompare(b.id));
 const selected=preselect?db.variants.find(v=>v.id===preselect):null;
 const selectedProduct=selected?.productId||products[0]?.id;
 if(!selectedProduct){toast('Cadastre um produto primeiro.');return;}
 openModal('Registrar movimentação','Escolha o modelo, a variação e a quantidade.',`<form id="movement-form"><div class="form-grid">
 <div class="form-group"><label for="m-type">Operação</label><select id="m-type" name="type" class="field"><option value="entrada">Entrada (reposição)</option><option value="saida">Saída (venda/retirada)</option></select></div>
 <div class="form-group"><label for="m-product">Produto</label><select id="m-product" name="productId" class="field">${products.map(p=>`<option value="${escapeHtml(p.id)}" ${p.id===selectedProduct?'selected':''}>${escapeHtml(p.id)} — ${escapeHtml(p.name)}</option>`).join('')}</select></div>
 <div class="form-group wide"><label for="m-variant">Cor e tamanho</label><select id="m-variant" name="variantId" class="field"></select><span id="variant-stock-hint" class="hint"></span></div>
 <div class="form-group"><label for="m-qty">Quantidade</label><input id="m-qty" name="qty" class="field" type="number" min="1" max="999999" step="1" required value="1" /></div>
 <div class="form-group"><label for="m-note">Observação (opcional)</label><input id="m-note" name="note" class="field" maxlength="120" placeholder="Ex.: Reposição do fornecedor" /></div>
 </div><div class="helper">Não é possível registrar uma saída maior que o estoque disponível. Os alertas são recalculados automaticamente.</div><div class="form-actions"><button type="button" class="btn" data-action="close-modal">Cancelar</button><button type="submit" class="btn btn-primary">Registrar movimentação</button></div></form>`);
 updateVariantOptions(selected?.id);
}
function updateVariantOptions(preselect){const productId=$('#m-product')?.value;const select=$('#m-variant');if(!select)return;select.innerHTML=db.variants.filter(v=>v.productId===productId).map(v=>`<option value="${escapeHtml(v.id)}" ${v.id===preselect?'selected':''}>${escapeHtml(v.color)} · Tam. ${escapeHtml(v.size)} — ${v.stock} disponível(is)</option>`).join('');updateVariantHint();}
function updateVariantHint(){const v=db.variants.find(v=>v.id===$('#m-variant')?.value);const el=$('#variant-stock-hint');if(el&&v)el.textContent=`Saldo atual: ${v.stock} · Mínimo: ${v.min} · ${labelStatus(variantStatus(v))}`;}
function openDetails(id){
 const p=getProduct(id);if(!p)return;
 const variants=db.variants.filter(v=>v.productId===id);
 openModal(escapeHtml(p.name),`${escapeHtml(p.id)} · ${p.category} · ${fmtMoney(p.price)}`,`<div class="summary-line"><span>Saldo atual: <b>${stockOf(p.id)}</b> peças</span><span>Estoque inicial: <b>${p.initial}</b></span><span>Mínimo do modelo: <b>${minOf(p.id)}</b></span><span><b>${variants.length}</b> variações</span></div>
 <div class="section-spacer"></div><div class="table-wrap"><table><thead><tr><th>Cor</th><th>Tam.</th><th>Saldo</th><th>Mínimo</th><th>Situação</th><th>Ação</th></tr></thead><tbody>${variants.map(v=>`<tr><td>${escapeHtml(v.color)}</td><td>${escapeHtml(v.size)}</td><td><strong>${v.stock}</strong></td><td>${v.min}</td><td>${pill(variantStatus(v))}</td><td><button class="mini-link" data-action="move-variant" data-id="${escapeHtml(v.id)}">Movimentar</button></td></tr>`).join('')}</tbody></table></div>
 <div class="helper">O mínimo é calculado com 10% do estoque inicial de cada variação, arredondando para cima.</div><div class="form-actions"><button class="btn" data-action="close-modal">Fechar</button></div>`);
}
function onProductSubmit(form){
 if(role!=='gerente'){toast('Sem permissão no perfil de demonstração atual.');return;}
 const data=new FormData(form);
 const name=String(data.get('name')||'').trim().replace(/\s+/g,' ');
 const category=String(data.get('category'));
 const price=Number(data.get('price'));
 const initial=Number(data.get('initial'));
 const parseList=(key)=>[...new Set(String(data.get(key)||'').split(',').map(s=>s.trim()).filter(Boolean))];
 const sizes=parseList('sizes'),colors=parseList('colors');
 if(name.length<3||name.length>80||!['Camisetas','Calças','Meias'].includes(category)||!Number.isFinite(price)||price<=0||!Number.isSafeInteger(initial)||initial<0||initial>999999||sizes.length===0||colors.length===0||sizes.length>20||colors.length>20||sizes.some(s=>s.length>30)||colors.some(c=>c.length>30)||sizes.length*colors.length>100){toast('Confira nome, preço, tamanhos, cores e quantidades.');return;}
 const next=Math.max(10,...db.products.map(p=>Number(p.id.replace(/\D/g,''))||0))+1;
 const id='PR'+String(next).padStart(3,'0');
 const combinations=colors.flatMap(color=>sizes.map(size=>({color,size})));
 const base=Math.floor(initial/combinations.length),remainder=initial%combinations.length;
 db.products.push({id,name,category,price,initial});
 combinations.forEach(({color,size},index)=>{const qty=base+(index<remainder?1:0);db.variants.push({id:`${id}-${index+1}`,productId:id,color,size,initial:qty,min:Math.ceil(qty*.1),stock:qty});});
 save();closeModal();route='products';filterSearch='';filterCategory='Todos';filterStatus='Todos';render();toast(`${name} cadastrado com ${combinations.length} variações.`);
}
function onMovementSubmit(form){
 const data=new FormData(form);const type=data.get('type');const v=db.variants.find(x=>x.id===data.get('variantId'));const qty=Number(data.get('qty'));const note=String(data.get('note')||'').trim();
 if(!v||!['entrada','saida'].includes(type)||!Number.isSafeInteger(qty)||qty<1||qty>999999||note.length>120){toast('Informe uma movimentação válida.');return;}
 if(type==='saida'&&qty>v.stock){toast(`Saída não permitida: estoque atual é ${v.stock}.`);return;}
 if(type==='entrada'&&v.stock+qty>Number.MAX_SAFE_INTEGER){toast('Quantidade acima do limite.');return;}
 v.stock+=type==='entrada'?qty:-qty;
 db.movements.push({id:`MOV-${Date.now()}-${db.movements.length+1}`,at:new Date().toISOString(),productId:v.productId,variantId:v.id,color:v.color,size:v.size,type,qty,note});
 save();closeModal();render();toast(`Movimentação registrada: ${type==='entrada'?'+':'−'}${qty} unidade(s).`);
}
function safeCsvValue(v){let s=String(v??'');if(/^[=+@\-\t\r]/.test(s.trimStart()) && !/^-?\d+(\.\d+)?$/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
function downloadCsv(filename,rows){const csv='\ufeff'+rows.map(r=>r.map(safeCsvValue).join(';')).join('\r\n');const b=new Blob([csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');const url=URL.createObjectURL(b);a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);toast('CSV exportado.');}
function exportStock(){downloadCsv('tauste_estoque_variacoes.csv',[['Código','Produto','Categoria','Cor','Tamanho','Preço','Quantidade inicial','Estoque mínimo','Saldo atual','Situação'],...db.variants.map(v=>{const p=getProduct(v.productId);return [v.productId,p.name,p.category,v.color,v.size,p.price.toFixed(2),v.initial,v.min,v.stock,labelStatus(variantStatus(v))];})]);}
function exportMovements(){downloadCsv('tauste_movimentacoes_prototipo.csv',[['Data/hora','Produto','Cor','Tamanho','Tipo','Quantidade','Observação'],...db.movements.map(m=>[dateTime(m.at),getProduct(m.productId)?.name||m.productId,m.color,m.size,m.type,m.qty,m.note])]);}
function confirmReset(){openModal('Restaurar dados do estudo','Todas as movimentações e produtos adicionados nesta demonstração serão apagados.',`<p class="helper">O sistema retornará ao cenário simulado de setembro de 2026: <b>10 modelos, 68 variações, 97 peças</b>.</p><div class="form-actions"><button class="btn" data-action="close-modal">Cancelar</button><button class="btn btn-danger" data-action="confirm-reset">Sim, restaurar cenário</button></div>`);}
document.addEventListener('click',e=>{
 const btn=e.target.closest('[data-nav],[data-action]');if(!btn)return;
 if(btn.dataset.nav){route=btn.dataset.nav;closeModal();render();return;}
 const action=btn.dataset.action,id=btn.dataset.id;
 if(action==='close-modal')closeModal();
 if(action==='open-product')openProduct();
 if(action==='open-move')openMovement();
 if(action==='move-variant'){closeModal();openMovement(id);}
 if(action==='details')openDetails(id);
 if(action==='export-stock')exportStock();
 if(action==='export-movements')exportMovements();
 if(action==='reset')confirmReset();
 if(action==='confirm-reset'){db=baseline();save();closeModal();route='dashboard';render();toast('Cenário de setembro restaurado.');}
});
document.addEventListener('submit',e=>{if(e.target.id==='product-form'){e.preventDefault();onProductSubmit(e.target);}if(e.target.id==='movement-form'){e.preventDefault();onMovementSubmit(e.target);}});
document.addEventListener('input',e=>{if(e.target.id==='search-products'){filterSearch=e.target.value;const pos=e.target.selectionStart;render();const input=$('#search-products');input.focus();input.setSelectionRange(pos,pos);}});
document.addEventListener('change',e=>{if(e.target.id==='role-select'){role=e.target.value;render();toast(role==='gerente'?'Perfil Gerente selecionado (simulação).':'Perfil Funcionário selecionado (simulação).');}if(e.target.id==='category-filter'){filterCategory=e.target.value;render();}if(e.target.id==='status-filter'){filterStatus=e.target.value;render();}if(e.target.id==='m-product')updateVariantOptions();if(e.target.id==='m-variant')updateVariantHint();});
$('#modal').addEventListener('click',e=>{if(e.target===$('#modal'))closeModal();});
render();
})();
