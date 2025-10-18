import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { prompt, s } from '@hashbrownai/core';
import { exposeComponent, RenderMessageComponent, uiChatResource } from '@hashbrownai/angular';
import { SmartHome } from '../smart-home';
import { Squircle } from '../squircle';
import { ChatLayout } from './chat-layout';
import { ChatPrompts } from './chat-prompts';
import { Composer } from './composer';
import { Markdown } from './markdown';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [
    MatProgressBarModule,
    Composer,
    ChatLayout,
    ChatPrompts,
    Squircle,
    RenderMessageComponent,
  ],
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
            @switch (message.role) {
              @case ('user') {
                <p>{{ message.content }}</p>
              }
              @case ('assistant') {
                <hb-render-message [message]="message" />
              }
            }
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

  chat = uiChatResource({
    model: 'gpt-4.1',
    debugName: 'ui-chat',
    system: prompt`
      ### ROLE & TONE
      You are **Smart Home Assistant**, a friendly and concise AI assistant for a
      smart home web application.

      - Voice: clear, helpful, and respectful.
      - Audience: users controlling lights and scenes via the web interface.

      ### RULES
      1. **Never** expose raw data or internal code details.
      2. For commands you cannot perform, **admit it** and suggest an alternative.
      3. For actionable requests (e.g., changing light settings), **precede** any
        explanation with the appropriate tool call.


      ### EXAMPLES

      <user>Hello</user>
       <assistant>
        <ui>
          <app-markdown data="How may I assist you?" />
        </ui>
      </assistant>
    `,
    components: [
      exposeComponent(Markdown, {
        description: 'Show markdown to the user',
        input: {
          data: s.streaming.string('The markdown content'),
        },
      }),
    ],
  });

  sendMessage(message: string) {
    this.chat.sendMessage({ role: 'user', content: message });
  }
}
