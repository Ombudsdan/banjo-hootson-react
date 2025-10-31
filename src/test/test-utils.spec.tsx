import { useEffect, useRef, useState } from 'react';
import { describe, it, expect } from 'vitest';
import { UnitTestUtils } from 'test';

describe('test-utils: UnitTestUtils', () => {
  let utils: UnitTestUtils;

  beforeEach(() => {
    utils = new UnitTestUtils((<TestComponent />));
  });

  it('elem locates elements by selector', () => {
    expect(utils.elem('.trigger')).toBeInstanceOf(HTMLElement);
  });

  it('allElems locates elements by selector', () => {
    expect(utils.allElems('.item')).toHaveLength(2);
  });

  it('allElemsFromBaseElem finds nested elements', () => {
    const base = utils.elem('#base');
    const nested = utils.allElemsFromBaseElem(base, '.inner');

    expect(nested).toHaveLength(1);
    expect(nested[0].textContent?.trim()).toBe('Inner');
  });

  it('text returns trimmed content', () => {
    expect(utils.text('.item')).toBe('First');
  });

  it('textFromElem returns trimmed content', () => {
    const el = utils.elem('.nested .inner');

    expect(utils.textFromElem(el)).toBe('Inner');
  });

  it('textFromBaseElem returns trimmed content', () => {
    const base = utils.elem('#base');

    expect(utils.textFromBaseElem(base, '.inner')).toBe('Inner');
  });

  it('allText returns arrays of text', () => {
    expect(utils.allText('.item')).toEqual(['First', 'Second']);
  });

  it('allTextFromBaseElem returns arrays of text', () => {
    const base = utils.elem('#base');

    expect(utils.allTextFromBaseElem(base, '.item')).toEqual(['First', 'Second']);
  });

  it('tagName reports lowercase tag names', () => {
    expect(utils.tagName('.trigger')).toBe('button');
  });

  it('tagNameFromElem reports lowercase tag names', () => {
    const btn = utils.elem('.trigger');

    expect(utils.tagNameFromElem(btn)).toBe('button');
  });

  it('click triggers click handlers', () => {
    utils.click('.trigger');

    expect(utils.text('.result')).toBe('Clicked');
  });

  it('triggerEvent dispatches custom events', () => {
    utils.triggerEvent('.custom-target', 'custom');

    expect(utils.text('.custom-result')).toBe('Custom');
  });

  it('triggerKeydown dispatches keydown event', () => {
    utils.triggerKeydown('.key-target', 'Escape');

    expect(utils.text('.key-result')).toBe('Escape');
  });
});

function TestComponent() {
  const [clicked, setClicked] = useState(false);
  const [custom, setCustom] = useState(false);
  const [keyPressed, setKeyPressed] = useState('');
  const customRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = customRef.current;
    if (!el) return;
    const handler = () => setCustom(true);
    el.addEventListener('custom', handler as EventListener);
    return () => el.removeEventListener('custom', handler as EventListener);
  }, []);

  return (
    <div>
      <div id="base">
        <span className="item"> First </span>
        <span className="item"> Second </span>
        <div className="nested">
          <span className="inner"> Inner </span>
        </div>
      </div>

      <button className="trigger" onClick={() => setClicked(true)}>
        Click Me
      </button>

      <div className="key-target" onKeyDown={e => e.key === 'Escape' && setKeyPressed('Escape')} tabIndex={0}>
        Key Target
      </div>

      <div className="custom-target" ref={customRef}>
        Custom Target
      </div>

      {clicked && <span className="result">Clicked</span>}
      {custom && <span className="custom-result">Custom</span>}
      {keyPressed && <span className="key-result">{keyPressed}</span>}
    </div>
  );
}
