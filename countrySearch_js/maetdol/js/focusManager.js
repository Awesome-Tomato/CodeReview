import { last } from './utils.js';

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
    const index = this.#findGroupIndexBy(handleElement);
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
   * @returns {number}
   */
  #findGroupIndexBy(handleElement) {
    return this.groups.findIndex((group) => group[0] === handleElement);
  }

  /**
   *
   * @param {[HTMLElement, HTMLElement[]]} group
   * @returns {number}
   */
  #findFocusedIndexInGroup(group) {
    return group[1].findIndex((element) => element === document.activeElement);
  }

  /**
   *
   * @param {HTMLElement} handleElement
   */
  #upArrowHandler(handleElement) {
    this.#focusPositionedAt(handleElement, -1);
  }

  /**
   *
   * @param {HTMLElement} handleElement
   */
  #downArrowHandler(handleElement) {
    this.#focusPositionedAt(handleElement, 1);
  }

  /**
   *
   * @param {HTMLElement} handleElement 핸들러가 등록된 부모 요소
   * @param {number} distance 현재 포커스된 요소로부터
   * 얼마나 떨어진 요소로 포커스를 이동할 것인지
   */
  #focusPositionedAt(handleElement, distance) {
    const groupIndex = this.#findGroupIndexBy(handleElement);
    const group = this.groups[groupIndex];
    const currentlyFocusedIndex = this.#findFocusedIndexInGroup(group);

    const nextTarget = this.#getElementInGroup(
      group,
      currentlyFocusedIndex + distance
    );
    if (nextTarget) {
      nextTarget.focus();
      return;
    }

    // 포커스를 이동할 요소가 없을 경우, 다음 그룹에서 찾는다
    const direction = Math.sign(distance);
    const nextGroup = this.groups[groupIndex + direction];

    if (!nextGroup) return;
    let target = this.#getElementInGroup(nextGroup, 0);
    if (direction === -1) {
      const focusableElements = nextGroup[1];
      target = last(focusableElements);
    }
    target.focus();
  }

  /**
   *
   * @param {[HTMLElement, HTMLElement[]]} group
   * @param {number} index
   * @returns {HTMLElement}
   */
  #getElementInGroup(group, index) {
    const [, focusableElements] = group;
    return focusableElements[index];
  }
}
