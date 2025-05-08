# SimulEx

![SimulEx Logo](fe/public/images/simulex-logo.png)

## The Future of Work Training and Hiring

SimulEx is an AI-driven, immersive "future of work" game that combines real-world tasks with adaptive difficulty, OCR-enabled asset submission, and real-time analytics. It addresses critical gaps in corporate and educational training by delivering engaging, cost-effective, and retention-focused simulations.

## 🚀 Features

- **Immersive Multi-Role Simulations**: Experience realistic work scenarios for Developers, Designers, PMs, Data Entry specialists, and AI Engineers
- **AI-Powered Adaptivity**: Dynamic task complexity adjustment based on performance
- **Real-Time Analytics**: Track KPIs including accuracy, speed, and decision quality
- **Interactive 3D Environment**: Navigate a futuristic office space with specialized workstations
- **Authentic Task Simulation**: Complete coding challenges, design tasks, and data analysis in a realistic environment

## 🛠️ Tech Stack

### Frontend
- Next.js 15.3.1
- TailwindCSS
- GSAP for advanced animations
- Three.js for 3D environments
- Framer Motion for UI animations
- TypeScript for type safety

### Backend
- PocketBase (SQLite)
- RESTful API
- Authentication system
- Real-time data synchronization

## 📋 Prerequisites

- Node.js 18+ or Bun 1.0+
- Go 1.19+ (for PocketBase, optional if using binary)

## 🚀 Quick Start

### Clone the repository
```bash
git clone https://github.com/yourusername/simulex.git
cd simulex
```

### Start the backend (PocketBase)
```bash
cd be
./start.sh
```
PocketBase will be available at http://127.0.0.1:8090

### Start the frontend (Next.js)
```bash
cd fe
npm install
npm run dev
```
The application will be available at http://localhost:3000

## 📊 Database Schema

SimulEx uses PocketBase with the following collections:

- **Users**: Authentication and user profiles
- **Roles**: Available simulation roles
- **Simulations**: Simulation configurations and scenarios
- **Tasks**: Individual tasks within simulations
- **Results**: User performance and analytics data

## 🧪 Simulation Environments

### Developer Station
Terminal-based coding challenges with real-time evaluation

### Designer Workstation
Creative briefs with OCR-enabled asset submission

### Project Manager Dashboard
Decision-making scenarios with resource allocation

### Data Entry Terminal
Accuracy and speed-focused form completion tasks

### AI Engineer Lab
Prompt engineering and model evaluation challenges

## 📈 Analytics Dashboard

The analytics dashboard provides:

- Real-time performance tracking
- Historical data comparison
- Skill gap identification
- Personalized improvement recommendations
- Session recordings for hiring managers

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Data encryption
- Secure API endpoints
- CSRF protection

## 📱 Responsive Design

SimulEx is designed to work across devices:

- Desktop: Full immersive experience
- Tablet: Adapted interface with core functionality
- Mobile: Essential features and monitoring capabilities

## 🌐 Deployment

### Frontend Deployment
The Next.js application can be deployed to Vercel, Netlify, or any Node.js hosting service.

### Backend Deployment
PocketBase can be deployed to any VPS or container service.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
