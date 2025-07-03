'use strict';
// 一番下を表示
window.addEventListener('load', () => {
  window.scrollTo(0, document.body.scrollHeight);
})

// エンターキーと Ctrl or Command を押していたら送信
const formElement = document.forms['message-form'] // formの検索
const textareaElement = formElement.elements['content'] // 中身の文章
textareaElement.addEventListener('keydown', (event) => {
  // 送信キーを押したら
  if (isPressedSubmitKey(event)) {
    // キーボード入力をキャンセルして送信
    event.preventDefault()
    formElement.submit()
  }
})

// 指定のキーを押せているか判定
function isPressedSubmitKey(event) {
  if (event.key !== 'Enter') return false;
  if (event.ctrlKey) return true;
  if (event.metaKey) return true;
}

// ツールチップの有効化
const tooltipTriggerElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltipTriggerElements.forEach((tooltipTriggerElement) => {
  new bootstrap.Tooltip(tooltipTriggerElement);
});