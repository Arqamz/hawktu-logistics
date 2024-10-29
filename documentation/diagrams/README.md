# HawkTU Project Diagrams

This folder contains the D2-based diagrams for the HawkTU Logistics Management System project. The diagrams help visualize key system structures, processes, and interactions. Follow the steps below to install D2 and render each diagram.

## Getting Started

### Step 1: Install D2

To get started, you need to install the D2 diagramming tool. You can find the installation instructions on [D2's GitHub page](https://github.com/terrastruct/d2/blob/master/docs/INSTALL.md).

### Step 2: Render a Diagram

To render a diagram, use the following command:

```bash
d2 --layout elk -w --dark-theme 8 filename.d2 svgs/filename.svg 
```

- **Explanation**:
  - `--layout elk`: Uses the `elk` layout for clean, hierarchical structuring. View options [here](https://d2lang.com/tour/layouts)
  - `-w`: Watches for changes and automatically updates the render.
  - `--dark-theme 8`: The theme of the generated diagram. You can view all options [here](https://d2lang.com/tour/themes)
  - `filename.d2`: Name of the file to generate the diagram for
  - `svgs/filename.svg`: Location to save the generated svg

### Diagrams in This Folder

#### 1. Domain Model

This diagram represents the main entities and their relationships in the system.

![Domain Model](svgs/domain-model.svg)

#### 2. System Sequence Diagram

Illustrates the high-level interactions between the primary actors and the system for main scenarios.

![System Sequence Diagram](svgs/system-sequence.svg)

#### 3. Complete Class Diagram

The class diagram provides an in-depth view of the system's static structure, showing classes, attributes, and their relationships.

![Class Diagram](svgs/class-diagram.svg)

### 4. Action Sequence Diagrams

For details on the action sequence diagram for each of the use-cases, please refer to the [Action Sequence Diagrams README](action-sequence/README.md).
