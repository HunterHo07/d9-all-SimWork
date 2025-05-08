/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);

  // Create roles
  const roles = [
    {
      "title": "Developer",
      "description": "Solve coding challenges and build software components in a simulated development environment.",
      "icon": "code",
      "color": "#3b82f6"
    },
    {
      "title": "Designer",
      "description": "Create visual assets and solve design challenges based on creative briefs.",
      "icon": "palette",
      "color": "#ec4899"
    },
    {
      "title": "Project Manager",
      "description": "Make strategic decisions, allocate resources, and manage project timelines.",
      "icon": "chart-bar",
      "color": "#10b981"
    },
    {
      "title": "Data Entry Specialist",
      "description": "Process and organize information with speed and accuracy.",
      "icon": "database",
      "color": "#f59e0b"
    },
    {
      "title": "AI Engineer",
      "description": "Design prompts, evaluate models, and solve AI implementation challenges.",
      "icon": "chip",
      "color": "#8b5cf6"
    }
  ];

  const rolesCollection = dao.findCollectionByNameOrId("roles");

  for (const role of roles) {
    const record = new Record(rolesCollection);
    record.load(role);
    dao.saveRecord(record);
  }

  // Create simulations
  const simulations = [
    {
      "title": "Frontend Bug Hunt",
      "description": "Identify and fix bugs in a React component. This simulation tests your debugging skills and knowledge of React patterns.",
      "role": dao.findFirstRecordByData("roles", "title", "Developer").id,
      "difficulty": "intermediate",
      "duration": 30,
      "isActive": true
    },
    {
      "title": "UI Redesign Challenge",
      "description": "Redesign a dated interface following modern design principles and accessibility guidelines.",
      "role": dao.findFirstRecordByData("roles", "title", "Designer").id,
      "difficulty": "intermediate",
      "duration": 45,
      "isActive": true
    },
    {
      "title": "Sprint Planning Simulation",
      "description": "Allocate resources and plan a sprint for a fictional product development team.",
      "role": dao.findFirstRecordByData("roles", "title", "Project Manager").id,
      "difficulty": "advanced",
      "duration": 40,
      "isActive": true
    },
    {
      "title": "Data Processing Challenge",
      "description": "Process a large dataset with accuracy and speed, identifying patterns and anomalies.",
      "role": dao.findFirstRecordByData("roles", "title", "Data Entry Specialist").id,
      "difficulty": "beginner",
      "duration": 25,
      "isActive": true
    },
    {
      "title": "Prompt Engineering Lab",
      "description": "Design effective prompts for various AI models to achieve specific outcomes.",
      "role": dao.findFirstRecordByData("roles", "title", "AI Engineer").id,
      "difficulty": "expert",
      "duration": 60,
      "isActive": true
    }
  ];

  const simulationsCollection = dao.findCollectionByNameOrId("simulations");

  for (const simulation of simulations) {
    const record = new Record(simulationsCollection);
    record.load(simulation);
    dao.saveRecord(record);
  }

  // Create tasks for the Developer simulation
  const devSimulationId = dao.findFirstRecordByData("simulations", "title", "Frontend Bug Hunt").id;

  const devTasks = [
    {
      "title": "Fix the Counter Component",
      "description": "The counter component has a bug where it sometimes increments by 2 instead of 1. Identify the issue in the React code and fix it.",
      "simulation": devSimulationId,
      "type": "code",
      "difficulty": "beginner",
      "timeLimit": 600,
      "order": 1,
      "resources": JSON.stringify({
        "files": [
          {
            "name": "Counter.jsx",
            "content": "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  const increment = () => {\n    setCount(count + 1);\n    // Bug: This causes the count to sometimes increment by 2\n    setCount(count + 1);\n  };\n  \n  return (\n    <div className=\"counter\">\n      <h2>Count: {count}</h2>\n      <button onClick={increment}>Increment</button>\n    </div>\n  );\n}\n\nexport default Counter;"
          }
        ],
        "hints": [
          "Think about how React's state updates work",
          "Consider the asynchronous nature of setState"
        ]
      }),
      "evaluation": JSON.stringify({
        "criteria": [
          {
            "name": "Functionality",
            "weight": 0.5,
            "description": "Does the counter increment by exactly 1 each time?"
          },
          {
            "name": "Code Quality",
            "weight": 0.3,
            "description": "Is the solution clean and following React best practices?"
          },
          {
            "name": "Explanation",
            "weight": 0.2,
            "description": "Can the candidate explain why the bug occurred?"
          }
        ]
      })
    }
  ];

  const tasksCollection = dao.findCollectionByNameOrId("tasks");

  for (const task of devTasks) {
    const record = new Record(tasksCollection);
    record.load(task);
    dao.saveRecord(record);
  }

  return db;
}, (db) => {
  // No need for down migration as this is seed data
  return db;
});
