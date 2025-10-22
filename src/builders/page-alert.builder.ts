
import { IAlertCard } from "framework";
import { PageAlertVariant, PageAlertVariantType } from "enums";

const DEFAULT_PAGE_ALERT: Partial<IAlertCard> = {
  messages: [],
  children: undefined,
  timeoutMs: undefined,
};

export default class PageAlert {
  static buildPageAlert(
    variant: PageAlertVariantType,
    heading: string,
    id: string,
    overrides?: PageAlertBuilderOverrides
  ): PageAlertBuilder {
    return new PageAlertBuilder(variant, heading, id, overrides || {});
  }

  static success(
    heading: string,
    id: string,
    overrides?: PageAlertBuilderOverrides
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
    overrides?: PageAlertBuilderOverrides
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
    overrides?: PageAlertBuilderOverrides
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
    overrides?: PageAlertBuilderOverrides
  ) {
    return new PageAlertBuilder(
      PageAlertVariant.ERROR,
      heading,
      id,
      overrides || {}
    ).create();
  }

  static saved(entity: string = "Changes"): IAlertCard {
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

  static deleted(entity: string = "Item"): IAlertCard {
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
  private pageAlert: IAlertCard;

  constructor(
    variant: PageAlertVariantType,
    heading: string,
    id: string,
    overrides: PageAlertBuilderOverrides
  ) {
    this.pageAlert = {
      ...DEFAULT_PAGE_ALERT,
      ...overrides,
      id,
      heading,
      variant,
    };
  }

  setDisableAutoFocus(disableAutoFocus: boolean) {
    this.pageAlert.disableAutoFocus = disableAutoFocus;
    return this;
  }

  includeMessage(message: string) {
    this.pageAlert.messages ??= [];
    this.pageAlert.messages.push(message);
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

type PageAlertBuilderOverrides = Partial<
  Omit<IAlertCard, "id" | "variant" | "heading">
>;