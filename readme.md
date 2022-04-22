```mermaid
graph LR;
Feature-->B[Possui pai?];
B-- não -->C[Product];
B-- sim -->D["O pai é processado?"];
```