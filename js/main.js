/* =========================================================
   ゲーマーズWiki  共通スクリプト
   ========================================================= */
(function () {
  'use strict';

  /* ---------- スマホ用ナビ開閉 ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('global-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    });
  }

  /* ---------- トップへ戻るボタン ---------- */
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 300) {
        toTop.classList.add('show');
      } else {
        toTop.classList.remove('show');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 目次の自動生成 ----------
     <div class="toc" data-auto-toc></div> を置くと、
     .content 内の h2 / h3 から目次を作る。 */
  var toc = document.querySelector('.toc[data-auto-toc]');
  var content = document.querySelector('.content');
  if (toc && content) {
    var headings = content.querySelectorAll('h2, h3');
    var rootList = document.createElement('ol');
    var currentH2Item = null;
    var subList = null;
    var count = 0;

    headings.forEach(function (h, i) {
      if (h.closest('.related') || h.closest('.toc')) return;
      if (!h.id) h.id = 'section-' + (i + 1);
      count++;

      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      var clone = h.cloneNode(true);
      clone.querySelectorAll('.name-en').forEach(function (el) { el.remove(); });
      a.textContent = clone.textContent.replace(/\s+/g, ' ').trim();
      li.appendChild(a);

      if (h.tagName === 'H2') {
        rootList.appendChild(li);
        currentH2Item = li;
        subList = null;
      } else if (currentH2Item) {
        if (!subList) {
          subList = document.createElement('ol');
          currentH2Item.appendChild(subList);
        }
        subList.appendChild(li);
      } else {
        rootList.appendChild(li);
      }
    });

    if (count) {
      var title = document.createElement('div');
      title.className = 'toc-title';
      title.textContent = '目次';
      toc.appendChild(title);
      toc.appendChild(rootList);
    }
  }
})();
