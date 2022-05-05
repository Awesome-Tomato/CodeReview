export class Focusmanager {
  /**
   * @type {[HTMLElement, HTMLElement[]][]}
   */
  groups = [];

  /**
   *
   * @param {HTMLElement} handleElement 키 다운 이벤트 핸들러가 등록될 부모 요소입니다
   * @param {HTMLElement[]} group 포커스를 옮길 요소 목록입니다
   */
  addGroup(handleElement, group) {
    this.groups.push([handleElement, group]);
    handleElement.addEventListener('keydown', this.#keyDownHandler.bind(this));
  }

  /**
   * 등록된 포커싱 관리 그룹을 제거합니다
   * @param {HTMLElement} handleElement
   */
  removeGroup(handleElement) {
    handleElement.removeEventListener('keydown', this.#keyDownHandler);
    const index = this.#findGroupIndex(handleElement);
    if (index === -1) return;
    this.groups.splice(index, 1);
  }

  /**
   *
   * @param {KeyboardEvent} e
   */
  #keyDownHandler(e) {
    const handleElement = e.currentTarget;
    if (e.key === 'ArrowUp') {
      this.#upArrowHandler(handleElement);
      return;
    }

    if (e.key === 'ArrowDown') {
      this.#downArrowHandler(handleElement);
      return;
    }
  }

  /**
   *
   * @param {HTMLElement} handleElement
   */
  #findGroupIndex(handleElement) {
    return this.groups.findIndex((group) => group[0] === handleElement);
  }

  /**
   *
   * @param {HTMLElement} handleElement
   */
  #upArrowHandler(handleElement) {
    const groupIndex = this.#findGroupIndex(handleElement);
    const [, moveableElements] = this.groups[groupIndex];
    let currentFocusedIndex = moveableElements.findIndex(
      (element) => element === document.activeElement
    );

    const previouseTarget = moveableElements[currentFocusedIndex - 1];
    if (previouseTarget) {
      previouseTarget.focus();
      return;
    }

    const previouseGroup = this.groups[groupIndex - 1];
    if (!previouseGroup) return;
    const previouseMoveableElements = previouseGroup[1];
    const focusTarget =
      previouseMoveableElements[previouseMoveableElements.length - 1];
    focusTarget.focus();
  }

  /**
   *
   * @param {HTMLElement} handleElement
   */
  #downArrowHandler(handleElement) {
    const groupIndex = this.#findGroupIndex(handleElement);
    const [, moveableElements] = this.groups[groupIndex];
    let currentFocusedIndex = moveableElements.findIndex(
      (element) => element === document.activeElement
    );

    const nextTarget = moveableElements[currentFocusedIndex + 1];
    if (nextTarget) {
      nextTarget.focus();
      return;
    }

    const nextGroup = this.groups[groupIndex + 1];
    if (!nextGroup) return;
    const focusTarget = nextGroup[1][0];
    focusTarget.focus();
  }
}
