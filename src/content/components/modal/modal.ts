// There are much better ways given time to build this
import './modal.scss';
const NAMESPACE = 'UNIQUE-NAMESPACE';
export class Modal {
  private _modal: HTMLDivElement;

  private _lastUpdateCall: number | null;

  private _isMouseDown = false;

  private _startPosition: { x: number; y: number };

  private _currentPosition = { x: 0, y: 0 };

  private _distancePosition = { x: 0, y: 0 };

  private _windowSize = { width: 0, height: 0 };

  constructor(private _content: HTMLElement, defaultX = 0, defaultY = 0) {
    this._lastUpdateCall = null;
    // Create a modal and append it to body
    this._modal = document.createElement('div');
    this._modal.setAttribute('id', `${NAMESPACE}-modal`);
    this._startPosition = { x: defaultX, y: defaultY };
    this._modal.style.transform = `translate(${defaultX}px, ${defaultY}px)`;
    this._modal.append(this._content);
    // This has to be added to the body before it has width and height
    document.body.prepend(this._modal);
    const bounds = this._modal.getBoundingClientRect();
    this._windowSize = {
      width: window.innerWidth - bounds.width,
      height: window.innerHeight - bounds.height,
    };
    this._modal.addEventListener('mousedown', this._handleMouseDown, false);
    window.addEventListener('mouseup', this._handleMouseUp, false);
    // this._modal.addEventListener('mouseleave', this._handleMouseUp, false);
  }

  _getTranslate(): { x: number; y: number } {
    const translate = getComputedStyle(this._modal, null)
      .getPropertyValue('transform')
      .split(',');
    return { x: parseInt(translate[4]), y: parseInt(translate[5]) };
  }

  _handleMouseDown = (event: MouseEvent): void => {
    event.preventDefault();
    this._isMouseDown = true;
    this._startPosition = { x: event.pageX, y: event.pageY };
    this._currentPosition = this._getTranslate();
    // Throttling this would make a ton more
    this._modal.addEventListener('mousemove', this._handleMouseMove, false);
  };

  _handleMouseUp = (event: MouseEvent): void => {
    event.preventDefault();
    this._isMouseDown = false;
    this._modal.removeEventListener('mousemove', this._handleMouseMove, false);
  };

  _handleMouseMove = (event: MouseEvent): void => {
    if (this._isMouseDown) {
      event.preventDefault();
      if (this._lastUpdateCall) cancelAnimationFrame(this._lastUpdateCall);
      this._lastUpdateCall = requestAnimationFrame(() => {
        const x =
          event.clientX - this._startPosition.x + this._currentPosition.x;

        const moveX =
          x < 0 ? 0 : x > this._windowSize.width ? this._windowSize.width : x;
        const y =
          event.clientY - this._startPosition.y + this._currentPosition.y;
        const moveY =
          y < 0 ? 0 : y > this._windowSize.height ? this._windowSize.height : y;

        this._distancePosition = {
          x: moveX,
          y: moveY,
        };

        this._update();
        this._lastUpdateCall = null;
      });
    }
  };

  _update = (): void => {
    this._modal.style.transform = `translate(${this._distancePosition.x}px, ${this._distancePosition.y}px)`;
  };
}
