# KoinX - Tax Loss Harvesting Tool (Frontend Assignment)

## Description
A responsive, high-performance React application designed to simulate a Tax Loss Harvesting dashboard. Users can view their current capital gains and selectively harvest crypto assets from their holdings table to see real-time calculated tax savings.

This project closely matches the provided Figma specifications with a polished, accessible dark theme UI.

## Tech Stack
- **Framework**: React 18 (Bootstrapped with Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide-React

## Architecture & Features
- **Separation of Concerns**: 
  - **Business Logic**: Pure calculation functions (`calculatePreHarvesting`, `calculatePostHarvesting`) reside independently in `src/utils/calculations.ts`.
  - **State Management**: Handled via a robust Context Provider (`HarvestingProvider`) ensuring global availability without prop drilling.
- **Performance Optimization (`React.memo`)**: The `HoldingsTable` renders rows using a memoized sub-component (`HoldingRow`). When a user checks a box, only that specific row re-renders, preventing performance bottlenecks on large asset lists.
- **Dynamic State Updates**: The "After Harvesting" card updates seamlessly in real-time as users interact with the holdings table.
- **Bonus Features Implemented**:
  - "View All" functionality with smooth state transition.
  - Interactive "Select All" checkbox logic with indeterminate states.
  - Clean error boundaries and centralized loading spinners.
- **Accessibility (a11y)**: Focus rings on interactive elements, proper ARIA labels on checkboxes, and keyboard navigable table rows.

## Assumptions
- **Mock APIs**: The data is fetched asynchronously via simulated network delays (800ms) in `src/services/api.ts` to mimic real-world API behavior.
- **Tax Rules**: As instructed, calculations assume a strict short-term vs long-term bifurcation based purely on the provided JSON data structure. Realized capital gains strictly equal `Net STCG + Net LTCG`.

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Koinx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Deployment Link
[Insert Vercel/Netlify Link Here]