import {
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { chatResource } from '@hashbrownai/angular';
import { SmartHome } from '../smart-home';
import { Squircle } from '../squircle';
import { ChatLayout } from './chat-layout';
import { ChatPrompts } from './chat-prompts';
import { Composer } from './composer';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [MatProgressBarModule, Composer, ChatLayout, ChatPrompts, Squircle],
  template: `
    <div
      class="container"
      appSquircle="16"
      [appSquircleBorderWidth]="2"
      appSquircleBorderColor="#EEC7AD"
    >
      @if (chat.isLoading()) {
        <div class="chat-loading">
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        </div>
      }
      <app-chat-layout>
        <div class="chat-messages" #contentDiv>
          @for (message of chat.value(); track $index) {
            <div class="chat-message">
              <p>{{ message.content }}</p>
            </div>
          }
          @if (chat.value().length === 0) {
            <app-chat-prompts (selectPrompt)="sendMessage($event)" />
          }
        </div>
        <app-chat-composer
          (sendMessage)="sendMessage($event)"
        ></app-chat-composer>
      </app-chat-layout>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        --chat-width: 480px;
        width: var(--chat-width);
        height: 100dvh;
        padding: 16px;
      }

      .container {
        background: #fdf4ef;
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .chat-loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
      }

      .chat-messages {
        flex-grow: 0;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
        position: relative;
        padding: 16px;
      }
    `,
  ],
})
export class ChatPanelComponent {
  smartHome = inject(SmartHome);

  readonly contentDiv =
    viewChild.required<ElementRef<HTMLDivElement>>('contentDiv');

  constructor() {
    effect(() => {
      // React when messages change
      this.chat.value();

      requestAnimationFrame(() => {
        this.contentDiv().nativeElement.scrollTop =
          this.contentDiv().nativeElement.scrollHeight;
      });
    });
  }

  chat = chatResource({
    model: 'gpt-4.1',
    debugName: 'chatResource',
    system:
      'You are a helpful assistant that can answer questions and help with tasks.',
  });

  sendMessage(message: string) {
    this.chat.sendMessage({ role: 'user', content: message });
  }
}
