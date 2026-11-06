/* Sheikh Dahiru Usman Bauchi Foundation — interactions. No libraries. */
(function () {
  'use strict';
  var HEAD_OFFICE_WA = '2348032061977';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (n) { return Number(n).toLocaleString('en-NG'); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header, progress bar, menu */
  var hdr = $('#hdr'), prog = $('#progress');
  function onScroll() {
    var y = window.scrollY;
    hdr.classList.toggle('solid', y > 40);
    var h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var burger = $('#burger'), nav = $('#nav');
  burger.addEventListener('click', function () {
    var o = nav.classList.toggle('open'); burger.classList.toggle('x', o); burger.setAttribute('aria-expanded', o);
  });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.classList.remove('x'); }); });

  /* Marquee of places */
  var places = ['Bauchi', 'Kano', 'Kaduna', 'Katsina', 'Jigawa', 'Gombe', 'Niger', 'Nasarawa', 'Abuja', 'Taraba', 'Adamawa', 'Borno', 'Kebbi', 'Sokoto', 'Plateau', 'Kwara', 'Zamfara', 'Yobe', 'Benue', 'Kogi', 'Oyo', 'Lagos', 'Ondo', 'Niger Republic', 'Benin Republic', 'Ghana', 'Cameroon'];
  var mq = $('#mq'); var html = places.map(function (p) { return '<span>' + p + '</span>'; }).join('');
  mq.innerHTML = html + html;

  /* Count-up numbers */
  function countUp(el) {
    var end = +el.getAttribute('data-count'); if (reduce) { el.textContent = fmt(end); return; }
    var t0 = null, dur = 1800;
    function step(t) {
      if (!t0) t0 = t; var p = Math.min(1, (t - t0) / dur); var e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(Math.round(end * e)); if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* Reveal on scroll */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (x) {
      if (!x.isIntersecting) return;
      var el = x.target; el.classList.add('in');
      if (el.hasAttribute('data-count')) countUp(el);
      if (el.id === 'regions') $$('#regions .bar i').forEach(function (i) { i.style.width = i.getAttribute('data-w') + '%'; });
      if (el.id === 'steps') $$('.step', el).forEach(function (s, k) { setTimeout(function () { s.classList.add('in'); }, k * 140); });
      if (el.id === 'kangere') { var v = $('#vid'); if (v && !reduce) { v.preload = 'auto'; v.play().catch(function () {}); } }
      io.unobserve(el);
    });
  }, { threshold: 0.15 }) : null;
  $$('.reveal,[data-count],#regions,#steps,#kangere').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });
  if (!io) $$('.step').forEach(function (s) { s.classList.add('in'); });

  /* Tile map of Nigeria: [code, name, col, row] */
  var T = [
    ['SOK', 'Sokoto', 0, 0], ['KAT', 'Katsina', 1, 0], ['KAN', 'Kano', 2, 0], ['JIG', 'Jigawa', 3, 0], ['YOB', 'Yobe', 4, 0], ['BOR', 'Borno', 5, 0],
    ['KEB', 'Kebbi', 0, 1], ['ZAM', 'Zamfara', 1, 1], ['KAD', 'Kaduna', 2, 1], ['BAU', 'Bauchi', 3, 1], ['GOM', 'Gombe', 4, 1], ['ADA', 'Adamawa', 5, 1],
    ['NIG', 'Niger', 0, 2], ['FCT', 'Abuja (FCT)', 1, 2], ['NAS', 'Nasarawa', 2, 2], ['PLA', 'Plateau', 3, 2], ['TAR', 'Taraba', 4, 2],
    ['OYO', 'Oyo', 0, 3], ['KWA', 'Kwara', 1, 3], ['KOG', 'Kogi', 2, 3], ['BEN', 'Benue', 3, 3], ['EBO', 'Ebonyi', 4, 3], ['CRV', 'Cross River', 5, 3],
    ['OGU', 'Ogun', 0, 4], ['OSU', 'Osun', 1, 4], ['EKI', 'Ekiti', 2, 4], ['ENU', 'Enugu', 3, 4], ['ABI', 'Abia', 4, 4], ['AKW', 'Akwa Ibom', 5, 4],
    ['LAG', 'Lagos', 0, 5], ['OND', 'Ondo', 1, 5], ['EDO', 'Edo', 2, 5], ['ANA', 'Anambra', 3, 5], ['IMO', 'Imo', 4, 5], ['RIV', 'Rivers', 5, 5],
    ['DEL', 'Delta', 2, 6], ['BAY', 'Bayelsa', 3, 6]
  ];
  // From the 2024/2025 survey: [schools, students, memorised, teachers]
  var S = {
    BAU: [229, 39315, 8021, 802], JIG: [93, 12376, 802, 140], KAD: [59, 12097, 4049, 187], KAT: [56, 14581, 5485, 361], KAN: [45, 11641, 3580, 172],
    NAS: [43, 4411, 164, 57], NIG: [40, 6960, 1353, 126], GOM: [39, 6096, 577, 101], TAR: [25, 3387, 29, 41], ADA: [21, 2700, 405, 25],
    KWA: [13, 1631, 540, 58], FCT: [12, 1441, 367, 4], BOR: [11, 1836, 260, 46], KEB: [10, 1824, 28, 53], PLA: [9, 2400, 272, 38],
    SOK: [8, 1562, 1160, 36], YOB: [6, 600, 0, 7], BEN: [4, 1042, 0, 49], KOG: [3, 270, 15, 5], ZAM: [3, 322, 91, 12],
    OYO: [2, 200, 0, 2], LAG: [1, 128, 29, 6], OND: [1, 100, 0, 1]
  };
  var TG = { BAU: 1, GOM: 2, KAD: 2, FCT: 2, JIG: 3, KAT: 3, KAN: 3, NAS: 4, NIG: 4, TAR: 4, ADA: 4, KWA: 5, BOR: 5, KEB: 5, PLA: 5, SOK: 5, YOB: 6, BEN: 6, KOG: 6, ZAM: 6 };
  var TGN = { 1: 'The foundation', 2: 'The first replication', 3: 'The strongholds', 4: 'The expansion', 5: 'The reach', 6: 'Completing the north' };
  var mode = 'schools', sel = 'BAU';
  var tiles = $('#tiles');
  function mix(a, b, t) { return a.map(function (v, i) { return Math.round(v + (b[i] - v) * t); }); }
  function rampColor(t) {
    var c = t < .5 ? mix([23, 64, 44], [46, 158, 107], t * 2) : mix([46, 158, 107], [226, 190, 115], (t - .5) * 2);
    return 'rgb(' + c.join(',') + ')';
  }
  var tgColor = { 1: '#E2BE73', 2: '#D9A84F', 3: '#2E9E6B', 4: '#1F7F55', 5: '#17603F', 6: '#124A31' };
  function drawTiles() {
    tiles.innerHTML = '';
    for (var r = 0; r < 7; r++) for (var c = 0; c < 6; c++) {
      var t = T.filter(function (x) { return x[2] === c && x[3] === r; })[0];
      var b = document.createElement('button'); b.type = 'button';
      if (!t) { b.className = 'tile empty'; b.tabIndex = -1; b.setAttribute('aria-hidden', 'true'); tiles.appendChild(b); continue; }
      var code = t[0], d = S[code], tg = TG[code];
      var has = mode === 'schools' ? !!d : !!tg;
      b.className = 'tile' + (has ? '' : ' none') + (code === sel ? ' sel' : '');
      b.dataset.code = code;
      var val = mode === 'schools' ? (d ? d[0] : '') : (tg || '');
      if (has) {
        if (mode === 'schools') {
          var k = Math.log(d[0] + 1) / Math.log(230);
          b.style.background = rampColor(k);
          b.style.color = k > .72 ? '#1A1206' : '#F5F0E4';
        } else {
          b.style.background = tgColor[tg];
          b.style.color = tg <= 2 ? '#1A1206' : '#F5F0E4';
        }
      }
      b.innerHTML = '<b>' + code + '</b><i>' + val + '</i>';
      b.setAttribute('aria-label', t[1] + (has ? (mode === 'schools' ? ': ' + d[0] + ' schools' : ': target ' + tg) : ''));
      tiles.appendChild(b);
    }
    $('#legend').style.display = mode === 'schools' ? '' : 'none';
    $('#map-note').textContent = mode === 'schools' ? 'Number of Foundation schools in each state' : 'Target number for each northern state';
  }
  function name(code) { var t = T.filter(function (x) { return x[0] === code; })[0]; return t ? t[1] : code; }
  function showInfo(code) {
    sel = code; var d = S[code], tg = TG[code], box = $('#info');
    var h = '<span class="eyebrow">' + (mode === 'schools' ? 'Schools in the state' : 'Vision 2036') + '</span><h3>' + name(code) + '</h3>';
    if (mode === 'schools') {
      if (d) {
        h += '<div class="kpis"><div><b>' + fmt(d[0]) + '</b><span>schools</span></div><div><b>' + fmt(d[1]) + '</b><span>students</span></div><div><b>' + fmt(d[2]) + '</b><span>have memorised the Qur’an</span></div><div><b>' + fmt(d[3]) + '</b><span>teachers</span></div></div>';
        h += '<p>' + (code === 'BAU' ? 'Bauchi is home: the Sheikh began here, and so does Vision 2036. STTMSK, Kangere is school number 229.' : 'Find each school in ' + name(code) + ' in the directory below.') + '</p>';
        h += '<button class="btn btn-gold btn-sm" type="button" data-findstate="' + name(code) + '">See the schools in ' + name(code) + '</button>';
      } else h += '<p>No Foundation school was recorded here in the 2024/2025 survey. Vision 2036 starts with the North.</p>';
    } else {
      if (tg) h += '<div class="kpis"><div><b>Target ' + tg + '</b><span>' + TGN[tg] + '</span></div><div><b>' + (d ? fmt(d[0]) : 0) + '</b><span>schools there today</span></div></div><p>One Sheikh Tahir Islamic Centre with its own Kangere-type school. A target becomes active when a site is secured, a founding partner commits, and the previous target is running.</p><a class="btn btn-gold btn-sm" href="#join">Adopt ' + name(code) + '</a>';
      else h += '<p>Beyond the northern rollout of Vision 2036.</p>';
    }
    box.innerHTML = h;
    $$('.tile').forEach(function (t) { t.classList.toggle('sel', t.dataset.code === code); });
  }
  tiles.addEventListener('click', function (e) {
    var b = e.target.closest('.tile'); if (!b || b.classList.contains('empty')) return; showInfo(b.dataset.code);
  });
  $$('.seg button').forEach(function (b) {
    b.addEventListener('click', function () {
      mode = b.dataset.mode;
      $$('.seg button').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
      drawTiles(); showInfo(sel);
    });
  });
  $$('#targets .target').forEach(function (el) {
    el.addEventListener('click', function () {
      var n = +el.dataset.t; var code = Object.keys(TG).filter(function (k) { return TG[k] === n; })[0];
      mode = 'targets'; $$('.seg button').forEach(function (x) { x.classList.toggle('on', x.dataset.mode === 'targets'); });
      drawTiles(); showInfo(code); document.getElementById('network').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    });
  });
  drawTiles(); showInfo('BAU');

  /* Directory */
  var all = [], shown = (innerWidth < 700 ? 8 : 24), list = $('#list');
  var q = $('#q'), st = $('#st');
  function norm(s) { return (s || '').toLowerCase().replace(/[’']/g, '').replace(/\s+/g, ' '); }
  function filtered() {
    var qq = norm(q.value.trim()), ss = st.value;
    return all.filter(function (r) {
      if (ss && r.s !== ss) return false;
      if (!qq) return true;
      return norm(r.v + ' ' + r.l + ' ' + r.s).indexOf(qq) >= 0;
    });
  }
  function renderDir() {
    var f = filtered();
    var stu = 0, mem = 0; f.forEach(function (r) { stu += r.st; mem += r.m; });
    $('#sum').innerHTML = '<span><b>' + fmt(f.length) + '</b> schools listed</span><span><b>' + fmt(stu) + '</b> students</span><span><b>' + fmt(mem) + '</b> have memorised</span>';
    list.innerHTML = f.slice(0, shown).map(function (r) {
      return '<div class="school"><b>' + r.v + '</b><span>' + (r.l && r.l !== r.v ? r.l + ', ' : '') + r.s + '</span><div class="nums"><span><i>' + fmt(r.st) + '</i> students</span>' + (r.m ? '<span class="huff"><i style="color:var(--gold-ink)">' + fmt(r.m) + '</i> memorised</span>' : '') + (r.te ? '<span><i>' + r.te + '</i> teachers</span>' : '') + '</div></div>';
    }).join('') || '<p style="color:var(--muted)">No school matches that search yet.</p>';
    $('#more').style.display = f.length > shown ? '' : 'none';
  }
  fetch('media/schools.json').then(function (r) { return r.json(); }).then(function (rows) {
    all = rows.slice().sort(function (a, b) { return b.st - a.st; });
    var states = {}; rows.forEach(function (r) { states[r.s] = (states[r.s] || 0) + 1; });
    Object.keys(states).sort(function (a, b) { return states[b] - states[a]; }).forEach(function (s) {
      var o = document.createElement('option'); o.value = s; o.textContent = s + ' (' + states[s] + ')'; st.appendChild(o);
    });
    renderDir();
  }).catch(function () { $('#sum').textContent = 'The directory could not load. Please refresh the page.'; $('#more').style.display = 'none'; });
  var deb; q.addEventListener('input', function () { clearTimeout(deb); deb = setTimeout(function () { shown = (innerWidth < 700 ? 8 : 24); renderDir(); }, 150); });
  st.addEventListener('change', function () { shown = (innerWidth < 700 ? 8 : 24); renderDir(); });
  $('#more').addEventListener('click', function () { shown += 48; renderDir(); });
  $('#near').addEventListener('click', function () { q.value = ''; st.value = ''; shown = (innerWidth < 700 ? 8 : 24); renderDir(); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-findstate]'); if (!b) return;
    st.value = b.getAttribute('data-findstate'); q.value = ''; shown = (innerWidth < 700 ? 8 : 24); renderDir();
    document.getElementById('directory').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });

  /* Blueprint of the Islamic Centre */
  var parts = [
    ['Mosque and Zawiya', 'Worship, remembrance and spiritual guidance: the heart that every other part of the Centre turns around.'],
    ['Qur’anic Learning Centre', 'The allo and Tsangaya space for memorisation, following the Sheikh’s method.'],
    ['Islamic Knowledge', 'Arabic and the Islamic sciences after memorisation, for children and adults.'],
    ['Modern Education', 'A Kangere-type school: primary, junior and senior secondary, and skills.'],
    ['Community Life', 'Learning for women and adults, and service to the community around the Centre.']
  ];
  var NS = 'http://www.w3.org/2000/svg', gN = $('#bp-nodes'), gL = $('#bp-lines');
  parts.forEach(function (p, i) {
    var a = (-90 + i * 72) * Math.PI / 180, x = 300 + 225 * Math.cos(a), y = 300 + 225 * Math.sin(a);
    var ln = document.createElementNS(NS, 'line');
    ln.setAttribute('x1', 300 + 112 * Math.cos(a)); ln.setAttribute('y1', 300 + 112 * Math.sin(a)); ln.setAttribute('x2', x); ln.setAttribute('y2', y); gL.appendChild(ln);
    var g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'node'); g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); g.setAttribute('aria-label', p[0]);
    var c = document.createElementNS(NS, 'circle'); c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 66); c.setAttribute('fill', '#0B3F29'); c.setAttribute('stroke', '#E2BE73'); c.setAttribute('stroke-width', '2');
    g.appendChild(c);
    var words = p[0].split(' '), lines = words.length > 2 ? [words.slice(0, 2).join(' '), words.slice(2).join(' ')] : (words.length === 2 && p[0].length > 12 ? words : [p[0]]);
    lines.forEach(function (w, k) {
      var tx = document.createElementNS(NS, 'text'); tx.setAttribute('x', x); tx.setAttribute('y', y + (k - (lines.length - 1) / 2) * 18 + 5);
      tx.setAttribute('text-anchor', 'middle'); tx.setAttribute('fill', '#F5F0E4'); tx.setAttribute('font-family', 'Inter,sans-serif'); tx.setAttribute('font-size', '14.5'); tx.setAttribute('font-weight', '700');
      tx.textContent = w; g.appendChild(tx);
    });
    function pick() {
      $$('#bp-nodes .node').forEach(function (n) { n.classList.remove('on'); }); g.classList.add('on');
      $('#bp-title').textContent = p[0]; $('#bp-text').textContent = p[1];
    }
    g.addEventListener('click', pick); g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    gN.appendChild(g);
  });

  /* Giving */
  var CAUSES = {
    general: { tag: 'THE FOUNDATION · VISION 2036', title: 'General support', text: 'First Bank 2032595985, Muassasatu Sheikh Dahiru Usman Bauchi School. Tell us about your gift so we can thank you and report back.' },
    hostel: { tag: 'SADAQAH JARIYAH', title: 'The Hajiya (Dr.) Aisha Bala Mohammed Hostel', text: 'Wema Bank 0128411766, Sheikh Tahir Tsangaya Model School Kangere. Please write HOSTEL in your transfer narration.' },
    scholarship: { tag: 'FISABILILLAH', title: 'Sponsor a child’s full course', text: 'Moniepoint MFB 4422136665, Sheikh Tahir Tsangaya Model School Kangere. ₦753,500 a year, full courses only. We will send you a sponsorship letter and the child’s reports.' },
    adopt: { tag: 'THE HIGHEST HONOUR', title: 'Adopt a State', text: 'Become the founding partner of the Sheikh Tahir Islamic Centre in one northern state. Leave your details and the head office will call you.' }
  };
  var dlg = $('#give'), current = 'general';
  function openGive(k) {
    current = k; var c = CAUSES[k] || CAUSES.general;
    $('#g-tag').textContent = c.tag; $('#g-title').textContent = c.title; $('#g-text').textContent = c.text;
    if (k === 'scholarship') $('#p-how').value = 'Full course sponsorship';
    if (k === 'adopt') $('#p-how').value = 'Land or building';
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-give]'); if (!b) return; e.preventDefault(); openGive(b.getAttribute('data-give'));
  });
  $$('[data-close]').forEach(function (b) { b.addEventListener('click', function () { dlg.close ? dlg.close() : dlg.removeAttribute('open'); }); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  $('#pledge').addEventListener('submit', function (e) {
    e.preventDefault(); var c = CAUSES[current]; var v = function (id) { return $('#' + id).value.trim(); };
    var msg = 'As-salamu alaykum. I am writing from the Foundation website.\nCause: ' + c.title + '\nName: ' + v('p-name') + '\nPhone: ' + v('p-phone') + (v('p-amt') ? '\nAmount: ₦' + v('p-amt') : '') + '\nHow: ' + v('p-how') + (v('p-note') ? '\nMessage: ' + v('p-note') : '');
    window.open('https://wa.me/' + HEAD_OFFICE_WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
  function toast(t) { var el = $('#toast'); el.textContent = t; el.classList.add('on'); setTimeout(function () { el.classList.remove('on'); }, 2200); }
  $$('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var n = b.getAttribute('data-copy');
      if (navigator.clipboard) navigator.clipboard.writeText(n).then(function () { toast('Account number copied'); }, function () { prompt('Account number', n); });
      else prompt('Account number', n);
    });
  });
  $('#yr').textContent = new Date().getFullYear();
})();
