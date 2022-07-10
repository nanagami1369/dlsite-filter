"use strict";
// @ts-check

// dlif <= 本addonで使うクラスにつける接頭辞

// メニューを表示する処理
// すでに存在していたら削除して作り直す
document.getElementById("dlif-menu_is_open")?.remove();
document.getElementById("dlif-menu")?.remove();
const dlsiteImageFilterMenu = `
<input id="dlif-menu_is_open" type="checkbox" style="display: none;">
<div id="dlif-menu">
<div id="dlif-close-button-area">
    <button onclick="document.getElementById('dlif-menu_is_open').checked = false">✕</button>
</div>
<div id="dlif-sepia-controller">
  <label for="dlif-sepia-seek-bar">セピア</label>
  <input id="dlif-sepia-seek-bar" type="range" min="0" max="1" step="0.01" value="0">
  <input type="number" min="0" max="1" step="0.01" value="0" id="dlif-sepia-input"><span>px</span>
  <div class="dlif-seek-bar-scale">
    <p class="dlif-min">0</p><p class="dlif-mid">0.5</p><p class="dlif-max">1</p>
  </div>
</div>
<div class="dlif-saturate-controller">
  <label for="dlif-saturate-seek-bar">彩度</label>
  <input id="dlif-saturate-seek-bar" type="range" min="0" max="200" value="100">
  <input type="number" min="0" max="200" step="0" value="100" id="dlif-saturate-input"><span>%</span>
  <div class="dlif-seek-bar-scale">
    <p class="dlif-min">0%</p><p class="dlif-mid">100%</p><p class="dlif-max">200%</p>
  </div>
</div>
<style id="dlif-style"></style>
</div>
`;
document.body.insertAdjacentHTML("beforeend", dlsiteImageFilterMenu);

// スタイルを設定する処理

const dlsiteImageFilterStyle = document.getElementById("dlif-style");
const setCanvasStyle = (sepia, saturate) => {
  // prettier-ignore
  dlsiteImageFilterStyle.textContent = `
      canvas {
            filter: sepia(${sepia}) saturate(${saturate}%);
      }`;
};

const SepiaSeekBar = document.getElementById("dlif-sepia-seek-bar");
const SepiaInput = document.getElementById("dlif-sepia-input");
const SaturateSeekBar = document.getElementById("dlif-saturate-seek-bar");
const SaturateInput = document.getElementById("dlif-saturate-input");

SepiaSeekBar.addEventListener("input", () => {
  setCanvasStyle(SepiaSeekBar.value, SaturateSeekBar.value);
  SepiaInput.value = SepiaSeekBar.value;
  SaturateInput.value = SaturateSeekBar.value;
});
SepiaInput.addEventListener("input", () => {
  console.log(SepiaSeekBar.value);
  setCanvasStyle(SepiaInput.value, SaturateInput.value);
  SepiaSeekBar.value = SepiaInput.value;
  SaturateSeekBar.value = SaturateInput.value;
});
SaturateSeekBar.addEventListener("input", () => {
  setCanvasStyle(SepiaSeekBar.value, SaturateSeekBar.value);
  SepiaInput.value = SepiaSeekBar.value;
  SaturateInput.value = SaturateSeekBar.value;
});
SaturateInput.addEventListener("input", () => {
  setCanvasStyle(SepiaInput.value, SaturateInput.value);
  SepiaSeekBar.value = SepiaInput.value;
  SaturateSeekBar.value = SaturateInput.value;
});

let count = 0;
document.addEventListener("load", (event) => console.log(event));
const observer = new window.MutationObserver(() => {
  console.log("呼び出し回数" + count++);
  const nav = document.querySelector(".Menu_nav__jFWZt");
  if (nav !== null) {
    console.log("complete setup for dlif");
    observer.disconnect();
    if (document.getElementById("dlif-menu-button") != null) {
      document.getElementById("dlif-menu-button").remove();
    }

    /** @type {HTMLElement} */
    const nav = document.querySelector(".Menu_nav__jFWZt");
    nav.insertAdjacentHTML(
      "beforeend",
      `<li id="dlif-menu-button" class="Menu_item__jfaZL"><a onclick="document.getElementById('dlif-menu_is_open').checked = true"><span>あああ</span></a></li>`
    );
  }
});

observer.observe(document.body, { childList: true });
