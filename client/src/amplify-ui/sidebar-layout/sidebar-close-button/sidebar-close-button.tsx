import {Component, Prop, h, Host, State} from "@stencil/core";
import {sidebarLayoutContext} from "../sidebar-layout.context";
import {ToggleInView} from "../sidebar-layout.types";
import {sidebarCloseButtonStyle} from "./sidebar-close-button.style";

@Component({tag: "amplify-sidebar-close-button"})
export class AmplifySidebarCloseButton {
  /*** toggles the state provided by `sidebar-layout` */
  @Prop() readonly toggleInView?: ToggleInView;
  /*** whether or not the sidebar is in view, provided by `sidebar-layout` */
  @Prop() readonly inView?: boolean;
  /*** whether or not the button is being hovered */
  @State() isHovered = false;

  onClick = (e: Event) => {
    if (this.inView) {
      e.stopPropagation();
    }
    if (this.toggleInView) {
      this.toggleInView();
    }
  };

  hover = () => {
    this.isHovered = true;
  };

  unhover = () => {
    this.isHovered = false;
  };

  render() {
    const imgLink = this.isHovered
      ? "/assets/close-dark.svg"
      : "/assets/close-light.svg";
    return (
      <Host class={sidebarCloseButtonStyle}>
        <a onClick={this.onClick}>
          <img
            src={imgLink}
            onMouseEnter={this.hover}
            onMouseLeave={this.unhover}
          />
        </a>
      </Host>
    );
  }
}

sidebarLayoutContext.injectProps(AmplifySidebarCloseButton, [
  "inView",
  "toggleInView",
]);
