# Technical Documentation – Checked

A simple overview of the hardware and software architecture powering the Checked Self-Health Assessment Tool.

## 1. Hardware Components
The current architecture is designed for a mobile-centric ecosystem, primarily targeting iOS devices.

*   **Primary Device**: iOS Smartphone (iPhone) acting as the central hub for data visualization and user interaction.
*   **Target Components**:
    *   **Blood Pressure Monitor**: Designed to interface with BLE-enabled (Bluetooth Low Energy) cuffs.
    *   **Fitness Trackers**: Intended support for heart rate and step data from wearable sensors.
*   **Current Hardware State**: All hardware interactions (scanning, pairing, and vital measurement) are currently **simulated** within the frontend logic for UI/UX demonstration.

## 2. Programming & Logic

### Language & Frameworks
*   **Frontend**: JavaScript (React 18) using **Vite** for optimized building and HMR.
*   **Mobile Wrapper**: **Capacitor 8** provides the bridge between web code and native iOS APIs.
*   **Backend**: **Supabase** handles User Authentication (Email & Google OAuth), Database storage, and User Metadata persistence.

### Core Libraries
*   `@supabase/supabase-js`: Real-time data sync and secure session management.
*   `@lottiefiles/dotlottie-react`: Renders lightweight, fluid vector animations during the measurement process.
*   `Lucide React` & `Iconoir`: Modular iconography consistent with the Figma design system.
*   `Tailwind CSS`: Used for layout utility logic alongside a custom **Design Token System** (CSS Variables).

### Core Logic
1.  **Onboarding State Machine**: Tracks user progress from registration through demographics gathering to ensure a complete baseline profile.
2.  **Assessment Engine**: Calculates a health score (0–100) by cross-referencing biometric data (Systolic/Diastolic) with subjective symptom inputs from the Questionnaire.
3.  **Persistance Layer**: Automatically updates Supabase profiles on every change, ensuring data is available across device restores.

## 3. Known Limitations & Future Roadmap

### Known Limitations
*   **Mocked Measurements**: The measurement values (118/76) are static constants. They do not yet reflect real sensor input.
*   **Connectivity**: The "Connect Device" flow is a visual representation and does not currently invoke native Bluetooth search APIs.
*   **Network Dependency**: The app requires an active internet connection to save results; there is no local-first offline caching implemented yet.

### What is next (With More Time)
If given more time, these would be the priority fixes:
1.  **Native Bluetooth Integration**: Integrate `@capacitor-community/bluetooth-le` to enable real-time device pairing and data retrieval.
2.  **Offline Support**: Implement `Capacitor Preferences` or `SQLite` to allow users to take measurements without an internet connection, syncing later.
3.  **Medical Validation**: Refine the health score logic to include WHO-standardized blood pressure classifications (e.g., Normal, Elevated, Stage 1 Hypertension).
4.  **HealthKit Integration**: Sync data with Apple HealthKit for a more holistic view of the user's wellness.
