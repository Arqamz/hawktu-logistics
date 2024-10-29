# Action Sequence Diagrams

This directory contains the SVG representations of action sequence diagrams for various use cases within our system. Each SVG file illustrates the sequence of actions, actors involved, and alternate flows for successful and unsuccessful outcomes.

## Diagrams Overview

1. **Fleet Operations**
   - **Description**: This diagram represents the **Fleet Operations** use case, where a fleet manager oversees the allocation and monitoring of vehicles and routes. The diagram includes alternate flows for vehicle availability conflicts, assignment failures, and successful confirmation of vehicle assignments.
   - ![Fleet Operations](fleet-operations.svg)

2. **Monitor Inventory Levels**
   - **Description**: This diagram illustrates the **Monitor Inventory Levels** use case. The inventory manager checks stock levels, adjusts stock when necessary, and handles alternate flows for low stock alerts, adjustment restrictions, and inventory update confirmations.
   - ![Monitor Inventory Levels](inventory-levels.svg)

3. **Earn and Redeem Loyalty Points**
   - **Description**: This diagram depicts the **Earn and Redeem Loyalty Points** use case, where customers earn points on purchases and redeem them for rewards. It includes alternate flows for insufficient points, successful redemption, and points deduction confirmation.
   - ![Earn and Redeem Loyalty Points](loyalty-points.svg)

4. **Modify Profile**
   - **Description**: This diagram shows the **Modify Profile** use case, where a customer updates their profile information. The sequence includes eligibility checks, success and failure notifications, and alternate flows for update confirmation and failure handling.
   - ![Modify Profile](modify-profile.svg)

5. **Ship Items Door-to-Door**
   - **Description**: This diagram represents the **Ship Items Door-to-Door** use case, detailing the steps from address validation to payment processing and shipment tracking generation. Alternate flows handle address validation failures, payment issues, and successful confirmation of shipping details.
   - ![Ship Items Door-to-Door](ship-items.svg)

## How to Use

Each diagram provides a detailed view of the sequence of actions for its respective use case. These diagrams are essential for understanding the system’s workflows and help in identifying points of failure, user notifications, and confirmation messages.

To view each diagram, open the respective SVG file in a compatible viewer, or simply view it directly here in the markdown file if your markdown viewer supports SVG display.

---

Each SVG has been designed to align with the system's requirements and provides a structured flow of actions with both main and alternate paths visually represented.
