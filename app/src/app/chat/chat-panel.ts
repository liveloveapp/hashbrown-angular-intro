import { Component, inject } from '@angular/core';
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
      <app-chat-layout>
        <div class="chat-messages" #contentDiv>
          <!-- 6: Render the chat messages -->
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
      }
    `,
  ],
})
export class ChatPanelComponent {
  smartHome = inject(SmartHome);

  /**
   * 1. Define the chat resource
   * 2. Specify the model to use.
   * 3. Optionally, define the debug name.
   * 4. Define the system prompt.
   */

  sendMessage(message: string) {
    // 5. Send the user message to the chat
  }
}
