import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { toggleTheme } from "../utils/theme";

@customElement("theme-toggle")
export class ThemeToggle extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: right;
    }

    button {
      padding: 0.75rem 1.5rem;
      background: var(--bg);
      color: var(--text);
      border: 1px solid var(--text);
      border-radius: 0px;
      cursor: pointer;

      font-family: "Doto", sans-serif;
      font-size: 1rem;
      font-weight: 900;
      transition: background 0.3s, color 0.3s;
      text-transform: uppercase;
    }
  `;

  render() {
    return html`<button @click=${toggleTheme}>Toggle Theme</button>`;
  }
}
