# <a alt="Hashbrown Logo" href="https://hashbrown.dev" target="_blank" rel="noreferrer"><img src="https://github.com/liveloveapp/hashbrown/raw/main/www/public/image/logo/brand-mark.svg" width="32"></a> Intro to Hashbrown & Angular

Welcome to the "Intro to Hashbrown & Angular" workshop! In it, you will learn how to:

- Create simple chatbots
- Expose Angular services to LLMs
- Render generative user interfaces

### Prerequisites

- Node.js (v22 or higher) and npm installed (we recommend using nvm to manage Node versions)

## Setup

### OpenAI API Key

**You will need an OpenAI API key** to complete this particular workshop. Hashbrown supports other large-language models, including Google's Gemini models and Writer. However, the prompts we explore in this exercise will be optimized for OpenAI's models.

To get an API key, follow these steps:

1. Sign up for an account at [OpenAI Platform](https://platform.openai.com)
2. Load it with a balance (you won't need more than $1 for this workshop)
3. Generate an API key

### Running the Code

1. Clone the repository:

   ```sh
   git clone https://github.com/liveloveapp/hashbrown-angular-intro.git
   cd hashbrown-angular-intro
   ```

2. Install and switch Node.js versions:

   ```sh
   nvm install
   nvm use
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Copy the example environment file:

   ```sh
   cp .env.example .env
   ```

5. Open `.env` and set your API key:

   ```
   OPENAI_API_KEY=your_api_key
   ```

6. Run the server in a terminal prompt: and frontend application:

   ```sh
   npx nx serve smart-home-server
   ```

7. Run the client in a separate terminal tab or window:

   ```sh
   npx nx serve smart-home
   ```

   Verify the app loads at `http://localhost:4200`.
