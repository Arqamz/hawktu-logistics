# HawkTU Project Documentation

This folder contains all project documentation for the HawkTU Logistics Management System. It’s organized into subfolders that house detailed files for understanding and developing the system.

## Folder Structure

```
.
├── diagrams
│   ├── svgs
│   │   ├── action-sequence
│   │   │   ├── fleet-operations.svg
│   │   │   ├── inventory-levels.svg
│   │   │   ├── loyalty-points.svg
│   │   │   ├── modify-profile.svg
│   │   │   └── ship-items.svg
│   │   ├── class-diagram.svg
│   │   ├── domain-model.svg
│   │   └── system-sequence.svg
│   ├── action-sequence
│   │   ├── fleet-operations.d2
│   │   ├── inventory-levels.d2
│   │   ├── loyalty-points.d2
│   │   ├── modify-profile.d2
│   │   ├── ship-items.d2
│   │   └── README.md
│   ├── class-diagram.d2
│   ├── domain-model.d2
│   ├── system-sequence.d2
│   └── README.md
├── overview
│   ├── project-overview.md
│   └── README.md
└── requirements
    ├── assets
    │   └── pdf-svgs
    ├── fullydressed-usecases.pdf
    ├── fullydressed-usecases.tex
    └── README.md
```

### Folders and Files

#### 1. `overview`
The `overview` folder provides a high-level introduction to the project.

- **`project-overview.md`**: This markdown file outlines the goals, scope, and key features of the HawkTU Logistics Management System. Refer to this file for an initial understanding of the project’s purpose and objectives.

#### 2. `requirements`
The `requirements` folder includes documents detailing system requirements and use cases.

- **`fullydressed-usecases.pdf`**: A PDF document with fully dressed use cases for HawkTU, providing insights into user interactions, preconditions, postconditions, and system responsibilities.
- **`fullydressed-usecases.tex`**: The LaTeX source file for the PDF, allowing for modifications and updates.
- **`assets/pdf-svgs`**: SVG conversions of the PDF content to enhance accessibility and allow for easier referencing through the github README.md file.

#### 3. `diagrams`
The `diagrams` folder includes all D2-based diagrams created to visualize different aspects of the HawkTU system, such as relationships, interactions, and system workflows.

- **`domain-model.d2`**: Represents the domain model, showing main entities and their relationships within the system.
- **`class-diagram.d2`**: Provides a class-level representation of the system’s structure, outlining core classes, attributes, and associations.
- **`system-sequence.d2`**: A high-level sequence diagram showing the main interactions between users and system components.
- **`action-sequence/`**: This subfolder contains detailed D2 files for specific action sequence diagrams of key use cases, each describing the interaction flow for:
    - **fleet-operations.d2**: Sequence for managing fleet resources.
    - **inventory-levels.d2**: Sequence for monitoring inventory levels.
    - **loyalty-points.d2**: Sequence for earning and redeeming loyalty points.
    - **modify-profile.d2**: Sequence for managing user profiles.
    - **ship-items.d2**: Sequence for shipping items door-to-door.

Each D2 file has a corresponding pre-rendered SVG in the **`svgs`** subfolder for quick reference. 

- **`svgs/`**: Contains all SVG versions of the D2 diagrams for faster access and review, organized similarly to the D2 files.
- **README.md files**: Each folder includes its own README with detailed instructions for generating and viewing the diagrams, as well as insights into the content.

---

You can navigate to any subfolder, such as `action-sequence`, `svgs`, or `requirements`, for more details through their respective `README.md` files or the diagram files within that folder. This organization provides a comprehensive and easy-to-navigate structure for accessing all project documentation.
