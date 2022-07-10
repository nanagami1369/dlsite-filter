"use strict";
// @ts-check

// 設定置き場
/** @type { number } メニュー表示するまでの待ち時間 */
const waitOpenMenuTime = 450;

// dlif <= 本addonで使うクラスにつける接頭辞

// メニューを表示する処理
// すでに存在していたら削除して作り直す
document.getElementById("dlif-menu_is_open")?.remove();
document.getElementById("dlif-menu")?.remove();
const dlsiteImageFilterMenu = `
<input id="dlif-menu_is_open" type="checkbox" style="display: none;">
<div id="dlif-menu">
<div id="dlif-close-button-area">
    <label class="toggle-button-label" for="toggle-button-origin">有効化</label>
    <input type="checkbox" id="toggle-button-origin">
    <label class="toggle-button-body" for="toggle-button-origin">
      <div class="toggle-button-handle"></div>
    </label>
    <button id="dlif-reset-button">リセット</button>
    <button id="dlif-close-button">✕</button>
</div>
<div class="dlif-controller">
  <label for="dlif-sepia-seek-bar">セピア</label>
  <input id="dlif-sepia-seek-bar" type="range" min="0" max="1" step="0.01" value="0">
  <input type="number" min="0" max="1" step="0.01" value="0" id="dlif-sepia-input"><span>px</span>
  <div class="dlif-seek-bar-scale">
    <p class="dlif-min">0</p><p class="dlif-mid">0.5</p><p class="dlif-max">1</p>
  </div>
</div>
<div class="dlif-controller">
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

// スタイルの有効化、無効化
const isEnableCheckBox = document.getElementById("toggle-button-origin");
// 初期化
isEnableCheckBox.checked = true;
dlsiteImageFilterStyle.disabled = !isEnableCheckBox.checked;
// 更新
isEnableCheckBox.addEventListener("change", () => {
  dlsiteImageFilterStyle.disabled = !isEnableCheckBox.checked;
});

// リセットボタン
const resetButton = document.getElementById("dlif-reset-button");
resetButton.addEventListener("click", () => {
  setCanvasStyle(0, 100);
  SepiaSeekBar.value = 0;
  SepiaInput.value = 0;
  SaturateSeekBar.value = 100;
  SaturateInput.value = 100;
});

// メニューの開閉

// 閉じるボタンで閉じる

const closeButton = document.getElementById("dlif-close-button");
closeButton.addEventListener("click", () => {
  document.getElementById("dlif-menu_is_open").checked = false;
});
closeButton.addEventListener("touchend", () => {
  document.getElementById("dlif-menu_is_open").checked = false;
});

// mouse or 画面長押し時にメニューを開く

const touchMenuStart = () => {
  // もしメニューが開いていたら何もしない
  if (document.getElementById("dlif-menu_is_open").checked) {
    return;
  }
  const timerId = setTimeout(() => {
    document.getElementById("dlif-menu_is_open").checked = true;
  }, waitOpenMenuTime);

  /**
   * @param {Event} event
   */
  const touchMenuStop = (event) => {
    event.preventDefault();

    clearTimeout(timerId);
    /** @type {HTMLElement} */
    document.removeEventListener("touchend", touchMenuStop);
    document.removeEventListener("touchcancel", touchMenuStop);
  };
  document.addEventListener("touchend", touchMenuStop, { passive: false });
  document.addEventListener("touchcancel", touchMenuStop, { passive: false });
};

document.addEventListener("touchstart", touchMenuStart, { passive: false });

const cursorMenuStart = () => {
  // もしメニューが開いていたら何もしない
  if (document.getElementById("dlif-menu_is_open").checked) {
    return;
  }
  const timerId = setTimeout(() => {
    document.getElementById("dlif-menu_is_open").checked = true;
  }, waitOpenMenuTime);

  /**
   * @param {Event} event
   */
  const cursorMenuStop = (event) => {
    event.preventDefault();

    clearTimeout(timerId);
    /** @type {HTMLElement} */
    document.removeEventListener("mouseup", cursorMenuStop);
  };
  document.addEventListener("mouseup", cursorMenuStop, { passive: false });
};

document.addEventListener("mousedown", cursorMenuStart, { passive: false });
