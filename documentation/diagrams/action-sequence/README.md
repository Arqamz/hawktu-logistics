# Action Sequence Diagrams

This folder contains action sequence diagrams for various use cases within our system. Each diagram represents the sequence of actions, actors involved, and alternate flows for successful and unsuccessful scenarios. The SVG images are located in the `../svgs/action-sequence-diagrams` folder for easy viewing.

## Diagrams Overview

1. **Fleet Operations**
**Description**: This diagram represents the **Fleet Operations** use case, where a fleet manager oversees vehicle assignments and routes. It includes alternate flows for vehicle availability conflicts, assignment failures, and successful confirmation of vehicle assignments.
![Fleet Operations](../svgs/action-sequence/fleet-operations.svg)

2. **Monitor Inventory Levels**
**Description**: This diagram illustrates the **Monitor Inventory Levels** use case. The inventory manager monitors stock levels, performs stock adjustments, and includes alternate flows for low stock alerts, adjustment restrictions, and inventory update confirmations.
![Monitor Inventory Levels](../svgs/action-sequence/inventory-levels.svg)

3. **Earn and Redeem Loyalty Points**
**Description**: This diagram shows the **Earn and Redeem Loyalty Points** use case, where customers earn points on purchases and redeem them for rewards. The sequence includes paths for earning points, redeeming points, and handling cases like insufficient points or successful redemption.
![Earn and Redeem Loyalty Points](../svgs/action-sequence/loyalty-points.svg)

4. **Modify Profile**
**Description**: This diagram represents the **Modify Profile** use case, where customers can update their profile information. The sequence includes eligibility checks, success and failure notifications, and alternate flows for update confirmation and failure handling.
![Modify Profile](../svgs/action-sequence/modify-profile.svg)

5. **Ship Items Door-to-Door**
 **Description**: This diagram illustrates the **Ship Items Door-to-Door** use case, covering address validation, payment processing, and shipment tracking generation. Alternate flows handle address validation failures, payment issues, and successful confirmation of shipping details.
 ![Ship Items Door-to-Door](../svgs/action-sequence/ship-items.svg)

## How to Use

Each diagram provides a detailed view of the sequence of actions for its respective use case. These diagrams help in understanding workflows, identifying points of failure, and ensuring accurate system functionality. To view each diagram, open the respective SVG file directly here in the README or in a compatible viewer.

---

These diagrams are essential for understanding the system’s core workflows and serve as visual documentation to support development and troubleshooting efforts.
