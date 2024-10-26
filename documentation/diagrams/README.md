# HawkTU Project Diagrams

This folder contains the D2-based diagrams for the HawkTU Logistics Management System project. The diagrams help visualize key system structures, processes, and interactions. Follow the steps below to install D2 and render each diagram.

## Getting Started

### Step 1: Install D2
To get started, you need to install the D2 diagramming tool. You can find the installation instructions on [D2's GitHub page](https://github.com/terrastruct/d2/blob/master/docs/INSTALL.md).

### Step 2: Render a Diagram
To render a diagram, use the following command:

```bash
d2 --layout elk diagrams/domain-model.d2 -w
```

- **Explanation**:
  - `--layout elk`: Uses the `elk` layout for clean, hierarchical structuring.
  - `-w`: Watches for changes and automatically updates the render.

### Diagrams in This Folder

#### 1. Domain Model
This diagram represents the main entities and their relationships in the system.

To run:
```bash
d2 --layout elk diagrams/domain-model.d2 -w --dark-theme 7
```

**Output**:
![Domain Model](domain-model.svg)

#### 2. System Sequence Diagram
Illustrates the high-level interactions between the primary actors and the system for main scenarios.

To run:
```bash
d2 --layout elk diagrams/system-sequence.d2 -w --dark-theme 7
```

**Output**:
![System Sequence Diagram](system-sequence.svg)

<!-- #### 3. Use Case Action Sequences -->
Each use case has its own sequence diagram to detail the actions and system responses in key scenarios.

To run:
```bash
d2 --layout elk diagrams/use-case-sequences/manage-profile-sequence.d2 -w --dark-theme 7
```

**Output**:
![Manage Profile Sequence](use-case-sequences/manage-profile-sequence.svg)

#### 4. Complete Class Diagram
The class diagram provides an in-depth view of the system's static structure, showing classes, attributes, and their relationships.

To run:
```bash
d2 --layout elk diagrams/class-diagram.d2 -w --dark-theme 7
```

**Output**:
![Class Diagram](class-diagram.svg) -->