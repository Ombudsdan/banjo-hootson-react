export type ActionPanelOption =
  | "instagram"
  | "facebook"
  | "threads"
  | "calendar"
  | "submitBirthday"
  | "beer";

export type ActionPanelTheme = "instagram" | "facebook" | "threads" | "default";

export interface IActionPanel {
  icon?: string; // In React we do not import FA icons; class handled in CSS or replaced later
  link: string;
  text: string;
  isExternal?: boolean;
  theme?: ActionPanelTheme;
}

export class ClickableActionPanelController {
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
    { link: "https://instagram.com/banjohootson", text: "Instagram" },
  ],
  ["facebook", { link: "https://facebook.com/banjohootson", text: "Facebook" }],
  ["threads", { link: "https://threads.net/banjohootson", text: "Threads" }],
  ["calendar", { link: "/calendar", text: "Birthday Calendar" }],
  ["submitBirthday", { link: "/calendar/submit", text: "Submit Birthday" }],
  [
    "beer",
    { link: "https://buymeacoffee.com/banjohootson", text: "Buy Me A Beer?" },
  ],
]);

const PANEL_THEME_MAP = new Map<ActionPanelOption, ActionPanelTheme>([
  ["instagram", "instagram"],
  ["facebook", "facebook"],
  ["threads", "threads"],
]);
