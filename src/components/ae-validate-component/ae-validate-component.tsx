import { Component, Element, Event, EventEmitter, h, Method, Prop, State } from '@stencil/core';
import { defaultValidator, getValidator, Validator, ValidatorEntry } from '../../validators';

import anime from 'animejs'

@Component({
  tag: 'ae-validate-component',
  styleUrl: 'ae-validate-component.css',
  scoped: true,
  shadow: false
})
export class AeValidateComponent {

  @Prop({ mutable: true }) value: string;

  @Prop() validator: Array<string | ValidatorEntry | Validator<string>>;

  @Event() changed: EventEmitter<string>;

  @Element() host: HTMLElement;

  @State() isValid: boolean;

  _validator: Validator<string> = defaultValidator;

  componentWillLoad() {
    this._validator = getValidator<string>(this.validator);
    this.validate();
  }

  componentWillUpdate() {
    this._validator = getValidator<string>(this.validator);
  }

  handleChange(ev) {
    this.value = ev.target ? ev.target.value : null;
    this.changed.emit(this.value);
    this.validate();
    if (this.isValid) {
      this.animeToValid();
    } else {
      this.animeToInvalid();
    }
  }

  animeToValid(): void {
    anime({})
  }

  animeToInvalid(): void {
    anime({})
  }

  @Method()
  validate(): void {
    this.isValid = this._validator.validate(this.value);
  }

  render() {
    this.validate();
    return (
      <div class={'outer-container ' + (this.isValid ? 'valid' : 'invalid')}>
        <div class="input-row">
          <div class="input-container">
            <input value={this.value} onInput={(ev) => this.handleChange(ev)} />
          </div>
          <div class="status">
            <img src={this.isValid ? 'assets/checkmark.svg' : 'assets/cross.svg'} />
          </div>
        </div>
        {!this.isValid ?
          <span class="validation-error">{this._validator.errorMessage}</span>
          : null}
      </div>
    );
  }
}


