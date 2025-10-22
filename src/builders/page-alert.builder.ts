import {
  IPageAlert,
  PageAlertVariant,
  PageAlertVariantType,
} from "model/page-alert";
import { ReactNode } from "react";

const DEFAULT_PAGE_ALERT: Partial<IPageAlert> = {
  messages: [],
  autoFocus: true,
  content: undefined,
  timeoutMs: undefined,
};

export default class PageAlert {
  static buildPageAlert(
    variant: PageAlertVariantType,
    heading: string,
    id: string,
    overrides?: IPageAlertBuilderOverrides
  ): PageAlertBuilder {
    return new PageAlertBuilder(variant, heading, id, overrides || {});
  }

  static success(
    heading: string,
    id: string,
    overrides?: IPageAlertBuilderOverrides
  ) {
    return new PageAlertBuilder(
      PageAlertVariant.SUCCESS,
      heading,
      id,
      overrides || {}
    ).create();
  }

  static info(
    heading: string,
    id: string = "",
    overrides?: IPageAlertBuilderOverrides
  ) {
    return new PageAlertBuilder(
      PageAlertVariant.INFO,
      heading,
      id,
      overrides || {}
    ).create();
  }

  static warning(
    heading: string,
    id: string,
    overrides?: IPageAlertBuilderOverrides
  ) {
    return new PageAlertBuilder(
      PageAlertVariant.WARNING,
      heading,
      id,
      overrides || {}
    ).create();
  }

  static error(
    heading: string,
    id: string,
    overrides?: IPageAlertBuilderOverrides
  ) {
    return new PageAlertBuilder(
      PageAlertVariant.ERROR,
      heading,
      id,
      overrides || {}
    ).create();
  }

  static saved(entity: string = "Changes"): IPageAlert {
    const message = `${entity} saved`;
    const id = `${entity.toLowerCase().replace(/\s+/g, "-")}-saved-alert`;
    const options = { timeoutMs: 4000 };

    return new PageAlertBuilder(
      PageAlertVariant.SUCCESS,
      message,
      id,
      options
    ).create();
  }

  static deleted(entity: string = "Item"): IPageAlert {
    const message = `${entity} deleted`;
    const id = `${entity.toLowerCase().replace(/\s+/g, "-")}-deleted-alert`;
    const options = { timeoutMs: 4000 };

    return new PageAlertBuilder(
      PageAlertVariant.INFO,
      message,
      id,
      options
    ).create();
  }
}

class PageAlertBuilder {
  private pageAlert: IPageAlert;

  constructor(
    variant: PageAlertVariantType,
    heading: string,
    id: string,
    overrides: IPageAlertBuilderOverrides
  ) {
    this.pageAlert = {
      ...DEFAULT_PAGE_ALERT,
      ...overrides,
      id,
      heading,
      variant,
    };
  }

  setAutoFocus(autoFocus: boolean) {
    this.pageAlert.autoFocus = autoFocus;
    return this;
  }

  includeMessage(message: string) {
    this.pageAlert.messages ??= [];
    this.pageAlert.messages.push(message);
    return this;
  }

  setContent(content: ReactNode) {
    this.pageAlert.content = content;
    return this;
  }

  /** Auto-dismiss after provided milliseconds */
  setTimeoutMs(timeoutMs: number) {
    this.pageAlert.timeoutMs = timeoutMs;
    return this;
  }

  create() {
    return this.pageAlert;
  }
}

interface IPageAlertBuilderOverrides
  extends Partial<Omit<IPageAlert, "id" | "variant" | "heading">> {}
