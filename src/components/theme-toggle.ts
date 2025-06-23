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
      padding: 0.5rem 1rem;
      background: var(--card);
      color: var(--text);
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
  `;

  render() {
    return html`<button @click=${toggleTheme}>🌗 Toggle Theme</button>`;
  }
}
