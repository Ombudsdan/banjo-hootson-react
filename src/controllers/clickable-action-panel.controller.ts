import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ICONS } from "icons";

export default class ClickableActionPanelController {
  static getPanelContent(option: ActionPanelOption): IActionPanel | undefined {
    const panelContent = PANEL_CONTENT_MAP.get(option);
    if (!panelContent) {
      console.error("Invalid option provided");
      return undefined;
    }
    const computed: IActionPanel = {
      ...panelContent,
      isExternal: this.getIsExternal(panelContent.link),
      theme: this.getTheme(option),
    };
    return computed;
  }

  private static getIsExternal(link: string): boolean {
    return (
      link.includes("http://") ||
      link.includes("https://") ||
      link.startsWith("www")
    );
  }

  private static getTheme(option: ActionPanelOption): ActionPanelTheme {
    return PANEL_THEME_MAP.get(option) || "default";
  }
}

const PANEL_CONTENT_MAP = new Map<ActionPanelOption, IActionPanel>([
  [
    "instagram",
    {
      icon: ICONS.instagram,
      link: "https://instagram.com/banjohootson",
      text: "Instagram",
    },
  ],
  [
    "facebook",
    {
      icon: ICONS.facebook,
      link: "https://facebook.com/banjohootson",
      text: "Facebook",
    },
  ],
  [
    "threads",
    {
      icon: ICONS.threads,
      link: "https://threads.net/banjohootson",
      text: "Threads",
    },
  ],
  [
    "calendar",
    { icon: ICONS.calendar, link: "/calendar", text: "Birthday Calendar" },
  ],
  [
    "submitBirthday",
    {
      icon: ICONS.submitBirthday,
      link: "/calendar/submit",
      text: "Submit Birthday",
    },
  ],
  [
    "beer",
    {
      icon: ICONS.beer,
      link: "https://buymeacoffee.com/banjohootson",
      text: "Buy Me A Beer?",
    },
  ],
]);

const PANEL_THEME_MAP = new Map<ActionPanelOption, ActionPanelTheme>([
  ["instagram", "instagram"],
  ["facebook", "facebook"],
  ["threads", "threads"],
]);

export type ActionPanelOption =
  | "instagram"
  | "facebook"
  | "threads"
  | "calendar"
  | "submitBirthday"
  | "beer";

export type ActionPanelTheme = "instagram" | "facebook" | "threads" | "default";

export interface IActionPanel {
  icon?: IconDefinition;
  link: string;
  text: string;
  isExternal?: boolean;
  theme?: ActionPanelTheme;
}
