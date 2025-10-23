import { ReactElement, JSXElementConstructor, ReactNode } from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DialogOutlet, FormDialogOutlet, FormProvider } from 'hooks';
import { LayoutProviders } from 'layout';

/**
 * Lightweight DOM utility class for React Testing Library.
 *
 * Offers convenience helpers for querying and interacting with elements via CSS selectors.
 */
export class UnitTestUtils {
  /** Underlying Testing Library render result. */
  readonly render: RenderResult;

  /**
   * @param ui - The React element under test.
   * @param opts - Options to enable additional providers.
   */
  constructor(ui: ReactElement, opts: IProviderOptions = {}) {
    this.render = renderWithProviders(ui, opts);
  }

  /** Rerenders the UI with a new React element. */
  rerender(ui: ReactElement): void {
    this.render.rerender(ui);
  }

  /** Returns the first element matching the CSS selector within the render container. */
  elem(selector: string): HTMLElement {
    return this.render.container.querySelector(selector) as HTMLElement;
  }

  /** Returns all elements matching the CSS selector within the render container. */
  allElems(selector: string): HTMLElement[] {
    return Array.from(this.render.container.querySelectorAll(selector)) as HTMLElement[];
  }

  /** Returns all elements matching the selector within a provided base element. */
  allElemsFromBaseElem(elem: HTMLElement, selector: string): HTMLElement[] {
    return Array.from(elem.querySelectorAll(selector)) as HTMLElement[];
  }

  /** Returns trimmed text content for the first match of the selector, or undefined. */
  text(selector: string): string | undefined {
    return this.elem(selector)?.textContent?.trim() || undefined;
  }

  /** Returns trimmed text content for a specific element, or undefined. */
  textFromElem(elem: HTMLElement): string | undefined {
    return elem?.textContent?.trim() || undefined;
  }

  /** Returns trimmed text content for the first match under a base element, or undefined. */
  textFromBaseElem(baseElem: HTMLElement, selector: string): string | undefined {
    const nestedElem = baseElem.querySelector(selector) as HTMLElement | null;
    return nestedElem ? this.textFromElem(nestedElem) : undefined;
  }

  /** Returns trimmed text content for all matches of the selector. */
  allText(selector: string): (string | undefined)[] {
    return this.allElems(selector)
      .filter(elem => !!elem.textContent)
      .map(elem => elem.textContent!.trim());
  }

  /** Returns trimmed text content for all matches under a base element. */
  allTextFromBaseElem(baseElem: HTMLElement, selector: string): (string | undefined)[] {
    return Array.from(baseElem.querySelectorAll(selector))
      .filter(elem => !!elem.textContent)
      .map(e => this.textFromElem(e as HTMLElement));
  }

  /** Returns the lowercase tag name for a specific element, or undefined. */
  tagNameFromElem(elem: HTMLElement): string | undefined {
    return elem ? elem.tagName.toLowerCase() : undefined;
  }

  /** Returns the lowercase tag name for the first match of the selector, or undefined. */
  tagName(selector: string): string | undefined {
    const element = this.elem(selector);
    return element ? this.tagNameFromElem(element) : undefined;
  }

  /** Simulates a click on the first element matching the selector using Testing Library fireEvent. */
  click(selector: string): void {
    const elemToClick = this.elem(selector);
    if (!elemToClick) throw new Error(`Element with selector "${selector}" not found.`);
    fireEvent.click(elemToClick);
  }

  /**
   * Dispatches a DOM event with the given name on the first element matching the selector.
   * For well-known events prefer a dedicated fireEvent helper (e.g. fireEvent.change).
   */
  triggerEvent(selector: string, eventName: string): void {
    const elemToTrigger = this.elem(selector);
    if (!elemToTrigger) throw new Error(`Element with selector "${selector}" not found.`);
    const event = new Event(eventName, { bubbles: true });
    fireEvent(elemToTrigger, event);
  }

  /** Fires a keydown event with the provided key on the first element matching the selector. */
  triggerKeydown(selector: string, key: 'Escape'): void {
    const elemToTrigger = this.elem(selector);
    if (!elemToTrigger) throw new Error(`Element with selector "${selector}" not found.`);
    fireEvent.keyDown(elemToTrigger, { key });
  }
}

/**
 * Renders a React element under the project's common providers for tests.
 *
 * By default this wraps the UI with:
 * - MemoryRouter (so routing works in tests)
 * - LayoutProviders (global layout/context used by the app)
 *
 * Optional flags:
 * - withForm: mount a FormProvider to enable form hooks in the subtree
 * - withDialogs: mount dialog outlets to enable dialog-related hooks/flows
 *
 * @param ui - The React element under test.
 * @param opts - Options to enable additional providers.
 * @returns A Testing Library RenderResult for further queries/actions.
 */
function renderWithProviders(ui: ReactElement, opts: IProviderOptions = {}) {
  const { withForm = false, withDialogs = false } = opts;

  const Wrapper = ({ children }: { children: ReactElement }) => {
    return (
      <MemoryRouter>
        <LayoutProviders>
          {withForm ? <FormProvider>{children}</FormProvider> : children}
          {withDialogs && (
            <>
              <DialogOutlet />
              <FormDialogOutlet />
            </>
          )}
        </LayoutProviders>
      </MemoryRouter>
    );
  };

  return render(ui, { wrapper: Wrapper as JSXElementConstructor<{ children?: ReactNode }> });
}

/**
 * Options to enable additional providers when rendering components in tests.
 */
interface IProviderOptions {
  /** Wrap UI with a FormProvider to enable form context/hooks. */
  withForm?: boolean;
  /** Mount dialog outlets to enable dialog and form-dialog flows. */
  withDialogs?: boolean;
}
