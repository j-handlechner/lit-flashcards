import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { toggleTheme } from "../utils/theme";

@customElement("theme-toggle")
export class ThemeToggle extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: right;
      padding: 1rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      background: var(--card);
      color: var(--text);
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 700;
    }
  `;

  render() {
    return html`<button @click=${toggleTheme}>🌗 &nbsp; Toggle Theme</button>`;
  }
}
